"use client";

import { useEffect, useRef } from "react";

type Props = {
  widget: string;
  config: Record<string, unknown>;
  height?: number | string;
  className?: string;
};

/** Memuat widget TradingView (script embed) di sisi klien saja. */
export default function TradingViewWidget({
  widget,
  config,
  height = "100%",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !ref.current) return;
    injected.current = true;

    const container = document.createElement("div");
    container.className = "tradingview-widget-container";
    container.style.height = "100%";

    const inner = document.createElement("div");
    inner.className = "tradingview-widget-container__widget";
    inner.style.height = "100%";
    container.appendChild(inner);

    const script = document.createElement("script");
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${widget}.js`;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);

    ref.current.appendChild(container);
  }, [widget, config]);

  return <div ref={ref} style={{ height }} className={className} />;
}
