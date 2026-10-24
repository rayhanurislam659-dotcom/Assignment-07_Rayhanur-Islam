import {
  ProductGridSkeleton,
  Skeleton,
} from "@/components/ui/skeletons";

export default function CategoryLoading() {
  return (
    <div
      role="status"
      aria-label="ক্যাটাগরির পণ্য লোড হচ্ছে"
      className="shell py-6 sm:py-10"
    >
      <Skeleton className="h-3.5 w-40 bg-cream-200/80" />

      <div className="card-surface mt-4 rounded-[2rem] p-5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <Skeleton className="size-20 rounded-[1.5rem] bg-cream-200 sm:size-24" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-3 w-28 bg-cream-200/70" />
            <Skeleton className="h-9 w-44 bg-cream-200" />
            <Skeleton className="h-4 w-full max-w-xl bg-cream-200/70" />
            <Skeleton className="h-4 w-4/5 max-w-lg bg-cream-200/70" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-6 w-28 bg-cream-200/80" />
              <Skeleton className="h-6 w-28 bg-cream-200/80" />
              <Skeleton className="h-6 w-24 bg-cream-200/80" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-40 bg-cream-200/80" />
        <Skeleton className="h-10 w-52 bg-cream-200" />
      </div>

      <div className="mt-5">
        <ProductGridSkeleton count={8} />
      </div>

      <span className="sr-only">ক্যাটাগরির পণ্য লোড হচ্ছে…</span>
    </div>
  );
}
