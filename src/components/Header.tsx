import Link from "next/link";

const menuItems = [
  { href: "/", label: "Início" },
  { href: "/livros", label: "Livros" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-ivory/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-cream text-lg text-gold shadow-soft">
            ✦
          </span>
          <span>
            <span className="block font-signature text-4xl leading-none text-coffee">
              Andra
            </span>
            <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-clay">
              Livros digitais
            </span>
          </span>
        </Link>

        <nav aria-label="Menu principal" className="flex flex-wrap items-center gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-walnut transition hover:bg-gold/10 hover:text-coffee"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
