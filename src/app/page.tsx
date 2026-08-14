import Nav from "@/components/Nav";
import ScrollFx from "@/components/ScrollFx";
import InteractiveFx from "@/components/InteractiveFx";
import Logo, { LogoDefs } from "@/components/Logo";
import { site, waContactLink } from "@/lib/site";
import Image from "next/image";
import PortfolioGrid from "@/components/PortfolioGrid";

const MARQUEE = [
  "B2B Event Organizer",
  "Corporate Exhibitions",
  "Brand Activations",
  "Seminars & Workshops",
  "Premium Experience",
  "Professional Execution",
];

const PORTFOLIO_IMAGES: { src: string; label: string; category: string }[] = [
  // Event SAS Jogja
  { src: "1.jpg", label: "Event SAS Jogja", category: "Corporate Event" },
  { src: "2.jpg", label: "Event SAS Jogja", category: "Corporate Event" },
  { src: "3.jpg", label: "Event SAS Jogja", category: "Corporate Event" },
  { src: "4.jpg", label: "Event SAS Jogja", category: "Corporate Event" },
  { src: "5.jpg", label: "Event SAS Jogja", category: "Corporate Event" },
  { src: "6.jpg", label: "Event SAS Jogja", category: "Corporate Event" },
  { src: "7.jpg", label: "Event SAS Jogja", category: "Corporate Event" },
  { src: "8.jpg", label: "Event SAS Jogja", category: "Corporate Event" },
  // Event SAS Jakarta
  { src: "sas-jkt-1.jpg", label: "Workshop Journalist SAS", category: "Seminar" },
  { src: "sas-jkt-2.jpg", label: "Workshop Journalist SAS", category: "Seminar" },
  { src: "sas-jkt-3.jpg", label: "Workshop Journalist SAS", category: "Seminar" },
  { src: "sas-jkt-4.jpg", label: "Workshop Journalist SAS", category: "Seminar" },
  { src: "sas-jkt-5.jpg", label: "Workshop Journalist SAS", category: "Seminar" },
  { src: "sas-jkt-6.jpg", label: "Workshop Journalist SAS", category: "Seminar" },
  { src: "sas-jkt-7.jpg", label: "Workshop Journalist SAS", category: "Seminar" },
  { src: "sas-jkt-8.jpg", label: "Workshop Journalist SAS", category: "Seminar" },
  // Syuting / Activity
  { src: "20260807-093604.jpg", label: "Behind The Scenes", category: "Production" },
  { src: "20260807-093608.jpg", label: "Behind The Scenes", category: "Production" },
  { src: "20260807-093611.jpg", label: "Behind The Scenes", category: "Production" },
  { src: "20260807-093613.jpg", label: "Behind The Scenes", category: "Production" },
  { src: "20260807-093615.png", label: "Behind The Scenes", category: "Production" },
  { src: "20260807-093618.png", label: "Behind The Scenes", category: "Production" },
];

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <LogoDefs />
      <Nav />

      <main>
        {/* ── HERO ── */}
        <section id="hero" className="relative overflow-hidden pt-12 sm:pt-16 pb-20">
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-70" />

          {/* Antigravity Interactive 3D Particle Constellation & Ambient Spotlight */}
          <InteractiveFx />

          {/* Ambient orbs */}
          <div className="hero-orb w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 bg-gradient-to-br from-brand/20 to-brand-dark/10 pointer-events-none" />
          <div className="hero-orb w-[400px] h-[400px] bottom-0 -right-20 bg-gradient-to-tl from-brand-light/10 to-transparent pointer-events-none" />

          <div className="relative mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              
              {/* Maximized 3D Animated Logo */}
              <div className="reveal mb-10 relative">
                <div className="absolute inset-0 blur-[80px] bg-gradient-to-br from-brand/40 via-brand-light/30 to-brand-dark/40 rounded-full scale-150 animate-pulse pointer-events-none" />
                <Logo className="relative h-32 w-32 sm:h-40 sm:w-40 hero-logo-max" />
              </div>

              <div className="reveal inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-brand/20 bg-brand/5 backdrop-blur-md">
                <span className="font-display text-sm font-bold tracking-widest text-brand-light uppercase">✦ B2B Event Organizer ✦</span>
              </div>

              <h1 className="reveal d1 font-display font-bold tracking-[-0.04em] leading-[1.05] text-[clamp(2.5rem,6vw,5.5rem)]">
                Menciptakan <span className="gradient-text">Pengalaman Event</span> Profesional yang Tak Terlupakan.
              </h1>
              <p className="reveal d2 mt-7 text-lg sm:text-xl leading-relaxed text-steel max-w-2xl mx-auto">
                Polestar Inovasi Nusantara adalah Event Organizer terpercaya untuk kebutuhan B2B, pameran, seminar, dan brand activation perusahaan Anda.
              </p>
              
              <div className="reveal d3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#portofolio" className="btn-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-8 py-4 font-semibold text-white hover:shadow-[0_0_35px_rgba(74,171,184,0.45)] transition-all duration-300 cursor-pointer">
                  Lihat Portofolio
                  <Arrow className="h-4 w-4" />
                </a>
                <a href={waContactLink()} target="_blank" rel="noopener" className="btn-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-line px-8 py-4 font-semibold text-ink hover:bg-white/5 hover:border-brand/30 transition-all duration-300 cursor-pointer">
                  Konsultasi Gratis
                </a>
              </div>
            </div>
            
            <dl className="reveal d4 mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-line max-w-4xl mx-auto">
              <div className="border-b md:border-b-0 md:border-r border-line py-8 text-center stat-glow">
                <dd className="font-display text-4xl font-bold tracking-tight gradient-text" data-count="50" data-suffix="+">0</dd>
                <dt className="mt-2 text-sm text-faint">Event Sukses</dt>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-line py-8 text-center stat-glow">
                <dd className="font-display text-4xl font-bold tracking-tight gradient-text" data-count="10" data-suffix="+">0</dd>
                <dt className="mt-2 text-sm text-faint">Klien Korporat</dt>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-line py-8 text-center stat-glow">
                <dd className="font-display text-4xl font-bold tracking-tight gradient-text" data-count="15" data-suffix="+">0</dd>
                <dt className="mt-2 text-sm text-faint">Tim Profesional</dt>
              </div>
              <div className="py-8 text-center stat-glow">
                <dd className="font-display text-4xl font-bold tracking-tight gradient-text" data-count="5" data-suffix=" thn">0</dd>
                <dt className="mt-2 text-sm text-faint">Pengalaman</dt>
              </div>
            </dl>
          </div>
        </section>

        {/* Marquee */}
        <div className="border-y border-line py-4 marquee shimmer-line bg-black/20">
          <div className="marquee__track font-display font-medium tracking-wide text-steel uppercase text-sm">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-12">
                {m}
                <span className="text-brand/30">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── LAYANAN ── */}
        <section id="layanan" className="border-y border-line">
          <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
            <div className="reveal text-center max-w-3xl mx-auto">
              <p className="label text-brand-light">01 — Layanan Kami</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Solusi Event End-to-End</h2>
              <p className="mt-4 text-steel">Dari konsep hingga eksekusi, kami memastikan acara bisnis Anda berjalan lancar dan memberikan impresi terbaik.</p>
            </div>
            
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                ["Corporate Events", "Perencanaan dan manajemen penuh untuk konferensi, seminar, dan rapat kerja tahunan perusahaan."],
                ["Exhibitions", "Pembuatan booth pameran, manajemen logistik, dan pengelolaan audiens untuk event berskala besar."],
                ["Brand Activations", "Strategi kreatif dan eksekusi lapangan untuk peluncuran produk dan aktivasi merek."],
              ].map(([t, d], i) => (
                <div key={t} className={`reveal d${i + 1} glass gradient-border rounded-xl p-8 card-float group`}>
                  <div className="h-12 w-12 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mb-6">
                    <Check className="h-6 w-6 text-brand-light" />
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink group-hover:text-brand-light transition-colors">{t}</h3>
                  <p className="mt-3 text-steel leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PORTOFOLIO ── */}
        <section id="portofolio" className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="reveal flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="label text-brand-light">02 — Aktivitas & Portofolio</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Galeri Event Terbaru</h2>
              <p className="mt-4 text-steel">Momen-momen terbaik dari berbagai acara yang telah kami kelola dengan sukses, termasuk event SAS dan lainnya.</p>
            </div>
            <a href={waContactLink("Layanan EO")} className="inline-flex items-center gap-2 rounded-lg border border-brand/30 px-5 py-2.5 text-sm font-semibold text-brand-light hover:bg-brand/10 transition-colors">
              Buat Event Anda
              <Arrow className="h-4 w-4" />
            </a>
          </div>

          <PortfolioGrid
            sasImages={PORTFOLIO_IMAGES.filter(img => img.category === "Corporate Event")}
            sasJakartaImages={PORTFOLIO_IMAGES.filter(img => img.category === "Seminar")}
            btsImages={PORTFOLIO_IMAGES.filter(img => img.category === "Production")}
          />
        </section>

        {/* ── KLIEN / TESTIMONI ── */}
        <section className="border-y border-line bg-white/[0.02]">
          <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
            <div className="reveal text-center">
              <p className="label text-brand-light">03 — Klien Kami</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Dipercaya oleh Perusahaan</h2>
            </div>
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                ["Manajemen event yang luar biasa! Polestar mengurus segalanya dari A sampai Z sehingga kami bisa fokus pada tamu dan presentasi bisnis kami.", "Budi S.", "PT SAS", "CEO"],
                ["Detail oriented dan sangat profesional. Event gathering tahunan kami berjalan lancar tanpa kendala teknis sedikitpun berkat tim Polestar.", "Anita W.", "Corporate", "HR Director"],
                ["Dekorasi, lighting, dan alur acara sangat rapi. Sangat merekomendasikan Polestar untuk kebutuhan corporate event berskala besar.", "Hendra C.", "Tech Co", "Marketing Head"],
              ].map(([quote, name, company, role], i) => (
                <figure key={i} className="reveal rounded-xl glass gradient-border p-8 card-float flex flex-col">
                  <blockquote className="text-ink leading-relaxed flex-1">&ldquo;{quote}&rdquo;</blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand/20 to-brand-dark/20 flex items-center justify-center font-display font-bold text-brand-light">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{name}</p>
                      <p className="text-xs text-faint">{role}, {company}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#061520] via-[#0a2435] to-[#0B1929]" />
          <div className="absolute inset-0 grid-bg opacity-50" />

          <div className="relative mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-24 sm:py-32 text-center">
            <h2 className="reveal d1 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.02] text-white">Siap Menggelar Event Sukses?</h2>
            <p className="reveal d2 mt-6 max-w-2xl mx-auto text-white/60 text-lg">Konsultasikan kebutuhan acara B2B Anda bersama tim profesional kami hari ini.</p>
            <div className="reveal d3 mt-10">
              <a href={waContactLink("Konsultasi Event B2B")} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-8 py-4 font-bold text-white hover:shadow-[0_0_40px_rgba(74,171,184,0.4)] transition-all duration-300 cursor-pointer scale-105">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.6c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 5 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
                Hubungi Kami via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="reveal text-center">
            <p className="label text-brand-light">04 — FAQ</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Pertanyaan Umum</h2>
          </div>
          <div className="reveal d1 mt-12 border-t border-line">
            {[
              ["Event apa saja yang bisa ditangani oleh Polestar?", "Kami berfokus pada event B2B seperti konferensi, seminar, pameran (exhibition), company gathering, dan brand activation perusahaan (seperti event SAS)."],
              ["Apakah Polestar menangani event di luar kota?", "Ya, kami melayani pelaksanaan acara di berbagai kota di Indonesia. Tim kami siap melakukan survei dan eksekusi di lokasi yang Anda inginkan."],
              ["Bagaimana cara memulai kerjasama?", "Anda dapat menekan tombol WhatsApp untuk berkonsultasi gratis. Ceritakan visi dan kebutuhan acara Anda, lalu tim kami akan memberikan proposal dan estimasi biaya."],
            ].map(([q, a]) => (
              <details key={q} className="group border-b border-line">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-semibold text-lg text-ink">
                  {q}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none text-brand-light transition-transform duration-200 group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M12 5v14M5 12h14" /></svg>
                </summary>
                <p className="pb-5 -mt-1 text-steel leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-line">
        <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 pt-16 pb-28 sm:pb-16">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <a href="#hero" className="flex items-center gap-2.5" aria-label="Polestar Inovasi Nusantara">
                <Logo className="h-8 w-8" />
                <span className="font-display text-lg font-semibold tracking-tight text-ink">Polestar <span className="gradient-text">Inovasi Nusantara</span></span>
              </a>
              <p className="mt-4 max-w-sm text-sm text-steel leading-relaxed">Event Organizer profesional yang berdedikasi menciptakan pengalaman B2B, pameran, dan seminar berkualitas tinggi.</p>
            </div>
            <nav aria-label="Navigasi footer">
              <h3 className="text-sm font-semibold text-ink">Jelajahi</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-steel">
                <li><a href="#layanan" className="hover:text-brand-light transition-colors">Layanan Kami</a></li>
                <li><a href="#portofolio" className="hover:text-brand-light transition-colors">Portofolio</a></li>
                <li><a href="#faq" className="hover:text-brand-light transition-colors">FAQ</a></li>
              </ul>
            </nav>
            <div>
              <h3 className="text-sm font-semibold text-ink">Kontak</h3>
              <p className="mt-4 text-sm text-steel">Siap untuk merencanakan event berikutnya bersama kami?</p>
              <a href={waContactLink()} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-4 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(74,171,184,0.3)] transition-all duration-300 cursor-pointer">Hubungi Kami</a>
            </div>
          </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line pt-6 text-sm text-faint">
            <p>© {new Date().getFullYear()} Polestar Inovasi Nusantara. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-50">
        <a href={waContactLink()} target="_blank" rel="noopener" className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-4 py-4 font-bold text-white shadow-[0_4px_20px_rgba(74,171,184,0.3)] cursor-pointer">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.6c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 5 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>
          Konsultasi via WhatsApp
        </a>
      </div>

      <ScrollFx />
    </>
  );
}
