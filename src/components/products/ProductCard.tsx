import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatBengaliNumber, getUnitLabel } from "@/lib/bengali";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PriceChangeBadge } from "@/components/products/PriceChangeBadge";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[1.6rem] border border-line/80 bg-cream-50/90 p-4 shadow-[0_10px_28px_-24px_rgba(23,58,41,0.5)] transition duration-300 hover:-translate-y-1 hover:border-leaf-500/30 hover:bg-cream-50 hover:shadow-card sm:p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="relative grid size-16 shrink-0 place-items-center rounded-[1.25rem] bg-gradient-to-br from-saffron-100 via-cream-50 to-leaf-50 text-[2.15rem] shadow-[inset_0_0_0_1px_rgba(232,223,204,0.75)] sm:size-[4.5rem] sm:text-4xl">
          <span
            aria-hidden="true"
            className="drop-shadow-[0_6px_8px_rgba(72,52,20,0.15)] transition duration-300 group-hover:scale-110"
          >
            {product.image}
          </span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-semibold text-ink-800/75 ring-1 ring-line/60">
            {product.categoryIcon} {product.categoryNameBn}
          </span>
          <span className="grid size-7 place-items-center rounded-full border border-line bg-cream-50 text-ink-800/45 transition group-hover:border-leaf-500/30 group-hover:bg-leaf-50 group-hover:text-leaf-700">
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </span>
        </div>
      </div>

      <div className="mt-4 flex-1">
        <h3 className="font-display text-[1.1rem] font-semibold leading-snug text-ink-950">
          {product.nameBn}
        </h3>
        <p className="mt-1 text-[13px] font-medium text-ink-800/60">
          {getUnitLabel(product.unit)}
        </p>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2 border-t border-dashed border-line pt-3.5">
        <div>
          <span className="block text-[11px] font-semibold tracking-wide text-ink-800/55">
            আজকের দাম
          </span>
          <p className="mt-0.5 flex items-baseline gap-1 whitespace-nowrap">
            <span className="font-sans text-[1.65rem] font-bold leading-none tracking-tight text-ink-950 tabular-nums">
              {formatBengaliNumber(product.today)}
            </span>
            <span className="text-xs font-semibold text-ink-800/60">টাকা</span>
          </p>
        </div>
        <PriceChangeBadge
          direction={product.change.dir}
          percent={product.change.pct}
          size="sm"
        />
      </div>
    </Link>
  );
}
