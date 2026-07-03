import { getMarketNews, formatNewsDate } from "@/lib/news";
import { site } from "@/lib/site";

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default async function MarketNews() {
  const news = await getMarketNews(4);

  return (
    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
      {news.map((n, i) => (
        <article
          key={n.link}
          className={`reveal d${(i % 4) + 1} group rounded-xl glass p-6 hover:bg-white/75 transition-colors duration-200`}
        >
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded bg-brand-tint text-brand-dark px-1.5 py-0.5">{n.source}</span>
            <span className="text-faint">{formatNewsDate(n.date)}</span>
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
      <article className="reveal group rounded-xl bg-brand-deep text-white p-6 sm:col-span-2">
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
