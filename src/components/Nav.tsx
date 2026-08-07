"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { site, waContactLink } from "@/lib/site";

const LINKS = [
  { href: "#layanan", label: "Layanan" },
  { href: "#portofolio", label: "Portofolio" },
  { href: "#faq", label: "FAQ" },
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
          scrolled ? "shadow-[0_14px_40px_rgba(0,0,0,0.4)]" : ""
        }`}
      >
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a href="#hero" className="flex items-center gap-2.5" aria-label="Polestar Inovasi Nusantara — beranda">
            <Logo className="h-8 w-8 shrink-0" />
            <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
              Polestar <span className="gradient-text">Inovasi Nusantara</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-9 text-[0.95rem] font-medium text-steel">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-brand-light transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={waContactLink()}
              target="_blank"
              rel="noopener"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-4 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(74,171,184,0.3)] transition-all duration-300 cursor-pointer"
            >
              Hubungi Kami
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.6c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 5 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
              </svg>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink cursor-pointer hover:bg-mist transition-colors"
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
                  className="block rounded-lg px-4 py-3 hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={waContactLink()}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-4 py-3 font-semibold text-white"
              >
                Hubungi Kami via WA
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
