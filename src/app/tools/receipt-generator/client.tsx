"use client"

import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { BusinessDocumentEditor } from "@/components/tools/business/BusinessDocumentEditor"

export default function ReceiptGeneratorClient() {
    return (
        <ToolWrapper
            title="Receipt Generator"
            description="Create professional payment receipts instantly. 100% private and free."
            toolSlug="receipt-generator"
        >
            <BusinessDocumentEditor initialDocType="receipt" lockedDocType={true} />

            <div className="mt-12">
                <ContentSection
                    title="Instant Business Receipts"
                    description="Generate clean, professional receipts for your customers after a sale. Perfect for freelancers, markets, and small businesses."
                    features={[
                        "🧾 **Instant Receipts**: Pre-configured for proof of payment.",
                        "🔒 **Private**: No data collection, everything stays on your device.",
                        "🎨 **Custom Branding**: Add your logo and business details.",
                        "✅ **Tax Ready**: Clearly display tax amounts and totals."
                    ]}
                    howToUse={[
                        "Enter your **Business Details**.",
                        "Fill in the **Customer** information.",
                        "List the **Items Sold**.",
                        "Download the **PDF Receipt**."
                    ]}
                    faq={[
                        {
                            question: "Is this suitable for tax purposes?",
                            answer: "Yes, our receipts include all standard fields required for simple business accounting."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
