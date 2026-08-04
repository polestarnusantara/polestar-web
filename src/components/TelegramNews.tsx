"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Message = {
  id: string;
  date: string;
  text: string;
  views: string;
};

function formatDate(input: string): string {
  if (!input) return "";
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
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    </svg>
  );
}

/** Truncate text but keep first N characters with smart cutoff */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut) + "…";
}

/** Extract first line as title */
function extractTitle(text: string): { title: string; body: string } {
  const lines = text.split("\n").filter((l) => l.trim());
  const title = lines[0] || "";
  const body = lines.slice(1).join("\n").trim();
  return { title, body };
}

export default function TelegramNews() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);

    fetch("/api/telegram", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad"))))
      .then((data) => {
        if (!alive) return;
        setMessages(data.messages || []);
      })
      .catch(() => {
        if (alive) {
          setMessages([]);
          setError(true);
        }
      })
      .finally(() => clearTimeout(timer));

    return () => {
      alive = false;
      ctrl.abort();
    };
  }, []);

  const channel = "grwindonesia";

  // Loading skeleton
  if (messages === null) {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl glass p-6 animate-pulse">
            <div className="h-3 w-20 rounded bg-white/10" />
            <div className="mt-4 h-5 w-full rounded bg-white/10" />
            <div className="mt-2 h-4 w-3/4 rounded bg-white/10" />
            <div className="mt-4 h-3 w-full rounded bg-white/10" />
            <div className="mt-1.5 h-3 w-2/3 rounded bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  // Error / empty state
  if (error || messages.length === 0) {
    return (
      <div className="rounded-xl glass gradient-border p-8 text-center">
        <TelegramIcon className="h-10 w-10 mx-auto text-brand-light" />
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">
          Belum ada update
        </h3>
        <p className="mt-2 text-sm text-steel max-w-md mx-auto">
          Update harian dari channel Telegram Polestar Indonesia akan muncul di
          sini. Gabung channel untuk notifikasi real-time.
        </p>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-5 py-3 text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(74,171,184,0.3)] transition-all duration-300"
        >
          <TelegramIcon className="h-4 w-4" />
          Gabung Telegram
        </a>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {messages.slice(0, 6).map((msg) => {
        const { title, body } = extractTitle(msg.text);
        const postUrl = `https://t.me/${channel}/${msg.id}`;

        return (
          <article
            key={msg.id}
            className="group rounded-xl glass p-5 card-float flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="flex items-center gap-1 rounded bg-brand-tint text-brand-light px-1.5 py-0.5">
                  <TelegramIcon className="h-3 w-3" />
                  Polestar
                </span>
                <span className="text-faint">{formatDate(msg.date)}</span>
              </div>
              {msg.views && (
                <span className="flex items-center gap-1 text-xs text-faint">
                  <EyeIcon className="h-3 w-3" />
                  {msg.views}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="mt-3 font-display text-[0.95rem] font-semibold tracking-tight leading-snug text-ink line-clamp-2">
              {truncate(title, 80)}
            </h3>

            {/* Body preview */}
            {body && (
              <p className="mt-2 text-sm text-steel leading-relaxed line-clamp-3 whitespace-pre-line">
                {truncate(body, 180)}
              </p>
            )}

            {/* Link */}
            <a
              href={postUrl}
              target="_blank"
              rel="noopener"
              className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light hover:gap-2.5 transition-all cursor-pointer"
            >
              Baca di Telegram <Arrow className="h-4 w-4" />
            </a>
          </article>
        );
      })}

      {/* CTA card */}
      <article className="rounded-xl bg-gradient-to-br from-brand-deep via-[#0f2a3d] to-[#0B1929] border border-brand/20 text-white p-5 sm:col-span-2 flex items-center gap-5 flex-wrap">
        <TelegramIcon className="h-8 w-8 text-brand-light flex-none" />
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-display text-base font-semibold">
            Dapatkan update lebih cepat
          </h3>
          <p className="mt-1 text-sm text-white/60">
            Analisa harian, sinyal AI, dan diskusi langsung di channel Telegram.
          </p>
        </div>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-4 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(74,171,184,0.3)] transition-all duration-300"
        >
          Gabung <Arrow className="h-4 w-4" />
        </a>
      </article>
    </div>
  );
}
