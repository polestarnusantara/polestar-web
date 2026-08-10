"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Lightbox({
  images,
}: {
  images: { src: string; label: string; category: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length]
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

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };

  const img = images[idx];

  return (
    <>
      {/* Invisible buttons layered on each grid item */}
      {images.map((_, i) => (
        <button
          key={i}
          data-lightbox-trigger={i}
          onClick={() => openAt(i)}
          className="hidden"
          aria-label={`Buka foto ${i + 1}`}
        />
      ))}

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl animate-[fadeIn_0.2s_ease]" />

          {/* Content */}
          <div
            className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-4 animate-[scaleIn_0.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute -top-12 right-0 sm:right-2 h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer z-20"
              aria-label="Tutup"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Image container */}
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
              <p className="text-white font-display font-semibold text-lg">
                {img.label}
              </p>
              <p className="text-white/50 text-sm">{img.category}</p>
            </div>

            {/* Counter */}
            <p className="mt-2 text-white/30 text-xs font-mono">
              {idx + 1} / {images.length}
            </p>

            {/* Prev / Next arrows */}
            <button
              onClick={prev}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Foto sebelumnya"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
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
