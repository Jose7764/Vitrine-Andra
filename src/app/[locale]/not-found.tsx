"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { defaultLocale, isLocale, localePath } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export default function LocalizedNotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const text = getMessages(locale).notFound;

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-5 py-16 text-center">
      <section className="max-w-xl rounded-[2rem] border border-gold/25 bg-ivory/70 p-10 shadow-soft">
        <p className="font-signature text-6xl text-gold">Andra</p>
        <h1 className="mt-4 font-serif text-4xl text-coffee">{text.title}</h1>
        <p className="mt-4 leading-7 text-walnut">{text.body}</p>
        <Button href={localePath(locale, "/livros")} className="mt-7">{text.action}</Button>
      </section>
    </main>
  );
}
