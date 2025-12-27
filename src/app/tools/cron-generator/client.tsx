"use client"

import { useState, useEffect } from "react"
import cronstrue from "cronstrue"
import parser from "cron-parser"
import { Copy, RefreshCw, Calendar, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import { ContentSection } from "@/components/tools/ContentSection"

const PRESETS = [
    { label: "Every Minute", value: "* * * * *" },
    { label: "Every 5 Mins", value: "*/5 * * * *" },
    { label: "Every 15 Mins", value: "*/15 * * * *" },
    { label: "Every Hour", value: "0 * * * *" },
    { label: "Every Day (Midnight)", value: "0 0 * * *" },
    { label: "Every Morning (6 AM)", value: "0 6 * * *" },
    { label: "Workdays (9 AM)", value: "0 9 * * 1-5" },
    { label: "Every Week (Sun)", value: "0 0 * * 0" },
    { label: "Every Month (1st)", value: "0 0 1 * *" },
    { label: "Every Year (Jan 1)", value: "0 0 1 1 *" },
]

export function CronGeneratorClient() {
    const [expression, setExpression] = useState("* * * * *")
    const [humanReadable, setHumanReadable] = useState("")
    const [nextRuns, setNextRuns] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)

    // Parse logic
    useEffect(() => {
        try {
            const desc = cronstrue.toString(expression, { use24HourTimeFormat: true })
            setHumanReadable(desc)
            setError(null)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const interval = (parser as any).parseExpression(expression)
            const runs = []
            for (let i = 0; i < 5; i++) {
                runs.push(interval.next().toDate().toLocaleString())
            }
            setNextRuns(runs)
        } catch {
            setError("Invalid cron expression")
            setHumanReadable("")
            setNextRuns([])
        }
    }, [expression])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(expression)
        toast.success("Copied to clipboard")
    }

    const parts = expression.split(" ")
    const [minute, hour, dayMonth, month, dayWeek] = parts.length === 5 ? parts : ["*", "*", "*", "*", "*"]

    const updatePart = (index: number, value: string) => {
        const newParts = [...parts]
        newParts[index] = value
        setExpression(newParts.join(" "))
    }

    return (
        <div className="space-y-8">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 justify-center">
                {PRESETS.map((p) => (
                    <Button
                        key={p.label}
                        variant="outline"
                        size="sm"
                        onClick={() => setExpression(p.value)}
                        className={expression === p.value ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""}
                    >
                        {p.label}
                    </Button>
                ))}
            </div>

            {/* Main Display */}
            <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="bg-muted/30 border-b pb-8">
                    <div className="text-center space-y-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Current Schedule</CardTitle>
                        <div className="relative max-w-xl mx-auto">
                            <Input
                                value={expression}
                                onChange={(e) => setExpression(e.target.value)}
                                className="text-center text-3xl font-mono py-8 tracking-widest bg-background/50 backdrop-blur-sm shadow-inner"
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={copyToClipboard}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="h-8 flex items-center justify-center">
                            {error ? (
                                <Badge variant="destructive">{error}</Badge>
                            ) : (
                                <Badge variant="secondary" className="px-4 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                    <RefreshCw className="h-3 w-3 mr-2" />
                                    {humanReadable}
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x border-b">
                        <FieldControl label="Minute" value={minute} onChange={(v) => updatePart(0, v)} placeholder="0-59" />
                        <FieldControl label="Hour" value={hour} onChange={(v) => updatePart(1, v)} placeholder="0-23" />
                        <FieldControl label="Day (Month)" value={dayMonth} onChange={(v) => updatePart(2, v)} placeholder="1-31" />
                        <FieldControl label="Month" value={month} onChange={(v) => updatePart(3, v)} placeholder="1-12" />
                        <FieldControl label="Day (Week)" value={dayWeek} onChange={(v) => updatePart(4, v)} placeholder="0-6 (Sun-Sat)" />
                    </div>

                    <div className="p-6 bg-muted/10">
                        <h4 className="flex items-center gap-2 font-semibold text-sm text-muted-foreground mb-4">
                            <Calendar className="h-4 w-4" />
                            Upcoming Executions
                        </h4>
                        <div className="space-y-2">
                            {nextRuns.map((run, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm p-2 rounded-md bg-background border">
                                    <Badge variant="outline" className="font-mono text-xs">{i + 1}</Badge>
                                    <div className="flex-1 font-medium">{run}</div>
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                </div>
                            ))}
                            {nextRuns.length === 0 && (
                                <div className="text-sm text-muted-foreground italic">No valid schedule to preview.</div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <ContentSection
                title="About Cron Expressions"
                description="Cron is a time-based job scheduler in Unix-like computer operating systems. Users that set up and maintain software environments use cron to schedule jobs (commands or shell scripts) to run periodically at fixed times, dates, or intervals."
                features={[
                    "Standard 5-field syntax supported",
                    "Real-time preview of next 5 execution dates",
                    "Human-readable translation",
                    "One-click copy to clipboard"
                ]}

            />
        </div>
    )
}

function FieldControl({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder: string }) {
    return (
        <div className="p-4 space-y-2 text-center hover:bg-muted/50 transition-colors">
            <label className="text-xs font-semibold uppercase text-muted-foreground">{label}</label>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="text-center font-mono font-bold"
                placeholder={placeholder}
            />
            <p className="text-[10px] text-muted-foreground truncate">{placeholder}</p>
        </div>
    )
}
