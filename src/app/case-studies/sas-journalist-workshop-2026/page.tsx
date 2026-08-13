import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAS Journalist Workshop 2026 | Polestar Inovasi Nusantara",
  description: "Kolaborasi Polestar dan SAS edukasi jurnalis terkait mitigasi risiko investasi di era digital dalam Workshop Journalist SAS 2026.",
};

export default function ArticlePage() {
  return (
    <main className="min-h-screen bg-canvas pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        
        {/* Back Link */}
        <Link href="/case-studies" className="inline-flex items-center text-sm text-ink-light hover:text-white transition-colors mb-12 group">
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Case Studies
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">Workshop & Seminar</span>
            <span className="text-sm font-mono text-white/50">12 Agustus 2026</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-tight font-bold text-white tracking-tight leading-tight mb-6">
            Sukses Digelar! Kolaborasi Polestar dan SAS Edukasi Jurnalis Terkait Mitigasi Risiko Investasi di Era Digital
          </h1>
        </header>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12 bg-ink/50 border border-white/5">
          <Image
            src="/case-studies/sas-workshop/1.jpg"
            alt="Suasana Workshop Journalist SAS 2026"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-p:text-ink-light prose-p:leading-relaxed prose-headings:font-tight prose-headings:text-white prose-a:text-blue-400">
          <p>
            <strong className="text-white">Jakarta</strong> - Polestar dengan bangga mengumumkan keberhasilan kolaborasi bersama PT Smartin Advisor Sistem (SAS) dalam menyelenggarakan acara <strong>Workshop Journalist SAS 2026</strong>. Acara yang mengusung tema utama <em>"Pemanfaatan Teknologi dalam Mitigasi dan Menangkap Peluang Investasi"</em> ini telah terselenggara dengan lancar pada hari Rabu, 12 Agustus 2026, bertempat di Hotel Nemuru Grand Bellevue, Jakarta Selatan.
          </p>
          <p>
            Workshop ini secara khusus membedah penerapan teknologi <em>Artificial Intelligence</em> (AI) dan <em>Expert Advisor</em> (EA) dalam ekosistem Perdagangan Berjangka Komoditi (PBK) serta aset kripto, guna membantu investor memitigasi risiko pada kondisi pasar yang dinamis.
          </p>

          <div className="grid grid-cols-2 gap-4 my-10">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-ink/50 border border-white/5">
              <Image src="/case-studies/sas-workshop/2.jpg" alt="Peserta Workshop SAS 2026" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-ink/50 border border-white/5">
              <Image src="/case-studies/sas-workshop/3.jpg" alt="Sesi presentasi SAS 2026" fill className="object-cover" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Dihadiri oleh Jurnalis Senior dan Pakar Industri</h2>
          <p>
            Acara ini diikuti oleh 20 jurnalis media massa yang berbasis di Jakarta. Antusiasme dan kualitas diskusi sangat tinggi, mengingat mayoritas peserta (81,8%) merupakan jurnalis senior yang telah berpengalaman lebih dari 10 tahun di industri media.
          </p>
          <p>
            Dipandu oleh jurnalis senior, Edo Rusyanto, sebagai moderator, workshop ini menghadirkan diskusi komprehensif dari jajaran narasumber ahli di bidangnya, antara lain:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8 text-ink-light">
            <li><strong>Odang Supriatna, MM, WPA</strong> – Direktur Utama PT Smartin Advisor Sistem</li>
            <li><strong>Arwandi J Setiabudi</strong> – President Director ACM Mercantile Exchange</li>
            <li><strong>Ervan Chandra Gunawan SE, WPA</strong> – Chief Technology Officer PT Smartin Advisor Sistem</li>
            <li><strong>Geraldo Kofit, CSA, CTA, WPB</strong> – Analis Dupoin Futures Indonesia</li>
            <li><strong>Fini Charisa</strong> – Product Marketing Supervisor Bittime</li>
          </ul>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden my-12 bg-ink/50 border border-white/5">
            <Image src="/case-studies/sas-workshop/4.jpg" alt="Narasumber Workshop Journalist SAS 2026" fill className="object-cover" />
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Sorotan Utama: Pentingnya Teknologi dalam Manajemen Risiko</h2>
          <p>
            Data interaktif yang dihimpun selama kegiatan berlangsung menunjukkan tingginya keterlibatan peserta dalam dunia investasi. Tercatat sebanyak 52,6% responden mengaku aktif berinvestasi saham serta <em>trading futures</em> dan kripto. Minat instrumen investasi tertinggi mengarah pada kombinasi Kripto, Saham, dan XAU/USD (52,6%).
          </p>
          <p>
            Lebih jauh, terungkap bahwa 89,4% jurnalis yang hadir sepakat bahwa mereka sangat membutuhkan gabungan instrumen teknologi, teknikal, dan fundamental untuk meracik strategi dan memitigasi risiko investasi secara efektif.
          </p>

          <div className="grid grid-cols-2 gap-4 my-10">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-ink/50 border border-white/5">
              <Image src="/case-studies/sas-workshop/5.jpg" alt="Antusiasme peserta SAS 2026" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-ink/50 border border-white/5">
              <Image src="/case-studies/sas-workshop/6.jpg" alt="Sesi networking Polestar dan SAS" fill className="object-cover" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Dukungan Polestar pada Literasi Keuangan Digital</h2>
          <p>
            Kolaborasi bersama SAS dalam menyukseskan acara ini merupakan wujud nyata komitmen Polestar dalam memajukan literasi dan edukasi keuangan digital yang aman. Keberhasilan penyampaian pesan dari kolaborasi ini terbukti dari meluasnya publikasi, di mana jalannya kegiatan serta foto acara berhasil diliput oleh 20 portal media daring nasional terkemuka (seperti Investor.id, Kompas.com, Bisnis.com, dan Kontan).
          </p>
          <p>
            Polestar dan SAS mengucapkan terima kasih yang sebesar-besarnya atas dukungan dari seluruh pihak. Ke depan, kami akan terus mendorong kolaborasi strategis untuk menciptakan ekosistem investasi yang inklusif, teredukasi, dan terukur.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col items-center text-center">
          <h3 className="text-2xl font-tight font-bold text-white mb-4">Ingin Menyelenggarakan Event Serupa?</h3>
          <p className="text-ink-light mb-8 max-w-lg">
            Percayakan kebutuhan event korporat, seminar, dan brand activation perusahaan Anda kepada tim profesional Polestar Inovasi Nusantara.
          </p>
          <Link
            href="https://wa.me/6281313155174?text=Halo%20Polestar%20Inovasi%20Nusantara!%20Saya%20tertarik%20menggunakan%20jasa%20Event%20Organizer%20untuk%20acara%20perusahaan%20saya.%20Bisa%20berkonsultasi?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-white text-canvas px-8 py-4 font-mono font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            Konsultasikan Event Anda
          </Link>
        </div>

      </article>
    </main>
  );
}
