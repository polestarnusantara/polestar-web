"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Item = { title: string; link: string; description: string; date: string };

// Feed FXStreet ditarik CLIENT-SIDE via rss2json → jalan di browser pengunjung,
// jadi tidak kena blokir IP datacenter Vercel & bypass CORS. Auto-update tiap load.
const FEED = "https://www.fxstreet.com/rss/news";
const ENDPOINT =
  "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(FEED);

function stripHtml(s: string): string {
  return (s || "").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function formatDate(input: string): string {
  const d = new Date(input);
  if (isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Baru saja";
  if (min < 60) return `${min} menit lalu`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} jam lalu`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "Kemarin";
  if (day < 7) return `${day} hari lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function MarketNews() {
  const [items, setItems] = useState<Item[] | null>(null); // null = loading

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);

    fetch(ENDPOINT, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((data) => {
        if (!alive) return;
        const list: Item[] = Array.isArray(data?.items)
          ? data.items.slice(0, 4).map((it: Record<string, string>) => ({
              title: stripHtml(it.title),
              link: it.link,
              description: stripHtml(it.description),
              date: it.pubDate,
            }))
          : [];
        setItems(list);
      })
      .catch(() => {
        if (alive) setItems([]);
      })
      .finally(() => clearTimeout(timer));

    return () => {
      alive = false;
      ctrl.abort();
    };
  }, []);

  return (
    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
      {items === null &&
        [0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl glass p-6 animate-pulse">
            <div className="h-3 w-24 rounded bg-line" />
            <div className="mt-4 h-4 w-full rounded bg-line" />
            <div className="mt-2 h-4 w-3/4 rounded bg-line" />
            <div className="mt-4 h-3 w-full rounded bg-line" />
            <div className="mt-1.5 h-3 w-2/3 rounded bg-line" />
          </div>
        ))}

      {items?.map((n) => (
        <article
          key={n.link}
          className="group rounded-xl glass p-6 hover:bg-white/75 transition-colors duration-200"
        >
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded bg-brand-tint text-brand-dark px-1.5 py-0.5">FXStreet</span>
            <span className="text-faint">{formatDate(n.date)}</span>
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold tracking-tight leading-snug line-clamp-3">
            {n.title}
          </h3>
          {n.description && (
            <p className="mt-2.5 text-sm text-steel leading-relaxed line-clamp-3">{n.description}</p>
          )}
          <a
            href={n.link}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all cursor-pointer"
          >
            Baca selengkapnya <Arrow className="h-4 w-4" />
          </a>
        </article>
      ))}

      {/* Kartu CTA — selalu tampil, mengarahkan ke briefing komunitas */}
      <article className="group rounded-xl bg-brand-deep text-white p-6 sm:col-span-2">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="rounded bg-white/15 text-white px-1.5 py-0.5">POLESTAR</span>
          <span className="text-white/60">SETIAP HARI</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight leading-snug">
          Briefing &amp; analisa harian XAUUSD/WTI
        </h3>
        <p className="mt-2.5 text-sm text-white/70 leading-relaxed">
          Berita di atas diperbarui otomatis. Untuk pembahasan lengkap, level penting, dan agenda
          ekonomi berdampak tinggi — ikuti sesi harian di grup Telegram kami.
        </p>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:gap-2.5 transition-all cursor-pointer"
        >
          Gabung Telegram <Arrow className="h-4 w-4" />
        </a>
      </article>
    </div>
  );
}
