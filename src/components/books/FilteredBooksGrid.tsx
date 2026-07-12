"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { BookFilters } from "@/components/books/BookFilters";
import { getMessages, interpolate } from "@/i18n/messages";
import { getLocalizedBook, normalizeSearchText } from "@/lib/books";
import { parsePrice } from "@/lib/formatPrice";
import type { Book, Locale } from "@/types/book";
import { isLocale } from "@/i18n/config";

type FilteredBooksGridProps = {
  books: Book[];
  locale: Locale;
};

export function FilteredBooksGrid({ books, locale }: FilteredBooksGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  const lastWrittenQuery = useRef(urlQuery);
  const paramsRef = useRef(new URLSearchParams(searchParams.toString()));
  const languageParam = searchParams.get("language") ?? "";
  const language = isLocale(languageParam) ? languageParam : "";
  const minPriceInput = searchParams.get("minPrice") ?? "";
  const maxPriceInput = searchParams.get("maxPrice") ?? "";
  const messages = getMessages(locale);

  function replaceParams(changes: Record<string, string>) {
    const params = new URLSearchParams(paramsRef.current.toString());
    Object.entries(changes).forEach(([key, value]) => {
      if (value.trim()) params.set(key, value.trim());
      else params.delete(key);
    });
    paramsRef.current = params;
    const nextQuery = params.toString();
    router.replace(`${pathname}${nextQuery ? `?${nextQuery}` : ""}`, { scroll: false });
  }

  useEffect(() => {
    paramsRef.current = new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  useEffect(() => {
    if (urlQuery !== lastWrittenQuery.current) {
      setQuery(urlQuery);
      lastWrittenQuery.current = urlQuery;
    }
  }, [urlQuery]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (query === urlQuery) return;
      lastWrittenQuery.current = query;
      replaceParams({ q: query });
    }, 300);
    return () => window.clearTimeout(timer);
    // replaceParams intentionally uses the latest URL snapshot after the debounce.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, urlQuery]);

  const minPrice = parsePrice(minPriceInput);
  const maxPrice = parsePrice(maxPriceInput);
  const hasInvalidPrice =
    (minPriceInput.trim() !== "" && minPrice === null) ||
    (maxPriceInput.trim() !== "" && maxPrice === null);
  const hasInvalidRange = minPrice !== null && maxPrice !== null && minPrice > maxPrice;
  const validationMessage = hasInvalidPrice
    ? messages.filters.invalidPrice
    : hasInvalidRange
      ? messages.filters.invalidRange
      : undefined;

  const filteredBooks = (() => {
    const normalizedQuery = normalizeSearchText(query);

    return books.filter((book) => {
      const localizedBook = getLocalizedBook(book, locale);
      const titleMatches =
        !normalizedQuery ||
        normalizeSearchText(localizedBook.title).includes(normalizedQuery) ||
        normalizeSearchText(book.title).includes(normalizedQuery);
      const languageMatches = !language || book.language === language;
      const price = parsePrice(book.price);
      const priceMatches =
        hasInvalidPrice || hasInvalidRange ||
        ((minPrice === null || (price !== null && price >= minPrice)) &&
          (maxPrice === null || (price !== null && price <= maxPrice)));

      return titleMatches && languageMatches && priceMatches;
    });
  })();

  const resultTemplate = filteredBooks.length === 1
    ? messages.books.resultSingular
    : messages.books.resultPlural;

  return (
    <div className="mx-auto mt-12 max-w-7xl">
      <BookFilters
        query={query}
        language={language}
        minPrice={minPriceInput}
        maxPrice={maxPriceInput}
        messages={messages}
        onQueryChange={setQuery}
        onLanguageChange={(value) => replaceParams({ language: value })}
        onMinPriceChange={(value) => replaceParams({ minPrice: value })}
        onMaxPriceChange={(value) => replaceParams({ maxPrice: value })}
        onClear={() => {
          lastWrittenQuery.current = "";
          paramsRef.current = new URLSearchParams();
          setQuery("");
          router.replace(pathname, { scroll: false });
        }}
        validationMessage={validationMessage}
      />

      <p aria-live="polite" className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-clay">
        {interpolate(resultTemplate, { count: filteredBooks.length })}
      </p>

      {filteredBooks.length ? (
        <section className="mt-5 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} locale={locale} compact />
          ))}
        </section>
      ) : (
        <section className="mt-5 rounded-2xl border border-gold/25 bg-ivory/70 px-6 py-14 text-center shadow-soft">
          <p className="font-serif text-2xl text-coffee">{messages.books.noResults}</p>
        </section>
      )}
    </div>
  );
}
