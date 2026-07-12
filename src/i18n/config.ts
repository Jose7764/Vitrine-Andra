import type { Locale } from "@/types/book";

export const locales = ["pt", "es", "en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "pt";

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  es: "Español",
  en: "English"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "") {
  const normalizedPath = path === "/" ? "" : path;
  return `/${locale}${normalizedPath}`;
}
