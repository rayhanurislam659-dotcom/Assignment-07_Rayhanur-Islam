import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "dark" | "outline" | "soft" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-leaf-600 text-cream-50 shadow-[0_12px_24px_-14px_rgba(37,122,83,0.9)] hover:bg-leaf-700",
  dark: "bg-ink-900 text-cream-50 shadow-[0_14px_28px_-16px_rgba(11,33,23,0.9)] hover:bg-ink-800",
  outline:
    "border border-ink-900/15 bg-cream-50/80 text-ink-900 hover:border-ink-900/30 hover:bg-cream-50",
  soft: "bg-leaf-100 text-leaf-700 hover:bg-leaf-100/70",
  ghost: "text-ink-800 hover:bg-cream-200/70",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-3.5 text-[13px] sm:h-10 sm:px-4 sm:text-sm",
  md: "h-11 gap-2 px-5 text-sm",
  lg: "h-12 gap-2.5 px-6 text-base sm:h-13 sm:px-7",
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex select-none items-center justify-center rounded-full font-semibold transition duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}
