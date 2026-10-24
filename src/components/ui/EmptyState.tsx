import Link from "next/link";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { buttonClass } from "@/components/ui/button-styles";

export function EmptyState({
  title = "কিছু পাওয়া যায়নি",
  description = "এই ক্যাটাগরিতে এখন কোনো পণ্য নেই অথবা ক্যাটাগরির ঠিকানাটি সঠিক নয়।",
  ctaLabel = "হোম পেজে ফিরে যান",
  ctaHref = "/",
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="card-surface flex flex-col items-center rounded-[2rem] px-6 py-16 text-center sm:py-20">
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-saffron-100 blur-2xl"
        />
        <span className="grid size-20 place-items-center rounded-[1.75rem] bg-cream-100 text-ink-800 ring-1 ring-line">
          <PackageSearch aria-hidden="true" className="size-9" strokeWidth={1.7} />
        </span>
      </div>
      <span className="mt-5 rounded-full bg-flat-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-flat">
        ৪০৪ · কিছু পাওয়া যায়নি
      </span>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-800/60">{description}</p>
      <Link
        href={ctaHref}
        className={buttonClass({ variant: "primary", size: "md", className: "mt-6" })}
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        {ctaLabel}
      </Link>
    </div>
  );
}
