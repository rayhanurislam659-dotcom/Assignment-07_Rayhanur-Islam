import { formatBengaliNumber, getUnitShort } from "@/lib/bengali";
import type { Product } from "@/lib/types";
import { PriceChangeBadge } from "@/components/products/PriceChangeBadge";

function TickerGroup({
  products,
  hidden = false,
}: {
  products: Product[];
  hidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {products.map((product) => (
        <span
          key={`${hidden ? "copy" : "main"}-${product.id}`}
          className="flex shrink-0 items-center gap-2 border-r border-white/10 px-3.5 py-2.5 sm:gap-2.5 sm:px-5"
        >
          <span aria-hidden="true" className="text-base leading-none">
            {product.image}
          </span>
          <span className="whitespace-nowrap text-[11px] font-semibold text-cream-100/90 sm:text-xs">
            {product.nameBn}
          </span>
          <span aria-hidden="true" className="text-cream-200/25">
            ·
          </span>
          <span className="whitespace-nowrap font-sans text-xs font-bold text-cream-50 sm:text-sm">
            {formatBengaliNumber(product.today)} টাকা/{getUnitShort(product.unit)}
          </span>
          <PriceChangeBadge
            direction={product.change.dir}
            percent={product.change.pct}
            size="sm"
            tone="dark"
          />
        </span>
      ))}
    </div>
  );
}

export function PriceTicker({ products }: { products: Product[] }) {
  return (
    <div className="marquee relative border-b border-ink-950/10 bg-ink-950 text-cream-100">
      <div className="flex items-stretch">
        <div className="relative z-20 flex shrink-0 items-center gap-1.5 border-r border-white/10 bg-ink-950 px-3 sm:px-4">
          <span
            aria-hidden="true"
            className="size-1.5 animate-pulse rounded-full bg-saffron-500"
          />
          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] text-cream-200/80 sm:text-[11px]">
            লাইভ বাজারদর
          </span>
        </div>

        <div className="marquee-mask relative flex-1 overflow-hidden">
          {products.length > 0 ? (
            <div className="marquee-track flex w-max animate-marquee">
              <TickerGroup products={products} />
              <TickerGroup products={products} hidden />
            </div>
          ) : (
            <div className="flex items-center px-4 py-2.5 text-[11px] font-medium text-cream-200/60 sm:text-xs">
              আজকের বাজারদর লোড করা যাচ্ছে না — কিছুক্ষণ পর আবার চেষ্টা করুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
