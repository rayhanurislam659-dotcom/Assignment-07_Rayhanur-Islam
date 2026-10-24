import Image from "next/image";
import { ArrowDown, MapPin, ShieldCheck, Sparkles, Store, TrendingUp } from "lucide-react";
import { buttonClass } from "@/components/ui/button-styles";
import { PriceChangeBadge } from "@/components/products/PriceChangeBadge";
import { formatBengaliNumber } from "@/lib/bengali";

const HERO_STATS = [
  { icon: Store, label: "৮টি ক্যাটাগরি", hint: "সব ধরনের পণ্য" },
  { icon: MapPin, label: "১২টি বাজার", hint: "বাজারভিত্তিক দাম" },
  { icon: TrendingUp, label: "প্রতিদিন আপডেট", hint: "উত্থান-পতনসহ" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 size-72 rounded-full bg-leaf-100/70 blur-3xl" />
        <div className="absolute -right-28 top-0 size-[26rem] rounded-full bg-saffron-100/80 blur-3xl" />
        <div
          className="absolute inset-x-0 top-0 h-full opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(23,58,41,0.13) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="shell relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8 lg:py-20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-leaf-600/15 bg-cream-50/80 py-1.5 pl-2 pr-3.5 text-[11px] font-semibold text-leaf-700 shadow-sm backdrop-blur sm:text-xs">
            <span className="grid size-6 place-items-center rounded-full bg-leaf-100">
              <Sparkles aria-hidden="true" className="size-3.5" />
            </span>
            প্রতিদিনের বাজার, এক নজরে
          </div>

          <h1 className="mt-5 font-display text-[2.55rem] font-bold leading-[1.14] tracking-tight text-ink-950 sm:text-[3.6rem] lg:text-[4.15rem]">
            আজকের{" "}
            <span className="relative inline-block text-leaf-700">
              বাজার দর
              <svg
                aria-hidden="true"
                viewBox="0 0 220 16"
                fill="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-saffron-500"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 11.5c35-7 76-9 112-7 37 2 68 5 102 2"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="mt-1 block text-ink-900">সঠিক সিদ্ধান্তের জন্য</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty-bn text-[15px] text-ink-800/70 sm:text-base">
            চাল, ডাল, সবজি, মাছ-মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম,
            বাজারভিত্তিক তুলনা আর দাম বাড়া-কমার হিসাব—সব এক জায়গায়।
          </p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="#সব-পণ্য"
              className={buttonClass({
                variant: "dark",
                size: "lg",
                className: "group w-full sm:w-auto",
              })}
            >
              সব পণ্যের দাম দেখুন
              <span className="grid size-6 place-items-center rounded-full bg-white/10 transition group-hover:translate-y-0.5">
                <ArrowDown aria-hidden="true" className="size-3.5" />
              </span>
            </a>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-800/50 sm:text-xs">
              <ShieldCheck aria-hidden="true" className="size-4 text-leaf-600" />
              বিস্তারিত দেখতে সাইন ইন করুন
            </span>
          </div>

          <ul className="mt-8 grid grid-cols-3 gap-2 border-t border-line/80 pt-5 sm:mt-10 sm:gap-4">
            {HERO_STATS.map((stat) => (
              <li key={stat.label} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-line bg-cream-50 text-leaf-700 sm:size-9">
                  <stat.icon aria-hidden="true" className="size-4" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold leading-tight text-ink-950 sm:text-xs">
                    {stat.label}
                  </span>
                  <span className="mt-0.5 hidden text-[10px] text-ink-800/45 sm:block">
                    {stat.hint}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[27rem] sm:max-w-[31rem] lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rotate-2 rounded-[2.75rem] bg-saffron-200/45 sm:-inset-4"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 size-24 rounded-full border-[14px] border-leaf-100/80"
          />
          <div className="hero-glow relative overflow-hidden rounded-[2.25rem] border-[5px] border-cream-50 bg-cream-100 shadow-soft sm:rounded-[2.75rem]">
            <Image
              src="/images/hero-market-basket.webp"
              alt="বাংলাদেশি বাজারের ঝুড়িতে চাল, সবজি, মাছ, ডিম ও মসলা"
              width={1000}
              height={1250}
              priority
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 500px, 520px"
              className="h-auto w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950/20 to-transparent"
            />
            <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-cream-50/85 py-1.5 pl-2 pr-3 text-[10px] font-bold text-ink-900 shadow-sm backdrop-blur sm:text-[11px]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-leaf-600" />
              </span>
              ১২টি বাজারে তুলনা
            </div>
          </div>

          <div className="absolute -right-1 top-[19%] hidden w-[12.5rem] animate-float-slow rounded-2xl border border-line/80 bg-cream-50/95 p-3 shadow-float backdrop-blur sm:block">
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-saffron-100 text-2xl">
                🧅
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-ink-950">পেঁয়াজ</p>
                <p className="text-[10px] text-ink-800/50">প্রতি কেজি</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-end justify-between">
              <p className="font-sans text-lg font-bold leading-none text-ink-950">
                {formatBengaliNumber(54)} <span className="text-[10px]">টাকা</span>
              </p>
              <PriceChangeBadge direction="up" percent={12.5} size="sm" />
            </div>
          </div>

          <div className="absolute -bottom-4 -left-2 w-[12.5rem] rounded-2xl border border-line/80 bg-cream-50/95 p-3 shadow-float backdrop-blur sm:-left-8 sm:bottom-10">
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-leaf-50 text-2xl">
                🥔
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-ink-950">আলু</p>
                <p className="text-[10px] text-ink-800/50">প্রতি কেজি</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-end justify-between">
              <p className="font-sans text-lg font-bold leading-none text-ink-950">
                {formatBengaliNumber(30)} <span className="text-[10px]">টাকা</span>
              </p>
              <PriceChangeBadge direction="down" percent={-6.2} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
