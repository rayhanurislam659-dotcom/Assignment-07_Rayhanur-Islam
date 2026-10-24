import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";
import { socialProvidersEnabled } from "@/lib/auth";
import { getServerSession } from "@/lib/session";
import { safeRedirectPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "সাইন ইন",
  description:
    "বাজার দর-এ সাইন ইন করে আজকের পণ্যের দাম, বাজারভিত্তিক তুলনা ও প্রোফাইল দেখুন।",
};

type AuthSearchParams = Promise<{
  redirect?: string | string[];
  reason?: string | string[];
  registered?: string | string[];
  email?: string | string[];
}>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: AuthSearchParams;
}) {
  const params = await searchParams;
  const redirectTo = safeRedirectPath(firstValue(params.redirect));
  const email = (firstValue(params.email) ?? "").slice(0, 254);
  const protectedNotice = firstValue(params.reason) === "protected";
  const registered = firstValue(params.registered) === "1";

  const session = await getServerSession();
  if (session) {
    redirect(
      redirectTo === "/signin" || redirectTo === "/signup" ? "/" : redirectTo,
    );
  }

  return (
    <AuthShell mode="signin">
      <SignInForm
        redirectTo={redirectTo}
        providers={socialProvidersEnabled}
        initialEmail={email}
        protectedNotice={protectedNotice}
        registered={registered}
      />
    </AuthShell>
  );
}
