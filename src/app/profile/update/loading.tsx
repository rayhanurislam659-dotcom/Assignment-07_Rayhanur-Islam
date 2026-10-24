import { Skeleton } from "@/components/ui/skeletons";

export default function ProfileUpdateLoading() {
  return (
    <div
      role="status"
      aria-label="প্রোফাইল আপডেট পেজ লোড হচ্ছে"
      className="shell py-8 sm:py-12"
    >
      <div className="mx-auto max-w-xl">
        <Skeleton className="h-3.5 w-32 bg-cream-200/80" />
        <div className="card-surface mt-4 rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-start gap-3.5">
            <Skeleton className="size-12 rounded-2xl bg-cream-200" />
            <div className="flex-1 space-y-2 pt-1">
              <Skeleton className="h-3 w-24 bg-cream-200/70" />
              <Skeleton className="h-7 w-56 bg-cream-200" />
            </div>
          </div>
          <Skeleton className="mt-4 h-4 w-full bg-cream-200/70" />
          <Skeleton className="mt-2 h-4 w-4/5 bg-cream-200/70" />
          <Skeleton className="mt-6 h-20 w-full rounded-2xl bg-cream-200/60" />
          <div className="mt-5 space-y-2">
            <Skeleton className="h-3 w-24 bg-cream-200/80" />
            <Skeleton className="h-12 w-full rounded-2xl bg-cream-200/70" />
          </div>
          <div className="mt-5 flex gap-2.5">
            <Skeleton className="h-11 flex-1 rounded-full bg-cream-200/80" />
            <Skeleton className="h-11 flex-1 rounded-full bg-cream-200" />
          </div>
        </div>
      </div>
      <span className="sr-only">লোড হচ্ছে…</span>
    </div>
  );
}
