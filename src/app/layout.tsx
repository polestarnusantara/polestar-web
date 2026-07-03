import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polestar Indonesia — Edukasi, Bot Trading & Analisa Pasar",
  description:
    "Komunitas edukasi trading Polestar Indonesia. Expert Advisor (STARBOT, TradingMatic, Quadran EA), AI Signal (Gold Mind AI, Finsfree), analisa teknikal harian XAUUSD & WTI, dan sesi live — gratis di Telegram.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
      <body className="min-h-full text-ink font-sans">{children}</body>
    </html>
  );
}
