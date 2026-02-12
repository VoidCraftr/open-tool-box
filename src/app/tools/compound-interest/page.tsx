import CompoundInterestClient from "./client"

export const metadata = {
    title: "Compound Interest Calculator - OpenToolBox",
    description: "Plan your wealth with our compound interest calculator. Visualize growth over time with interactive charts. Private and secure investment planning.",
    keywords: ["compound interest calculator", "savings calculator", "wealth planner", "interest calculator", "investment growth"],
}

export default function CompoundInterestPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Compound Interest Calculator","description":"Plan your wealth with our compound interest calculator. Visualize growth over time with interactive charts. Private and secure investment planning.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <CompoundInterestClient />
        </>
    )
}
