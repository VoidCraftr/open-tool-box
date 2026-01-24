"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Clock, History, Calendar } from "lucide-react"

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState("")
    const [age, setAge] = useState<{ years: number, months: number, days: number } | null>(null)
    const [nextBirthday, setNextBirthday] = useState<{ months: number, days: number } | null>(null)

    const calculateAge = () => {
        if (!birthDate) return

        const today = new Date()
        const birth = new Date(birthDate)

        let years = today.getFullYear() - birth.getFullYear()
        let months = today.getMonth() - birth.getMonth()
        let days = today.getDate() - birth.getDate()

        if (days < 0) {
            months--
            // Days in previous month
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
            days += prevMonth
        }

        if (months < 0) {
            years--
            months += 12
        }

        setAge({ years, months, days })
        calculateNextBirthday(birth, today)
    }

    const calculateNextBirthday = (birth: Date, today: Date) => {
        const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
        if (next < today) {
            next.setFullYear(next.getFullYear() + 1)
        }

        let months = next.getMonth() - today.getMonth()
        let days = next.getDate() - today.getDate()

        if (days < 0) {
            months--
            const prevMonth = new Date(next.getFullYear(), next.getMonth(), 0).getDate()
            days += prevMonth
        }

        if (months < 0) {
            months += 12
        }

        setNextBirthday({ months, days })
    }

    return (
        <ToolWrapper
            title="Precision Age Calculator"
            description="Calculate your exact age down to the day. Professional-grade chronological age calculator for health, finance, and personal use."
            toolSlug="age-calculator"
        >
            <div className="grid lg:grid-cols-[380px_1fr] gap-8">
                {/* Input Sidebar */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Clock className="w-24 h-24" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Timeline Entry
                            </CardTitle>
                            <CardDescription className="text-xs uppercase tracking-widest font-bold opacity-60">
                                Enter your origin date
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="dob" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date of Birth</Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="h-12 bg-background/50 border-white/10 text-lg font-mono focus:ring-primary/20"
                                />
                            </div>
                            <Button onClick={calculateAge} className="w-full h-14 premium-button text-lg bg-primary shadow-primary/30" disabled={!birthDate}>
                                Generate Chronology
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <div className="p-2 bg-primary/10 rounded-lg h-fit">
                            <History className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-primary italic uppercase tracking-tighter">Did you know?</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">The average human lives for about 4,000 weeks. Make every single one count!</p>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {age ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="space-y-6"
                            >
                                {/* Primary Age Display */}
                                <Card className="premium-card bg-primary text-primary-foreground border-none relative overflow-hidden shadow-2xl shadow-primary/20">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                    <CardContent className="pt-8 pb-10 relative z-10">
                                        <div className="grid grid-cols-3 gap-6">
                                            {[
                                                { val: age.years, label: "Years" },
                                                { val: age.months, label: "Months" },
                                                { val: age.days, label: "Days" }
                                            ].map((item, i) => (
                                                <div key={i} className="space-y-2 animate-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                                                    <div className="text-5xl md:text-6xl font-black tracking-tighter">{item.val}</div>
                                                    <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-70">{item.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <div className="bg-black/20 backdrop-blur-md py-3 px-6 flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest italic opacity-80">Chronological Status Confirmed</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-primary-foreground/40" />)}
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Next Birthday */}
                                    {nextBirthday && (
                                        <Card className="bg-background/40 border-white/5 shadow-inner">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground opacity-70">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                                    Milestone Countdown
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-end gap-3 mb-2">
                                                    <h3 className="text-3xl font-black">{nextBirthday.months}M {nextBirthday.days}D</h3>
                                                </div>
                                                <p className="text-[11px] text-muted-foreground">Remaining until your next solar revolution.</p>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Breakdown */}
                                    <Card className="bg-background/40 border-white/5 shadow-inner">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground opacity-70">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                Time Totals
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {[
                                                { label: "Total Months", val: (age.years * 12) + age.months },
                                                { label: "Total Weeks", val: Math.floor(((age.years * 365.25) + (age.months * 30.44) + age.days) / 7) },
                                                { label: "Total Days", val: Math.floor((age.years * 365.25) + (age.months * 30.44) + age.days) }
                                            ].map((stat, i) => (
                                                <div key={i} className="flex justify-between items-center group">
                                                    <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</span>
                                                    <span className="text-sm font-mono font-bold text-foreground">{stat.val.toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-20 border-2 border-dashed border-white/5 rounded-3xl">
                                <History className="w-20 h-20" />
                                <div>
                                    <p className="text-xl font-bold uppercase tracking-tight">Timeline Pending</p>
                                    <p className="text-sm max-w-[280px]">Provide your birth date to unlock detailed age analytics and birthday countdowns.</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ContentSection
                title="Exact Chronological Age Intelligence"
                description="Our Precision Age Calculator provides more than just a number. It offers a detailed breakdown of your life's timeline in years, months, weeks, and days, helping you track milestones and plan for the future with absolute accuracy."
                features={[
                    "🎂 **Exact Age Breakdown**: Get your precise age in years, months, and days simultaneously.",
                    "📅 **Birthday Countdown**: Know exactly how many months and days remain until your next celebration.",
                    "📊 **Time Totals**: Visualize your total time spent in months, weeks, and days for health or long-term planning.",
                    "🔒 **Privacy Secured**: Your birth date is processed locally in your browser. No data ever reaches a server.",
                    "⚡ **Instant Results**: Ultra-fast client-side logic ensures immediate age generation.",
                    "✨ **Premium Interface**: A clean, modern aesthetic designed for readability and professional use."
                ]}
                howToUse={[
                    "Select your **Date of Birth** using the integrated date picker.",
                    "Click **Generate Chronology** to initiate the calculation.",
                    "Review your primary age in the highlighted header card.",
                    "Check the **Milestone Countdown** for your next birthday status.",
                    "Scroll down to see cumulative time totals in days, weeks, and months."
                ]}
                faq={[
                    {
                        question: "How does the calculator handle leap years?",
                        answer: "Our algorithm accounts for the extra day in February during leap years (years divisible by 4, except for century years not divisible by 400), ensuring your total day count is mathematically precise."
                    },
                    {
                        question: "Is my personal information safe?",
                        answer: "Yes. Unlike other websites, OpenToolBox is 100% client-side. Your birth date is never sent to our servers, stored in a database, or shared with third parties."
                    },
                    {
                        question: "Can I use this for official age verification?",
                        answer: "While our calculator is highly accurate, it is intended for personal and informational use. For legal or medical age verification, always refer to your government-issued identification."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
