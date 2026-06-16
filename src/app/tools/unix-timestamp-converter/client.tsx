"use client"

import { useState, useEffect } from "react"
import { Copy, Trash2, Check, Clock, Save, History, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface HistoryItem {
    id: string
    timestamp: string
    isoDate: string
    unit: string
    createdAt: number
}

export default function UnixTimestampClient() {
    const [unixInput, setUnixInput] = useState("")
    const [isoInput, setIsoInput] = useState("")
    const [unit, setUnit] = useState<"auto" | "s" | "ms" | "us">("auto")
    
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [copiedUnix, setCopiedUnix] = useState(false)
    const [copiedIso, setCopiedIso] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const saved = localStorage.getItem("unix-timestamp-history")
        if (saved) {
            try {
                setHistory(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse history")
            }
        }
        setIsLoaded(true)
        
        // initialize with current time
        const now = Date.now()
        const initialUnix = Math.floor(now / 1000).toString()
        setUnixInput(initialUnix)
        setIsoInput(new Date(now).toISOString())
    }, [])

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("unix-timestamp-history", JSON.stringify(history))
        }
    }, [history, isLoaded])

    const guessUnit = (val: number) => {
        if (unit !== "auto") return unit
        if (val < 1e11) return "s"
        if (val < 1e14) return "ms"
        return "us"
    }

    const handleUnixChange = (value: string, currentUnit: string = unit) => {
        setUnixInput(value)
        setError(null)
        
        if (!value.trim()) {
            setIsoInput("")
            return
        }

        const num = Number(value)
        if (isNaN(num)) {
            setError("Invalid Unix timestamp")
            return
        }

        try {
            const detectedUnit = guessUnit(num)
            let ms = num
            if (detectedUnit === "s") ms = num * 1000
            else if (detectedUnit === "us") ms = Math.floor(num / 1000)

            const date = new Date(ms)
            if (isNaN(date.getTime())) {
                setError("Invalid Date")
                return
            }
            setIsoInput(date.toISOString())
        } catch (e) {
            setError("Failed to convert timestamp")
        }
    }

    const handleIsoChange = (value: string) => {
        setIsoInput(value)
        setError(null)

        if (!value.trim()) {
            setUnixInput("")
            return
        }

        const date = new Date(value)
        if (isNaN(date.getTime())) {
            setError("Invalid ISO8601 Date")
            return
        }

        const ms = date.getTime()
        const selectedUnit = unit === "auto" ? "s" : unit
        let converted = ms
        if (selectedUnit === "s") converted = Math.floor(ms / 1000)
        else if (selectedUnit === "us") converted = ms * 1000

        setUnixInput(converted.toString())
    }

    const handleUnitChange = (val: string) => {
        const newUnit = val as "auto" | "s" | "ms" | "us"
        setUnit(newUnit)
        if (unixInput) {
            // Re-evaluate the unix input with the new unit
            handleUnixChange(unixInput, newUnit)
        }
    }

    const saveToHistory = () => {
        if (error || !unixInput || !isoInput) return
        
        const newItem: HistoryItem = {
            id: crypto.randomUUID(),
            timestamp: unixInput,
            isoDate: isoInput,
            unit: guessUnit(Number(unixInput)),
            createdAt: Date.now()
        }
        
        setHistory(prev => [newItem, ...prev].slice(0, 50)) // keep last 50
    }

    const removeFromHistory = (id: string) => {
        setHistory(prev => prev.filter(h => h.id !== id))
    }

    const clearHistory = () => {
        setHistory([])
    }

    const copyToClipboard = (text: string, type: "unix" | "iso") => {
        navigator.clipboard.writeText(text)
        if (type === "unix") {
            setCopiedUnix(true)
            setTimeout(() => setCopiedUnix(false), 2000)
        } else {
            setCopiedIso(true)
            setTimeout(() => setCopiedIso(false), 2000)
        }
    }

    const loadHistoryItem = (item: HistoryItem) => {
        setUnit(item.unit as "auto" | "s" | "ms" | "us")
        setUnixInput(item.timestamp)
        setIsoInput(item.isoDate)
        setError(null)
    }

    return (
        <ToolWrapper
            title="Unix Timestamp Converter"
            description="Convert Unix timestamps (epoch) to readable dates and vice-versa. Supports seconds, milliseconds, and microseconds."
            toolSlug="unix-timestamp-converter"
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Timestamp Input */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-lg font-semibold flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" /> Unix Timestamp
                            </Label>
                            <Select value={unit} onValueChange={handleUnitChange}>
                                <SelectTrigger className="w-[140px] h-8">
                                    <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="auto">Auto-detect</SelectItem>
                                    <SelectItem value="s">Seconds (s)</SelectItem>
                                    <SelectItem value="ms">Milliseconds (ms)</SelectItem>
                                    <SelectItem value="us">Microseconds (μs)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="e.g. 1686900000"
                                className="h-14 text-lg font-mono"
                                value={unixInput}
                                onChange={(e) => handleUnixChange(e.target.value)}
                            />
                            <div className="absolute right-2 top-2 flex gap-1">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(unixInput, "unix")}
                                    disabled={!unixInput}
                                    title="Copy Timestamp"
                                >
                                    {copiedUnix ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Date Output/Input */}
                    <div className="space-y-4">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                            ISO8601 Date String
                        </Label>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="e.g. 2023-06-16T08:20:00.000Z"
                                className={`h-14 text-lg font-mono ${error ? 'border-destructive text-destructive' : ''}`}
                                value={isoInput}
                                onChange={(e) => handleIsoChange(e.target.value)}
                            />
                            <div className="absolute right-2 top-2 flex gap-1">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(isoInput, "iso")}
                                    disabled={!isoInput || !!error}
                                    title="Copy ISO Date"
                                >
                                    {copiedIso ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button onClick={saveToHistory} disabled={!!error || !unixInput || !isoInput} size="lg" className="gap-2">
                        <Save className="w-4 h-4" /> Save to History
                    </Button>
                </div>

                {/* History Timeline section */}
                {history.length > 0 && (
                    <div className="space-y-4 pt-8 border-t">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <History className="w-5 h-5" /> Conversion History
                            </h3>
                            <Button variant="ghost" size="sm" onClick={clearHistory} className="text-muted-foreground hover:text-destructive">
                                Clear All
                            </Button>
                        </div>
                        
                        <div className="relative border-l-2 border-muted ml-3 space-y-6 pb-4">
                            {history.map((item) => (
                                <div key={item.id} className="relative pl-6 group">
                                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2 ring-4 ring-background" />
                                    <div className="bg-muted/30 hover:bg-muted/50 transition-colors rounded-lg p-4 border flex items-start justify-between gap-4 cursor-pointer" onClick={() => loadHistoryItem(item)}>
                                        <div className="space-y-1 overflow-hidden">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                                                <span>{item.timestamp}</span>
                                                <span className="text-xs px-2 py-0.5 bg-muted rounded-full uppercase">{item.unit}</span>
                                            </div>
                                            <div className="font-mono truncate">{item.isoDate}</div>
                                            <div className="text-xs text-muted-foreground/60 mt-2">
                                                Saved on {new Date(item.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFromHistory(item.id);
                                                }}
                                                title="Remove from history"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <ContentSection
                    title="About Unix Timestamps"
                    description={`The Unix timestamp (or epoch time) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z). It is widely used in Unix-like and many other operating systems and file formats.`}
                    features={[
                        "🔄 **Two-Way Conversion:** Instantly convert Epoch to Date and Date to Epoch.",
                        "⏱️ **Auto-Detection:** Automatically detects seconds, milliseconds, or microseconds based on magnitude.",
                        "💾 **Local History:** Save conversions to local storage for quick access later.",
                        "📋 **Quick Copy:** Easily copy results to clipboard."
                    ]}
                    howToUse={[
                        "Type a Unix timestamp into the left field to see the human-readable ISO date on the right.",
                        "Modify the ISO date string on the right to see the exact Unix timestamp update on the left.",
                        "If you need a specific unit (like forcing milliseconds), change the dropdown from 'Auto-detect'.",
                        "Click 'Save to History' to keep a record of your important conversions."
                    ]}
                    faq={[
                        {
                            question: "What is the Year 2038 problem?",
                            answer: "The Year 2038 problem relates to representing time in many digital systems as the number of seconds passed since January 1, 1970. On January 19, 2038, this value will exceed the maximum value for a 32-bit signed integer, causing systems that use it to wrap around to a negative number."
                        },
                        {
                            question: "Are my timestamps sent to a server?",
                            answer: "No, all timestamp parsing and conversions happen directly in your browser. Your history is also saved to your browser's local storage securely."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
