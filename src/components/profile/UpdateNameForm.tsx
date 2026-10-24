"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CircleAlert,
  Loader2,
  Save,
  UserRound,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { AuthField } from "@/components/auth/AuthField";
import { buttonClass } from "@/components/ui/button-styles";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { updateUser } from "@/lib/auth-client";

export function UpdateNameForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const hasChanged = name.trim() !== initialName.trim();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      const message = "আপনার নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
      setFormError(message);
      toast.error(message, { id: "profile-validation" });
      return;
    }

    if (!hasChanged) {
      toast("আগের নামটাই আছে — পরিবর্তন করে তারপর আপডেট করুন।", {
        id: "profile-unchanged",
        icon: "ℹ️",
      });
      return;
    }

    setIsSaving(true);
    setFormError(null);

    try {
      const { error } = await updateUser({ name: trimmedName });
      if (error) {
        const message = getAuthErrorMessage(
          error,
          "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।",
        );
        setFormError(message);
        toast.error(message, { id: "profile-error" });
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে।", {
        id: "profile-updated",
      });
      router.push("/profile");
      router.refresh();
    } catch {
      const message = "নাম আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message, { id: "profile-error" });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
      <div className="rounded-2xl border border-line/80 bg-cream-100/60 px-3.5 py-3">
        <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-ink-800/40">
          অ্যাকাউন্টের ইমেইল
        </span>
        <span
          dir="ltr"
          className="mt-1 block truncate text-left text-[13px] font-semibold text-ink-800/75"
        >
          {email}
        </span>
        <p className="mt-1 text-[10px] leading-relaxed text-ink-800/40">
          ইমেইল ঠিকানা এখান থেকে পরিবর্তন করা যায় না।
        </p>
      </div>

      {formError ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-2xl border border-down/15 bg-down-soft px-3.5 py-2.5 text-[12px] font-medium leading-relaxed text-down"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {formError}
        </div>
      ) : null}

      <AuthField
        id="profile-name"
        label="আপনার নাম"
        type="text"
        value={name}
        onChange={setName}
        placeholder="আপনার পুরো নাম"
        autoComplete="name"
        icon={<UserRound className="size-4" />}
        hint="এই নামটি আপনার প্রোফাইল ও নেভবারে দেখা যাবে।"
        disabled={isSaving}
      />

      <div className="flex flex-col-reverse gap-2.5 pt-1 sm:flex-row">
        <Link
          href="/profile"
          className={buttonClass({
            variant: "outline",
            size: "md",
            className: "flex-1",
          })}
        >
          <X aria-hidden="true" className="size-4" />
          বাতিল করুন
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className={buttonClass({
            variant: "primary",
            size: "md",
            className: "flex-1",
          })}
        >
          {isSaving ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              সংরক্ষণ হচ্ছে…
            </>
          ) : (
            <>
              <Save aria-hidden="true" className="size-4" />
              পরিবর্তন সংরক্ষণ করুন
            </>
          )}
        </button>
      </div>
    </form>
  );
}
