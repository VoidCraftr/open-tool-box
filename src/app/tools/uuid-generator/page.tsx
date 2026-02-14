import { constructMetadata } from "@/lib/seo"
import UuidGeneratorClient from "./client"

export const metadata = constructMetadata({
    title: "UUID Generator (v4)",
    description: "Generate random, unique, RFC-compliant UUIDs instantly. Ideal for developers needing test data or database keys.",
    keywords: ["uuid generator", "guid generator", "v4 uuid", "random uuid"]
})

export default function UuidGeneratorPage() {
    return <UuidGeneratorClient />
}
