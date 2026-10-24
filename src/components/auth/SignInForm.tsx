"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleAlert, Loader2, LockKeyhole, LogIn, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { AuthField } from "@/components/auth/AuthField";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { buttonClass } from "@/components/ui/button-styles";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { signIn } from "@/lib/auth-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignInForm({
  redirectTo,
  providers,
  initialEmail = "",
  protectedNotice = false,
  registered = false,
}: {
  redirectTo: string;
  providers: { google: boolean; github: boolean };
  initialEmail?: string;
  protectedNotice?: boolean;
  registered?: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const notified = useRef(false);

  useEffect(() => {
    if (notified.current) return;
    notified.current = true;

    if (protectedNotice) {
      toast("এই পেজটি দেখতে আগে সাইন ইন করুন।", {
        id: "protected-route",
        icon: "🔒",
        duration: 4500,
      });
      return;
    }
    if (registered) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।", {
        id: "registered",
        duration: 4000,
      });
    }
  }, [protectedNotice, registered]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    let validationMessage: string | null = null;
    if (!trimmedEmail) {
      validationMessage = "ইমেইল ঠিকানা লিখুন।";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      validationMessage = "সঠিক ইমেইল ঠিকানা লিখুন।";
    } else if (!password) {
      validationMessage = "পাসওয়ার্ড লিখুন।";
    } else if (password.length < 6) {
      validationMessage = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।";
    }

    if (validationMessage) {
      setFormError(validationMessage);
      toast.error(validationMessage, { id: "signin-validation" });
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const { error } = await signIn.email({
        email: trimmedEmail,
        password,
      });

      if (error) {
        const message = getAuthErrorMessage(
          error,
          "সাইন ইন করা যায়নি। ইমেইল ও পাসওয়ার্ড ঠিক আছে কি না দেখুন।",
        );
        setFormError(message);
        toast.error(message, { id: "signin-error" });
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছেন।", { id: "signin-success" });
      router.push(redirectTo);
      router.refresh();
    } catch {
      const message = "সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message, { id: "signin-error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  const signupHref =
    redirectTo === "/"
      ? "/signup"
      : `/signup?redirect=${encodeURIComponent(redirectTo)}`;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-50 px-3 py-1 text-[11px] font-bold text-leaf-700 ring-1 ring-leaf-500/15">
          <LogIn aria-hidden="true" className="size-3.5" />
          অ্যাকাউন্টে প্রবেশ
        </span>
        <Link
          href="/"
          className="text-[11px] font-semibold text-ink-800/45 transition hover:text-leaf-700"
        >
          হোমে ফিরুন
        </Link>
      </div>

      <h1 className="mt-4 font-display text-[1.75rem] font-bold leading-tight text-ink-950 sm:text-3xl">
        আবার স্বাগতম
      </h1>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-800/55">
        সাইন ইন করে আজকের বাজারদর, দামের তুলনা ও আপনার প্রোফাইল দেখুন।
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

      <form method="post" onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthField
          id="signin-email"
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
          id="signin-password"
          label="পাসওয়ার্ড"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="আপনার পাসওয়ার্ড"
          autoComplete="current-password"
          icon={<LockKeyhole className="size-4" />}
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
              সাইন ইন হচ্ছে…
            </>
          ) : (
            <>
              সাইন ইন করুন
              <LogIn aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </form>

      {redirectTo !== "/" ? (
        <p className="mt-3 rounded-xl bg-cream-100/80 px-3 py-2 text-center text-[11px] font-medium text-ink-800/50">
          সাইন ইন সফল হলে আপনাকে আগের পেজে ফিরিয়ে নেওয়া হবে।
        </p>
      ) : null}

      <p className="mt-6 text-center text-[13px] text-ink-800/55">
        এখনো অ্যাকাউন্ট নেই?{" "}
        <Link
          href={signupHref}
          className="font-bold text-leaf-700 underline decoration-leaf-500/30 underline-offset-4 transition hover:text-leaf-600"
        >
          বিনামূল্যে সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}
