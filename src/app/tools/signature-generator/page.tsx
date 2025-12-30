import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import { CreateSignature } from "./components/CreateSignature"

export const metadata: Metadata = {
    title: "Free Digital Signature Generator | Draw or Type | OpenToolBox",
    description: "Create professional digital signatures online. Draw your signature or type it with handwriting fonts. Download transparency-supported, high-quality PNGs.",
    keywords: ["signature generator", "make signature", "draw signature", "signature fonts", "digital signature creator"],
}

export default function SignatureGeneratorPage() {
    return (
        <ToolWrapper
            title="Digital Signature Generator"
            description="Create your professional digital signature by drawing or typing in seconds."
            toolSlug="signature-generator"
        >
            <CreateSignature />

            <div className="mt-12 space-y-8 text-muted-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Create your unique signature</h2>
                    <p className="mb-4">
                        Use our free tool to generate a personalized digital signature.
                        Perfect for signing documents, emails, and digital contracts.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Draw: Use our precision canvas with pressure sensitivity and color options.</li>
                        <li>Type: Choose from our curated list of 8+ handwriting fonts including cursive and calligraphy styles.</li>
                        <li>Download: Get a high-resolution, transparent PNG ready for use.</li>
                    </ul>
                </section>
            </div>
        </ToolWrapper>
    )
}
