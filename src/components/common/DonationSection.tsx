"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Coffee, Cloud, CloudLightning, Database, Sparkles, Server, Terminal, Globe, Code2, Box, Hexagon, FileCode2, FileJson, FileCode, Webhook, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

// --- Animation Configuration ---
const CONFIG = {
    spawnInterval: 500, // Speed of new icons
    iconSize: 20,
    floatDuration: 2.5, // Lifespan of icons
    icons: [
        { Icon: Code2, color: "#61DAFB", name: "React" },
        { Icon: Hexagon, color: "#DD0031", name: "Angular" },
        { Icon: Database, color: "#D82C20", name: "Redis" },
        { Icon: Server, color: "#339933", name: "NodeJs" },
        { Icon: Box, color: "#3776AB", name: "Python" },
        { Icon: Database, color: "#47A248", name: "MongoDb" },
        { Icon: Database, color: "#336791", name: "PostgrSql" },
        { Icon: Cloud, color: "#F9AB00", name: "Cloud" },
        { Icon: CloudLightning, color: "#FF9900", name: "AWS" },
        { Icon: Sparkles, color: "#8E75B2", name: "Gemini" },
        { Icon: Terminal, color: "#512BD4", name: "Dotnet API" },
        { Icon: FileJson, color: "#F7DF1E", name: "Javascript" },
        { Icon: FileCode, color: "#3178C6", name: "TypeScript" },
        { Icon: Database, color: "#00ADD8", name: "DataBase" },
        { Icon: Webhook, color: "#000000", name: "API" },
        { Icon: Globe, color: "#61DAFB", name: "SaaS" },
    ]
}

export function DonationSection() {
    const [floatingIcons, setFloatingIcons] = useState<{ id: number; Icon: any; color: string; x: number; name: string }[]>([])

    // Icon Spawner
    useEffect(() => {
        let count = 0
        const interval = setInterval(() => {
            const randomIcon = CONFIG.icons[Math.floor(Math.random() * CONFIG.icons.length)]
            // Random horizontal offset relative to the laptop position
            const randomX = Math.random() * 60 - 30

            setFloatingIcons(prev => [
                ...prev,
                {
                    id: Date.now() + count++,
                    Icon: randomIcon.Icon,
                    color: randomIcon.color,
                    x: randomX,
                    name: randomIcon.name
                }
            ])
        }, CONFIG.spawnInterval)

        return () => clearInterval(interval)
    }, [])

    // Cleanup
    useEffect(() => {
        const cleanup = setInterval(() => {
            setFloatingIcons(prev => prev.filter(icon => Date.now() - icon.id < CONFIG.floatDuration * 1000))
        }, 2000)
        return () => clearInterval(cleanup)
    }, [])

    return (
        <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600/10 via-background to-blue-600/10 border border-border/50 p-6 sm:p-8">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 min-h-[160px]">

                {/* Animation Container */}
                <div className="relative group shrink-0 w-40 h-40 flex items-center justify-center">

                    {/* Character Container */}
                    <div className="relative w-full h-full flex items-center justify-center z-10">
                        <motion.img
                            key="typing"
                            src="/assets/dev-coding.png"
                            alt="Developer Typing"
                            className="w-full h-full object-contain drop-shadow-lg"
                            style={{ imageRendering: "pixelated" }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                y: [0, 1, 0] // Subtle bobbing
                            }}
                            transition={{
                                opacity: { duration: 0.3 },
                                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                            }}
                        />

                        {/* Typing Shake Effect */}
                        <motion.div
                            className="absolute bottom-2 left-6 w-10 h-2 bg-transparent"
                            animate={{ x: [-1, 1, -1] }} // Fast shake
                            transition={{ repeat: Infinity, duration: 0.1 }}
                        />
                    </div>

                    {/* Floating Tech Icons */}
                    {floatingIcons.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.5, y: -20, x: item.x }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                scale: [0.5, 1, 1],
                                y: -100,
                                x: item.x * 3
                            }}
                            transition={{ duration: CONFIG.floatDuration, ease: "easeOut" }}
                            className="absolute bottom-10 left-10 z-20 pointer-events-none flex flex-col items-center gap-1"
                        >
                            <item.Icon
                                size={CONFIG.iconSize}
                                color={item.color}
                                style={{ filter: `drop-shadow(0 0 4px ${item.color})` }}
                            />
                            {/* <span className="text-[8px] font-mono text-muted-foreground whitespace-nowrap bg-background/50 px-1 rounded">{item.name}</span> */}
                        </motion.div>
                    ))}
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 z-10 flex-1">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
                            Fuel the Development!
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto sm:mx-0">
                            Building OpenToolBox takes caffeine and code. Help keep the updates shipping! 🚀
                        </p>
                    </div>

                    <Link href="https://www.buymeacoffee.com/voidcraftr" target="_blank" rel="noopener noreferrer">
                        <Button className="font-semibold bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all hover:-translate-y-1">
                            <Coffee className="mr-2 h-4 w-4" />
                            Buy Me a Coffee
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
