"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Percent, ArrowRight, ArrowUp, ArrowDown, Activity, Sparkles, ShieldCheck, Zap } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"

export default function PercentageCalculator() {
    // Mode 1: What is X% of Y?
    const [m1_percent, setM1_Percent] = useState("")
    const [m1_number, setM1_Number] = useState("")
    const [m1_result, setM1_Result] = useState<number | null>(null)

    // Mode 2: X is what percent of Y?
    const [m2_part, setM2_Part] = useState("")
    const [m2_whole, setM2_Whole] = useState("")
    const [m2_result, setM2_Result] = useState<number | null>(null)

    // Mode 3: Percentage Change from X to Y
    const [m3_from, setM3_From] = useState("")
    const [m3_to, setM3_To] = useState("")
    const [m3_result, setM3_Result] = useState<number | null>(null)
    const [m3_type, setM3_Type] = useState<"increase" | "decrease" | null>(null)

    useEffect(() => {
        const p = parseFloat(m1_percent)
        const n = parseFloat(m1_number)
        if (!isNaN(p) && !isNaN(n)) {
            setM1_Result((p / 100) * n)
        } else {
            setM1_Result(null)
        }
    }, [m1_percent, m1_number])

    useEffect(() => {
        const part = parseFloat(m2_part)
        const whole = parseFloat(m2_whole)
        if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
            setM2_Result((part / whole) * 100)
        } else {
            setM2_Result(null)
        }
    }, [m2_part, m2_whole])

    useEffect(() => {
        const from = parseFloat(m3_from)
        const to = parseFloat(m3_to)
        if (!isNaN(from) && !isNaN(to) && from !== 0) {
            const change = ((to - from) / from) * 100
            setM3_Result(Math.abs(change))
            setM3_Type(change >= 0 ? "increase" : "decrease")
        } else {
            setM3_Result(null)
            setM3_Type(null)
        }
    }, [m3_from, m3_to])

    return (
        <ToolWrapper
            title="Premium Percentage Intelligence"
            description="High-precision percentage calculator for finance, business, and academics. Calculate growth, markups, and relative values with ease."
            toolSlug="percentage-calculator"
        >
            <div className="grid lg:grid-cols-1 gap-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mode 1: What is X% of Y? */}
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                            <Percent className="w-20 h-20" />
                        </div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Activity className="w-4 h-4 text-primary" />
                                Value Extraction
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold tracking-widest opacity-60">What is X% of Y?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-tight text-muted-foreground">Percentage (%)</Label>
                                    <Input
                                        type="number"
                                        placeholder="15"
                                        className="h-12 bg-background/50 border-white/10 text-lg font-mono"
                                        value={m1_percent}
                                        onChange={(e) => setM1_Percent(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-tight text-muted-foreground">Base Value</Label>
                                    <Input
                                        type="number"
                                        placeholder="1000"
                                        className="h-12 bg-background/50 border-white/10 text-lg font-mono"
                                        value={m1_number}
                                        onChange={(e) => setM1_Number(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Separator className="bg-white/5" />
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl relative">
                                <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">Resulting Value</p>
                                <div className="text-3xl font-black tracking-tighter text-foreground font-mono">
                                    {m1_result !== null ? m1_result.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "---"}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mode 2: X is what percent of Y? */}
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden group" style={{ animationDelay: "100ms" }}>
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                            <Sparkles className="w-20 h-20" />
                        </div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                Ratio Analysis
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold tracking-widest opacity-60">X is what % of Y?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-tight text-muted-foreground">Partial Value (X)</Label>
                                    <Input
                                        type="number"
                                        placeholder="250"
                                        className="h-12 bg-background/50 border-white/10 text-lg font-mono"
                                        value={m2_part}
                                        onChange={(e) => setM2_Part(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-tight text-muted-foreground">Total Value (Y)</Label>
                                    <Input
                                        type="number"
                                        placeholder="1000"
                                        className="h-12 bg-background/50 border-white/10 text-lg font-mono"
                                        value={m2_whole}
                                        onChange={(e) => setM2_Whole(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Separator className="bg-white/5" />
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl relative">
                                <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">Calculated Proportion</p>
                                <div className="text-3xl font-black tracking-tighter text-foreground font-mono">
                                    {m2_result !== null ? (
                                        <>{m2_result.toLocaleString(undefined, { maximumFractionDigits: 2 })}<span className="text-sm ml-1 opacity-50">%</span></>
                                    ) : "---"}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mode 3: Percentage Change */}
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden group" style={{ animationDelay: "200ms" }}>
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                            <ArrowRight className="w-20 h-20" />
                        </div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Activity className="w-4 h-4 text-purple-500" />
                                Delta Tracking
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold tracking-widest opacity-60">Change from X to Y</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-tight text-muted-foreground">Starting Value</Label>
                                    <Input
                                        type="number"
                                        placeholder="50"
                                        className="h-12 bg-background/50 border-white/10 text-lg font-mono"
                                        value={m3_from}
                                        onChange={(e) => setM3_From(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[9px] font-black uppercase tracking-tight text-muted-foreground">Final Value</Label>
                                    <Input
                                        type="number"
                                        placeholder="75"
                                        className="h-12 bg-background/50 border-white/10 text-lg font-mono"
                                        value={m3_to}
                                        onChange={(e) => setM3_To(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Separator className="bg-white/5" />
                            <div className={`p-4 rounded-xl relative transition-colors ${m3_type === 'increase' ? 'bg-green-500/10 border border-green-500/20' : m3_type === 'decrease' ? 'bg-red-500/10 border border-red-500/20' : 'bg-primary/5 border border-primary/20'}`}>
                                <p className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${m3_type === 'increase' ? 'text-green-500' : m3_type === 'decrease' ? 'text-red-500' : 'text-primary'}`}>
                                    {m3_type ? `${m3_type} Detection` : 'Percentage Change'}
                                </p>
                                <div className={`text-3xl font-black tracking-tighter font-mono flex items-center gap-2 ${m3_type === 'increase' ? 'text-green-500' : m3_type === 'decrease' ? 'text-red-500' : 'text-foreground'}`}>
                                    {m3_result !== null ? (
                                        <>
                                            {m3_type === 'increase' ? <ArrowUp className="w-6 h-6" /> : <ArrowDown className="w-6 h-6" />}
                                            {m3_result.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                                        </>
                                    ) : "---"}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-center justify-between animate-fade-in" style={{ animationDelay: "300ms" }}>
                    <div className="flex gap-4 items-center">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black italic uppercase tracking-tighter text-primary">Cryptographic Privacy</h4>
                            <p className="text-xs text-muted-foreground">All mathematical operations are executed on your local CPU. Your financial data is nunca sent to a remote server.</p>
                        </div>
                    </div>
                </div>
            </div>

            <ContentSection
                title="Exact Percentage Intelligence & Financial Analytics"
                description="Percentage calculation is the backbone of financial planning, academic success, and business growth. Our Premium Percentage Intelligence tool provides a suite of high-precision mathematical units to solve any relative value problem with speed and privacy."
                features={[
                    "📐 **Triple Mode Processing**: Calculate value extraction, proportions, and delta (increase/decrease) tracking in one place.",
                    "⚡ **Real-time Reactive UI**: See results instantly as you type, with no need for a 'calculate' button.",
                    "💹 **Growth Analytics**: Dedicated visual cues for percentage increase and decrease to help you track performance.",
                    "🔒 **Bank-Grade Privacy**: Your financial values remain 100% private. All logic is executed on the client side.",
                    "🔋 **Ultra-Precision Logic**: Mathematical operations are handled with 2-decimal point precision for accuracy.",
                    "✨ **Cinematic Design**: A premium interface that turns raw math into a beautiful, productive experience."
                ]}
                howToUse={[
                    "Identify your calculation need: **Value Extraction** (X% of Y), **Ratio Analysis** (X is what % of Y), or **Delta Tracking** (Change from X to Y).",
                    "Input your values into the corresponding high-fidelity card.",
                    "The result will be generated instantly in the highlighted **Results** zone.",
                    "For Percentage Change, use the color-coded direction indicators (Green for growth, Red for decline).",
                    "Reset or change any value to see the real-time update of your mathematical model."
                ]}
                faq={[
                    {
                        question: "How is percentage increase/decrease calculated?",
                        answer: "We use the standard formula: ((New Value - Original Value) / Original Value) * 100. This determines the relative change regardless of the magnitude of the numbers."
                    },
                    {
                        question: "Is there a limit to the numbers I can use?",
                        answer: "The tool can handle very large numbers (up to standard JavaScript floating point limits) and very small fractions with consistent accuracy."
                    },
                    {
                        question: "Why should I use this over a physical calculator?",
                        answer: "Speed and context. Seeing all three percentage modes simultaneously allows you to cross-verify financial data and see the 'big picture' of your numbers instantly."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
