// ════════════════════════════════════════════════════════════════
//  KATALOG PRODUK — sumber data tunggal (statis, aman untuk Vercel).
//  Menambah produk baru: cukup tambahkan satu objek pada array `catalog`
//  di bawah, lalu deploy ulang. Tidak perlu database.
// ════════════════════════════════════════════════════════════════

export type Tier = {
  id: number;
  name: string;
  price: number;
  unit: string;
  note: string | null;
  highlight: boolean;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string; // "Expert Advisor" | "AI Signal"
  platform: string;
  tagline: string;
  description: string;
  highlights: string[];
  benefits: string[];
  accent: string; // warna aksen kartu (hex)
  logo?: string; // path logo di /public (mis. "/logos/nama.png"); opsional
  logoBg?: "light" | "dark"; // latar tile logo. Default "dark" (untuk logo berteks putih).
  tiers: Tier[];
};

const catalog: Product[] = [
  {
    id: 1,
    slug: "starbot",
    name: "STARBOT",
    category: "Expert Advisor",
    platform: "MetaTrader 4 & 5",
    tagline: "EA multi-strategi untuk MT4 & MT5",
    description:
      "Expert Advisor dengan pilihan multi-strategi — Single Entry, Pending Order (Buy/Sell Stop & Limit), Averaging, dan Martingale — yang dieksekusi berdasarkan sinyal dari indikator.",
    highlights: [
      "Single Entry & Pending Order",
      "Averaging & Martingale",
      "Berbasis sinyal indikator",
      "Kompatibel MT4 & MT5",
    ],
    benefits: [],
    accent: "#16A34A",
    logo: "/logos/starbot.png",
    tiers: [
      { id: 11, name: "Lisensi", price: 1500000, unit: "sekali bayar", note: null, highlight: true },
    ],
  },
  {
    id: 2,
    slug: "gold-mind-ai",
    name: "Gold Mind AI",
    category: "AI Signal",
    platform: "Sinyal ke MT5 via Telegram",
    tagline: "AI signal emas real-time dari OKX & OANDA",
    description:
      "Signal AI dengan data real-time dari OKX & OANDA. Engine AI menghitung take-profit & stop-loss, melakukan auto-scan persilangan MACD/EMA, dan mengeksekusi order satu sentuh ke MT5 langsung dari Telegram.",
    highlights: [
      "Data real-time OKX & OANDA",
      "TP & SL dihitung oleh AI",
      "Auto-scan persilangan MACD/EMA",
      "Order satu sentuh ke MT5 via Telegram",
    ],
    benefits: [],
    accent: "#CA8A04",
    logo: "/logos/gold-mind-ai.png",
    tiers: [
      { id: 21, name: "Basic", price: 1500000, unit: "/bln", note: null, highlight: false },
      { id: 22, name: "Premium", price: 3000000, unit: "/bln", note: null, highlight: true },
      { id: 23, name: "VIP", price: 5000000, unit: "/bln", note: null, highlight: false },
    ],
  },
  {
    id: 3,
    slug: "tradingmatic-bot",
    name: "TradingMatic Bot",
    category: "Expert Advisor",
    platform: "MetaTrader 4",
    tagline: "EA Single Shoot dengan paket edukasi lengkap",
    description:
      "Expert Advisor untuk MetaTrader 4 dengan strategi Single Shoot, Fix Lot, serta SL & TP terukur berdasarkan indikator custom yang teruji dengan win rate tinggi.",
    highlights: [
      "Education",
      "Zoom online learning",
      "Consultation",
      "Live Trading",
      "Tools/Indicator",
    ],
    benefits: [
      "Semua benefit Special Member",
      "EA Single Entry / One Shoot",
      "T-Shirt komunitas eksklusif",
      "Profit sepenuhnya hak member",
      "Tidak ada profit sharing",
      "Sewa Full EA",
    ],
    accent: "#6366F1",
    logo: "/logos/tradingmatic-bot.png",
    tiers: [
      { id: 31, name: "Starter", price: 500000, unit: "sekali bayar", note: "Balance $100 – $999", highlight: false },
      { id: 32, name: "Basic", price: 1000000, unit: "sekali bayar", note: "Balance $1.000", highlight: true },
      { id: 33, name: "Professional", price: 2000000, unit: "sekali bayar", note: "Balance hingga $2.000", highlight: false },
    ],
  },
  {
    id: 4,
    slug: "finsfree",
    name: "Finsfree",
    category: "AI Signal",
    platform: "32 simbol · 6 timeframe",
    tagline: "AI signal profesional untuk trader ritel",
    description:
      "Alat AI bermutu profesional untuk trader ritel. Sinyal beli/jual real-time didukung analisis multi-indikator AI — tahu kapan masuk, di mana menempatkan stop, dan apa yang diharapkan, untuk 32 simbol dan 6 timeframe.",
    highlights: [
      "Sinyal beli/jual real-time",
      "Analisis multi-indikator AI",
      "Entry, stop & ekspektasi jelas",
      "32 simbol & 6 timeframe",
    ],
    benefits: [],
    accent: "#1E3A8A",
    logo: "/logos/finsfree.png",
    logoBg: "light",
    tiers: [
      { id: 41, name: "Basic", price: 1500000, unit: "/bln", note: null, highlight: false },
      { id: 42, name: "Premium", price: 3000000, unit: "/bln", note: null, highlight: true },
      { id: 43, name: "VIP", price: 5000000, unit: "/bln", note: null, highlight: false },
    ],
  },
  {
    id: 5,
    slug: "quadran-ea",
    name: "Quadran EA MT5",
    category: "Expert Advisor",
    platform: "MetaTrader 5",
    tagline: "Smart Breakout Trading System",
    description:
      "Expert Advisor untuk MetaTrader 5 yang menggunakan sistem Smart Breakout Trading dengan manajemen lot bertingkat sesuai paket.",
    highlights: [
      "Sistem Smart Breakout Trading",
      "Khusus MetaTrader 5",
      "Manajemen lot bertingkat",
    ],
    benefits: [],
    accent: "#3B82F6",
    logo: "/logos/quadran-ea.png",
    tiers: [
      { id: 51, name: "Basic", price: 1000000, unit: "sekali bayar", note: "lot 0,01 – 0,1", highlight: false },
      { id: 52, name: "Pro", price: 3000000, unit: "sekali bayar", note: "lot 0,01 – 1", highlight: true },
      { id: 53, name: "Premium", price: 5000000, unit: "sekali bayar", note: "lot 0,01 – 10", highlight: false },
    ],
  },
];

export async function getProducts(): Promise<Product[]> {
  return catalog;
}
