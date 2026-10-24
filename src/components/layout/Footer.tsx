import Link from "next/link";
import { Info, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SITE_TAGLINE } from "@/lib/constants";
import { formatBengaliNumber } from "@/lib/bengali";
import type { Category } from "@/lib/types";

export function Footer({ categories }: { categories: Category[] }) {
  const year = formatBengaliNumber(new Date().getFullYear());

  return (
    <footer className="mt-16 bg-ink-950 text-cream-100 sm:mt-24">
      <div className="shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Logo compact onDark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-200/70">
              {SITE_TAGLINE}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-cream-200/45">
              <MapPin aria-hidden="true" className="size-3.5" />
              ঢাকা, বাংলাদেশ
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-cream-200/75 transition hover:border-saffron-500/30 hover:bg-white/10 hover:text-cream-50"
                >
                  {category.icon} {category.nameBn}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-sm font-semibold text-cream-50">
                দ্রুত লিংক
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-cream-200/65">
                <li>
                  <Link href="/" className="transition hover:text-saffron-300">
                    সব পণ্য
                  </Link>
                </li>
                <li>
                  <Link href="/signin" className="transition hover:text-saffron-300">
                    সাইন ইন
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="transition hover:text-saffron-300">
                    সাইন আপ
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="transition hover:text-saffron-300">
                    আমার প্রোফাইল
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <span className="grid size-8 place-items-center rounded-xl bg-saffron-500/15 text-saffron-300">
                <Info aria-hidden="true" className="size-4" />
              </span>
              <p className="mt-3 text-[13px] leading-relaxed text-cream-200/70">
                সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-cream-200/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p>
            তথ্যসূত্র: বাংলাদেশের খুচরা বাজার · তৈরি হয়েছে ভালোবাসায় 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
