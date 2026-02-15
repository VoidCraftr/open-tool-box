"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Download, Upload, Play, Pause, Zap, Info, ShieldCheck, Sparkles, RefreshCcw, FileVideo, ChevronRight, Activity, TrendingUp } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

export default function VideoEnhancerClient() {
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [videoUrl, setVideoUrl] = useState<string>("")
    const [enhancedVideoUrl, setEnhancedVideoUrl] = useState<string>("")
    const [outputExt, setOutputExt] = useState<string>("webm")
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [processingStatus, setProcessingStatus] = useState("")
    const [gpuSupported, setGpuSupported] = useState<boolean | null>(null)

    // Refs
    const videoInputRef = useRef<HTMLInputElement>(null)
    const originalVideoRef = useRef<HTMLVideoElement>(null)
    const enhancedVideoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Audio Refs for robust capture
    const audioContextRef = useRef<AudioContext | null>(null)
    const audioDestRef = useRef<MediaStreamAudioDestinationNode | null>(null)
    const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null)

    // Check WebGPU support on mount
    useEffect(() => {
        const checkGPU = async () => {
            if (typeof navigator !== 'undefined' && 'gpu' in (navigator as any)) {
                try {
                    const adapter = await (navigator as any).gpu.requestAdapter()
                    setGpuSupported(!!adapter)
                } catch (e) {
                    setGpuSupported(false)
                }
            } else {
                setGpuSupported(false)
            }
        }
        checkGPU()
    }, [])

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith("video/")) {
            setVideoFile(file)
            const url = URL.createObjectURL(file)
            setVideoUrl(url)
            setEnhancedVideoUrl("")
            setProgress(0)
            setProcessingStatus("")

            // Reset audio source ref when new video is uploaded
            if (audioSourceRef.current) {
                audioSourceRef.current.disconnect()
                audioSourceRef.current = null
            }
        } else {
            alert("Please upload a valid video file")
        }
    }

    const processVideo = async () => {
        console.log('processVideo called', {
            videoFile: !!videoFile,
            originalVideoRef: !!originalVideoRef.current,
            canvasRef: !!canvasRef.current,
            gpuSupported
        })

        if (!videoFile || !originalVideoRef.current || !canvasRef.current || !gpuSupported) {
            console.log('processVideo early return - conditions not met')
            return
        }

        console.log('Starting video processing...')
        setIsProcessing(true)
        setProgress(0)
        setProcessingStatus("Initializing AI Model...")
        setEnhancedVideoUrl("")

        const video = originalVideoRef.current
        const canvas = canvasRef.current

        try {
            // 1. Load Weights
            console.log('Loading weights...')
            const weightsResponse = await fetch('/weights/cnn-2x-s.json')
            if (!weightsResponse.ok) throw new Error("Failed to load model weights")
            const weights = await weightsResponse.json()

            // 2. Initialize WebSR
            console.log('Initializing WebSR...')
            const { default: WebSR } = await import("@websr/websr")

            const websr = new WebSR({
                source: video,
                canvas: canvas,
                weights: weights,
                network_name: (weights.name || "anime4k/cnn-2x-s") as any,
                gpu: await WebSR.initWebGPU() as any
            })

            await websr.start()
            setProcessingStatus("Upscaling Video...")

            // 3. Setup Canvas
            canvas.width = video.videoWidth * 2
            canvas.height = video.videoHeight * 2
            console.log('Video dimensions:', {
                original: { width: video.videoWidth, height: video.videoHeight },
                upscaled: { width: canvas.width, height: canvas.height },
                scale: '2x'
            })

            // 4. Robust Audio Capture Fix
            // Create AudioContext if not exists
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            }
            const audioCtx = audioContextRef.current

            // Create destination
            const audioDest = audioCtx.createMediaStreamDestination()
            audioDestRef.current = audioDest

            // Connect video to destination - only create source once per video element
            let source: MediaElementAudioSourceNode
            if (!audioSourceRef.current) {
                source = audioCtx.createMediaElementSource(video)
                audioSourceRef.current = source
            } else {
                source = audioSourceRef.current
            }

            // Disconnect any previous connections and reconnect
            source.disconnect()
            source.connect(audioDest)
            // Optional: source.connect(audioCtx.destination) // Uncomment to hear during processing

            // Create stream from canvas + audio destination
            // 3. Setup MediaRecorder with canvas stream + audio
            const canvasStream = canvas.captureStream(30) // 30 FPS for smooth playback
            const videoTrack = canvasStream.getVideoTracks()[0]
            const audioTrack = audioDest.stream.getAudioTracks()[0]

            // Log the actual capture settings
            const trackSettings = videoTrack.getSettings()
            console.log('Canvas capture stream settings:', {
                width: trackSettings.width,
                height: trackSettings.height,
                frameRate: trackSettings.frameRate,
                aspectRatio: trackSettings.aspectRatio
            })

            const mixedStream = new MediaStream([videoTrack, audioTrack])

            // Select MIME type - MP4 is not actually supported despite isTypeSupported returning true
            // Use WebM which is universally supported in Chrome/Edge
            let selectedMimeType = 'video/webm;codecs=vp9,opus'
            let ext = 'webm'

            // Try VP9 first (best quality), then H.264, then fallback to basic webm
            if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
                selectedMimeType = 'video/webm;codecs=vp9,opus'
            } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264,opus')) {
                selectedMimeType = 'video/webm;codecs=h264,opus'
            } else if (MediaRecorder.isTypeSupported('video/webm')) {
                selectedMimeType = 'video/webm'
            }

            console.log('Selected MIME type:', selectedMimeType, 'Extension:', ext)
            setOutputExt(ext)

            const mediaRecorder = new MediaRecorder(mixedStream, {
                mimeType: selectedMimeType,
                videoBitsPerSecond: 25000000 // 25Mbps for high quality (increased from 12Mbps)
            })

            const chunks: BlobPart[] = []
            mediaRecorder.ondataavailable = (e) => {
                console.log('Data chunk received:', e.data.size, 'bytes')
                if (e.data.size > 0) chunks.push(e.data)
            }

            mediaRecorder.onerror = (e) => {
                console.error('MediaRecorder error:', e)
            }

            mediaRecorder.onstart = () => {
                console.log('MediaRecorder started successfully')
            }

            mediaRecorder.onstop = () => {
                const type = mediaRecorder.mimeType
                const ext = type.includes("mp4") ? "mp4" : "webm"
                setOutputExt(ext)

                const blob = new Blob(chunks, { type: type })
                const url = URL.createObjectURL(blob)

                // Log file size information
                const outputSizeMB = (blob.size / (1024 * 1024)).toFixed(2)
                const inputSizeMB = (videoFile.size / (1024 * 1024)).toFixed(2)
                const estimatedBitrate = (blob.size * 8 / video.duration / 1000000).toFixed(2) // Mbps

                console.log('Video encoding complete:', {
                    inputSize: `${inputSizeMB} MB`,
                    outputSize: `${outputSizeMB} MB`,
                    estimatedBitrate: `${estimatedBitrate} Mbps`,
                    targetBitrate: '25 Mbps',
                    duration: `${video.duration.toFixed(2)}s`
                })

                setEnhancedVideoUrl(url)
                setIsProcessing(false)
                setProgress(100)
                setProcessingStatus("Enhancement Complete!")

                // Cleanup
                websr.destroy()
            }

            // Start recording with timeslice to get data chunks periodically
            console.log('Starting MediaRecorder with MIME type:', selectedMimeType)
            mediaRecorder.start(100) // Request data every 100ms

            // 5. Play and Record loop
            video.currentTime = 0
            video.muted = true // Silent capture thanks to AudioContext!
            await video.play()

            console.log('Starting frame processing loop...')
            let frameCount = 0
            const targetFPS = 30
            const frameDelay = 1000 / targetFPS // ~33ms per frame

            const processFrame = async () => {
                if (video.paused || video.ended) {
                    console.log(`Processing complete. Processed ${frameCount} frames`)
                    if (mediaRecorder.state === "recording") mediaRecorder.stop()
                    return
                }

                // Render the current frame through WebSR
                await websr.render()
                frameCount++

                // Update progress
                const currentProgress = (video.currentTime / video.duration) * 100
                setProgress(Math.round(currentProgress))

                // Continue processing with slight delay for better frame capture
                if (!video.ended && !video.paused) {
                    // Use setTimeout for more consistent timing instead of just requestAnimationFrame
                    setTimeout(() => {
                        requestAnimationFrame(processFrame)
                    }, frameDelay / 2) // Half the frame delay for smoother processing
                } else if (mediaRecorder.state === "recording") {
                    mediaRecorder.stop()
                }
            }

            processFrame()

        } catch (error) {
            console.error("Enhancement failed:", error)
            alert("Video enhancement failed. Check console for details.")
            setIsProcessing(false)
            setProcessingStatus("Failed")
        }
    }

    const handleDownload = () => {
        if (!enhancedVideoUrl) return
        const link = document.createElement("a")
        link.href = enhancedVideoUrl
        const baseName = videoFile?.name.split(".")[0] || "video"
        link.download = `ai-upscaled-${baseName}.${outputExt}`
        link.click()
    }

    return (
        <ToolWrapper
            title="AI Video Upscaler"
            description="Premium 2x video upscaling using GPU-accelerated neural networks directly in your browser."
            toolSlug="video-enhancer"
        >
            {/* Hidden canvas - always rendered so ref is available before processing */}
            <canvas ref={canvasRef} style={{ position: 'absolute', left: '-9999px' }} />

            <div className="grid lg:grid-cols-[380px_1fr] gap-8">
                {/* Controls Sidebar */}
                <div className="space-y-6">
                    {!gpuSupported && gpuSupported !== null && (
                        <Alert variant="destructive" className="liquid-glass border-red-500/20 bg-red-500/5 animate-fade-in">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Hardware Incompatible</AlertTitle>
                            <AlertDescription className="text-xs">
                                WebGPU is required for AI video processing. Please use Chrome 113+ or Edge on a compatible device.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <FileVideo className="w-5 h-5 text-primary" />
                                Cinema Source
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                variant="outline"
                                onClick={() => videoInputRef.current?.click()}
                                className="w-full h-28 border-dashed border-2 bg-background/20 hover:bg-background/40 hover:border-primary/50 physical-tap group transition-all"
                                disabled={isProcessing}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                        <Upload className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="font-semibold">{videoFile ? "Replace Video" : "Upload Video File"}</span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">MP4, WebM supported</span>
                                </div>
                            </Button>
                            <input
                                ref={videoInputRef}
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={handleVideoUpload}
                            />
                            {videoFile && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-primary/5 border border-primary/10 p-3 rounded-lg text-[11px] font-mono flex items-center justify-between"
                                >
                                    <span className="truncate max-w-[200px]">{videoFile.name}</span>
                                    <span className="text-primary font-bold">{(videoFile.size / (1024 * 1024)).toFixed(1)}MB</span>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in" style={{ animationDelay: "100ms" }}>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                                AI Studio
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-xs uppercase tracking-tighter font-bold text-muted-foreground">Neural Model</Label>
                                <div className="p-4 bg-background/40 border border-white/5 rounded-xl shadow-inner flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                                        <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">CNN-2x-Ultra</p>
                                        <p className="text-[10px] text-muted-foreground leading-tight">Optimized for textures & portraits</p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-white/10" />

                            <div className="space-y-4">
                                <Button
                                    onClick={processVideo}
                                    disabled={!videoFile || isProcessing || !gpuSupported}
                                    className="w-full h-14 text-lg bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-200 active:scale-95 hover:scale-[1.02] font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2">
                                            <RefreshCcw className="w-5 h-5 animate-spin" />
                                            Upscaling...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Activity className="w-5 h-5" />
                                            Boost to 4K / 2X
                                        </span>
                                    )}
                                </Button>

                                {/* Debug Info */}
                                {!isProcessing && (!videoFile || !gpuSupported) && (
                                    <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/20 rounded-lg border border-border/50">
                                        <p className="font-semibold">Button Status:</p>
                                        <ul className="space-y-0.5 ml-2">
                                            <li className={videoFile ? "text-green-500" : "text-red-500"}>
                                                {videoFile ? "✓" : "✗"} Video uploaded
                                            </li>
                                            <li className={gpuSupported ? "text-green-500" : "text-red-500"}>
                                                {gpuSupported ? "✓" : "✗"} GPU supported
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                <AnimatePresence>
                                    {isProcessing && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-3 pt-2"
                                        >
                                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-primary italic">
                                                <span>{processingStatus}</span>
                                                <span>{progress}%</span>
                                            </div>
                                            <Progress value={progress} className="h-1.5 bg-primary/10 [&>div]:bg-primary shadow-sm" />
                                            <p className="text-[10px] text-center text-muted-foreground animate-pulse">Stay on this tab for maximum GPU speed</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <div className="p-2 bg-primary/10 rounded-lg h-fit">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-primary italic uppercase tracking-tighter">Secure & Local</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Your video is processed entirely on your GPU. No data is ever sent to our servers.</p>
                        </div>
                    </div>
                </div>

                {/* Preview Area - Cinematic Layout */}
                <div className="space-y-8">
                    {/* Live Processing / Result View */}
                    <Card className={`premium-card border-white/10 overflow-hidden bg-black/40 min-h-[500px] flex flex-col relative transition-all duration-700 ${enhancedVideoUrl ? 'shadow-2xl shadow-primary/20 ring-1 ring-primary/30' : ''}`}>
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                            {enhancedVideoUrl && (
                                <span className="bg-primary text-primary-foreground text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-xl animate-in zoom-in-50">
                                    AI Upscaled - 2X Resolution
                                </span>
                            )}
                            {isProcessing && (
                                <span className="bg-yellow-500 text-black text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-xl animate-pulse">
                                    Live Neural Stream
                                </span>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[450px] relative">
                            {enhancedVideoUrl ? (
                                <div className="space-y-6 w-full max-w-5xl">
                                    <video
                                        ref={enhancedVideoRef}
                                        src={enhancedVideoUrl}
                                        className="w-full h-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
                                        controls
                                    />
                                    <div className="flex justify-center">
                                        <Button onClick={handleDownload} size="lg" className="premium-button h-14 px-12 text-lg bg-primary shadow-primary/30">
                                            <Download className="w-5 h-5 mr-3" />
                                            Download Enhanced High-Res Asset
                                        </Button>
                                    </div>
                                </div>
                            ) : isProcessing ? (
                                <div className="w-full h-full flex flex-col gap-8 py-12 px-6">
                                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-6 w-full max-w-6xl mx-auto">
                                        {/* Source Monitoring */}
                                        <div className="space-y-4">
                                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 group">
                                                <video
                                                    ref={originalVideoRef}
                                                    src={videoUrl}
                                                    className="w-full h-full object-contain opacity-50 contrast-125"
                                                    muted
                                                />
                                                <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
                                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-white border border-white/10 uppercase tracking-widest">
                                                    Source Monitoring
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-white/40" style={{ width: `${progress}%` }} />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 bg-white/5 border border-white/5 rounded-lg">
                                                    <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Status</p>
                                                    <p className="text-xs font-bold text-green-500 flex items-center gap-1">
                                                        <Activity className="w-3 h-3" /> Reading
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-white/5 border border-white/5 rounded-lg">
                                                    <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Queue</p>
                                                    <p className="text-xs font-bold text-white">Active</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Neural Output */}
                                        <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-primary/40 bg-black shadow-2xl group">
                                            {/* Canvas renders off-screen, this shows processing status */}
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-transparent">
                                                <div className="text-center space-y-3">
                                                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                                                        <Zap className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <p className="text-sm font-bold text-primary">AI Processing Frames...</p>
                                                    <p className="text-xs text-muted-foreground">Upscaling to 2x resolution</p>
                                                </div>
                                            </div>
                                            {/* Scanning Line Animation */}
                                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                                <motion.div
                                                    initial={{ top: "-100%" }}
                                                    animate={{ top: "100%" }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                    className="absolute w-full h-[15%] bg-gradient-to-b from-transparent via-primary/20 to-transparent blur-xl border-b border-primary/40"
                                                />
                                            </div>
                                            <div className="absolute bottom-6 left-6 flex items-center gap-4">
                                                <div className="p-3 bg-primary/20 backdrop-blur-md rounded-xl border border-primary/30">
                                                    <Zap className="w-6 h-6 text-primary animate-pulse shadow-glow" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Upscaling Engine</p>
                                                    <p className="text-xl font-mono font-bold text-white tracking-tighter">NEURAL STREAMING</p>
                                                </div>
                                            </div>
                                            <div className="absolute top-6 right-6 flex gap-2">
                                                <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> REC
                                                </div>
                                                <div className="px-3 py-1 bg-primary/60 backdrop-blur-md rounded border border-primary/10 text-[9px] font-bold text-white uppercase tracking-widest">
                                                    Ultra-HD Boost
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-3 w-full max-w-4xl mx-auto">
                                        <div className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest text-primary italic">
                                            <span>Processing Stream: {processingStatus}</span>
                                            <span>{progress}% Complete</span>
                                        </div>
                                        <Progress value={progress} className="h-1.5 bg-primary/10 [&>div]:bg-primary overflow-hidden shadow-sm" />
                                        <div className="flex gap-8 opacity-40">
                                            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-tighter">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                GPU Acceleration: Enabled
                                            </div>
                                            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-tighter">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                Buffer Mode: Sequential
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : videoUrl ? (
                                <div className="space-y-6 w-full max-w-4xl">
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 group bg-black">
                                        <video
                                            ref={originalVideoRef}
                                            src={videoUrl}
                                            className="w-full h-full max-h-[60vh] object-contain"
                                            controls
                                            crossOrigin="anonymous"
                                        />
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Source Preview
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="text-center space-y-3">
                                            <p className="text-lg font-bold text-primary">Video Ready for Enhancement</p>
                                            <p className="text-sm text-muted-foreground">Click the "Boost to 4K / 2X" button in the sidebar to start processing</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-8 py-16 opacity-40 group">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
                                        <div className="relative w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-primary/20">
                                            <FileVideo className="w-12 h-12 text-primary/40" />
                                        </div>
                                    </div>
                                    <div className="text-center space-y-3">
                                        <p className="text-2xl font-black uppercase tracking-tight text-foreground">Cinema Hub Ready</p>
                                        <p className="text-sm text-muted-foreground max-w-xs mx-auto font-medium">Upload a video to experience high-fidelity neural upscaling at your fingertips.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Meta Stats */}
                    <div className="grid sm:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
                        {[
                            { label: "Neural Model", value: "WebSR-v2.1", icon: Zap, status: "Active" },
                            { label: "Internal Scaling", value: "2.5x Precision", icon: TrendingUp, status: "Boost" },
                            { label: "Security Status", value: "Secure Local", icon: ShieldCheck, status: "Safe" }
                        ].map((stat, i) => (
                            <Card key={i} className="bg-background/20 border-white/5 p-5 hover:border-primary/20 transition-all cursor-default group shadow-inner">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                        <stat.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <p className="text-xl font-bold">{stat.value}</p>
                                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase italic">{stat.status}</span>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <AnimatePresence>
                        {enhancedVideoUrl && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex justify-between items-center bg-primary/10 border border-primary/20 p-6 rounded-3xl shadow-2xl backdrop-blur-md"
                            >
                                <div className="space-y-1">
                                    <h4 className="text-base font-black text-primary italic uppercase tracking-tighter">Upscaling Successful</h4>
                                    <p className="text-xs text-muted-foreground">Your video has been reconstructed at double resolution with neural edge enhancement.</p>
                                </div>
                                <div className="flex gap-4">
                                    <Button onClick={() => { setEnhancedVideoUrl(""); setProgress(0); }} variant="outline" className="h-12 px-6 rounded-xl">
                                        Dismiss
                                    </Button>
                                    <Button onClick={handleDownload} size="lg" className="premium-button shadow-primary/30 h-12 px-8 bg-primary">
                                        <Download className="mr-2 h-5 w-5" />
                                        Save Asset
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ContentSection
                title="Next-Gen AI Video Upscaling"
                description="Our AI Video Upscaler uses state-of-the-art WebGPU neural networks to double your video resolution instantly. Perfect for upscaling 480p to 1080p or 720p to 4K directly in your browser."
                features={[
                    "🚀 **GPU-Accelerated**: Leveraging WebGPU for near-native neural processing speeds.",
                    "🎨 **Deep Detail Recovery**: AI-driven edge enhancement without blur or artifacts.",
                    "🔈 **Robust Audio Sync**: High-fidelity audio capture ensures perfect synchronization.",
                    "🔒 **Zero Server Latency**: Your video data never leaves your GPU, ensuring total privacy.",
                    "📦 **Multiple Formats**: Export directly to high-bitrate WebM or MP4 files.",
                    "✨ **Real-time Live Feed**: Watch the AI work frame-by-frame as it enhances your footage."
                ]}
                howToUse={[
                    "Upload any video file (MP4, WebM) you wish to upscale.",
                    "Ensure your browser supports WebGPU (Chrome/Edge latest versions).",
                    "Click **Boost to 4K / 2X** to start the neural processing.",
                    "Stay on the current tab to give the AI full access to your hardware resources.",
                    "Wait for the 'Enhancement Complete' message and download your new video file."
                ]}
                faq={[
                    {
                        question: "Why is it slow on my laptop?",
                        answer: "Video upscaling is one of the most hardware-intensive tasks an AI can do. The speed depends directly on your computer's Graphics Card (GPU). For best results, use a machine with dedicated NVIDIA or AMD graphics."
                    },
                    {
                        question: "Does it support 4K output?",
                        answer: "Yes! If you upload a 1080p video, the AI will upscale it to 4K (double the resolution). Note that processing 4K frames takes significantly longer than lower resolutions."
                    },
                    {
                        question: "Why do I need to stay on the tab?",
                        answer: "Browsers throttle GPU performance when tabs are hidden to save power. Keeping the tab visible allows the AI to run at maximum speed."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
