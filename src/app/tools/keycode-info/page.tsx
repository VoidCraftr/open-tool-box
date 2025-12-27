"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function KeycodeInfoPage() {
    const [event, setEvent] = useState<KeyboardEvent | null>(null)
    const [history, setHistory] = useState<KeyboardEvent[]>([])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            e.preventDefault()
            setEvent(e)
            setHistory(prev => [e, ...prev].slice(0, 5))
        }
        window.addEventListener("keydown", down)
        return () => window.removeEventListener("keydown", down)
    }, [])

    if (!event) {
        return (
            <ToolWrapper title="Keycode Info" description="Press any key to get JavaScript event keycode information." adSlot="keycode-info-slot">
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/20 text-center">
                    <h2 className="text-2xl font-bold">Press any key on your keyboard</h2>
                    <p className="text-muted-foreground">Focus this window first</p>
                </div>
            </ToolWrapper>
        )
    }

    return (
        <ToolWrapper
            title="Keycode Info"
            description="JavaScript keyboard event properties for the last pressed key."
            adSlot="keycode-info-slot"
        >
            <div className="flex flex-col items-center justify-center gap-8 py-8">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">event.keyCode</span>
                    <div className="text-9xl font-bold text-primary">{event.keyCode}</div>
                </div>

                <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <Card>
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-xs text-muted-foreground uppercase">event.key</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-xl font-mono font-bold line-clamp-1" title={event.key}>{event.key === " " ? "(Space)" : event.key}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-xs text-muted-foreground uppercase">event.code</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-xl font-mono font-bold">{event.code}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-xs text-muted-foreground uppercase">event.which</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-xl font-mono font-bold">{event.which}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="p-4 pb-2"><CardTitle className="text-xs text-muted-foreground uppercase">event.location</CardTitle></CardHeader>
                        <CardContent className="p-4 pt-0 text-xl font-mono font-bold">{event.location}</CardContent>
                    </Card>
                </div>

                <div className="grid w-full gap-6 sm:grid-cols-3 text-center">
                    <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">event.ctrlKey</div>
                        <div className={`font-mono font-bold ${event.ctrlKey ? "text-green-500" : "text-muted-foreground"}`}>{String(event.ctrlKey)}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">event.shiftKey</div>
                        <div className={`font-mono font-bold ${event.shiftKey ? "text-green-500" : "text-muted-foreground"}`}>{String(event.shiftKey)}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">event.metaKey</div>
                        <div className={`font-mono font-bold ${event.metaKey ? "text-green-500" : "text-muted-foreground"}`}>{String(event.metaKey)}</div>
                    </div>
                </div>

                {history.length > 0 && (
                    <div className="w-full max-w-2xl space-y-4 pt-8 border-t">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide text-center">Recent History</h3>
                        <div className="grid gap-2">
                            {history.map((e, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${i === 0 ? "bg-primary/5 border-primary/20" : "bg-muted/30"}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono font-bold text-lg w-16 text-center">{e.keyCode}</span>
                                        <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">{e.code}</span>
                                    </div>
                                    <span className="font-medium">{e.key === " " ? "(Space)" : e.key}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ContentSection
                title="JavaScript Keycode Guide"
                description={`Get instant information about any key pressed on your keyboard. \n\nUseful for web developers debugging keyboard shortcuts, game controls, or accessibility features. We provide the deprecated \`keyCode\` property as well as the modern \`key\` and \`code\` standards.`}
                features={[
                    "Real-time Event Capture",
                    "Shows Deprecated & Modern Properties",
                    "Status of Control Keys (Ctrl, Shift, Alt)",
                    "Location Property Detection"
                ]}
                faq={[
                    {
                        question: "Why are there so many properties?",
                        answer: "JavaScript has evolved over time. \`keyCode\` is deprecated but still used in older codebases. \`key\` represents the character value, while \`code\` represents the physical key position."
                    },
                    {
                        question: "What is 'event.location'?",
                        answer: "It indicates where the key is located on the keyboard (e.g., Left Shift vs Right Shift, Numpad keys vs Standard keys)."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
