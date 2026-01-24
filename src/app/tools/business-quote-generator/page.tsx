import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Business Quote Generator | OpenToolBox",
    description: "Generate professional business quotes and proposals. Free, fast, and 100% private.",
}

export default function BusinessQuoteGeneratorPage() {
    return <Client />
}
