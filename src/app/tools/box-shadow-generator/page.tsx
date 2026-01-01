"use client"

import { useState } from "react"
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function BoxShadowGeneratorPage() {
    const [shadows, setShadows] = useState([
        { hOffset: 0, vOffset: 10, blur: 20, spread: 5, color: "#000000", opacity: 0.3, inset: false }
    ])
    const [activeLayer, setActiveLayer] = useState(0)

    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    const current = shadows[activeLayer] || shadows[0]

    const updateShadow = (key: string, value: any) => {
        setShadows(prev => {
            const newShadows = [...prev]
            newShadows[activeLayer] = { ...newShadows[activeLayer], [key]: value }
            return newShadows
        })
    }

    const addLayer = () => {
        setShadows([...shadows, { hOffset: 10, vOffset: 10, blur: 20, spread: 0, color: "#000000", opacity: 0.2, inset: false }])
        setActiveLayer(shadows.length)
    }

    const removeLayer = (e: React.MouseEvent, index: number) => {
        e.stopPropagation()
        if (shadows.length > 1) {
            const newShadows = shadows.filter((_, i) => i !== index)
            setShadows(newShadows)
            setActiveLayer(Math.max(0, activeLayer - 1))
        }
    }

    const shadowValue = shadows.map(s =>
        `${s.inset ? "inset " : ""}${s.hOffset}px ${s.vOffset}px ${s.blur}px ${s.spread}px ${hexToRgba(s.color, s.opacity)}`
    ).join(", ")

    const cssCode = `box-shadow: ${shadowValue};`

    return (
        <ToolWrapper
            title="Box Shadow Generator"
            description="Create beautiful CSS box shadows visually. Stack multiple layers for realistic depth."
            adSlot="box-shadow-slot"
            toolSlug="box-shadow-generator"
        >
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Controls */}
                <div className="space-y-6">
                    {/* Layer Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {shadows.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveLayer(i)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-colors ${activeLayer === i ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80"}`}
                            >
                                Layer {i + 1}
                                {shadows.length > 1 && (
                                    <span onClick={(e) => removeLayer(e, i)} className="hover:text-destructive">×</span>
                                )}
                            </div>
                        ))}
                        <Button variant="outline" size="sm" className="rounded-full h-7 text-xs" onClick={addLayer}>+ Add Layer</Button>
                    </div>

                    <Card className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between"><Label>Horizontal Offset</Label><span className="font-mono">{current.hOffset}px</span></div>
                            <Slider value={[current.hOffset]} onValueChange={([v]) => updateShadow('hOffset', v)} min={-100} max={100} />

                            <div className="flex justify-between"><Label>Vertical Offset</Label><span className="font-mono">{current.vOffset}px</span></div>
                            <Slider value={[current.vOffset]} onValueChange={([v]) => updateShadow('vOffset', v)} min={-100} max={100} />

                            <div className="flex justify-between"><Label>Blur Radius</Label><span className="font-mono">{current.blur}px</span></div>
                            <Slider value={[current.blur]} onValueChange={([v]) => updateShadow('blur', v)} min={0} max={100} />

                            <div className="flex justify-between"><Label>Spread Radius</Label><span className="font-mono">{current.spread}px</span></div>
                            <Slider value={[current.spread]} onValueChange={([v]) => updateShadow('spread', v)} min={-50} max={50} />

                            <div className="flex justify-between"><Label>Opacity</Label><span className="font-mono">{current.opacity}</span></div>
                            <Slider value={[current.opacity]} onValueChange={([v]) => updateShadow('opacity', v)} min={0} max={1} step={0.01} />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label>Shadow Color</Label>
                            <div className="flex gap-2">
                                <Input type="color" value={current.color} onChange={(e) => updateShadow('color', e.target.value)} className="w-12 p-1" />
                                <Input value={current.color} onChange={(e) => updateShadow('color', e.target.value)} className="uppercase w-24" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="inset" checked={current.inset} onChange={(e) => updateShadow('inset', e.target.checked)} className="h-4 w-4" />
                            <Label htmlFor="inset">Inset</Label>
                        </div>
                    </Card>

                    <Card className="p-4 bg-muted/50 font-mono text-sm relative group">
                        <code className="block break-all pr-10">{cssCode}</code>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => navigator.clipboard.writeText(cssCode)}
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </Card>
                </div>

                {/* Preview */}
                <div className="flex items-center justify-center rounded-lg border bg-muted/20 min-h-[400px]">
                    <div
                        className="h-48 w-48 rounded-xl bg-white dark:bg-slate-800 transition-all duration-200 flex items-center justify-center font-bold text-muted-foreground"
                        style={{ boxShadow: shadowValue }}
                    >
                        Preview
                    </div>
                </div>
            </div>

            <ContentSection
                title="CSS Box Shadow Guide"
                description={`Visually design complex CSS box-shadows without writing code. \n\nThe \`box-shadow\` property adds shadow effects around an element's frame. You can set multiple effects separated by commas. A box shadow is described by X and Y offsets relative to the element, blur and spread radius, and color.`}
                features={[
                    "Interactive Visual Editor",
                    "Inset & Outset Support",
                    "One-Click CSS Copy",
                    "RBA Color Support with Opacity"
                ]}
                faq={[
                    {
                        question: "What is the difference between specific properties?",
                        answer: "`Offset-x` moves the shadow horizontally, `offset-y` moves it vertically. `Blur` creates a soft edge, while `Spread` changes the size of the shadow."
                    },
                    {
                        question: "Does this support cross-browser compatibility?",
                        answer: "Yes, standard `box-shadow` is supported by all modern browsers (Chrome, Firefox, Safari, Edge). Older Webkit prefixes are rarely needed today."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
