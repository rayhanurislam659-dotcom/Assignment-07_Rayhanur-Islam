import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block animate-pulse rounded-full bg-cream-200/90", className)}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-[1.6rem] border border-line/70 bg-cream-50/70 p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <Skeleton className="size-16 rounded-[1.25rem] bg-cream-200 sm:size-[4.5rem]" />
        <Skeleton className="h-6 w-16 bg-cream-200/80" />
      </div>
      <div className="mt-5 space-y-2">
        <Skeleton className="h-4 w-3/4 bg-cream-200" />
        <Skeleton className="h-3 w-2/5 bg-cream-200/70" />
      </div>
      <div className="mt-5 flex items-end justify-between border-t border-dashed border-line pt-4">
        <div className="space-y-2">
          <Skeleton className="h-2.5 w-14 bg-cream-200/70" />
          <Skeleton className="h-6 w-24 bg-cream-200" />
        </div>
        <Skeleton className="h-6 w-16 bg-cream-200" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
      <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে…</span>
    </div>
  );
}

export function MoversSkeleton() {
  return (
    <div
      role="status"
      aria-label="দাম বাড়া-কমার তালিকা লোড হচ্ছে"
      className="grid gap-5 lg:grid-cols-2"
    >
      {Array.from({ length: 2 }, (_, panel) => (
        <div
          key={panel}
          className="rounded-[1.75rem] border border-line/70 bg-cream-50/70 p-5 sm:p-6"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 rounded-2xl bg-cream-200" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-36 bg-cream-200" />
              <Skeleton className="h-2.5 w-24 bg-cream-200/70" />
            </div>
          </div>
          <div className="mt-5 space-y-2.5">
            {Array.from({ length: 6 }, (_, row) => (
              <div
                key={row}
                className="flex items-center gap-3 rounded-2xl border border-line/50 bg-cream-50/80 p-2.5"
              >
                <Skeleton className="size-9 rounded-xl bg-cream-200" />
                <Skeleton className="h-3.5 w-24 bg-cream-200 flex-1" />
                <Skeleton className="h-3.5 w-14 bg-cream-200" />
                <Skeleton className="h-5 w-14 bg-cream-200" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <span className="sr-only">লোড হচ্ছে…</span>
    </div>
  );
}

export function AuthPageSkeleton() {
  return (
    <div
      role="status"
      aria-label="অ্যাকাউন্ট পেজ লোড হচ্ছে"
      className="shell py-7 sm:py-10 lg:py-12"
    >
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-line/80 bg-cream-50/70 shadow-card lg:grid-cols-[0.92fr_1.08fr]">
        <div className="hidden bg-ink-950 p-8 lg:block">
          <Skeleton className="h-9 w-28 bg-white/10" />
          <Skeleton className="mt-10 h-5 w-36 bg-white/10" />
          <Skeleton className="mt-4 h-9 w-11/12 bg-white/15" />
          <Skeleton className="mt-2 h-9 w-3/5 bg-white/15" />
          <div className="mt-8 space-y-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="flex gap-3">
                <Skeleton className="size-8 rounded-xl bg-white/10" />
                <div className="flex-1 space-y-2 pt-1">
                  <Skeleton className="h-3.5 w-2/3 bg-white/10" />
                  <Skeleton className="h-2.5 w-11/12 bg-white/[0.07]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-8 lg:p-9">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-28 bg-cream-200" />
            <Skeleton className="h-3 w-16 bg-cream-200/70" />
          </div>
          <Skeleton className="mt-5 h-8 w-3/5 bg-cream-200" />
          <Skeleton className="mt-3 h-3.5 w-full bg-cream-200/70" />
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <Skeleton className="h-11 rounded-2xl bg-cream-200/80" />
            <Skeleton className="h-11 rounded-2xl bg-cream-200/80" />
          </div>
          <div className="my-5 flex items-center gap-3">
            <Skeleton className="h-px flex-1 bg-cream-200/70" />
            <Skeleton className="h-2.5 w-24 bg-cream-200/70" />
            <Skeleton className="h-px flex-1 bg-cream-200/70" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-3 w-24 bg-cream-200/80" />
                <Skeleton className="h-12 w-full rounded-2xl bg-cream-200/70" />
              </div>
            ))}
            <Skeleton className="h-12 w-full rounded-full bg-cream-200" />
          </div>
        </div>
      </div>
      <span className="sr-only">লোড হচ্ছে…</span>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="shell py-10 sm:py-14">
      <Skeleton className="h-6 w-40" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-44 rounded-[2rem]" />
      </div>
      <div className="mt-10">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
