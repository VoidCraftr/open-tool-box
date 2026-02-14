import { constructMetadata } from "@/lib/seo"
import UnitConverterClient from "./client"

export const metadata = constructMetadata({
    title: "Unit Converter - Length, Weight & Temperature Conversion",
    description: "Convert between common units of measurement including metric and imperial systems. Length, weight, mass, and temperature converter.",
    keywords: ["unit converter", "metric converter", "imperial converter", "length converter", "weight converter", "temperature converter"]
})

export default function UnitConverterPage() {
    return <UnitConverterClient />
}
