import { Separator } from "@/components/ui/separator"
import { Shield, Lock, Eye, Server } from "lucide-react"

export const metadata = {
    title: "Privacy Policy - OpenToolbox",
    description: "Our commitment to your privacy and data security.",
}

export default function PrivacyPage() {
    return (
        <div className="mx-auto max-w-3xl py-12 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
                <p className="text-lg text-muted-foreground">
                    Last updated: January 2026
                </p>
            </div>

            {/* TL;DR Box */}
            <div className="rounded-xl border-2 border-blue-100 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900/50 p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">TL;DR Summary</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 text-sm text-blue-800 dark:text-blue-200">
                    <div className="flex items-start gap-2">
                        <Lock className="h-4 w-4 mt-0.5 opacity-70" />
                        <span>All processing happens in your browser.</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Eye className="h-4 w-4 mt-0.5 opacity-70" />
                        <span>We minimize data collection to what is necessary.</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Server className="h-4 w-4 mt-0.5 opacity-70" />
                        <span>We do not sell your personal data.</span>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-blue-500">
                <h3>1. Introduction</h3>
                <p>
                    OpenToolbox ("we", "us", or "our") operates the OpenToolbox website. We respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                </p>

                <h3>2. Information We Collect</h3>
                <p>
                    OpenToolbox is designed as a client-side first application. This means the vast majority of your data processing happens locally on your device.
                </p>
                <ul>
                    <li><strong>Tool Input Data:</strong> The images you upload, the JSON you format, and the passwords you generate <strong>never leave your device</strong>. They are processed entirely within your browser's memory and are not stored on our servers.</li>
                    <li><strong>Usage Data:</strong> We collect information about how you interact with our site to improve the user experience. This includes pages visited, tools used, and technical information like your browser type and operating system.</li>
                </ul>

                <h3>3. Third-Party Analytics & Tracking</h3>
                <p>
                    We use several third-party services to monitor and analyze the use of our Service:
                </p>
                <ul>
                    <li><strong>Google Analytics:</strong> A web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.</li>
                    <li><strong>Microsoft Clarity:</strong> We partner with Microsoft Clarity and Microsoft Advertising to capture how you use and interact with our website through behavioral metrics, heatmaps, and session replay to improve and market our products/services. For more information about how Microsoft collects and uses your data, visit the <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a>.</li>
                </ul>

                <h3>4. Advertising (Google AdSense)</h3>
                <p>
                    We use Google AdSense to serve advertisements on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
                </p>
                <ul>
                    <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
                    <li>We comply with Google's Publisher Policies and strive to ensure a high-quality ad experience.</li>
                </ul>

                <h3>5. Cookies & Local Storage</h3>
                <p>
                    We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
                <p>
                    We also use <strong>Local Storage</strong> to save your preferences, such as:
                </p>
                <ul>
                    <li>Dark/Light mode preference</li>
                    <li>Sidebar collapse state</li>
                    <li>Recent tools history</li>
                </ul>

                <h3>6. Contact Us</h3>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:satyam.agarwal.ai@gmail.com">satyam.agarwal.ai@gmail.com</a>.
                </p>
            </div>
        </div>
    )
}
