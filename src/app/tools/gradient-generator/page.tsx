"use client"

import { useState } from "react"
import { Copy, RefreshCw, Shuffle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

const PRESETS = [
    { name: "Sunset", c1: "#ff512f", c2: "#dd2476" },
    { name: "Sea", c1: "#2b5876", c2: "#4e4376" },
    { name: "Emerald", c1: "#348f50", c2: "#56b4d3" },
    { name: "Royal", c1: "#141e30", c2: "#243b55" },
    { name: "Warm", c1: "#fce38a", c2: "#f38181" },
    { name: "Night", c1: "#0f2027", c2: "#2c5364" },
]

export default function GradientGeneratorPage() {
    const [type, setType] = useState("linear")
    const [deg, setDeg] = useState([90])
    const [color1, setColor1] = useState("#4f46e5")
    const [color2, setColor2] = useState("#9333ea")

    const gradientValue = type === "linear"
        ? `linear-gradient(${deg}deg, ${color1}, ${color2})`
        : `radial-gradient(circle, ${color1}, ${color2})`

    const cssCode = `background: ${gradientValue};`

    const handleRandom = () => {
        const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
        setColor1(randomColor())
        setColor2(randomColor())
        setDeg([Math.floor(Math.random() * 360)])
    }

    return (
        <ToolWrapper
            title="Gradient Generator"
            description="Design beautiful CSS gradients. Customize colors, angle, and type."
            adSlot="gradient-slot"
            toolSlug="gradient-generator"
        >
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                    <Card className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1" onClick={handleRandom}>
                                    <Shuffle className="mr-2 h-4 w-4" /> Randomize
                                </Button>
                                <Select onValueChange={(v) => {
                                    const p = PRESETS.find(x => x.name === v)
                                    if (p) { setColor1(p.c1); setColor2(p.c2); }
                                }}>
                                    <SelectTrigger className="flex-1"><SelectValue placeholder="Load Preset" /></SelectTrigger>
                                    <SelectContent>
                                        {PRESETS.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="linear">Linear</SelectItem>
                                        <SelectItem value="radial">Radial</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {type === "linear" && (
                                <div className="space-y-2">
                                    <div className="flex justify-between"><Label>Angle</Label><span className="font-mono">{deg}deg</span></div>
                                    <Slider value={deg} onValueChange={setDeg} min={0} max={360} />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="space-y-2">
                                    <Label>Start Color</Label>
                                    <div className="flex gap-2">
                                        <Input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-12 p-1" />
                                        <Input value={color1} onChange={(e) => setColor1(e.target.value)} className="uppercase" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>End Color</Label>
                                    <div className="flex gap-2">
                                        <Input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-12 p-1" />
                                        <Input value={color2} onChange={(e) => setColor2(e.target.value)} className="uppercase" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 bg-muted/50 font-mono text-sm relative">
                        <code className="block break-all pr-10">{cssCode}</code>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-2 h-8 w-8"
                            onClick={() => navigator.clipboard.writeText(cssCode)}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </Card>
                </div>

                <div className="flex items-center justify-center rounded-lg border bg-muted/20 min-h-[400px]">
                    <div
                        className="h-64 w-64 rounded-xl shadow-lg transition-all duration-200"
                        style={{ background: gradientValue }}
                    />
                </div>
            </div>

            <ContentSection
                title="CSS Gradient Guide"
                description={`Create smooth, colorful CSS gradients for backgrounds and UI elements. \n\nGradients let you display smooth transitions between two or more specified colors. CSS defines three types of gradients: Linear (goes down/up/left/right/diagonally), Radial (defined by their center), and Conic (rotated around a center point).`}
                features={[
                    "Linear & Radial Gradient Support",
                    "Custom Angle Control",
                    "Real-time Preview",
                    "Hex & RGB Color Support"
                ]}
                faq={[
                    {
                        question: "Are CSS gradients better than images?",
                        answer: "Yes! CSS gradients are generated by the browser, so they require zero HTTP requests, scale infinitely without pixelation, and load instantly."
                    },
                    {
                        question: "Can I use more than 2 colors?",
                        answer: "Standard CSS supports infinite color stops. Our simple generator focuses on 2-color gradients for the most common modern design patterns."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
