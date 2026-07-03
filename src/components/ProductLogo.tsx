"use client";

import { useState } from "react";

function IconEA({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="5" y="7" width="14" height="12" rx="2" />
      <path strokeLinecap="round" d="M9 3v4M15 3v4M9 19v2M15 19v2M2 11h3M2 15h3M19 11h3M19 15h3" />
      <circle cx="10" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconAI({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l2.5-6 5 16 2.5-10H21" />
    </svg>
  );
}

type Props = { logo?: string; category: string; accent: string; name: string };

/** Menampilkan logo produk; jika file logo belum ada / gagal dimuat → ikon kategori. */
export default function ProductLogo({ logo, category, accent, name }: Props) {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-white/60 bg-white/80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={`Logo ${name}`}
          width={48}
          height={48}
          loading="lazy"
          className="h-full w-full object-contain p-1"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }

  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
      style={{ backgroundColor: accent + "1A", color: accent }}
    >
      {category === "AI Signal" ? <IconAI className="h-5 w-5" /> : <IconEA className="h-5 w-5" />}
    </span>
  );
}
