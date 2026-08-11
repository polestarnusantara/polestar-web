import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://polestarnusantara.com"),
  title: {
    default: "Polestar Inovasi Nusantara — B2B Event Organizer Profesional",
    template: "%s | Polestar Inovasi Nusantara"
  },
  description:
    "Polestar Inovasi Nusantara adalah agensi B2B Event Organizer profesional yang menangani Corporate Exhibitions, Brand Activations, Seminars & Workshops dengan eksekusi premium.",
  keywords: ["Event Organizer B2B", "Corporate Exhibitions", "Brand Activations", "Event Management", "Polestar Inovasi Nusantara", "Edukasi Corporate"],
  openGraph: {
    title: "Polestar Inovasi Nusantara — B2B Event Organizer",
    description: "Agensi B2B Event Organizer profesional untuk eksekusi event korporat yang premium dan terpercaya.",
    url: "https://polestarnusantara.com",
    siteName: "Polestar Inovasi Nusantara",
    locale: "id_ID",
    type: "website",
  }
};

export const viewport: Viewport = {
  themeColor: "#080d18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        {/* Tanpa JS, konten .reveal tetap tampil penuh (fail-open) */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://s3.tradingview.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full text-ink font-sans">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
