"use client";

import { useEffect, useMemo, useState } from "react";
import type { Book } from "@/types/book";
import { BookCard } from "@/components/BookCard";

type RecentBooksCarouselProps = {
  books: Book[];
};

export function RecentBooksCarousel({ books }: RecentBooksCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (books.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % books.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [books.length]);

  const activeBook = books[activeIndex];

  const previewBooks = useMemo(
    () =>
      books.map((book, index) => ({
        ...book,
        isActive: index === activeIndex
      })),
    [activeIndex, books]
  );

  if (!activeBook) return null;

  return (
    <div className="rounded-[1.75rem] border border-gold/25 bg-cream/72 p-4 shadow-soft md:p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="min-w-0">
          <BookCard book={activeBook} />
        </div>

        <div className="space-y-4">
          <div className="ornament-divider font-serif text-xl">Coleção recente</div>
          <div className="space-y-3">
            {previewBooks.map((book, index) => (
              <button
                key={book.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  book.isActive
                    ? "border-gold/55 bg-ivory shadow-soft"
                    : "border-gold/15 bg-ivory/45 hover:border-gold/35"
                }`}
              >
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {book.category}
                </span>
                <span className="mt-1 block font-serif text-xl text-coffee">
                  {book.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-walnut">
                  {book.shortDescription}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2 pt-2" aria-label="Controle do carrossel">
            {books.map((book, index) => (
              <button
                key={book.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-gold" : "w-2.5 bg-gold/30"
                }`}
                aria-label={`Mostrar ${book.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
