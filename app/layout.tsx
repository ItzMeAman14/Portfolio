import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { ClientProviders } from "@/components/layout/ClientProviders";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* CHANGE: single source for the site URL (set NEXT_PUBLIC_SITE_URL in .env and in Vercel) */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const siteTitle = "Aman Rehman | Salesforce Developer & Forward Deployed Engineer";
const siteDescription =
  "Salesforce Developer and Forward Deployed Engineer delivering production solutions with Apex, Lightning Web Components (LWC), Flow, Agentforce, Prompt Builder, Data Cloud/Data 360, and Marketing Cloud Next.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#07080F",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Aman Rehman",
  },
  description: siteDescription,
  keywords: [
    "Aman Rehman",
    "Salesforce Developer",
    "Forward Deployed Engineer",
    "Agentforce",
    "Lightning Web Components",
    "Apex",
    "Data Cloud",
    "Marketing Cloud Next",
  ],
  authors: [{ name: "Aman Rehman", url: siteUrl }],
  creator: "Aman Rehman",
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Aman Rehman",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

/* CHANGE: structured data so Google understands who you are */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aman Rehman",
  jobTitle: "Salesforce Developer & Forward Deployed Engineer",
  worksFor: { "@type": "Organization", name: "Astrea IT Services" },
  url: siteUrl,
  email: "mailto:amanrehman2020@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/aman-rehman-dev",
    "https://www.salesforce.com/trailblazer/amanrehman",
    "https://github.com/ItzMeAman14", 
  ],
  knowsAbout: [
    "Salesforce",
    "Apex",
    "Lightning Web Components",
    "Agentforce",
    "Data Cloud",
    "Marketing Cloud Next",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}