"use client";

import { useEffect, useMemo, useState } from "react";
import type { Book, Locale } from "@/types/book";
import { BookCard } from "@/components/BookCard";
import { getLocalizedBook } from "@/lib/books";
import { getMessages, interpolate } from "@/i18n/messages";

type RecentBooksCarouselProps = {
  books: Book[];
  locale: Locale;
};

export function RecentBooksCarousel({ books, locale }: RecentBooksCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const text = getMessages(locale).home;

  useEffect(() => {
    if (books.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % books.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [books.length]);

  const activeBook = books[activeIndex];
  const previewBooks = useMemo(
    () => books.map((book, index) => ({ ...book, isActive: index === activeIndex })),
    [activeIndex, books]
  );

  if (!activeBook) return null;

  return (
    <div className="rounded-[1.75rem] border border-gold/25 bg-cream/72 p-4 shadow-soft md:p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="min-w-0">
          <BookCard book={activeBook} locale={locale} />
        </div>

        <div className="space-y-4">
          <div className="ornament-divider font-serif text-xl">{text.recentCollection}</div>
          <div className="space-y-3">
            {previewBooks.map((book, index) => {
              const localizedBook = getLocalizedBook(book, locale);
              return (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-full rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                    book.isActive
                      ? "border-gold/55 bg-ivory shadow-soft"
                      : "border-gold/15 bg-ivory/45 hover:border-gold/35"
                  }`}
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    {localizedBook.category}
                  </span>
                  <span className="mt-1 block font-serif text-xl text-coffee">{localizedBook.title}</span>
                  <span className="mt-1 line-clamp-3 block text-sm leading-6 text-walnut">
                    {localizedBook.shortDescription}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 pt-2" aria-label={text.carouselLabel}>
            {books.map((book, index) => (
              <button
                key={book.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                  index === activeIndex ? "w-8 bg-gold" : "w-2.5 bg-gold/30"
                }`}
                aria-label={interpolate(text.showBook, {
                  title: getLocalizedBook(book, locale).title
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
