import { FALLBACK_CATEGORIES } from "@/lib/constants";
import type { Category, Product } from "@/lib/types";

const API_BASE_URL = (
  process.env.BAZARDOR_API_URL ||
  "https://api.api-store.workers.dev/api/bazardor"
).replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type FetchMode = "cached" | "fresh";

async function fetchFromApi<T>(
  path: string,
  mode: FetchMode = "cached",
): Promise<T> {
  const options: RequestInit & { next?: { revalidate: number } } =
    mode === "fresh"
      ? { cache: "no-store" }
      : { next: { revalidate: 300 } };

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(12000),
    });
  } catch {
    throw new ApiError("বাজারদর সার্ভারে পৌঁছানো যাচ্ছে না।", 503);
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError("অনুরোধ করা তথ্য পাওয়া যায়নি।", 404);
    }
    throw new ApiError("বাজারদর তথ্য আনতে সমস্যা হয়েছে।", response.status);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError("সার্ভার থেকে ভুল তথ্য এসেছে।", 502);
  }
}

function isProductArray(value: unknown): value is Product[] {
  return Array.isArray(value);
}

export async function getProducts(options?: {
  fresh?: boolean;
  category?: string;
}): Promise<Product[]> {
  const search = options?.category
    ? `?category=${encodeURIComponent(options.category)}`
    : "";
  const products = await fetchFromApi<unknown>(
    `/products${search}`,
    options?.fresh ? "fresh" : "cached",
  );

  if (!isProductArray(products)) {
    throw new ApiError("পণ্যের তালিকা সঠিক ফরম্যাটে আসেনি।", 502);
  }

  return products;
}

export async function getCategories(): Promise<Category[]> {
  const categories = await fetchFromApi<unknown>("/categories", "cached");
  if (!Array.isArray(categories)) {
    throw new ApiError("ক্যাটাগরির তালিকা সঠিক ফরম্যাটে আসেনি।", 502);
  }
  return categories as Category[];
}

export async function getCategoriesSafe(): Promise<Category[]> {
  try {
    const categories = await getCategories();
    return categories.length > 0 ? categories : FALLBACK_CATEGORIES;
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export async function getTickerProducts(): Promise<Product[]> {
  try {
    return await getProducts();
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategoriesSafe();
  return categories.find((category) => category.slug === slug) ?? null;
}
