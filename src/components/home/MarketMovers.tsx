import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";
import { formatBengaliNumber, getUnitLabel } from "@/lib/bengali";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PriceChangeBadge } from "@/components/products/PriceChangeBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

function MoverPanel({
  title,
  titleSymbol,
  subtitle,
  tone,
  items,
}: {
  title: string;
  titleSymbol: string;
  subtitle: string;
  tone: "up" | "down";
  items: Product[];
}) {
  const isUp = tone === "up";
  const Icon = isUp ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.85rem] border border-line/85 bg-cream-50/85 shadow-card",
        isUp ? "ring-1 ring-up/5" : "ring-1 ring-down/5",
      )}
      id={isUp ? "আজ-দাম-বেড়েছে" : "আজ-দাম-কমেছে"}
    >
      <div
        aria-hidden="true"
        className={cn(
          "h-1.5 w-full bg-gradient-to-r",
          isUp ? "from-up via-leaf-500 to-leaf-300" : "from-down via-tomato-600/80 to-saffron-300",
        )}
      />
      <div className="flex items-start justify-between gap-3 p-4 pb-3 sm:p-5 sm:pb-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-2xl",
              isUp ? "bg-up-soft text-up" : "bg-down-soft text-down",
            )}
          >
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-ink-950 sm:text-xl">
              {title}{" "}
              <span className={isUp ? "text-up" : "text-down"} aria-hidden="true">
                {titleSymbol}
              </span>
            </h3>
            <p className="mt-0.5 text-[11px] text-ink-800/60">{subtitle}</p>
          </div>
        </div>
        <span className="hidden shrink-0 rounded-full border border-line bg-cream-50 px-2.5 py-1 text-[10px] font-semibold text-ink-800/50 sm:block">
          শীর্ষ ৬
        </span>
      </div>

      <div className="space-y-1 px-2 pb-3 sm:px-3">
        {items.map((product, index) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group flex items-center gap-2.5 rounded-2xl px-2 py-2 transition hover:bg-cream-100/80 sm:gap-3 sm:px-2.5"
          >
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                isUp ? "bg-up-soft text-up" : "bg-down-soft text-down",
              )}
            >
              {formatBengaliNumber(index + 1)}
            </span>
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-cream-100 text-xl ring-1 ring-line/60 transition group-hover:scale-105 sm:size-10 sm:text-[1.35rem]"
            >
              {product.image}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold text-ink-950 sm:text-sm">
                {product.nameBn}
              </span>
              <span className="mt-0.5 block text-[10px] text-ink-800/55">
                {getUnitLabel(product.unit)}
              </span>
            </span>
            <span className="shrink-0 text-right">
              <span className="block whitespace-nowrap font-sans text-sm font-bold text-ink-950 sm:text-[15px]">
                {formatBengaliNumber(product.today)}{" "}
                <span className="text-[10px] font-semibold text-ink-800/50">টাকা</span>
              </span>
              <span className="mt-0.5 block">
                <PriceChangeBadge
                  direction={product.change.dir}
                  percent={product.change.pct}
                  size="sm"
                />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MarketMovers({ products }: { products: Product[] }) {
  const risers = products
    .filter((product) => product.change.dir === "up" && product.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change.dir === "down" && product.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div>
      <SectionHeading
        eyebrow="আজকের বাজার"
        title={
          <>
            দামের ওঠানামা,{" "}
            <span className="text-leaf-700">এক নজরে</span>
          </>
        }
        description="গতকালের তুলনায় সবচেয়ে বেশি বাড়া ও কমা ৬টি পণ্য—বাজারে যাওয়ার আগে জেনে নিন আজ কী বদলেছে।"
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:gap-5">
        <MoverPanel
          title="আজ দাম বেড়েছে"
          titleSymbol="▲"
          subtitle="সর্বোচ্চ বৃদ্ধির শীর্ষ ৬টি পণ্য"
          tone="up"
          items={risers}
        />
        <MoverPanel
          title="আজ দাম কমেছে"
          titleSymbol="▼"
          subtitle="সর্বোচ্চ কমার শীর্ষ ৬টি পণ্য"
          tone="down"
          items={fallers}
        />
      </div>
    </div>
  );
}
