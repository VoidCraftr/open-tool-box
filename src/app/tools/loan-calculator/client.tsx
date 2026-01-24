"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { DollarSign, Calendar, Percent, Landmark, TrendingUp, ShieldCheck, Sparkles, Activity } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"

export default function LoanCalculator() {
    const [amount, setAmount] = useState(10000)
    const [rate, setRate] = useState(5)
    const [years, setYears] = useState(5)

    const [emi, setEmi] = useState(0)
    const [totalInterest, setTotalInterest] = useState(0)
    const [totalPayment, setTotalPayment] = useState(0)

    useEffect(() => {
        const principal = amount
        const monthlyRate = rate / 12 / 100
        const months = years * 12

        if (principal > 0 && rate > 0 && years > 0) {
            const emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
            const totalPay = emiCalc * months
            const totalInt = totalPay - principal

            setEmi(emiCalc)
            setTotalPayment(totalPay)
            setTotalInterest(totalInt)
        }
    }, [amount, rate, years])

    const data = [
        { name: 'Principal Amount', value: amount, color: '#3b82f6' }, // Blue 500
        { name: 'Total Interest', value: totalInterest, color: '#f97316' }, // Orange 500
    ]

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
    }

    return (
        <ToolWrapper
            title="Professional Loan Amortization Intelligence"
            description="High-precision loan and mortgage calculator with real-time interest tracking and visual debt analytics. Private, secure, and professional-grade."
            toolSlug="loan-calculator"
        >
            <div className="grid lg:grid-cols-[400px_1fr] gap-8">
                {/* Input Sidebar */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Landmark className="w-24 h-24" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-primary" />
                                Principal Logic
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase tracking-widest font-black opacity-60">
                                Configure your debt model
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Amount */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <Label className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">Loan Amount</Label>
                                    <span className="text-xl font-mono font-black text-primary">{formatCurrency(amount)}</span>
                                </div>
                                <div className="relative group">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type="number"
                                        className="pl-9 h-12 bg-background/50 border-white/10 text-lg font-mono focus:ring-primary/20"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                    />
                                </div>
                                <Slider
                                    value={[amount]}
                                    min={1000}
                                    max={1000000}
                                    step={1000}
                                    onValueChange={(val) => setAmount(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Rate */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <Label className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">Annual Interest Rate</Label>
                                    <span className="text-xl font-mono font-black text-primary">{rate}%</span>
                                </div>
                                <div className="relative group">
                                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type="number"
                                        className="pl-9 h-12 bg-background/50 border-white/10 text-lg font-mono focus:ring-primary/20"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                    />
                                </div>
                                <Slider
                                    value={[rate]}
                                    min={0.1}
                                    max={20}
                                    step={0.1}
                                    onValueChange={(val) => setRate(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Term */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <Label className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">Loan Term Duration</Label>
                                    <span className="text-xl font-mono font-black text-primary">{years} Years</span>
                                </div>
                                <div className="relative group">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        type="number"
                                        className="pl-9 h-12 bg-background/50 border-white/10 text-lg font-mono focus:ring-primary/20"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                    />
                                </div>
                                <Slider
                                    value={[years]}
                                    min={1}
                                    max={30}
                                    step={1}
                                    onValueChange={(val) => setYears(val[0])}
                                    className="py-4"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <div className="p-2 bg-primary/10 rounded-lg h-fit">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-primary italic uppercase tracking-tighter">Encrypted Local Logic</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Financial biometrics are processed locally. Your debt profile never leaves your secure node.</p>
                        </div>
                    </div>
                </div>

                {/* Analysis Dashboard */}
                <div className="space-y-8 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            {/* Primary Result Widget */}
                            <Card className="premium-card bg-primary text-primary-foreground border-none relative overflow-hidden shadow-2xl shadow-primary/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                    <TrendingUp className="w-32 h-32" />
                                </div>
                                <CardContent className="pt-10 pb-12 relative z-10 text-center space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70">Calculated Monthly Installment (EMI)</p>
                                    <h2 className="text-7xl md:text-8xl font-black tracking-tighter font-mono">{formatCurrency(emi)}</h2>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary-foreground/30" />)}
                                    </div>
                                </CardContent>
                                <div className="bg-black/20 backdrop-blur-md py-4 px-8 flex justify-between items-center border-t border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest italic opacity-80">Principal: {formatCurrency(amount)}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest italic opacity-80">Rate: {rate}%</span>
                                </div>
                            </Card>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Chart Visualizer */}
                                <Card className="bg-background/40 border-white/10 shadow-inner p-6 flex flex-col items-center">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6 self-start flex items-center gap-2">
                                        <Activity className="w-3 h-3" /> Amortization Geometry
                                    </h4>
                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={data}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={65}
                                                    outerRadius={85}
                                                    paddingAngle={8}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {data.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value: number | undefined) => [value !== undefined ? formatCurrency(value) : '', ""]}
                                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
                                                    itemStyle={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex gap-6 mt-4">
                                        {data.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                {/* Summary Stats */}
                                <div className="space-y-6 flex flex-col justify-center">
                                    {[
                                        { label: "Total Interest Burden", val: formatCurrency(totalInterest), icon: Percent, color: "text-orange-500", bg: "bg-orange-500/10" },
                                        { label: "Aggregate Payable Amount", val: formatCurrency(totalPayment), icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" }
                                    ].map((stat, i) => (
                                        <Card key={i} className="bg-background/40 border-white/5 p-6 relative group overflow-hidden">
                                            <div className={`absolute top-0 left-0 w-1 h-full ${stat.color.replace('text-', 'bg-')}`} />
                                            <div className="flex gap-4 items-center">
                                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">{stat.label}</p>
                                                    <h3 className="text-3xl font-black font-mono tracking-tighter">{stat.val}</h3>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}

                                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl flex items-center gap-4">
                                        <Sparkles className="w-5 h-5 text-yellow-500 shrink-0" />
                                        <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                                            <strong>Pro Tip:</strong> Increasing your monthly payment by just 10% can reduce your interest burden by thousands over the loan lifecycle.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <ContentSection
                title="Exact Amortization Intelligence & Debt Strategies"
                description="Understanding the structural mechanics of a loan is the first step toward financial liberation. Our Professional Loan Amortization tool provides high-fidelity insight into your debt lifecycle, breaking down principal vs. interest ratios with visual precision."
                features={[
                    "🧮 **Precision EMI Logic**: Calculate exact monthly installments using industry-standard amortization formulas.",
                    "📊 **Visual Debt Geometry**: Experience your loan breakdown through high-contrast radial analytics.",
                    "🎚️ **Reactive Modeling**: Use premium sliders to instantly simulate different financial scenarios and terms.",
                    "🔒 **Bank-Grade Privacy**: Your financial profile is processed strictly in your secure browser cache. No cloud storage.",
                    "⚡ **Real-time Delta tracking**: See how a 0.1% change in interest rate affects your total payable amount instantly.",
                    "✨ **Cinematic Liquid UI**: A professional-grade financial dashboard designed for clarity and elite productivity."
                ]}
                howToUse={[
                    "Configure your **Principal Loan Amount** using the slider or direct keyboard input.",
                    "Set the **Annual Interest Rate** based on your bank's current quote.",
                    "Adjust the **Loan Term Duration** (number of years) to match your repayment plan.",
                    "Analyze the **Calculated EMI** in the primary highlighted header card.",
                    "Review the **Amortization Geometry** chart to visualize the ratio of principal to total interest paid."
                ]}
                faq={[
                    {
                        question: "What is an Amortization Schedule?",
                        answer: "It is a table detailing each periodic payment on an amortizing loan. It shows the amount of principal and the amount of interest that make up each payment until the loan is paid off at the end of its term."
                    },
                    {
                        question: "How does the interest rate affect my total payment?",
                        answer: "Even a minor increase in the interest rate can significantly compound over long terms (like a 30-year mortgage), potentially adding tens of thousands of dollars to your total debt burden."
                    },
                    {
                        question: "Is this calculator suitable for mortgages?",
                        answer: "Yes. This tool uses the standard fixed-rate amortization formula used by most banks for personal loans, auto loans, and mortgages."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
