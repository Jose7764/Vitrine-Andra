import Link from "next/link";
import { getMessages } from "@/i18n/messages";
import { localePath } from "@/i18n/config";
import type { Locale } from "@/types/book";

export function Footer({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const text = messages.footer;
  const home = localePath(locale);
  const quickLinks = [
    { href: home, label: messages.header.home },
    { href: localePath(locale, "/livros"), label: messages.header.books },
    { href: `${home}#sobre`, label: messages.header.about },
    { href: `${home}#contato`, label: messages.header.contact }
  ];

  return (
    <footer id="contato" className="border-t border-gold/20 bg-coffee text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.2fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <p className="font-signature text-5xl text-gold-soft">Andra</p>
          <p className="mt-1 font-serif text-xl text-ivory">{text.digitalBooks}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-cream/78">{text.tagline}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-cream/64">{text.description}</p>
        </div>

        <div className="text-sm text-cream/78">
          <p className="font-serif text-2xl text-ivory">{text.contact}</p>
          <div className="mt-4 space-y-3">
            <a href="https://wa.me/554797766165" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-gold/20 bg-cream/5 px-4 py-3 transition hover:border-gold/45 hover:bg-cream/10 focus:outline-none focus:ring-2 focus:ring-gold-soft/60">
              <span className="block text-xs uppercase tracking-[0.2em] text-gold-soft">WhatsApp</span>
              <span className="mt-1 block text-ivory">+55 47 9776-6165</span>
            </a>
            <a href="mailto:yosoyandra74@gmail.com" className="block break-words rounded-2xl border border-gold/20 bg-cream/5 px-4 py-3 transition hover:border-gold/45 hover:bg-cream/10 focus:outline-none focus:ring-2 focus:ring-gold-soft/60">
              <span className="block text-xs uppercase tracking-[0.2em] text-gold-soft">E-mail</span>
              <span className="mt-1 block text-ivory">yosoyandra74@gmail.com</span>
            </a>
          </div>
        </div>

        <nav aria-label={text.quickLinksLabel} className="text-sm text-cream/78">
          <p className="font-serif text-2xl text-ivory">{text.quickLinks}</p>
          <div className="mt-4 grid gap-2">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-1 py-1 transition hover:text-gold-soft focus:outline-none focus:ring-2 focus:ring-gold-soft/60">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs leading-6 text-cream/55">{text.hotmart}</p>
        </nav>
      </div>
      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs text-cream/55">{text.rights}</div>
    </footer>
  );
}
