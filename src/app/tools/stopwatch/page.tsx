"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Square, RotateCcw, Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

function formatTime(ms: number) {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
}

export default function StopwatchPage() {
    // Stopwatch State
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Timer State
    const [timerTime, setTimerTime] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [initialTimer, setInitialTimer] = useState(300000) // 5 mins default
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

    // Stopwatch Logic
    const startStopwatch = () => {
        if (isRunning) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setIsRunning(false)
        } else {
            const startTime = Date.now() - time
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTime)
            }, 10)
            setIsRunning(true)
        }
    }

    const resetStopwatch = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsRunning(false)
        setTime(0)
        setLaps([])
    }

    const lap = () => {
        setLaps(prev => [...prev, time])
    }

    // Timer Logic
    const startTimer = () => {
        if (isTimerRunning) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
            setIsTimerRunning(false)
        } else {
            const endTime = Date.now() + (timerTime > 0 ? timerTime : initialTimer)
            timerIntervalRef.current = setInterval(() => {
                const remaining = endTime - Date.now()
                if (remaining <= 0) {
                    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
                    setTimerTime(0)
                    setIsTimerRunning(false)
                    // Play sound or alert here
                } else {
                    setTimerTime(remaining)
                }
            }, 10)
            setIsTimerRunning(true)
        }
    }

    const resetTimer = () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
        setIsTimerRunning(false)
        setTimerTime(initialTimer)
    }

    useEffect(() => {
        setTimerTime(initialTimer)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
        }
    }, [])


    return (
        <ToolWrapper
            title="Stopwatch & Timer"
            description="Simple online stopwatch with laps and countdown timer."
            adSlot="stopwatch-slot"
            toolSlug="stopwatch"
        >
            <Tabs defaultValue="stopwatch" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
                    <TabsTrigger value="timer">Timer</TabsTrigger>
                </TabsList>

                <TabsContent value="stopwatch" className="space-y-6">
                    <div className="flex justify-center py-12">
                        <div className="font-mono text-7xl font-bold tracking-wider tabular-nums">
                            {formatTime(time)}
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button size="lg" variant={isRunning ? "destructive" : "default"} onClick={startStopwatch} className="w-32">
                            {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                            {isRunning ? "Pause" : "Start"}
                        </Button>
                        <Button size="lg" variant="outline" onClick={lap} disabled={!isRunning}>
                            <Flag className="mr-2 h-5 w-5" /> Lap
                        </Button>
                        <Button size="lg" variant="ghost" onClick={resetStopwatch}>
                            <RotateCcw className="mr-2 h-5 w-5" /> Reset
                        </Button>
                    </div>

                    {laps.length > 0 && (
                        <div className="mt-8 rounded-lg border bg-muted/50 p-4 max-h-60 overflow-y-auto">
                            <div className="flex flex-col-reverse gap-2">
                                {laps.map((lapTime, index) => (
                                    <div key={index} className="flex justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <span className="text-muted-foreground">Lap {index + 1}</span>
                                        <span className="font-mono">{formatTime(lapTime)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="timer">
                    <div className="flex justify-center py-12">
                        <div className="font-mono text-7xl font-bold tracking-wider tabular-nums">
                            {formatTime(timerTime)}
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mb-8">
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => { setInitialTimer(60000); setTimerTime(60000); }}>1m</Button>
                            <Button variant="outline" size="sm" onClick={() => { setInitialTimer(300000); setTimerTime(300000); }}>5m</Button>
                            <Button variant="outline" size="sm" onClick={() => { setInitialTimer(600000); setTimerTime(600000); }}>10m</Button>
                            <Button variant="outline" size="sm" onClick={() => { setInitialTimer(1500000); setTimerTime(1500000); }}>25m</Button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button size="lg" variant={isTimerRunning ? "destructive" : "default"} onClick={startTimer} className="w-32">
                            {isTimerRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                            {isTimerRunning ? "Pause" : "Start"}
                        </Button>
                        <Button size="lg" variant="ghost" onClick={resetTimer}>
                            <RotateCcw className="mr-2 h-5 w-5" /> Reset
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>

            <ContentSection
                title="Online Stopwatch & Timer"
                description={`A simple, accurate stopwatch and countdown timer for your browser. \n\nPerfect for tracking workouts, cooking, productivity sprints (Pomodoro), or any time-sensitive task.`}
                features={[
                    "Milliseconds Precision",
                    "Lap Time Tracking",
                    "Countdown Timer with Presets",
                    "Browser-Based (No Install)"
                ]}
                faq={[
                    {
                        question: "Will it work if I switch tabs?",
                        answer: "Yes, modern browsers optimize background tabs, but our timer logic compensates for drift to keep time accurate."
                    },
                    {
                        question: "Does it have an alarm?",
                        answer: "Currently, it shows a visual indicator when the timer reaches zero. Audio alerts are coming in the next update."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
