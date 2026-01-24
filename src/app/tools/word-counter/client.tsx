"use client"

import { useState, useEffect } from "react"
import { Copy, Trash2, Type } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

import { PrivacyBadge } from "@/components/common/PrivacyBadge"

export default function WordCounterPage() {
    const [text, setText] = useState("")
    const [isSimpleMode, setIsSimpleMode] = useState(true)
    const [stats, setStats] = useState({
        words: 0,
        characters: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
        topKeywords: [] as { word: string, count: number }[]
    })

    useEffect(() => {
        const wordsArr = text.trim() === "" ? [] : text.trim().split(/\s+/)
        const words = wordsArr.length
        const characters = text.length
        const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).length - 1
        const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).length
        const readingTime = Math.ceil(words / 200)
        const speakingTime = Math.ceil(words / 130)

        // Keyword Density
        const frequency: Record<string, number> = {}
        const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me'])

        wordsArr.forEach(w => {
            const clean = w.toLowerCase().replace(/[.,!?;:()]/g, "")
            if (clean.length > 2 && !stopWords.has(clean)) {
                frequency[clean] = (frequency[clean] || 0) + 1
            }
        })

        const topKeywords = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word, count]) => ({ word, count }))

        setStats({ words, characters, sentences, paragraphs, readingTime, speakingTime, topKeywords })
    }, [text])

    const handleCase = (type: "upper" | "lower" | "title") => {
        switch (type) {
            case "upper": setText(text.toUpperCase()); break;
            case "lower": setText(text.toLowerCase()); break;
            case "title":
                setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
                break;
        }
    }

    return (
        <ToolWrapper
            title={isSimpleMode ? "Count My Words" : "Word & Character Counter"}
            description={isSimpleMode ? "Type or paste your text to see how many words you have. 100% Private." : "Calculate words, characters, sentences, and reading time in real-time."}
            adSlot="word-counter-slot"
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
                            Casual Writer
                        </button>
                        <button
                            onClick={() => setIsSimpleMode(false)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${!isSimpleMode ? "bg-primary text-primary-foreground shadow-md scale-105" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            Pro Editor
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
                    <div className="group liquid-glass p-6 rounded-3xl border border-primary/10 transition-all hover:-translate-y-1 liquid-shadow">
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1 opacity-60">Words</p>
                        <p className="text-3xl font-black">{stats.words.toLocaleString()}</p>
                    </div>
                    <div className="group liquid-glass p-6 rounded-3xl border border-primary/10 transition-all hover:-translate-y-1 liquid-shadow">
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1 opacity-60">Characters</p>
                        <p className="text-3xl font-black">{stats.characters.toLocaleString()}</p>
                    </div>
                    {!isSimpleMode && (
                        <>
                            <div className="group liquid-glass p-6 rounded-3xl border border-primary/10 transition-all hover:-translate-y-1 liquid-shadow">
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1 opacity-60">Sentences</p>
                                <p className="text-3xl font-black">{stats.sentences}</p>
                            </div>
                            <div className="group liquid-glass p-6 rounded-3xl border border-primary/10 transition-all hover:-translate-y-1 liquid-shadow">
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1 opacity-60">Paragraphs</p>
                                <p className="text-3xl font-black">{stats.paragraphs}</p>
                            </div>
                        </>
                    )}
                    <div className="group liquid-glass p-6 rounded-3xl border border-primary/10 transition-all hover:-translate-y-1 liquid-shadow">
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1 opacity-60">Reading Time</p>
                        <p className="text-3xl font-black">{stats.readingTime} min</p>
                    </div>
                    {isSimpleMode && (
                        <div className="hidden lg:block group liquid-glass p-6 rounded-3xl border border-primary/10 transition-all hover:-translate-y-1 liquid-shadow">
                            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1 opacity-60">Speaking Time</p>
                            <p className="text-3xl font-black">{stats.speakingTime} min</p>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {!isSimpleMode && (
                            <>
                                <Button variant="outline" className="premium-button h-11 px-6 rounded-2xl" onClick={() => handleCase("upper")}>
                                    <Type className="mr-2 h-4 w-4" /> UPPERCASE
                                </Button>
                                <Button variant="outline" className="premium-button h-11 px-6 rounded-2xl" onClick={() => handleCase("lower")}>
                                    <Type className="mr-2 h-4 w-4" /> lowercase
                                </Button>
                                <Button variant="outline" className="premium-button h-11 px-6 rounded-2xl" onClick={() => handleCase("title")}>
                                    <Type className="mr-2 h-4 w-4" /> Title Case
                                </Button>
                            </>
                        )}
                        <div className="flex-1" />
                        <Button variant="ghost" className="h-11 px-6 rounded-2xl text-destructive hover:bg-destructive/10" onClick={() => setText("")}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear All
                        </Button>
                        <Button variant="outline" className="premium-button h-11 px-6 rounded-2xl" onClick={() => navigator.clipboard.writeText(text)}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Text
                        </Button>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200" />
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={isSimpleMode ? "Start typing or paste your text here..." : "Type or paste your content for analysis..."}
                            className="relative min-h-[450px] text-xl leading-relaxed p-10 rounded-[2rem] border-2 border-primary/10 bg-background/50 backdrop-blur-md transition-all focus:border-primary/40 focus:ring-0"
                        />
                    </div>

                    <div className="flex justify-center">
                        <PrivacyBadge />
                    </div>

                    {!isSimpleMode && stats.topKeywords.length > 0 && (
                        <div className="space-y-4 pt-4 animate-fade-in">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1 h-3 bg-primary rounded-full" />
                                Vocabulary Highlights
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {stats.topKeywords.map((k) => (
                                    <div key={k.word} className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 rounded-2xl px-5 py-2 text-sm border border-primary/10 transition-all cursor-default">
                                        <span className="font-bold text-primary">{k.word}</span>
                                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-lg text-[10px] font-black">{k.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ContentSection
                title="Word & Character Counter Guide"
                description={`A real-time text analysis tool for writers, students, and SEO professionals. \n\nInstantly calculate word count, character count, sentence count, and estimated reading time. Perfect for checking essay lengths, social media post limits (Twitter/X, LinkedIn), or blog post optimization.`}
                features={[
                    "Real-time Counting",
                    "Reading Time Estimation",
                    "Paragraph & Sentence Analysis",
                    "Case Conversion (Upper/Lower/Title)"
                ]}
                faq={[
                    {
                        question: "How is reading time calculated?",
                        answer: "We assume an average reading speed of 200 words per minute (WPM), which is standard for most adults reading English text."
                    },
                    {
                        question: "Does it count spaces?",
                        answer: "The 'Characters' count includes spaces. If you need a count without spaces, you can use our advanced text analysis tools."
                    },
                    {
                        question: "Is my text saved?",
                        answer: "No. All analysis happens instantly in your browser's memory. Your text is cleared when you refresh the page."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
