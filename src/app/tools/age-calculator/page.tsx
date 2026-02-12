import { constructMetadata } from "@/lib/seo"
import AgeCalculatorClient from "./client"

export const metadata = constructMetadata({
    title: "Age Calculator - Calculate Exact Age Online",
    description: "Calculate your exact age in years, months, and days. Find out how many days until your next birthday. Free online age calculator.",
    keywords: ["age calculator", "calculate age", "birthday calculator", "date of birth calculator", "how old am i", "next birthday"]
})

export default function AgeCalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Age Calculator","description":"Calculate your exact age in years, months, and days. Find out how many days until your next birthday. Free online age calculator.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <AgeCalculatorClient />
        </>
    )
}
