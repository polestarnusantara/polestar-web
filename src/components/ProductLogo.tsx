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

/**
 * Menampilkan logo produk pada tile GELAP (sesuai desain logo yang dibuat
 * untuk latar gelap → teks putih/emas tetap terbaca) dan berukuran besar.
 * Jika file logo gagal dimuat → fallback ke ikon kategori.
 */
export default function ProductLogo({ logo, category, accent, name }: Props) {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      <span className="inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-deep to-ink shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={`Logo ${name}`}
          width={80}
          height={80}
          loading="lazy"
          className="h-full w-full object-contain p-2"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }

  return (
    <span
      className="inline-flex h-20 w-20 items-center justify-center rounded-2xl"
      style={{ backgroundColor: accent + "1A", color: accent }}
    >
      {category === "AI Signal" ? <IconAI className="h-9 w-9" /> : <IconEA className="h-9 w-9" />}
    </span>
  );
}
