"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Image as ImageIcon, Heart, MessageCircle, Repeat, Upload, Check, Shuffle } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ContentSection } from "@/components/tools/ContentSection"
import { toPng } from "html-to-image"

export default function TweetToImageClient() {
    const [name, setName] = useState("John Doe")
    const [username, setUsername] = useState("johndoe")
    const [content, setContent] = useState("Just setting up my Twitter... #hello")
    const [likes, setLikes] = useState("1.2K")
    const [retweets, setRetweets] = useState("450")
    const [verified, setVerified] = useState(true)
    const [theme, setTheme] = useState<"light" | "dark" | "dim">("dim")
    const [background, setBackground] = useState<string>("linear-gradient(to right, #ee7752, #e73c7e, #23a6d5, #23d5ab)")
    const [isGlass, setIsGlass] = useState(false)

    // UI State
    const [avatarUrl, setAvatarUrl] = useState<string>("")
    const [isDownloading, setIsDownloading] = useState(false)

    // Hydration State
    const [mounted, setMounted] = useState(false)
    const [date, setDate] = useState<Date | null>(null)

    const tweetRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Fix hydration error by setting date only on client
    useEffect(() => {
        setMounted(true)
        setDate(new Date())
    }, [])

    const handleDownload = async () => {
        if (!tweetRef.current) return
        setIsDownloading(true)
        try {
            // Use html-to-image which supports modern CSS colors better than html2canvas
            const dataUrl = await toPng(tweetRef.current, {
                cacheBust: true,
                backgroundColor: 'transparent', // Ensure transparency if needed, or null
            })

            const link = document.createElement("a")
            link.href = dataUrl
            link.download = `tweet - ${username} -${Date.now()}.png`
            link.click()
        } catch (err) {
            console.error("Failed to generate image", err)
            // Fallback error messaging
            if (err instanceof Error && err.message.includes("lab")) {
                alert("Browser compatibility issue with color formats. Please try a different browser or theme.")
            } else {
                alert("Failed to generate image. Please try again.")
            }
        } finally {
            setIsDownloading(false)
        }
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setAvatarUrl(e.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    const currentAvatar = avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`

    // Background presets
    const backgrounds = [
        { name: "Gradient 1", value: "linear-gradient(to right, #ee7752, #e73c7e, #23a6d5, #23d5ab)" },
        { name: "Gradient 2", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { name: "Gradient 3", value: "linear-gradient(to top, #30cfd0 0%, #330867 100%)" },
        { name: "Gradient 4", value: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)" },
        { name: "Solid Black", value: "#000000" },
        { name: "Solid White", value: "#ffffff" },
        { name: "Transparent", value: "transparent" },
    ]

    if (!mounted) return null // Prevent hydration mismatch by returning null on server

    return (
        <ToolWrapper
            title="Fake Tweet Generator"
            description="Create realistic looking tweet screenshots for memes or sharing."
            toolSlug="tweet-to-image"
        >
            <div className="grid lg:grid-cols-[400px_1fr] gap-8">
                {/* Controls Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tweet Details</CardTitle>
                            <CardDescription>Customize the content of your tweet.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Profile Picture</Label>
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12 border">
                                        <AvatarImage src={currentAvatar} />
                                        <AvatarFallback>{name[0]}</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="w-4 h-4 mr-2" /> Upload
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => {
                                        const randomSeed = Math.random().toString(36).substring(7)
                                        setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`)
                                    }}>
                                        <Shuffle className="w-4 h-4 mr-2" /> Randomize
                                    </Button>
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Username</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                                        <Input value={username} onChange={(e) => setUsername(e.target.value)} className="pl-7" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Tweet Content</Label>
                                <Textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    maxLength={280}
                                    className="h-24 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Likes</Label>
                                    <Input value={likes} onChange={(e) => setLikes(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Retweets</Label>
                                    <Input value={retweets} onChange={(e) => setRetweets(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <Label className="cursor-pointer" htmlFor="verified">Verified Badge</Label>
                                <Switch id="verified" checked={verified} onCheckedChange={setVerified} />
                            </div>

                            <div className="space-y-2 pt-2">
                                <Label>Theme</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    <Button
                                        size="sm"
                                        variant={theme === "light" ? "default" : "outline"}
                                        onClick={() => setTheme("light")}
                                        className={theme === "light" ? "bg-white text-black hover:bg-gray-100 border-2 border-primary" : "bg-white text-black hover:bg-gray-100"}
                                    >
                                        Light
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={theme === "dim" ? "default" : "outline"}
                                        onClick={() => setTheme("dim")}
                                        className={theme === "dim" ? "bg-[#15202b] text-white hover:bg-[#15202b]/90 border-2 border-primary" : "bg-[#15202b] text-white hover:bg-[#15202b]/90 border-transparent"}
                                    >
                                        Dim
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={theme === "dark" ? "default" : "outline"}
                                        onClick={() => setTheme("dark")}
                                        className={theme === "dark" ? "bg-black text-white hover:bg-black/90 border-2 border-primary" : "bg-black text-white hover:bg-black/90 border-transparent"}
                                    >
                                        Dark
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t">
                                <Label>Background Effect</Label>
                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    {backgrounds.map((bg, i) => (
                                        <button
                                            key={i}
                                            className={`w-full h-8 rounded border transition-all ${background === bg.value ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                            style={{ background: bg.value }}
                                            onClick={() => setBackground(bg.value)}
                                            title={bg.name}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="cursor-pointer" htmlFor="glass">Glass Effect (Blur)</Label>
                                    <Switch id="glass" checked={isGlass} onCheckedChange={setIsGlass} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Area */}
                <div className="space-y-6">
                    <div className="sticky top-6 space-y-6">
                        <div className="flex justify-center items-center bg-muted/20 border rounded-xl overflow-hidden min-h-[400px]">
                            <div
                                ref={tweetRef}
                                className="p-12 w-full flex justify-center items-center min-h-[300px] transition-all duration-300"
                                style={{ background: background }}
                            >
                                <div
                                    style={{
                                        // Override global CSS variables that use modern color formats (oklch/lab) 
                                        // which cause html-to-image to fail.
                                        display: 'block',
                                        ['--border' as any]: '#e5e7eb',
                                        ['--input' as any]: '#e5e7eb',
                                        ['--ring' as any]: '#e5e7eb',
                                        ['--background' as any]: '#ffffff',
                                        ['--foreground' as any]: '#000000',
                                        ['--muted' as any]: '#f3f4f6',
                                        ['--muted-foreground' as any]: '#6b7280',
                                        ['--card' as any]: '#ffffff',
                                        ['--card-foreground' as any]: '#000000',
                                        ['--popover' as any]: '#ffffff',
                                        ['--popover-foreground' as any]: '#000000',
                                        ['--primary' as any]: '#000000',
                                        ['--primary-foreground' as any]: '#ffffff',
                                        ['--secondary' as any]: '#f3f4f6',
                                        ['--secondary-foreground' as any]: '#000000',
                                        ['--accent' as any]: '#f3f4f6',
                                        ['--accent-foreground' as any]: '#000000',
                                        ['--destructive' as any]: '#ef4444',

                                        // Glass effect styles
                                        ...(isGlass ? {
                                            backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : theme === 'dim' ? 'rgba(21, 32, 43, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                                            backdropFilter: 'blur(12px)',
                                            WebkitBackdropFilter: 'blur(12px)', // Safari support
                                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                            border: '1px solid rgba(255, 255, 255, 0.18)',
                                        } : {})
                                    }}
                                    className={`w-full max-w-[500px] p-6 rounded-xl border shadow-2xl transition-all duration-200 ${!isGlass ? (
                                            theme === "light" ? "bg-white text-black border-gray-200" :
                                                theme === "dim" ? "bg-[#15202b] text-white border-gray-700" : "bg-black text-white border-gray-800"
                                        ) : (
                                            theme === "light" ? "text-black border-white/20" : "text-white border-white/10"
                                        )
                                        }`}
                                >
                                    <div className="flex gap-3">
                                        {/* Use standard img for better html-to-image support with CORS */}
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={currentAvatar}
                                                alt={name}
                                                crossOrigin="anonymous"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback to initial if image fails
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.parentElement!.innerText = name[0];
                                                    e.currentTarget.parentElement!.className = "flex items-center justify-center w-12 h-12 rounded-full border bg-muted text-lg font-medium";
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="flex items-center gap-1 leading-tight">
                                                <span className="font-bold truncate text-[15px]">{name}</span>
                                                {verified && (
                                                    <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-[18px] h-[18px] text-[#1D9BF0] fill-current">
                                                        <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.483-.02.17-.032.34-.032.517 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g>
                                                    </svg>
                                                )}
                                            </div>
                                            <div className={`text-[15px] ${theme === "light" ? "text-[#536471]" : "text-[#71767B]"}`}>@{username}</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-[23px] leading-snug whitespace-pre-wrap break-words font-normal">
                                        {content}
                                    </div>

                                    <div className={`mt-4 text-[15px] font-medium hover:underline cursor-pointer ${theme === "light" ? "text-[#536471]" : "text-[#71767B]"}`}>
                                        {date?.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} · {date?.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>

                                    <div className={`mt-4 py-3 border-t ${theme === "light" ? "border-[#EFF3F4]" : "border-[#2F3336]"} flex gap-6 text-sm`}>
                                        <div><span className={`font-bold ${theme === "light" ? "text-[#0F1419]" : "text-[#E7E9EA]"}`}>{retweets}</span> <span className={`${theme === "light" ? "text-[#536471]" : "text-[#71767B]"}`}>Retweets</span></div>
                                        <div><span className={`font-bold ${theme === "light" ? "text-[#0F1419]" : "text-[#E7E9EA]"}`}>{likes}</span> <span className={`${theme === "light" ? "text-[#536471]" : "text-[#71767B]"}`}>Likes</span></div>
                                    </div>

                                    <div className={`pt-3 border-t ${theme === "light" ? "border-[#EFF3F4] text-[#536471]" : "border-[#2F3336] text-[#71767B]"} flex justify-around`}>
                                        <MessageCircle className="w-5 h-5" />
                                        <Repeat className="w-5 h-5" />
                                        <Heart className="w-5 h-5" />
                                        <div className="flex gap-4">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button onClick={handleDownload} className="w-full h-12 text-lg" disabled={isDownloading}>
                            {isDownloading ? <span className="animate-spin mr-2">⏳</span> : <Download className="mr-2 h-5 w-5" />}
                            {isDownloading ? "Generating Image..." : "Download Tweet Container"}
                        </Button>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <ContentSection
                        title="Fake Tweet Generator Guide"
                        description="Easily create convincing fake tweets for memes, jokes, or social media mockups. Customize every detail from the profile picture to the retweet count."
                        features={[
                            "Light, Dim, and Dark Mode Support",
                            "Custom Verification Badge & Profile Picture",
                            "Real-time Preview with Authentic Fonts",
                            "High-Quality Image Download"
                        ]}
                        faq={[
                            {
                                question: "Is this connected to Twitter?",
                                answer: "No, this is purely a visual generator. It does not post to Twitter/X."
                            },
                        ]}
                    />
                </div>
            </div>
        </ToolWrapper>
    )
}
