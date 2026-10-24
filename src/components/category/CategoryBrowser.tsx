"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownWideNarrow,
  ChevronDown,
  CircleAlert,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonClass } from "@/components/ui/button-styles";
import { ProductGridSkeleton } from "@/components/ui/skeletons";
import { formatBengaliNumber } from "@/lib/bengali";
import type { Product, SortOption } from "@/lib/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

type FetchResponse = {
  key: string;
  products: Product[] | null;
  error: string | null;
};

export function CategoryBrowser({
  slug,
  categoryNameBn,
}: {
  slug: string;
  categoryNameBn: string;
}) {
  const [response, setResponse] = useState<FetchResponse | null>(null);
  const [sort, setSort] = useState<SortOption>("default");
  const [attempt, setAttempt] = useState(0);
  const requestKey = `${slug}:${attempt}`;

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const apiResponse = await fetch(
          `/api/products?category=${encodeURIComponent(slug)}`,
          { signal: controller.signal },
        );
        if (!apiResponse.ok) {
          throw new Error("request-failed");
        }
        const data: unknown = await apiResponse.json();
        if (!Array.isArray(data)) {
          throw new Error("invalid-response");
        }
        setResponse({
          key: requestKey,
          products: data as Product[],
          error: null,
        });
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === "AbortError") {
          return;
        }
        setResponse({
          key: requestKey,
          products: null,
          error:
            "এই ক্যাটাগরির পণ্যের দাম আনতে সমস্যা হয়েছে। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।",
        });
      }
    }

    void loadProducts();
    return () => controller.abort();
  }, [slug, attempt, requestKey]);

  const isCurrent = response?.key === requestKey;
  const products = isCurrent && response ? response.products : null;
  const error = isCurrent && response ? response.error : null;

  const sortedProducts = useMemo(() => {
    if (!products) return null;
    if (sort === "price-asc") {
      return [...products].sort((a, b) => a.today - b.today);
    }
    if (sort === "price-desc") {
      return [...products].sort((a, b) => b.today - a.today);
    }
    return products;
  }, [products, sort]);

  const isLoading = !isCurrent;

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          aria-live="polite"
          className="text-sm font-medium text-ink-800/55"
        >
          {isLoading ? (
            "পণ্যের দাম লোড হচ্ছে…"
          ) : sortedProducts ? (
            <>
              মোট{" "}
              <span className="font-bold text-ink-950">
                {formatBengaliNumber(sortedProducts.length)}টি
              </span>{" "}
              পণ্য পাওয়া গেছে
            </>
          ) : (
            "পণ্যের তালিকা পাওয়া যায়নি"
          )}
        </p>

        <label className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink-800/65">
          <ArrowDownWideNarrow
            aria-hidden="true"
            className="size-4 text-leaf-700"
          />
          <span>সাজান:</span>
          <span className="relative inline-flex">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              disabled={isLoading || !sortedProducts?.length}
              className="h-10 min-w-[11.5rem] cursor-pointer appearance-none rounded-full border border-line bg-cream-50 pl-4 pr-10 text-[13px] font-semibold text-ink-900 outline-none transition hover:border-leaf-500/40 focus:border-leaf-500 focus:ring-4 focus:ring-leaf-500/10 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-800/55"
            />
          </span>
        </label>
      </div>

      <div className="mt-4 sm:mt-5">
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : error ? (
          <div
            role="alert"
            className="card-surface flex flex-col items-center rounded-[1.75rem] px-6 py-14 text-center"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-down-soft text-down">
              <CircleAlert aria-hidden="true" className="size-7" />
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-ink-950">
              তথ্য আনতে সমস্যা হয়েছে
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-800/60">
              {error}
            </p>
            <button
              type="button"
              onClick={() => setAttempt((value) => value + 1)}
              className={buttonClass({
                variant: "dark",
                size: "sm",
                className: "mt-5",
              })}
            >
              <RefreshCw aria-hidden="true" className="size-4" />
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : sortedProducts && sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={`${categoryNameBn}-এ এখন কোনো পণ্য নেই`}
            description="এই ক্যাটাগরিতে এখনো কোনো পণ্যের দাম যোগ করা হয়নি। অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।"
          />
        )}
      </div>

      {isLoading ? (
        <p className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-ink-800/40">
          <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
          একটু অপেক্ষা করুন, আজকের দাম আসছে…
        </p>
      ) : null}
    </div>
  );
}
