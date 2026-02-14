import DiscountCalculatorClient from "./client"

export const metadata = {
    title: "Discount Calculator - OpenToolBox",
    description: "Calculate savings instantly. Find the final price after discounts and taxes. Simple, fast, and private shopping tool.",
    keywords: ["discount calculator", "sale price calculator", "savings calculator", "shopping tool", "price calculator"],
}

export default function DiscountCalculatorPage() {
    return <DiscountCalculatorClient />
}
