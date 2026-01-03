"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Upload, ThumbsUp, MessageCircle, Share2, Globe, MoreHorizontal, Shuffle, Send, Image as ImageIcon, Heart } from "lucide-react"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ContentSection } from "@/components/tools/ContentSection"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toPng } from "html-to-image"

export default function LinkedinPostGeneratorClient() {
    const [username, setUsername] = useState("Alex Johnson")
    const [headline, setHeadline] = useState("Senior Software Engineer at TechCorp")
    const [timeAgo, setTimeAgo] = useState("1w")
    const [caption, setCaption] = useState("Excited to announce that I've just launched a new project! 🚀 It's been a long journey but totally worth it. #webdev #launch #coding")
    const [likes, setLikes] = useState("1,542")
    const [comments, setComments] = useState("324")
    const [reposts, setReposts] = useState("58")
    const [darkMode, setDarkMode] = useState(false)
    const [connectionDegree, setConnectionDegree] = useState("1st")
    const [background, setBackground] = useState<string>("linear-gradient(to right, #0077b5, #00a0dc)")
    const [isGlass, setIsGlass] = useState(false)

    // UI State
    const [avatarUrl, setAvatarUrl] = useState<string>("")
    const [postImageUrl, setPostImageUrl] = useState<string>("https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3")
    const [isDownloading, setIsDownloading] = useState(false)
    const [mounted, setMounted] = useState(false)

    const postRef = useRef<HTMLDivElement>(null)
    const avatarInputRef = useRef<HTMLInputElement>(null)
    const postImageInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleDownload = async () => {
        if (!postRef.current) return
        setIsDownloading(true)
        try {
            const dataUrl = await toPng(postRef.current, {
                cacheBust: true,
                backgroundColor: 'transparent',
            })

            const link = document.createElement("a")
            link.href = dataUrl
            link.download = `linkedin-post-${username}-${Date.now()}.png`
            link.click()
        } catch (err) {
            console.error("Failed to generate image", err)
            if (err instanceof Error && err.message.includes("lab")) {
                alert("Browser compatibility issue with color formats. Please try a different browser or theme.")
            } else {
                alert("Failed to generate image. Please try again.")
            }
        } finally {
            setIsDownloading(false)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => setter(e.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    const currentAvatar = avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`

    // Background presets
    const backgrounds = [
        { name: "LinkedIn Blue", value: "linear-gradient(to right, #0077b5, #00a0dc)" },
        { name: "Professional Grey", value: "linear-gradient(to right, #2c3e50, #bdc3c7)" },
        { name: "Clean", value: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)" },
        { name: "Solid Black", value: "#000000" },
        { name: "Solid White", value: "#ffffff" },
        { name: "Transparent", value: "transparent" },
    ]

    if (!mounted) return null

    return (
        <ToolWrapper
            title="Fake LinkedIn Post Generator"
            description="Create professional-looking LinkedIn posts for mockups or educational purposes."
            toolSlug="linkedin-post-generator"
        >
            <div className="grid lg:grid-cols-[400px_1fr] gap-8">
                {/* Controls Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Details</CardTitle>
                            <CardDescription>Customize your LinkedIn post.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Post Image (Optional)</Label>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" size="sm" onClick={() => postImageInputRef.current?.click()} className="w-full">
                                        <Upload className="w-4 h-4 mr-2" /> Upload Image
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setPostImageUrl("")} className="w-full text-red-500 hover:text-red-600">
                                        Remove Image
                                    </Button>
                                    <input ref={postImageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setPostImageUrl)} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Profile Picture</Label>
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-10 h-10 border">
                                        <AvatarImage src={currentAvatar} />
                                        <AvatarFallback>{username[0]}</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" size="sm" onClick={() => avatarInputRef.current?.click()}>
                                        <Upload className="w-4 h-4 mr-2" /> Upload
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => {
                                        const randomSeed = Math.random().toString(36).substring(7)
                                        setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`)
                                    }}>
                                        <Shuffle className="w-4 h-4 mr-2" /> Random
                                    </Button>
                                    <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setAvatarUrl)} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <Label>Headline</Label>
                                <Input value={headline} onChange={(e) => setHeadline(e.target.value)} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Time Ago</Label>
                                    <Input value={timeAgo} onChange={(e) => setTimeAgo(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Connection</Label>
                                    <Select value={connectionDegree} onValueChange={setConnectionDegree}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Degree" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st">1st</SelectItem>
                                            <SelectItem value="2nd">2nd</SelectItem>
                                            <SelectItem value="3rd">3rd+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Post Text</Label>
                                <Textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="h-24 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Likes</Label>
                                    <Input value={likes} onChange={(e) => setLikes(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Comments</Label>
                                    <Input value={comments} onChange={(e) => setComments(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Reposts</Label>
                                    <Input value={reposts} onChange={(e) => setReposts(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <Label className="cursor-pointer" htmlFor="darkmode">Dark Mode</Label>
                                <Switch id="darkmode" checked={darkMode} onCheckedChange={setDarkMode} />
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
                                ref={postRef}
                                className="p-12 w-full flex justify-center items-center min-h-[300px] transition-all duration-300"
                                style={{ background: background }}
                            >
                                <div
                                    style={{
                                        // Override global CSS variables for safety
                                        display: 'block',
                                        ['--border' as any]: darkMode ? '#38434f' : '#e0e0e0',
                                        ['--background' as any]: darkMode ? '#1b1f23' : '#ffffff',
                                        ['--foreground' as any]: darkMode ? '#ffffff' : '#000000',
                                        fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto',

                                        // Glass effect styles
                                        ...(isGlass ? {
                                            backgroundColor: darkMode ? 'rgba(27, 31, 35, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                                            backdropFilter: 'blur(12px)',
                                            WebkitBackdropFilter: 'blur(12px)', // Safari support
                                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                            border: '1px solid rgba(255, 255, 255, 0.18)',
                                        } : {})
                                    }}
                                    className={`w-full max-w-[500px] rounded-lg shadow-sm border overflow-hidden transition-all duration-200 ${!isGlass ? (
                                        darkMode ? "bg-[#1b1f23] text-white border-[#38434f]" : "bg-white text-black border-[#e0e0e0]"
                                    ) : (
                                        darkMode ? "text-white border-white/10" : "text-black border-white/20"
                                    )
                                        }`}
                                >
                                    {/* Header */}
                                    <div className="p-3 flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border shrink-0 border-gray-200">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={currentAvatar}
                                                    alt={username}
                                                    crossOrigin="anonymous"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col leading-tight">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-semibold text-sm hover:underline hover:text-blue-600 cursor-pointer">{username}</span>
                                                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>• {connectionDegree}</span>
                                                </div>
                                                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} line-clamp-1`}>{headline}</span>
                                                <div className={`flex items-center gap-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    <span>{timeAgo}</span>
                                                    <span aria-hidden="true">•</span>
                                                    <Globe className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                        <MoreHorizontal className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="px-3 pb-2 text-sm whitespace-pre-wrap">
                                        {caption}
                                    </div>

                                    {/* Image */}
                                    {postImageUrl && (
                                        <div className="relative w-full bg-gray-100 mt-1">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={postImageUrl}
                                                alt="Post content"
                                                crossOrigin="anonymous"
                                                className="w-full h-auto object-cover max-h-[600px]"
                                            />
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="px-3 py-2 flex items-center justify-between text-xs border-b" style={{ borderColor: darkMode ? '#38434f' : '#e0e0e0' }}>
                                        <div className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            <div className="flex -space-x-1">
                                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white z-20">
                                                    <ThumbsUp className="w-2 h-2 text-white fill-current" />
                                                </div>
                                                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white z-10">
                                                    <Heart className="w-2 h-2 text-white fill-current" />
                                                </div>
                                            </div>
                                            <span className="ml-1 hover:underline hover:text-blue-600 cursor-pointer">{likes}</span>
                                        </div>
                                        <div className={`flex gap-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            <span className="hover:underline hover:text-blue-600 cursor-pointer">{comments} comments</span>
                                            <span>•</span>
                                            <span className="hover:underline hover:text-blue-600 cursor-pointer">{reposts} reposts</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="px-2 py-1 flex items-center justify-between">
                                        <Button variant="ghost" className={`flex-1 gap-2 h-10 text-sm font-semibold ${darkMode ? "text-gray-300 hover:bg-[#38434f]" : "text-gray-600 hover:bg-gray-100"}`}>
                                            <ThumbsUp className="w-5 h-5" /> Like
                                        </Button>
                                        <Button variant="ghost" className={`flex-1 gap-2 h-10 text-sm font-semibold ${darkMode ? "text-gray-300 hover:bg-[#38434f]" : "text-gray-600 hover:bg-gray-100"}`}>
                                            <MessageCircle className="w-5 h-5" /> Comment
                                        </Button>
                                        <Button variant="ghost" className={`flex-1 gap-2 h-10 text-sm font-semibold ${darkMode ? "text-gray-300 hover:bg-[#38434f]" : "text-gray-600 hover:bg-gray-100"}`}>
                                            <Share2 className="w-5 h-5" /> Repost
                                        </Button>
                                        <Button variant="ghost" className={`flex-1 gap-2 h-10 text-sm font-semibold ${darkMode ? "text-gray-300 hover:bg-[#38434f]" : "text-gray-600 hover:bg-gray-100"}`}>
                                            <Send className="w-5 h-5" /> Send
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Button onClick={handleDownload} className="w-full h-12 text-lg" disabled={isDownloading}>
                            {isDownloading ? <span className="animate-spin mr-2">⏳</span> : <Download className="mr-2 h-5 w-5" />}
                            {isDownloading ? "Generating Image..." : "Download Post"}
                        </Button>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <ContentSection
                        title="About LinkedIn Post Generator"
                        description="Craft professional-looking LinkedIn mockups to visualize your personal brand or test content ideas. Customize your headline, connections, and engagement."
                        features={[
                            "Custom Headlines & Connections",
                            "Dark & Light Mode Support",
                            "Realistic Reactions & Stats",
                            "Professional Layout"
                        ]}
                        faq={[
                            {
                                question: "Is this tool free?",
                                answer: "Yes, it is completely free to use."
                            },
                            {
                                question: "Can I customize the profile picture?",
                                answer: "Yes, you can upload your own image or generate a random one."
                            }
                        ]}
                    />
                </div>
            </div>
        </ToolWrapper>
    )
}
