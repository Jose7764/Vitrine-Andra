import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { FilteredBooksGrid } from "@/components/books/FilteredBooksGrid";
import { getAllBooks } from "@/data/books";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedAlternates, openGraphLocale } from "@/i18n/metadata";

type BooksPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: BooksPageProps): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const text = getMessages(value).metadata;
  return {
    title: text.booksTitle,
    description: text.booksDescription,
    alternates: localizedAlternates(value, "/livros"),
    openGraph: { title: text.booksTitle, description: text.booksDescription, locale: openGraphLocale(value), type: "website" }
  };
}

export default async function BooksPage({ params }: BooksPageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const books = getAllBooks();
  const messages = getMessages(value);

  return (
    <main className="px-5 py-14 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">{messages.books.eyebrow}</p>
        <h1 className="mt-4 font-serif text-5xl text-coffee sm:text-6xl">{messages.books.title}</h1>
        <p className="mt-5 text-lg leading-8 text-walnut">{messages.books.intro}</p>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {messages.home.benefits.map((benefit) => (
          <div key={benefit} className="rounded-2xl border border-gold/20 bg-ivory/68 p-5 text-center shadow-soft">
            <span className="text-xl text-gold">✦</span>
            <p className="mt-2 font-serif text-lg text-coffee">{benefit}</p>
          </div>
        ))}
      </section>

      <Suspense fallback={<div className="mx-auto mt-12 h-32 max-w-7xl animate-pulse rounded-2xl bg-gold/10" />}>
        <FilteredBooksGrid books={books} locale={value} />
      </Suspense>
    </main>
  );
}
