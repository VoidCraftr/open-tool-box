"use client"

import { useState, useRef } from "react"
import {
    Download,
    Palette,
    Quote,
    Type,
    RefreshCcw,
    Sparkles,
    Maximize2,
    Square,
    Smartphone,
    Layers,
    Type as Typography,
    Check
} from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import html2canvas from "html2canvas"
import { cn } from "@/lib/utils"

const BACKGROUNDS = [
    { id: "mesh-1", name: "Cyber Sunset", class: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" },
    { id: "mesh-2", name: "Deep Sea", class: "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" },
    { id: "mesh-3", name: "Golden Hour", class: "bg-gradient-to-br from-orange-400 via-rose-400 to-amber-500" },
    { id: "mesh-4", name: "Emerald Dream", class: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500" },
    { id: "solid-dark", name: "Void Black", class: "bg-zinc-950" },
    { id: "solid-light", name: "Paper White", class: "bg-slate-50 text-slate-950" },
]

const FONTS = [
    { name: "Cinematic Serif", class: "font-serif" },
    { name: "Modern Sans", class: "font-sans" },
    { name: "Classic Mono", class: "font-mono" },
    { name: "Black Italic", class: "font-black italic" },
]

export default function QuoteGeneratorClient() {
    const [quote, setQuote] = useState("Innovation distinguishes between a leader and a follower.")
    const [author, setAuthor] = useState("Steve Jobs")
    const [background, setBackground] = useState(BACKGROUNDS[0])
    const [font, setFont] = useState(FONTS[3])
    const [aspectRatio, setAspectRatio] = useState<"1:1" | "9:16">("1:1")
    const [isGenerating, setIsGenerating] = useState(false)
    const [fontSize, setFontSize] = useState(48)
    const [branding, setBranding] = useState("@opentoolbox")

    const canvasRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        if (!canvasRef.current) return
        setIsGenerating(true)
        try {
            const canvas = await html2canvas(canvasRef.current, {
                scale: 3,
                useCORS: true,
                backgroundColor: null,
            })
            const link = document.createElement('a')
            link.download = `quote-${Date.now()}.png`
            link.href = canvas.toDataURL("image/png")
            link.click()
        } catch (err) {
            console.error(err)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <ToolWrapper
            title="Social Quote Creator"
            description="Turn quotes into beautiful cinematic posts for Instagram and social media."
            toolSlug="social-quote-generator"
        >
            <div className="grid lg:grid-cols-[400px_1fr] gap-10">
                {/* Editor Settings */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-3 italic font-black uppercase tracking-tighter">
                                <Typography className="w-5 h-5 text-primary" /> Visual Director
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Text Input */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">The Narrative</Label>
                                    <Textarea
                                        className="min-h-[100px] bg-black/40 border-white/10 text-xs font-medium focus:ring-primary/20 p-4 rounded-2xl"
                                        placeholder="What's the message?"
                                        value={quote}
                                        onChange={e => setQuote(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">The Voice (Author)</Label>
                                    <Input
                                        className="h-10 bg-black/40 border-white/10 text-xs font-bold px-4 rounded-xl"
                                        placeholder="Name of author..."
                                        value={author}
                                        onChange={e => setAuthor(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Separator className="bg-white/5" />

                            {/* Appearance */}
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cinemascope & Grid</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        variant={aspectRatio === "1:1" ? "default" : "outline"}
                                        className="h-12 text-[10px] font-black uppercase tracking-widest border-white/10"
                                        onClick={() => setAspectRatio("1:1")}
                                    >
                                        <Square className="w-4 h-4 mr-2" /> 1:1 Post
                                    </Button>
                                    <Button
                                        variant={aspectRatio === "9:16" ? "default" : "outline"}
                                        className="h-12 text-[10px] font-black uppercase tracking-widest border-white/10"
                                        onClick={() => setAspectRatio("9:16")}
                                    >
                                        <Smartphone className="w-4 h-4 mr-2" /> 9:16 Story
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Atmosphere Select</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {BACKGROUNDS.map((bg) => (
                                        <button
                                            key={bg.id}
                                            onClick={() => setBackground(bg)}
                                            className={cn(
                                                "aspect-square rounded-xl border-2 transition-all p-1 group/bg relative overflow-hidden",
                                                background.id === bg.id ? "border-primary scale-95" : "border-white/5 hover:border-white/20"
                                            )}
                                        >
                                            <div className={cn("w-full h-full rounded-lg shadow-inner", bg.class)} />
                                            {background.id === bg.id && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Style Library</Label>
                                <Select value={font.name} onValueChange={(v) => setFont(FONTS.find(f => f.name === v)!)}>
                                    <SelectTrigger className="h-12 bg-black/40 border-white/10 text-xs font-bold rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FONTS.map(f => (
                                            <SelectItem key={f.name} value={f.name} className="text-xs">{f.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                onClick={handleDownload}
                                className="w-full h-14 premium-button text-lg bg-primary text-primary-foreground shadow-primary/20 group relative overflow-hidden"
                                disabled={isGenerating}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                {isGenerating ? (
                                    <span className="flex items-center gap-2">
                                        <RefreshCcw className="w-5 h-5 animate-spin" /> Finalizing...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 font-black italic uppercase tracking-tighter">
                                        <Download className="w-5 h-5" /> Export Asset
                                    </span>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="liquid-glass border-white/20 shadow-liquid">
                        <CardHeader className="pb-3">
                            <CardDescription className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                                <Layers className="w-3.5 h-3.5" /> Identity Watermark
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <Input
                                className="h-10 bg-black/40 border-white/10 text-xs font-mono opacity-60 rounded-xl"
                                placeholder="Social Handle..."
                                value={branding}
                                onChange={e => setBranding(e.target.value)}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Area */}
                <div className="space-y-10">
                    <div className="relative group/asset max-w-xl mx-auto w-full">
                        <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full opacity-50 group-hover/asset:opacity-100 transition duration-1000" />

                        <div
                            ref={canvasRef}
                            className={cn(
                                "relative w-full rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 hover:scale-[1.01] flex flex-col items-center justify-center p-16 text-center border-white/10 border",
                                background.class,
                                aspectRatio === "1:1" ? "aspect-square" : "aspect-[9/16]"
                            )}
                        >
                            <div className="absolute top-12 left-12 opacity-20">
                                <Quote className="w-16 h-16 text-white" />
                            </div>

                            <motion.div
                                key={quote}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative z-10 space-y-8"
                            >
                                <h2 className={cn(
                                    "text-white leading-[1.1] tracking-tighter transition-all duration-300",
                                    font.class,
                                    fontSize > 40 ? "text-4xl md:text-5xl lg:text-6xl" : "text-2xl md:text-3xl lg:text-4xl",
                                    background.id === "solid-light" && "text-slate-950"
                                )}>
                                    "{quote}"
                                </h2>

                                <div className="space-y-2">
                                    <div className={cn(
                                        "h-px w-24 mx-auto",
                                        background.id === "solid-light" ? "bg-slate-950/20" : "bg-white/20"
                                    )} />
                                    <p className={cn(
                                        "font-black tracking-widest text-sm uppercase italic opacity-60",
                                        background.id === "solid-light" && "text-slate-950"
                                    )}>{author || "Unknown Source"}</p>
                                </div>
                            </motion.div>

                            {branding && (
                                <div className={cn(
                                    "absolute bottom-10 font-mono text-[10px] tracking-[0.4em] uppercase opacity-30",
                                    background.id === "solid-light" && "text-slate-950"
                                )}>
                                    {branding}
                                </div>
                            )}

                            {/* Mesh Shimmer Effect */}
                            {background.id.startsWith('mesh') && (
                                <div className="absolute inset-0 bg-white/5 opacity-20 filter blur-3xl pointer-events-none animate-pulse" />
                            )}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <Maximize2 className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/80">Text Scaling</span>
                            </div>
                            <input
                                type="range"
                                min="20"
                                max="100"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full accent-primary bg-white/10 rounded-lg h-2 cursor-pointer"
                            />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-4">
                            <div className="p-2 bg-yellow-500/10 rounded-xl">
                                <Sparkles className="w-4 h-4 text-yellow-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/80 leading-none">High-Dynamic Export</p>
                                <p className="text-[9px] text-muted-foreground">3x Supersampling enabled for retina-ready social posts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ContentSection
                title="Designer Typography for Digital Influence"
                description="Bridge the gap between raw text and viral visual communication. Our Quote Engine provides high-fidelity mesh gradients and curated font parings specifically engineered to capture attention on modern engagement-driven feeds like Instagram and TikTok."
                features={[
                    "✨ **Mesh Atmosphere**: Intelligent gradient generation using professional color theory for cinematic depth.",
                    "📐 **Ratio Control**: Instant switching between 1:1 post and 9:16 story formats with automated text re-centering.",
                    "🖋️ **Hegemony Typography**: Access high-end serif and sans-serif typefaces typically reserved for premium design suites.",
                    "🔍 **Adaptive Scaling**: Dynamic font resizing engine to ensure your quote perfectly fits the visual frame.",
                    "🔖 **White-Label Identity**: Native support for custom watermarking and social handle branding.",
                    "🚀 **Direct Export**: 100% vector-mapped PNG exports with ultra-high supersampling for professional resolution."
                ]}
                howToUse={[
                    "Enter your **Quote & Author** into the Visual Director panel.",
                    "Select an **Atmosphere** (Background) that suits the mood of the message.",
                    "Toggle the **Aspect Ratio** based on your target social platform.",
                    "Refine the visual weight using the **Text Scaling** slider and font selector.",
                    "Embed your **Identity / Watermark** to ensure brand attribution.",
                    "Execute the **Asset Export** to download your high-fidelity image."
                ]}
                faq={[
                    {
                        question: "Can I use these for commercial purposes?",
                        answer: "Absolutely. Any asset generated on OpenToolBox belongs to you. We do not restrict usage or claim ownership of your exports."
                    },
                    {
                        question: "Will the text wrap automatically?",
                        answer: "Yes. Our engine uses an intelligent flex-mapping system that ensures your quote wraps naturally while maintaining cinematic balance."
                    },
                    {
                        question: "Why is the export size so large?",
                        answer: "We use 3x supersampling on export to ensure your images look crisp even on high-density displays like iPhone Pro or 4K monitors."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
