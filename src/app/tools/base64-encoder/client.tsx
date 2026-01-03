"use client"

import { useState, useRef } from "react"
import { Copy, Trash2, ArrowRightLeft, Check, Upload, Image as ImageIcon, Type, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { Input } from "@/components/ui/input"

export default function Base64EncoderClient() {
    const [textInput, setTextInput] = useState("")
    const [textOutput, setTextOutput] = useState("")
    const [mode, setMode] = useState<"encode" | "decode">("encode")

    // Image State
    const [imageInput, setImageInput] = useState<string | null>(null)
    const [imageOutput, setImageOutput] = useState("")
    const [imageMode, setImageMode] = useState<"encode" | "decode">("encode")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [copied, setCopied] = useState(false)
    const [error, setError] = useState(false)

    // --- Text Logic ---
    const handleTextProcess = () => {
        if (!textInput.trim()) return
        try {
            setError(false)
            if (mode === "encode") {
                setTextOutput(btoa(textInput))
            } else {
                setTextOutput(atob(textInput))
            }
        } catch (error) {
            setError(true)
            setTextOutput("Error: Invalid text input for encoding/decoding.")
        }
    }

    const copyTextOutput = () => {
        if (!textOutput || error) return
        navigator.clipboard.writeText(textOutput)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const clearText = () => {
        setTextInput("")
        setTextOutput("")
        setError(false)
    }

    // --- Image Logic ---
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            if (event.target?.result) {
                const result = event.target.result as string
                setImageOutput(result)
            }
        }
        reader.readAsDataURL(file)
    }

    const handleImageBase64Input = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setImageInput(e.target.value)
    }

    const copyImageOutput = () => {
        if (!imageOutput) return
        navigator.clipboard.writeText(imageOutput)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const clearImage = () => {
        setImageInput(null)
        setImageOutput("")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    return (
        <ToolWrapper
            title="Base64 Encoder/Decoder"
            description="Encode text and images to Base64 or decode Base64 strings. Secure client-side processing."
            toolSlug="base64-encoder"
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="text" className="flex gap-2">
                            <Type className="w-4 h-4" /> Text Converter
                        </TabsTrigger>
                        <TabsTrigger value="image" className="flex gap-2">
                            <ImageIcon className="w-4 h-4" /> Image Converter
                        </TabsTrigger>
                    </TabsList>

                    {/* TEXT TAB */}
                    <TabsContent value="text" className="space-y-6">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Button
                                variant={mode === "encode" ? "default" : "outline"}
                                onClick={() => setMode("encode")}
                                size="sm"
                            >
                                Encoder (Text → Base64)
                            </Button>
                            <Button
                                variant={mode === "decode" ? "default" : "outline"}
                                onClick={() => setMode("decode")}
                                size="sm"
                            >
                                Decoder (Base64 → Text)
                            </Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <Label>Input {mode === "encode" ? "Text" : "Base64"}</Label>
                                <Textarea
                                    placeholder={mode === "encode" ? "Type text to encode..." : "Paste Base64 string to decode..."}
                                    className="min-h-[300px] max-h-[500px] overflow-y-auto font-mono text-sm"
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <Label>Output {mode === "encode" ? "Base64" : "Text"}</Label>
                                <div className="relative">
                                    <Textarea
                                        readOnly
                                        placeholder="Result will appear here..."
                                        className={`min-h-[300px] max-h-[500px] overflow-y-auto font-mono text-sm ${error ? "text-destructive" : "bg-muted"}`}
                                        value={textOutput}
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <Button size="icon" variant="secondary" onClick={copyTextOutput} disabled={!textOutput || error} title="Copy Result">
                                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8 justify-center">
                            <Button size="lg" onClick={handleTextProcess} className="min-w-[150px]">
                                <ArrowRightLeft className="mr-2 h-4 w-4" />
                                {mode === "encode" ? "Encode" : "Decode"}
                            </Button>
                            <Button size="lg" variant="secondary" onClick={clearText} disabled={!textInput && !textOutput}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Clear
                            </Button>
                        </div>
                    </TabsContent>

                    {/* IMAGE TAB */}
                    <TabsContent value="image" className="space-y-6">
                        <Tabs defaultValue="encode-img" onValueChange={(v) => setImageMode(v as any)} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50">
                                <TabsTrigger value="encode-img">Image to Base64</TabsTrigger>
                                <TabsTrigger value="decode-img">Base64 to Image</TabsTrigger>
                            </TabsList>

                            <TabsContent value="encode-img" className="space-y-8">
                                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                                    <Label htmlFor="image-upload" className="mb-2 text-lg font-medium cursor-pointer">
                                        Click to Upload Image
                                    </Label>
                                    <span className="text-sm text-muted-foreground mb-4">Supports PNG, JPG, GIF, SVG</span>
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                    />
                                    <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                                        Select File
                                    </Button>
                                </div>

                                {imageOutput && (
                                    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                        <Label>Base64 Output</Label>
                                        <div className="relative">
                                            <Textarea
                                                readOnly
                                                value={imageOutput}
                                                className="min-h-[200px] max-h-[500px] overflow-y-auto font-mono text-sm bg-muted"
                                            />
                                            <div className="absolute top-2 right-2 flex gap-2">
                                                <Button size="icon" variant="secondary" onClick={copyImageOutput} title="Copy Base64">
                                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="decode-img" className="space-y-8">
                                <div className="space-y-4">
                                    <Label>Paste Base64 String</Label>
                                    <Textarea
                                        placeholder="data:image/png;base64,..."
                                        className="min-h-[150px] max-h-[500px] overflow-y-auto font-mono text-sm"
                                        onChange={(e) => setImageInput(e.target.value)}
                                        value={imageInput || ""}
                                    />
                                </div>

                                {imageInput && (
                                    <div className="space-y-4">
                                        <Label>Image Preview</Label>
                                        <div className="flex items-center justify-center p-8 border rounded-lg bg-card min-h-[300px]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={imageInput}
                                                alt="Base64 Preview"
                                                className="max-w-full max-h-[500px] object-contain shadow-lg rounded"
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </TabsContent>
                </Tabs>

                <ContentSection
                    title="The Ultimate Base64 Converter"
                    description={`Encode and decode data locally in your browser. Whether you're a developer debugging data APIs or a designer embedding small images, our **Base64 Encoder/Decoder** has you covered.\n\n**What is Base64?**\nBase64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation. It is commonly used to transfer data (like images) over media that are designed to deal with textual data.`}
                    features={[
                        "🔒 **Client-Side Security:** Your data never leaves your browser.",
                        "🖼️ **Image Support:** Convert images to Data URIs for CSS or HTML embedding.",
                        "⚡ **Instant Processing:** Real-time encoding and decoding.",
                        "📂 **File Upload:** Drag and drop or select files for easy conversion."
                    ]}
                    howToUse={[
                        "Select **Text Converter** or **Image Converter** from the tabs.",
                        "For **Text**: Type or paste your string. Click 'Encode' or 'Decode'.",
                        "For **Images**: Upload an image file to get the Base64 string, or paste a Base64 string to preview the image.",
                        "Click the **Copy** button to save the result to your clipboard."
                    ]}
                    faq={[
                        {
                            question: "Is it safe to decode sensitive data here?",
                            answer: "Yes. All processing happens 100% on your device using JavaScript. We do not store or transmit your data to any server."
                        },
                        {
                            question: "Why use Base64 for images?",
                            answer: "Base64 images (Data URIs) allow you to embed image data directly into HTML or CSS files, reducing the number of HTTP requests and speeding up page load times for small icons and logos."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
