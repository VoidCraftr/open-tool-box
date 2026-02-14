import { constructMetadata } from "@/lib/seo"
import JsonFormatterClient from "./client"

export const metadata = constructMetadata({
    title: "JSON Formatter & Validator",
    description: "Free online JSON Formatter. Beautify, minify, and validate JSON data instantly. Secure client-side processing.",
    keywords: ["json formatter", "json beautifier", "json validator", "json minifier"]
})

export default function JsonFormatterPage() {
    return <JsonFormatterClient />
}
