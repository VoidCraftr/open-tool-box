"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Percent, ArrowRight, ArrowUp, ArrowDown } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function PercentageCalculator() {
    // Mode 1: What is X% of Y?
    const [m1_percent, setM1_Percent] = useState("")
    const [m1_number, setM1_Number] = useState("")
    const [m1_result, setM1_Result] = useState<number | null>(null)

    // Mode 2: X is what percent of Y?
    const [m2_part, setM2_Part] = useState("")
    const [m2_whole, setM2_Whole] = useState("")
    const [m2_result, setM2_Result] = useState<number | null>(null)

    // Mode 3: Percentage Change from X to Y
    const [m3_from, setM3_From] = useState("")
    const [m3_to, setM3_To] = useState("")
    const [m3_result, setM3_Result] = useState<number | null>(null)
    const [m3_type, setM3_Type] = useState<"increase" | "decrease" | null>(null)

    useEffect(() => {
        const p = parseFloat(m1_percent)
        const n = parseFloat(m1_number)
        if (!isNaN(p) && !isNaN(n)) {
            setM1_Result((p / 100) * n)
        } else {
            setM1_Result(null)
        }
    }, [m1_percent, m1_number])

    useEffect(() => {
        const part = parseFloat(m2_part)
        const whole = parseFloat(m2_whole)
        if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
            setM2_Result((part / whole) * 100)
        } else {
            setM2_Result(null)
        }
    }, [m2_part, m2_whole])

    useEffect(() => {
        const from = parseFloat(m3_from)
        const to = parseFloat(m3_to)
        if (!isNaN(from) && !isNaN(to) && from !== 0) {
            const change = ((to - from) / from) * 100
            setM3_Result(Math.abs(change))
            setM3_Type(change >= 0 ? "increase" : "decrease")
        } else {
            setM3_Result(null)
            setM3_Type(null)
        }
    }, [m3_from, m3_to])

    return (
        <ToolWrapper
            title="Percentage Calculator"
            description="Calculate percentages, find what percent a number is of another, and determine percentage increase or decrease."
            toolSlug="percentage-calculator"
        >
            <div className="grid gap-8">
                {/* Mode 1 */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Percent className="w-5 h-5 text-primary" />
                            Percentage of a Number
                        </CardTitle>
                        <CardDescription>
                            What is X% of Y?
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
                            <span>What is</span>
                            <div className="relative w-24">
                                <Input
                                    type="number"
                                    placeholder="%"
                                    className="pr-6"
                                    value={m1_percent}
                                    onChange={(e) => setM1_Percent(e.target.value)}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                            </div>
                            <span>of</span>
                            <Input
                                type="number"
                                placeholder="Value"
                                className="w-32"
                                value={m1_number}
                                onChange={(e) => setM1_Number(e.target.value)}
                            />
                            <span>?</span>
                            <ArrowRight className="hidden md:block text-muted-foreground" />
                            <div className="bg-secondary px-6 py-2 rounded-md font-bold text-2xl min-w-[100px] text-center">
                                {m1_result !== null ? parseFloat(m1_result.toFixed(2)) : "-"}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Mode 2 */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Percent className="w-5 h-5 text-primary" />
                            What Percent is X of Y?
                        </CardTitle>
                        <CardDescription>
                            Determine the percentage one number is of another.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
                            <Input
                                type="number"
                                placeholder="Part"
                                className="w-24"
                                value={m2_part}
                                onChange={(e) => setM2_Part(e.target.value)}
                            />
                            <span>is what % of</span>
                            <Input
                                type="number"
                                placeholder="Whole"
                                className="w-32"
                                value={m2_whole}
                                onChange={(e) => setM2_Whole(e.target.value)}
                            />
                            <span>?</span>
                            <ArrowRight className="hidden md:block text-muted-foreground" />
                            <div className="bg-secondary px-6 py-2 rounded-md font-bold text-2xl min-w-[100px] text-center flex items-center justify-center">
                                {m2_result !== null ? (
                                    <>
                                        {parseFloat(m2_result.toFixed(2))}<span className="text-lg ml-1">%</span>
                                    </>
                                ) : "-"}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Mode 3 */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Percent className="w-5 h-5 text-primary" />
                            Percentage Change
                        </CardTitle>
                        <CardDescription>
                            Calculate the percentage increase or decrease from one value to another.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
                            <span>From</span>
                            <Input
                                type="number"
                                placeholder="Start"
                                className="w-24"
                                value={m3_from}
                                onChange={(e) => setM3_From(e.target.value)}
                            />
                            <span>to</span>
                            <Input
                                type="number"
                                placeholder="End"
                                className="w-32"
                                value={m3_to}
                                onChange={(e) => setM3_To(e.target.value)}
                            />
                            <span>is a</span>
                            <ArrowRight className="hidden md:block text-muted-foreground" />
                            <div className={`bg-secondary px-6 py-2 rounded-md font-bold text-2xl min-w-[140px] text-center flex items-center justify-center gap-2 ${m3_type === 'increase' ? 'text-green-500' : m3_type === 'decrease' ? 'text-red-500' : ''}`}>
                                {m3_result !== null ? (
                                    <>
                                        {m3_type === 'increase' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                                        {parseFloat(m3_result.toFixed(2))}%
                                    </>
                                ) : "-"}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ToolWrapper>
    )
}
