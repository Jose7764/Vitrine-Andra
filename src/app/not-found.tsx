import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-5 py-16 text-center">
      <section className="max-w-xl rounded-[2rem] border border-gold/25 bg-ivory/70 p-10 shadow-soft">
        <p className="font-signature text-6xl text-gold">Andra</p>
        <h1 className="mt-4 font-serif text-4xl text-coffee">Livro não encontrado</h1>
        <p className="mt-4 leading-7 text-walnut">
          O título que você tentou acessar não está disponível nesta vitrine.
        </p>
        <Button href="/livros" className="mt-7">
          Ver todos os livros
        </Button>
      </section>
    </main>
  );
}
