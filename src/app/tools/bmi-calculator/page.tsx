import { constructMetadata } from "@/lib/seo"
import BMICalculatorClient from "./client"

export const metadata = constructMetadata({
    title: "BMI Calculator - Calculate Body Mass Index",
    description: "Calculate your Body Mass Index (BMI) easily. Check your health status with our free online BMI calculator for men and women.",
    keywords: ["bmi calculator", "calculate bmi", "body mass index", "bmi chart", "healthy weight calculator", "ideal weight"]
})

export default function BMICalculatorPage() {
    return <BMICalculatorClient />
}
