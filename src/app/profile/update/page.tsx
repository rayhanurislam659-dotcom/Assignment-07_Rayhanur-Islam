import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Pencil, ShieldCheck } from "lucide-react";
import { getServerSession } from "@/lib/session";
import { UpdateNameForm } from "@/components/profile/UpdateNameForm";

export const metadata: Metadata = {
  title: "প্রোফাইল আপডেট",
  description: "বাজার দর অ্যাকাউন্টের নাম ও প্রোফাইল তথ্য আপডেট করুন।",
};

export default async function ProfileUpdatePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin?redirect=%2Fprofile%2Fupdate&reason=protected");
  }

  return (
    <div className="shell py-8 sm:py-12">
      <div className="mx-auto max-w-xl">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink-800/50 transition hover:text-leaf-700 sm:text-xs"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          প্রোফাইলে ফিরে যান
        </Link>

        <div className="card-surface relative mt-4 overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-saffron-100/80 blur-3xl"
          />
          <div className="relative">
            <div className="flex items-start gap-3.5">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf-50 text-leaf-700 ring-1 ring-leaf-500/15">
                <Pencil aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-leaf-700">
                  প্রোফাইল সেটিংস
                </p>
                <h1 className="mt-1 font-display text-2xl font-bold leading-tight text-ink-950 sm:text-3xl">
                  আপনার তথ্য আপডেট করুন
                </h1>
              </div>
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-ink-800/55">
              নাম পরিবর্তন করে সংরক্ষণ করুন। পরিবর্তনটি আপনার নেভবার ও
              প্রোফাইল কার্ডে সঙ্গে সঙ্গে প্রতিফলিত হবে।
            </p>

            <UpdateNameForm initialName={session.user.name} email={session.user.email} />

            <div className="mt-6 flex items-start gap-2 rounded-2xl border border-line/70 bg-cream-100/50 px-3.5 py-3">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-leaf-600"
              />
              <p className="text-[11px] leading-relaxed text-ink-800/45">
                আপনার তথ্য শুধু অ্যাকাউন্ট পরিচালনার জন্য ব্যবহার করা হয়।
                ইমেইল ও পাসওয়ার্ড পরিবর্তনের জন্য আলাদা নিরাপত্তা যাচাই প্রয়োজন
                হতে পারে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
