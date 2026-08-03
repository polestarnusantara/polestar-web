import { NextResponse } from "next/server";

export const revalidate = 300; // cache 5 menit

type TelegramMessage = {
  id: string;
  date: string;
  text: string;
  views: string;
};

/**
 * Fetch pesan terbaru dari channel Telegram publik via halaman preview t.me/s/.
 * Tidak memerlukan bot token — cukup channel publik.
 */
export async function GET() {
  const channel = "grwindonesia";
  const url = `https://t.me/s/${channel}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "id-ID,id;q=0.9,en;q=0.8",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Gagal mengambil data dari Telegram", messages: [] },
        { status: 502 }
      );
    }

    const html = await res.text();
    const messages = parseMessages(html);

    return NextResponse.json({ messages }, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("Telegram fetch error:", err);
    return NextResponse.json(
      { error: "Tidak dapat terhubung ke Telegram", messages: [] },
      { status: 500 }
    );
  }
}

function parseMessages(html: string): TelegramMessage[] {
  const messages: TelegramMessage[] = [];

  // Match each message widget block
  const msgRegex =
    /data-post="[^/]+\/(\d+)"[\s\S]*?<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/div>)?\s*<div class="tgme_widget_message_info/g;

  const dateRegex = /<time[^>]*datetime="([^"]*)"[^>]*>/;
  const viewRegex =
    /<span class="tgme_widget_message_views">([^<]*)<\/span>/;

  // Split by message blocks for more reliable parsing
  const blocks = html.split('class="tgme_widget_message_wrap');

  for (const block of blocks) {
    // Extract post ID
    const idMatch = block.match(/data-post="[^/]+\/(\d+)"/);
    if (!idMatch) continue;

    // Extract text content
    const textMatch = block.match(
      /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/div>)?\s*(?:<div class="tgme_widget_message_info|<div class="tgme_widget_message_footer)/
    );
    if (!textMatch) continue;

    // Clean HTML tags from text, keep line breaks
    let text = textMatch[1]
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&nbsp;/g, " ")
      .trim();

    // Skip very short messages (likely just links/media)
    if (text.length < 20) continue;

    // Extract date
    const dateMatch = block.match(dateRegex);
    const date = dateMatch ? dateMatch[1] : "";

    // Extract views
    const viewMatch = block.match(viewRegex);
    const views = viewMatch ? viewMatch[1].trim() : "";

    messages.push({
      id: idMatch[1],
      date,
      text,
      views,
    });
  }

  // Return latest 8 messages, newest first
  return messages.slice(-8).reverse();
}
