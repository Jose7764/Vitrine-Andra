import { BookCard } from "@/components/BookCard";
import { getAllBooks } from "@/data/books";

const benefits = [
  "Livros que transformam",
  "Verdades que edificam",
  "Para cada temporada",
  "Com propósito e excelência"
];

export const metadata = {
  title: "Livros | Andra",
  description: "Todos os livros digitais disponíveis na coleção Andra."
};

export default function BooksPage() {
  const sortedBooks = getAllBooks();

  return (
    <main className="px-5 py-14 lg:px-8">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gold">
          Catálogo completo
        </p>
        <h1 className="mt-4 font-serif text-5xl text-coffee sm:text-6xl">
          Todos os livros
        </h1>
        <p className="mt-5 text-lg leading-8 text-walnut">
          Conheça os livros digitais disponíveis, escolha o título que conversa
          com sua temporada e finalize sua compra com segurança pela Hotmart.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit}
            className="rounded-2xl border border-gold/20 bg-ivory/68 p-5 text-center shadow-soft"
          >
            <span className="text-xl text-gold">✦</span>
            <p className="mt-2 font-serif text-lg text-coffee">{benefit}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} compact />
        ))}
      </section>
    </main>
  );
}
