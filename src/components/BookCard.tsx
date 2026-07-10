import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/types/book";
import { Button } from "@/components/Button";

type BookCardProps = {
  book: Book;
  compact?: boolean;
};

export function BookCard({ book, compact = false }: BookCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-ivory/72 p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-book">
      <Link href={`/livros/${book.slug}`} className="block">
        <div className="relative mx-auto aspect-[3/4.25] w-full max-w-[220px] overflow-hidden rounded-xl bg-cream shadow-book">
          <Image
            src={book.coverImage}
            alt={`Capa do livro ${book.title}`}
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
            {book.category}
          </p>
          {book.featured ? (
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
              Destaque
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-coffee">
          {book.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-walnut">
          {book.shortDescription}
        </p>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-serif text-2xl font-semibold text-coffee">
            {book.price}
          </span>
          <Button href={`/livros/${book.slug}`} variant={compact ? "secondary" : "primary"}>
            Ver detalhes
          </Button>
        </div>
      </div>
    </article>
  );
}
