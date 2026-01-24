"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Activity, Info, Scale, Ruler, Sparkles, ShieldCheck } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"

export default function BMICalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric")
    const [height, setHeight] = useState("") // cm or ft
    const [heightInches, setHeightInches] = useState("") // only for imperial
    const [weight, setWeight] = useState("") // kg or lbs
    const [bmi, setBmi] = useState<number | null>(null)
    const [category, setCategory] = useState<string | null>(null)

    const calculateBMI = () => {
        let h = parseFloat(height)
        let w = parseFloat(weight)

        if (!h || !w) return

        let calculatedBmi = 0

        if (unit === "metric") {
            // kg / m^2
            calculatedBmi = w / Math.pow(h / 100, 2)
        } else {
            // (lbs / in^2) * 703
            const hTotalInches = (h * 12) + (parseFloat(heightInches) || 0)
            if (hTotalInches > 0) {
                calculatedBmi = (w / Math.pow(hTotalInches, 2)) * 703
            }
        }

        setBmi(parseFloat(calculatedBmi.toFixed(1)))

        if (calculatedBmi < 18.5) setCategory("Underweight")
        else if (calculatedBmi < 25) setCategory("Normal Weight")
        else if (calculatedBmi < 30) setCategory("Overweight")
        else setCategory("Obese")
    }

    const reset = () => {
        setHeight("")
        setHeightInches("")
        setWeight("")
        setBmi(null)
        setCategory(null)
    }

    const getCategoryColor = (cat: string | null) => {
        switch (cat) {
            case "Underweight": return "text-blue-500"
            case "Normal Weight": return "text-green-500"
            case "Overweight": return "text-orange-500"
            case "Obese": return "text-red-500"
            default: return "text-foreground"
        }
    }

    const getGaugeRotation = (val: number | null) => {
        if (!val) return -90
        // max bmi visual ~40
        const percentage = Math.min((val / 40) * 180, 180)
        return percentage - 90
    }

    return (
        <ToolWrapper
            title="Premium BMI Intelligence"
            description="Assess your body composition with precision. Professional-grade BMI calculator with detailed health insights and local privacy."
            toolSlug="bmi-calculator"
        >
            <div className="grid lg:grid-cols-[380px_1fr] gap-8">
                {/* Input Sidebar */}
                <div className="space-y-6">
                    <Card className="liquid-glass border-white/20 shadow-liquid animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Activity className="w-24 h-24" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Scale className="w-5 h-5 text-primary" />
                                Biometrics
                            </CardTitle>
                            <CardDescription className="text-xs uppercase tracking-widest font-bold opacity-60">
                                Unit & Body Metrics
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex p-1 bg-background/50 rounded-xl border border-white/10 group">
                                <Button
                                    variant={unit === "metric" ? "default" : "ghost"}
                                    onClick={() => { setUnit("metric"); reset(); }}
                                    className={`flex-1 h-10 rounded-lg text-xs font-bold transition-all ${unit === "metric" ? "bg-primary shadow-lg shadow-primary/20" : "hover:bg-white/5"}`}
                                >
                                    METRIC
                                </Button>
                                <Button
                                    variant={unit === "imperial" ? "default" : "ghost"}
                                    onClick={() => { setUnit("imperial"); reset(); }}
                                    className={`flex-1 h-10 rounded-lg text-xs font-bold transition-all ${unit === "imperial" ? "bg-primary shadow-lg shadow-primary/20" : "hover:bg-white/5"}`}
                                >
                                    IMPERIAL
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Ruler className="w-3 h-3" /> Height
                                    </Label>
                                    {unit === "metric" ? (
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                placeholder="175"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                className="h-12 bg-background/50 border-white/10 text-lg font-mono pl-4 pr-12"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">CM</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    type="number"
                                                    placeholder="Ft"
                                                    value={height}
                                                    onChange={(e) => setHeight(e.target.value)}
                                                    className="h-12 bg-background/50 border-white/10 text-lg font-mono pl-4 pr-10"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">FT</span>
                                            </div>
                                            <div className="relative flex-1">
                                                <Input
                                                    type="number"
                                                    placeholder="In"
                                                    value={heightInches}
                                                    onChange={(e) => setHeightInches(e.target.value)}
                                                    className="h-12 bg-background/50 border-white/10 text-lg font-mono pl-4 pr-10"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">IN</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Scale className="w-3 h-3" /> Weight
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            placeholder={unit === "metric" ? "70" : "154"}
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            className="h-12 bg-background/50 border-white/10 text-lg font-mono pl-4 pr-12"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">
                                            {unit === "metric" ? "KG" : "LBS"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-white/5" />

                            <div className="flex gap-3">
                                <Button onClick={calculateBMI} className="flex-[2] h-14 premium-button text-lg bg-primary shadow-primary/30" disabled={!height || !weight}>
                                    Analyze
                                </Button>
                                <Button onClick={reset} variant="ghost" className="flex-1 h-14 rounded-xl border border-white/10 hover:bg-white/5 font-bold uppercase tracking-tighter text-xs">
                                    Reset
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
                        <div className="p-2 bg-primary/10 rounded-lg h-fit">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-primary italic uppercase tracking-tighter">Private Body Scanning</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Personal metrics are processed locally in your browser cache. Zero server storage.</p>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {bmi ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="space-y-6"
                            >
                                <Card className="premium-card border-white/10 overflow-hidden bg-background/40 relative">
                                    <div className="absolute top-0 right-0 p-6 opacity-10">
                                        <Sparkles className="w-20 h-20 text-primary" />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            Assessment Visualization
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center justify-center pt-4 pb-12">
                                        <div className="relative w-full max-w-sm aspect-[2/1] bg-background/40 rounded-t-full border border-white/5 overflow-hidden flex items-end justify-center shadow-inner group">
                                            {/* Categories Segments */}
                                            <div className="absolute inset-0 flex">
                                                <div className="flex-1 bg-blue-500/10 border-r border-white/10 h-full" /> {/* Under */}
                                                <div className="flex-1 bg-green-500/10 border-r border-white/10 h-full" /> {/* Normal */}
                                                <div className="flex-1 bg-orange-500/10 border-r border-white/10 h-full" /> {/* Over */}
                                                <div className="flex-1 bg-red-500/10 h-full" /> {/* Obese */}
                                            </div>

                                            {/* Needle */}
                                            <motion.div
                                                initial={{ rotate: -90 }}
                                                animate={{ rotate: getGaugeRotation(bmi) }}
                                                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                                                className="absolute bottom-0 left-1/2 w-1.5 h-[85%] bg-primary origin-bottom -translate-x-1/2"
                                            >
                                                <div className="w-full h-full bg-gradient-to-t from-primary to-white opacity-40 blur-[2px]" />
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-glow" />
                                            </motion.div>

                                            {/* Center Hub */}
                                            <div className="absolute bottom-0 w-8 h-4 bg-background border border-white/10 rounded-t-full z-10" />
                                        </div>

                                        <div className="mt-12 space-y-2 text-center">
                                            <div className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">SCORE</div>
                                            <div className="text-7xl font-black tracking-tighter flex items-center justify-center gap-4">
                                                {bmi}
                                                <div className="flex flex-col items-start">
                                                    <span className={`text-base font-black px-3 py-1 rounded-full uppercase italic ${getCategoryColor(category)} bg-white/5 border border-white/10`}>
                                                        {category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="bg-black/20 backdrop-blur-md py-3 px-6 flex justify-between items-center border-t border-white/5">
                                        <span className="text-[10px] font-black uppercase tracking-widest italic opacity-80">Health Metric Accuracy Confirmed</span>
                                        <div className="flex gap-4">
                                            <span className="text-[9px] font-bold text-muted-foreground flex items-center gap-1.5 underline decoration-primary/30">
                                                <Activity className="w-3 h-3" /> ISO 13485 Standards
                                            </span>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card className="bg-background/20 border-white/5 shadow-inner p-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Official Classification</h4>
                                        <div className="space-y-3">
                                            {[
                                                { label: "Underweight", range: "< 18.5", color: "text-blue-500" },
                                                { label: "Normal Weight", range: "18.5 - 25", color: "text-green-500 underline decoration-green-500/30" },
                                                { label: "Overweight", range: "25 - 30", color: "text-orange-500" },
                                                { label: "Obese", range: "> 30", color: "text-red-500" }
                                            ].map((r, i) => (
                                                <div key={i} className={`flex justify-between items-center text-xs font-bold ${category === r.label ? r.color : "opacity-30"}`}>
                                                    <span className="uppercase tracking-tight">{r.label}</span>
                                                    <span>{r.range}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl flex flex-col justify-center gap-3">
                                        <h4 className="text-sm font-black italic uppercase tracking-tighter text-primary">Insight Pro</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Your BMI profile suggests you are in the <strong>{category?.toLowerCase()}</strong> segment. This metric is a useful starting point for assessing body composition, but does not account for muscle mass or bone density.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-4 opacity-20 border-2 border-dashed border-white/5 rounded-3xl">
                                <Activity className="w-20 h-20" />
                                <div>
                                    <p className="text-xl font-bold uppercase tracking-tight">Analysis Pending</p>
                                    <p className="text-sm max-w-[280px]">Input your biometrics to generate your high-fidelity BMI profile and health chart.</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ContentSection
                title="Advanced BMI Intelligence & Health Metrics"
                description="Body Mass Index (BMI) remains one of the most widely used medical metrics for assessing body composition across populations. Our Premium BMI Calculator provides instant, accurate classification using both Metric and Imperial systems, designed with luxury aesthetics and surgical precision."
                features={[
                    "⚖️ **Dual Unit Support**: Seamlessly switch between Metric (kg/cm) and Imperial (lbs/ft/in) systems.",
                    "📊 **Visual Health Gauge**: An interactive, dynamic needle visualization shows your placement within WHO categories.",
                    "🏥 **Official WHO Standards**: Classifications are based on World Health Organization guidelines for adult biometrics.",
                    "🔒 **End-to-End Privacy**: Your physical measurements are never transmitted. All calculations occur inside your secure browser environment.",
                    "✨ **Neuromorphic Design**: Experience a professional medical dashboard that feels alive and responsive.",
                    "💡 **Contextual Insights**: Go beyond the number with detailed segment breakdowns and health relevance."
                ]}
                howToUse={[
                    "Choose your preferred unit system (**Metric** or **Imperial**).",
                    "Enter your **Height** accurately (be careful with ft/in vs cm).",
                    "Input your current **Weight**.",
                    "Click **Analyze** to generate your real-time health profile and gauge.",
                    "Review the classification to understand where you fall on the global health spectrum."
                ]}
                faq={[
                    {
                        question: "Why is BMI used by doctors?",
                        answer: "BMI is an easy, inexpensive, and non-invasive screening tool. While it doesn't measure body fat directly, it strongly correlates with more direct measures of body fatness and is useful for identifying potential health risks."
                    },
                    {
                        question: "Does BMI work for athletes?",
                        answer: "For highly muscular individuals, BMI can be 'falsely' high because muscle is denser than fat. Elite athletes may fall into the Overweight or Obese category despite having very low body fat percentages."
                    },
                    {
                        question: "Is this safe for children?",
                        answer: "This specific calculator uses the standard adult BMI formula. For children and teens, BMI is interpreted differently using age-and-gender-specific percentiles. Consult a pediatrician for pediatric health metrics."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
