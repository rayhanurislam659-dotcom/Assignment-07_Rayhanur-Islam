import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { socialProvidersEnabled } from "@/lib/auth";
import { getServerSession } from "@/lib/session";
import { safeRedirectPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "সাইন আপ",
  description:
    "বিনামূল্যে বাজার দর অ্যাকাউন্ট তৈরি করুন এবং পণ্যের বিস্তারিত বাজারভিত্তিক দাম দেখুন।",
};

type AuthSearchParams = Promise<{
  redirect?: string | string[];
}>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: AuthSearchParams;
}) {
  const params = await searchParams;
  const redirectTo = safeRedirectPath(firstValue(params.redirect));

  const session = await getServerSession();
  if (session) {
    redirect(
      redirectTo === "/signin" || redirectTo === "/signup" ? "/" : redirectTo,
    );
  }

  return (
    <AuthShell mode="signup">
      <SignUpForm
        redirectTo={redirectTo}
        providers={socialProvidersEnabled}
      />
    </AuthShell>
  );
}
