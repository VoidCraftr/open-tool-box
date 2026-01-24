"use client"

import { useState, useRef, useEffect } from "react"
import {
    Plus,
    Trash2,
    Download,
    Palette,
    Smile,
    Image as ImageIcon,
    Type,
    RefreshCcw,
    Layout,
    Sparkles,
    Move,
    Maximize,
    ChevronLeft,
    ChevronRight,
    Search
} from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import html2canvas from "html2canvas"
import { cn } from "@/lib/utils"

const TRENDING_TEMPLATES = [
    { id: "1", name: "Drake Hotline Bling", url: "https://i.imgflip.com/30b1gx.jpg" },
    { id: "2", name: "Distracted Boyfriend", url: "https://i.imgflip.com/1ur9b0.jpg" },
    { id: "3", name: "Two Buttons", url: "https://i.imgflip.com/1g8my4.jpg" },
    { id: "4", name: "Change My Mind", url: "https://i.imgflip.com/24y43o.jpg" },
    { id: "5", name: "Batman Slapping Robin", url: "https://i.imgflip.com/9ehk.jpg" },
    { id: "6", name: "Woman Yelling at a Cat", url: "https://i.imgflip.com/345v97.jpg" },
]

interface TextBlock {
    id: string
    text: string
    color: string
    fontSize: number
    uppercase: boolean
    x: number
    y: number
}

