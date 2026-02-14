import { constructMetadata } from "@/lib/seo"
import AgeCalculatorClient from "./client"

export const metadata = constructMetadata({
    title: "Age Calculator - Calculate Exact Age Online",
    description: "Calculate your exact age in years, months, and days. Find out how many days until your next birthday. Free online age calculator.",
    keywords: ["age calculator", "calculate age", "birthday calculator", "date of birth calculator", "how old am i", "next birthday"]
})

export default function AgeCalculatorPage() {
    return <AgeCalculatorClient />
}
