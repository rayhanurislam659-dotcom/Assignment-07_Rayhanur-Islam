import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { getCategoriesSafe, getCategoryBySlug } from "@/lib/api";
import { CategoryBrowser } from "@/components/category/CategoryBrowser";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Category } from "@/lib/types";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "ক্যাটাগরি পাওয়া যায়নি" };
  }

  const description = `${category.nameBn}-এর আজকের বাজারদর, দাম বাড়া-কমা ও বাজারভিত্তিক তুলনা এক নজরে দেখুন।`;
  return {
    title: `${category.nameBn} — আজকের দাম`,
    description,
    openGraph: {
      title: `${category.nameBn} — আজকের দাম`,
      description,
      type: "website",
    },
  };
}

function CategoryChips({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  return (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1">
      {categories.map((category) => {
        const active = category.slug === activeSlug;
        return (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            aria-current={active ? "page" : undefined}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              active
                ? "border-ink-900 bg-ink-900 text-cream-50"
                : "border-line bg-cream-50/80 text-ink-800/70 hover:border-leaf-500/30 hover:bg-leaf-50 hover:text-leaf-700"
            }`}
          >
            <span aria-hidden="true">{category.icon}</span>
            {category.nameBn}
          </Link>
        );
      })}
    </div>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoriesSafe(),
  ]);

  if (!category) {
    return (
      <div className="shell py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <EmptyState
            title="ক্যাটাগরিটি খুঁজে পাওয়া যায়নি"
            description="এই নামে কোনো ক্যাটাগরি নেই অথবা লিংকটি পুরোনো হয়ে গেছে। নিচের যেকোনো ক্যাটাগরি থেকে আজকের বাজারদর দেখুন।"
          />
          <div className="mt-6 rounded-[1.75rem] border border-line/80 bg-cream-50/60 p-5">
            <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.15em] text-ink-800/50">
              ক্যাটাগরি বেছে নিন
            </p>
            <CategoryChips categories={categories} />
          </div>
        </div>
      </div>
    );
  }

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
        <span aria-current="page" className="text-ink-900">
          {category.nameBn}
        </span>
      </nav>

      <header className="card-surface relative mt-4 overflow-hidden rounded-[2rem] p-5 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-leaf-100/70 blur-3xl"
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <span
            aria-hidden="true"
            className="grid size-20 shrink-0 place-items-center rounded-[1.5rem] bg-gradient-to-br from-saffron-100 via-cream-50 to-leaf-50 text-[2.6rem] shadow-[inset_0_0_0_1px_rgba(232,223,204,0.9)] sm:size-24 sm:text-5xl"
          >
            {category.icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-leaf-700">
              <span aria-hidden="true" className="h-px w-6 bg-leaf-500/60" />
              আজকের ক্যাটাগরি
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink-950 sm:text-4xl">
              {category.nameBn}
            </h1>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-800/60 sm:text-[15px]">
              {category.nameBn}-এর সর্বশেষ বাজারদর এক জায়গায়। দাম কম-বেশি
              অনুযায়ী সাজিয়ে নিন এবং আপনার পছন্দের পণ্যের বিস্তারিত বাজারভিত্তিক
              তুলনা দেখুন।
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-50 px-3 py-1 text-[11px] font-semibold text-leaf-700 ring-1 ring-leaf-500/15">
                <Sparkles aria-hidden="true" className="size-3" />
                প্রতিদিন হালনাগাদ
              </span>
              <span className="rounded-full bg-cream-100 px-3 py-1 text-[11px] font-semibold text-ink-800/60 ring-1 ring-line/60">
                সর্বনিম্ন–সর্বোচ্চ তুলনা
              </span>
              <span className="rounded-full bg-cream-100 px-3 py-1 text-[11px] font-semibold text-ink-800/60 ring-1 ring-line/60">
                বাজারভিত্তিক দাম
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-6 border-t border-line/70 pt-4">
          <CategoryChips categories={categories} activeSlug={category.slug} />
        </div>
      </header>

      <CategoryBrowser
        key={category.slug}
        slug={category.slug}
        categoryNameBn={category.nameBn}
      />
    </div>
  );
}
