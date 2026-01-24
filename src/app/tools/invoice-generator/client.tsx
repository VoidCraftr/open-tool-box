"use client"

import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { BusinessDocumentEditor } from "@/components/tools/business/BusinessDocumentEditor"

export default function InvoiceGeneratorClient() {
    return (
        <ToolWrapper
            title="Invoice Generator"
            description="Create professional invoices with custom branding, taxes, and discounts. 100% private."
            toolSlug="invoice-generator"
        >
            <BusinessDocumentEditor initialDocType="invoice" lockedDocType={true} />

            <div className="mt-12">
                <ContentSection
                    title="Professional Invoicing Made Simple"
                    description="generate unlimited professional invoices directly in your browser. No sign-up required, and all data stays on your device."
                    features={[
                        "📄 **Unified Editor**: Switch between Invoices, Quotes, and Receipts if needed.",
                        "🎨 **Premium Themes**: Choose from Modern, Corporate, and Creative styles.",
                        "⚡ **Instant PDF**: Generate high-quality PDFs instantly using client-side rendering.",
                        "🔒 **Private & Secure**: Your client data never leaves your browser."
                    ]}
                    howToUse={[
                        "Customize your **Business Details** and add your logo.",
                        "Enter your **Client's Information**.",
                        "Add **Line Items** with descriptions, quantities, and rates.",
                        "Adjust **Tax Rates** and **Notes** as needed.",
                        "Click **Download Invoice** to get your PDF."
                    ]}
                    faq={[
                        {
                            question: "Is this really free?",
                            answer: "Yes, you can generate unlimited invoices for free. We support the tool via optional donations."
                        },
                        {
                            question: "Can I change the currency?",
                            answer: "Absolutely. Select your preferred currency from the settings dropdown."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
