// ════════════════════════════════════════════════════════════════
//  Konfigurasi Polestar Indonesia — ubah nilai di sini
// ════════════════════════════════════════════════════════════════
export const site = {
  name: "Polestar Indonesia",
  telegram: "https://t.me/grwindonesia", // ← link grup Telegram Anda
  // Nomor WhatsApp format internasional tanpa "+" atau "0" depan (62 = Indonesia)
  whatsapp: "6285123303455", // ← ganti dengan nomor WA Anda
  youtube: "https://www.youtube.com/@polestar.indonesia", // ← channel YouTube
  youtubeChannelId: "UCqG3UtxDNlC4MzCmyXWa66A", // ← untuk embed live
  email: "polestarnusantara@gmail.com",
  // Tombol order produk mengarah ke website PT SAS (Smartin Advisor Sistem)
  sas: "https://smartintrade.co.id/products/indicators", // ← GANTI dengan URL resmi PT SAS
  sasName: "PT SAS (Smartin Advisor Sistem)",
};

export function rupiah(value: number): string {
  return "Rp " + value.toLocaleString("id-ID");
}

/** Bangun link wa.me dengan pesan order yang sudah terisi. */
export function waOrderLink(productName: string, tierName: string): string {
  const text = `Halo Polestar Indonesia, saya tertarik dengan *${productName}* paket *${tierName}*. Boleh info lebih lanjut?`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
