import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { RecentBooksCarousel } from "@/components/RecentBooksCarousel";
import { getRecentBooks } from "@/data/books";

const benefits = [
  "Livros que transformam",
  "Verdades que edificam",
  "Para cada temporada",
  "Com propósito e excelência"
];

export default function HomePage() {
  const recentBooks = getRecentBooks(4);

  return (
    <main>
      <section className="paper-texture overflow-hidden bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:px-8 lg:py-24">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-gold">
              Coleção editorial cristã
            </p>
            <h1 className="font-serif text-5xl leading-[0.98] text-coffee sm:text-6xl lg:text-7xl">
              Livros digitais para uma fé mais profunda.
            </h1>
            <p className="mt-5 font-signature text-6xl leading-none text-gold">
              Andra
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-walnut">
              Livros que acercam teu coração a Deus, com reflexões delicadas,
              beleza artesanal e palavras para atravessar cada temporada.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/livros">Conhecer os livros</Button>
              <Button href="#sobre" variant="secondary">
                Sobre a autora
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-gold/25" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full border border-gold/20" />
            <div className="relative rounded-[2rem] border border-gold/25 bg-ivory/70 p-5 shadow-soft">
              <div className="ornament-divider mb-5 font-serif text-xl">Vitrine premium</div>
              <div className="grid grid-cols-3 gap-3">
                {recentBooks.slice(0, 3).map((book, index) => (
                  <Link
                    href={`/livros/${book.slug}`}
                    key={book.id}
                    className={`block ${index === 1 ? "mt-8" : ""}`}
                  >
                    <Image
                      src={book.coverImage}
                      alt={`Capa do livro ${book.title}`}
                      width={260}
                      height={368}
                      className="aspect-[3/4.25] w-full rounded-xl object-cover shadow-book transition hover:-translate-y-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8" id="livros">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
              Lançamentos e favoritos
            </p>
            <h2 className="mt-3 font-serif text-4xl text-coffee sm:text-5xl">
              Livros mais recentes
            </h2>
            <p className="mt-4 text-base leading-7 text-walnut">
              Uma seleção em destaque para conhecer a essência da coleção.
            </p>
          </div>
          <RecentBooksCarousel books={recentBooks} />
        </div>
      </section>

      <section id="sobre" className="border-y border-gold/20 bg-ivory/55 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div className="rounded-[1.75rem] border border-gold/25 bg-cream p-8 text-center shadow-soft">
            <p className="font-signature text-6xl text-gold">Andra</p>
            <div className="ornament-divider mt-4 font-serif text-lg">Fé e palavra</div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
              Sobre a autora
            </p>
            <h2 className="mt-3 font-serif text-4xl text-coffee">
              Escrita com delicadeza, verdade e propósito.
            </h2>
            <p className="mt-5 text-base leading-8 text-walnut">
              Esta vitrine foi preparada para reunir livros digitais de inspiração
              cristã, devocionais e reflexões que ajudam o leitor a se aproximar
              de Deus com serenidade. No futuro, os dados poderão vir de um CMS;
              por enquanto, tudo esta organizado em arquivo local.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="rounded-2xl border border-gold/20 bg-ivory/70 p-6 text-center shadow-soft"
            >
              <span className="text-2xl text-gold">✧</span>
              <p className="mt-3 font-serif text-xl text-coffee">{benefit}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
