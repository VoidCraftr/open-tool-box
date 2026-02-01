"use client"

import { useState, useRef } from "react"
import {
    Download,
    Palette,
    Quote,
    Type,
    RefreshCcw,
    Sparkles,
    Square,
    Smartphone,
    Layers,
    Type as Typography,
    Check,
    AlignLeft,
    AlignCenter,
    AlignRight
} from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"
import { cn } from "@/lib/utils"
import { ToolLayout } from "@/components/tools/ui/ToolLayout"
import { ControlCard } from "@/components/tools/ui/ControlCard"

const BACKGROUNDS = [
    { id: "mesh-1", name: "Cyber Sunset", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { id: "mesh-2", name: "Deep Sea", gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)" },
    { id: "mesh-3", name: "Golden Hour", gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)" },
    { id: "mesh-4", name: "Emerald Dream", gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
    { id: "mesh-5", name: "Purple Rain", gradient: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)" },
    { id: "mesh-6", name: "Ocean Blue", gradient: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)" },
    { id: "solid-dark", name: "Void Black", gradient: "#18181b" },
    { id: "solid-light", name: "Paper White", gradient: "#f8fafc" },
]

const FONT_FAMILIES = [
    { name: "Inter", style: "'Inter', sans-serif" },
    { name: "Playfair Display", style: "'Playfair Display', serif" },
    { name: "Roboto Mono", style: "'Roboto Mono', monospace" },
    { name: "Poppins", style: "'Poppins', sans-serif" },
    { name: "Merriweather", style: "'Merriweather', serif" },
    { name: "Lora", style: "'Lora', serif" },
    { name: "Montserrat", style: "'Montserrat', sans-serif" },
    { name: "Open Sans", style: "'Open Sans', sans-serif" },
    { name: "Raleway", style: "'Raleway', sans-serif" },
    { name: "Oswald", style: "'Oswald', sans-serif" },
]

const FONT_WEIGHTS = [
    { name: "Light", value: "300" },
    { name: "Regular", value: "400" },
    { name: "Medium", value: "500" },
    { name: "Semi Bold", value: "600" },
    { name: "Bold", value: "700" },
    { name: "Extra Bold", value: "800" },
    { name: "Black", value: "900" },
]

export default function QuoteGeneratorClient() {
    const [quote, setQuote] = useState("Innovation distinguishes between a leader and a follower.")
    const [author, setAuthor] = useState("Steve Jobs")
    const [background, setBackground] = useState(BACKGROUNDS[0])
    const [fontFamily, setFontFamily] = useState(FONT_FAMILIES[0])
    const [fontWeight, setFontWeight] = useState(FONT_WEIGHTS[4])
    const [aspectRatio, setAspectRatio] = useState<"1:1" | "9:16">("1:1")
    const [isGenerating, setIsGenerating] = useState(false)
    const [fontSize, setFontSize] = useState(48)
    const [branding, setBranding] = useState("@opentoolbox")
    const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("center")
    const [letterSpacing, setLetterSpacing] = useState(0)
    const [padding, setPadding] = useState(64)
    const [isItalic, setIsItalic] = useState(false)

    const canvasRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        if (!canvasRef.current) return
        setIsGenerating(true)
        try {
            // Wait a bit for fonts to load
            await new Promise(resolve => setTimeout(resolve, 100))

            const canvas = await html2canvas(canvasRef.current, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                onclone: (clonedDoc) => {
                    // Ensure all elements are visible in the clone
                    const clonedElement = clonedDoc.querySelector('[data-quote-canvas]') as HTMLElement
                    if (clonedElement) {
                        clonedElement.style.transform = 'none'
                    }
                }
            })

            const link = document.createElement('a')
            link.download = `quote-${Date.now()}.png`
            link.href = canvas.toDataURL("image/png", 1.0)
            link.click()
        } catch (err) {
            console.error('Export error:', err)
            alert('Failed to export image. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    const textColor = background.id === "solid-light" ? "#0f172a" : "#ffffff"

    return (
        <ToolWrapper
            title="Social Quote Creator"
            description="Create beautiful quote graphics for Instagram, Twitter, and other social platforms."
            toolSlug="social-quote-generator"
        >
            <ToolLayout
                sidebar={
                    <div className="space-y-4">
                        <ControlCard title="Content" icon={Typography}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium">Quote Text</Label>
                                    <Textarea
                                        className="min-h-[100px] resize-none"
                                        placeholder="Enter your quote..."
                                        value={quote}
                                        onChange={e => setQuote(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium">Author</Label>
                                    <Input
                                        placeholder="Author name..."
                                        value={author}
                                        onChange={e => setAuthor(e.target.value)}
                                    />
                                </div>
                            </div>
                        </ControlCard>

                        <ControlCard title="Typography" icon={Type}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium">Font Family</Label>
                                    <Select value={fontFamily.name} onValueChange={(v) => setFontFamily(FONT_FAMILIES.find(f => f.name === v)!)}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {FONT_FAMILIES.map(f => (
                                                <SelectItem key={f.name} value={f.name}>
                                                    <span style={{ fontFamily: f.style }}>{f.name}</span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-medium">Weight</Label>
                                        <Select value={fontWeight.value} onValueChange={(v) => setFontWeight(FONT_WEIGHTS.find(w => w.value === v)!)}>
                                            <SelectTrigger className="h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {FONT_WEIGHTS.map(w => (
                                                    <SelectItem key={w.value} value={w.value}>{w.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-medium">Style</Label>
                                        <Button
                                            variant={isItalic ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setIsItalic(!isItalic)}
                                            className="w-full h-9 italic"
                                        >
                                            Italic
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-xs font-medium">Size</Label>
                                        <span className="text-xs text-muted-foreground">{fontSize}px</span>
                                    </div>
                                    <Slider
                                        value={[fontSize]}
                                        onValueChange={(val) => setFontSize(val[0])}
                                        min={24}
                                        max={120}
                                        step={4}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-xs font-medium">Letter Spacing</Label>
                                        <span className="text-xs text-muted-foreground">{letterSpacing}px</span>
                                    </div>
                                    <Slider
                                        value={[letterSpacing]}
                                        onValueChange={(val) => setLetterSpacing(val[0])}
                                        min={-5}
                                        max={20}
                                        step={1}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-medium">Alignment</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button
                                            variant={textAlign === "left" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setTextAlign("left")}
                                        >
                                            <AlignLeft className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant={textAlign === "center" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setTextAlign("center")}
                                        >
                                            <AlignCenter className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant={textAlign === "right" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setTextAlign("right")}
                                        >
                                            <AlignRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ControlCard>

                        <ControlCard title="Layout" icon={Palette}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-medium">Format</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant={aspectRatio === "1:1" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setAspectRatio("1:1")}
                                        >
                                            <Square className="w-3.5 h-3.5 mr-2" /> 1:1
                                        </Button>
                                        <Button
                                            variant={aspectRatio === "9:16" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setAspectRatio("9:16")}
                                        >
                                            <Smartphone className="w-3.5 h-3.5 mr-2" /> 9:16
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-xs font-medium">Padding</Label>
                                        <span className="text-xs text-muted-foreground">{padding}px</span>
                                    </div>
                                    <Slider
                                        value={[padding]}
                                        onValueChange={(val) => setPadding(val[0])}
                                        min={32}
                                        max={128}
                                        step={8}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-medium">Background</Label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {BACKGROUNDS.map((bg) => (
                                            <button
                                                key={bg.id}
                                                onClick={() => setBackground(bg)}
                                                className={cn(
                                                    "aspect-square rounded-md border-2 transition-all relative overflow-hidden",
                                                    background.id === bg.id ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
                                                )}
                                                style={{ background: bg.gradient }}
                                                title={bg.name}
                                            >
                                                {background.id === bg.id && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                        <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ControlCard>

                        <ControlCard title="Branding" icon={Layers}>
                            <Input
                                placeholder="@yourhandle"
                                value={branding}
                                onChange={e => setBranding(e.target.value)}
                            />
                        </ControlCard>

                        <Button
                            onClick={handleDownload}
                            className="w-full h-11"
                            disabled={isGenerating}
                            size="lg"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Image
                                </>
                            )}
                        </Button>
                    </div>
                }
            >
                {/* Preview Area */}
                <div className="space-y-6">
                    <div className="flex items-center justify-center min-h-[600px]">
                        <div
                            ref={canvasRef}
                            data-quote-canvas
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                background: background.gradient,
                                padding: `${padding}px`,
                                borderRadius: '24px',
                                width: aspectRatio === "1:1" ? '600px' : '400px',
                                height: aspectRatio === "1:1" ? '600px' : '711px',
                                maxWidth: '100%'
                            }}
                        >
                            {/* Decorative Quote Icon */}
                            <div style={{
                                position: 'absolute',
                                top: '32px',
                                left: '32px',
                                opacity: 0.1
                            }}>
                                <Quote style={{ width: '48px', height: '48px', color: textColor }} />
                            </div>

                            {/* Quote Content */}
                            <motion.div
                                key={quote + textAlign}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    position: 'relative',
                                    zIndex: 10,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '24px',
                                    textAlign: textAlign
                                }}
                            >
                                <h2
                                    style={{
                                        fontFamily: fontFamily.style,
                                        fontWeight: fontWeight.value,
                                        fontSize: `${fontSize}px`,
                                        letterSpacing: `${letterSpacing}px`,
                                        color: textColor,
                                        lineHeight: '1.25',
                                        fontStyle: isItalic ? 'italic' : 'normal',
                                        margin: 0
                                    }}
                                >
                                    "{quote}"
                                </h2>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    alignItems: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start'
                                }}>
                                    <div
                                        style={{
                                            height: '2px',
                                            width: '64px',
                                            backgroundColor: textColor,
                                            opacity: 0.3
                                        }}
                                    />
                                    <p
                                        style={{
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            color: textColor,
                                            opacity: 0.7,
                                            margin: 0
                                        }}
                                    >
                                        {author || "Unknown"}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Watermark */}
                            {branding && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '24px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontFamily: 'monospace',
                                        fontSize: '12px',
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        color: textColor,
                                        opacity: 0.25
                                    }}
                                >
                                    {branding}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
                        <p className="text-xs text-muted-foreground">
                            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
                            Images exported at 3x resolution for high-quality social media posts
                        </p>
                    </div>
                </div>
            </ToolLayout>

            <ContentSection
                title="Create Beautiful Quote Graphics"
                description="Transform quotes into stunning visual content for social media. Perfect for Instagram posts, stories, and other platforms."
                features={[
                    "🎨 **Custom Backgrounds**: Choose from 8 beautiful gradients and solid colors",
                    "✍️ **Typography Control**: 10 Google Fonts with 7 weight options",
                    "📐 **Flexible Layouts**: Toggle between 1:1 posts and 9:16 stories",
                    "🔍 **Fine-tune Text**: Adjust size, spacing, alignment, and style",
                    "🔖 **Brand Watermarks**: Add your social handle for attribution",
                    "🚀 **HD Export**: Download 3x resolution images for crisp quality"
                ]}
                howToUse={[
                    "Enter your **quote and author** in the content panel",
                    "Choose a **font family and weight** that matches your brand",
                    "Adjust **typography settings** like size, spacing, and alignment",
                    "Select a **background** and configure the aspect ratio",
                    "Add your **social handle** as a watermark",
                    "Click **Download Image** to export your graphic"
                ]}
                faq={[
                    {
                        question: "Can I use custom fonts?",
                        answer: "Currently we offer 10 carefully selected Google Fonts. More font options will be added in future updates."
                    },
                    {
                        question: "What resolution are the exported images?",
                        answer: "Images are exported at 3x the display resolution (supersampling) to ensure they look crisp on all devices, including retina displays."
                    },
                    {
                        question: "Can I use these for commercial purposes?",
                        answer: "Yes! All graphics you create are yours to use however you'd like, including commercial projects."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
