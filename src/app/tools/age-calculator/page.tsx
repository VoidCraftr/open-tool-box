"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar, PartyPopper } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState("")
    const [age, setAge] = useState<{ years: number, months: number, days: number } | null>(null)
    const [nextBirthday, setNextBirthday] = useState<{ months: number, days: number } | null>(null)

    const calculateAge = () => {
        if (!birthDate) return

        const today = new Date()
        const birth = new Date(birthDate)

        let years = today.getFullYear() - birth.getFullYear()
        let months = today.getMonth() - birth.getMonth()
        let days = today.getDate() - birth.getDate()

        if (days < 0) {
            months--
            // Days in previous month
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
            days += prevMonth
        }

        if (months < 0) {
            years--
            months += 12
        }

        setAge({ years, months, days })
        calculateNextBirthday(birth, today)
    }

    const calculateNextBirthday = (birth: Date, today: Date) => {
        const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
        if (next < today) {
            next.setFullYear(next.getFullYear() + 1)
        }

        let months = next.getMonth() - today.getMonth()
        let days = next.getDate() - today.getDate()

        if (days < 0) {
            months--
            const prevMonth = new Date(next.getFullYear(), next.getMonth(), 0).getDate()
            days += prevMonth
        }

        if (months < 0) {
            months += 12
        }

        setNextBirthday({ months, days })
    }

    return (
        <ToolWrapper
            title="Age Calculator"
            description="Calculate your exact age in years, months, and days. Find out when your next birthday is."
            toolSlug="age-calculator"
        >
            <div className="grid gap-8 md:grid-cols-2">
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Date of Birth</CardTitle>
                        <CardDescription>
                            Enter your date of birth to calculate your age.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                                id="dob"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="text-lg py-6"
                            />
                        </div>
                        <Button onClick={calculateAge} className="w-full" size="lg" disabled={!birthDate}>
                            Calculate Age
                        </Button>
                    </CardContent>
                </Card>

                {age && (
                    <div className="space-y-6">
                        <Card className="bg-primary text-primary-foreground border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-6 h-6" />
                                    Your Age
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-primary-foreground/10 rounded-lg">
                                        <div className="text-4xl font-bold mb-1">{age.years}</div>
                                        <div className="text-sm opacity-80 uppercase tracking-wider">Years</div>
                                    </div>
                                    <div className="p-4 bg-primary-foreground/10 rounded-lg">
                                        <div className="text-4xl font-bold mb-1">{age.months}</div>
                                        <div className="text-sm opacity-80 uppercase tracking-wider">Months</div>
                                    </div>
                                    <div className="p-4 bg-primary-foreground/10 rounded-lg">
                                        <div className="text-4xl font-bold mb-1">{age.days}</div>
                                        <div className="text-sm opacity-80 uppercase tracking-wider">Days</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {nextBirthday && (
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <PartyPopper className="w-5 h-5 text-orange-500" />
                                        Next Birthday
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Your next birthday is in <span className="font-bold text-foreground">{nextBirthday.months} months</span> and <span className="font-bold text-foreground">{nextBirthday.days} days</span>.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex justify-between border-b pb-2">
                                    <span>Total Months:</span>
                                    <span className="font-medium text-foreground">{(age.years * 12) + age.months}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span>Total Weeks:</span>
                                    <span className="font-medium text-foreground">{Math.floor(((age.years * 365) + (age.months * 30) + age.days) / 7)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Days:</span>
                                    <span className="font-medium text-foreground">{(age.years * 365) + (Math.floor(age.years / 4)) + (age.months * 30) + age.days}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </ToolWrapper>
    )
}
