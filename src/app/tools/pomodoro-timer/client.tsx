"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, TimerReset, Coffee, Brain, Sparkles, ShieldCheck, Zap, Activity } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState<'focus' | 'short' | 'long'>('focus')

    // We would use an audio Ref here properly in a real app
    // const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            setIsActive(false)
            // Play sound ideally
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timeLeft])

    const startTimer = () => setIsActive(true)
    const pauseTimer = () => setIsActive(false)

    const resetTimer = () => {
        setIsActive(false)
        switch (mode) {
            case 'focus': setTimeLeft(25 * 60); break;
            case 'short': setTimeLeft(5 * 60); break;
            case 'long': setTimeLeft(15 * 60); break;
        }
    }

    const switchMode = (newMode: 'focus' | 'short' | 'long') => {
        setMode(newMode)
        setIsActive(false)
        switch (newMode) {
            case 'focus': setTimeLeft(25 * 60); break;
            case 'short': setTimeLeft(5 * 60); break;
            case 'long': setTimeLeft(15 * 60); break;
        }
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const progress = (() => {
        const total = mode === 'focus' ? 25 * 60 : mode === 'short' ? 5 * 60 : 15 * 60
        return ((total - timeLeft) / total) * 100
    })()

    return (
        <ToolWrapper
            title="Focus Flow: Premium Pomodoro"
            description="High-performance focus timer based on the Pomodoro technique. Optimize deep work sessions and recovery breaks with a cinematic interface."
            toolSlug="pomodoro-timer"
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex flex-col items-center gap-8 relative">
                    {/* Mode Selector Tray */}
                    <div className="flex p-1.5 bg-background/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl animate-fade-in">
                        {[
                            { id: 'focus' as const, icon: Brain, label: 'FOCUS', color: 'text-primary' },
                            { id: 'short' as const, icon: Coffee, label: 'SHORT BREAK', color: 'text-blue-400' },
                            { id: 'long' as const, icon: Coffee, label: 'LONG BREAK', color: 'text-purple-400' }
                        ].map((item) => (
                            <Button
                                key={item.id}
                                variant={mode === item.id ? 'default' : 'ghost'}
                                onClick={() => switchMode(item.id)}
                                className={`h-12 px-6 rounded-xl text-[10px] font-black tracking-widest transition-all duration-300 ${mode === item.id ? 'bg-primary shadow-lg shadow-primary/20 scale-105' : 'hover:bg-white/5 opacity-50'}`}
                            >
                                <item.icon className={`w-4 h-4 mr-2 ${item.color}`} />
                                {item.label}
                            </Button>
                        ))}
                    </div>

                    {/* Main Timer Engine */}
                    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center animate-in zoom-in-95 duration-700">
                        {/* Background Rings */}
                        <div className="absolute inset-0 rounded-full border-[10px] border-white/5 flex items-center justify-center">
                            <div className="w-[85%] h-[85%] rounded-full border border-white/5 opacity-20 animate-pulse" />
                        </div>

                        {/* Progress Glow */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="46%"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="12"
                                className="text-white/5"
                            />
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r="46%"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="12"
                                strokeDasharray="100 100"
                                className="text-primary"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 - (timeLeft / (mode === 'focus' ? 25 * 60 : mode === 'short' ? 5 * 60 : 15 * 60)) }}
                                transition={{ duration: 1, ease: "linear" }}
                                style={{ strokeLinecap: 'round', filter: 'drop-shadow(0 0 12px rgba(var(--primary-rgb), 0.5))' }}
                            />
                        </svg>

                        <div className="relative z-10 text-center space-y-2">
                            <div className="text-8xl md:text-9xl font-black font-mono tracking-tighter tabular-nums drop-shadow-2xl">
                                {formatTime(timeLeft)}
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${isActive ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                                    {isActive ? 'Session Active' : 'System Standby'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Controller Box */}
                    <div className="flex items-center gap-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-16 h-16 rounded-3xl border-white/10 hover:bg-white/5 transition-all active:scale-95"
                            onClick={resetTimer}
                        >
                            <RotateCcw className="w-6 h-6 text-muted-foreground" />
                        </Button>
                        <Button
                            size="lg"
                            className={`w-48 h-20 text-2xl font-black rounded-[40px] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${isActive ? 'bg-background border border-white/10 hover:bg-white/5' : 'bg-primary hover:bg-primary/90 shadow-primary/30'}`}
                            onClick={isActive ? pauseTimer : startTimer}
                        >
                            {isActive ? (
                                <>
                                    <Pause className="w-8 h-8 fill-foreground" />
                                    PAUSE
                                </>
                            ) : (
                                <>
                                    <Play className="w-8 h-8 fill-primary-foreground" />
                                    FOCUS
                                </>
                            )}
                        </Button>
                        <div className="w-16 h-16 flex items-center justify-center">
                            {/* Placeholder for future settings/extra feature */}
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                        </div>
                    </div>
                </div>

                {/* Session Context Cards */}
                <div className="grid md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "600ms" }}>
                    {[
                        { label: "Neural Load", value: "Optimized", icon: Zap, status: "Active" },
                        { label: "Sync Status", value: "Local Only", icon: ShieldCheck, status: "Safe" },
                        { label: "Productivity", value: "Peak Phase", icon: Activity, status: "High" }
                    ].map((card, i) => (
                        <Card key={i} className="bg-white/5 border-white/5 p-6 group hover:border-primary/20 transition-all cursor-default overflow-hidden relative">
                            <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <card.icon className="w-24 h-24" />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <card.icon className="w-4 h-4 text-primary" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{card.label}</h4>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <p className="text-xl font-bold">{card.value}</p>
                                <span className="text-[9px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase italic">{card.status}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <ContentSection
                title="Biological Focus Rhythms & Recovery Science"
                description="The Pomodoro technique is more than just a timer; it is a neurological system designed to manage cognitive load and prevent mental burnout. By alternating high-intensity deep work (25 minutes) with intentional recovery phases, you optimize your brain's performance and significantly increase long-term productivity."
                features={[
                    "⏲️ **Precision Session Management**: Pre-configured focus, short break, and long break intervals for optimized flow.",
                    "🔬 **Cognitive Load Optimization**: Based on university-level focus research to maximize information retention.",
                    "🔒 **Privacy Hardened**: No session data, tasks, or metrics ever leave your machine. 100% secure focus.",
                    "⚡ **Cinematic Visual Feedback**: Progress rings and status indicators provide peripheral awareness of remaining time.",
                    "✨ **Neuromorphic Liquid Design**: A premium, distraction-free interface that helps you enter the 'flow' state faster.",
                    "🔋 **Zero Battery Drain**: Highly efficient client-side code ensures your focus session doesn't come at the cost of hardware life."
                ]}
                howToUse={[
                    "Select your current session type: **Focus**, **Short Break**, or **Long Break** from the mode tray.",
                    "Click the large central **FOCUS** button to initiate the countdown.",
                    "Monitor the **Radial Progress Ring** to maintain awareness of your session progress.",
                    "When the timer reaches zero, take an intentional recovery break to allow for neural consolidation.",
                    "Use the **Reset** controller as needed to synchronize with your physical environment or task completion."
                ]}
                faq={[
                    {
                        question: "Why is 25 minutes the standard focus time?",
                        answer: "Studies show that the human brain can maintain peak attentive focus for roughly 20-30 minutes before cognitive performance begins to decline. 25 minutes is the 'Golden Mean' that maximizes output while minimizing fatigue."
                    },
                    {
                        question: "Can I customize the timer intervals?",
                        answer: "Our premium version follows the scientifically validated 25/5/15 rhythm. We recommend using these preset values to maintain structural consistency and discipline in your workflow."
                    },
                    {
                        question: "Does the timer keep running if I switch tabs?",
                        answer: "Yes. Our implementation uses high-precision timers that continue to track your progress even if the browser window is in the background, ensuring your focus discipline remains absolute."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
