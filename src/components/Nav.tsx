"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { site } from "@/lib/site";

const LINKS = [
  { href: "#produk", label: "Produk" },
  { href: "#pasar", label: "Pasar" },
  { href: "#analisa", label: "Analisa" },
  { href: "#live", label: "Live" },
  { href: "#gabung", label: "Komunitas" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 pt-3 px-3 sm:px-5">
      <nav
        className={`mx-auto max-w-[1400px] rounded-2xl glass-nav px-4 sm:px-6 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_14px_40px_rgba(2,6,23,0.14)]" : ""
        }`}
      >
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a href="#hero" className="flex items-center gap-2.5" aria-label="Polestar Indonesia — beranda">
            <Logo className="h-7 w-7 shrink-0" />
            <span className="font-display text-[1.05rem] font-semibold tracking-tight">
              Polestar <span className="text-brand">Indonesia</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-9 text-[0.95rem] font-medium text-steel">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener"
              className="hidden sm:inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand transition-colors duration-200 cursor-pointer"
            >
              Gabung Telegram
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink cursor-pointer hover:bg-mist transition-colors"
              aria-label="Buka menu"
              aria-expanded={open}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-3">
            <div className="rounded-xl glass p-1.5 text-ink">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 hover:bg-mist transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 font-semibold text-white"
              >
                Gabung Telegram Gratis
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
