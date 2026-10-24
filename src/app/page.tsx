import { cache, Suspense } from "react";
import { getProducts } from "@/lib/api";
import { Hero } from "@/components/home/Hero";
import { AllProducts, AllProductsSection, ProtectedInfoBanner } from "@/components/home/AllProducts";
import { MarketMovers } from "@/components/home/MarketMovers";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { MoversSkeleton, ProductGridSkeleton } from "@/components/ui/skeletons";

const getHomeProducts = cache(async () => getProducts({ fresh: true }));

async function MoversData() {
  const products = await getHomeProducts().catch(() => null);
  if (!products) {
    return <ApiErrorState compact />;
  }
  return <MarketMovers products={products} />;
}

async function ProductsData() {
  const products = await getHomeProducts().catch(() => null);
  if (!products) {
    return <ApiErrorState />;
  }
  return <AllProducts products={products} />;
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-labelledby="movers-heading" className="shell pt-4 sm:pt-6">
        <h2 id="movers-heading" className="sr-only">
          আজকের দাম বাড়া ও কমার পণ্য
        </h2>
        <Suspense fallback={<MoversSkeleton />}>
          <MoversData />
        </Suspense>
      </section>

      <AllProductsSection>
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductsData />
        </Suspense>
      </AllProductsSection>

      <ProtectedInfoBanner />
    </>
  );
}
