import { constructMetadata } from "@/lib/seo"
import LoanCalculatorClient from "./client"

export const metadata = constructMetadata({
    title: "Loan Calculator - EMI & Interest Calculator",
    description: "Calculate monthly loan payments (EMI) and total interest. View amortization breakdown for personal loans, car loans, and mortgages.",
    keywords: ["loan calculator", "emi calculator", "loan payment calculator", "interest calculator", "amortization calculator"]
})

export default function LoanCalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Loan Calculator","description":"Calculate monthly loan payments (EMI) and total interest. View amortization breakdown for personal loans, car loans, and mortgages.","applicationCategory":"UtilityApplication","operatingSystem":"Any (Web Browser)","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"featureList":["Free Online Tool","Client-side Processing","No Registration Required","Privacy Focused"]})
                }}
            />
            <LoanCalculatorClient />
        </>
    )
}
