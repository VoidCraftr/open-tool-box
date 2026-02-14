import TipCalculatorClient from "./client"

export const metadata = {
    title: "Tip Calculator - OpenToolBox",
    description: "Split bills and calculate tips instantly. Quick, easy, and ad-free experience for your dining and hospitality needs.",
    keywords: ["tip calculator", "split bill", "gratuity calculator", "dining tool", "bill splitter"],
}

export default function TipCalculatorPage() {
    return <TipCalculatorClient />
}
