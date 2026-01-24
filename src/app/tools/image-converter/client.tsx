"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, Download, Image as ImageIcon, RefreshCcw, Check, Zap, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { PrivacyBadge } from "@/components/common/PrivacyBadge"

export default function ImageConverterClient() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [format, setFormat] = useState("image/png")
    const [quality, setQuality] = useState([0.9])
    const [isConverting, setIsConverting] = useState(false)
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null)
    const [stats, setStats] = useState<{ original: string, compressed: string, saved: string } | null>(null)
    const [isSimpleMode, setIsSimpleMode] = useState(true)

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile)
            setConvertedUrl(null)
            setStats(null)

            const reader = new FileReader()
            reader.onload = (ev) => {
                setPreview(ev.target?.result as string)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const applyPreset = (fmt: string, q: number) => {
        setFormat(fmt)
        setQuality([q])
    }

    const handleConvert = () => {
        if (!file || !preview) return

        setIsConverting(true)
        const img = new Image()
        img.src = preview
        img.onload = () => {
            const canvas = canvasRef.current
            if (canvas) {
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext("2d")
                if (ctx) {
                    // Fill white background for JPEGs if needed
                    if (format === "image/jpeg") {
                        ctx.fillStyle = "#FFFFFF"
                        ctx.fillRect(0, 0, canvas.width, canvas.height)
                    }
                    ctx.drawImage(img, 0, 0)

                    // Quality only applies to jpeg/webp
                    const q = (format === "image/jpeg" || format === "image/webp") ? quality[0] : undefined
                    const newUrl = canvas.toDataURL(format, q)

                    setConvertedUrl(newUrl)

                    // Calculate sizes
                    const head = `data:${format};base64,`
                    const size = Math.round((newUrl.length - head.length) * 3 / 4)
                    const savedBytes = file.size - size
                    const savedPercent = Math.round((savedBytes / file.size) * 100)

                    setStats({
                        original: formatSize(file.size),
                        compressed: formatSize(size),
                        saved: savedBytes > 0 ? `-${savedPercent}%` : '+0%'
                    })

                    setIsConverting(false)
                }
            }
        }
    }

    const handleDownload = () => {
        if (convertedUrl) {
            const link = document.createElement("a")
            link.download = `converted-${Date.now()}.${format.split("/")[1]}`
            link.href = convertedUrl
            link.click()
        }
    }

    return (
        <ToolWrapper
            title={isSimpleMode ? "Optimize & Convert My Photos" : "Professional Image Engine"}
            description={isSimpleMode ? "Make your photos smaller or change their format instantly. Private & Secure." : "Convert images between different formats securely with full control."}
            toolSlug="image-converter"
            adSlot="image-converter-slot"
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
                            Smart Auto
                        </button>
                        <button
                            onClick={() => setIsSimpleMode(false)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${!isSimpleMode ? "bg-primary text-primary-foreground shadow-md scale-105" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Manual Pro
                        </button>
                    </div>
                </div>

                <div className="grid gap-10 md:grid-cols-[1fr_400px]">
                    <div className="space-y-6">
                        <div className="relative group overflow-hidden rounded-[2rem] border-2 border-primary/10 bg-muted/20 min-h-[400px] flex items-center justify-center liquid-shadow transition-all hover:bg-muted/10">
                            {!preview ? (
                                <div className="text-center space-y-6 p-10">
                                    <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-float">
                                        <Upload className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-2xl">Drop your photo here</h3>
                                        <p className="text-muted-foreground">We handle the conversion 100% locally.</p>
                                    </div>
                                    <Label htmlFor="image-upload" className="cursor-pointer">
                                        <Button size="lg" asChild className="premium-button h-14 px-10 text-lg pointer-events-none">
                                            <span>Select Your Photo</span>
                                        </Button>
                                    </Label>
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            ) : (
                                <div className="relative p-8 w-full h-full flex items-center justify-center flex-col gap-4">
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                                        <img src={preview} alt="Preview" className="max-w-full max-h-[400px] object-contain rounded-2xl shadow-2xl" />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-4 -right-4 rounded-full liquid-shadow"
                                            onClick={() => { setFile(null); setPreview(null); setConvertedUrl(null); }}
                                        >
                                            <RefreshCcw className="w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                    {file && <p className="text-sm font-bold opacity-60">Source: {formatSize(file.size)}</p>}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <PrivacyBadge />
                        </div>
                    </div>

                    <div className="space-y-8">
                        {isSimpleMode ? (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    Pick Optimization Target
                                </h3>
                                <div className="grid gap-3">
                                    <button
                                        onClick={() => applyPreset("image/webp", 0.75)}
                                        className={`flex flex-col p-5 text-left rounded-3xl border-2 transition-all liquid-shadow ${format === "image/webp" ? "border-primary bg-primary/5 scale-[1.02]" : "border-white/5 bg-white/5 hover:border-primary/20"}`}
                                    >
                                        <span className="font-black text-foreground">Extreme Compression</span>
                                        <span className="text-xs text-muted-foreground">Best for blogs and websites (WebP).</span>
                                    </button>
                                    <button
                                        onClick={() => applyPreset("image/jpeg", 0.9)}
                                        className={`flex flex-col p-5 text-left rounded-3xl border-2 transition-all liquid-shadow ${format === "image/jpeg" ? "border-primary bg-primary/5 scale-[1.02]" : "border-white/5 bg-white/5 hover:border-primary/20"}`}
                                    >
                                        <span className="font-black text-foreground">Photography Standard</span>
                                        <span className="text-xs text-muted-foreground">High quality JPG (90% quality).</span>
                                    </button>
                                    <button
                                        onClick={() => applyPreset("image/png", 1)}
                                        className={`flex flex-col p-5 text-left rounded-3xl border-2 transition-all liquid-shadow ${format === "image/png" ? "border-primary bg-primary/5 scale-[1.02]" : "border-white/5 bg-white/5 hover:border-primary/20"}`}
                                    >
                                        <span className="font-black text-foreground">Lossless PNG</span>
                                        <span className="text-xs text-muted-foreground">Perfect for logos and graphics.</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fade-in">
                                <div className="space-y-4 liquid-glass p-8 rounded-[2rem] border border-primary/20">
                                    <div className="space-y-2">
                                        <Label className="font-bold">Output Format</Label>
                                        <Select value={format} onValueChange={setFormat}>
                                            <SelectTrigger className="h-12 rounded-xl">
                                                <SelectValue placeholder="Select format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="image/png">PNG (Lossless)</SelectItem>
                                                <SelectItem value="image/jpeg">JPEG (Universal)</SelectItem>
                                                <SelectItem value="image/webp">WebP (Modern)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {(format === "image/jpeg" || format === "image/webp") && (
                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <div className="flex justify-between">
                                                <Label className="font-bold">Compression Quality</Label>
                                                <span className="text-sm font-black text-primary">{Math.round(quality[0] * 100)}%</span>
                                            </div>
                                            <Slider
                                                value={quality}
                                                onValueChange={setQuality}
                                                min={0.1}
                                                max={1.0}
                                                step={0.05}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {!convertedUrl ? (
                                <Button onClick={handleConvert} disabled={!file || isConverting} className="w-full h-16 premium-button text-lg rounded-2xl group">
                                    {isConverting ? (
                                        <>
                                            <RefreshCcw className="mr-3 h-6 w-6 animate-spin" />
                                            Working...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="mr-3 h-6 w-6 text-yellow-400 group-hover:scale-125 transition-transform" />
                                            Process Now
                                        </>
                                    )}
                                </Button>
                            ) : (
                                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                                    {stats && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="liquid-glass p-4 rounded-2xl text-center border border-primary/10">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground">New Size</p>
                                                <p className="font-black text-lg">{stats.compressed}</p>
                                            </div>
                                            <div className="liquid-glass p-4 rounded-2xl text-center border border-green-500/20">
                                                <p className="text-[10px] uppercase font-bold text-green-500/60">Savings</p>
                                                <p className="font-black text-lg text-green-500">{stats.saved}</p>
                                            </div>
                                        </div>
                                    )}
                                    <Button onClick={handleDownload} className="w-full h-16 premium-button text-lg rounded-2xl shadow-green-500/20">
                                        <Download className="mr-3 h-6 w-6" /> Save Optimized Photo
                                    </Button>
                                    <Button variant="ghost" onClick={() => setConvertedUrl(null)} className="w-full rounded-xl">
                                        Try another setting
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />
            </div>

            <ContentSection
                title="The Most Secure Online Image Converter"
                description={`Convert images instantly in your browser **without uploading files to any server**. \n\nMost online converters upload your personal photos to a remote cloud server to process them. This creates privacy risks and slows down the process. **OpenToolbox Image Converter** is different. We use advanced HTML5 Canvas technology to read, process, and convert your images **locally on your device**.\n\nThis ensures **100% privacy**, zero data usage for uploading, and lightning-fast speeds compared to traditional server-side converters.`}
                features={[
                    "🔒 **Zero Server Uploads**: Your photos never leave your device.",
                    "🖼️ **Multi-Format Support**: Convert between JPG, PNG, and WebP instantly.",
                    "⚡ **Real-Time Preview**: See changes immediately before downloading.",
                    "📉 **Smart Compression**: Adjust quality to reduce file size by up to 80%.",
                    "🚀 **No Limits**: Convert as many images as you want, of any size.",
                    "✨ **Transparency Support**: Preserves transparent backgrounds for PNG and WebP."
                ]}
                howToUse={[
                    "Click the upload box or **Drag & Drop** your image file.",
                    "Select your target format (e.g., **WebP** for websites, **JPG** for photos).",
                    "Use the **Quality Slider** to balance file size vs. image clarity.",
                    "Check the **'Saved'** stat to see how much space you are saving.",
                    "Click **Download Image** to save the optimized file instantly."
                ]}
                faq={[
                    {
                        question: "Does this tool support transparent PNGs?",
                        answer: "Yes! If you convert to PNG or WebP, **transparency is fully preserved**. However, converting to JPEG will replace transparent areas with a white background because JPEG does not support transparency."
                    },
                    {
                        question: "Why should I convert to WebP?",
                        answer: "**WebP** is a modern image format that provides superior compression for images on the web. WebP images are typically **25-34% smaller** than comparable JPEG and PNG images, making your website load much faster."
                    },
                    {
                        question: "Is there a daily limit?",
                        answer: "No. Since the conversion happens on your own device, there are **no artificial limits**. You can convert hundreds of images without hitting a paywall."
                    },
                    {
                        question: "Will I lose image quality?",
                        answer: "It depends on your settings. If you convert PNG to PNG, it is lossless (no quality loss). If you convert to JPEG/WebP, you can control the quality slider. We recommend **80-90% quality** for the best balance of size and clarity."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
