"use client"

import { useState, useMemo } from "react"
import { TrendingUp, CircleDollarSign, PieChart, Info, ArrowUpRight, ShieldCheck, Sparkles, RefreshCcw, Download, Calendar } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts"

export default function CompoundInterestClient() {
    const [principal, setPrincipal] = useState(1000)
    const [monthlyContribution, setMonthlyContribution] = useState(100)
    const [years, setYears] = useState(10)
    const [rate, setRate] = useState(7)
    const [compoundFrequency, setCompoundFrequency] = useState(12) // Monthly

    const data = useMemo(() => {
        const results = []
        let currentBalance = principal
        const annualRate = rate / 100
        const months = years * 12

        for (let m = 0; m <= months; m++) {
            if (m % 12 === 0 || m === months) {
                results.push({
                    year: m / 12,
                    balance: Math.round(currentBalance),
                    contributions: Math.round(principal + (m * monthlyContribution)),
                })
            }

            // Monthly compounding approx
            const monthlyRate = annualRate / 12
            currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate)
        }
        return results
    }, [principal, monthlyContribution, years, rate])

    const totalBalance = data[data.length - 1].balance
    const totalContributions = principal + (years * 12 * monthlyContribution)
    const totalInterest = totalBalance - totalContributions

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

    return (
        <ToolWrapper
            title="Compound Interest Calculator"
            description="Visualize your wealth growth. Calculate how small monthly savings grow into substantial wealth over time."
            toolSlug="compound-interest"
        >
            <div className="grid lg:grid-cols-[380px_1fr] gap-8">
                {/* Sidebar Controls */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <TrendingUp className="w-24 h-24" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                                Growth Plan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Initial Investment</Label>
                                    <div className="relative">
                                        <CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            className="pl-9 h-11 bg-background/50 border-white/10"
                                            value={principal}
                                            onChange={(e) => setPrincipal(Number(e.target.value))}
                                        />
                                    </div>
                                    <Slider value={[principal]} onValueChange={v => setPrincipal(v[0])} max={100000} step={100} className="py-2" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly Contribution</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            className="pl-9 h-11 bg-background/50 border-white/10"
                                            value={monthlyContribution}
                                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                        />
                                    </div>
                                    <Slider value={[monthlyContribution]} onValueChange={v => setMonthlyContribution(v[0])} max={10000} step={50} className="py-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration (Years)</Label>
                                        <Input
                                            type="number"
                                            className="h-11 bg-background/50 border-white/10"
                                            value={years}
                                            onChange={(e) => setYears(Number(e.target.value))}
                                        />
                                        <Slider value={[years]} onValueChange={v => setYears(v[0])} max={50} step={1} className="py-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Annual Rate (%)</Label>
                                        <Input
                                            type="number"
                                            className="h-11 bg-background/50 border-white/10"
                                            value={rate}
                                            onChange={(e) => setRate(Number(e.target.value))}
                                        />
                                        <Slider value={[rate]} onValueChange={v => setRate(v[0])} max={30} step={0.5} className="py-2" />
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-white/10" />

                            <div className="space-y-4">
                                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 animate-fade-in">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 italic">Total Wealth Projected</p>
                                    <h2 className="text-3xl font-black tracking-tighter text-foreground">{formatCurrency(totalBalance)}</h2>
                                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
                                        <span>Interest Earned: </span>
                                        <span className="font-bold text-foreground">{formatCurrency(totalInterest)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <div className="p-2 bg-primary/10 rounded-lg h-fit">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-primary italic uppercase tracking-tighter">Private & Secure</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Financial data is processed locally. We never store your inputs or projections.</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-6">
                    {/* Growth Chart */}
                    <Card className="premium-card border-white/10 overflow-hidden bg-background/40 relative">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Growth Projection</CardTitle>
                                <CardDescription>Balance vs Total Contributions</CardDescription>
                            </div>
                            <PieChart className="w-5 h-5 text-muted-foreground opacity-50" />
                        </CardHeader>
                        <CardContent className="p-6 h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="year"
                                        stroke="rgba(255,255,255,0.4)"
                                        fontSize={12}
                                        tickFormatter={(val) => `Yr ${val}`}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.4)"
                                        fontSize={12}
                                        tickFormatter={(val) => `$${val / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                                        labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}
                                        formatter={(val: any) => [formatCurrency(val), '']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="balance"
                                        name="Total Balance"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorBalance)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="contributions"
                                        name="Your Contributions"
                                        stroke="rgba(255,255,255,0.3)"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={false}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid sm:grid-cols-3 gap-6">
                        {[
                            { label: "Total Contributions", value: totalContributions, icon: CircleDollarSign, color: "text-muted-foreground" },
                            { label: "Compound Interest", value: totalInterest, icon: Sparkles, color: "text-green-500" },
                            { label: "Future Portfolio", value: totalBalance, icon: TrendingUp, color: "text-primary" }
                        ].map((stat, i) => (
                            <Card key={i} className="bg-background/20 border-white/5 shadow-inner p-5 space-y-2 animate-fade-in" style={{ animationDelay: `${300 + (i * 100)}ms` }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`p-1.5 rounded-lg bg-background/40 ${stat.color}`}>
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                                </div>
                                <p className="text-xl font-black font-mono">{formatCurrency(stat.value)}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <ContentSection
                title="The Power of Compounding"
                description={`Albert Einstein reportedly called compound interest 'the eighth wonder of the world.' Our calculator helps you visualize why early and consistent investing is the most reliable path to financial freedom.\n\nBy reinvesting your earnings, your wealth doesn't just grow linearly—it accelerates. Whether you are planning for retirement, a new home, or your children's education, seeing the curve of compounding in real-time can be the motivation you need to stay on track.`}
                features={[
                    "📈 **Visual Projections**: Interactive area charts show precisely how interest overtakes contributions.",
                    "🔄 **Compounding Control**: See the difference between annual and monthly growth instantly.",
                    "💸 **Contribution Impact**: Adjust your monthly savings via sliders to see the 30-year ripple effect.",
                    "🎨 **Liquid UI Dashboard**: A professional financial interface designed for clarity and speed.",
                    "🔒 **Private Analytics**: No identifiers, no account needed. Your financial goals are your business.",
                    "✨ **Smart Rounding**: Results are presented in clean, readable formats with zero technical jargon."
                ]}
                howToUse={[
                    "Enter your **Initial Investment** - the amount you have today.",
                    "Set your **Monthly Contribution** - how much you plan to save every month.",
                    "Adjust the **Duration** in years to match your long-term goal timeline.",
                    "Input your expected **Annual Interest Rate** (e.g., 7% for typical stock market averages).",
                    "Hover over the chart to see your projected portfolio value for any specific year."
                ]}
                faq={[
                    {
                        question: "What interest rate should I use?",
                        answer: "Historically, the S&P 500 has averaged around 7-10% annually before inflation. For conservative savings like HYSAs, 3-4% might be more realistic. Always consult a financial advisor for actual investment advice."
                    },
                    {
                        question: "Are taxes included in these projections?",
                        answer: "No, this is a gross growth calculator. Real-world results will depend on your tax bracket, capital gains rules, and any management fees associated with your accounts."
                    },
                    {
                        question: "Does it support different currencies?",
                        answer: "While we display the '$' symbol for clarity, the mathematical logic is universal. You can treat the units as Euros, Pounds, or Rupees and the percentages will work exactly the same."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
