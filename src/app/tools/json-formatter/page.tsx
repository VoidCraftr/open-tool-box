import { constructMetadata } from "@/lib/seo"
import JsonFormatterClient from "./client"

export const metadata = constructMetadata({
    title: "JSON Formatter & Validator",
    description: "Free online JSON Formatter. Beautify, minify, and validate JSON data instantly. Secure client-side processing.",
    keywords: ["json formatter", "json beautifier", "json validator", "json minifier"]
})

export default function JsonFormatterPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"JSON Formatter & Validator","description":"Free online JSON Formatter. Beautify, minify, and validate JSON data instantly. Secure client-side processing.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <JsonFormatterClient />
        </>
    )
}
