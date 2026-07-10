import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { getAllBooks, getBookBySlug } from "@/data/books";

type BookPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllBooks().map((book) => ({
    slug: book.slug
  }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return {
      title: "Livro não encontrado | Andra"
    };
  }

  return {
    title: `${book.title} | Andra`,
    description: book.shortDescription
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const details = [
    { label: "Formato", value: book.format },
    { label: "Idioma", value: book.language },
    ...(book.pages ? [{ label: "Páginas", value: `${book.pages}` }] : [])
  ];

  return (
    <main className="px-5 py-14 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-gold/25 bg-ivory/62 p-5 shadow-soft md:grid-cols-[0.85fr_1.15fr] md:p-9 lg:p-12">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] border border-gold/20" />
            <Image
              src={book.coverImage}
              alt={`Capa do livro ${book.title}`}
              width={360}
              height={510}
              priority
              className="relative aspect-[3/4.25] w-full max-w-[360px] rounded-2xl object-cover shadow-book"
            />
            <span className="book-spine pointer-events-none absolute inset-y-0 left-0 w-10 rounded-l-2xl" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
            {book.category}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-coffee sm:text-6xl">
            {book.title}
          </h1>
          <div className="ornament-divider my-6 font-serif text-lg">
            Apresentação do livro
          </div>
          <p className="text-lg leading-9 text-walnut">{book.summary}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-2xl border border-gold/20 bg-cream/76 p-4"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-clay">
                  {detail.label}
                </p>
                <p className="mt-2 font-serif text-xl text-coffee">{detail.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-gold/25 bg-cream/78 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-clay">Valor</p>
            <p className="mt-2 font-serif text-4xl font-semibold text-coffee">
              {book.price}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                href={book.hotmartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                Comprar na Hotmart
              </Button>
              <Button href="/livros" variant="secondary" className="w-full sm:w-auto">
                Voltar para todos os livros
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
