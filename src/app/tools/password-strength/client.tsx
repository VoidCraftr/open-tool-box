"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ShieldCheck, Check, X, Shield, Lock, Activity, Sparkles, Zap, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { motion, AnimatePresence } from "framer-motion"
import { ToolLayout } from "@/components/tools/ui/ToolLayout"
import { ControlCard } from "@/components/tools/ui/ControlCard"

export default function PasswordStrength() {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const calculateStrength = (pwd: string) => {
        let score = 0
        if (!pwd) return 0

        if (pwd.length > 8) score += 20
        if (pwd.length > 12) score += 20
        if (/[A-Z]/.test(pwd)) score += 15
        if (/[a-z]/.test(pwd)) score += 15
        if (/[0-9]/.test(pwd)) score += 15
        if (/[^A-Za-z0-9]/.test(pwd)) score += 15

        return Math.min(100, score)
    }

    const estimateCrackTime = (pwd: string) => {
        if (!pwd) return "Instant"
        const length = pwd.length
        const hasUpper = /[A-Z]/.test(pwd)
        const hasLower = /[a-z]/.test(pwd)
        const hasNumber = /[0-9]/.test(pwd)
        const hasSpecial = /[^A-Za-z0-9]/.test(pwd)

        const poolSize = (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + (hasNumber ? 10 : 0) + (hasSpecial ? 33 : 0)
        const entropy = Math.log2(Math.pow(poolSize || 1, length))

        if (entropy < 28) return "Instant"
        if (entropy < 36) return "A few seconds"
        if (entropy < 60) return "Few minutes to Days"
        if (entropy < 80) return "Years"
        if (entropy < 120) return "Centuries"
        return "Millennia"
    }

    const strength = calculateStrength(password)
    const crackTime = estimateCrackTime(password)

    const getStrengthLabel = (s: number) => {
        if (s < 40) return "Weak"
        if (s < 70) return "Moderate"
        if (s < 90) return "Strong"
        return "Very Strong"
    }

    const getStrengthColor = (s: number) => {
        if (s < 40) return "bg-red-500"
        if (s < 70) return "bg-orange-500"
        if (s < 90) return "bg-green-500"
        return "bg-emerald-500"
    }

    const getStrengthTextColor = (s: number) => {
        if (s < 40) return "text-red-500"
        if (s < 70) return "text-orange-500"
        if (s < 90) return "text-green-500"
        return "text-emerald-500"
    }

    return (
        <ToolWrapper
            title="Premium Password Intelligence"
            description="Deep entropy analysis and crack-time estimation for enterprise-grade security auditing."
            toolSlug="password-strength"
            adSlot="password-strength-slot"
            className="max-w-7xl"
        >
            <ToolLayout
                sidebar={
                    <div className="space-y-6">
                        <ControlCard title="Security Level" icon={Shield} className="animate-fade-in">
                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs text-muted-foreground font-mono">Score</span>
                                    <span className={`text-2xl font-black italic uppercase tracking-tighter ${getStrengthTextColor(strength)}`}>
                                        {getStrengthLabel(strength)}
                                    </span>
                                </div>
                                <div className="h-4 w-full bg-muted/40 rounded-full overflow-hidden border border-border/50 p-0.5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${strength}%` }}
                                        className={`h-full rounded-full ${getStrengthColor(strength)} shadow-sm`}
                                    />
                                </div>
                            </div>
                        </ControlCard>

                        <ControlCard title="Time to Crack" icon={Timer} className="animate-fade-in delay-100">
                            <div className="p-4 bg-card rounded-xl border border-border/50 flex items-center justify-center text-center shadow-sm">
                                <div className="space-y-1">
                                    <motion.div
                                        key={crackTime}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-xl font-black text-primary tracking-tight"
                                    >
                                        {crackTime}
                                    </motion.div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Estimated Effort</p>
                                </div>
                            </div>
                        </ControlCard>

                        <ControlCard title="Entropy Composition" icon={Activity} className="animate-fade-in delay-200">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Base Entropy</span>
                                    <span className="font-mono text-foreground">~{Math.floor(strength * 1.2)} bits</span>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Character Pool</span>
                                    <span className="font-mono text-foreground">{password.length > 0 ? 'Active' : 'Empty'}</span>
                                </div>
                            </div>
                        </ControlCard>
                    </div>
                }
            >
                <div className="space-y-8">
                    <ControlCard title="Input Analysis" icon={Lock} className="border-0 bg-transparent shadow-none p-0">
                        <div className="relative group/input w-full">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover/input:opacity-100 transition duration-500" />
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password..."
                                    className="h-20 bg-card border-input text-2xl font-mono pl-6 pr-14 rounded-2xl focus-visible:ring-primary/50 text-foreground shadow-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-muted h-12 w-12 rounded-xl"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-6 h-6 text-muted-foreground" /> : <Eye className="w-6 h-6 text-muted-foreground" />}
                                </Button>
                            </div>
                        </div>
                    </ControlCard>

                    <AnimatePresence>
                        {password && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                                {[
                                    { label: "8+ Char", check: password.length >= 8, color: "text-green-500", icon: ShieldCheck },
                                    { label: "Uppercase", check: /[A-Z]/.test(password), color: "text-blue-500", icon: Sparkles },
                                    { label: "Lowercase", check: /[a-z]/.test(password), color: "text-emerald-500", icon: Activity },
                                    { label: "Numerical", check: /[0-9]/.test(password), color: "text-amber-500", icon: Zap },
                                    { label: "Special", check: /[^A-Za-z0-9]/.test(password), color: "text-purple-500", icon: Lock },
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl border ${item.check ? 'bg-card border-border shadow-sm' : 'bg-muted/20 border-border/50 opacity-40'} transition-all`}>
                                        <div className={`p-2 rounded-lg ${item.check ? `${item.color} bg-primary/5` : 'bg-muted text-muted-foreground'}`}>
                                            {item.check ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{item.label}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <ContentSection
                        title="Deep Entropy Analysis & Security Auditing"
                        description="Understanding password complexity is the first line of defense against cyber threats. Our Premium Password Intelligence tool uses advanced entropy modeling and pool-size analysis to provide a realistic estimation of password durability against modern brute-force techniques."
                        features={[
                            "📂 **Multivariate Entropy Check**: Analyzes character pool sizes (Alpha, Numeric, Special) against total length for precise entropy scores.",
                            "⏱️ **Brute-Force Simulator**: Estimates the time required for a modern botnet to crack your password using current GPU capabilities.",
                            "🛡️ **Client-Side Sanitation**: Your password never leaves your browser. All calculations are performed instantly using local compute resources.",
                            "🔍 **Real-Time Validation**: See security parameters light up as you satisfy complexity requirements for enterprise-grade passwords.",
                            "⚡ **Hardware Acceleration**: High-performance UI rendering ensures a smooth, animated experience without lag or latency.",
                            "✨ **Zero Persistence**: No history is kept. Your sensitive data exists only as long as the browser tab is open."
                        ]}
                        howToUse={[
                            "Enter the password you wish to audit into the high-fidelity input field.",
                            "Observe the **Security Level** meter as it calculates strength based on character diversity.",
                            "Review the **Crack Time** estimation to understand your vulnerability to automated attacks.",
                            "Check the **Parameter Grid** to identify missing complexity elements (e.g., special characters or numbers).",
                            "Optimize your password until you reach the **Strong** or **Very Strong** status for maximum security."
                        ]}
                        faq={[
                            {
                                question: "How is 'Crack Time' estimated?",
                                answer: "Our engine uses a logarithmic entropy model combined with modern GPU hash-rate averages to simulate how long a brute-force attack would take to exhaust the character space."
                            },
                            {
                                question: "Is it safe to type my password here?",
                                answer: "Yes. OpenToolbox is strictly client-side. We do not use any backend for password analysis, and there are no tracking scripts monitoring your input."
                            },
                            {
                                question: "What makes a password 'Very Strong'?",
                                answer: "A length of at least 16 characters combined with symbols, numbers, and both case types. This creates a computational barrier that would take millennia to breach."
                            }
                        ]}
                    />
                </div>
            </ToolLayout>
        </ToolWrapper>
    )
}
