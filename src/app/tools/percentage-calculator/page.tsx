import { constructMetadata } from "@/lib/seo"
import PercentageCalculatorClient from "./client"

export const metadata = constructMetadata({
    title: "Percentage Calculator - Calculate Percentages & Changes",
    description: "Free online percentage calculator. Calculate percentage of a number, percentage change (increase/decrease), and what percent X is of Y.",
    keywords: ["percentage calculator", "calculate percentage", "percentage increase calculator", "percentage change", "percent calculator"]
})

export default function PercentageCalculatorPage() {
    return <PercentageCalculatorClient />
}
