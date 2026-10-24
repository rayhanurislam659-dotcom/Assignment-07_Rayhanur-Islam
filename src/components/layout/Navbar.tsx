"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { Logo } from "@/components/brand/Logo";
import { buttonClass } from "@/components/ui/button-styles";
import { authClient, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

function AuthSkeleton() {
  return (
    <div className="flex items-center gap-1.5" aria-label="অ্যাকাউন্ট তথ্য লোড হচ্ছে">
      <span className="h-9 w-[4.5rem] animate-pulse rounded-full bg-cream-200/90 sm:h-10 sm:w-20" />
      <span className="h-9 w-[4.5rem] animate-pulse rounded-full bg-cream-200/90 sm:h-10 sm:w-20" />
    </div>
  );
}

export function Navbar({
  categories,
  dateLabel,
}: {
  categories: Category[];
  dateLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const redirectQuery =
    pathname && !isAuthPage && pathname !== "/"
      ? `?redirect=${encodeURIComponent(pathname)}`
      : "";

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }
      toast.success("সফলভাবে সাইন আউট হয়েছেন।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-cream-50/90 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-2 sm:h-[4.5rem]">
        <Logo dateLabel={dateLabel} />

        <div className="flex items-center gap-1.5 sm:gap-2">
          {isPending ? (
            <AuthSkeleton />
          ) : session?.user ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-line bg-cream-50 py-1 pl-1 pr-2.5 text-xs font-semibold text-ink-900 transition hover:border-leaf-500/30 hover:bg-leaf-50 sm:pr-3"
              >
                <span className="grid size-7 place-items-center rounded-full bg-ink-900 text-[11px] font-bold text-cream-50 sm:size-8 sm:text-xs">
                  {session.user.name ? (
                    Array.from(session.user.name.trim())[0]
                  ) : (
                    <UserRound aria-hidden="true" className="size-3.5" />
                  )}
                </span>
                <span className="hidden max-w-24 truncate sm:block">
                  {session.user.name}
                </span>
                <span className="sr-only sm:hidden">আমার প্রোফাইল</span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                aria-label="সাইন আউট"
                title="সাইন আউট"
                className="grid size-9 place-items-center rounded-full border border-line bg-cream-50 text-ink-800/65 transition hover:border-down/20 hover:bg-down-soft hover:text-down disabled:opacity-50 sm:size-10"
              >
                {isSigningOut ? (
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                ) : (
                  <LogOut aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
          ) : (
            <>
              <Link
                href={`/signin${redirectQuery}`}
                className={buttonClass({
                  variant: "outline",
                  size: "sm",
                  className: "px-3 text-xs sm:px-4 sm:text-sm",
                })}
              >
                সাইন ইন
              </Link>
              <Link
                href={`/signup${redirectQuery}`}
                className={buttonClass({
                  variant: "dark",
                  size: "sm",
                  className: "px-3 text-xs sm:px-4 sm:text-sm",
                })}
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-line/60 bg-cream-50/70">
        <div className="shell">
          <nav
            aria-label="ক্যাটাগরি"
            className="no-scrollbar flex items-center gap-1.5 overflow-x-auto py-2 sm:gap-2"
          >
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition sm:px-3.5 sm:text-[13px]",
                pathname === "/"
                  ? "bg-ink-900 text-cream-50 shadow-[0_8px_18px_-12px_rgba(11,33,23,0.9)]"
                  : "text-ink-800/65 hover:bg-cream-200/80 hover:text-ink-900",
              )}
            >
              <span aria-hidden="true">🛍️</span>
              সব পণ্য
            </Link>
            <span aria-hidden="true" className="mx-0.5 h-4 w-px shrink-0 bg-line" />
            {categories.map((category) => {
              const active = pathname === `/category/${category.slug}`;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition sm:px-3.5 sm:text-[13px]",
                    active
                      ? "bg-leaf-600 text-cream-50 shadow-[0_8px_18px_-12px_rgba(37,122,83,0.9)]"
                      : "text-ink-800/65 hover:bg-cream-200/80 hover:text-ink-900",
                  )}
                >
                  <span aria-hidden="true" className="text-sm">
                    {category.icon}
                  </span>
                  {category.nameBn}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
