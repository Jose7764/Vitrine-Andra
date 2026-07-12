"use client";

import { useEffect } from "react";
import type { Locale } from "@/types/book";

export function DocumentLocale({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : locale;
  }, [locale]);

  return null;
}
