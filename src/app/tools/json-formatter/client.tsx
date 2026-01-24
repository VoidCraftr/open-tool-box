"use client"

import { useState } from "react"
import { Copy, Trash2, ShieldCheck, Minimize, Maximize, Download, Activity, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Editor from "@monaco-editor/react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function JsonFormatterClient() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const handleFormat = () => {
        try {
            if (!input.trim()) return
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed, null, 2))
            setError(null)
        } catch (err) {
            setError((err as Error).message)
            setOutput("")
        }
    }

    const handleMinify = () => {
        try {
            if (!input.trim()) return
            const parsed = JSON.parse(input)
            setOutput(JSON.stringify(parsed))
            setError(null)
        } catch (err) {
            setError((err as Error).message)
            setOutput("")
        }
    }

    const handleClear = () => {
        setInput("")
        setOutput("")
        setError(null)
    }

    const handleCopy = () => {
        if (!output) return
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        if (!output) return
        const blob = new Blob([output], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "formatted.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleLoadSample = () => {
        const sample = {
            "project": "OpenToolbox",
            "version": 1.0,
            "features": ["formatting", "validation", "minification"],
            "meta": {
                "author": "Open Source Community",
                "license": "MIT"
            },
            "stats": {
                "active_users": 5000,
                "uptime": "99.9%"
            }
        }
        setInput(JSON.stringify(sample, null, 2))
        setError(null)
    }

    return (
        <ToolWrapper
            title="Professional JSON Logic Suite"
            description="High-performance JSON formatter, validator, and minifier with real-time syntax highlighting. Secure, localized, and developer-grade."
            toolSlug="json-formatter"
            adSlot="json-tool-slot"
            className="max-w-7xl"
        >
            <div className="flex flex-col h-[calc(100vh-200px)] min-h-[750px] gap-6 relative">
                {/* Fixed Control Deck at Top */}
                <div className="sticky top-0 z-30 flex flex-col md:flex-row items-center justify-between gap-6 py-4 px-6 bg-background/80 backdrop-blur-xl border border-white/10 rounded-3xl liquid-shadow animate-fade-in shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Engine Status</span>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500 animate-pulse' : input ? 'bg-green-500' : 'bg-primary/20'}`} />
                                <span className="text-xs font-bold">{error ? "Syntax Hazard Detected" : input ? "Ready for Synthesis" : "Awaiting Input"}</span>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="h-8 bg-white/10" />
                        <div className="flex gap-3">
                            <Button onClick={handleFormat} size="lg" className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-lg shadow-primary/20 active:scale-95 transition-all">
                                <Maximize className="mr-2 h-4 w-4" /> PRETTIFY
                            </Button>
                            <Button onClick={handleMinify} variant="secondary" size="lg" className="h-12 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-foreground font-black active:scale-95 transition-all border border-white/5">
                                <Minimize className="mr-2 h-4 w-4" /> MINIFY
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-[10px] text-muted-foreground italic font-medium uppercase tracking-tighter">Localized Processing Zero Cloud Logging</p>
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="z-20"
                        >
                            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 rounded-2xl">
                                <AlertTitle className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                    <Activity className="w-4 h-4" /> Logic Regression Detected
                                </AlertTitle>
                                <AlertDescription className="font-mono text-xs opacity-80">{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Master Grid - Growing below fixed header */}
                <div className="grid lg:grid-cols-2 lg:flex-1 gap-6 min-h-0">
                    {/* Input Node */}
                    <Card className="liquid-glass border-white/20 shadow-liquid flex flex-col min-h-0 overflow-hidden group">
                        <CardHeader className="py-4 px-6 border-b border-white/5 flex flex-row items-center justify-between shrink-0">
                            <div>
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    <Activity className="w-4 h-4" /> Source JSON
                                </CardTitle>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={handleLoadSample} className="h-8 text-[10px] font-black tracking-widest hover:bg-primary/10 hover:text-primary transition-all">
                                    LOAD SAMPLE
                                </Button>
                                <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 text-[10px] font-black tracking-widest text-red-400 hover:bg-red-400/10 transition-all">
                                    <Trash2 className="w-3 h-3 mr-1.5" /> CLEAR
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 min-h-0 bg-black/20">
                            <Editor
                                height="100%"
                                defaultLanguage="json"
                                theme="vs-dark"
                                value={input}
                                onChange={(value) => setInput(value || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    wordWrap: "on",
                                    padding: { top: 20, bottom: 20 },
                                    lineNumbersMinChars: 3,
                                    renderLineHighlight: "none"
                                }}
                            />
                        </CardContent>
                    </Card>

                    {/* Output Node */}
                    <Card className="liquid-glass border-white/20 shadow-liquid flex flex-col min-h-0 overflow-hidden group">
                        <CardHeader className="py-4 px-6 border-b border-white/5 flex flex-row items-center justify-between shrink-0">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Formatted Result
                            </CardTitle>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={handleDownload} disabled={!output} className="h-8 text-[10px] font-black tracking-widest hover:bg-primary/10 transition-all">
                                    <Download className="w-3 h-3 mr-1.5" /> DOWNLOAD
                                </Button>
                                <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output} className="h-8 text-[10px] font-black tracking-widest hover:bg-primary/10 transition-all">
                                    <Copy className="w-3 h-3 mr-1.5" /> {copied ? "COPIED" : "COPY"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 min-h-0 bg-black/40">
                            <Editor
                                height="100%"
                                defaultLanguage="json"
                                theme="vs-dark"
                                value={output}
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    wordWrap: "on",
                                    padding: { top: 20, bottom: 20 },
                                    lineNumbersMinChars: 3,
                                    renderLineHighlight: "none"
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ContentSection
                title="The Ultimate JSON Formatter & Validator"
                description={`Stop struggling with messy, unreadable JSON data. Our **Free JSON Formatter** is the perfect tool for developers, data analysts, and students who need to debug, validate, and prettify JSON code instantly.\n\nUnlike other tools that send your possibly sensitive data to a remote server for processing, OpenToolbox performs **100% of the logic right here in your browser**. This means your API keys, user data, and configuration files never leave your device. \n\nWhether you are debugging an API response, minifying a payload for production, or just trying to read a massive configuration file, we've exactly what you need.`}
                features={[
                    "🔒 **100% Client-Side Privacy**: Your data never leaves your browser.",
                    "⚡ **Instant Validation**: Detects syntax errors, missing quotes, and trailing commas immediately.",
                    "🎨 **Syntax Highlighting**: Beautiful, easy-to-read color coding for keys, strings, and booleans.",
                    "📦 **Minification**: Compress functionality to remove whitespace and reduce payload size.",
                    "📂 **File Support**: Copy/Paste or Load huge JSON strings without crashing.",
                    "🌙 **Dark Mode**: Easy on the eyes for late-night debugging sessions."
                ]}
                howToUse={[
                    "Paste your raw / minified JSON code into the left 'Input' editor panels.",
                    "Click the **Format / Prettify** button to organize messy code into a readable tree.",
                    "Use **Minify** if you need to compress the data for production use.",
                    "If there are errors, check the red alert box for detailed syntax correction hints.",
                    "Once happy, click **Copy** or **Download** to save your clean JSON file."
                ]}
                faq={[
                    {
                        question: "Is it safe to paste API keys or passwords here?",
                        answer: "Yes, it is safer than most other online tools. Because we run entirely in your browser (Client-Side), your text input is never sent over the internet. However, as a best practice, we always recommend redacting sensitive secrets before pasting them into any webpage."
                    },
                    {
                        question: "Why is my JSON showing as 'Invalid'?",
                        answer: "JSON is strict! Common errors include: using single quotes (') instead of double quotes (\"), trailing commas after the last item in an object or array, or unquoted keys. Our tool tries to point out exactly line-by-line where the syntax broke."
                    },
                    {
                        question: "Is there a file size limit?",
                        answer: "Technically, no. Since it runs on your machine, the limit is your own browser's memory (RAM). You can formatting files up to 5MB-10MB easily. For files larger than 50MB, the browser might stutter."
                    },
                    {
                        question: "Can I use this offline?",
                        answer: "Yes! Once this page is loaded, you can disconnect your internet and continue using the tool indefinitely. It does not require an active connection to format code."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
