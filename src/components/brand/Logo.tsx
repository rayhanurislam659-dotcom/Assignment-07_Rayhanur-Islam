import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  dateLabel,
  compact = false,
  onDark = false,
}: {
  dateLabel?: string;
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="বাজার দর — হোম পেজ"
      className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
    >
      <span
        className={cn(
          "relative grid place-items-center rounded-2xl shadow-[0_10px_24px_-14px_rgba(11,33,23,0.9)] transition duration-300 group-hover:-rotate-3",
          onDark
            ? "bg-cream-50/10 text-cream-50 ring-1 ring-white/15 group-hover:bg-white/15"
            : "bg-ink-900 text-cream-50 group-hover:bg-ink-800",
          compact ? "size-10 text-xl" : "size-11 text-[22px] sm:size-12",
        )}
      >
        <span aria-hidden="true">🛒</span>
        <span
          className={cn(
            "absolute -right-1 -top-1 size-3.5 rounded-full border-2 bg-saffron-500",
            onDark ? "border-ink-950" : "border-cream-50",
          )}
        />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block whitespace-nowrap font-display font-bold leading-none tracking-tight",
            onDark ? "text-cream-50" : "text-ink-950",
            compact ? "text-lg" : "text-xl sm:text-[22px]",
          )}
        >
          বাজার দর
        </span>
        {dateLabel ? (
          <span
            className={cn(
              "mt-1.5 block truncate text-[10px] font-medium leading-none sm:text-[11px]",
              onDark ? "text-cream-200/55" : "text-ink-800/55",
            )}
          >
            {dateLabel}
          </span>
        ) : (
          <span
            className={cn(
              "mt-1.5 block text-[10px] font-medium uppercase leading-none tracking-[0.16em]",
              onDark ? "text-cream-200/45" : "text-ink-800/45",
            )}
          >
            আজকের বাজারদর
          </span>
        )}
      </span>
    </Link>
  );
}
