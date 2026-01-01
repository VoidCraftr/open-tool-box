"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Activity, Info } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function BMICalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric")
    const [height, setHeight] = useState("") // cm or ft
    const [heightInches, setHeightInches] = useState("") // only for imperial
    const [weight, setWeight] = useState("") // kg or lbs
    const [bmi, setBmi] = useState<number | null>(null)
    const [category, setCategory] = useState<string | null>(null)

    const calculateBMI = () => {
        let h = parseFloat(height)
        let w = parseFloat(weight)

        if (!h || !w) return

        let calculatedBmi = 0

        if (unit === "metric") {
            // kg / m^2
            calculatedBmi = w / Math.pow(h / 100, 2)
        } else {
            // (lbs / in^2) * 703
            const hTotalInches = (h * 12) + (parseFloat(heightInches) || 0)
            if (hTotalInches > 0) {
                calculatedBmi = (w / Math.pow(hTotalInches, 2)) * 703
            }
        }

        setBmi(parseFloat(calculatedBmi.toFixed(1)))

        if (calculatedBmi < 18.5) setCategory("Underweight")
        else if (calculatedBmi < 25) setCategory("Normal Weight")
        else if (calculatedBmi < 30) setCategory("Overweight")
        else setCategory("Obese")
    }

    const reset = () => {
        setHeight("")
        setHeightInches("")
        setWeight("")
        setBmi(null)
        setCategory(null)
    }

    const getCategoryColor = (cat: string | null) => {
        switch (cat) {
            case "Underweight": return "text-blue-500"
            case "Normal Weight": return "text-green-500"
            case "Overweight": return "text-orange-500"
            case "Obese": return "text-red-500"
            default: return "text-foreground"
        }
    }

    const getGaugeRotation = (val: number | null) => {
        if (!val) return -90
        // max bmi visual ~40
        const percentage = Math.min((val / 40) * 180, 180)
        return percentage - 90
    }

    return (
        <ToolWrapper
            title="BMI Calculator"
            description="Calculate your Body Mass Index (BMI) to check if you are in a healthy weight range."
            toolSlug="bmi-calculator"
        >
            <div className="grid gap-8 md:grid-cols-[1fr_350px]">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <RadioGroup defaultValue="metric" onValueChange={(v) => { setUnit(v as any); reset() }} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="metric" id="metric" />
                                <Label htmlFor="metric">Metric (kg, cm)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="imperial" id="imperial" />
                                <Label htmlFor="imperial">Imperial (lbs, ft/in)</Label>
                            </div>
                        </RadioGroup>

                        <div className="grid grid-cols-2 gap-4">
                            {unit === "metric" ? (
                                <div className="space-y-2">
                                    <Label>Height (cm)</Label>
                                    <Input
                                        type="number"
                                        placeholder="175"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label>Height</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            placeholder="Ft"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="In"
                                            value={heightInches}
                                            onChange={(e) => setHeightInches(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
                                <Input
                                    type="number"
                                    placeholder={unit === "metric" ? "70" : "154"}
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button onClick={calculateBMI} className="flex-1" size="lg">Calculate BMI</Button>
                            <Button variant="secondary" onClick={reset}>Reset</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Result</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-6 min-h-[300px]">
                        {bmi ? (
                            <>
                                <div className="relative w-48 h-24 overflow-hidden mt-4">
                                    <div className="absolute top-0 left-0 w-full h-full rounded-t-full bg-gradient-to-r from-blue-400 via-green-400 to-red-500 opacity-20"></div>
                                    {/* Semi-circle gauge */}
                                    <div
                                        className="absolute bottom-0 left-1/2 w-1 h-24 bg-primary origin-bottom transition-transform duration-1000 ease-out"
                                        style={{ transform: `translateX(-50%) rotate(${getGaugeRotation(bmi)}deg)` }}
                                    ></div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-foreground rounded-full"></div>
                                </div>

                                <div className="text-center space-y-2">
                                    <div className="text-5xl font-bold">{bmi}</div>
                                    <div className={`text-xl font-medium ${getCategoryColor(category)}`}>
                                        {category}
                                    </div>
                                </div>

                                <div className="w-full space-y-2 text-sm text-muted-foreground border-t pt-4">
                                    <div className="flex justify-between">
                                        <span>Underweight</span>
                                        <span>&lt; 18.5</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-green-600">
                                        <span>Normal</span>
                                        <span>18.5 - 25</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Overweight</span>
                                        <span>25 - 30</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Obese</span>
                                        <span>&gt; 30</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-muted-foreground space-y-4">
                                <Activity className="w-16 h-16 mx-auto opacity-20" />
                                <p>Enter your height and weight to see your BMI score and category.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </ToolWrapper>
    )
}
