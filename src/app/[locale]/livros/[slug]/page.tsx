import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { getAllBooks, getBookBySlug } from "@/data/books";
import { formatPrice } from "@/lib/formatPrice";
import { getBookLanguageLabel, getLocalizedBook } from "@/lib/books";
import { getMessages, interpolate } from "@/i18n/messages";
import { isLocale, localePath, locales } from "@/i18n/config";
import { absoluteSiteUrl, localizedAlternates, openGraphLocale } from "@/i18n/metadata";

type BookPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllBooks().map((book) => ({ locale, slug: book.slug }))
  );
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { locale: value, slug } = await params;
  if (!isLocale(value)) return {};
  const book = getBookBySlug(slug);
  const messages = getMessages(value);

  if (!book) return { title: messages.metadata.notFoundTitle };
  const localizedBook = getLocalizedBook(book, value);
  const path = `/livros/${book.slug}`;
  const socialImage = absoluteSiteUrl(book.coverImage);

  return {
    title: `${localizedBook.title} | Andra`,
    description: localizedBook.shortDescription,
    alternates: localizedAlternates(value, path),
    openGraph: {
      title: `${localizedBook.title} | Andra`,
      description: localizedBook.shortDescription,
      locale: openGraphLocale(value),
      type: "book",
      images: socialImage
        ? [{ url: socialImage, alt: interpolate(messages.book.coverAlt, { title: localizedBook.title }) }]
        : undefined
    }
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { locale: value, slug } = await params;
  if (!isLocale(value)) notFound();
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const localizedBook = getLocalizedBook(book, value);
  const messages = getMessages(value);
  const details = [
    { label: messages.book.format, value: book.format },
    { label: messages.book.language, value: getBookLanguageLabel(book.language, value) },
    ...(book.pages ? [{ label: messages.book.pages, value: `${book.pages}` }] : [])
  ];

  return (
    <main className="px-5 py-14 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-gold/25 bg-ivory/62 p-5 shadow-soft md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:items-start md:p-9 lg:p-12">
        <div className="flex h-fit justify-center md:sticky md:top-28">
          <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
            <div className="absolute -inset-5 rounded-[2rem] border border-gold/20" />
            <Image src={book.coverImage} alt={interpolate(messages.book.coverAlt, { title: localizedBook.title })} width={360} height={510} priority className="relative aspect-[3/4.25] h-auto w-full rounded-2xl object-cover shadow-book" />
            <span className="book-spine pointer-events-none absolute inset-y-0 left-0 w-10 rounded-l-2xl" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">{localizedBook.category}</p>
          <h1 className="mt-4 break-words font-serif text-5xl leading-tight text-coffee sm:text-6xl">{localizedBook.title}</h1>
          <div className="ornament-divider my-6 font-serif text-lg">{messages.book.presentation}</div>
          <p className="max-w-3xl whitespace-pre-line break-words text-lg leading-9 text-walnut">{localizedBook.summary}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-2xl border border-gold/20 bg-cream/76 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-clay">{detail.label}</p>
                <p className="mt-2 break-words font-serif text-xl text-coffee">{detail.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-gold/25 bg-cream/78 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-clay">{messages.book.price}</p>
            <p className="mt-2 font-serif text-4xl font-semibold text-coffee">{formatPrice(book.price)}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={book.hotmartUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">{messages.book.buy}</Button>
              <Button href={localePath(value, "/livros")} variant="secondary" className="w-full sm:w-auto">{messages.book.back}</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
