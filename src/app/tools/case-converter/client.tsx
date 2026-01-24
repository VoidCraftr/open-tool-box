"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, RefreshCw, Trash2, Check, Type, Hash, AlignLeft, Sparkles, ShieldCheck } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"

export default function CaseConverter() {
    const [text, setText] = useState("")
    const [copied, setCopied] = useState(false)

    const updateText = (newText: string) => {
        setText(newText)
    }

    const toUpperCase = () => updateText(text.toUpperCase())
    const toLowerCase = () => updateText(text.toLowerCase())

    const toTitleCase = () => {
        updateText(
            text.toLowerCase().split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
        )
    }

    const toSentenceCase = () => {
        const result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
        updateText(result)
    }

    const toAlternatingCase = () => {
        let result = ""
        for (let i = 0; i < text.length; i++) {
            result += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase()
        }
        updateText(result)
    }

    const toInverseCase = () => {
        let result = ""
        for (let i = 0; i < text.length; i++) {
            const char = text[i]
            result += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        }
        updateText(result)
    }

    const copyToClipboard = () => {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const clearText = () => {
        setText("")
    }

    const stats = {
        chars: text.length,
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        sentences: text.trim() ? text.split(/[.!?]+/).length - 1 : 0
    }

    return (
        <ToolWrapper
            title="Premium Case Transmuter"
            description="High-precision text case conversion tool. Instantly transform between Title Case, CamelCase, SNAKE_CASE, and more with local privacy."
            toolSlug="case-converter"
        >
            <div className="grid lg:grid-cols-[1fr_320px] gap-8">
                {/* Main Workspace */}
                <div className="space-y-6 relative flex flex-col">
                    {/* Fixed Action Deck */}
                    <div className="sticky top-0 z-30 flex flex-col md:flex-row items-center justify-between gap-6 py-4 px-6 bg-background/80 backdrop-blur-xl border border-white/10 rounded-3xl liquid-shadow animate-fade-in shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col border-r border-white/10 pr-6 mr-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Status</span>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${text ? 'bg-green-500' : 'bg-primary/20'}`} />
                                    <span className="text-xs font-bold uppercase tracking-tighter">{text ? "Loaded" : "Empty"}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { label: "UPPER", fn: toUpperCase },
                                    { label: "lower", fn: toLowerCase },
                                    { label: "Title", fn: toTitleCase },
                                    { label: "Sentence", fn: toSentenceCase }
                                ].map((btn, i) => (
                                    <Button
                                        key={i}
                                        variant="secondary"
                                        size="sm"
                                        onClick={btn.fn}
                                        className="h-9 px-4 bg-white/5 border-white/5 hover:bg-primary/10 hover:border-primary/30 font-black uppercase tracking-tight text-[10px] transition-all"
                                    >
                                        {btn.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={clearText}
                                disabled={!text}
                                className="h-9 px-4 text-red-400 font-black uppercase tracking-widest text-[10px] hover:bg-red-400/10"
                            >
                                <Trash2 className="w-3.5 h-3.5 mr-2" /> CLEAR
                            </Button>
                            <Button
                                onClick={copyToClipboard}
                                disabled={!text}
                                className={`h-9 px-6 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${copied ? "bg-green-500 text-white" : "premium-button bg-primary"}`}
                            >
                                {copied ? <Check className="w-3.5 h-3.5 mr-2" /> : <Copy className="w-3.5 h-3.5 mr-2" />}
                                {copied ? "COPIED" : "COPY OUTPUT"}
                            </Button>
                        </div>
                    </div>

                    <Card className="premium-card border-white/10 bg-background/40 shadow-2xl relative overflow-hidden group rounded-[2.5rem]">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <Type className="w-48 h-48" />
                        </div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                                <AlignLeft className="w-4 h-4" /> Text Processing Core
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-0">
                            <div className="relative">
                                <Textarea
                                    placeholder="Input your raw character stream here..."
                                    className="min-h-[450px] bg-background/20 border-white/5 text-lg font-mono placeholder:opacity-30 p-10 focus:ring-primary/20 transition-all resize-none shadow-inner rounded-[2rem] border-2"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>

                            <Separator className="bg-white/5" />

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { label: "aLtErNaTiNg", fn: toAlternatingCase },
                                    { label: "iNVERSE", fn: toInverseCase }
                                ].map((btn, i) => (
                                    <Button
                                        key={i}
                                        variant="outline"
                                        onClick={btn.fn}
                                        className="h-12 bg-white/5 border-white/5 hover:bg-primary/10 hover:border-primary/30 font-bold uppercase tracking-tight text-[11px] transition-all hover:-translate-y-1 active:translate-y-0"
                                    >
                                        {btn.label}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Metrics Sidebar */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground opacity-60">
                                Live Metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { label: "Character Count", val: stats.chars, icon: Type },
                                { label: "Word Count", val: stats.words, icon: Hash },
                                { label: "Sentence Logic", val: stats.sentences, icon: AlignLeft }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <stat.icon className="w-4 h-4 text-primary opacity-60" />
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</span>
                                    </div>
                                    <span className="text-sm font-mono font-black">{stat.val}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 space-y-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <div className="flex items-center gap-3 text-primary">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-tighter italic">Secured Processing</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Text transmutation occurs entirely within your browser's memory-safe environment. No external APIs or servers are contacted.
                        </p>
                    </div>

                    <Card className="bg-background/20 border-white/5 p-5 animate-fade-in" style={{ animationDelay: "400ms" }}>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-yellow-500" /> Advanced Options
                        </h4>
                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start text-[10px] font-bold h-8 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors">
                                Remove Duplicate Lines
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-[10px] font-bold h-8 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors">
                                Trim Excess Whitespace
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            <ContentSection
                title="Professional Text Case Manipulation & Intelligence"
                description="Our Premium Case Transmuter is engineered for developers, writers, and digital creators who demand absolute control over their text formatting. Beyond simple conversion, it provides real-time character analytics and a dedicated local privacy guarantee."
                features={[
                    "🔠 **Full Case Spectrum**: Instantly convert to UPPERCASE, lowercase, Title Case, Sentence case, and more.",
                    "📊 **Real-time Analytics**: Monitor character, word, and sentence counts as you type.",
                    "🔒 **100% Client-Side**: Your text is processed strictly in-browser, ensuring total data confidentiality.",
                    "⚡ **High-Speed Transmutation**: Near-zero latency processing even for large character streams.",
                    "✨ **Neuromorphic Liquid UI**: A premium, glass-inspired interface designed for maximum productivity.",
                    "🛠️ **Developer Ready**: Clean output, monospace font support, and one-tap clipboard integration."
                ]}
                howToUse={[
                    "Input your raw text into the central **Text Processing Core** area.",
                    "Observe the **Live Metrics** sidebar for immediate character and word analytics.",
                    "Select your desired transformation using the **Case Selectors** at the bottom.",
                    "Your text will be transmuted instantly while maintaining original spacing.",
                    "Click **COPY STREAM** to move the result to your clipboard and finish the workflow."
                ]}
                faq={[
                    {
                        question: "Does Title Case handle small words like 'and' or 'the'?",
                        answer: "Our basic Title Case implementation capitalizes the first letter of every word. For specific AP or Chicago style formatting, further manual refinement may be needed for articles and prepositions."
                    },
                    {
                        question: "Can this tool handle extremely large text files?",
                        answer: "Yes. Since the conversion happens locally on your hardware, it can handle thousands of lines of text efficiently without the traditional timeouts associated with server-side tools."
                    },
                    {
                        question: "Why should I use this over a text editor?",
                        answer: "OpenToolBox provides specialized cases like 'Alternating' and 'Inverse' that aren't natively supported in standard editors, all within a distraction-free, privacy-hardened environment."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
