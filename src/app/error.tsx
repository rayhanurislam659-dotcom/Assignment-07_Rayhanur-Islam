"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CircleAlert, Home, RotateCcw } from "lucide-react";
import { buttonClass } from "@/components/ui/button-styles";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell py-14 sm:py-20">
      <div className="card-surface mx-auto max-w-xl rounded-[2rem] px-6 py-12 text-center sm:px-10">
        <span className="mx-auto grid size-16 place-items-center rounded-[1.40rem] bg-down-soft text-down">
          <CircleAlert aria-hidden="true" className="size-8" />
        </span>
        <span className="mt-5 inline-block rounded-full bg-cream-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink-800/50">
          সাময়িক সমস্যা
        </span>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
          কিছু একটা ভুল হয়েছে
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-800/60">
          পেজটি এখন ঠিকঠাক লোড হচ্ছে না। একবার আবার চেষ্টা করুন—সমস্যা থেকে
          গেলে হোম পেজ থেকে বাজারদর দেখতে পারবেন।
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className={buttonClass({ variant: "dark", size: "md" })}
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            আবার চেষ্টা করুন
          </button>
          <Link
            href="/"
            className={buttonClass({ variant: "outline", size: "md" })}
          >
            <Home aria-hidden="true" className="size-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