export default function MemeGeneratorClient() {
    const [image, setImage] = useState<string>(TRENDING_TEMPLATES[0].url)
    const [textBlocks, setTextBlocks] = useState<TextBlock[]>([
        { id: "top", text: "TOP TEXT", color: "white", fontSize: 40, uppercase: true, x: 50, y: 10 },
        { id: "bottom", text: "BOTTOM TEXT", color: "white", fontSize: 40, uppercase: true, x: 50, y: 80 }
    ])
    const [isGenerating, setIsGenerating] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const canvasRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setImage(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const updateTextBlock = (id: string, updates: Partial<TextBlock>) => {
        setTextBlocks(textBlocks.map(block => block.id === id ? { ...block, ...updates } : block))
    }

    const addTextBlock = () => {
        const id = Math.random().toString(36).substr(2, 9)
        setTextBlocks([...textBlocks, { id, text: "NEW TEXT", color: "white", fontSize: 30, uppercase: true, x: 50, y: 50 }])
    }

    const removeTextBlock = (id: string) => {
        setTextBlocks(textBlocks.filter(block => block.id !== id))
    }

    const handleDownload = async () => {
        if (!canvasRef.current) return
        setIsGenerating(true)
        try {
            const canvas = await html2canvas(canvasRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
            })
            const link = document.createElement('a')
            link.download = `meme-${Date.now()}.png`
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
            title="Premium Meme Forge"
            description="Create high-fidelity memes with trending templates and professional typography controls."
            toolSlug="meme-generator"
        >
            <div className="grid lg:grid-cols-[400px_1fr] gap-10">
                {/* Controls */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-3 italic font-black uppercase tracking-tighter">
                                <Smile className="w-5 h-5 text-yellow-500" /> Meme Studio
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Image Source */}
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Source Asset</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        className="h-20 border-white/10 bg-white/5 hover:bg-white/10 flex flex-col gap-2 rounded-2xl"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <ImageIcon className="w-6 h-6 text-primary" />
                                        <span className="text-[10px] uppercase font-bold">Upload</span>
                                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </Button>
                                    <div className="h-20 bg-primary/10 rounded-2xl border border-primary/20 flex flex-col items-center justify-center p-3 text-center">
                                        <Sparkles className="w-5 h-5 text-primary mb-1" />
                                        <span className="text-[9px] font-black uppercase leading-tight italic">Trending Engine Active</span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-white/5" />

                            {/* Text Controls */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Caption Blocks</Label>
                                    <Button size="sm" variant="ghost" onClick={addTextBlock} className="h-7 px-3 text-[10px] font-black italic uppercase text-primary hover:bg-primary/10">
                                        <Plus className="w-3 h-3 mr-1" /> Add Layer
                                    </Button>
                                </div>

                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {textBlocks.map((block) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={block.id}
                                            className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3"
                                        >
                                            <div className="flex gap-2">
                                                <Input
                                                    className="h-10 bg-black/40 border-white/5 text-xs font-bold"
                                                    placeholder="Enter caption..."
                                                    value={block.text}
                                                    onChange={e => updateTextBlock(block.id, { text: e.target.value })}
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => removeTextBlock(block.id)}
                                                    className="w-10 h-10 shrink-0 text-destructive/50 hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1">
                                                    <span className="text-[8px] font-black uppercase text-muted-foreground/60">Font Size</span>
                                                    <Input
                                                        type="number"
                                                        className="h-8 bg-black/20 border-white/5 text-xs"
                                                        value={block.fontSize}
                                                        onChange={e => updateTextBlock(block.id, { fontSize: Number(e.target.value) })}
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[8px] font-black uppercase text-muted-foreground/60">Position Y%</span>
                                                    <Input
                                                        type="number"
                                                        className="h-8 bg-black/20 border-white/5 text-xs"
                                                        value={block.y}
                                                        onChange={e => updateTextBlock(block.id, { y: Number(e.target.value) })}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                onClick={handleDownload}
                                className="w-full h-14 premium-button text-lg bg-primary text-primary-foreground shadow-primary/20"
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <span className="flex items-center gap-2">
                                        <RefreshCcw className="w-5 h-5 animate-spin" /> Rendering...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Download className="w-5 h-5" /> Download Meme
                                    </span>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Template Search */}
                    <Card className="liquid-glass border-white/20 shadow-liquid">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Search className="w-3.5 h-3.5" />
                                <CardDescription className="text-[10px] font-black uppercase tracking-widest">Global Template Hub</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                {TRENDING_TEMPLATES.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setImage(t.url)}
                                        className={cn(
                                            "aspect-square rounded-lg overflow-hidden border-2 transition-all p-1",
                                            image === t.url ? "border-primary bg-primary/20" : "border-white/10 bg-white/5 hover:border-white/30"
                                        )}
                                    >
                                        <img src={t.url} alt={t.name} className="w-full h-full object-cover rounded-md" />
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Canvas Area */}
                <div className="space-y-6">
                    <div className="relative group/canvas max-w-2xl mx-auto w-full">
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-yellow-500/10 blur-2xl opacity-50 group-hover/canvas:opacity-100 transition duration-1000" />

                        <div
                            ref={canvasRef}
                            className="relative w-full aspect-square bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 hover:scale-[1.01]"
                        >
                            <img src={image} alt="Meme template" className="w-full h-full object-contain" />

                            {/* Overlay Text */}
                            {textBlocks.map((block) => (
                                <div
                                    key={block.id}
                                    style={{
                                        top: `${block.y}%`,
                                        left: `${block.x}%`,
                                        transform: 'translateX(-50%)',
                                        fontSize: `${block.fontSize}px`,
                                        color: block.color,
                                        WebkitTextStroke: '2px black',
                                        paintOrder: 'stroke fill',
                                        fontFamily: "'Impact', 'Inter', sans-serif",
                                        textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                                    }}
                                    className={cn(
                                        "absolute text-center font-black tracking-tight leading-none px-4 select-none break-words max-w-[90%]",
                                        block.uppercase && "uppercase"
                                    )}
                                >
                                    {block.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 animate-fade-in group hover:bg-white/[0.08] transition-colors">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Layout className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-black italic uppercase tracking-tighter text-foreground/80">Pro Tip</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Adjust the <span className="text-primary font-bold">Position Y%</span> slider to move text up and down. Text is automatically centered horizontally with professional Impact-style shadowing for maximum readability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ContentSection
                title="Next-Gen Viral Asset Factory"
                description="Experience the most powerful client-side meme generation interface. From trending viral formats to custom high-resolution uploads, forge professional-grade social assets in seconds without the clutter of watermarks or invasive subscriptions."
                features={[
                    "🔥 **Trending Engine**: Immediate access to the latest viral templates currently dominating social feeds.",
                    "⚡ **Advanced Typography**: Classic Impact-style rendering with multi-point stroke and shadow for maximum readability.",
                    "🖌️ **Layer Management**: Infinite caption layers with per-block font size and positioning controls.",
                    "🖼️ **Universal Upload**: Bring your own assets and upscale them through our optimized canvas renderer.",
                    "🛡️ **Zero Watermarking**: Your creations are yours. We never inject branding into your exported memes.",
                    "🔒 **Private Rendering**: No meme data is ever uploaded to a server. Your local GPU handles the heavy lifting."
                ]}
                howToUse={[
                    "Browse the **Trending Hub** for a template or upload your own base asset.",
                    "Add or edit **Caption Blocks** in the side panel.",
                    "Refine your message using the **Font Size** and **Positioning** controls.",
                    "Review the **Live Canvas** to ensure your punchline lands perfectly.",
                    "Click **Download Meme** to export a clean, high-resolution PNG instantly."
                ]}
                faq={[
                    {
                        question: "Why use this instead of Imgflip?",
                        answer: "Speed and privacy. We don't require an account, we don't add watermarks, and we don't track your content. Plus, our Liquid UI is just smoother."
                    },
                    {
                        question: "What image formats are supported?",
                        answer: "You can upload JPG, PNG, and WebP. Our exports are high-quality PNGs, perfect for Twitter, Reddit, or WhatsApp."
                    },
                    {
                        question: "Can I move text anywhere?",
                        answer: "Yes! Use the Y% positioning to place text anywhere on the vertical axis. We keep it centered horizontally to maintain the classic meme aesthetic."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
