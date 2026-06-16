"use client"

import { useState } from "react"
import { Coffee, Heart, Sparkles, Trophy, Zap } from "lucide-react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SupportPage() {
    const [coffees, setCoffees] = useState(0)
    const [level, setLevel] = useState(1)
    const [xp, setXp] = useState(0)

    const levelUpXp = level * 10

    const handleBrew = () => {
        setCoffees(c => c + 1)

        const newXp = xp + 1
        if (newXp >= levelUpXp) {
            setLevel(l => l + 1)
            setXp(0)
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#f97316', '#fb923c', '#fdba74'] // Orange theme
            })
        } else {
            setXp(newXp)
        }

        // Small haptic if available
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(10)
        }
    }

    return (
        <div className="container max-w-4xl py-12 px-4 space-y-16 mx-auto">

            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-2xl mx-auto">
                <Badge variant="secondary" className="mb-4">Community Supported</Badge>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent pb-2">
                    Fuel the Code.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    OpenToolbox is 100% free and open source. We don&apos;t sell data, we don&apos;t run ads, and we don&apos;t track you.
                    If these tools saved you time today, consider buying us a coffee.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <a href="https://buymeacoffee.com/voidcraftr" target="_blank" rel="noreferrer">
                        <Button size="lg" className="bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 font-bold px-8 h-12 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <Coffee className="mr-2 h-5 w-5" />
                            Buy us a Coffee
                        </Button>
                    </a>
                </div>
            </div>

            {/* Coffee Clicker Mini Game */}
            <div className="w-full max-w-sm mx-auto">
                <Card className="border-2 border-orange-100 dark:border-orange-900/30 bg-gradient-to-b from-orange-50/50 to-background dark:from-orange-950/10 dark:to-background overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-muted">
                        <motion.div
                            className="h-full bg-orange-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(xp / levelUpXp) * 100}%` }}
                        />
                    </div>

                    <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Dev Energy Level</h3>
                            <div className="text-4xl font-black font-mono flex items-center gap-2 justify-center">
                                <Zap className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                                <span>Lvl {level}</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleBrew}
                            className="relative group cursor-pointer outline-none"
                        >
                            <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full group-hover:bg-orange-500/30 transition-all opacity-0 group-hover:opacity-100" />
                            <div className="relative bg-white dark:bg-zinc-900 rounded-full p-6 shadow-2xl border-4 border-orange-100 dark:border-orange-900/40">
                                <Coffee className="h-16 w-16 text-orange-600 dark:text-orange-400" />
                            </div>
                        </motion.button>

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground font-medium">
                                {coffees === 0 ? "Click to brew virtual coffee!" : `You brewed ${coffees} cups!`}
                            </p>
                            <p className="text-xs text-muted-foreground/60 max-w-[200px] mx-auto">
                                Every click helps a virtual developer fix a bug.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Why Support Grid */}
            <div className="grid md:grid-cols-3 gap-8 text-center pt-8 border-t">
                <div className="space-y-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
                        <Heart className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold">Open Source</h3>
                    <p className="text-sm text-muted-foreground px-4">
                        Everything we build is available for the community to inspect, learn from, and improve.
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-green-600 dark:text-green-400">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold">Privacy First</h3>
                    <p className="text-sm text-muted-foreground px-4">
                        We prioritize client-side processing. Your data never leaves your browser.
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-purple-600 dark:text-purple-400">
                        <Trophy className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold">Always Improving</h3>
                    <p className="text-sm text-muted-foreground px-4">
                        Your support directly funds new tools, better servers, and more coffee.
                    </p>
                </div>
            </div>

        </div>
    )
}
