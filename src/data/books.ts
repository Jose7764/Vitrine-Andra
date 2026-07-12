import fs from "node:fs";
import path from "node:path";
import type { Book } from "@/types/book";
import { normalizeBookLanguage } from "@/lib/books";

type BookContent = Omit<Book, "id"> & {
  id?: string;
  pages?: number | null;
  featured?: boolean;
  active?: boolean;
  language: string;
};

const booksDirectory = path.join(process.cwd(), "content", "books");

function slugFromFilename(filename: string) {
  return filename.replace(/\.json$/, "");
}

function normalizeBook(book: BookContent, filename: string): Book {
  const slug = book.slug || slugFromFilename(filename);

  return {
    id: book.id || slug,
    slug,
    title: book.title,
    category: book.category,
    shortDescription: book.shortDescription,
    summary: book.summary,
    price: book.price,
    coverImage: book.coverImage,
    hotmartUrl: book.hotmartUrl,
    language: normalizeBookLanguage(book.language),
    format: book.format,
    pages: typeof book.pages === "number" ? book.pages : undefined,
    createdAt: book.createdAt,
    featured: book.featured ?? false,
    active: book.active ?? true,
    translations: book.translations
  };
}

function getBookFiles() {
  if (!fs.existsSync(booksDirectory)) {
    return [];
  }

  return fs
    .readdirSync(booksDirectory)
    .filter((filename) => filename.endsWith(".json"));
}

export function getAllBooks(options: { includeInactive?: boolean } = {}) {
  const includeInactive = options.includeInactive ?? false;

  return getBookFiles()
    .map((filename) => {
      const filePath = path.join(booksDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const book = JSON.parse(fileContent) as BookContent;

      return normalizeBook(book, filename);
    })
    .filter((book) => includeInactive || book.active)
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
    );
}

export function getRecentBooks(limit = 4) {
  return getAllBooks().slice(0, limit);
}

export function getBookBySlug(slug: string) {
  return getAllBooks().find((book) => book.slug === slug);
}
