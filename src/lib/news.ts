// Berita pasar otomatis dari feed RSS (gratis, tanpa API key).
// Sumber: FXStreet (Forex & Commodities).
// Di-cache lewat ISR Next.js (revalidate 15 mnt) → cepat & andal di Vercel,
// auto-refresh berkala tanpa menarik feed tiap request.

export type NewsItem = {
  title: string;
  link: string;
  description: string;
  date: string; // pubDate mentah
  source: string;
};

const FEED_URL = "https://www.fxstreet.com/rss/news";
const SOURCE = "FXStreet";
const REVALIDATE_S = 900; // 15 menit
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121 Safari/537.36";

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
}

export async function getMarketNews(limit = 4): Promise<NewsItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(FEED_URL, {
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "application/rss+xml, application/xml, text/xml" },
      next: { revalidate: REVALIDATE_S },
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`RSS status ${res.status}`);

    const xml = await res.text();
    const items: NewsItem[] = [];
    const re = /<item\b[\s\S]*?<\/item>/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(xml)) !== null && items.length < 20) {
      const block = m[0];
      const title = tag(block, "title");
      const link = tag(block, "link");
      if (!title || !link) continue;
      items.push({
        title,
        link,
        description: tag(block, "description"),
        date: tag(block, "pubDate"),
        source: SOURCE,
      });
    }

    return items.slice(0, limit);
  } catch {
    // Gagal fetch (timeout/blokir) → kembalikan kosong; kartu CTA tetap tampil.
    return [];
  }
}

export function formatNewsDate(input: string): string {
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
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}
