"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface PortfolioItem {
  src: string;
  label: string;
  category: string;
}

export default function PortfolioGrid({
  sasImages,
  btsImages,
}: {
  sasImages: PortfolioItem[];
  btsImages: PortfolioItem[];
}) {
  const allImages = [...sasImages, ...btsImages];
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i === 0 ? allImages.length - 1 : i - 1)),
    [allImages.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i === allImages.length - 1 ? 0 : i + 1)),
    [allImages.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  const openAt = (globalIndex: number) => {
    setIdx(globalIndex);
    setOpen(true);
  };

  const img = allImages[idx];

  return (
    <>
      {/* Event SAS Jogja - Bento Grid */}
      <div className="reveal mb-6">
        <h3 className="font-display text-lg font-semibold text-ink mb-1">Event SAS Jogja</h3>
        <p className="text-sm text-faint">Corporate Event</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
        {sasImages.map((item, i) => {
          const isFirst = i === 0;
          const isLast = i === sasImages.length - 1;
          let extraClass = "";
          if (isFirst) extraClass = "col-span-2 row-span-2 aspect-square md:aspect-auto";
          else if (isLast) extraClass = "col-span-2 aspect-[8/3]";
          else extraClass = "aspect-[4/3]";

          return (
            <button
              key={i}
              onClick={() => openAt(i)}
              className={`reveal d${(i % 3) + 1} group relative ${extraClass} rounded-2xl overflow-hidden glass gradient-border card-float cursor-pointer text-left`}
            >
              <Image
                src={`/portfolio/${item.src}`}
                alt={`${item.label} ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={isFirst || isLast ? "(max-width: 768px) 100vw, 50vw" : "25vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="text-white font-display font-semibold text-lg">{item.label}</p>
                <p className="text-white/70 text-sm">{item.category}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Behind The Scenes */}
      <div className="reveal mb-6">
        <h3 className="font-display text-lg font-semibold text-ink mb-1">Behind The Scenes</h3>
        <p className="text-sm text-faint">Production</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {btsImages.map((item, i) => (
          <button
            key={i}
            onClick={() => openAt(sasImages.length + i)}
            className={`reveal d${(i % 3) + 1} group relative aspect-[4/3] rounded-2xl overflow-hidden glass gradient-border card-float cursor-pointer text-left`}
          >
            <Image
              src={`/portfolio/${item.src}`}
              alt={`${item.label} ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white font-display font-semibold">{item.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl animate-[fadeIn_0.2s_ease]" />

          <div
            className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-4 animate-[scaleIn_0.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute -top-12 right-0 sm:right-2 h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer z-20"
              aria-label="Tutup"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
              <Image
                key={img.src}
                src={`/portfolio/${img.src}`}
                alt={img.label}
                fill
                className="object-contain animate-[fadeIn_0.2s_ease]"
                sizes="(max-width: 768px) 95vw, 80vw"
                priority
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-white font-display font-semibold text-lg">{img.label}</p>
              <p className="text-white/50 text-sm">{img.category}</p>
            </div>
            <p className="mt-2 text-white/30 text-xs font-mono">
              {idx + 1} / {allImages.length}
            </p>

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Foto sebelumnya"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Next */}
            <button
              onClick={next}
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Foto berikutnya"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
