"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Upload, Play, Pause, Zap, Info } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
        } else {
            alert("Please upload a valid video file")
        }
    }

    const processVideo = async () => {
        if (!videoFile || !originalVideoRef.current || !canvasRef.current || !gpuSupported) return

        setIsProcessing(true)
        setProgress(0)
        setProcessingStatus("Initializing AI Model...")
        setEnhancedVideoUrl("") // Clear previous

        const video = originalVideoRef.current
        const canvas = canvasRef.current

        try {
            // 1. Load Weights
            const weightsResponse = await fetch('/weights/cnn-2x-s.json')
            if (!weightsResponse.ok) throw new Error("Failed to load model weights")
            const weights = await weightsResponse.json()


            // 2. Initialize WebSR (Dynamic Import to fix SSR)
            // @ts-ignore
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

            // 3. Setup Canvas & MediaRecorder
            // Use 2x resolution since we are upscaling 2x
            canvas.width = video.videoWidth * 2
            canvas.height = video.videoHeight * 2


            // 4. Handle Audio - CRITICAL FIX
            let audioTrack: MediaStreamTrack | undefined

            // Method A: captureStream on video element
            try {
                // @ts-ignore
                const videoStream = (video.captureStream || video.mozCaptureStream)?.call(video)
                if (videoStream) {
                    const tracks = videoStream.getAudioTracks()
                    if (tracks.length > 0) audioTrack = tracks[0]
                }
            } catch (e) {
                console.warn("Could not capture audio from video element:", e)
            }

            if (!audioTrack) {
                console.warn("No audio track found. Output will be silent.")
                setProcessingStatus("Warning: Audio track not detected. Proceeding with video only...")
            }

            // Create stream from canvas
            // 30 FPS - adjust as needed or try to match video fps
            const stream = canvas.captureStream(30)

            // Add audio track if available
            if (audioTrack) {
                stream.addTrack(audioTrack)
            }

            // Prepare MediaRecorder with dynamic mime type
            const mimeTypes = [
                "video/mp4;codecs=h264,aac",
                "video/mp4",
                "video/webm;codecs=vp9,opus",
                "video/webm"
            ]

            let selectedMimeType = "video/webm" // Default fallback
            for (const type of mimeTypes) {
                if (MediaRecorder.isTypeSupported(type)) {
                    selectedMimeType = type
                    break
                }
            }

            // Try to match input type if supported, OTHERWISE prefer MP4 over WebM if supported
            if (videoFile.type && MediaRecorder.isTypeSupported(videoFile.type)) {
                selectedMimeType = videoFile.type
            } else if (MediaRecorder.isTypeSupported("video/mp4")) {
                // Force MP4 if input type is unknown/unsupported but MP4 is generally supported
                selectedMimeType = "video/mp4"
            }

            // Determine extension for later
            const isMp4 = selectedMimeType.includes("mp4")
            setOutputExt(isMp4 ? "mp4" : "webm")

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: selectedMimeType,
                videoBitsPerSecond: 8000000 // High bitrate
            })

            const chunks: BlobPart[] = []
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data)
            }

            mediaRecorder.onstop = () => {
                // Determine extension based on mime type
                const type = mediaRecorder.mimeType
                const ext = type.includes("mp4") ? "mp4" : "webm"

                const blob = new Blob(chunks, { type: type })
                const url = URL.createObjectURL(blob)
                setEnhancedVideoUrl(url)
                setIsProcessing(false)
                setProgress(100)
                setProcessingStatus("Completed!")

                // Cleanup
                websr.destroy()
            }

            mediaRecorder.start()

            // 5. Play and Record loop
            video.currentTime = 0
            await video.play()

            const processFrame = async () => {
                if (video.paused || video.ended) {
                    mediaRecorder.stop()
                    video.pause() // Ensure stopped
                    return
                }

                // AI Render
                await websr.render()

                // Update progress
                const currentProgress = (video.currentTime / video.duration) * 100
                setProgress(Math.round(currentProgress))

                if (!video.ended && !video.paused) {
                    requestAnimationFrame(processFrame)
                } else {
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
        link.download = `upscaled-${baseName}.${outputExt}`
        link.click()
    }

    return (
        <ToolWrapper
            title="AI Video Upscaler"
            description="Upscale videos by 2x resolution using GPU-accelerated AI directly in your browser. Powered by WebGPU."
            toolSlug="video-enhancer"
        >
            <div className="grid lg:grid-cols-[350px_1fr] gap-8 h-full">
                {/* Controls Sidebar */}
                <div className="space-y-6 flex flex-col h-full">
                    {/* GPU Status Alert */}
                    {!gpuSupported && gpuSupported !== null && (
                        <Alert variant="destructive">
                            <Info className="h-4 w-4" />
                            <AlertTitle>WebGPU Not Supported</AlertTitle>
                            <AlertDescription>
                                Your browser or device does not support WebGPU. AI upscaling requires a compatible browser (Chrome 113+, Edge) and hardware.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Video Source</CardTitle>
                            <CardDescription>Upload video to upscale (2x)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                variant="outline"
                                onClick={() => videoInputRef.current?.click()}
                                className="w-full h-24 border-dashed border-2 hover:bg-muted/50"
                                disabled={isProcessing}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className="w-8 h-8 text-muted-foreground" />
                                    <span>{videoFile ? "Change Video" : "Upload Video"}</span>
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
                                <div className="bg-muted p-2 rounded text-xs truncate text-center">
                                    {videoFile.name}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>AI Settings</CardTitle>
                            <CardDescription>Upscaling Configuration</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Model</Label>
                                <div className="p-3 border rounded-md text-sm font-medium flex items-center gap-2 bg-muted/20">
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                    CNN-2x-S (Anime4K/WebSR)
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Fast, lightweight model optimized for browser performance. Upscales 2x.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>GPU Acceleration</Label>
                                <div className={`p-2 rounded-md text-xs font-mono text-center border ${gpuSupported ? 'bg-green-500/10 border-green-500/50 text-green-600' : 'bg-red-500/10 border-red-500/50 text-red-600'}`}>
                                    {gpuSupported ? "Active: WebGPU Detected" : "Inactive: WebGPU Missing"}
                                </div>
                            </div>

                            <Separator />

                            <Button
                                onClick={processVideo}
                                disabled={!videoFile || isProcessing || !gpuSupported}
                                className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                                size="lg"
                            >
                                <Zap className="w-5 h-5 mr-2" />
                                {isProcessing ? "Processing..." : "Start AI Upscaling"}
                            </Button>

                            {isProcessing && (
                                <div className="space-y-2 pt-2 animate-in fade-in">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>{processingStatus}</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>
                            )}

                            {!isProcessing && processingStatus && (
                                <div className="text-center text-sm font-medium text-green-600 animate-in fade-in">
                                    {processingStatus}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Area */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* Original */}
                        <Card className="overflow-hidden border-2 border-muted">
                            <CardHeader className="py-3 px-4 bg-muted/30">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    Original (Input)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 bg-black/5">
                                {videoUrl ? (
                                    <div className="relative aspect-video w-full">
                                        {/* Original Video must play to drive AI, but we might want to mute it while processing to avoid double audio? 
                                            Actually, usually we want to mute it so user doesn't hear it while processing at weird rates.
                                            But for captureStream to get audio, it usually needs to be playing?
                                            Actually, muted video often yields silent captureStream in some browsers.
                                            Safest: Volume 0.01 or unmuted but warn user. 
                                            Let's try muted first, check if captureStream gets audio. 
                                            In Chrome, captureStream from muted video yields silent audio track.
                                            So we must play with audio.
                                        */}
                                        <video
                                            ref={originalVideoRef}
                                            src={videoUrl}
                                            className="w-full h-full object-contain bg-black"
                                            controls={!isProcessing}
                                            muted={false} // Must be unmuted for audio capture!
                                            crossOrigin="anonymous"
                                            onEnded={() => {
                                                if (!isProcessing) setIsProcessing(false)
                                            }}
                                        />
                                        {isProcessing && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white backdrop-blur-sm">
                                                <div className="text-center space-y-2">
                                                    <div className="animate-spin text-4xl">⚙️</div>
                                                    <p>Processing Video Frame-by-Frame...</p>
                                                    <p className="text-xs opacity-75">Please do not switch tabs</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="aspect-video flex items-center justify-center text-muted-foreground">
                                        <p>No video</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Enhanced */}
                        <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
                            <CardHeader className="py-3 px-4 bg-primary/5">
                                <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
                                    <Zap className="w-4 h-4 fill-primary" />
                                    AI Upscaled (Output)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 bg-black/5">
                                {enhancedVideoUrl ? (
                                    <div className="relative aspect-video w-full group">
                                        <video
                                            ref={enhancedVideoRef}
                                            src={enhancedVideoUrl}
                                            className="w-full h-full object-contain bg-black"
                                            controls
                                        />
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                                                2x Upscaled
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="aspect-video flex flex-col items-center justify-center text-muted-foreground bg-muted/20">
                                        {isProcessing ? (
                                            <div className="w-full h-full flex items-center justify-center flex-col gap-2">
                                                <canvas ref={canvasRef} className="w-[80%] h-auto border shadow-lg" />
                                                <p className="text-xs animate-pulse">Live AI Preview</p>
                                            </div>
                                        ) : (
                                            <>
                                                <Zap className="w-12 h-12 mb-2 opacity-20" />
                                                <p>Upscaled result will appear here</p>
                                                {/* Hidden canvas for init */}
                                                <canvas ref={canvasRef} className="hidden" />
                                            </>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {enhancedVideoUrl && (
                        <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4">
                            <Button onClick={handleDownload} size="lg" className="px-8 shadow-xl">
                                <Download className="mr-2 h-5 w-5" />
                                Download Upscaled Video (WebM)
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </ToolWrapper>
    )
}
