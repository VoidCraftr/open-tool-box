"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Upload, Download, Image as ImageIcon, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

export function SvgConverter() {
    const [svgFile, setSvgFile] = useState<File | null>(null)
    const [svgContent, setSvgContent] = useState<string | null>(null)
    const [scale, setScale] = useState(1)
    const [format, setFormat] = useState<"png" | "jpeg">("png")
    const [originalSize, setOriginalSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

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

        ctx.clearRect(0, 0, width, height)
        if (format === "jpeg") {
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, width, height)
        }

        ctx.drawImage(img, 0, 0, width, height)
    }

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

    const handleClear = () => {
        setSvgFile(null)
        setSvgContent(null)
        setScale(1)
    }

    return (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Upload & Preview Section */}
            <Card className="bg-card border border-border shadow-sm flex flex-col min-h-[500px]">
                <CardHeader className="border-b border-border bg-muted/40">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold">Upload SVG</CardTitle>
                        {svgFile && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClear}
                                className="h-8 text-xs text-muted-foreground hover:text-destructive"
                            >
                                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                                Clear
                            </Button>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-center items-center p-8">
                    {!svgFile ? (
                        <div className="text-center space-y-6 max-w-md">
                            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Select SVG File</h3>
                                <p className="text-sm text-muted-foreground">
                                    Upload your SVG file to convert it to PNG or JPG
                                </p>
                            </div>
                            <Input
                                type="file"
                                accept=".svg"
                                className="hidden"
                                id="svg-upload"
                                onChange={handleFileUpload}
                            />
                            <Button asChild className="w-full">
                                <label htmlFor="svg-upload" className="cursor-pointer">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File
                                </label>
                            </Button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full h-full flex flex-col items-center justify-center gap-4"
                        >
                            <div className="relative p-6 rounded-xl bg-muted/30 border border-border w-full flex items-center justify-center min-h-[300px]">
                                <img
                                    src={svgContent || ""}
                                    alt="SVG Preview"
                                    className="max-w-full max-h-[350px] object-contain"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground font-medium">
                                {svgFile.name}
                            </p>
                        </motion.div>
                    )}
                </CardContent>
            </Card>

            {/* Settings Panel */}
            <Card className="bg-card border border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/40">
                    <CardTitle className="text-sm font-semibold">Export Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    {/* Output Format */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Output Format</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setFormat("png")}
                                className={`px-4 py-3 rounded-lg border transition-all text-sm font-medium ${format === "png"
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-background border-border hover:bg-accent"
                                    }`}
                            >
                                PNG<br />
                                <span className="text-xs opacity-70">Transparent</span>
                            </button>
                            <button
                                onClick={() => setFormat("jpeg")}
                                className={`px-4 py-3 rounded-lg border transition-all text-sm font-medium ${format === "jpeg"
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-background border-border hover:bg-accent"
                                    }`}
                            >
                                JPG<br />
                                <span className="text-xs opacity-70">White BG</span>
                            </button>
                        </div>
                    </div>

                    {/* Scale Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label className="text-sm font-medium">Resolution Scale</Label>
                            <span className="text-lg font-semibold text-primary">{scale}x</span>
                        </div>
                        <Slider
                            value={[scale]}
                            onValueChange={(val) => setScale(val[0])}
                            min={0.5}
                            max={8}
                            step={0.5}
                            disabled={!svgFile}
                            className="py-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0.5x</span>
                            <span>8x</span>
                        </div>
                    </div>

                    {/* Target Size Display */}
                    {svgFile && (
                        <div className="p-4 bg-muted/50 rounded-lg border border-border">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-medium text-muted-foreground">Output Size</span>
                                <span className="text-sm font-mono font-semibold">
                                    {Math.round(originalSize.width * scale)} × {Math.round(originalSize.height * scale)} px
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Download Button */}
                    <Button
                        disabled={!svgFile}
                        onClick={handleDownload}
                        className="w-full h-11"
                        size="lg"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download Image
                    </Button>

                    {/* Privacy Note */}
                    <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        <p className="font-medium mb-1">🔒 Client-Side Processing</p>
                        <p className="opacity-80">Your SVG file is converted entirely in your browser. No data is uploaded to any server.</p>
                    </div>
                </CardContent>
            </Card>

            {/* Hidden Canvas */}
            <div className="hidden">
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}
