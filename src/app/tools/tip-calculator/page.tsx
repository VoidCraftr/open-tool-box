import TipCalculatorClient from "./client"

export const metadata = {
    title: "Tip Calculator - OpenToolBox",
    description: "Split bills and calculate tips instantly. Quick, easy, and ad-free experience for your dining and hospitality needs.",
    keywords: ["tip calculator", "split bill", "gratuity calculator", "dining tool", "bill splitter"],
}

export default function TipCalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Tip Calculator","description":"Split bills and calculate tips instantly. Quick, easy, and ad-free experience for your dining and hospitality needs.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <TipCalculatorClient />
        </>
    )
}
