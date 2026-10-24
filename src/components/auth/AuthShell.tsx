import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, LineChart, MapPinned, ShieldCheck } from "lucide-react";

const BENEFITS = [
  {
    icon: LineChart,
    title: "প্রতিদিনের দামের হিসাব",
    description: "কোন পণ্যের দাম বাড়ল বা কমল, এক নজরে জেনে নিন।",
  },
  {
    icon: MapPinned,
    title: "১২টি বাজারের তুলনা",
    description: "আপনার এলাকার বাজারে দাম কেমন, তা সহজেই বুঝে নিন।",
  },
  {
    icon: ShieldCheck,
    title: "সুরক্ষিত ব্যক্তিগত অ্যাকাউন্ট",
    description: "ইমেইল, পাসওয়ার্ড বা সোশ্যাল অ্যাকাউন্ট দিয়ে নিরাপদে প্রবেশ করুন।",
  },
];

export function AuthShell({
  mode,
  children,
}: {
  mode: "signin" | "signup";
  children: ReactNode;
}) {
  return (
    <div className="shell py-7 sm:py-10 lg:py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-line/80 bg-cream-50/90 shadow-card lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative hidden overflow-hidden bg-ink-950 text-cream-50 lg:flex lg:flex-col lg:justify-between lg:p-8">
          <Image
            src="/images/hero-market-basket.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 460px, 0px"
            className="object-cover object-center opacity-35"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950/95"
          />

          <div className="relative">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-cream-50"
            >
              <span
                aria-hidden="true"
                className="grid size-9 place-items-center rounded-xl bg-cream-50/10 text-lg ring-1 ring-white/15"
              >
                🛒
              </span>
              বাজার দর
            </Link>

            <span className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-saffron-200">
              <BadgeCheck aria-hidden="true" className="size-3.5" />
              {mode === "signin" ? "আবার স্বাগতম" : "বিনামূল্যে শুরু করুন"}
            </span>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.2] text-cream-50">
              প্রতিদিনের বাজারের হিসাব,
              <br />
              হাতের মুঠোয়।
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-cream-200/65">
              সাইন ইন করলেই পণ্যের বিস্তারিত দাম, বাজারভিত্তিক তুলনা আর
              দাম বাড়া-কমার পূর্ণ তালিকা দেখতে পাবেন।
            </p>
          </div>

          <ul className="relative mt-8 space-y-3.5">
            {BENEFITS.map((benefit) => (
              <li key={benefit.title} className="flex gap-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-white/10 text-saffron-200 ring-1 ring-white/10">
                  <benefit.icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-cream-50">
                    {benefit.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-cream-200/55">
                    {benefit.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-3 text-[11px] leading-relaxed text-cream-200/55">
            সাইন-ইন তথ্য শুধু আপনার অ্যাকাউন্ট ও পছন্দ সংরক্ষণের জন্য ব্যবহার
            করা হয়। কোনো পাসওয়ার্ড কোথাও শেয়ার করা হয় না।
          </p>
        </aside>

        <div className="p-5 sm:p-8 lg:p-9">{children}</div>
      </div>

      <p className="mx-auto mt-5 flex max-w-md items-center justify-center gap-1.5 text-center text-[11px] leading-relaxed text-ink-800/40">
        <ShieldCheck aria-hidden="true" className="size-3.5 shrink-0" />
        আপনার তথ্য সুরক্ষিত রাখতে আমরা আধুনিক সেশন-ভিত্তিক প্রমাণীকরণ ব্যবহার করি।
      </p>
    </div>
  );
}
