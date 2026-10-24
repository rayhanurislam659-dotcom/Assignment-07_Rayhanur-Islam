import { Skeleton } from "@/components/ui/skeletons";

export default function ProductLoading() {
  return (
    <div
      role="status"
      aria-label="পণ্যের বিস্তারিত তথ্য লোড হচ্ছে"
      className="shell py-6 sm:py-10"
    >
      <Skeleton className="h-3.5 w-52 bg-cream-200/80" />

      <div className="card-surface mt-5 rounded-[2rem] p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div>
            <div className="flex items-start gap-5">
              <Skeleton className="size-20 rounded-[1.5rem] bg-cream-200 sm:size-24" />
              <div className="flex-1 space-y-3 pt-1">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 bg-cream-200/80" />
                  <Skeleton className="h-5 w-24 bg-cream-200/80" />
                </div>
                <Skeleton className="h-9 w-2/3 bg-cream-200" />
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <Skeleton className="h-4 w-full bg-cream-200/70" />
              <Skeleton className="h-4 w-11/12 bg-cream-200/70" />
            </div>
            <div className="mt-6 flex items-end gap-4 border-t border-dashed border-line pt-5">
              <div className="space-y-2">
                <Skeleton className="h-3 w-16 bg-cream-200/70" />
                <Skeleton className="h-10 w-40 bg-cream-200" />
              </div>
              <Skeleton className="mb-1 h-6 w-16 bg-cream-200" />
            </div>
            <div className="mt-6 flex gap-2.5">
              <Skeleton className="h-11 w-40 bg-cream-200" />
              <Skeleton className="h-11 w-40 bg-cream-200/80" />
            </div>
          </div>

          <div className="rounded-[1.6rem] bg-ink-900 p-6">
            <Skeleton className="h-3 w-28 bg-white/15" />
            <Skeleton className="mt-3 h-5 w-36 bg-white/15" />
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="h-20 rounded-2xl bg-white/10"
                />
              ))}
            </div>
            <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="flex justify-between gap-4">
                  <Skeleton className="h-3.5 w-24 bg-white/10" />
                  <Skeleton className="h-3.5 w-20 bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <Skeleton className="h-3 w-32 bg-cream-200/70" />
        <Skeleton className="h-8 w-64 bg-cream-200" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, panel) => (
          <div
            key={panel}
            className="card-surface rounded-[1.75rem] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between border-b border-line/70 pb-4">
              <Skeleton className="h-5 w-32 bg-cream-200" />
              <Skeleton className="h-3 w-16 bg-cream-200/70" />
            </div>
            <div className="mt-4 space-y-4">
              {Array.from({ length: 4 }, (_, row) => (
                <div key={row} className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <Skeleton className="h-3.5 w-40 bg-cream-200/80" />
                    <Skeleton className="h-3.5 w-24 bg-cream-200/80" />
                  </div>
                  <Skeleton className="h-1.5 w-full bg-cream-200/70" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">পণ্যের বিস্তারিত তথ্য লোড হচ্ছে…</span>
    </div>
  );
}
