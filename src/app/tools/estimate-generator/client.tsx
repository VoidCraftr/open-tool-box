"use client"

import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"
import { BusinessDocumentEditor } from "@/components/tools/business/BusinessDocumentEditor"

export default function EstimateGeneratorClient() {
    return (
        <ToolWrapper
            title="Estimate Generator"
            description="Create detailed project estimates and quotes. Impress clients with professional PDFs."
            toolSlug="estimate-generator"
        >
            <BusinessDocumentEditor initialDocType="estimate" lockedDocType={true} />

            <div className="mt-12">
                <ContentSection
                    title="Professional Project Estimates"
                    description="Win more jobs with clear, professional estimates. Outline your services, costs, and terms upfront."
                    features={[
                        "📋 **Clear Layouts**: professional formatting that clients trust.",
                        "💼 **Client Ready**: Add your terms and expire dates.",
                        "🚀 **Fast Workflow**: Duplicate items and adjust rates quickly.",
                        "📄 **PDF Export**: Download and email immediately."
                    ]}
                    howToUse={[
                        "Set up your **Company Profile**.",
                        "Define the **Scope of Work** as line items.",
                        "Add **Terms & Conditions**.",
                        "Export as **PDF** to send to your client."
                    ]}
                    faq={[
                        {
                            question: "Can I convert this to an invoice later?",
                            answer: "Currently these are separate documents, but you can copy the details over or use the general Invoice Generator which allows switching types."
                        }
                    ]}
                />
            </div>
        </ToolWrapper>
    )
}
