"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function LiveSection() {
  const [loaded, setLoaded] = useState(false);

  const src =
    "https://www.youtube.com/embed/live_stream?channel=" +
    encodeURIComponent(site.youtubeChannelId) +
    "&autoplay=1&rel=0";

  return (
    <div className="reveal d1 lg:col-span-2">
      <div className="group relative aspect-video w-full overflow-hidden rounded-xl glass">
        {loaded ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={src}
            title="Live stream Polestar Indonesia"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label="Putar live stream YouTube Polestar Indonesia"
          >
            <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded bg-down px-2.5 py-1 text-xs font-bold text-white">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-white" /> LIVE
            </span>
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="inline-flex h-[68px] w-[68px] items-center justify-center rounded-full bg-down group-hover:scale-105 transition-transform duration-200">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-white translate-x-0.5" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="font-display font-semibold text-lg">Tonton Sesi Live</span>
              <span className="text-sm text-faint">Klik untuk memuat pemutar YouTube</span>
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-faint">
        Streaming langsung dari channel YouTube {site.name}. Saat tidak ada siaran, video edukasi terbaru ditampilkan.
      </p>
    </div>
  );
}
