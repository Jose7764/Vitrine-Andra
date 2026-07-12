import type { Book, Locale, LocalizedBookContent } from "@/types/book";
import { getMessages } from "@/i18n/messages";

const legacyLanguages: Record<string, Locale> = {
  pt: "pt",
  portugues: "pt",
  portuguese: "pt",
  es: "es",
  espanhol: "es",
  espanol: "es",
  spanish: "es",
  en: "en",
  ingles: "en",
  english: "en"
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function normalizeBookLanguage(value: string | null | undefined): Locale {
  if (!value) return "pt";
  return legacyLanguages[normalizeText(value)] ?? "pt";
}

export function getLocalizedBook(book: Book, locale: Locale): Book {
  const translation: LocalizedBookContent | undefined = book.translations?.[locale];
  const translated = (value: string | undefined, fallback: string) =>
    value?.trim() || fallback;

  return {
    ...book,
    title: translated(translation?.title, book.title),
    category: translated(translation?.category, book.category),
    shortDescription: translated(translation?.shortDescription, book.shortDescription),
    summary: translated(translation?.summary, book.summary)
  };
}

export function getBookLanguageLabel(language: string, locale: Locale) {
  return getMessages(locale).languages[normalizeBookLanguage(language)];
}

export function normalizeSearchText(value: string) {
  return normalizeText(value);
}
