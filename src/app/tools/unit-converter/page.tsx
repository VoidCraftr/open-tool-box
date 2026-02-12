import { constructMetadata } from "@/lib/seo"
import UnitConverterClient from "./client"

export const metadata = constructMetadata({
    title: "Unit Converter - Length, Weight & Temperature Conversion",
    description: "Convert between common units of measurement including metric and imperial systems. Length, weight, mass, and temperature converter.",
    keywords: ["unit converter", "metric converter", "imperial converter", "length converter", "weight converter", "temperature converter"]
})

export default function UnitConverterPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Unit Converter","description":"Convert between common units of measurement including metric and imperial systems. Length, weight, mass, and temperature converter.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <UnitConverterClient />
        </>
    )
}
