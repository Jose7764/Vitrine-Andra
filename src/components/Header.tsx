import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getMessages } from "@/i18n/messages";
import { localePath } from "@/i18n/config";
import type { Locale } from "@/types/book";

export function Header({ locale }: { locale: Locale }) {
  const text = getMessages(locale).header;
  const home = localePath(locale);
  const menuItems = [
    { href: home, label: text.home },
    { href: localePath(locale, "/livros"), label: text.books },
    { href: `${home}#sobre`, label: text.about },
    { href: `${home}#contato`, label: text.contact }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-ivory/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href={home} className="group inline-flex items-center gap-3 self-start">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-cream text-lg text-gold shadow-soft">
            ✦
          </span>
          <span>
            <span className="block font-signature text-4xl leading-none text-coffee">Andra</span>
            <span className="block text-[0.68rem] uppercase tracking-[0.28em] text-clay">
              {text.digitalBooks}
            </span>
          </span>
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
          <nav aria-label={text.menuLabel} className="flex flex-wrap items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-walnut transition hover:bg-gold/10 hover:text-coffee focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} label={text.languageLabel} />
        </div>
      </div>
    </header>
  );
}
