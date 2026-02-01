"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Copy, RefreshCw, Check, Shield, Lock, Fingerprint, Hash, Zap, Sparkles, Activity, History as HistoryIcon, Clock, Eye, EyeOff, ShieldAlert, ShieldCheck, Sliders } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import { ToolLayout } from "@/components/tools/ui/ToolLayout"
import { ControlCard } from "@/components/tools/ui/ControlCard"
import { PillSelector } from "@/components/tools/ui/PillSelector"

export default function PasswordGeneratorClient() {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState([20])
    const [mode, setMode] = useState<"quick" | "custom">("quick")
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        excludeSimilar: false,
    })
    const [history, setHistory] = useState<string[]>([])
    const [copied, setCopied] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    const generatePassword = useCallback(() => {
        setIsGenerating(true)
        const sets = {
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
        }

        let chars = ""
        if (options.uppercase) chars += sets.uppercase
        if (options.lowercase) chars += sets.lowercase
        if (options.numbers) chars += sets.numbers
        if (options.symbols) chars += sets.symbols

        if (options.excludeSimilar) {
            chars = chars.replace(/[il1Lo0O]/g, "")
        }

        if (chars === "") {
            setPassword("")
            setIsGenerating(false)
            return
        }

        let result = ""
        const randomValues = new Uint32Array(length[0])
        window.crypto.getRandomValues(randomValues)

        for (let i = 0; i < length[0]; i++) {
            result += chars.charAt(randomValues[i] % chars.length)
        }

        setPassword(result)
        setIsGenerating(false)

        setHistory(prev => {
            if (prev.includes(result)) return prev
            return [result, ...prev].slice(0, 8)
        })
    }, [length, options])

    useEffect(() => {
        generatePassword()
    }, [generatePassword])

    const applySimplePreset = (type: "secure" | "memorable" | "pin") => {
        switch (type) {
            case "secure":
                setLength([24])
                setOptions({ uppercase: true, lowercase: true, numbers: true, symbols: true, excludeSimilar: false })
                break
            case "memorable":
                setLength([14])
                setOptions({ uppercase: true, lowercase: true, numbers: true, symbols: false, excludeSimilar: true })
                break
            case "pin":
                setLength([6])
                setOptions({ uppercase: false, lowercase: false, numbers: true, symbols: false, excludeSimilar: false })
                break
        }
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleOptionChange = (key: keyof typeof options) => {
        setOptions(prev => {
            const next = { ...prev, [key]: !prev[key] }
            if (key !== 'excludeSimilar' && !next.uppercase && !next.lowercase && !next.numbers && !next.symbols) return prev
            return next
        })
    }

    const stats = useMemo(() => {
        let poolSize = 0
        if (options.uppercase) poolSize += 26
        if (options.lowercase) poolSize += 26
        if (options.numbers) poolSize += 10
        if (options.symbols) poolSize += 30
        if (options.excludeSimilar) poolSize -= 8

        const entropy = Math.log2(Math.pow(poolSize, length[0]))

        let label = "Weak", color = "bg-red-500", textColor = "text-red-500", crackTime = "Instant"

        if (entropy >= 100) { label = "Titanium"; color = "bg-emerald-500"; textColor = "text-emerald-500"; crackTime = "1,000+ Centuries" }
        else if (entropy >= 80) { label = "Fortress"; color = "bg-green-500"; textColor = "text-green-500"; crackTime = "500+ Years" }
        else if (entropy >= 60) { label = "Strong"; color = "bg-blue-500"; textColor = "text-blue-500"; crackTime = "10+ Years" }
        else if (entropy >= 40) { label = "Moderate"; color = "bg-yellow-500"; textColor = "text-yellow-500"; crackTime = "Months" }
        else if (entropy >= 25) { label = "Weak"; color = "bg-orange-500"; textColor = "text-orange-500"; crackTime = "Days" }

        return { label, color, textColor, entropy, crackTime }
    }, [length, options, password])

    return (
        <ToolWrapper
            title={mode === 'quick' ? "Instant Security" : "Deep Security Engine"}
            description={mode === 'quick' ? "CSPRNG-grade encryption for your digital life. 100% private, 100% localized." : "Professional password architecture with real-time entropy analysis."}
            toolSlug="password-generator"
            adSlot="password-generator-slot"
            className="max-w-7xl"
        >
            <ToolLayout
                sidebar={
                    <div className="space-y-6">
                        <ControlCard title="Generation Mode" icon={Sliders} className="animate-fade-in">
                            <PillSelector
                                value={mode}
                                onChange={setMode}
                                options={[
                                    { value: 'quick', label: 'Quick Presets', icon: <Zap className="w-3 h-3" /> },
                                    { value: 'custom', label: 'Custom Config', icon: <Sliders className="w-3 h-3" /> },
                                ]}
                            />
                        </ControlCard>

                        {mode === 'quick' ? (
                            <ControlCard title="Security Profile" icon={Shield} className="animate-fade-in space-y-2">
                                {[
                                    { id: 'secure', icon: Shield, title: 'TITANIUM', sub: '24 Chars + Symbols', color: 'text-emerald-500', bg: 'hover:bg-emerald-500/10' },
                                    { id: 'memorable', icon: Fingerprint, title: 'BALANCE', sub: '14 Chars (Readable)', color: 'text-blue-500', bg: 'hover:bg-blue-500/10' },
                                    { id: 'pin', icon: Hash, title: 'EXPRESS', sub: '6-Digit Access Code', color: 'text-yellow-500', bg: 'hover:bg-yellow-500/10' }
                                ].map((preset) => (
                                    <button
                                        key={preset.id}
                                        onClick={() => applySimplePreset(preset.id as any)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20 transition-all text-left group hover:border-primary/20 ${preset.bg}`}
                                    >
                                        <div className={`p-2 rounded-lg bg-background shadow-sm ${preset.color}`}>
                                            <preset.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black tracking-wider uppercase text-foreground">{preset.title}</div>
                                            <div className="text-[10px] text-muted-foreground">{preset.sub}</div>
                                        </div>
                                    </button>
                                ))}
                            </ControlCard>
                        ) : (
                            <ControlCard title="Configuration Matrix" icon={Activity} className="animate-fade-in space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Length</Label>
                                        <span className="text-xl font-black text-primary font-mono">{length[0]}</span>
                                    </div>
                                    <Slider value={length} onValueChange={setLength} max={64} min={8} step={1} className="py-2" />
                                </div>
                                <div className="space-y-2">
                                    {Object.entries(options).filter(([k]) => k !== 'excludeSimilar').map(([key, checked]) => (
                                        <div key={key} onClick={() => handleOptionChange(key as any)} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer group transition-colors">
                                            <Label className="font-bold text-[10px] uppercase tracking-widest cursor-pointer group-hover:text-primary transition-colors text-foreground">{key}</Label>
                                            <Switch checked={checked as boolean} className="scale-75 origin-right" />
                                        </div>
                                    ))}
                                    <Separator className="bg-border my-2" />
                                    <div onClick={() => handleOptionChange('excludeSimilar')} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer group transition-colors">
                                        <div className="flex flex-col">
                                            <Label className="font-bold text-[10px] uppercase tracking-widest cursor-pointer group-hover:text-primary transition-colors text-foreground">No Ambiguous</Label>
                                            <span className="text-[9px] text-muted-foreground">No i, l, 1, 0, o</span>
                                        </div>
                                        <Switch checked={options.excludeSimilar} className="scale-75 origin-right" />
                                    </div>
                                </div>
                            </ControlCard>
                        )}

                        <Button
                            onClick={generatePassword}
                            className="w-full h-14 premium-button bg-primary text-primary-foreground text-lg font-black shadow-primary/25 rounded-2xl animate-pulse-slow"
                        >
                            <RefreshCw className={`mr-2 h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} /> GENERATE
                        </Button>
                    </div>
                }
            >
                {/* Main Content */}
                <div className="flex flex-col gap-6">
                    {/* Hero Password Display */}
                    <Card className="bg-card border border-border/50 shadow-lg rounded-[2rem] overflow-hidden min-h-[200px] flex flex-col justify-center relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-emerald-500/5 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <CardContent className="p-8 md:p-12 flex flex-col items-center gap-6 relative z-10">
                            <div className="font-mono text-3xl md:text-5xl font-black tracking-[0.15em] break-all text-center leading-tight selection:bg-primary/30">
                                {password.split('').map((char, i) => {
                                    let type = 'text-foreground'
                                    if (/[0-9]/.test(char)) type = 'text-blue-500'
                                    if (/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(char)) type = 'text-primary'
                                    if (/[a-z]/.test(char)) type = 'text-muted-foreground/80'
                                    return <span key={i} className={type}>{char}</span>
                                })}
                            </div>
                            <div className="flex gap-4">
                                <Button size="lg" onClick={() => handleCopy(password)} className="rounded-xl px-8 bg-muted/30 hover:bg-muted/50 border border-border text-foreground backdrop-blur-md transition-all">
                                    {copied ? <Check className="mr-2 h-5 w-5 text-emerald-500" /> : <Copy className="mr-2 h-5 w-5" />}
                                    {copied ? "COPIED" : "COPY SECURELY"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <ControlCard title="Entropy Analysis" icon={Activity}>
                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-muted-foreground font-mono">Strength</span>
                                    <span className={`text-sm font-black uppercase ${stats.textColor}`}>{stats.label}</span>
                                </div>
                                <div className="h-3 w-full bg-muted/40 rounded-full overflow-hidden border border-border/50">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, stats.entropy)}%` }}
                                        className={`h-full ${stats.color} shadow-sm`}
                                    />
                                </div>
                                <div className="flex justify-between items-center bg-muted/20 p-3 rounded-lg border border-border/50">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Est. Crack Time</span>
                                    <span className="text-xs font-bold font-mono text-foreground flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-primary" /> {stats.crackTime}
                                    </span>
                                </div>
                            </div>
                        </ControlCard>

                        <ControlCard title="Session Vault" icon={HistoryIcon} contentClassName="space-y-2">
                            {history.slice(0, 4).map((pass, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50 group hover:border-primary/20 transition-all shadow-sm">
                                    <span className="font-mono text-xs truncate mr-4 opacity-50 group-hover:opacity-100 transition-all w-full text-foreground">{pass}</span>
                                    <Button size="icon" variant="ghost" className="h-6 w-6 rounded-md opacity-0 group-hover:opacity-100" onClick={() => handleCopy(pass)}>
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                            {history.length === 0 && (
                                <div className="text-center py-8 text-xs text-muted-foreground opacity-50 italic">
                                    Generated passwords will appear here
                                </div>
                            )}
                        </ControlCard>
                    </div>
                </div>
            </ToolLayout>

            <div className="mt-12">
                <ContentSection
                    title="CSPRNG Secure Logic Architecture"
                    description={`OpenToolbox uses the Web Crypto API's cryptographically secure random number generator (CSPRNG) to build every password. This ensures true randomness that is statistically superior to standard Math.random() implementations.\n\nOur logic never leaves your CPU. No API calls, no analytics tracking, no remote logging. In a world of digital vulnerability, we provide a zero-trust environment for your most sensitive credentials.`}
                    features={[
                        "🔐 **Zero-Knowledge Architecture**: Your data never leaves your RAM.",
                        "⚡ **Entropy Analysis**: Real-time evaluation of password complexity based on pool size and length.",
                        "🛠️ **Custom Matrix**: Fine-tune character sets and exclude ambiguous glyphs (i, l, 0, o).",
                        "📱 **Device Local**: Works 100% offline once the page is loaded.",
                        "🎨 **Visual Anatomy**: Distinct color coding for character types to prevent transcription errors."
                    ]}
                    howToUse={[
                        "Choose between **Quick Secure** for instant presets or **Custom Architect** for manual control.",
                        "Adjust the **Character Resolution** slider to define the target length.",
                        "Toggle the **Matrix Filters** to include specific character sets.",
                        "Generate and Copy your asset with the premium action buttons.",
                        "Reference the **Session Vault** for previously generated codes."
                    ]}
                    faq={[
                        {
                            question: "How secure is 'Titanium' grade?",
                            answer: "Titanium grade passwords (>100 bits of entropy) are practically impossible to crack with current computing power, requiring billions of years even for massive botnets."
                        },
                        {
                            question: "Why are some characters colored differently?",
                            answer: "We use visual anatomy highlighting to help you distinguish symbols (primary), numbers (blue), and letters (muted). This reduces errors when manually typing a password."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
