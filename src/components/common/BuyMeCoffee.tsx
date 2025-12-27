"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Coffee, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BuyMeCoffee() {
    const [count, setCount] = useState(0)

    const handleDonate = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCount(prev => prev + 1)

        // Get click coordinates normalized to 0-1 range
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y },
            colors: ['#FFD700', '#FFA500', '#FF4500'],
            zIndex: 9999
        })
        window.open("https://buymeacoffee.com/voidcraftr", "_blank")
    }

    return (
        <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/10 p-8 md:p-12">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-gradient-to-br from-orange-400/20 to-amber-300/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-gradient-to-tr from-yellow-400/20 to-orange-300/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-6 relative"
                >
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/30 text-white">
                        <Coffee className="h-12 w-12" />
                        <motion.div
                            animate={{ y: [-5, -15, -5], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute -top-4 right-6 text-orange-500 dark:text-orange-300"
                        >
                            <span className="text-2xl">♨️</span>
                        </motion.div>
                    </div>
                </motion.div>

                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                    Fuel the Development
                </h2>
                <p className="mb-8 max-w-xl text-lg text-muted-foreground">
                    OpenToolbox is free, open-source, and devoid of annoying ads. If these tools saved you 5 minutes today, consider buying me a coffee!
                </p>

                <div className="flex flex-col gap-4 sm:flex-row items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            size="lg"
                            className="h-14 bg-gradient-to-r from-amber-500 to-orange-600 px-8 text-lg font-bold text-white shadow-xl shadow-orange-500/20 hover:from-amber-600 hover:to-orange-700"
                            onClick={handleDonate}
                        >
                            <Coffee className="mr-2 h-6 w-6" />
                            Buy me a Coffee
                        </Button>
                    </motion.div>

                    <span className="text-sm text-muted-foreground font-medium">
                        or just share the love <Heart className="inline h-4 w-4 text-red-500 fill-red-500 mx-1" />
                    </span>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm text-orange-600/80 dark:text-orange-400/80 bg-orange-100/50 dark:bg-orange-900/20 px-4 py-2 rounded-full backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/30">
                    <Zap className="h-4 w-4" />
                    <span>Every coffee funds 1 hour of server time</span>
                </div>
            </div>
        </section>
    )
}
