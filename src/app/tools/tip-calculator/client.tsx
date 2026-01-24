"use client"

import { useState } from "react"
import { Receipt, Users, Percent, CircleDollarSign, ShieldCheck, Sparkles, Coffee, Pizza, Wine, Utensils } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"

export default function TipCalculatorClient() {
    const [billAmount, setBillAmount] = useState<number>(0)
    const [tipPercentage, setTipPercentage] = useState<number>(15)
    const [numPeople, setNumPeople] = useState<number>(1)

    const tipAmount = billAmount * (tipPercentage / 100)
    const totalAmount = billAmount + tipAmount
    const perPerson = totalAmount / numPeople

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

    return (
        <ToolWrapper
            title="Tip Calculator & Bill Splitter"
            description="Quickly calculate tips and split the bill with friends. Simple, private, and precise."
            toolSlug="tip-calculator"
        >
            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Inputs Card */}
                <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Receipt className="w-32 h-32" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                            Bill Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8 relative z-10">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex justify-between items-center">
                                    <span>Total Bill Amount</span>
                                    <Utensils className="w-3.5 h-3.5 opacity-40" />
                                </Label>
                                <div className="relative">
                                    <CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="pl-10 h-14 text-2xl font-mono bg-background/40 border-white/10 focus:border-primary/50 transition-all rounded-2xl"
                                        value={billAmount || ""}
                                        onChange={(e) => setBillAmount(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tip Percentage: {tipPercentage}%</Label>
                                    <div className="flex gap-2">
                                        {[10, 15, 18, 20].map((pct) => (
                                            <Button
                                                key={pct}
                                                variant={tipPercentage === pct ? "default" : "outline"}
                                                size="sm"
                                                className="h-8 px-3 text-[10px] font-bold rounded-lg physical-tap"
                                                onClick={() => setTipPercentage(pct)}
                                            >
                                                {pct}%
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <Slider
                                    value={[tipPercentage]}
                                    onValueChange={v => setTipPercentage(v[0])}
                                    max={100}
                                    step={1}
                                    className="py-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex justify-between items-center">
                                    <span>Number of People: {numPeople}</span>
                                    <Users className="w-3.5 h-3.5 opacity-40" />
                                </Label>
                                <Slider
                                    value={[numPeople]}
                                    onValueChange={v => setNumPeople(Math.max(1, v[0]))}
                                    min={1}
                                    max={50}
                                    step={1}
                                    className="py-2"
                                />
                            </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3 animate-fade-in">
                            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                                Built for speed. This tool runs 100% on your device—perfect for splitting restaurant bills on the go.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Card */}
                <div className="space-y-6 flex flex-col justify-center">
                    <Card className="premium-card border-primary/20 bg-primary/5 shadow-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <CardContent className="p-8 space-y-10 relative z-10">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary italic">Result Breakdown</p>
                                <h3 className="text-xl font-bold">Split Calculation</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center group/row">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-background/20 rounded-lg group-hover/row:bg-primary/10 transition-colors">
                                            <Percent className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Total Tip</p>
                                            <p className="text-[10px] text-muted-foreground uppercase">{tipPercentage}% of {formatCurrency(billAmount)}</p>
                                        </div>
                                    </div>
                                    <p className="text-xl font-mono font-bold text-foreground">{formatCurrency(tipAmount)}</p>
                                </div>

                                <Separator className="bg-white/5" />

                                <div className="flex justify-between items-center group/row">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-background/20 rounded-lg group-hover/row:bg-primary/10 transition-colors">
                                            <CircleDollarSign className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Total Bill</p>
                                            <p className="text-[10px] text-muted-foreground uppercase">Inc. Tip</p>
                                        </div>
                                    </div>
                                    <p className="text-xl font-mono font-bold text-foreground">{formatCurrency(totalAmount)}</p>
                                </div>

                                <div className="pt-6 border-t border-primary/20 scale-110 origin-right transition-transform group-hover:scale-[1.15]">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/30">
                                                <Users className="w-6 h-6 text-primary-foreground" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-primary italic">Per Person</p>
                                                <p className="text-sm font-medium text-muted-foreground">Split among {numPeople}</p>
                                            </div>
                                        </div>
                                        <p className="text-4xl font-black tracking-tighter text-primary font-mono">{formatCurrency(perPerson)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-background/20 border border-white/5 rounded-2xl flex flex-col items-center gap-2 hover:bg-background/40 hover:border-primary/20 transition-all cursor-default">
                            <Coffee className="w-5 h-5 text-muted-foreground opacity-50" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cafe Visit</span>
                        </div>
                        <div className="p-4 bg-background/20 border border-white/5 rounded-2xl flex flex-col items-center gap-2 hover:bg-background/40 hover:border-primary/20 transition-all cursor-default">
                            <Pizza className="w-5 h-5 text-muted-foreground opacity-50" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Dinner Out</span>
                        </div>
                    </div>
                </div>
            </div>

            <ContentSection
                title="Smarter Ways to Split"
                description={`Tipping should be easy, not a mental math workout at the end of a great meal. Our Tip Calculator is designed for speed, accuracy, and aesthetics, making it the perfect companion for restaurant visits, bar hops, and group dining.\n\nBuilt for mobile-first usage, this tool ensures you get the math right instantly, including fair splitting for large groups. And since it runs 100% locally, your spending habits stay private.`}
                features={[
                    "💸 **Instant Calculations**: Results update in real-time as you slide or type.",
                    "👥 **Easy Splitting**: Divide the total among up to 50 people with one swipe.",
                    "📊 **Tip Presets**: One-tap buttons for 10%, 15%, 18%, and 20% for common service standards.",
                    "🎨 **Liquid UI Design**: A stunning, high-contrast interface designed for dimly lit restaurants and bars.",
                    "🔒 **Zero Tracking**: We don't save your bill amounts or splitting habits. 100% private.",
                    "📱 **Mobile Precision**: Large touch targets for quick input on smartphones."
                ]}
                howToUse={[
                    "Input the **Total Bill Amount** from your receipt.",
                    "Adjust the **Tip Percentage** using the quick-sets or the fine-tune slider.",
                    "Slide the **Number of People** to reflect your party size.",
                    "Instantly see the **Per Person** amount in the high-impact results card.",
                    "Check the breakdown to see the total tip and total bill included."
                ]}
                faq={[
                    {
                        question: "What is a standard tip amount?",
                        answer: "While it varies by country, in the US, 15-20% is standard for good service. For exceptional service, many diners go up to 25%."
                    },
                    {
                        question: "Does it work for large groups?",
                        answer: "Yes! You can split the bill among up to 50 people. The math remains precise even for the most crowded tables."
                    },
                    {
                        question: "Why use this instead of a phone calculator?",
                        answer: "Standard phone calculators require multiple steps for tips and splits. Our tool combines everything into one visual dashboard, saving you time and avoiding errors."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
