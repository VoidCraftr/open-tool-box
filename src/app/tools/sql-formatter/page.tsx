import { constructMetadata } from "@/lib/seo"
import SqlFormatterClient from "./client"

export const metadata = constructMetadata({
    title: "SQL Formatter & Beautifier",
    description: "Format, validate, and beautify SQL queries for MySQL, PostgreSQL, SQLite, and more. Clean up messy code instantly.",
    keywords: ["sql formatter", "sql beautifier", "sql validator", "postgres formatter", "mysql formatter"]
})

export default function SqlFormatterPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"SQL Formatter & Beautifier","description":"Format, validate, and beautify SQL queries for MySQL, PostgreSQL, SQLite, and more. Clean up messy code instantly.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <SqlFormatterClient />
        </>
    )
}
