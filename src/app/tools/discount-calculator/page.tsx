import DiscountCalculatorClient from "./client"

export const metadata = {
    title: "Discount Calculator - OpenToolBox",
    description: "Calculate savings instantly. Find the final price after discounts and taxes. Simple, fast, and private shopping tool.",
    keywords: ["discount calculator", "sale price calculator", "savings calculator", "shopping tool", "price calculator"],
}

export default function DiscountCalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Discount Calculator","description":"Calculate savings instantly. Find the final price after discounts and taxes. Simple, fast, and private shopping tool.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <DiscountCalculatorClient />
        </>
    )
}
