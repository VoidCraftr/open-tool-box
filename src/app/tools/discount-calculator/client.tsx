"use client"

import { useState } from "react"
import { CircleDollarSign, Tag, Percent, Sparkles, ShieldCheck, ShoppingBag, ArrowDown, TrendingDown, Info, ShoppingCart } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ContentSection } from "@/components/tools/ContentSection"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"

export default function DiscountCalculatorClient() {
    const [originalPrice, setOriginalPrice] = useState<number>(0)
    const [discountPercentage, setDiscountPercentage] = useState<number>(20)
    const [taxPercentage, setTaxPercentage] = useState<number>(0)

    const discountAmount = originalPrice * (discountPercentage / 100)
    const priceAfterDiscount = originalPrice - discountAmount
    const taxAmount = priceAfterDiscount * (taxPercentage / 100)
    const finalPrice = priceAfterDiscount + taxAmount

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

    return (
        <ToolWrapper
            title="Discount Calculator"
            description="Find the savings instantly. Calculate final prices after discounts and sales taxes securely."
            toolSlug="discount-calculator"
        >
            <div className="grid lg:grid-cols-[400px_1fr] gap-8 max-w-5xl mx-auto">
                {/* Inputs Area */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Tag className="w-24 h-24" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                                Sales Price
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 p-6 relative z-10">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Original Price</Label>
                                <div className="relative">
                                    <CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="pl-9 h-12 bg-background/50 border-white/10 text-xl font-bold"
                                        value={originalPrice || ""}
                                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Discount ({discountPercentage}%)</Label>
                                    <div className="flex gap-1.5">
                                        {[10, 20, 30, 50].map(d => (
                                            <Button
                                                key={d}
                                                variant={discountPercentage === d ? "default" : "outline"}
                                                size="sm"
                                                className="h-7 px-2 text-[10px] font-bold rounded-md physical-tap"
                                                onClick={() => setDiscountPercentage(d)}
                                            >
                                                {d}%
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <Slider
                                    value={[discountPercentage]}
                                    onValueChange={v => setDiscountPercentage(v[0])}
                                    max={100}
                                    step={1}
                                    className="py-2"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sales Tax ({taxPercentage}%)</Label>
                                    <Input
                                        type="number"
                                        className="w-20 h-7 text-[10px] font-bold bg-background/50 border-white/10 text-center"
                                        value={taxPercentage}
                                        onChange={e => setTaxPercentage(Number(e.target.value))}
                                    />
                                </div>
                                <Slider
                                    value={[taxPercentage]}
                                    onValueChange={v => setTaxPercentage(v[0])}
                                    max={25}
                                    step={0.1}
                                    className="py-2"
                                />
                            </div>

                            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
                                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                                    Local processing ensures your shopping habits and price searches stay 100% private.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Area */}
                <div className="space-y-6">
                    <Card className="premium-card border-none bg-gradient-to-br from-primary/10 via-background to-secondary/5 shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600" />

                        <CardContent className="p-8 space-y-10 relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-primary italic italic">Discount Report</h3>
                                    <p className="text-muted-foreground text-xs uppercase tracking-tighter">Instant Price Breakdown</p>
                                </div>
                                <div className="p-3 bg-primary/10 rounded-2xl animate-liquid-pulse">
                                    <ShoppingCart className="w-6 h-6 text-primary" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">You Save</p>
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-3xl font-black text-green-500 tracking-tighter font-mono">{formatCurrency(discountAmount)}</p>
                                            <div className="flex items-center text-[11px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                                                <ArrowDown className="w-3 h-3 mr-1" />
                                                {discountPercentage}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">Sales Tax</p>
                                        <p className="text-xl font-bold font-mono opacity-60">{formatCurrency(taxAmount)}</p>
                                    </div>
                                </div>

                                <div className="bg-background/40 p-6 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-center items-center gap-2 group/final shadow-inner">
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/final:opacity-100 transition-opacity" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary italic">Final Price</p>
                                    <p className="text-5xl font-black tracking-tighter text-foreground font-mono transition-transform duration-500 group-hover/final:scale-110">
                                        {formatCurrency(finalPrice)}
                                    </p>
                                    <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                        <TrendingDown className="w-3 h-3 text-primary" />
                                        <span>Value Optimized</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <Card className="bg-background/20 border-white/5 p-4 flex items-center gap-4 hover:border-primary/20 transition-all cursor-default group">
                            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                <ShoppingBag className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-tighter">Retail Ready</p>
                                <p className="text-[10px] text-muted-foreground">Perfect for holiday sales & outlets.</p>
                            </div>
                        </Card>
                        <Card className="bg-background/20 border-white/5 p-4 flex items-center gap-4 hover:border-primary/20 transition-all cursor-default group">
                            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                                <Info className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-tighter">Tax Inclusive</p>
                                <p className="text-[10px] text-muted-foreground">Check tax impacts instantly.</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <ContentSection
                title="Smart Shopping, Zero Regrets"
                description={`Ever been at a store and struggled to figure out how much something actually costs after the '30% off' sign and local sales tax? Our Discount Calculator removes the guesswork instantly.\n\nDesigned for real-world shopping, this tool provides a high-fidelity breakdown of your savings while ensuring that no one—not even us—knows what you're buying or how much you're spending. It's the ultimate ad-free, private companion for your next shopping trip.`}
                features={[
                    "🛍️ **Instant Sales Math**: Get your final price in real-time as you slide or type.",
                    "💸 **Savings Highlight**: See exactly how much money is staying in your pocket.",
                    "📊 **Sales Tax Integration**: Add local tax percentages to find the true out-of-pocket cost.",
                    "🎨 **Liquid UI Aesthetics**: A professional, high-contrast dashboard with smooth animations.",
                    "🔒 **100% Client-Side**: Your shopping data never leaves your device. No cloud, no cookies.",
                    "✨ **Quick-Sets**: One-tap buttons for standard 10%, 20%, 30%, and 50% clearance sales."
                ]}
                howToUse={[
                    "Input the **Original Price** of the item as shown on the tag.",
                    "Use the **Discount Percentage** slider to set the advertised sale amount.",
                    "Enter your local **Sales Tax** percentage if you want to include it in the total.",
                    "Check the **Final Price** card for the ultimate, tax-inclusive result.",
                    "Review the **Savings Report** to see your total discount in dollars."
                ]}
                faq={[
                    {
                        question: "How do I calculate 'Buy One Get One' (BOGO)?",
                        answer: "For 'Buy One Get One 50% Off', treat it as a 25% discount on the total price of two items. For 'BOGO Free', it's a 50% discount on the total."
                    },
                    {
                        question: "Does it work with negative values?",
                        answer: "The tool is optimized for retail shopping, so it expects positive price inputs. Entering negative numbers may result in '0' or errors to ensure logical consistency."
                    },
                    {
                        question: "Why should I use this over a phone calculator?",
                        answer: "Phone calculators require a multi-step formula (Price * (1 - Discount/100)). Our tool visualizes the savings and integrates tax into a single visual dashboard, preventing errors."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
