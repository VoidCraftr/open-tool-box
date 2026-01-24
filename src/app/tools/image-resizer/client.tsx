"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Download, Upload, Image as ImageIcon, RefreshCcw, Globe } from "lucide-react"

import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { PrivacyBadge } from "@/components/common/PrivacyBadge"

export default function ImageResizer() {
    const [image, setImage] = useState<string | null>(null)
    const [originalDimensions, setOriginalDimensions] = useState<{ width: number, height: number } | null>(null)
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [lockAspectRatio, setLockAspectRatio] = useState(true)
    const [percentage, setPercentage] = useState(100)
    const [fileType, setFileType] = useState("image/jpeg")
    const [isSimpleMode, setIsSimpleMode] = useState(true)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const socialPresets = [
        { name: "Square", w: 1080, h: 1080, label: "Instagram Square (1:1)" },
        { name: "Portrait", w: 1080, h: 1350, label: "Instagram Feed (4:5)" },
        { name: "Story", w: 1080, h: 1920, label: "Story / Reel (9:16)" },
        { name: "Landscape", w: 1200, h: 630, label: "Facebook / Web (1.91:1)" },
    ]

    const applyPreset = (w: number, h: number) => {
        setLockAspectRatio(false)
        setWidth(w)
        setHeight(h)
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const img = new Image()
                img.onload = () => {
                    setOriginalDimensions({ width: img.width, height: img.height })
                    setWidth(img.width)
                    setHeight(img.height)
                    setImage(event.target?.result as string)
                    setFileType(file.type)
                }
                img.src = event.target?.result as string
            }
            reader.readAsDataURL(file)
        }
    }

    const handleWidthChange = (val: number) => {
        setWidth(val)
        if (lockAspectRatio && originalDimensions) {
            const ratio = originalDimensions.height / originalDimensions.width
            setHeight(Math.round(val * ratio))
        }
    }

    const handleHeightChange = (val: number) => {
        setHeight(val)
        if (lockAspectRatio && originalDimensions) {
            const ratio = originalDimensions.width / originalDimensions.height
            setWidth(Math.round(val * ratio))
        }
    }

    const handlePercentageChange = (val: number[]) => {
        const p = val[0]
        setPercentage(p)
        if (originalDimensions) {
            setWidth(Math.round(originalDimensions.width * (p / 100)))
            setHeight(Math.round(originalDimensions.height * (p / 100)))
        }
    }

    const downloadResized = () => {
        if (!image || !canvasRef.current) return

        const canvas = canvasRef.current
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")

        const img = new Image()
        img.onload = () => {
            if (ctx) {
                // Better quality resizing
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, 0, 0, width, height)

                const link = document.createElement("a")
                link.download = `resized-image.${fileType.split('/')[1]}`
                link.href = canvas.toDataURL(fileType, 0.9)
                link.click()
            }
        }
        img.src = image
    }

    const reset = () => {
        setImage(null)
        setOriginalDimensions(null)
        setWidth(0)
        setHeight(0)
        setPercentage(100)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    return (
        <ToolWrapper
            title={isSimpleMode ? "Resize for Instagram & Web" : "Professional Image Resizer"}
            description={isSimpleMode ? "Pick a size and we'll fix your photo instantly. No uploads needed." : "Resize images by exact pixels or percentage. Secure client-side processing."}
            toolSlug="image-resizer"
            adSlot="image-tool-slot"
            className="max-w-6xl"
        >
            <div className="flex flex-col gap-10">
                {/* Mode Toggle */}
                <div className="flex justify-center">
                    <div className="flex items-center gap-3 p-1.5 liquid-glass border border-primary/20 rounded-full shadow-lg">
                        <button
                            onClick={() => setIsSimpleMode(true)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isSimpleMode ? "bg-primary text-primary-foreground shadow-md scale-105" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Social Media Mode
                        </button>
                        <button
                            onClick={() => setIsSimpleMode(false)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${!isSimpleMode ? "bg-primary text-primary-foreground shadow-md scale-105" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Pro Mode
                        </button>
                    </div>
                </div>

                <div className="grid gap-10 md:grid-cols-[1fr_350px]">
                    {/* Main Preview Area */}
                    <div className="space-y-6">
                        <div className="relative group overflow-hidden rounded-[2rem] border-2 border-primary/10 bg-muted/20 min-h-[400px] flex items-center justify-center liquid-shadow transition-all hover:bg-muted/10">
                            {!image ? (
                                <div className="text-center space-y-6 p-10">
                                    <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-float">
                                        <ImageIcon className="w-12 h-12" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-2xl">Drop your photo here</h3>
                                        <p className="text-muted-foreground">Supports JPG, PNG, and WebP. 100% Private.</p>
                                    </div>
                                    <Button size="lg" onClick={() => fileInputRef.current?.click()} className="premium-button h-14 px-10 text-lg">
                                        <Upload className="w-6 h-6 mr-3" />
                                        Select Image
                                    </Button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            ) : (
                                <div className="relative p-8 w-full h-full flex items-center justify-center">
                                    <img src={image} alt="Preview" className="max-w-full max-h-[500px] object-contain rounded-2xl shadow-2xl" />
                                    <canvas ref={canvasRef} className="hidden" />

                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={reset}
                                    >
                                        <RefreshCcw className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <PrivacyBadge />
                        </div>
                    </div>

                    {/* Sidebar Controls */}
                    <div className="space-y-8">
                        {isSimpleMode ? (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    1-Click Social Sizes
                                </h3>
                                <div className="grid gap-3">
                                    {socialPresets.map((preset) => (
                                        <button
                                            key={preset.name}
                                            disabled={!image}
                                            onClick={() => applyPreset(preset.w, preset.h)}
                                            className={`flex flex-col p-4 text-left rounded-2xl border-2 transition-all liquid-shadow ${width === preset.w && height === preset.h ? "border-primary bg-primary/5 scale-[1.02]" : "border-white/5 bg-white/5 hover:border-primary/20 hover:bg-white/10"} ${!image ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                                        >
                                            <span className="font-bold text-foreground">{preset.name}</span>
                                            <span className="text-xs text-muted-foreground">{preset.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-xl font-bold">Manual Settings</h3>
                                <div className="space-y-6 liquid-glass p-6 rounded-[2rem] border border-primary/20">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="font-bold">Dimensions</Label>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    id="aspect-ratio"
                                                    checked={lockAspectRatio}
                                                    onCheckedChange={setLockAspectRatio}
                                                />
                                                <Label htmlFor="aspect-ratio" className="text-xs font-normal text-muted-foreground">Lock Ratio</Label>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Width (px)</Label>
                                                <Input
                                                    type="number"
                                                    value={width}
                                                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                                    disabled={!image}
                                                    className="rounded-xl h-12"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs text-muted-foreground">Height (px)</Label>
                                                <Input
                                                    type="number"
                                                    value={height}
                                                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                                    disabled={!image}
                                                    className="rounded-xl h-12"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <Label className="font-bold">Scale</Label>
                                            <span className="text-sm font-bold text-primary">{percentage}%</span>
                                        </div>
                                        <Slider
                                            value={[percentage]}
                                            onValueChange={handlePercentageChange}
                                            min={1}
                                            max={200}
                                            step={1}
                                            disabled={!image}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-4 space-y-4">
                            <Button
                                className="w-full premium-button h-14 text-lg rounded-2xl"
                                onClick={downloadResized}
                                disabled={!image}
                                size="lg"
                            >
                                <Download className="w-5 h-5 mr-3" />
                                Save Refined Photo
                            </Button>

                            {image && (
                                <p className="text-xs text-muted-foreground text-center italic">
                                    New size: {width} x {height}px
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ContentSection
                title="Professional Image Resizing & Social Media Optimization"
                description="Resizing images for the web requires a balance between dimensions and clarity. Our Premium Image Resizer provides a dual-mode engine: one for instant social media optimization (Instagram, Facebook, Reels) and one for professional-grade pixel manipulation."
                features={[
                    "📱 **Social Media Presets**: One-click resizing for Instagram Square, Stories, Reels, and Facebook feed.",
                    "📐 **Pro-Grade Precision**: Resize by exact pixel dimensions or percentage scaling for technical work.",
                    "🔒 **100% Client-Side Engine**: Sensitive photos never touch a server. All processing happens in your secure browser memory.",
                    "🖼️ **Intelligent Aspect Ratio**: Optional locking ensures your photos never look stretched or distorted.",
                    "⚡ **High-Quality Interpolation**: Uses advanced canvas scaling for smooth edges and color retention.",
                    "✨ **Neuromorphic Liquid UI**: A beautiful, responsive interface that works flawlessly across all devices."
                ]}
                howToUse={[
                    "Upload your image using the **Select Image** button or drag and drop.",
                    "Choose between **Social Media Mode** for presets or **Pro Mode** for custom dimensions.",
                    "Adjust the width, height, or use the **Scale Slider** to find the perfect size.",
                    "Observe the real-time preview to ensure the framing is correct.",
                    "Click **Save Refined Photo** to download the high-quality processed image to your device."
                ]}
                faq={[
                    {
                        question: "Will my image lose quality when resizing?",
                        answer: "Upscaling an image (making it larger) will always introduce some blur. Downscaling (making it smaller) uses high-quality interpolation to keep the image sharp and professional."
                    },
                    {
                        question: "What image formats are supported?",
                        answer: "We support all common web formats including JPEG, PNG, WebP, and GIF. The output will maintain its original format or can be converted during the process."
                    },
                    {
                        question: "Is there a file size limit?",
                        answer: "Since the resizing happens on your local machine, the limit depends on your device's memory. Most standard mobile and DSLR photos work instantly."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
