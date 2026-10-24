import type { Metadata, Viewport } from "next";
import { Anek_Bangla, Hind_Siliguri } from "next/font/google";
import { getCategoriesSafe, getTickerProducts } from "@/lib/api";
import { formatDateBn } from "@/lib/bengali";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PriceTicker } from "@/components/layout/PriceTicker";
import { ToastProvider } from "@/components/layout/ToastProvider";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: "variable",
  variable: "--font-anek",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — প্রয়োজনীয় পণ্যের দাম এক নজরে`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "বাজার দর",
    "আজকের বাজারদর",
    "BazarDor",
    "Bangladesh market price",
    "চালের দাম",
    "সবজির দাম",
    "মাছের দাম",
  ],
  authors: [{ name: "BazarDor" }],
  openGraph: {
    title: `${SITE_NAME} — প্রয়োজনীয় পণ্যের দাম এক নজরে`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — প্রয়োজনীয় পণ্যের দাম এক নজরে`,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#10281d",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [categories, tickerProducts] = await Promise.all([
    getCategoriesSafe(),
    getTickerProducts(),
  ]);
  const dateLabel = formatDateBn(new Date());

  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${anekBangla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-full bg-ink-950 px-4 py-2 text-sm font-semibold text-cream-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          মূল কনটেন্টে যান
        </a>
        <Navbar categories={categories} dateLabel={dateLabel} />
        <PriceTicker products={tickerProducts} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer categories={categories} />
        <ToastProvider />
      </body>
    </html>
  );
}
