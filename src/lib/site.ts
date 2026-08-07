// ════════════════════════════════════════════════════════════════
//  Konfigurasi Polestar Indonesia — Event Organizer B2B
// ════════════════════════════════════════════════════════════════
export const site = {
  name: "Polestar Indonesia",
  // Nomor WhatsApp format internasional tanpa "+" atau "0" depan (62 = Indonesia)
  whatsapp: "6285123303455", // ← ganti dengan nomor WA Anda
  email: "polestarnusantara@gmail.com",
};

/** Bangun link wa.me dengan pesan konsultasi event. */
export function waContactLink(subject: string = "Konsultasi Event"): string {
  const text = `Halo Polestar Indonesia, saya ingin berkonsultasi mengenai ${subject}. Boleh info lebih lanjut?`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
