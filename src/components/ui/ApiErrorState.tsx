"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert, RefreshCw } from "lucide-react";
import { buttonClass } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

export function ApiErrorState({
  title = "তথ্য আনতে সমস্যা হয়েছে",
  message = "বাজারদর সার্ভারের সঙ্গে সংযোগ করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।",
  compact = false,
}: {
  title?: string;
  message?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "card-surface flex flex-col items-center justify-center rounded-[1.75rem] px-6 text-center",
        compact ? "py-10" : "py-14 sm:py-16",
      )}
      role="alert"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-down-soft text-down">
        <CircleAlert aria-hidden="true" className="size-7" />
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold text-ink-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-800/60">{message}</p>
      <button
        type="button"
        className={buttonClass({ variant: "dark", size: "sm", className: "mt-5" })}
        onClick={() => startTransition(() => router.refresh())}
        disabled={isPending}
      >
        <RefreshCw
          aria-hidden="true"
          className={cn("size-4", isPending && "animate-spin")}
        />
        {isPending ? "চেষ্টা চলছে…" : "আবার চেষ্টা করুন"}
      </button>
    </div>
  );
}
