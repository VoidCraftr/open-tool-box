"use client"

import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { BusinessDocumentEditor } from "@/components/tools/business/BusinessDocumentEditor"

export default function BusinessQuoteGeneratorClient() {
    return (
        <ToolWrapper
            title="Business Quote Builder"
            description="Generate detailed business quotes for your services. Professional, private, and fast."
            toolSlug="business-quote-generator"
        >
            <BusinessDocumentEditor initialDocType="quote" lockedDocType={true} />

            <div className="mt-12">
                <ContentSection
                    title="Streamlined Business Quotes"
                    description="Create accurate and professional business quotes in seconds. Perfect for agencies, consultants, and service providers."
                    features={[
                        "💼 **Professional Format**: Industry-standard quote layouts.",
                        "💱 **Multi-Currency**: Quote in your client's currency.",
                        "🎨 **Customizable**: Match your brand identity.",
                        "🔒 **Secure**: No data upload required."
                    ]}
                    howToUse={[
                        "Fill in your **Business Info**.",
                        "Add the **Client Details**.",
                        "List your **Services & Pricing**.",
                        "**Download PDF** and send."
                    ]}
                    faq={[
                        {
                            question: "What is the difference between a quote and an estimate?",
                            answer: "A quote is typically a fixed price offer, while an estimate is a rough guess. This tool allows you to create formal fixed-price quotes."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
