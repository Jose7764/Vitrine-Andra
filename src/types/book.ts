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
  language: string;
  format: string;
  pages?: number;
  createdAt: string;
  featured?: boolean;
  active?: boolean;
};
