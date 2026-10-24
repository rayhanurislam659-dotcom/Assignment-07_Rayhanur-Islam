import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  titleId,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  titleId?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <div className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-leaf-700">
            <span aria-hidden="true" className="h-px w-7 bg-leaf-500/60" />
            {eyebrow}
          </div>
        ) : null}
        <h2
          id={titleId}
          className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink-950 sm:text-4xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-ink-800/60 sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
