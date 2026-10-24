"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

type Provider = "google" | "github";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.88 12c0-.8.14-1.57.39-2.29V6.62H1.29A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.67.41.36.77 1.05.77 2.12v3.14c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

const PROVIDERS: {
  id: Provider;
  label: string;
  icon: () => React.JSX.Element;
}[] = [
  { id: "google", label: "Google", icon: GoogleIcon },
  { id: "github", label: "GitHub", icon: GitHubIcon },
];

export function SocialButtons({
  providers,
  callbackURL,
}: {
  providers: { google: boolean; github: boolean };
  callbackURL: string;
}) {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  async function handleSocial(provider: Provider) {
    if (!providers[provider]) {
      toast.error(
        `${provider === "google" ? "Google" : "GitHub"} লগইন এখনো চালু করা হয়নি।`,
        { id: `provider-${provider}` },
      );
      return;
    }

    setLoadingProvider(provider);
    try {
      const result = await signIn.social({ provider, callbackURL });
      if (result?.error) {
        toast.error("সোশ্যাল লগইন সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।");
        setLoadingProvider(null);
      }
    } catch {
      toast.error("সোশ্যাল লগইনে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoadingProvider(null);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5">
        {PROVIDERS.map((provider) => {
          const isLoading = loadingProvider === provider.id;
          const Icon = provider.icon;
          return (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleSocial(provider.id)}
              disabled={loadingProvider !== null}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-line bg-cream-50 text-[13px] font-semibold text-ink-900 transition hover:border-ink-900/20 hover:bg-cream-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              ) : (
                <Icon />
              )}
              {provider.label}
            </button>
          );
        })}
      </div>
      <div className="my-5 flex items-center gap-3">
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-800/40">
          অথবা ইমেইল দিয়ে
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
    </div>
  );
}
