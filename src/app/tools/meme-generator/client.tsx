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
    Search,
    Upload,
    ChevronDown,
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
// Shared components
import { ToolLayout } from "@/components/tools/ui/ToolLayout"
import { ControlCard } from "@/components/tools/ui/ControlCard"

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
    bold?: boolean
    italic?: boolean
    fontFamily?: string
    rotation?: number
    x: number
    y: number
}

export default function MemeGeneratorClient() {
    const [image, setImage] = useState<string>(TRENDING_TEMPLATES[0].url)
    const [textBlocks, setTextBlocks] = useState<TextBlock[]>([
        { id: "top", text: "TOP TEXT", color: "#ffffff", fontSize: 40, uppercase: true, bold: true, fontFamily: "Impact", rotation: 0, x: 50, y: 10 },
        { id: "bottom", text: "BOTTOM TEXT", color: "#ffffff", fontSize: 40, uppercase: true, bold: true, fontFamily: "Impact", rotation: 0, x: 50, y: 80 }
    ])
    const [expandedBlockId, setExpandedBlockId] = useState<string | null>("top")
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
        setTextBlocks([...textBlocks, { id, text: "NEW TEXT", color: "#ffffff", fontSize: 30, uppercase: true, bold: true, fontFamily: "Impact", rotation: 0, x: 50, y: 50 }])
        setExpandedBlockId(id)
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
            adSlot="meme-generator-slot"
            className="max-w-7xl"
        >
            <ToolLayout
                sidebar={
                    <div className="space-y-6">
                        {/* Image Source Card */}
                        <ControlCard
                            title="Source Asset"
                            icon={ImageIcon}
                            className="p-4"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="outline"
                                    className="h-20 border-dashed border-border bg-muted/20 hover:bg-muted/50 flex flex-col gap-2 rounded-xl transition-all hover:scale-[1.02] text-foreground"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="w-6 h-6 text-primary" />
                                    <span className="text-[10px] uppercase font-bold">Upload</span>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </Button>
                                <div className="h-20 bg-primary/5 rounded-xl border border-primary/20 flex flex-col items-center justify-center p-3 text-center">
                                    <Sparkles className="w-5 h-5 text-primary mb-1" />
                                    <span className="text-[9px] font-black uppercase leading-tight italic text-foreground">Trending Engine</span>
                                </div>
                            </div>
                        </ControlCard>

                        {/* Text Controls - Moved to middle */}
                        <ControlCard
                            title="Caption Layers"
                            icon={Type}
                            rightElement={
                                <Button size="sm" variant="ghost" onClick={addTextBlock} className="h-6 px-2 text-[10px] font-black italic uppercase text-primary hover:bg-primary/10 hover:text-primary">
                                    <Plus className="w-3 h-3 mr-1" /> Add
                                </Button>
                            }
                        >
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                <AnimatePresence>
                                    {textBlocks.map((block) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            key={block.id}
                                            className={cn(
                                                "rounded-xl border transition-all duration-200 overflow-hidden",
                                                expandedBlockId === block.id
                                                    ? "bg-card border-primary/50 shadow-sm"
                                                    : "bg-muted/30 border-transparent hover:border-border"
                                            )}
                                        >
                                            {/* Header - Always Visible */}
                                            <div
                                                className="p-3 flex items-center gap-2 cursor-pointer select-none"
                                                onClick={() => setExpandedBlockId(expandedBlockId === block.id ? null : block.id)}
                                            >
                                                <div
                                                    className={cn(
                                                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 transition-colors",
                                                        expandedBlockId === block.id
                                                            ? "bg-primary text-primary-foreground border-primary"
                                                            : "bg-background border-input text-muted-foreground"
                                                    )}
                                                >
                                                    {block.text.charAt(0).toUpperCase()}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium truncate text-foreground/90">
                                                        {block.text || "Empty Layer"}
                                                    </p>
                                                </div>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        removeTextBlock(block.id)
                                                    }}
                                                    className="w-7 h-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>

                                                <ChevronDown
                                                    className={cn(
                                                        "w-4 h-4 text-muted-foreground transition-transform duration-200",
                                                        expandedBlockId === block.id && "rotate-180"
                                                    )}
                                                />
                                            </div>

                                            {/* Advanced Controls - Collapsible */}
                                            <AnimatePresence>
                                                {expandedBlockId === block.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-3 pt-0 space-y-4 border-t border-border/50">

                                                            {/* Main Input & Color */}
                                                            <div className="pt-3 flex gap-2">
                                                                <Input
                                                                    className="h-9 bg-background/50 border-input text-xs font-bold"
                                                                    placeholder="Enter caption..."
                                                                    value={block.text}
                                                                    onChange={e => updateTextBlock(block.id, { text: e.target.value })}
                                                                />
                                                                <div className="relative shrink-0">
                                                                    <div className="absolute inset-0 rounded-md bg-gradient-to-br from-white/20 to-black/10 pointer-events-none" />
                                                                    <input
                                                                        type="color"
                                                                        className="h-9 w-9 p-1 rounded-md bg-background border border-input cursor-pointer"
                                                                        value={block.color}
                                                                        onChange={e => updateTextBlock(block.id, { color: e.target.value })}
                                                                        title="Text Color"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Sliders Grid */}
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div className="space-y-1.5">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Size</span>
                                                                        <span className="text-[10px] text-muted-foreground">{block.fontSize}px</span>
                                                                    </div>
                                                                    <Input
                                                                        type="range"
                                                                        min={10}
                                                                        max={100}
                                                                        className="h-2 bg-transparent p-0 cursor-pointer accent-primary"
                                                                        value={block.fontSize}
                                                                        onChange={e => updateTextBlock(block.id, { fontSize: Number(e.target.value) })}
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Rotation</span>
                                                                        <span className="text-[10px] text-muted-foreground">{block.rotation}°</span>
                                                                    </div>
                                                                    <Input
                                                                        type="range"
                                                                        min={-180}
                                                                        max={180}
                                                                        className="h-2 bg-transparent p-0 cursor-pointer accent-primary"
                                                                        value={block.rotation || 0}
                                                                        onChange={e => updateTextBlock(block.id, { rotation: Number(e.target.value) })}
                                                                    />
                                                                </div>
                                                                <div className="col-span-2 space-y-1.5">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Vertical Position</span>
                                                                        <span className="text-[10px] text-muted-foreground">{block.y}%</span>
                                                                    </div>
                                                                    <Input
                                                                        type="range"
                                                                        min={0}
                                                                        max={100}
                                                                        className="h-2 bg-transparent p-0 cursor-pointer accent-primary"
                                                                        value={block.y}
                                                                        onChange={e => updateTextBlock(block.id, { y: Number(e.target.value) })}
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Font & Style */}
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <select
                                                                    className="col-span-2 h-8 w-full rounded-md border border-input bg-background/50 px-2 text-xs font-medium focus:ring-1 focus:ring-primary"
                                                                    value={block.fontFamily || 'Impact'}
                                                                    onChange={e => updateTextBlock(block.id, { fontFamily: e.target.value })}
                                                                >
                                                                    <option value="Impact">Impact (Classic)</option>
                                                                    <option value="Arial">Arial (Clean)</option>
                                                                    <option value="Verdana">Verdana (Wide)</option>
                                                                    <option value="Comic Sans MS">Comic Sans (Fun)</option>
                                                                    <option value="Courier New">Courier (Retro)</option>
                                                                    <option value="Times New Roman">Times (Serif)</option>
                                                                    <option value="Brush Script MT">Brush (Handwritten)</option>
                                                                </select>

                                                                <div className="col-span-2 grid grid-cols-3 gap-1 bg-muted/30 p-1 rounded-lg">
                                                                    <Button
                                                                        size="sm"
                                                                        variant={block.uppercase ? "secondary" : "ghost"}
                                                                        onClick={() => updateTextBlock(block.id, { uppercase: !block.uppercase })}
                                                                        className={cn("h-7 text-[10px] px-0", block.uppercase && "bg-white dark:bg-zinc-700 shadow-sm")}
                                                                    >
                                                                        AA
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant={block.bold ? "secondary" : "ghost"}
                                                                        onClick={() => updateTextBlock(block.id, { bold: !block.bold })}
                                                                        className={cn("h-7 text-[10px] px-0 font-bold", block.bold && "bg-white dark:bg-zinc-700 shadow-sm")}
                                                                    >
                                                                        B
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant={block.italic ? "secondary" : "ghost"}
                                                                        onClick={() => updateTextBlock(block.id, { italic: !block.italic })}
                                                                        className={cn("h-7 text-[10px] px-0 italic", block.italic && "bg-white dark:bg-zinc-700 shadow-sm")}
                                                                    >
                                                                        I
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </ControlCard>

                        {/* Template Hub */}
                        <ControlCard
                            title="Global Templates"
                            icon={Search}
                            contentClassName="p-3"
                        >
                            <div className="grid grid-cols-3 gap-2">
                                {TRENDING_TEMPLATES.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setImage(t.url)}
                                        className={cn(
                                            "aspect-square rounded-lg overflow-hidden border-2 transition-all p-0.5 relative group",
                                            image === t.url ? "border-primary bg-primary/10" : "border-transparent bg-muted/20 hover:border-primary/20"
                                        )}
                                    >
                                        <img src={t.url} alt={t.name} className="w-full h-full object-cover rounded-md group-hover:scale-110 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        </ControlCard>

                        <Button
                            onClick={handleDownload}
                            className="w-full h-14 premium-button text-lg bg-primary text-primary-foreground shadow-primary/20 animate-pulse-slow font-bold"
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-2">
                                    <RefreshCcw className="w-5 h-5 animate-spin" /> Rendering...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Download className="w-5 h-5" /> Download Asset
                                </span>
                            )}
                        </Button>
                    </div>
                }
            >
                {/* Main Content */}
                < div className="space-y-6" >
                    <div className="relative group/canvas max-w-2xl mx-auto w-full">
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-yellow-500/10 blur-3xl opacity-50 group-hover/canvas:opacity-100 transition duration-1000" />

                        <div
                            ref={canvasRef}
                            className="relative w-full aspect-square bg-[#1a1a1a] rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 transition-transform duration-500 hover:scale-[1.01]"
                        >
                            <img src={image} alt="Meme template" className="w-full h-full object-contain" />

                            {/* Overlay Text */}
                            {textBlocks.map((block) => (
                                <div
                                    key={block.id}
                                    style={{
                                        top: `${block.y}%`,
                                        left: `${block.x}%`,
                                        transform: `translateX(-50%) rotate(${block.rotation || 0}deg)`,
                                        fontSize: `${block.fontSize}px`,
                                        color: block.color,
                                        WebkitTextStroke: '2px black',
                                        strokeWidth: '2px',
                                        paintOrder: 'stroke fill',
                                        fontFamily: block.fontFamily || 'Impact',
                                        fontWeight: block.bold ? 'bold' : 'normal',
                                        fontStyle: block.italic ? 'italic' : 'normal',
                                        textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                                    }}
                                    className={cn(
                                        "absolute text-center tracking-tight leading-none px-4 select-none break-words max-w-[90%]",
                                        block.uppercase && "uppercase"
                                    )}
                                >
                                    {block.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 animate-fade-in group hover:shadow-md transition-all max-w-2xl mx-auto">
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
                </div >
            </ToolLayout >

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
        </ToolWrapper >
    )
}
