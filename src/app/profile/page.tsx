import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { formatDateBn } from "@/lib/bengali";
import { getServerSession } from "@/lib/session";
import { SignOutButton } from "@/components/profile/SignOutButton";
import { buttonClass } from "@/components/ui/button-styles";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল",
  description: "বাজার দর অ্যাকাউন্টের তথ্য, প্রোফাইল আপডেট ও অ্যাকাউন্ট সেটিংস।",
};

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin?redirect=%2Fprofile&reason=protected");
  }

  const { user } = session;
  const initial = Array.from(user.name.trim())[0] ?? "ব";
  const firstName = user.name.trim().split(/\s+/)[0] || "বন্ধু";
  const memberSince = formatDateBn(new Date(user.createdAt));

  const details = [
    {
      icon: UserRound,
      label: "পুরো নাম",
      value: user.name,
    },
    {
      icon: Mail,
      label: "ইমেইল ঠিকানা",
      value: user.email,
      ltr: true,
    },
    {
      icon: CalendarDays,
      label: "সদস্য হয়েছেন",
      value: memberSince,
    },
    {
      icon: ShieldCheck,
      label: "অ্যাকাউন্ট স্ট্যাটাস",
      value: "সক্রিয়",
    },
  ];

  return (
    <div className="shell py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="ব্রেডক্রাম্ব"
          className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-800/50 sm:text-xs"
        >
          <Link href="/" className="transition hover:text-leaf-700">
            হোম
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-ink-900">
            আমার প্রোফাইল
          </span>
        </nav>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-leaf-700">
              <span aria-hidden="true" className="h-px w-6 bg-leaf-500/60" />
              আমার অ্যাকাউন্ট
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink-950 sm:text-4xl">
              আসসালামু আলাইকুম, {firstName}!
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-800/55">
              আপনার অ্যাকাউন্টের সারসংক্ষেপ ও ব্যক্তিগত তথ্য এক নজরে দেখে নিন।
            </p>
          </div>
          <Link
            href="/#সব-পণ্য"
            className={buttonClass({ variant: "soft", size: "sm" })}
          >
            আজকের বাজার দেখুন
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="card-surface relative overflow-hidden rounded-[2rem] p-6 text-center sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-leaf-100/80 blur-3xl"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-up-soft px-3 py-1 text-[10px] font-bold text-up">
                <BadgeCheck aria-hidden="true" className="size-3.5" />
                সক্রিয় অ্যাকাউন্ট
              </span>

              <div className="mx-auto mt-5 grid size-24 place-items-center rounded-[1.9rem] bg-gradient-to-br from-leaf-600 to-ink-950 font-display text-4xl font-bold text-cream-50 shadow-[0_20px_36px_-24px_rgba(11,33,23,0.9)] ring-4 ring-cream-50">
                {initial}
              </div>

              <h2 className="mt-4 font-display text-2xl font-bold text-ink-950">
                {user.name}
              </h2>
              <p
                dir="ltr"
                className="mx-auto mt-1 flex max-w-full items-center justify-center gap-1.5 truncate text-[13px] font-medium text-ink-800/50"
              >
                <Mail aria-hidden="true" className="size-3.5 shrink-0" />
                <span className="truncate">{user.email}</span>
              </p>

              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-[11px] font-semibold text-ink-800/55">
                <CalendarDays aria-hidden="true" className="size-3.5" />
                সদস্য হয়েছেন {memberSince}
              </p>

              <div className="mt-6 flex flex-col gap-2.5 border-t border-dashed border-line pt-5 sm:flex-row">
                <Link
                  href="/profile/update"
                  className={buttonClass({
                    variant: "primary",
                    size: "md",
                    className: "flex-1",
                  })}
                >
                  <Pencil aria-hidden="true" className="size-4" />
                  তথ্য আপডেট করুন
                </Link>
                <SignOutButton />
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-ink-800/40">
                প্রোফাইলের নাম পরিবর্তন করলে তা নেভবারে ও অ্যাকাউন্ট কার্ডে
                সঙ্গে সঙ্গে দেখা যাবে।
              </p>
            </div>
          </section>

          <div className="space-y-5">
            <section className="card-surface rounded-[1.75rem] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-line/70 pb-4">
                <h2 className="font-display text-lg font-semibold text-ink-950">
                  অ্যাকাউন্টের তথ্য
                </h2>
                <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[10px] font-bold text-ink-800/55">
                  ব্যক্তিগত
                </span>
              </div>

              <dl className="mt-1 divide-y divide-line/60">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-start justify-between gap-4 py-3.5"
                  >
                    <dt className="flex shrink-0 items-center gap-2 text-[12px] font-semibold text-ink-800/50">
                      <span className="grid size-7 place-items-center rounded-lg bg-cream-100 text-ink-800/55">
                        <detail.icon aria-hidden="true" className="size-3.5" />
                      </span>
                      {detail.label}
                    </dt>
                    <dd
                      dir={detail.ltr ? "ltr" : undefined}
                      className={`min-w-0 truncate text-right text-[13px] font-semibold text-ink-950 ${
                        detail.ltr ? "max-w-[60%] text-left" : ""
                      }`}
                    >
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="relative overflow-hidden rounded-[1.75rem] bg-ink-950 p-6 text-cream-50">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-10 size-48 rounded-full bg-leaf-600/25 blur-3xl"
              />
              <div className="relative">
                <span className="grid size-10 place-items-center rounded-2xl bg-white/10 text-saffron-200">
                  <ShieldCheck aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold">
                  নিরাপদ কেনাকাটার প্রস্তুতি
                </h2>
                <p className="mt-2 max-w-sm text-[12px] leading-relaxed text-cream-200/60">
                  বাজারে যাওয়ার আগে আজকের দাম আর বাজারভিত্তিক তুলনা দেখে
                  নিন—সঠিক সিদ্ধান্তে সাশ্রয় করুন।
                </p>
                <Link
                  href="/#সব-পণ্য"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-cream-50 px-4 py-2 text-[12px] font-bold text-ink-950 transition hover:bg-saffron-100"
                >
                  সব পণ্যের দাম দেখুন
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
