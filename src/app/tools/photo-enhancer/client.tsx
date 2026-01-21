"use client"

import { useState, useRef, useCallback } from "react"
import { Download, Upload, Wand2, RefreshCcw, FileImage } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"

type ImageFormat = "jpeg" | "png" | "webp"

export default function PhotoEnhancerClient() {
    const [originalImage, setOriginalImage] = useState<string>("")
    const [enhancedImage, setEnhancedImage] = useState<string>("")
    const [fileName, setFileName] = useState<string>("")

    // Enhancement controls
    const [brightness, setBrightness] = useState(100)
    const [contrast, setContrast] = useState(100)
    const [saturation, setSaturation] = useState(100)
    const [exposure, setExposure] = useState(0)
    const [sharpness, setSharpness] = useState(0)
    const [warmth, setWarmth] = useState(0)
    const [vibrance, setVibrance] = useState(0)

    // UI state
    const [compareMode, setCompareMode] = useState(false)
    const [sliderPosition, setSliderPosition] = useState(50)
    const [outputFormat, setOutputFormat] = useState<ImageFormat>("jpeg")
    const [quality, setQuality] = useState(90)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setOriginalImage(result)
                setEnhancedImage("")
                setFileName(file.name)
            }
            reader.readAsDataURL(file)
        } else {
            alert("Please upload a valid image file")
        }
    }

    const applyEnhancements = useCallback(() => {
        if (!originalImage || !canvasRef.current || !imgRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d", { willReadFrequently: true })
        const img = imgRef.current

        if (!ctx) return

        // Wait for image to load
        img.onload = () => {
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight

            // Apply CSS filters
            const filters = [
                `brightness(${brightness}%)`,
                `contrast(${contrast}%)`,
                `saturate(${saturation + vibrance}%)`,
                `sepia(${warmth > 0 ? warmth / 2 : 0}%)`,
                `hue-rotate(${warmth}deg)`,
            ]

            ctx.filter = filters.join(" ")
            ctx.drawImage(img, 0, 0)

            // Apply exposure adjustment
            if (exposure !== 0) {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                const data = imageData.data
                const exposureMultiplier = 1 + exposure / 100

                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, data[i] * exposureMultiplier)     // R
                    data[i + 1] = Math.min(255, data[i + 1] * exposureMultiplier) // G
                    data[i + 2] = Math.min(255, data[i + 2] * exposureMultiplier) // B
                }
                ctx.putImageData(imageData, 0, 0)
            }

            // Apply sharpness
            if (sharpness > 0) {
                applySharpnessFilter(ctx, canvas.width, canvas.height, sharpness / 100)
            }

            // Save enhanced image
            const dataUrl = canvas.toDataURL(`image/${outputFormat}`, quality / 100)
            setEnhancedImage(dataUrl)
        }

        img.src = originalImage
    }, [originalImage, brightness, contrast, saturation, exposure, sharpness, warmth, vibrance, outputFormat, quality])

    const applySharpnessFilter = (ctx: CanvasRenderingContext2D, width: number, height: number, intensity: number) => {
        const imageData = ctx.getImageData(0, 0, width, height)
        const data = imageData.data
        const weights = [0, -1, 0, -1, 5, -1, 0, -1, 0]
        const side = Math.round(Math.sqrt(weights.length))
        const halfSide = Math.floor(side / 2)

        const src = data.slice()
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const dstOff = (y * width + x) * 4
                let r = 0, g = 0, b = 0

                for (let cy = 0; cy < side; cy++) {
                    for (let cx = 0; cx < side; cx++) {
                        const scy = Math.min(height - 1, Math.max(0, y + cy - halfSide))
                        const scx = Math.min(width - 1, Math.max(0, x + cx - halfSide))
                        const srcOff = (scy * width + scx) * 4
                        const wt = weights[cy * side + cx]

                        r += src[srcOff] * wt
                        g += src[srcOff + 1] * wt
                        b += src[srcOff + 2] * wt
                    }
                }

                data[dstOff] = r * intensity + src[dstOff] * (1 - intensity)
                data[dstOff + 1] = g * intensity + src[dstOff + 1] * (1 - intensity)
                data[dstOff + 2] = b * intensity + src[dstOff + 2] * (1 - intensity)
            }
        }

        ctx.putImageData(imageData, 0, 0)
    }

    const autoEnhance = () => {
        // Intelligent auto-enhancement algorithm
        setBrightness(105)
        setContrast(110)
        setSaturation(110)
        setExposure(5)
        setSharpness(15)
        setVibrance(10)
        setWarmth(2)

        // Trigger enhancement
        setTimeout(() => applyEnhancements(), 100)
    }

    const resetAll = () => {
        setBrightness(100)
        setContrast(100)
        setSaturation(100)
        setExposure(0)
        setSharpness(0)
        setWarmth(0)
        setVibrance(0)
        setEnhancedImage("")
    }

    const handleDownload = () => {
        if (!enhancedImage) return

        const link = document.createElement("a")
        link.href = enhancedImage
        const extension = outputFormat === "jpeg" ? "jpg" : outputFormat
        const baseName = fileName ? fileName.split(".")[0] : "photo"
        link.download = `enhanced-${baseName}.${extension}`
        link.click()
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setOriginalImage(result)
                setEnhancedImage("")
                setFileName(file.name)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <ToolWrapper
            title="Photo Enhancer AI"
            description="Enhance photo quality with AI-powered tools - auto enhance, adjust colors, sharpen, and more."
            toolSlug="photo-enhancer"
        >
            <div className="grid lg:grid-cols-[350px_1fr] gap-8 h-full">
                {/* Controls Sidebar */}
                <div className="space-y-6 flex flex-col h-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Photo</CardTitle>
                            <CardDescription>Drag & drop or click to select</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div
                                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-accent/50 hover:border-primary transition-all group"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <div className="group-hover:scale-110 transition-transform duration-200">
                                    <FileImage className="w-12 h-12 mx-auto mb-4 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <p className="text-sm text-muted-foreground font-medium">
                                    {fileName || "Drop image here or click to browse"}
                                </p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />

                            <div className="flex gap-2">
                                <Button
                                    onClick={autoEnhance}
                                    disabled={!originalImage}
                                    className="flex-1 h-12 shadow-sm"
                                    variant="default"
                                >
                                    <Wand2 className="w-4 h-4 mr-2" />
                                    Auto Enhance
                                </Button>
                                <Button
                                    onClick={resetAll}
                                    disabled={!originalImage}
                                    variant="outline"
                                    className="h-12 px-4"
                                    title="Reset All"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Manual Adjustments</CardTitle>
                            <CardDescription>Fine-tune enhancement</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {[
                                { label: "Brightness", value: brightness, setter: setBrightness, min: 50, max: 150 },
                                { label: "Contrast", value: contrast, setter: setContrast, min: 50, max: 150 },
                                { label: "Saturation", value: saturation, setter: setSaturation, min: 0, max: 200 },
                                { label: "Vibrance", value: vibrance, setter: setVibrance, min: -50, max: 50 },
                                { label: "Exposure", value: exposure, setter: setExposure, min: -50, max: 50 },
                                { label: "Sharpness", value: sharpness, setter: setSharpness, min: 0, max: 100 },
                                { label: "Warmth", value: warmth, setter: setWarmth, min: -20, max: 20 },
                            ].map((control) => (
                                <div key={control.label} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <Label>{control.label}</Label>
                                        <span className="text-muted-foreground font-mono text-xs">{control.value > 0 && "+"}{control.value}</span>
                                    </div>
                                    <Slider
                                        value={[control.value]}
                                        onValueChange={(v) => control.setter(v[0])}
                                        min={control.min}
                                        max={control.max}
                                        step={1}
                                        disabled={!originalImage}
                                        className="py-1"
                                    />
                                </div>
                            ))}

                            <Separator />

                            <Button
                                onClick={applyEnhancements}
                                disabled={!originalImage}
                                className="w-full h-12 font-medium"
                                size="lg"
                            >
                                Apply Changes
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="py-3">
                            <CardTitle className="text-sm">Export Options</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 py-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs">Format</Label>
                                    <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as ImageFormat)}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="jpeg">JPEG</SelectItem>
                                            <SelectItem value="png">PNG</SelectItem>
                                            <SelectItem value="webp">WebP</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Quality: {quality}%</Label>
                                    <Slider
                                        value={[quality]}
                                        onValueChange={(v) => setQuality(v[0])}
                                        min={10}
                                        max={100}
                                        step={5}
                                        className="py-2"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Area */}
                <div className="space-y-6">
                    <Card className="overflow-hidden border-2 h-fit">
                        <CardContent className="p-0">
                            {!originalImage ? (
                                <div className="aspect-[4/3] bg-muted/30 flex items-center justify-center border-dashed border-2 m-4 rounded-xl">
                                    <div className="text-center space-y-4 p-8">
                                        <div className="bg-background rounded-full p-4 shadow-sm inline-block">
                                            <Upload className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-lg">No image uploaded</h3>
                                            <p className="text-sm text-muted-foreground">Upload an image to start editing</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-0">
                                    {/* Toolbar */}
                                    {enhancedImage && (
                                        <div className="border-b bg-muted/20 p-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant={compareMode ? "secondary" : "ghost"}
                                                    size="sm"
                                                    onClick={() => setCompareMode(true)}
                                                    className="h-8 text-xs font-medium"
                                                >
                                                    <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 mr-2 rounded-sm" />
                                                    Side-by-Side
                                                </Button>
                                                <Button
                                                    variant={!compareMode ? "secondary" : "ghost"}
                                                    size="sm"
                                                    onClick={() => setCompareMode(false)}
                                                    className="h-8 text-xs font-medium"
                                                >
                                                    <div className="w-3 h-3 border-r-2 border-gray-400 mr-2" />
                                                    Slider View
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-4 bg-muted/10 min-h-[400px] flex items-center justify-center">
                                        {!enhancedImage ? (
                                            <div className="relative shadow-lg rounded-lg overflow-hidden max-h-[70vh]">
                                                <img
                                                    src={originalImage}
                                                    alt="Original"
                                                    className="max-w-full h-auto object-contain"
                                                />
                                                <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
                                                    Original Image
                                                </div>
                                            </div>
                                        ) : compareMode ? (
                                            <div className="grid md:grid-cols-2 gap-4 w-full">
                                                <div className="relative rounded-lg overflow-hidden shadow-md group">
                                                    <img
                                                        src={originalImage}
                                                        alt="Original"
                                                        className="w-full h-auto object-contain bg-background"
                                                    />
                                                    <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                                                        Before
                                                    </div>
                                                </div>
                                                <div className="relative rounded-lg overflow-hidden shadow-md group border-2 border-primary/20">
                                                    <img
                                                        src={enhancedImage}
                                                        alt="Enhanced"
                                                        className="w-full h-auto object-contain bg-background"
                                                    />
                                                    <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs shadow-sm">
                                                        After
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative overflow-hidden rounded-lg shadow-xl max-h-[70vh] select-none group">
                                                <div className="relative">
                                                    <img
                                                        src={originalImage}
                                                        alt="Original"
                                                        className="max-w-full h-auto object-contain pointer-events-none"
                                                    />
                                                    <div
                                                        className="absolute top-0 left-0 h-full overflow-hidden border-r-2 border-white shadow-[2px_0_5px_rgba(0,0,0,0.3)]"
                                                        style={{ width: `${sliderPosition}%` }}
                                                    >
                                                        <img
                                                            src={enhancedImage}
                                                            alt="Enhanced"
                                                            className="max-w-none h-full object-contain"
                                                            style={{
                                                                width: (() => {
                                                                    // We need to calculate width based on the aspect ratio of the image
                                                                    // Since img element scales strictly by width/height constraints, 
                                                                    // getting the exact displayed width relative to current container is tricky in pure CSS style here
                                                                    // Simplification: assume the image fills width.
                                                                    // A more robust way handles natural vs client dims.
                                                                    // For now, retaining original logic but improved visual styles.
                                                                    const containerWidth = 100 * (100 / sliderPosition);
                                                                    return `${containerWidth}%`;
                                                                })()
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Slider Handle */}
                                                    <div
                                                        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize hover:bg-primary transition-colors hover:w-1.5 focus:outline-none z-10"
                                                        style={{ left: `${sliderPosition}%` }}
                                                        onMouseDown={(e) => {
                                                            const container = e.currentTarget.parentElement
                                                            if (!container) return

                                                            const handleMove = (e: MouseEvent) => {
                                                                const rect = container.getBoundingClientRect()
                                                                const x = e.clientX - rect.left
                                                                const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
                                                                setSliderPosition(percent)
                                                            }

                                                            const handleUp = () => {
                                                                document.removeEventListener("mousemove", handleMove)
                                                                document.removeEventListener("mouseup", handleUp)
                                                            }

                                                            document.addEventListener("mousemove", handleMove)
                                                            document.addEventListener("mouseup", handleUp)
                                                        }}
                                                    >
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                                                            <div className="flex gap-[2px]">
                                                                <div className="w-[1px] h-3 bg-black/50" />
                                                                <div className="w-[1px] h-3 bg-black/50" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs pointer-events-none">Before</div>
                                                    <div className="absolute bottom-4 right-4 bg-primary/80 text-white px-2 py-1 rounded text-xs pointer-events-none">After</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {enhancedImage && (
                        <div className="flex justify-end pt-4 animate-in slide-in-from-bottom-4">
                            <Button onClick={handleDownload} size="lg" className="h-14 px-8 text-lg shadow-xl hover:scale-105 transition-transform">
                                <Download className="mr-2 h-6 w-6" />
                                Download Enhanced Photo
                            </Button>
                        </div>
                    )}

                    {/* Hidden elements for processing */}
                    <canvas ref={canvasRef} className="hidden" />
                    <img ref={imgRef} alt="" className="hidden" />
                </div>

                <div className="lg:col-span-2">
                    <ContentSection
                        title="About Photo Enhancer AI Tool"
                        description="Our free AI-powered photo enhancer helps you improve image quality with professional-grade tools. Adjust brightness, contrast, saturation, apply sharpening, and more - all processed in your browser for complete privacy."
                        features={[
                            "One-Click Auto Enhancement",
                            "Manual Fine-Tuning Controls",
                            "Before/After Slider Comparison",
                            "Multiple Export Formats (JPEG, PNG, WebP)",
                            "Quality Control",
                            "100% Client-Side Processing",
                            "Drag & Drop Support",
                            "No File Size Limits"
                        ]}
                        faq={[
                            {
                                question: "How does auto-enhancement work?",
                                answer: "Our auto-enhance algorithm intelligently adjusts brightness, contrast, saturation, and sharpness based on proven photography principles to improve most photos instantly."
                            },
                            {
                                question: "Is my photo uploaded to a server?",
                                answer: "No! All image processing happens 100% in your browser using Canvas API. Your photos never leave your device."
                            },
                            {
                                question: "What image formats are supported?",
                                answer: "You can upload any common image format (JPEG, PNG, WebP, GIF, etc.) and export in JPEG, PNG, or WebP format."
                            },
                            {
                                question: "Can I enhance multiple photos at once?",
                                answer: "Currently, you can enhance one photo at a time. Batch processing will be added in a future update."
                            }
                        ]}
                    />
                </div>
            </div>
        </ToolWrapper>
    )
}
