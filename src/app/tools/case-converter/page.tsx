import { constructMetadata } from "@/lib/seo"
import CaseConverterClient from "./client"

export const metadata = constructMetadata({
    title: "Case Converter - Uppercase, Lowercase & Title Case",
    description: "Convert text case online. Toggle between Uppercase, Lowercase, Title Case, Sentence Case, and more. Instant text transformation.",
    keywords: ["case converter", "text converter", "uppercase converter", "lowercase converter", "title case converter", "sentence case"]
})

export default function CaseConverterPage() {
    return <CaseConverterClient />
}
