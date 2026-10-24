import { Skeleton } from "@/components/ui/skeletons";

export default function ProfileLoading() {
  return (
    <div
      role="status"
      aria-label="প্রোফাইল লোড হচ্ছে"
      className="shell py-8 sm:py-12"
    >
      <div className="mx-auto max-w-5xl">
        <Skeleton className="h-3.5 w-32 bg-cream-200/80" />
        <Skeleton className="mt-6 h-3 w-28 bg-cream-200/70" />
        <Skeleton className="mt-3 h-9 w-72 bg-cream-200" />
        <Skeleton className="mt-3 h-4 w-full max-w-md bg-cream-200/70" />

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="card-surface rounded-[2rem] p-6 sm:p-8">
            <div className="flex justify-center">
              <Skeleton className="h-6 w-32 bg-cream-200/80" />
            </div>
            <div className="mt-5 flex justify-center">
              <Skeleton className="size-24 rounded-[1.9rem] bg-cream-200" />
            </div>
            <div className="mx-auto mt-5 h-7 w-40 rounded-full bg-cream-200" />
            <div className="mx-auto mt-3 h-4 w-52 rounded-full bg-cream-200/70" />
            <div className="mx-auto mt-4 h-6 w-56 rounded-full bg-cream-200/70" />
            <div className="mt-6 flex gap-2.5 border-t border-dashed border-line pt-5">
              <Skeleton className="h-11 flex-1 rounded-full bg-cream-200" />
              <Skeleton className="h-11 w-28 rounded-full bg-cream-200/80" />
            </div>
          </div>

          <div className="space-y-5">
            <div className="card-surface rounded-[1.75rem] p-5 sm:p-6">
              <Skeleton className="h-6 w-40 bg-cream-200" />
              <div className="mt-5 space-y-5">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="flex justify-between gap-4">
                    <Skeleton className="h-4 w-28 bg-cream-200/80" />
                    <Skeleton className="h-4 w-32 bg-cream-200/80" />
                  </div>
                ))}
              </div>
            </div>
            <Skeleton className="h-48 rounded-[1.75rem] bg-ink-900/90" />
          </div>
        </div>
      </div>
      <span className="sr-only">প্রোফাইল লোড হচ্ছে…</span>
    </div>
  );
}
