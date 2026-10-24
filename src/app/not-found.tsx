import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, SearchX, ShoppingBasket } from "lucide-react";
import { buttonClass } from "@/components/ui/button-styles";
import { FALLBACK_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "পেজ পাওয়া যায়নি",
  description:
    "আপনি যে পেজটি খুঁজছেন তা নেই অথবা সরিয়ে ফেলা হয়েছে। হোম পেজে ফিরে আজকের বাজারদর দেখুন।",
};

export default function NotFound() {
  return (
    <div className="shell py-12 sm:py-20">
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-line/80 bg-cream-50/85 px-5 py-12 text-center shadow-card sm:px-10 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 size-64 rounded-full bg-saffron-100/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-16 size-64 rounded-full bg-leaf-100/70 blur-3xl"
        />

        <div className="relative">
          <div className="relative mx-auto w-fit">
            <span className="grid size-24 place-items-center rounded-[1.9rem] bg-gradient-to-br from-cream-100 to-saffron-100 text-ink-900 shadow-[inset_0_0_0_1px_rgba(232,223,204,0.9)]">
              <ShoppingBasket
                aria-hidden="true"
                className="size-11"
                strokeWidth={1.6}
              />
            </span>
            <span className="absolute -right-3 -top-3 grid size-9 place-items-center rounded-full bg-down-soft text-down ring-1 ring-down/10">
              <SearchX aria-hidden="true" className="size-4" />
            </span>
            <span className="absolute -bottom-2 -left-4 rounded-full bg-ink-950 px-2.5 py-1 font-sans text-[11px] font-bold text-cream-50">
              ৪০৪
            </span>
          </div>

          <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink-800/55">
            <Compass aria-hidden="true" className="size-3.5" />
            ভুল ঠিকানা
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink-950 sm:text-4xl">
            উফ! পেজটি খুঁজে পাওয়া যাচ্ছে না
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-800/60">
            লিংকটি হয়তো ভুল, অথবা পেজটি সরিয়ে ফেলা হয়েছে। চিন্তা নেই—হোম
            পেজে ফিরে গেলে আজকের সব পণ্যের দাম আবার দেখতে পাবেন।
          </p>

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Link
              href="/"
              className={buttonClass({ variant: "primary", size: "md" })}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              হোম পেজে ফিরে যান
            </Link>
            <Link
              href="/#সব-পণ্য"
              className={buttonClass({ variant: "outline", size: "md" })}
            >
              সব পণ্যের দাম দেখুন
            </Link>
          </div>

          <div className="mt-8 border-t border-dashed border-line pt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-800/40">
              জনপ্রিয় ক্যাটাগরি
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {FALLBACK_CATEGORIES.slice(0, 5).map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream-50 px-3 py-1.5 text-[11px] font-semibold text-ink-800/65 transition hover:border-leaf-500/30 hover:bg-leaf-50 hover:text-leaf-700"
                >
                  <span aria-hidden="true">{category.icon}</span>
                  {category.nameBn}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
