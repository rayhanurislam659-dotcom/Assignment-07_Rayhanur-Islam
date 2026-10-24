import type { Category } from "@/lib/types";

export const FALLBACK_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export const SITE_NAME = "বাজার দর";
export const SITE_TAGLINE = "প্রয়োজনীয় পণ্যের দাম এক নজরে।";
export const SITE_DESCRIPTION =
  "চাল, ডাল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক জায়গায়।";

export const SITE_LINKS = {
  home: "/",
  allProducts: "/#সব-পণ্য",
  signIn: "/signin",
  signUp: "/signup",
  profile: "/profile",
};
