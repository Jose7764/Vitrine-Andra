"use client";

import { usePathname, useRouter } from "next/navigation";
import { localeNames, locales } from "@/i18n/config";
import type { Locale } from "@/types/book";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const query = window.location.search.slice(1);
    const nextPath = `${segments.join("/")}${query ? `?${query}` : ""}`;

    document.cookie = `andra-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.push(nextPath);
  }

  return (
    <label className="flex min-w-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-clay">
      <span className="sr-only sm:not-sr-only">{label}</span>
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        aria-label={label}
        className="min-h-11 min-w-0 rounded-full border border-gold/35 bg-cream px-4 py-2 text-sm font-medium normal-case tracking-normal text-coffee outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
      >
        {locales.map((option) => (
          <option key={option} value={option}>
            {localeNames[option]}
          </option>
        ))}
      </select>
    </label>
  );
}
