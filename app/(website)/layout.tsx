import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { getOrganizationSchema } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Xconcile | Professional Accounting & Financial Services",
    template: "%s | Xconcile",
  },
  description:
    "Strategic B2B partnerships and professional solutions for your business. We deliver expert guidance, global expertise, and innovative strategies for growth.",
  keywords: ["business", "consulting", "professional services", "solutions", "strategy", "growth", "B2B"],
  authors: [{ name: "Xconcile" }],
  creator: "Xconcile",
  publisher: "Xconcile",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://xconcile.com"
  ),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://xconcile.com",
    siteName: "Xconcile",
    title: "Xconcile | Professional Accounting & Financial Services",
    description:
      "Strategic B2B partnerships and professional solutions for your business. We deliver expert guidance, global expertise, and innovative strategies for growth.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xconcile - Professional Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xconcile | Professional Accounting & Financial Services",
    description:
      "Strategic B2B partnerships and professional solutions for your business. We deliver expert guidance, global expertise, and innovative strategies for growth.",
    images: ["/og-image.png"],
    creator: "@xconcile",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: ["/favicon.ico", "/logo-icon-refined.png"],
    shortcut: "/logo-icon-refined.png",
    apple: "/logo-icon-refined.png",
  },
  verification: {
    google: "zzIyWkg7jUhAgdRPn1TfTvBUkaG3cB5dIuXgsK4Dv9A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="google-site-verification" content="zzIyWkg7jUhAgdRPn1TfTvBUkaG3cB5dIuXgsK4Dv9A" />
        {/* Google Tag Manager - Placed directly in head for verification */}
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WRRFT9ZZ');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-screen antialiased flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRRFT9ZZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
