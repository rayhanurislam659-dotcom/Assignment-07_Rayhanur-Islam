"use client";

import { useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

export function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  icon,
  hint,
  disabled,
  dir,
}: {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  icon: ReactNode;
  hint?: string;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && visible ? "text" : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold text-ink-900"
      >
        {label}
      </label>
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-800/35"
        >
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          dir={dir}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="h-12 w-full rounded-2xl border border-line bg-cream-50/90 pl-11 pr-11 text-sm font-medium text-ink-950 outline-none transition placeholder:text-ink-800/30 hover:border-ink-900/20 focus:border-leaf-500 focus:bg-cream-50 focus:ring-4 focus:ring-leaf-500/10 disabled:opacity-60"
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
            aria-pressed={visible}
            disabled={disabled}
            className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-ink-800/45 transition hover:bg-cream-200/80 hover:text-ink-900 disabled:opacity-50"
          >
            {visible ? (
              <EyeOff aria-hidden="true" className="size-4" />
            ) : (
              <Eye aria-hidden="true" className="size-4" />
            )}
          </button>
        ) : null}
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[11px] leading-relaxed text-ink-800/45">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
