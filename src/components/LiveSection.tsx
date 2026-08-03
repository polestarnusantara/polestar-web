"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Live YouTube embed yang otomatis menampilkan:
 * 1. Live stream jika sedang siaran (via YouTube oEmbed check)
 * 2. Video terbaru dari channel jika tidak sedang live
 *
 * Menggunakan YouTube iframe API dengan format embed yang benar.
 */
export default function LiveSection() {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let alive = true;

    async function resolveEmbed() {
      // Coba format live stream dulu
      // YouTube channel live embed menggunakan format /live baru
      const liveUrl = `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(
        site.youtubeChannelId
      )}&autoplay=1&mute=1&playsinline=1&rel=0`;

      // Juga coba format embed /channel/ID/live
      // Format terbaru YouTube: embed channel langsung
      const channelLiveUrl = `https://www.youtube.com/embed?listType=user_uploads&list=${encodeURIComponent(
        site.youtubeChannelId
      )}&autoplay=1&mute=1&playsinline=1&rel=0`;

      // Cek apakah channel punya video lewat oEmbed
      try {
        const check = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/@polestar.indonesia/live&format=json`,
          { mode: "cors" }
        );
        if (check.ok && alive) {
          const data = await check.json();
          // Jika ada thumbnail, berarti ada live/video aktif
          if (data.thumbnail_url) {
            // Extract video ID dari thumbnail URL
            const vidMatch = data.thumbnail_url.match(
              /\/vi\/([a-zA-Z0-9_-]+)\//
            );
            if (vidMatch) {
              setEmbedUrl(
                `https://www.youtube.com/embed/${vidMatch[1]}?autoplay=1&mute=1&playsinline=1&rel=0`
              );
              setIsLive(data.title?.toLowerCase().includes("live") || false);
              return;
            }
          }
        }
      } catch {
        // oEmbed gagal (CORS, etc) — fallback ke channel embed
      }

      // Fallback: embed playlist uploads dari channel
      if (alive) {
        // UCqG3... → UUqG3... (ganti UC ke UU untuk uploads playlist)
        const uploadsPlaylist = site.youtubeChannelId.replace(/^UC/, "UU");
        setEmbedUrl(
          `https://www.youtube.com/embed/videoseries?list=${uploadsPlaylist}&autoplay=1&mute=1&playsinline=1&rel=0`
        );
      }
    }

    resolveEmbed();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="reveal d1 lg:col-span-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl glass bg-gradient-to-br from-brand-deep to-brand-dark">
        {/* Live badge */}
        <span
          className={`absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded px-2.5 py-1 text-xs font-bold text-white ${
            isLive ? "bg-down" : "bg-brand-dark"
          }`}
        >
          <span
            className={`pulse-dot inline-block h-2 w-2 rounded-full ${
              isLive ? "bg-white" : "bg-brand-light"
            }`}
          />
          {isLive ? "LIVE" : "VIDEO"}
        </span>

        {embedUrl ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title="Live stream Polestar Indonesia"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // Loading placeholder
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-brand-light/30 animate-pulse"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
              </svg>
              <p className="mt-3 text-sm text-faint">Memuat video...</p>
            </div>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-faint">
        Streaming langsung dari channel YouTube {site.name}. Otomatis diputar
        saat sedang live; jika tidak ada siaran, video edukasi terbaru
        ditampilkan.
      </p>
    </div>
  );
}
