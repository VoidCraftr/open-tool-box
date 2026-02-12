import InvoiceGeneratorClient from "./client"

export const metadata = {
    title: "Professional Invoice Generator - OpenToolBox",
    description: "Create professional business invoices for free. Zero-server processing ensures your business data remains private. Multiple themes and PDF export support.",
    keywords: ["invoice generator", "free invoice creator", "bill generator", "business tools", "private invoicing"],
}

export default function InvoiceGeneratorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Professional Invoice Generator","description":"Create professional business invoices for free. Zero-server processing ensures your business data remains private. Multiple themes and PDF export support.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <InvoiceGeneratorClient />
        </>
    )
}
