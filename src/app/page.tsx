import Nav from "@/components/Nav";
import Dashboard from "@/components/Dashboard";
import LiveSection from "@/components/LiveSection";
import Products from "@/components/Products";
import MarketNews from "@/components/MarketNews";
import NewsTabs from "@/components/NewsTabs";
import ScrollFx from "@/components/ScrollFx";
import TradingViewWidget from "@/components/TradingViewWidget";
import Logo, { LogoDefs } from "@/components/Logo";
import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";

const MARKET = [
  { label: "EMAS · XAUUSD", symbol: "OANDA:XAUUSD" },
  { label: "MINYAK · WTI", symbol: "TVC:USOIL" },
  { label: "EUR / USD", symbol: "OANDA:EURUSD" },
  { label: "BITCOIN · BTCUSD", symbol: "BINANCE:BTCUSDT" },
];

const MARQUEE = [
  "Expert Advisor MT4 & MT5",
  "AI Signal Real-time",
  "Analisa Teknikal Harian",
  "XAUUSD · WTI · Forex",
  "Live Streaming Edukasi",
  "Komunitas Telegram Aktif",
];

function TelegramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}
function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
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

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <LogoDefs />

      {/* Ticker tape */}
      <div className="w-full border-b border-line bg-black/30 backdrop-blur-md">
        <TradingViewWidget
          widget="ticker-tape"
          height={46}
          config={{
            symbols: [
              { proName: "OANDA:XAUUSD", title: "Emas / XAUUSD" },
              { proName: "TVC:USOIL", title: "Minyak WTI" },
              { proName: "TVC:UKOIL", title: "Minyak Brent" },
              { proName: "OANDA:EURUSD", title: "EUR/USD" },
              { proName: "FX:USDJPY", title: "USD/JPY" },
              { proName: "OANDA:USDIDR", title: "USD/IDR" },
              { proName: "BINANCE:BTCUSDT", title: "Bitcoin" },
            ],
            showSymbolLogo: true,
            isTransparent: true,
            displayMode: "adaptive",
            colorTheme: "dark",
            locale: "id",
          }}
        />
      </div>

      <Nav />

      <main>
        {/* ── HERO ── */}
        <section id="hero" className="relative overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg" />

          {/* Ambient orbs */}
          <div className="hero-orb w-[500px] h-[500px] -top-40 left-1/2 -translate-x-1/2 bg-gradient-to-br from-brand/30 to-brand-dark/20" />
          <div className="hero-orb w-[300px] h-[300px] top-1/3 -right-20 bg-gradient-to-br from-brand-light/20 to-transparent" />
          <div className="hero-orb w-[250px] h-[250px] bottom-0 left-10 bg-gradient-to-tr from-brand-dark/25 to-transparent" />

          <div className="relative mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-12">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="reveal flex items-center gap-3 mb-6 sm:mb-8">
                  <Logo className="h-14 w-14 hero-logo-glow" />
                  <div>
                    <p className="font-display text-sm font-semibold tracking-wider text-brand-light uppercase">Polestar Indonesia</p>
                    <p className="text-xs text-faint">Trading Education & Technology</p>
                  </div>
                </div>

                <p className="reveal label text-brand-light">Edukasi · Bot Trading · AI Signal</p>
                <h1 className="reveal d1 mt-5 font-display font-bold tracking-[-0.04em] leading-[0.95] text-[clamp(2.6rem,7.5vw,5.75rem)]">
                  Navigasi pasar
                  <br />
                  emas &amp; minyak
                  <br />
                  dengan <span className="gradient-text">presisi.</span>
                </h1>
                <p className="reveal d2 mt-7 max-w-xl text-lg leading-relaxed text-steel">
                  Polestar Indonesia menghadirkan Expert Advisor, AI Signal, dan edukasi trading. Analisa teknikal harian{" "}
                  <span className="font-mono text-brand-light">XAUUSD</span> &amp; <span className="font-mono text-brand-light">WTI</span>, plus komunitas aktif di Telegram.
                </p>
                <div className="reveal d3 mt-8 flex flex-col sm:flex-row gap-3">
                  <a href="#produk" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-6 py-3.5 font-semibold text-white hover:shadow-[0_0_30px_rgba(74,171,184,0.35)] transition-all duration-300 cursor-pointer">
                    Lihat Produk &amp; Harga
                    <Arrow className="h-4 w-4" />
                  </a>
                  <a href={site.telegram} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-6 py-3.5 font-semibold text-ink hover:bg-white/5 hover:border-brand/30 transition-all duration-300 cursor-pointer">
                    <TelegramGlyph className="h-4 w-4 text-brand-light" />
                    Gabung Telegram
                  </a>
                </div>
              </div>

              <div className="reveal d2 lg:col-span-5 flex flex-col items-center gap-6 hidden sm:flex">
                {/* Large hero logo */}
                <div className="relative">
                  <div className="absolute inset-0 blur-[80px] bg-gradient-to-br from-brand/30 via-brand-light/20 to-brand-dark/30 rounded-full scale-150" />
                  <Logo className="relative h-72 w-72 sm:h-96 sm:w-96 hero-logo-glow" />
                </div>

                {/* Chart card */}
                <div className="w-full rounded-xl glass gradient-border overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                    <span className="font-mono text-xs text-faint">XAUUSD · 1H</span>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-steel">
                      <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-up" /> LIVE
                    </span>
                  </div>
                  <TradingViewWidget
                    widget="advanced-chart"
                    height={280}
                    config={{
                      autosize: true,
                      symbol: "OANDA:XAUUSD",
                      interval: "60",
                      timezone: "Asia/Jakarta",
                      theme: "dark",
                      style: "1",
                      locale: "id",
                      hide_top_toolbar: true,
                      hide_side_toolbar: true,
                      allow_symbol_change: false,
                      save_image: false,
                      calendar: false,
                      backgroundColor: "rgba(0,0,0,0)",
                      gridColor: "rgba(148,163,184,0.06)",
                      support_host: "https://www.tradingview.com",
                    }}
                  />
                </div>
              </div>
            </div>

            <dl className="reveal d4 mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-line">
              <div className="border-b md:border-b-0 md:border-r border-line py-6 pr-6 stat-glow">
                <dd className="font-display text-3xl sm:text-4xl font-bold tracking-tight gradient-text" data-count="12500" data-suffix="+">0</dd>
                <dt className="mt-1.5 text-sm text-faint">Anggota komunitas</dt>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-line py-6 md:px-6 stat-glow">
                <dd className="font-display text-3xl sm:text-4xl font-bold tracking-tight gradient-text" data-count="5" data-suffix="">0</dd>
                <dt className="mt-1.5 text-sm text-faint">Produk unggulan</dt>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-line py-6 pr-6 md:px-6 stat-glow">
                <dd className="font-display text-3xl sm:text-4xl font-bold tracking-tight gradient-text" data-count="1200" data-suffix="+">0</dd>
                <dt className="mt-1.5 text-sm text-faint">Sesi edukasi</dt>
              </div>
              <div className="py-6 md:pl-6 stat-glow">
                <dd className="font-display text-3xl sm:text-4xl font-bold tracking-tight gradient-text" data-count="5" data-suffix=" thn">0</dd>
                <dt className="mt-1.5 text-sm text-faint">Pengalaman</dt>
              </div>
            </dl>
          </div>
        </section>

        {/* Marquee */}
        <div className="border-y border-line py-3.5 marquee shimmer-line">
          <div className="marquee__track label text-faint">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-10">
                {m}
                <span className="text-brand/30">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── 01 PRODUK ── */}
        <Products products={products} />

        {/* ── 02 PASAR ── */}
        <section id="pasar" className="border-y border-line">
          <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
            <div className="reveal flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label text-brand-light">02 — Pasar Hari Ini</p>
                <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Pantau pasar real-time</h2>
              </div>
              <p className="max-w-sm text-steel">Harga live untuk instrumen utama yang kami bahas setiap hari. Data oleh TradingView.</p>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MARKET.map((m, i) => (
                <div key={m.symbol} className={`reveal d${i + 1} glass gradient-border rounded-xl p-1.5`}>
                  <div className="px-3 pt-2 font-mono text-xs text-faint">{m.label}</div>
                  <TradingViewWidget
                    widget="mini-symbol-overview"
                    height={160}
                    config={{
                      symbol: m.symbol,
                      width: "100%",
                      height: "100%",
                      locale: "id",
                      dateRange: "1D",
                      colorTheme: "dark",
                      isTransparent: true,
                      autosize: true,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 BERITA ── */}
        <section id="berita" className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="reveal">
            <p className="label text-brand-light">03 — Update Harian</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Berita &amp; analisa pasar</h2>
            <p className="mt-4 max-w-2xl text-steel">Update terbaru dari channel Telegram Polestar Indonesia dan berita pasar global.</p>
          </div>

          <NewsTabs />
        </section>

        {/* ── 04 ANALISA ── */}
        <section id="analisa" className="border-y border-line">
          <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
            <div className="reveal">
              <p className="label text-brand-light">04 — Dashboard</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Analisa teknikal interaktif</h2>
              <p className="mt-4 max-w-2xl text-steel">Grafik real-time dan ringkasan indikator teknikal untuk XAUUSD, WTI, dan pasar utama lainnya.</p>
            </div>
            <div className="reveal d1 mt-10">
              <Dashboard />
            </div>
            <p className="reveal mt-6 text-xs text-faint max-w-3xl">Data &amp; grafik bersifat informatif/edukasi dan dapat tertunda. Bukan saran finansial atau ajakan jual/beli.</p>
          </div>
        </section>

        {/* ── 05 LIVE ── */}
        <section id="live" className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="reveal">
            <p className="label text-brand-light">05 — Live Streaming</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Belajar langsung bersama mentor</h2>
            <p className="mt-4 max-w-2xl text-steel">Ikuti sesi live trading &amp; edukasi di YouTube. Bedah pasar, eksekusi, dan tanya-jawab real-time.</p>
          </div>

          <div className="mt-12 grid lg:grid-cols-3 gap-6">
            <LiveSection />
            <div className="reveal d2 rounded-xl glass gradient-border p-6 flex flex-col">
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink">Jadwal Sesi Live</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
                  <div><p className="font-semibold text-ink">Global Market Outlook</p><p className="text-faint">Pagi</p></div>
                  <span className="font-mono text-brand-light">09.00</span>
                </li>
                <li className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
                  <div><p className="font-semibold text-ink">Global Market News</p><p className="text-faint">Siang</p></div>
                  <span className="font-mono text-brand-light">12.00</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <div><p className="font-semibold text-ink">Global Market Recap</p><p className="text-faint">Sore</p></div>
                  <span className="font-mono text-brand-light">17.00</span>
                </li>
              </ul>
              <a href={site.youtube} target="_blank" rel="noopener" className="mt-auto pt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-line px-4 py-3 font-semibold text-ink hover:bg-white/5 hover:border-brand/30 transition-all duration-300 cursor-pointer">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-down" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" /></svg>
                Subscribe di YouTube
              </a>
            </div>
          </div>
        </section>

        {/* ── 06 EDUKASI ── */}
        <section id="edukasi" className="border-y border-line">
          <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
            <div className="reveal">
              <p className="label text-brand-light">06 — Kurikulum</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Apa yang Anda pelajari</h2>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                ["01", "Price Action", "Membaca struktur pasar, support/resistance, dan pola candlestick tanpa indikator berlebihan."],
                ["02", "Manajemen Risiko", "Position sizing, stop-loss, dan risk-reward agar modal Anda terlindungi jangka panjang."],
                ["03", "Psikologi Trading", "Mengelola emosi, disiplin pada rencana, dan membangun mindset yang konsisten."],
                ["04", "Setup Bot / EA", "Cara memasang, mengatur, dan mengoptimalkan Expert Advisor di MetaTrader."],
                ["05", "Membaca AI Signal", "Memanfaatkan sinyal AI: entry, stop, dan target dengan manajemen risiko."],
                ["06", "Komunitas & Mentoring", "Diskusi harian, review trade bersama, dan dukungan dari mentor."],
              ].map(([n, t, d], i) => (
                <div key={n} className={`reveal d${(i % 3) + 1} glass gradient-border rounded-xl p-7 hover:bg-white/[0.06] transition-colors duration-200 group`}>
                  <span className="font-mono text-sm text-brand/50">{n}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink group-hover:text-brand-light transition-colors">{t}</h3>
                  <p className="mt-2 text-sm text-steel leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 07 TESTIMONI ── */}
        <section className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="reveal">
            <p className="label text-brand-light">07 — Komunitas</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] max-w-3xl text-ink">Dipercaya ribuan trader Indonesia</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              ["Analisa XAUUSD-nya rinci dan mudah diikuti. Sebagai pemula, saya akhirnya paham cara baca struktur pasar.", "Rizky A.", "RA", "Anggota sejak 2024"],
              ["Gold Mind AI sangat membantu. Sinyalnya jelas dan order ke MT5 lewat Telegram benar-benar praktis.", "Dewi W.", "DW", "Anggota sejak 2023"],
              ["Sesi live-nya daging semua. Bisa lihat langsung mentor menganalisa WTI dari awal sampai eksekusi.", "Bagus P.", "BP", "Anggota sejak 2025"],
            ].map(([quote, name, initials, since]) => (
              <figure key={name} className="reveal rounded-xl glass gradient-border p-7 hover:bg-white/[0.06] transition-colors duration-200">
                <div className="flex gap-0.5 text-brand-light" aria-label="5 dari 5 bintang">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
                </div>
                <blockquote className="mt-4 text-ink leading-relaxed">&ldquo;{quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand/20 to-brand-dark/20 font-display font-semibold text-brand-light">{initials}</span>
                  <div><p className="text-sm font-semibold text-ink">{name}</p><p className="text-xs text-faint">{since}</p></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── 08 TELEGRAM FUNNEL ── */}
        <section id="gabung" className="relative overflow-hidden">
          {/* Gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#061520] via-[#0a2435] to-[#0B1929]" />
          <div className="absolute inset-0 grid-bg opacity-50" />

          <div className="relative mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="reveal label text-brand-light">08 — Komunitas Telegram</p>
                <h2 className="reveal d1 mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.02] text-white">Bergabung dalam 3 langkah mudah</h2>
                <p className="reveal d2 mt-5 max-w-md text-white/60 text-lg">Gratis, tanpa biaya tersembunyi. Mulai terima analisa &amp; belajar bareng komunitas hari ini juga.</p>
                <ol className="reveal d3 mt-10 space-y-6">
                  {[
                    ["1", "Klik tombol \u2018Gabung Telegram\u2019", "Anda diarahkan langsung ke grup resmi Polestar Indonesia."],
                    ["2", "Baca panduan & aturan grup", "Pesan tersemat berisi cara memaksimalkan analisa & jadwal sesi."],
                    ["3", "Mulai terima analisa harian", "Ikut diskusi, sesi live, dan dapatkan update pasar setiap hari."],
                  ].map(([n, t, d]) => (
                    <li key={n} className="flex gap-5">
                      <span className="flex-none font-display text-2xl font-bold text-brand-light w-8">{n}</span>
                      <div className="border-t border-white/10 pt-1">
                        <p className="font-semibold text-white">{t}</p>
                        <p className="text-sm text-white/50 mt-0.5">{d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="reveal d2">
                <div className="rounded-2xl glass gradient-border p-7 sm:p-9">
                  <div className="flex items-center gap-3">
                    <Logo className="h-12 w-12" />
                    <div>
                      <p className="font-display font-semibold text-ink">Polestar Indonesia</p>
                      <p className="text-sm text-faint"><span data-count="12500" data-suffix="+">0</span> anggota · Gratis</p>
                    </div>
                  </div>
                  <ul className="mt-7 space-y-3 text-sm">
                    {["Analisa harian XAUUSD & WTI", "Update produk EA & AI Signal", "Tanya-jawab langsung dengan mentor", "Materi edukasi eksklusif"].map((b) => (
                      <li key={b} className="flex items-center gap-3 text-ink"><Check className="h-5 w-5 flex-none text-brand-light" /> {b}</li>
                    ))}
                  </ul>
                  <a href={site.telegram} target="_blank" rel="noopener" className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-6 py-4 font-bold text-white hover:shadow-[0_0_30px_rgba(74,171,184,0.35)] transition-all duration-300 cursor-pointer">
                    <TelegramGlyph className="h-5 w-5" />
                    Gabung Telegram Gratis
                  </a>
                  <p className="mt-3 text-center text-xs text-faint">Tanpa biaya · Tanpa kartu kredit · Keluar kapan saja</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 09 FAQ ── */}
        <section id="faq" className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="reveal text-center">
            <p className="label text-brand-light">09 — FAQ</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02] text-ink">Pertanyaan umum</h2>
          </div>
          <div className="reveal d1 mt-12 border-t border-line">
            {[
              ["Apakah bot bisa untuk pemula?", "Bisa. Kami sediakan panduan setup, kelas edukasi, dan dukungan komunitas untuk membantu Anda memasang serta menggunakan EA/AI Signal."],
              ["Bagaimana cara membeli produk?", "Pilih produk pada bagian Produk, lalu klik tombol \u2018Order\u2019 \u2014 Anda akan diarahkan ke website resmi PT SAS (Smartin Advisor Sistem) untuk melakukan pembelian. Setelah itu, konfirmasikan ke Polestar Indonesia dan produk akan segera kami kirim. WhatsApp hanya untuk bertanya-jawab dengan admin."],
              ["Apakah ini menjamin profit?", "Tidak. Semua produk & konten bersifat alat bantu dan edukasi, bukan jaminan profit maupun saran finansial. Trading mengandung risiko."],
              ["Platform apa yang didukung?", "MetaTrader 4 & 5 untuk Expert Advisor. AI Signal dikirim via Telegram dan dapat dieksekusi ke MT5."],
              ["Apakah ada komunitas gratis?", "Ya. Grup Telegram Polestar Indonesia gratis untuk analisa harian, update, dan tanya-jawab."],
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
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <a href="#hero" className="flex items-center gap-2.5" aria-label="Polestar Indonesia">
                <Logo className="h-8 w-8" />
                <span className="font-display text-lg font-semibold tracking-tight text-ink">Polestar <span className="gradient-text">Indonesia</span></span>
              </a>
              <p className="mt-4 max-w-md text-sm text-steel leading-relaxed">Edukasi trading, Expert Advisor, dan AI Signal untuk pasar emas, minyak, dan forex. Belajar dengan disiplin dan manajemen risiko yang sehat.</p>
            </div>
            <nav aria-label="Navigasi footer">
              <h3 className="text-sm font-semibold text-ink">Jelajahi</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-steel">
                <li><a href="#produk" className="hover:text-brand-light transition-colors">Produk &amp; Harga</a></li>
                <li><a href="#analisa" className="hover:text-brand-light transition-colors">Analisa Teknikal</a></li>
                <li><a href="#live" className="hover:text-brand-light transition-colors">Live &amp; Edukasi</a></li>
                <li><a href="#faq" className="hover:text-brand-light transition-colors">FAQ</a></li>
              </ul>
            </nav>
            <div>
              <h3 className="text-sm font-semibold text-ink">Mulai sekarang</h3>
              <p className="mt-4 text-sm text-steel">Gabung komunitas &amp; terima analisa harian gratis.</p>
              <a href={site.telegram} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-4 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(74,171,184,0.3)] transition-all duration-300 cursor-pointer">Gabung Telegram</a>
            </div>
          </div>

          <div className="mt-12 rounded-xl glass p-5 text-xs leading-relaxed text-faint">
            <p className="font-semibold text-steel">Peringatan Risiko</p>
            <p className="mt-2">Trading instrumen keuangan mengandung risiko tinggi dan dapat mengakibatkan kerugian melebihi modal Anda. Kinerja masa lalu tidak menjamin hasil di masa depan. Seluruh produk &amp; konten Polestar Indonesia bersifat alat bantu dan edukasi, <span className="text-ink">bukan saran finansial, rekomendasi investasi, atau jaminan profit</span>. Lakukan riset mandiri sebelum mengambil keputusan. Data pasar oleh TradingView dan dapat tertunda.</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line pt-6 text-sm text-faint">
            <p>© {new Date().getFullYear()} Polestar Indonesia. Seluruh konten bersifat edukasi.</p>
            <p>Dibuat dengan fokus pada edukasi yang jujur &amp; transparan.</p>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-50 grid grid-cols-2 gap-2">
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-dark px-4 py-3.5 font-bold text-white shadow-[0_4px_20px_rgba(74,171,184,0.3)] cursor-pointer">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.6c-.2 0-.5.1-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 5 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>
          WhatsApp
        </a>
        <a href={site.telegram} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-lg bg-[#0B1929] border border-brand/20 px-4 py-3.5 font-bold text-white shadow-lg cursor-pointer">
          <TelegramGlyph className="h-5 w-5" />
          Telegram
        </a>
      </div>

      <ScrollFx />
    </>
  );
}
