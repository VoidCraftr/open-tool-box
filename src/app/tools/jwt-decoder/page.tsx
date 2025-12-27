"use client"

import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { AlertCircle, CheckCircle2 } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function JwtDecoderPage() {
    const [token, setToken] = useState("")
    const [header, setHeader] = useState<any>(null)
    const [payload, setPayload] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleDecode = (val: string) => {
        setToken(val)
        if (!val.trim()) {
            setHeader(null)
            setPayload(null)
            setError(null)
            return
        }

        try {
            const decodedHeader = jwtDecode(val, { header: true })
            const decodedPayload = jwtDecode(val)

            setHeader(decodedHeader)
            setPayload(decodedPayload)
            setError(null)
        } catch (err) {
            setError("Invalid JWT Token")
            setHeader(null)
            setPayload(null)
        }
    }

    return (
        <ToolWrapper
            title="JWT Decoder"
            description="Decode JSON Web Tokens to view their header and payload. Client-side only."
            adSlot="jwt-decoder-slot"
        >
            <div className="grid gap-6">
                <div className="space-y-2">
                    <Textarea
                        placeholder="Paste your JWT token here (eyJ...)"
                        className="font-mono min-h-[120px] text-sm break-all"
                        value={token}
                        onChange={(e) => handleDecode(e.target.value)}
                    />
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {!error && payload && (
                        <Alert className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Valid Token Structure</AlertTitle>
                            <AlertDescription>Successfully decoded.</AlertDescription>
                        </Alert>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Header</h3>
                        <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs font-mono min-h-[200px] border">
                            {header ? JSON.stringify(header, null, 2) : "// Header will appear here"}
                        </pre>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Payload</h3>
                        <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs font-mono min-h-[200px] border">
                            {payload ? JSON.stringify(payload, null, 2) : "// Payload will appear here"}
                        </pre>
                    </div>
                </div>

                {payload && (
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-medium text-lg">Standard Claims</h3>
                        <div className="grid gap-2 text-sm">
                            {['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti'].map(claim => {
                                if (payload[claim] === undefined) return null;
                                let value = payload[claim];
                                let desc = "";

                                switch (claim) {
                                    case 'iss': desc = "Issuer"; break;
                                    case 'sub': desc = "Subject"; break;
                                    case 'aud': desc = "Audience"; break;
                                    case 'exp': desc = "Expiration Time"; value = new Date(value * 1000).toLocaleString(); break;
                                    case 'nbf': desc = "Not Before"; value = new Date(value * 1000).toLocaleString(); break;
                                    case 'iat': desc = "Issued At"; value = new Date(value * 1000).toLocaleString(); break;
                                    case 'jti': desc = "JWT ID"; break;
                                }

                                return (
                                    <div key={claim} className="grid grid-cols-[100px_1fr_200px] gap-4 p-2 rounded-md bg-muted/50 border">
                                        <span className="font-mono font-bold text-blue-500">{claim}</span>
                                        <span className="font-mono break-all">{String(value)}</span>
                                        <span className="text-muted-foreground italic">{desc}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            <ContentSection
                title="JWT Decoder Guide"
                description={`Decode and inspect JSON Web Tokens (JWTs) without sending them to a server. \n\nJWTs are used for securely transmitting information between parties as a JSON object. They are commonly used for authorization (logging in) and information exchange.`}
                features={[
                    "Client-Side Only (Secure)",
                    "Header & Payload Decoding",
                    "Validity Syntax Check",
                    "Standard RFC 7519 Compliant"
                ]}
                faq={[
                    {
                        question: "Is it safe to paste my production tokens?",
                        answer: "Yes. This tool runs 100% in your browser. Your local tokens never leave your device."
                    },
                    {
                        question: "Can I verify the signature?",
                        answer: "No. To verify a signature, you would need the secret key, which you should NEVER paste into a public tool. We only decode the readable parts (Header/Payload)."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
