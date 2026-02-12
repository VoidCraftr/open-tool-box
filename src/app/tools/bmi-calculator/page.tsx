import { constructMetadata } from "@/lib/seo"
import BMICalculatorClient from "./client"

export const metadata = constructMetadata({
    title: "BMI Calculator - Calculate Body Mass Index",
    description: "Calculate your Body Mass Index (BMI) easily. Check your health status with our free online BMI calculator for men and women.",
    keywords: ["bmi calculator", "calculate bmi", "body mass index", "bmi chart", "healthy weight calculator", "ideal weight"]
})

export default function BMICalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"BMI Calculator","description":"Calculate your Body Mass Index (BMI) easily. Check your health status with our free online BMI calculator for men and women.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <BMICalculatorClient />
        </>
    )
}
