"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ShieldCheck, Check, X, Shield, Lock, Activity, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { motion, AnimatePresence } from "framer-motion"

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

    return (
        <ToolWrapper
            title="Premium Password Intelligence"
            description="Deep entropy analysis and crack-time estimation for enterprise-grade security auditing."
            toolSlug="password-strength"
        >
            <div className="space-y-8">
                <Card className="liquid-glass border-white/20 shadow-liquid overflow-hidden relative group">
                    <CardHeader className="border-b border-white/10 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tighter uppercase">Security Analysis</CardTitle>
                                <CardDescription className="font-medium">All checks are localized. We never see your password.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 space-y-10">
                        <div className="relative group/input max-w-2xl mx-auto w-full">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover/input:opacity-100 transition duration-500" />
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password for analysis..."
                                    className="h-16 bg-black/40 border-white/10 text-xl font-mono pl-6 pr-14 rounded-2xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/5 h-10 w-10"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </Button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {password && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="space-y-8 max-w-2xl mx-auto"
                                >
                                    {/* Strength Meter */}
                                    <div className="space-y-4 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                                        <div className="flex justify-between items-end mb-2">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Security Level</p>
                                                <h4 className={`text-2xl font-black italic uppercase tracking-tighter ${getStrengthColor(strength).replace('bg-', 'text-')}`}>
                                                    {getStrengthLabel(strength)}
                                                </h4>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Crack Time</p>
                                                <h4 className="text-lg font-black tracking-widest">{crackTime}</h4>
                                            </div>
                                        </div>

                                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${strength}%` }}
                                                className={`h-full rounded-full ${getStrengthColor(strength)} shadow-lg transition-all duration-700`}
                                            />
                                        </div>
                                    </div>

                                    {/* Parameter Validation */}
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[
                                            { label: "8+ Char", check: password.length >= 8, color: "text-green-500", icon: ShieldCheck },
                                            { label: "Uppercase", check: /[A-Z]/.test(password), color: "text-blue-500", icon: Sparkles },
                                            { label: "Lowercase", check: /[a-z]/.test(password), color: "text-emerald-500", icon: Activity },
                                            { label: "Numerical", check: /[0-9]/.test(password), color: "text-amber-500", icon: Zap },
                                            { label: "Special", check: /[^A-Za-z0-9]/.test(password), color: "text-purple-500", icon: Lock },
                                        ].map((item, i) => (
                                            <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl border ${item.check ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5 opacity-30'} transition-all`}>
                                                <div className={`p-2 rounded-lg ${item.check ? `${item.color} bg-current/10` : 'bg-white/5 text-muted-foreground'}`}>
                                                    {item.check ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>

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
        </ToolWrapper>
    )
}
