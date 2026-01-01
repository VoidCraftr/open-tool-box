"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, TimerReset, Coffee, Brain } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

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
            title="Pomodoro Timer"
            description="Stay focused and productive with the Pomodoro technique."
            toolSlug="pomodoro-timer"
        >
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Pomodoro Timer</h1>
                    <p className="text-muted-foreground">
                        Stay focused and productive with the Pomodoro technique.
                    </p>
                </div>

                <Card className="overflow-hidden relative">
                    <div
                        className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                    ></div>

                    <CardContent className="p-10 space-y-10">
                        <div className="flex justify-center gap-2">
                            <Button
                                variant={mode === 'focus' ? 'default' : 'outline'}
                                onClick={() => switchMode('focus')}
                                className="rounded-full"
                            >
                                <Brain className="w-4 h-4 mr-2" />
                                Focus
                            </Button>
                            <Button
                                variant={mode === 'short' ? 'default' : 'outline'}
                                onClick={() => switchMode('short')}
                                className="rounded-full"
                            >
                                <Coffee className="w-4 h-4 mr-2" />
                                Short Break
                            </Button>
                            <Button
                                variant={mode === 'long' ? 'default' : 'outline'}
                                onClick={() => switchMode('long')}
                                className="rounded-full"
                            >
                                <Coffee className="w-4 h-4 mr-2" />
                                Long Break
                            </Button>
                        </div>

                        <div className="text-center">
                            <div className="text-9xl font-bold font-mono tracking-tighter tabular-nums text-foreground/90">
                                {formatTime(timeLeft)}
                            </div>
                            <div className="text-muted-foreground mt-2 uppercase tracking-widest text-sm font-semibold">
                                {isActive ? 'Running' : 'Paused'}
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <Button
                                size="lg"
                                className="w-32 h-16 text-xl rounded-full"
                                variant={isActive ? "secondary" : "default"}
                                onClick={isActive ? pauseTimer : startTimer}
                            >
                                {isActive ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
                                {isActive ? "Pause" : "Start"}
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-16 h-16 rounded-full"
                                onClick={resetTimer}
                            >
                                <RotateCcw className="w-6 h-6" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <strong className="block text-foreground mb-1">Focus</strong>
                        25 Minutes
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <strong className="block text-foreground mb-1">Short Break</strong>
                        5 Minutes
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <strong className="block text-foreground mb-1">Long Break</strong>
                        15 Minutes
                    </div>
                </div>
            </div>
        </ToolWrapper>
    )
}
