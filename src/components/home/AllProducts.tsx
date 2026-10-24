import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { buttonClass } from "@/components/ui/button-styles";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/lib/types";

export function AllProducts({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="এখন কোনো পণ্যের তথ্য নেই"
        description="পণ্যের তালিকা এখন খালি। কিছুক্ষণ পর আবার চেষ্টা করুন।"
        ctaLabel="হোম পেজ রিফ্রেশ করুন"
        ctaHref="/"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function AllProductsSection({ children }: { children: React.ReactNode }) {
  return (
    <section id="সব-পণ্য" className="shell scroll-mt-28 pt-12 sm:pt-16">
      <SectionHeading
        eyebrow="সম্পূর্ণ তালিকা"
        title={
          <>
            সব পণ্য<span className="text-saffron-500">.</span>
          </>
        }
        description="নিত্যপ্রয়োজনীয় সব পণ্যের আজকের দাম। কার্ডে ক্লিক করে জেনে নিন আপনার এলাকার বাজারে দাম কেমন।"
        action={
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream-50/80 px-3.5 py-2 text-[11px] font-semibold text-ink-800/60">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf-500 opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-leaf-600" />
            </span>
            আজকের হালনাগাদ দাম
          </span>
        }
      />
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function ProtectedInfoBanner() {
  return (
    <section className="shell pt-12 sm:pt-16">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-8 text-cream-50 shadow-soft sm:px-10 sm:py-10">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 size-64 rounded-full border-[32px] border-white/[0.06]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 left-1/3 size-48 rounded-full bg-saffron-500/10 blur-2xl"
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-saffron-300">
              <ShieldCheck aria-hidden="true" className="size-6" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-saffron-300">
                আরও বিস্তারিত
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-bold sm:text-3xl">
                প্রতিটি বাজারের দাম, বিভাগ অনুযায়ী
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-200/60">
                সাইন ইন করে পণ্যের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং ১২টি
                বাজারের তুলনা দেখুন।
              </p>
            </div>
          </div>
          <Link
            href="/signup"
            className={buttonClass({
              variant: "primary",
              size: "md",
              className: "shrink-0 bg-saffron-500 text-ink-950 hover:bg-saffron-300",
            })}
          >
            বিনামূল্যে অ্যাকাউন্ট খুলুন
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
