import { formatPercent, getChangeMeta } from "@/lib/bengali";
import type { ChangeDirection } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PriceChangeBadge({
  direction,
  percent,
  size = "md",
  tone = "light",
}: {
  direction: ChangeDirection;
  percent: number;
  size?: "sm" | "md";
  tone?: "light" | "dark";
}) {
  const meta = getChangeMeta(direction);
  const classes =
    tone === "dark"
      ? direction === "up"
        ? "bg-white/10 text-[#8ee8b2]"
        : direction === "down"
          ? "bg-white/10 text-[#ffb0a7]"
          : "bg-white/10 text-cream-200/80"
      : meta.softClass;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full font-bold tabular-nums",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px] sm:text-xs",
        classes,
      )}
      aria-label={`${meta.label} ${formatPercent(percent)}`}
    >
      <span aria-hidden="true" className="text-[0.9em] leading-none">
        {meta.symbol}
      </span>
      <span>{formatPercent(percent)}</span>
    </span>
  );
}
