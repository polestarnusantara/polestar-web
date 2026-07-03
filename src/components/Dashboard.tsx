"use client";

import { useState } from "react";
import TradingViewWidget from "./TradingViewWidget";

const TABS = [
  { group: "gold", label: "Emas · XAUUSD", symbol: "OANDA:XAUUSD" },
  { group: "oil", label: "Minyak · WTI", symbol: "TVC:USOIL" },
  { group: "forex", label: "Forex · EURUSD", symbol: "OANDA:EURUSD" },
  { group: "crypto", label: "Crypto · BTCUSD", symbol: "BINANCE:BTCUSDT" },
];

export default function Dashboard() {
  const [active, setActive] = useState(TABS[0]);

  const chartConfig = {
    autosize: true,
    symbol: active.symbol,
    interval: "60",
    timezone: "Asia/Jakarta",
    theme: "light",
    style: "1",
    locale: "id",
    allow_symbol_change: true,
    calendar: false,
    hide_side_toolbar: false,
    backgroundColor: "#FFFFFF",
    gridColor: "rgba(15,23,42,0.06)",
    support_host: "https://www.tradingview.com",
  };

  const taConfig = {
    interval: "1h",
    width: "100%",
    height: "100%",
    isTransparent: true,
    symbol: active.symbol,
    showIntervalTabs: true,
    displayMode: "single",
    locale: "id",
    colorTheme: "light",
  };

  return (
    <div>
      <div className="flex flex-wrap border-b border-line" role="tablist" aria-label="Pilih instrumen">
        {TABS.map((t) => (
          <button
            key={t.group}
            role="tab"
            aria-selected={active.group === t.group}
            className="tv-tab"
            onClick={() => setActive(t)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl glass overflow-hidden" style={{ minHeight: 480 }}>
          <TradingViewWidget
            key={`chart-${active.group}`}
            widget="advanced-chart"
            config={chartConfig}
            height={480}
          />
        </div>
        <div className="rounded-xl glass overflow-hidden">
          <div className="px-5 py-3 border-b border-line text-sm font-semibold">
            Ringkasan Teknikal
          </div>
          <TradingViewWidget
            key={`ta-${active.group}`}
            widget="technical-analysis"
            config={taConfig}
            height={430}
          />
        </div>
      </div>
    </div>
  );
}
