"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Upload, Crop, RotateCw, FlipHorizontal, FlipVertical, Type as TypeIcon, Square, Circle, Undo, Redo, Palette, Sliders } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"

type Tool = "none" | "crop" | "text" | "rect" | "circle"
type Filter = "none" | "grayscale" | "sepia" | "vintage" | "blur" | "sharpen" | "invert" | "brightness" | "contrast"

interface HistoryState {
    imageData: string
}

export default function ImageEditorClient() {
    const [image, setImage] = useState<string>("")
    const [fileName, setFileName] = useState<string>("")
    const [activeTool, setActiveTool] = useState<Tool>("none")

    // Edit state
    const [rotation, setRotation] = useState(0)
    const [flipH, setFlipH] = useState(false)
    const [flipV, setFlipV] = useState(false)
    const [brightness, setBrightness] = useState(100)
    const [contrast, setContrast] = useState(100)
    const [saturation, setSaturation] = useState(100)
    const [activeFilter, setActiveFilter] = useState<Filter>("none")

    // Text tool
    const [textInput, setTextInput] = useState("Your Text")
    const [textColor, setTextColor] = useState("#ffffff")
    const [textSize, setTextSize] = useState(48)

    // Shape tool
    const [shapeColor, setShapeColor] = useState("#ff0000")

    // History
    const [history, setHistory] = useState<HistoryState[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)

    // Export
    const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">("png")
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
                setImage(result)
                setFileName(file.name)
                resetState()
            }
            reader.readAsDataURL(file)
        }
    }

    const resetState = () => {
        setRotation(0)
        setFlipH(false)
        setFlipV(false)
        setBrightness(100)
        setContrast(100)
        setSaturation(100)
        setActiveFilter("none")
        setHistory([])
        setHistoryIndex(-1)
    }

    useEffect(() => {
        if (image) {
            renderCanvas()
        }
    }, [image, rotation, flipH, flipV, brightness, contrast, saturation, activeFilter])

    const renderCanvas = () => {
        if (!canvasRef.current || !imgRef.current || !image) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const img = imgRef.current

        img.onload = () => {
            // Set canvas size based on rotation
            if (rotation % 180 === 0) {
                canvas.width = img.naturalWidth
                canvas.height = img.naturalHeight
            } else {
                canvas.width = img.naturalHeight
                canvas.height = img.naturalWidth
            }

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Apply transformations
            ctx.save()
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate((rotation * Math.PI) / 180)
            ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1)

            // Apply filters
            const filters = [
                `brightness(${brightness}%)`,
                `contrast(${contrast}%)`,
                `saturate(${saturation}%)`,
            ]

            if (activeFilter === "grayscale") filters.push("grayscale(100%)")
            else if (activeFilter === "sepia") filters.push("sepia(100%)")
            else if (activeFilter === "vintage") {
                filters.push("sepia(50%)")
                filters.push("contrast(120%)")
                filters.push("saturate(80%)")
            } else if (activeFilter === "blur") filters.push("blur(3px)")
            else if (activeFilter === "invert") filters.push("invert(100%)")

            ctx.filter = filters.join(" ")

            // Draw image
            ctx.drawImage(
                img,
                -img.naturalWidth / 2,
                -img.naturalHeight / 2,
                img.naturalWidth,
                img.naturalHeight
            )

            ctx.restore()
        }

        img.src = image
    }

    const handleRotate = () => {
        setRotation((prev) => (prev + 90) % 360)
    }

    const handleFlipH = () => {
        setFlipH(!flipH)
    }

    const handleFlipV = () => {
        setFlipV(!flipV)
    }

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current || activeTool === "none") return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height
        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        if (activeTool === "text") {
            ctx.font = `${textSize}px Arial`
            ctx.fillStyle = textColor
            ctx.fillText(textInput, x, y)
            saveToHistory()
        } else if (activeTool === "rect") {
            ctx.strokeStyle = shapeColor
            ctx.lineWidth = 3
            ctx.strokeRect(x - 50, y - 30, 100, 60)
            saveToHistory()
        } else if (activeTool === "circle") {
            ctx.strokeStyle = shapeColor
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.arc(x, y, 40, 0, 2 * Math.PI)
            ctx.stroke()
            saveToHistory()
        }
    }

    const saveToHistory = () => {
        if (!canvasRef.current) return
        const dataUrl = canvasRef.current.toDataURL()
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push({ imageData: dataUrl })
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
    }

    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1)
            const prevState = history[historyIndex - 1]
            setImage(prevState.imageData)
        }
    }

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1)
            const nextState = history[historyIndex + 1]
            setImage(nextState.imageData)
        }
    }

    const handleDownload = () => {
        if (!canvasRef.current) return

        const dataUrl = canvasRef.current.toDataURL(`image/${outputFormat}`, quality / 100)
        const link = document.createElement("a")
        link.href = dataUrl
        const extension = outputFormat === "jpeg" ? "jpg" : outputFormat
        link.download = `edited-${fileName.split(".")[0]}.${extension}`
        link.click()
    }

    const applyFilter = (filter: Filter) => {
        setActiveFilter(filter)
    }

    return (
        <ToolWrapper
            title="Online Image Editor"
            description="Professional online image editor - crop, resize, add filters, text, and shapes to your photos."
            toolSlug="image-editor"
        >
            <div className="grid lg:grid-cols-[350px_1fr] gap-8">
                {/* Toolbar Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                {fileName || "Upload Image"}
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                            {fileName && (
                                <p className="text-sm text-muted-foreground text-center mt-2 truncate">
                                    {fileName}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tools & Filters</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="transform" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="transform">Transform</TabsTrigger>
                                    <TabsTrigger value="adjust">Adjust</TabsTrigger>
                                    <TabsTrigger value="filters">Filters</TabsTrigger>
                                </TabsList>

                                <TabsContent value="transform" className="space-y-4 mt-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button onClick={handleRotate} disabled={!image} variant="outline" size="sm">
                                            <RotateCw className="w-4 h-4 mr-2" />
                                            Rotate
                                        </Button>
                                        <Button onClick={handleFlipH} disabled={!image} variant="outline" size="sm">
                                            <FlipHorizontal className="w-4 h-4 mr-2" />
                                            Flip H
                                        </Button>
                                        <Button onClick={handleFlipV} disabled={!image} variant="outline" size="sm" className="col-span-2">
                                            <FlipVertical className="w-4 h-4 mr-2" />
                                            Flip Vertical
                                        </Button>
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <Label>Drawing Tools</Label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <Button
                                                onClick={() => setActiveTool("text")}
                                                disabled={!image}
                                                variant={activeTool === "text" ? "default" : "outline"}
                                                size="sm"
                                            >
                                                <TypeIcon className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => setActiveTool("rect")}
                                                disabled={!image}
                                                variant={activeTool === "rect" ? "default" : "outline"}
                                                size="sm"
                                            >
                                                <Square className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => setActiveTool("circle")}
                                                disabled={!image}
                                                variant={activeTool === "circle" ? "default" : "outline"}
                                                size="sm"
                                            >
                                                <Circle className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {activeTool === "text" && (
                                        <div className="space-y-3 p-3 bg-muted rounded-lg">
                                            <div className="space-y-2">
                                                <Label>Text</Label>
                                                <Input
                                                    value={textInput}
                                                    onChange={(e) => setTextInput(e.target.value)}
                                                    placeholder="Enter text..."
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="space-y-2">
                                                    <Label>Color</Label>
                                                    <Input
                                                        type="color"
                                                        value={textColor}
                                                        onChange={(e) => setTextColor(e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Size: {textSize}px</Label>
                                                    <Slider
                                                        value={[textSize]}
                                                        onValueChange={(v) => setTextSize(v[0])}
                                                        min={12}
                                                        max={120}
                                                        step={1}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {(activeTool === "rect" || activeTool === "circle") && (
                                        <div className="space-y-2 p-3 bg-muted rounded-lg">
                                            <Label>Shape Color</Label>
                                            <Input
                                                type="color"
                                                value={shapeColor}
                                                onChange={(e) => setShapeColor(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="adjust" className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label>Brightness</Label>
                                            <span className="text-sm text-muted-foreground">{brightness}%</span>
                                        </div>
                                        <Slider
                                            value={[brightness]}
                                            onValueChange={(v) => setBrightness(v[0])}
                                            min={0}
                                            max={200}
                                            step={1}
                                            disabled={!image}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label>Contrast</Label>
                                            <span className="text-sm text-muted-foreground">{contrast}%</span>
                                        </div>
                                        <Slider
                                            value={[contrast]}
                                            onValueChange={(v) => setContrast(v[0])}
                                            min={0}
                                            max={200}
                                            step={1}
                                            disabled={!image}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label>Saturation</Label>
                                            <span className="text-sm text-muted-foreground">{saturation}%</span>
                                        </div>
                                        <Slider
                                            value={[saturation]}
                                            onValueChange={(v) => setSaturation(v[0])}
                                            min={0}
                                            max={200}
                                            step={1}
                                            disabled={!image}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="filters" className="space-y-2 mt-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        {(["none", "grayscale", "sepia", "vintage", "blur", "invert"] as Filter[]).map((filter) => (
                                            <Button
                                                key={filter}
                                                onClick={() => applyFilter(filter)}
                                                disabled={!image}
                                                variant={activeFilter === filter ? "default" : "outline"}
                                                size="sm"
                                                className="capitalize"
                                            >
                                                {filter}
                                            </Button>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Export</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Format</Label>
                                <Select value={outputFormat} onValueChange={(v: any) => setOutputFormat(v)}>
                                    <SelectTrigger>
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
                                <div className="flex justify-between">
                                    <Label>Quality</Label>
                                    <span className="text-sm text-muted-foreground">{quality}%</span>
                                </div>
                                <Slider
                                    value={[quality]}
                                    onValueChange={(v) => setQuality(v[0])}
                                    min={10}
                                    max={100}
                                    step={1}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Canvas Area */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Canvas</CardTitle>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleUndo}
                                        disabled={historyIndex <= 0}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Undo className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        onClick={handleRedo}
                                        disabled={historyIndex >= history.length - 1}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Redo className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            {activeTool !== "none" && (
                                <CardDescription>Click on the canvas to add {activeTool}</CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            {!image ? (
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                    <div className="text-center space-y-2">
                                        <Palette className="w-12 h-12 mx-auto text-muted-foreground" />
                                        <p className="text-muted-foreground">Upload an image to start editing</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <canvas
                                        ref={canvasRef}
                                        className="max-w-full rounded-lg border cursor-crosshair"
                                        onClick={handleCanvasClick}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {image && (
                        <Button onClick={handleDownload} className="w-full h-12 text-lg">
                            <Download className="mr-2 h-5 w-5" />
                            Download Edited Image
                        </Button>
                    )}

                    {/* Hidden image for loading */}
                    <img ref={imgRef} alt="" className="hidden" />
                </div>

                <div className="lg:col-span-2">
                    <ContentSection
                        title="About Online Image Editor"
                        description="Our free online image editor provides professional photo editing tools right in your browser. Crop, rotate, flip, add filters, text, shapes, and more - all without uploading to servers."
                        features={[
                            "Transform: Rotate, Flip Horizontal/Vertical",
                            "Adjust: Brightness, Contrast, Saturation",
                            "Filters: Grayscale, Sepia, Vintage, Blur, Invert",
                            "Drawing Tools: Text, Rectangles, Circles",
                            "Undo/Redo Support",
                            "Multiple Export Formats (JPEG, PNG, WebP)",
                            "Quality Control",
                            "100% Client-Side Processing"
                        ]}
                        faq={[
                            {
                                question: "Is this really free?",
                                answer: "Yes! Our online image editor is completely free to use with no limitations, watermarks, or hidden costs."
                            },
                            {
                                question: "Do I need to create an account?",
                                answer: "No account needed! Just upload your image and start editing immediately."
                            },
                            {
                                question: "Are my images uploaded to your servers?",
                                answer: "No! All editing happens 100% in your browser using HTML5 Canvas. Your images never leave your device."
                            },
                            {
                                question: "Can I undo my changes?",
                                answer: "Yes! Use the undo/redo buttons to navigate through your editing history."
                            },
                            {
                                question: "What image formats can I export?",
                                answer: "You can export as JPEG, PNG, or WebP format with adjustable quality settings."
                            }
                        ]}
                    />
                </div>
            </div>
        </ToolWrapper>
    )
}
