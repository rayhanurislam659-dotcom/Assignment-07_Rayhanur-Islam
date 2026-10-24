"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CircleAlert,
  Loader2,
  LockKeyhole,
  Mail,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import toast from "react-hot-toast";
import { AuthField } from "@/components/auth/AuthField";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { buttonClass } from "@/components/ui/button-styles";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { signUp } from "@/lib/auth-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpForm({
  redirectTo,
  providers,
}: {
  redirectTo: string;
  providers: { google: boolean; github: boolean };
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    let validationMessage: string | null = null;
    if (trimmedName.length < 2) {
      validationMessage = "আপনার নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
    } else if (!trimmedEmail) {
      validationMessage = "ইমেইল ঠিকানা লিখুন।";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      validationMessage = "সঠিক ইমেইল ঠিকানা লিখুন।";
    } else if (password.length < 6) {
      validationMessage = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।";
    }

    if (validationMessage) {
      setFormError(validationMessage);
      toast.error(validationMessage, { id: "signup-validation" });
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const { error } = await signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });

      if (error) {
        const message = getAuthErrorMessage(
          error,
          "অ্যাকাউন্ট তৈরি করা যায়নি। তথ্যগুলো দেখে আবার চেষ্টা করুন।",
        );
        setFormError(message);
        toast.error(message, { id: "signup-error" });
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।", {
        id: "signup-success",
        duration: 4000,
      });

      const params = new URLSearchParams({
        registered: "1",
        email: trimmedEmail,
      });
      if (redirectTo !== "/") {
        params.set("redirect", redirectTo);
      }
      router.push(`/signin?${params.toString()}`);
    } catch {
      const message = "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message, { id: "signup-error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  const signinHref =
    redirectTo === "/"
      ? "/signin"
      : `/signin?redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-100 px-3 py-1 text-[11px] font-bold text-saffron-600 ring-1 ring-saffron-500/20">
          <UserRoundPlus aria-hidden="true" className="size-3.5" />
          নতুন সদস্য
        </span>
        <Link
          href="/"
          className="text-[11px] font-semibold text-ink-800/45 transition hover:text-leaf-700"
        >
          হোমে ফিরুন
        </Link>
      </div>

      <h1 className="mt-4 font-display text-[1.75rem] font-bold leading-tight text-ink-950 sm:text-3xl">
        বিনামূল্যে অ্যাকাউন্ট খুলুন
      </h1>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-800/55">
        মাত্র এক মিনিটে অ্যাকাউন্ট তৈরি করে পণ্যের বিস্তারিত বাজারদর দেখুন।
      </p>

      <div className="mt-6">
        <SocialButtons providers={providers} callbackURL={redirectTo} />
      </div>

      {formError ? (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-2xl border border-down/15 bg-down-soft px-3.5 py-2.5 text-[12px] font-medium leading-relaxed text-down"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {formError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthField
          id="signup-name"
          label="আপনার নাম"
          type="text"
          value={name}
          onChange={setName}
          placeholder="যেমন: রাফি আহমেদ"
          autoComplete="name"
          icon={<UserRound className="size-4" />}
          disabled={isSubmitting}
        />
        <AuthField
          id="signup-email"
          label="ইমেইল ঠিকানা"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
          icon={<Mail className="size-4" />}
          disabled={isSubmitting}
          dir="ltr"
        />
        <AuthField
          id="signup-password"
          label="পাসওয়ার্ড"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
          autoComplete="new-password"
          icon={<LockKeyhole className="size-4" />}
          hint="পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClass({
            variant: "primary",
            size: "lg",
            className: "w-full",
          })}
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              অ্যাকাউন্ট তৈরি হচ্ছে…
            </>
          ) : (
            <>
              অ্যাকাউন্ট তৈরি করুন
              <UserRoundPlus aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-800/40">
        অ্যাকাউন্ট তৈরি করে আপনি আমাদের তথ্য ব্যবহারের নীতিতে সম্মতি দিচ্ছেন।
        আপনার পাসওয়ার্ড সুরক্ষিতভাবে সংরক্ষিত হয়।
      </p>

      <p className="mt-5 text-center text-[13px] text-ink-800/55">
        আগেই অ্যাকাউন্ট আছে?{" "}
        <Link
          href={signinHref}
          className="font-bold text-leaf-700 underline decoration-leaf-500/30 underline-offset-4 transition hover:text-leaf-600"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
