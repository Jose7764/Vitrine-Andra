import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Início" },
  { href: "/livros", label: "Livros" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" }
];

export function Footer() {
  return (
    <footer id="contato" className="border-t border-gold/20 bg-coffee text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <p className="font-signature text-5xl text-gold-soft">Andra</p>
          <p className="mt-1 font-serif text-xl text-ivory">Livros Digitais</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-cream/78">
            Livros que acercam o coração a Deus.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-cream/64">
            Uma coleção digital cristã, reflexiva e editorial, criada para
            acolher, edificar e inspirar cada temporada da fé.
          </p>
        </div>

        <div className="text-sm text-cream/78">
          <p className="font-serif text-2xl text-ivory">Contato</p>
          <div className="mt-4 space-y-3">
            <a
              href="https://wa.me/554797766165"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-gold/20 bg-cream/5 px-4 py-3 transition hover:border-gold/45 hover:bg-cream/10"
            >
              <span className="block text-xs uppercase tracking-[0.2em] text-gold-soft">
                WhatsApp
              </span>
              <span className="mt-1 block text-ivory">+55 47 9776-6165</span>
            </a>
            <a
              href="mailto:yosoyandra74@gmail.com"
              className="block rounded-2xl border border-gold/20 bg-cream/5 px-4 py-3 break-words transition hover:border-gold/45 hover:bg-cream/10"
            >
              <span className="block text-xs uppercase tracking-[0.2em] text-gold-soft">
                E-mail
              </span>
              <span className="mt-1 block text-ivory">yosoyandra74@gmail.com</span>
            </a>
          </div>
        </div>

        <nav aria-label="Links rápidos" className="text-sm text-cream/78">
          <p className="font-serif text-2xl text-ivory">Links rápidos</p>
          <div className="mt-4 grid gap-2">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-1 py-1 transition hover:text-gold-soft"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs leading-6 text-cream/55">
            Compras finalizadas com segurança pela Hotmart.
          </p>
        </nav>
      </div>
      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs text-cream/55">
        © 2026 Andra. Todos os direitos reservados.
      </div>
    </footer>
  );
}
