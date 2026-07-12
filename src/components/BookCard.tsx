import Image from "next/image";
import Link from "next/link";
import type { Book, Locale } from "@/types/book";
import { Button } from "@/components/Button";
import { formatPrice } from "@/lib/formatPrice";
import { getLocalizedBook } from "@/lib/books";
import { getMessages, interpolate } from "@/i18n/messages";
import { localePath } from "@/i18n/config";

type BookCardProps = {
  book: Book;
  locale: Locale;
  compact?: boolean;
};

export function BookCard({ book, locale, compact = false }: BookCardProps) {
  const localizedBook = getLocalizedBook(book, locale);
  const text = getMessages(locale).book;
  const bookHref = localePath(locale, `/livros/${book.slug}`);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gold/20 bg-ivory/72 p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-book">
      <Link href={bookHref} className="block">
        <div className="relative mx-auto aspect-[3/4.25] w-full max-w-[220px] overflow-hidden rounded-xl bg-cream shadow-book">
          <Image
            src={book.coverImage}
            alt={interpolate(text.coverAlt, { title: localizedBook.title })}
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 640px) 35vw, 70vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="book-spine pointer-events-none absolute inset-y-0 left-0 w-8" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {localizedBook.category}
          </p>
          {book.featured ? (
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
              {text.featured}
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 break-words font-serif text-2xl leading-tight text-coffee">
          {localizedBook.title}
        </h3>
        <p className="mt-3 line-clamp-4 flex-1 break-words text-sm leading-6 text-walnut">
          {localizedBook.shortDescription}
        </p>
        <div className="mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-serif text-2xl font-semibold text-coffee">
            {formatPrice(book.price)}
          </span>
          <Button href={bookHref} variant={compact ? "secondary" : "primary"}>
            {text.viewDetails}
          </Button>
        </div>
      </div>
    </article>
  );
}
