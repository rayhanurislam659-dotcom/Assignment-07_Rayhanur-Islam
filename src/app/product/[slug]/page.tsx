import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  MapPin,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { getProductBySlug } from "@/lib/api";
import {
  buildMarketSummary,
  formatBengaliNumber,
  formatDateBn,
  getChangeMeta,
  getMarketStats,
  getPricePosition,
  getUnitLabel,
  getUnitShort,
  groupMarketsByDivision,
} from "@/lib/bengali";
import { getServerSession } from "@/lib/session";
import { PriceChangeBadge } from "@/components/products/PriceChangeBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/button-styles";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) {
    return { title: "পণ্য পাওয়া যায়নি" };
  }

  const summary = buildMarketSummary(product);
  return {
    title: `${product.nameBn} — আজকের বাজারদর`,
    description: summary,
    openGraph: {
      title: `${product.nameBn} — আজকের বাজারদর`,
      description: summary,
      type: "article",
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const session = await getServerSession();
  if (!session) {
    redirect(
      `/signin?redirect=${encodeURIComponent(`/product/${slug}`)}&reason=protected`,
    );
  }

  const stats = getMarketStats(product);
  const summary = buildMarketSummary(product);
  const groups = groupMarketsByDivision(product.markets ?? []);
  const unit = getUnitShort(product.unit);
  const changeMeta = getChangeMeta(product.change.dir);
  const unitLabel = getUnitLabel(product.unit);

  const history = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহে", value: product.lastWeek },
    { label: "গত মাসে", value: product.lastMonth },
  ];

  return (
    <div className="shell py-6 sm:py-10">
      <nav
        aria-label="ব্রেডক্রাম্ব"
        className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-ink-800/50 sm:text-xs"
      >
        <Link href="/" className="transition hover:text-leaf-700">
          হোম
        </Link>
        <ChevronRight aria-hidden="true" className="size-3" />
        <Link
          href={`/category/${product.category}`}
          className="transition hover:text-leaf-700"
        >
          {product.categoryIcon} {product.categoryNameBn}
        </Link>
        <ChevronRight aria-hidden="true" className="size-3" />
        <span aria-current="page" className="text-ink-900">
          {product.nameBn}
        </span>
      </nav>

      <article className="card-surface relative mt-4 overflow-hidden rounded-[2rem] p-5 sm:mt-5 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-saffron-100/60 blur-3xl"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="flex flex-col">
            <div className="flex items-start gap-4 sm:gap-5">
              <span
                aria-hidden="true"
                className="grid size-20 shrink-0 place-items-center rounded-[1.5rem] bg-gradient-to-br from-saffron-100 via-cream-50 to-leaf-50 text-[2.6rem] shadow-[inset_0_0_0_1px_rgba(232,223,204,0.9)] sm:size-24 sm:text-5xl"
              >
                {product.image}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Link
                    href={`/category/${product.category}`}
                    className="inline-flex items-center gap-1 rounded-full bg-leaf-50 px-2.5 py-1 text-[11px] font-bold text-leaf-700 ring-1 ring-leaf-500/15 transition hover:bg-leaf-100"
                  >
                    {product.categoryIcon} {product.categoryNameBn}
                  </Link>
                  <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-semibold text-ink-800/70 ring-1 ring-line/60">
                    {unitLabel}
                  </span>
                </div>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink-950 sm:text-4xl">
                  {product.nameBn}
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-800/65 sm:text-[15px]">
              {summary}
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-3 border-t border-dashed border-line pt-5">
              <div>
                <span className="block text-[11px] font-bold tracking-wide text-ink-800/55">
                  আজকের দাম
                </span>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-sans text-[2.5rem] font-bold leading-none tracking-tight text-ink-950 tabular-nums sm:text-5xl">
                    {formatBengaliNumber(product.today)}
                  </span>
                  <span className="text-sm font-semibold text-ink-800/60">
                    টাকা / {unit}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-start gap-1.5 pb-1">
                <PriceChangeBadge
                  direction={product.change.dir}
                  percent={product.change.pct}
                />
                <span className="text-[11px] font-medium text-ink-800/50">
                  গতকাল ছিল {formatBengaliNumber(product.yesterday)} টাকা
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href={`/category/${product.category}`}
                className={buttonClass({ variant: "primary", size: "md" })}
              >
                পুরো {product.categoryNameBn} দেখুন
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/#সব-পণ্য"
                className={buttonClass({ variant: "outline", size: "md" })}
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                সব পণ্যে ফিরে যান
              </Link>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-ink-800/45">
              <span
                aria-hidden="true"
                className={`inline-block size-1.5 rounded-full ${changeMeta.textClass}`}
              />
              হালনাগাদ: {formatDateBn(new Date())} · সূত্র: বাজার দর
            </p>
          </div>

          <aside className="rounded-[1.6rem] bg-ink-950 p-5 text-cream-50 shadow-[0_22px_48px_-30px_rgba(11,33,23,0.9)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream-200/50">
                  দামের সারসংক্ষেপ
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold text-cream-50">
                  সারা দেশে আজ
                </h2>
              </div>
              <span className="grid size-10 place-items-center rounded-full bg-white/10 text-saffron-200">
                <Wallet aria-hidden="true" className="size-5" />
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-3 gap-2.5">
              {[
                {
                  label: "সর্বনিম্ন",
                  value: stats.min,
                  icon: TrendingDown,
                  color: "text-[#8ee8b2]",
                },
                {
                  label: "সর্বোচ্চ",
                  value: stats.max,
                  icon: TrendingUp,
                  color: "text-[#ffb0a7]",
                },
                {
                  label: "গড় দাম",
                  value: stats.avg,
                  icon: Wallet,
                  color: "text-saffron-200",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-2.5 py-3 sm:px-3"
                >
                  <dt className="flex items-center gap-1 text-[10px] font-semibold text-cream-200/55">
                    <item.icon
                      aria-hidden="true"
                      className={`size-3 ${item.color}`}
                    />
                    {item.label}
                  </dt>
                  <dd className="mt-1.5">
                    <span className="font-sans text-lg font-bold tabular-nums sm:text-xl">
                      {formatBengaliNumber(item.value)}
                    </span>
                    <span className="ml-0.5 text-[10px] font-medium text-cream-200/50">
                      টাকা
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream-200/45">
                দামের ইতিহাস
              </p>
              <ul className="mt-2.5 space-y-2">
                {history.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-cream-200/65">{item.label}</span>
                    <span className="font-sans font-semibold tabular-nums text-cream-50">
                      {formatBengaliNumber(item.value)}{" "}
                      <span className="text-[11px] font-medium text-cream-200/50">
                        টাকা/{unit}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-3 text-[11px] leading-relaxed text-cream-200/60">
              {stats.marketCount > 0 ? (
                <>
                  <span className="font-bold text-cream-50">
                    {formatBengaliNumber(stats.marketCount)}টি বাজার
                  </span>{" "}
                  ও{" "}
                  <span className="font-bold text-cream-50">
                    {formatBengaliNumber(stats.divisionCount)}টি বিভাগ
                  </span>{" "}
                  থেকে সংগৃহীত দামের ভিত্তিতে এই সারসংক্ষেপ তৈরি হয়েছে।
                </>
              ) : (
                "এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যাচ্ছে না।"
              )}
            </div>
          </aside>
        </div>
      </article>

      <section aria-labelledby="market-prices-heading" className="mt-10 sm:mt-14">
        <SectionHeading
          eyebrow="বাজারভিত্তিক তুলনা"
          title="বাজারভিত্তিক আজকের দাম"
          description="প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের রেঞ্জ এক নজরে দেখুন। দাগটি ওই বাজারের গড় দামের অবস্থান বোঝায়।"
          action={
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream-50/80 px-3.5 py-1.5 text-xs font-semibold text-ink-800/65">
              <MapPin aria-hidden="true" className="size-3.5 text-leaf-600" />
              {formatBengaliNumber(stats.marketCount)}টি বাজার
            </span>
          }
        />

        {groups.length > 0 ? (
          <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
            {groups.map((group) => (
              <article
                key={group.division}
                className="card-surface rounded-[1.75rem] p-5 sm:p-6"
              >
                <header className="flex items-center justify-between gap-3 border-b border-line/70 pb-3.5">
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-950">
                    <span className="grid size-8 place-items-center rounded-xl bg-leaf-50 text-leaf-700 ring-1 ring-leaf-500/15">
                      <MapPin aria-hidden="true" className="size-4" />
                    </span>
                    {group.division} বিভাগ
                  </h3>
                  <span className="text-[11px] font-semibold text-ink-800/45">
                    {formatBengaliNumber(group.markets.length)}টি বাজার
                  </span>
                </header>

                <ul className="mt-4 space-y-3.5">
                  {group.markets.map((market) => {
                    const position = getPricePosition(
                      market,
                      stats.min,
                      stats.max,
                    );
                    return (
                      <li key={`${group.division}-${market.market}`}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-[13px] font-semibold text-ink-900">
                            {market.market}
                          </span>
                          <span className="shrink-0 font-sans text-[13px] font-semibold tabular-nums text-ink-950">
                            {formatBengaliNumber(market.min)}
                            <span className="text-ink-800/40">–</span>
                            {formatBengaliNumber(market.max)}
                            <span className="ml-1 text-[10px] font-medium text-ink-800/45">
                              টাকা/{unit}
                            </span>
                          </span>
                        </div>
                        <div className="relative mt-2 h-1.5 rounded-full bg-cream-200">
                          <span
                            aria-hidden="true"
                            className="market-bar absolute inset-y-0 left-0 rounded-full opacity-70"
                            style={{ width: `${position}%` }}
                          />
                          <span
                            aria-hidden="true"
                            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cream-50 bg-leaf-600 shadow-[0_1px_4px_rgba(11,33,23,0.35)]"
                            style={{ left: `${position}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="card-surface mt-6 rounded-[1.75rem] px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold text-ink-950">
              বাজারভিত্তিক দাম এখনো যোগ করা হয়নি
            </p>
            <p className="mt-2 text-sm text-ink-800/60">
              কিছুক্ষণ পর আবার দেখুন, অথবা অন্য পণ্যের দাম দেখুন।
            </p>
            <Link
              href="/#সব-পণ্য"
              className={buttonClass({
                variant: "primary",
                size: "md",
                className: "mt-5",
              })}
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        )}
      </section>

      <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-ink-800/40">
        দাম বাজার ও সময়ভেদে পরিবর্তিত হতে পারে। কেনাকাটার আগে স্থানীয় বাজারের
        সাম্প্রতিক দাম যাচাই করে নিন।
      </p>
    </div>
  );
}
