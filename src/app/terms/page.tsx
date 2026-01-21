import { Separator } from "@/components/ui/separator"
import { ScrollText, ShieldCheck, Scale, AlertCircle } from "lucide-react"

export const metadata = {
    title: "Terms of Service - OpenToolbox",
    description: "Terms and Conditions for using OpenToolbox.",
}

export default function TermsPage() {
    return (
        <div className="mx-auto max-w-3xl py-12 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
                <p className="text-lg text-muted-foreground">
                    Last updated: January 2026
                </p>
            </div>

            {/* TL;DR Box */}
            <div className="rounded-xl border-2 border-slate-200 bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <ScrollText className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Key Points</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 mt-0.5 opacity-70" />
                        <span>Tools are provided "as-is" for lawful use.</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Scale className="h-4 w-4 mt-0.5 opacity-70" />
                        <span>The site is ad-supported to remain free.</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 opacity-70" />
                        <span>We are not liable for data loss or tool inaccuracy.</span>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-slate-500">
                <h3>1. Agreement to Terms</h3>
                <p>
                    By accessing OpenToolbox, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
                </p>

                <h3>2. Ad-Supported Service</h3>
                <p>
                    OpenToolbox is a free service supported by advertising. To keep our tools free for everyone, we display advertisements provided by third-party networks like Google AdSense. By using the service, you acknowledge that we may display such advertisements.
                </p>

                <h3>3. Intellectual Property</h3>
                <p>
                    The service and its original content, features, and functionality are and will remain the exclusive property of OpenToolbox. Users retain full ownership and rights to any content they process or generate using our tools.
                </p>

                <h3>4. User Responsibilities</h3>
                <p>You agree not to use the service to:</p>
                <ul>
                    <li>Process illegal content or generate malicious data.</li>
                    <li>Attempt to disrupt or interfere with the service infrastructure.</li>
                    <li>Use automated systems (bots) to scrape data or overload the tools.</li>
                </ul>

                <h3>5. Disclaimer</h3>
                <p>
                    Our tools are provided on an "AS IS" and "AS AVAILABLE" basis. While we strive for accuracy, we do not warrant that the results of using the tools will be 100% accurate, reliable, or suitable for critical production use cases without independent verification.
                </p>

                <h3>6. Limitation of Liability</h3>
                <p>
                    In no event shall OpenToolbox be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the service.
                </p>

                <h3>7. Changes</h3>
                <p>
                    We reserve the right to modify or replace these Terms at any time. By continuing to access our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
            </div>
        </div>
    )
}
