"use client"

import { useState, useEffect } from "react"
import { ArrowRightLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

const RATES: Record<string, number> = {
    // Length (Base: Meter)
    "m": 1,
    "km": 0.001,
    "cm": 100,
    "mm": 1000,
    "ft": 3.28084,
    "in": 39.3701,
    "mi": 0.000621371,

    // Weight (Base: Gram)
    "g": 1,
    "kg": 0.001,
    "mg": 1000,
    "lb": 0.00220462,
    "oz": 0.035274,
}

export default function UnitConverterPage() {
    const [category, setCategory] = useState("length")
    const [fromUnit, setFromUnit] = useState("m")
    const [toUnit, setToUnit] = useState("ft")
    const [fromVal, setFromVal] = useState("1")
    const [toVal, setToVal] = useState("")

    const [formula, setFormula] = useState("")

    useEffect(() => {
        convert(fromVal, fromUnit, toUnit, category)
    }, [fromUnit, toUnit, category])

    const convert = (val: string, from: string, to: string, cat: string) => {
        const value = parseFloat(val)
        if (isNaN(value)) {
            setToVal("")
            setFormula("")
            return
        }

        if (cat === "temperature") {
            let result = 0
            // Celsius Base
            let celsius = value
            if (from === "f") celsius = (value - 32) * 5 / 9
            if (from === "k") celsius = value - 273.15

            if (to === "c") result = celsius
            if (to === "f") result = (celsius * 9 / 5) + 32
            if (to === "k") result = celsius + 273.15

            setToVal(result.toFixed(2))

            // Formula Text
            if (from === "c" && to === "f") setFormula(`(${value}°C × 9/5) + 32 = ${result.toFixed(2)}°F`)
            if (from === "f" && to === "c") setFormula(`(${value}°F − 32) × 5/9 = ${result.toFixed(2)}°C`)
            if (from === "c" && to === "k") setFormula(`${value}°C + 273.15 = ${result.toFixed(2)}K`)
            if (from === "k" && to === "c") setFormula(`${value}K − 273.15 = ${result.toFixed(2)}°C`)
            if (from === from) setFormula(`${value}°${from.toUpperCase()} = ${value}°${to.toUpperCase()}`)

        } else {
            // Ratio based (Length, Weight)
            const base = value / RATES[from]
            const result = base * RATES[to]
            setToVal(result.toFixed(4).replace(/\.?0+$/, ""))

            if (from === to) {
                setFormula(`${value} ${from} = ${value} ${to}`)
            } else {
                // Determine multiplication factor relative to 1 unit
                const factor = (1 / RATES[from]) * RATES[to]
                setFormula(`Multiply by ${factor.toExponential(3)}`) // Simplified for generic

                // Better Formula: 1 Unit From = X Unit To
                const oneUnit = (1 / RATES[from]) * RATES[to]
                setFormula(`1 ${from} ≈ ${oneUnit.toExponential(4)} ${to}`)
            }
        }
    }

    const handleInput = (val: string) => {
        setFromVal(val)
        convert(val, fromUnit, toUnit, category)
    }

    return (
        <ToolWrapper
            title="Unit Converter"
            description="Convert between common measurements for length, weight, and temperature."
            adSlot="unit-converter-slot"
            toolSlug="unit-converter"
        >
            <Tabs defaultValue="length" onValueChange={(v) => { setCategory(v); setFromUnit(v === 'temperature' ? 'c' : v === 'weight' ? 'kg' : 'm'); setToUnit(v === 'temperature' ? 'f' : v === 'weight' ? 'lb' : 'ft'); }}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="length">Length</TabsTrigger>
                    <TabsTrigger value="weight">Weight</TabsTrigger>
                    <TabsTrigger value="temperature">Temperature</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto_1fr] items-center">
                <div className="space-y-2">
                    <Label>From</Label>
                    <Input type="number" value={fromVal} onChange={(e) => handleInput(e.target.value)} className="text-lg" />
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {category === "length" && <><SelectItem value="m">Meters (m)</SelectItem><SelectItem value="km">Kilometers (km)</SelectItem><SelectItem value="ft">Feet (ft)</SelectItem><SelectItem value="in">Inches (in)</SelectItem><SelectItem value="mi">Miles (mi)</SelectItem></>}
                            {category === "weight" && <><SelectItem value="kg">Kilograms (kg)</SelectItem><SelectItem value="g">Grams (g)</SelectItem><SelectItem value="lb">Pounds (lb)</SelectItem><SelectItem value="oz">Ounces (oz)</SelectItem></>}
                            {category === "temperature" && <><SelectItem value="c">Celsius (°C)</SelectItem><SelectItem value="f">Fahrenheit (°F)</SelectItem><SelectItem value="k">Kelvin (K)</SelectItem></>}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-center">
                    <Button variant="ghost" size="icon" disabled>
                        <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                    </Button>
                </div>

                <div className="space-y-2">
                    <Label>To</Label>
                    <Input readOnly value={toVal} className="text-lg bg-muted" />
                    <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {category === "length" && <><SelectItem value="m">Meters (m)</SelectItem><SelectItem value="km">Kilometers (km)</SelectItem><SelectItem value="ft">Feet (ft)</SelectItem><SelectItem value="in">Inches (in)</SelectItem><SelectItem value="mi">Miles (mi)</SelectItem></>}
                            {category === "weight" && <><SelectItem value="kg">Kilograms (kg)</SelectItem><SelectItem value="g">Grams (g)</SelectItem><SelectItem value="lb">Pounds (lb)</SelectItem><SelectItem value="oz">Ounces (oz)</SelectItem></>}
                            {category === "temperature" && <><SelectItem value="c">Celsius (°C)</SelectItem><SelectItem value="f">Fahrenheit (°F)</SelectItem><SelectItem value="k">Kelvin (K)</SelectItem></>}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {formula && (
                <div className="mt-8 p-4 rounded-lg bg-muted/30 border text-center">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Formula</Label>
                    <div className="font-mono text-lg font-medium text-primary">
                        {formula}
                    </div>
                </div>
            )}

            <ContentSection
                title="Unit Converter Guide"
                description={`Instantly convert between common units of measurement. \n\nWe support three major categories: Length (Metric/Imperial), Weight (Mass), and Temperature.`}
                features={[
                    "Multi-Category Support",
                    "Real-time Conversion",
                    "Metric & Imperial Units",
                    "Accurate Decimal Precision"
                ]}
                faq={[
                    {
                        question: "Which formula is used for Temperature?",
                        answer: "C = (F - 32) * 5/9. F = (C * 9/5) + 32. K = C + 273.15."
                    },
                    {
                        question: "How accurate are the conversions?",
                        answer: "We use standard international conversion factors (e.g., 1 inch = 2.54 cm exactly)."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
