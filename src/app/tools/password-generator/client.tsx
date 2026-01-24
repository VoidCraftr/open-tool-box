"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Copy, RefreshCw, Check, Shield, Lock, Fingerprint, Hash, Zap, Sparkles, Activity, History as HistoryIcon, Clock, Eye, EyeOff, ShieldAlert, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { PrivacyBadge } from "@/components/common/PrivacyBadge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PasswordGeneratorClient() {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState([20])
    const [isSimpleMode, setIsSimpleMode] = useState(true)
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
        // Browser's CSPRNG
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
            // Ensure at least one charset is selected
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
        if (options.excludeSimilar) poolSize -= 8 // rough estimate

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
            title={isSimpleMode ? "Instant Security" : "Deep Security Engine"}
            description={isSimpleMode ? "CSPRNG-grade encryption for your digital life. 100% private, 100% localized." : "Professional password architecture with real-time entropy analysis."}
            toolSlug="password-generator"
            adSlot="password-generator-slot"
            className="max-w-6xl"
        >
            <div className="flex flex-col gap-8">
                {/* Global Toggle */}
                <div className="flex justify-center mb-4">
                    <div className="p-1 liquid-glass border border-white/10 rounded-2xl flex gap-1">
                        <Button
                            variant={isSimpleMode ? "default" : "ghost"}
                            onClick={() => setIsSimpleMode(true)}
                            className={`rounded-xl px-8 h-12 text-xs font-black tracking-widest transition-all ${isSimpleMode ? 'bg-primary shadow-lg shadow-primary/20' : 'text-muted-foreground'}`}
                        >
                            <Zap className="w-4 h-4 mr-2" /> QUICK SECURE
                        </Button>
                        <Button
                            variant={!isSimpleMode ? "default" : "ghost"}
                            onClick={() => setIsSimpleMode(false)}
                            className={`rounded-xl px-8 h-12 text-xs font-black tracking-widest transition-all ${!isSimpleMode ? 'bg-primary shadow-lg shadow-primary/20' : 'text-muted-foreground'}`}
                        >
                            <Activity className="w-4 h-4 mr-2" /> CUSTOM ARCHITECT
                        </Button>
                    </div>
                </div>

                {/* Terminal/Output Deck */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-blue-500/10 to-emerald-500/10 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-100 transition duration-1000" />
                    <Card className="relative liquid-glass border-white/20 shadow-liquid rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-12 space-y-10">
                            {/* Password Display */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-full flex items-center justify-between gap-4">
                                    <div className="flex-1 bg-black/40 rounded-3xl p-10 flex items-center justify-center min-h-[140px] border border-white/5 group/pass relative">
                                        <div className="font-mono text-3xl md:text-5xl font-black tracking-[0.2em] break-all text-center leading-tight">
                                            {password.split('').map((char, i) => {
                                                let type = 'text-foreground'
                                                if (/[0-9]/.test(char)) type = 'text-blue-400'
                                                if (/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(char)) type = 'text-primary'
                                                if (/[a-z]/.test(char)) type = 'text-muted-foreground'
                                                return <span key={i} className={type}>{char}</span>
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={generatePassword}
                                            className="h-16 w-16 rounded-3xl bg-white/5 hover:bg-white/10 text-primary active:scale-90 transition-all border border-white/5"
                                        >
                                            <RefreshCw className={`h-8 w-8 ${isGenerating ? 'animate-spin' : ''}`} />
                                        </Button>
                                        <Button
                                            size="icon"
                                            onClick={() => handleCopy(password)}
                                            className="h-16 w-16 rounded-3xl premium-button shadow-2xl shadow-primary/30"
                                        >
                                            {copied ? <Check className="h-8 w-8" /> : <Copy className="h-8 w-8" />}
                                        </Button>
                                    </div>
                                </div>

                                {/* Status Dashboard */}
                                <div className="w-full grid md:grid-cols-2 gap-8 items-center pt-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Security Integrity</span>
                                            <span className={`text-xs font-black uppercase ${stats.textColor} italic`}>{stats.label}</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(100, stats.entropy)}%` }}
                                                className={`h-full ${stats.color} shadow-lg`}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                                            <span className="text-[9px] font-black text-muted-foreground uppercase mb-1">Time to Crack</span>
                                            <span className="text-xs font-black text-foreground flex items-center gap-2">
                                                <Clock className="w-3 h-3 text-primary" /> {stats.crackTime}
                                            </span>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                                            <span className="text-[9px] font-black text-muted-foreground uppercase mb-1">Processing</span>
                                            <span className="text-xs font-black text-foreground flex items-center gap-2">
                                                <ShieldCheck className="w-3 h-3 text-emerald-400" /> LOCAL-ONLY
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Adaptive Controller */}
                <AnimatePresence mode="wait">
                    {isSimpleMode ? (
                        <motion.div
                            key="simple"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid sm:grid-cols-3 gap-6"
                        >
                            {[
                                { id: 'secure', icon: Shield, title: 'TITANIUM', sub: '24 Chars + Symbols', color: 'text-emerald-400' },
                                { id: 'memorable', icon: Fingerprint, title: 'BALANCE', sub: '14 Chars (Readable)', color: 'text-blue-400' },
                                { id: 'pin', icon: Hash, title: 'EXPRESS', sub: '6-Digit Access Code', color: 'text-yellow-400' }
                            ].map((preset) => (
                                <button
                                    key={preset.id}
                                    onClick={() => applySimplePreset(preset.id as any)}
                                    className="group p-8 rounded-[2rem] liquid-glass border border-white/10 hover:border-primary/50 transition-all text-left relative overflow-hidden active:scale-95"
                                >
                                    <div className={`mb-6 p-4 rounded-2xl bg-white/5 inline-flex ${preset.color}`}>
                                        <preset.icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-lg tracking-widest">{preset.title}</h4>
                                    <p className="text-xs text-muted-foreground font-medium mt-1">{preset.sub}</p>
                                </button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="advanced"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Card className="liquid-glass border-white/20 rounded-[2.5rem] overflow-hidden">
                                <CardHeader className="p-8 border-b border-white/5">
                                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                                        <Activity className="w-4 h-4" /> Security Configuration Matrix
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-10">
                                    {/* Length Slider Unified */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-1">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Character Resolution</Label>
                                                <p className="text-[11px] text-muted-foreground/60 italic">Higher length exponentially increases entropy.</p>
                                            </div>
                                            <span className="text-4xl font-black text-primary font-mono">{length[0]}</span>
                                        </div>
                                        <Slider
                                            value={length}
                                            onValueChange={setLength}
                                            max={64}
                                            min={8}
                                            step={1}
                                            className="py-4"
                                        />
                                    </div>

                                    <Separator className="bg-white/5" />

                                    {/* Settings Matrix */}
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-4">Core Character Sets</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {Object.entries(options).filter(([k]) => k !== 'excludeSimilar').map(([key, checked]) => (
                                                    <div key={key} onClick={() => handleOptionChange(key as any)} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                                                        <Label className="font-black text-[10px] uppercase tracking-widest cursor-pointer group-hover:text-primary transition-colors">{key}</Label>
                                                        <Switch checked={checked as boolean} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-4">Enhanced Filters</Label>
                                            <div className="space-y-4">
                                                <div onClick={() => handleOptionChange('excludeSimilar')} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                                                    <div className="space-y-1">
                                                        <Label className="font-black text-[10px] uppercase tracking-widest block">Exclude Ambiguous</Label>
                                                        <span className="text-[9px] text-muted-foreground">Remove i, l, 1, 0, O</span>
                                                    </div>
                                                    <Switch checked={options.excludeSimilar} />
                                                </div>
                                                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex gap-4">
                                                    <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
                                                    <p className="text-[10px] text-primary font-medium tracking-tight">Security Note: Excluding characters reduces pool size but makes the password more human-readable.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Vault Archive */}
                {history.length > 1 && (
                    <div className="space-y-4 animate-fade-in">
                        <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] flex items-center gap-2 ml-4">
                            <HistoryIcon className="w-3 h-3 text-primary" /> Session Vault
                        </h3>
                        <div className="grid gap-3">
                            <AnimatePresence>
                                {history.slice(1, 6).map((pass, i) => (
                                    <motion.div
                                        key={pass}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center justify-between p-5 rounded-3xl border border-white/5 bg-black/20 group hover:border-primary/20 transition-all hover:bg-black/40"
                                    >
                                        <span className="font-mono text-sm truncate mr-4 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all tracking-widest">{pass}</span>
                                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-primary/20" onClick={() => handleCopy(pass)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>

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
        </ToolWrapper>
    )
}
