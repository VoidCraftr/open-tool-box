import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Scientific Calculator | OpenToolBox",
    description: "Advanced scientific calculator with history and trigonometry. Free, clean math tool.",
}

export default function ScientificCalculatorPage() {
    return <Client />
}
