"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, ArrowRight, Image as ImageIcon, Activity, Sparkles, ShieldCheck, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"

export function SvgConverter() {
    const [svgFile, setSvgFile] = useState<File | null>(null)
    const [svgContent, setSvgContent] = useState<string | null>(null)
    const [scale, setScale] = useState(1)
    const [format, setFormat] = useState<"png" | "jpeg">("png")
    const [originalSize, setOriginalSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 })
    const [isProcessing, setIsProcessing] = useState(false)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.type !== "image/svg+xml") {
                alert("Please upload a valid SVG file.")
                return
            }
            setSvgFile(file)

            const reader = new FileReader()
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setSvgContent(ev.target.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    // Render SVG to Canvas when content or scale changes
    useEffect(() => {
        if (!svgContent || !canvasRef.current) return

        const img = new Image()
        img.onload = () => {
            imgRef.current = img
            setOriginalSize({ width: img.width, height: img.height })
            drawCanvas(img, scale)
        }
        img.src = svgContent
    }, [svgContent, scale])

    const drawCanvas = (img: HTMLImageElement, scaleFactor: number) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const width = img.width * scaleFactor
        const height = img.height * scaleFactor

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Clear and set background if JPEG (since it doesn't support transparency)
        ctx.clearRect(0, 0, width, height)
        if (format === "jpeg") {
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, width, height)
        }

        ctx.drawImage(img, 0, 0, width, height)
    }

    // Re-draw if format changes (to handle transparency background)
    useEffect(() => {
        if (imgRef.current) {
            drawCanvas(imgRef.current, scale)
        }
    }, [format])


    const handleDownload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const dataUrl = canvas.toDataURL(`image/${format}`, 1.0)
        const link = document.createElement("a")
        link.download = `converted-image.${format}`
        link.href = dataUrl
        link.click()
    }

    return (
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Main Stage */}
            <div className="space-y-6">
                <Card className="premium-card border-white/10 bg-background/40 shadow-2xl relative overflow-hidden group min-h-[500px] flex flex-col">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <ImageIcon className="w-48 h-48" />
                    </div>

                    <CardHeader className="pb-4 relative z-10">
                        <CardTitle className="text-xl flex items-center gap-2 font-black italic">
                            <Activity className="w-5 h-5 text-primary" />
                            SVG Rendering Core
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col justify-center items-center relative z-10 p-8">
                        {!svgFile ? (
                            <div className="text-center space-y-6 max-w-sm">
                                <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-float">
                                    <Upload className="w-10 h-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black tracking-tighter">Vector Injection</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">Drop your SVG file here for neural rasterization. 100% Client-Side.</p>
                                </div>
                                <Input
                                    type="file"
                                    accept=".svg"
                                    className="hidden"
                                    id="svg-upload"
                                    onChange={handleFileUpload}
                                />
                                <Button asChild className="premium-button h-14 px-10 text-lg rounded-2xl w-full shadow-2xl shadow-primary/20">
                                    <label htmlFor="svg-upload" className="cursor-pointer flex items-center gap-3">
                                        <Sparkles className="w-5 h-5" /> Select Vector file
                                    </label>
                                </Button>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full h-full flex flex-col items-center justify-center"
                            >
                                <div className="relative p-6 rounded-[2rem] bg-white/5 border border-white/10 shadow-inner group-hover:shadow-primary/5 transition-all overflow-hidden bg-[url('/grid-pattern.png')] dark:bg-[url('/grid-pattern-dark.png')]">
                                    <img
                                        src={svgContent || ""}
                                        alt="Vector Preview"
                                        className="max-w-full max-h-[400px] object-contain relative z-10 drop-shadow-2xl"
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => { setSvgFile(null); setSvgContent(null); }}
                                    className="mt-6 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 rounded-full h-10 px-6 transition-all"
                                >
                                    Eject Source File
                                </Button>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Sidebar Controls */}
            <div className="space-y-6">
                <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground opacity-60">
                            Rasterization Engine
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Format Selection */}
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">Output Format</Label>
                            <div className="grid grid-cols-2 gap-2 p-1 bg-black/20 rounded-xl border border-white/5">
                                {[
                                    { id: 'png', label: 'PNG', sub: 'Alpha' },
                                    { id: 'jpeg', label: 'JPG', sub: 'White bg' }
                                ].map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => setFormat(f.id as any)}
                                        className={`flex flex-col items-center justify-center py-3 rounded-lg transition-all ${format === f.id ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-white/5 opacity-50'}`}
                                    >
                                        <span className="text-sm font-black">{f.label}</span>
                                        <span className="text-[8px] font-bold uppercase opacity-60">{f.sub}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Scaling Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <Label className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">Resolution Scale</Label>
                                <span className="text-xl font-mono font-black text-primary">{scale}X</span>
                            </div>
                            <Slider
                                value={[scale]}
                                onValueChange={(val) => setScale(val[0])}
                                min={0.5}
                                max={8}
                                step={0.5}
                                disabled={!svgFile}
                                className="py-4"
                            />
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Target Size</span>
                                <span className="text-xs font-mono font-bold tracking-tight">
                                    {Math.round(originalSize.width * scale)} &times; {Math.round(originalSize.height * scale)} px
                                </span>
                            </div>
                        </div>

                        <Separator className="bg-white/5" />

                        <Button
                            disabled={!svgFile}
                            onClick={handleDownload}
                            className="w-full premium-button h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 group"
                        >
                            <Download className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                            DOWNLOAD RASTER
                        </Button>
                    </CardContent>
                </Card>

                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 flex gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
                    <div className="p-2 bg-primary/10 rounded-lg h-fit group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-black text-primary italic uppercase tracking-tighter">Hardened Privacy</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Mathematical conversion occurs strictly in your device's memory. No external tracing.</p>
                    </div>
                </div>

                <div className="hidden">
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    )
}
