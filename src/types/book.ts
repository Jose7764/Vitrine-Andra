export type Locale = "pt" | "es" | "en";

export type LocalizedBookContent = {
  title?: string;
  category?: string;
  shortDescription?: string;
  summary?: string;
};

export type BookTranslations = Partial<Record<Locale, LocalizedBookContent>>;

export type Book = {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  summary: string;
  price: string;
  coverImage: string;
  hotmartUrl: string;
  language: Locale;
  format: string;
  pages?: number;
  createdAt: string;
  featured?: boolean;
  active?: boolean;
  translations?: BookTranslations;
};
