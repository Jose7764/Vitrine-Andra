import { localePath, locales } from "@/i18n/config";
import type { Locale } from "@/types/book";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const metadataBase = configuredSiteUrl ? new URL(configuredSiteUrl) : undefined;

export function absoluteSiteUrl(path: string) {
  return metadataBase ? new URL(path, metadataBase).toString() : undefined;
}

const hrefLanguages: Record<Locale, string> = {
  pt: "pt-BR",
  es: "es",
  en: "en"
};

export function localizedAlternates(locale: Locale, path = "") {
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(
        locales.map((item) => [hrefLanguages[item], localePath(item, path)])
      ),
      "x-default": localePath("pt", path)
    }
  };
}

export function openGraphLocale(locale: Locale) {
  return locale === "pt" ? "pt_BR" : locale === "es" ? "es_ES" : "en_US";
}
