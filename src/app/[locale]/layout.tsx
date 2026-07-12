import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentLocale } from "@/components/DocumentLocale";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getMessages } from "@/i18n/messages";
import { isLocale, locales } from "@/i18n/config";
import { localizedAlternates, openGraphLocale } from "@/i18n/metadata";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const text = getMessages(value).metadata;

  return {
    title: text.homeTitle,
    description: text.description,
    alternates: localizedAlternates(value),
    openGraph: {
      title: text.homeTitle,
      description: text.description,
      locale: openGraphLocale(value),
      type: "website"
    }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();

  return (
    <>
      <DocumentLocale locale={value} />
      <Header locale={value} />
      {children}
      <Footer locale={value} />
    </>
  );
}
