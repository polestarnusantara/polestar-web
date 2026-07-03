import { site } from "@/lib/site";

// Live YouTube auto-play: embed `live_stream` dengan autoplay + muted.
// Saat channel sedang live, siaran otomatis diputar tanpa perlu klik.
// (Autoplay wajib muted sesuai kebijakan browser; pengunjung tinggal unmute.)
// Jika tidak ada siaran, YouTube menampilkan video/placeholder channel.
export default function LiveSection() {
  const src =
    "https://www.youtube.com/embed/live_stream?channel=" +
    encodeURIComponent(site.youtubeChannelId) +
    "&autoplay=1&mute=1&playsinline=1&rel=0";

  return (
    <div className="reveal d1 lg:col-span-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl glass bg-gradient-to-br from-brand-deep to-brand-dark">
        <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded bg-down px-2.5 py-1 text-xs font-bold text-white">
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-white" /> LIVE
        </span>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title="Live stream Polestar Indonesia"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="mt-3 text-xs text-faint">
        Streaming langsung dari channel YouTube {site.name}. Otomatis diputar saat sedang live; jika
        tidak ada siaran, video edukasi terbaru ditampilkan.
      </p>
    </div>
  );
}
