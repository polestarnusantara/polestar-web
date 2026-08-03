"use client";

import { useState } from "react";
import MarketNews from "./MarketNews";
import TelegramNews from "./TelegramNews";
import TradingViewWidget from "./TradingViewWidget";

const TABS = [
  { id: "telegram", label: "Telegram Polestar", icon: "tg" },
  { id: "fxstreet", label: "Berita Global", icon: "globe" },
] as const;

function TelegramTabIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
    </svg>
  );
}

export default function NewsTabs() {
  const [active, setActive] = useState<"telegram" | "fxstreet">("telegram");

  return (
    <>
      {/* Tab buttons */}
      <div className="reveal mt-8 flex gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
              active === tab.id
                ? "bg-gradient-to-r from-brand to-brand-dark text-white shadow-[0_0_16px_rgba(74,171,184,0.2)]"
                : "glass text-steel hover:text-ink hover:bg-white/[0.06]"
            }`}
          >
            {tab.icon === "tg" ? (
              <TelegramTabIcon className="h-4 w-4" />
            ) : (
              <GlobeIcon className="h-4 w-4" />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-8">
        {active === "telegram" && <TelegramNews />}

        {active === "fxstreet" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <MarketNews />
            <div className="rounded-xl glass overflow-hidden">
              <div className="px-5 py-4 border-b border-line text-sm font-semibold text-ink">
                Berita Pasar Global
              </div>
              <TradingViewWidget
                widget="timeline"
                height={520}
                config={{
                  feedMode: "all_symbols",
                  isTransparent: true,
                  displayMode: "regular",
                  width: "100%",
                  height: "100%",
                  colorTheme: "dark",
                  locale: "id",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
