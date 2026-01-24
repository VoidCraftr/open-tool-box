import InvoiceGeneratorClient from "./client"

export const metadata = {
    title: "Professional Invoice Generator - OpenToolBox",
    description: "Create professional business invoices for free. Zero-server processing ensures your business data remains private. Multiple themes and PDF export support.",
    keywords: ["invoice generator", "free invoice creator", "bill generator", "business tools", "private invoicing"],
}

export default function InvoiceGeneratorPage() {
    return <InvoiceGeneratorClient />
}
