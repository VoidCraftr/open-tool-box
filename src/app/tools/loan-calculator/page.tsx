import { constructMetadata } from "@/lib/seo"
import LoanCalculatorClient from "./client"

export const metadata = constructMetadata({
    title: "Loan Calculator - EMI & Interest Calculator",
    description: "Calculate monthly loan payments (EMI) and total interest. View amortization breakdown for personal loans, car loans, and mortgages.",
    keywords: ["loan calculator", "emi calculator", "loan payment calculator", "interest calculator", "amortization calculator"]
})

export default function LoanCalculatorPage() {
    return <LoanCalculatorClient />
}
