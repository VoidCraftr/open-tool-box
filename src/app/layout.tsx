import { Geist, Geist_Mono, Nothing_You_Could_Do } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Shell } from "@/components/layout/Shell";
import { CommandMenu } from "@/components/common/CommandMenu";
import { AuthProvider } from "@/components/premium/AuthProvider";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { AdSenseScript } from "@/components/ads/AdSense";
import { generateOrganizationSchema, generateWebApplicationSchema } from "@/config/seo.config";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nothingYouCouldDo = Nothing_You_Could_Do({
  variable: "--font-nothing-you-could-do",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opentoolbox.online"),
  title: {
    default: "OpenToolBox - Free Online Developer & Security Tools",
    template: "%s | OpenToolBox"
  },
  description: "OpenToolBox: 56+ free online tools for developers, designers, and creators. JSON formatter, image converter, video enhancer, watermark remover, password generator, and more. Privacy-focused with client-side processing. Ad-supported to stay free forever.",
  keywords: [
    // Brand & Core
    "opentoolbox", "free online tools", "developer tools", "media tools", "privacy tools", "free tools online", "web tools", "online utilities",

    // Developer Tools (30+ keywords)
    "json formatter", "json validator", "json minifier", "beautify json", "format json online", "json prettifier",
    "sql formatter", "sql beautifier", "prettify sql", "format sql online", "sql query formatter",
    "jwt decoder", "jwt debugger", "decode jwt token", "jwt token decoder online", "json web token decoder",
    "uuid generator", "guid generator", "unique id generator", "uuid v4 generator", "generate uuid online",
    "base64 encoder", "base64 decoder", "encode base64", "decode base64 online", "base64 converter",
    "url encoder", "url decoder", "percent encoding", "url encode online", "uri encoder",
    "cron generator", "cron expression", "crontab generator", "cron schedule generator online",
    "css flexbox", "flexbox playground", "flexbox generator", "css flexbox tool",
    "keycode finder", "javascript keycode", "key event viewer",

    // Media Tools (40+ keywords)
    "image converter", "convert image online", "jpg to png", "png to webp", "webp converter", "image format converter", "convert jpg to png online",
    "image resizer", "resize image online", "image dimensions", "photo resizer", "resize photo online free",
    "svg to png", "svg converter", "vector to raster", "convert svg to png online", "svg to jpg converter",
    "video enhancer", "enhance video quality", "upscale video", "video quality improver", "improve video quality online", "video upscaler", "ai video enhancer",
    "photo enhancer", "enhance photo", "improve image quality", "ai photo enhancement", "photo quality improver", "enhance image online", "image enhancer ai",
    "watermark remover", "remove watermark", "erase watermark", "watermark eraser online", "remove watermark from image", "watermark removal tool", "delete watermark",
    "image editor", "photo editor", "edit image online", "online photo editor free", "free image editor", "edit photos online free", "picture editor",
    "youtube thumbnail downloader", "download youtube thumbnail", "youtube thumbnail grabber", "yt thumbnail download",

    // PDF Tools (15+ keywords)
    "sign pdf", "pdf signature", "sign pdf online", "digital signature", "pdf signer online free", "esign pdf",
    "image to pdf", "convert image to pdf", "jpg to pdf", "png to pdf converter", "photo to pdf online",
    "pdf tools", "pdf converter", "online pdf tools", "signature generator", "create signature online",

    // Security Tools (15+ keywords)
    "password generator", "strong password", "random password generator", "secure password", "generate password online", "password creator",
    "password strength checker", "check password strength", "password validator", "test password strength", "password security checker",

    // Design Tools (15+ keywords)
    "css box shadow generator", "box shadow css", "shadow generator", "box shadow tool", "css shadow maker",
    "gradient generator", "css gradient", "linear gradient generator", "gradient maker", "css gradient tool",
    "flexbox playground", "css flexbox", "flexbox generator",

    // Social Tools (20+ keywords)
    "social media preview", "og tag validator", "meta tag checker", "open graph preview", "social preview tool",
    "instagram post generator", "fake instagram post", "instagram mockup", "instagram post creator", "fake insta post maker",
    "tweet to image", "twitter screenshot", "tweet screenshot", "convert tweet to image",
    "whatsapp link generator", "whatsapp click to chat", "wa link generator", "create whatsapp link",
    "instagram hashtags", "hashtag generator", "instagram hashtag tool",
    "facebook post generator", "fake facebook post", "linkedin post generator",

    // Text Tools (15+ keywords)
    "word counter", "character counter", "word count tool", "count characters online", "text counter",
    "markdown editor", "markdown preview", "md editor online",
    "diff viewer", "text diff", "compare text online", "text comparison tool",
    "lorem ipsum generator", "placeholder text", "dummy text generator",
    "case converter", "text case converter", "uppercase lowercase converter",
    "text to handwriting", "handwriting generator",

    // General & Productivity (20+ keywords)
    "qr code generator", "create qr code", "qr code maker", "generate qr code online", "qr generator free",
    "unit converter", "convert units", "measurement converter", "unit conversion tool",
    "pomodoro timer", "focus timer", "productivity timer", "pomodoro technique timer",
    "bmi calculator", "body mass index", "calculate bmi", "bmi calc online",
    "loan calculator", "emi calculator", "loan emi", "calculate loan payment",
    "age calculator", "calculate age", "age in days", "how old am i",
    "percentage calculator", "calculate percentage", "percentage finder",
    "stopwatch", "online stopwatch", "timer online",
    "list randomizer", "random list generator", "shuffle list",

    // Technical & Privacy
    "client side tools", "browser based tools", "privacy focused tools", "offline tools", "secure online tools",
    "no server processing", "local processing", "safe online tools", "free tools with ads", "ad-supported free tools",

    // Conversational / Long-tail Queries (NEW)
    "how to format json online free", "best free online tools no download", "free image editor no sign up",
    "password generator without account", "secure tools that dont upload files", "tools for developers free",
    "how do i enhance photos without photoshop", "what is the best free qr code generator",
    "can i remove watermarks for free", "how to convert images without quality loss",
    "best privacy-first online tools", "free tools for freelancers", "online tools for students",
    "developer utilities browser based", "image tools for social media", "business document templates free",
    "tools that work offline", "no registration online tools", "client-side image processing",
    "free invoice generator with tax support", "ai photo enhancer free no watermark",
    "convert video quality online free", "design tools for beginners", "free alternative to paid tools",
    "how to improve blurry photos free", "best json validator online", "password strength tester free",
    "create professional invoices online", "pdf signer no email required", "qr code with custom logo",
    "social media mockup generator", "instagram post preview tool", "free css generator tools",
    "text formatting utilities online", "unit conversion calculator", "productivity timer for work"
  ],
  authors: [{ name: "VoidCraftr", url: "https://github.com/voidcraftr" }],
  creator: "VoidCraftr",
  publisher: "OpenToolBox",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://opentoolbox.online",
    title: "OpenToolBox - Free Online Developer & Security Tools",
    description: "Secure, fast, and free online tools for developers and creators. Privacy-focused with client-side processing.",
    siteName: "OpenToolBox",
  },
  alternates: {
    canonical: './',
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenToolBox - Free Online Developer Tools",
    description: "Secure, fast, and free online tools. Privacy-focused client-side processing.",
    creator: "@voidcraftr",
  },
  icons: {
    shortcut: "/assets/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate JSON-LD schemas
  const organizationSchema = generateOrganizationSchema();
  const webAppSchema = generateWebApplicationSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nothingYouCouldDo.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CommandMenu />
            <Shell>
              {children}
            </Shell>
            <MicrosoftClarity />
            <GoogleAnalytics />
            <AdSenseScript />
          </AuthProvider>
        </ThemeProvider>
      </body>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7580545209042591"
        crossOrigin="anonymous"></script>
    </html>
  );
}
