import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Estimate Generator | OpenToolBox",
    description: "Create professional project estimates and quotes for your clients. Free, private, and simple.",
}

export default function EstimateGeneratorPage() {
    return <Client />
}
