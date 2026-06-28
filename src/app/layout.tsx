import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mihirborsaniya.dev"),
  title: {
    default: "Mihir Borsaniya — Full Stack ERP Engineer & SaaS Architect",
    template: "%s | Mihir Borsaniya",
  },
  description:
    "Full Stack ERP Engineer specializing in multi-tenant SaaS platforms, enterprise ERP systems, production-grade backend architectures, and DevOps. 3+ years building business-critical software.",
  keywords: [
    "Full Stack ERP Engineer",
    "SaaS Developer",
    "Multi-Tenant SaaS Architect",
    "Node.js Developer",
    "React Developer",
    "ERP Software Engineer",
    "Backend Engineering",
    "Mihir Borsaniya",
    "AksharPOS",
    "TypeScript Developer",
    "MySQL Developer",
    "DevOps Engineer",
    "Razorpay Integration",
    "Enterprise Software",
  ],
  authors: [{ name: "Mihir Borsaniya", url: "https://mihirborsaniya.dev" }],
  creator: "Mihir Borsaniya",
  publisher: "Mihir Borsaniya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mihirborsaniya.dev",
    siteName: "Mihir Borsaniya",
    title: "Mihir Borsaniya — Full Stack ERP Engineer & SaaS Architect",
    description:
      "Building enterprise ERP platforms, multi-tenant SaaS systems, and production-grade backend architectures. 3+ years of real-world engineering impact.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mihir Borsaniya — Full Stack ERP Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mihir Borsaniya — Full Stack ERP Engineer & SaaS Architect",
    description:
      "Building enterprise ERP platforms, multi-tenant SaaS systems, and production-grade backend architectures.",
    images: ["/og-image.png"],
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
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://mihirborsaniya.dev",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08080f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mihir Borsaniya",
              url: "https://mihirborsaniya.dev",
              jobTitle: "Full Stack Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Logicode Software LLP",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Surat",
                addressRegion: "Gujarat",
                addressCountry: "IN",
              },
              description:
                "Full Stack ERP Engineer specializing in multi-tenant SaaS platforms, enterprise ERP systems, and production-grade backend architectures.",
              knowsAbout: [
                "Node.js",
                "React.js",
                "Next.js",
                "TypeScript",
                "MySQL",
                "ERP Systems",
                "SaaS Architecture",
                "DevOps",
                "Razorpay",
              ],
              sameAs: [
                "https://github.com/MihirStack",
                "https://linkedin.com/in/mihirborsaniya",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111124",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#f1f5f9",
            },
          }}
        />
      </body>
    </html>
  );
}
