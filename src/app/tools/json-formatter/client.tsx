"use client"

import { useState } from "react"
import { Copy, Trash2, ShieldCheck, Minimize, Maximize, Download, Activity, Zap, Play, FileJson } from "lucide-react"
import { Button } from "@/components/ui/button"
import Editor from "@monaco-editor/react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolLayout } from "@/components/tools/ui/ToolLayout"
import { ControlCard } from "@/components/tools/ui/ControlCard"

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
            className="max-w-[2000px] px-4"
        >
            <div className="flex flex-col gap-6 animate-fade-in">
                {/* Main Editors - Full Width */}
                <div className="grid lg:grid-cols-2 gap-4 h-[60vh] min-h-[400px]">
                    {/* Input Node */}
                    <Card className="bg-card border border-border shadow-sm flex flex-col min-h-0 overflow-hidden group hover:shadow-md transition-all">
                        <CardHeader className="px-3 border-b border-border flex flex-row items-center justify-between shrink-0 bg-muted/40">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Play className="w-3.5 h-3.5" /> Source Input
                            </CardTitle>
                            {/* Input Tools */}
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={handleClear} className="h-6 px-2 text-[10px] text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                    <Trash2 className="w-3 h-3 mr-1" /> Clear
                                </Button>
                                <Button variant="ghost" size="sm" onClick={handleLoadSample} className="h-6 px-2 text-[10px] text-muted-foreground hover:text-primary hover:bg-primary/10">
                                    <FileJson className="w-3 h-3 mr-1" /> Sample
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 min-h-0 bg-card">
                            <Editor
                                height="100%"
                                defaultLanguage="json"
                                theme="vs-dark"
                                value={input}
                                onChange={(value) => setInput(value || "")}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 13,
                                    wordWrap: "on",
                                    padding: { top: 16, bottom: 16 },
                                    lineNumbersMinChars: 3,
                                    renderLineHighlight: "none",
                                    fontFamily: "'Geist Mono', monospace",
                                }}
                            />
                        </CardContent>
                    </Card>

                    {/* Output Node */}
                    <Card className="bg-card border border-border shadow-sm flex flex-col min-h-0 overflow-hidden group hover:shadow-md transition-all">
                        <CardHeader className="px-3 border-b border-border flex flex-row items-center justify-between shrink-0 bg-muted/40">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5" /> Formatted Output
                            </CardTitle>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={handleDownload} disabled={!output} className="h-6 w-6 hover:bg-primary/10 hover:text-primary rounded-md transition-all" title="Download">
                                    <Download className="w-3.5 h-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!output} className="h-6 w-6 hover:bg-primary/10 hover:text-primary rounded-md transition-all" title="Copy">
                                    <Copy className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 min-h-0 bg-card">
                            <div className="relative h-full">
                                <Editor
                                    height="100%"
                                    defaultLanguage="json"
                                    theme="vs-dark"
                                    value={output}
                                    options={{
                                        readOnly: true,
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        wordWrap: "on",
                                        padding: { top: 16, bottom: 16 },
                                        lineNumbersMinChars: 3,
                                        renderLineHighlight: "none",
                                        fontFamily: "'Geist Mono', monospace",
                                    }}
                                />
                                {copied && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-50 pointer-events-none"
                                    >
                                        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-2xl flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4" /> Copied to Clipboard
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                        >
                            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 rounded-xl">
                                <AlertTitle className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                    <Activity className="w-4 h-4" /> Syntax Hazard Detected
                                </AlertTitle>
                                <AlertDescription className="font-mono text-xs opacity-80">{error}</AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Professional Toolbar */}
                <Card className="bg-muted/30 border-border p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                    {/* Status Section */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg shadow-sm">
                            <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500 animate-pulse' : input ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                            <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">
                                {error ? "Invalid JSON" : input ? "Valid JSON" : "Waiting"}
                            </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                            <ShieldCheck className="w-3 h-3 text-primary/50" />
                            <span>Local Processing</span>
                        </div>
                    </div>

                    {/* Primary Actions */}
                    <div className="flex items-center gap-2 flex-1 justify-center">
                        <Button
                            onClick={handleFormat}
                            className="h-10 px-8 premium-button bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                        >
                            <Maximize className="mr-2 h-4 w-4" /> Prettify
                        </Button>
                        <Button
                            onClick={handleMinify}
                            variant="secondary"
                            className="h-10 px-6 bg-background border border-border hover:bg-accent font-bold"
                        >
                            <Minimize className="mr-2 h-4 w-4" /> Minify
                        </Button>
                    </div>

                    {/* Meta Info */}
                    <div className="text-xs text-muted-foreground font-mono">
                        {input.length > 0 && <span>{new Blob([input]).size} bytes</span>}
                    </div>
                </Card>
            </div>

            <div className="mt-12">
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
                        "Click the **Prettify** button to organize messy code into a readable tree.",
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
            </div>
        </ToolWrapper>
    )
}

