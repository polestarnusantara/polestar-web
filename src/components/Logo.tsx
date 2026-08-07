export function LogoDefs() {
  return null;
}

/**
 * Polestar Inovasi Nusantara logo.
 * Menggunakan tag <img> langsung agar ukuran tetap tajam dan konsisten.
 * File PNG 819×1024px cukup besar untuk ditampilkan di hero tanpa pecah.
 */
export default function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/polestar-logo.png"
      alt="Polestar Inovasi Nusantara"
      className={`${className} object-contain`}
      draggable={false}
    />
  );
}
