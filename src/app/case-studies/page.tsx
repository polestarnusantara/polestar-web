import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & News",
  description: "Kumpulan cerita sukses, berita acara, dan portofolio Polestar Inovasi Nusantara dalam mengelola event korporat B2B.",
};

const caseStudies = [
  {
    slug: "sas-journalist-workshop-2026",
    title: "Sukses Digelar! Kolaborasi Polestar dan SAS Edukasi Jurnalis Terkait Mitigasi Risiko Investasi di Era Digital",
    date: "12 Agustus 2026",
    category: "Workshop & Seminar",
    image: "/case-studies/sas-workshop/1.jpg",
    summary: "Polestar dengan bangga mengumumkan keberhasilan kolaborasi bersama PT Smartin Advisor Sistem (SAS) dalam menyelenggarakan acara Workshop Journalist SAS 2026 yang dihadiri oleh 20 jurnalis media massa nasional."
  }
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-canvas pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center text-sm text-ink-light hover:text-white transition-colors mb-6 group">
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-tight font-bold text-white tracking-tight mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-ink-light max-w-2xl">
            Jejak rekam keberhasilan Polestar Inovasi Nusantara dalam mengeksekusi berbagai acara B2B, seminar, dan pameran perusahaan secara profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Link 
              key={study.slug} 
              href={`/case-studies/${study.slug}`}
              className="group block bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden bg-ink/50">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-white/50">{study.date}</span>
                  <span className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded-full">{study.category}</span>
                </div>
                <h2 className="text-xl font-tight font-semibold text-white leading-snug mb-3 group-hover:text-blue-400 transition-colors line-clamp-3">
                  {study.title}
                </h2>
                <p className="text-sm text-ink-light line-clamp-3">
                  {study.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
