"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { DollarSign, Calendar, Percent } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function LoanCalculator() {
    const [amount, setAmount] = useState(10000)
    const [rate, setRate] = useState(5)
    const [years, setYears] = useState(5)

    const [emi, setEmi] = useState(0)
    const [totalInterest, setTotalInterest] = useState(0)
    const [totalPayment, setTotalPayment] = useState(0)

    useEffect(() => {
        const principal = amount
        const monthlyRate = rate / 12 / 100
        const months = years * 12

        if (principal > 0 && rate > 0 && years > 0) {
            const emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
            const totalPay = emiCalc * months
            const totalInt = totalPay - principal

            setEmi(emiCalc)
            setTotalPayment(totalPay)
            setTotalInterest(totalInt)
        }
    }, [amount, rate, years])

    const data = [
        { name: 'Principal Amount', value: amount, color: '#0f172a' }, // slate-900 (primary-ish)
        { name: 'Total Interest', value: totalInterest, color: '#64748b' }, // slate-500
    ]

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
    }

    return (
        <ToolWrapper
            title="Loan Calculator"
            description="Calculate your monthly loan payments (EMI) and total interest payable."
            toolSlug="loan-calculator"
        >
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Loan Details</CardTitle>
                        <CardDescription>Enter the loan amount, interest rate, and term.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <Label className="flex justify-between">
                                Loan Amount
                                <span className="text-muted-foreground font-normal">{formatCurrency(amount)}</span>
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    className="pl-9"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </div>
                            <Slider
                                value={[amount]}
                                min={1000}
                                max={1000000}
                                step={1000}
                                onValueChange={(val) => setAmount(val[0])}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="flex justify-between">
                                Interest Rate
                                <span className="text-muted-foreground font-normal">{rate}%</span>
                            </Label>
                            <div className="relative">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    className="pl-9"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                />
                            </div>
                            <Slider
                                value={[rate]}
                                min={0.1}
                                max={20}
                                step={0.1}
                                onValueChange={(val) => setRate(val[0])}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="flex justify-between">
                                Loan Term
                                <span className="text-muted-foreground font-normal">{years} Years</span>
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    className="pl-9"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                />
                            </div>
                            <Slider
                                value={[years]}
                                min={1}
                                max={30}
                                step={1}
                                onValueChange={(val) => setYears(val[0])}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-primary text-primary-foreground border-none">
                        <CardHeader>
                            <CardTitle className="text-center opacity-90">Monthly Payment (EMI)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-bold text-center">
                                {formatCurrency(emi)}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Amortization Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: number | undefined) => [value ? formatCurrency(value) : '', ""]}
                                            contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t text-sm">
                                <div>
                                    <div className="text-muted-foreground">Total Interest</div>
                                    <div className="font-semibold text-lg">{formatCurrency(totalInterest)}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-muted-foreground">Total Payable</div>
                                    <div className="font-semibold text-lg">{formatCurrency(totalPayment)}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ToolWrapper>
    )
}
