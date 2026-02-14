import { constructMetadata } from "@/lib/seo"
import SqlFormatterClient from "./client"

export const metadata = constructMetadata({
    title: "SQL Formatter & Beautifier",
    description: "Format, validate, and beautify SQL queries for MySQL, PostgreSQL, SQLite, and more. Clean up messy code instantly.",
    keywords: ["sql formatter", "sql beautifier", "sql validator", "postgres formatter", "mysql formatter"]
})

export default function SqlFormatterPage() {
    return <SqlFormatterClient />
}
