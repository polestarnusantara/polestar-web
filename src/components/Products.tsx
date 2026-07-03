import type { Product } from "@/lib/products";
import { rupiah, site } from "@/lib/site";
import ProductLogo from "./ProductLogo";

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ExternalLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4" />
    </svg>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="reveal rounded-2xl glass overflow-hidden">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-7 p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-line">
          <div className="flex items-center gap-3">
            <ProductLogo
              logo={product.logo}
              category={product.category}
              accent={product.accent}
              name={product.name}
            />
            <div className="flex items-center gap-2 font-mono text-xs text-faint uppercase tracking-wider">
              <span>{product.category}</span>
              <span className="text-silver">/</span>
              <span>{product.platform}</span>
            </div>
          </div>

          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">{product.name}</h3>
          <p className="mt-1 text-sm font-medium text-brand">{product.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-steel">{product.description}</p>

          <ul className="mt-5 grid sm:grid-cols-2 gap-2.5 text-sm">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 flex-none text-brand" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {product.benefits.length > 0 && (
            <div className="mt-6 border-t border-line pt-5">
              <p className="label text-faint">Benefit</p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2.5 text-sm">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-none text-brand" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 p-7 sm:p-9 bg-white/25">
          <p className="label text-faint">Paket Harga</p>
          <div className="mt-4 space-y-2.5">
            {product.tiers.map((t) => (
              <div
                key={t.id}
                className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 ${
                  t.highlight ? "border-brand bg-brand-tint" : "border-white/60 bg-white/55"
                }`}
              >
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    {t.name}
                    {t.highlight && (
                      <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
                        POPULER
                      </span>
                    )}
                  </p>
                  {t.note && <p className="mt-0.5 text-xs text-faint">{t.note}</p>}
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold">
                    {rupiah(t.price)}
                    {t.unit === "/bln" && <span className="text-faint">/bln</span>}
                  </p>
                  {t.unit !== "/bln" && (
                    <p className="text-[10px] text-faint">{t.unit}</p>
                  )}
                  <a
                    href={site.sas}
                    target="_blank"
                    rel="noopener"
                    className="text-xs font-semibold text-brand hover:underline"
                  >
                    Order →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <a
            href={site.sas}
            target="_blank"
            rel="noopener"
            className="mt-5 flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-3.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Click to Order
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Products({ products }: { products: Product[] }) {
  return (
    <section id="produk" className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
      <div className="reveal">
        <p className="label text-brand">01 — Produk &amp; Layanan</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.02]">
          Bot trading &amp; AI signal kami
        </h2>
        <p className="mt-4 max-w-2xl text-steel">
          Expert Advisor dan AI Signal yang teruji untuk MetaTrader 4 &amp; 5. Pilih paket yang sesuai, lalu order langsung di website resmi {site.sasName}.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
