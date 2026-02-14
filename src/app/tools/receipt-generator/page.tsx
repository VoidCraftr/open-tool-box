import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
    title: "Free Receipt Generator | OpenToolBox",
    description: "Create professional payment receipts for your business instantly. Free, private, and no signup required.",
}

export default function ReceiptGeneratorPage() {
    return <Client />
}
