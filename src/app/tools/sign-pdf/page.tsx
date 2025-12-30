import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import { DynamicSignPdf } from "./components/DynamicSignPdf"

export const metadata: Metadata = {
    title: "Free Online PDF Signer | Sign Documents Digitally | OpenToolBox",
    description: "Upload and sign PDF documents online for free. Add your digital signature to any page, or apply to all pages instantly. No watermarks.",
    keywords: ["sign pdf", "pdf signer", "add signature to pdf", "free pdf tool", "electronic signature"],
}

export default function SignPdfPage() {
    return (
        <ToolWrapper
            title="Sign PDF Online"
            description="Upload your PDF and add your digital signature to any page instantly."
            toolSlug="sign-pdf"
        >
            <DynamicSignPdf />

            <div className="mt-12 space-y-8 text-muted-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">How to use the PDF Signer?</h2>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Upload PDF: Click "Select PDF" to upload your document.</li>
                        <li>Add Signature: Upload a signature image (PNG/JPG).</li>
                        <li>Place: Navigate to any page and place the signature.</li>
                        <li>Apply to All: Use "Apply to All Pages" to replicate the signature position across the entire document.</li>
                        <li>Save: Download your signed PDF securely.</li>
                    </ol>
                </section>
            </div>
        </ToolWrapper>
    )
}
