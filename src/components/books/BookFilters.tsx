import { BookLanguageFilter } from "@/components/books/BookLanguageFilter";
import { BookPriceFilter } from "@/components/books/BookPriceFilter";
import { BookSearchInput } from "@/components/books/BookSearchInput";
import type { Messages } from "@/i18n/messages";

type BookFiltersProps = {
  query: string;
  language: string;
  minPrice: string;
  maxPrice: string;
  messages: Messages;
  onQueryChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onClear: () => void;
  validationMessage?: string;
};

export function BookFilters(props: BookFiltersProps) {
  const text = props.messages.filters;

  return (
    <section className="rounded-2xl border border-gold/25 bg-cream/72 p-5 shadow-soft md:p-6" aria-label={text.searchLabel}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_0.75fr_0.75fr_auto] xl:items-end">
        <BookSearchInput value={props.query} onChange={props.onQueryChange} label={text.searchLabel} placeholder={text.searchPlaceholder} />
        <BookLanguageFilter value={props.language} onChange={props.onLanguageChange} label={text.languageLabel} options={props.messages.languages} />
        <BookPriceFilter minPrice={props.minPrice} maxPrice={props.maxPrice} onMinChange={props.onMinPriceChange} onMaxChange={props.onMaxPriceChange} minLabel={text.minPriceLabel} maxLabel={text.maxPriceLabel} placeholder={text.pricePlaceholder} />
        <button type="button" onClick={props.onClear} className="min-h-12 rounded-full border border-gold/45 bg-ivory/75 px-5 text-sm font-semibold text-coffee transition hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold/50">
          {text.clear}
        </button>
      </div>
      {props.validationMessage ? (
        <p role="alert" className="mt-4 rounded-xl border border-gold/30 bg-ivory/80 px-4 py-3 text-sm font-medium text-coffee">
          {props.validationMessage}
        </p>
      ) : null}
    </section>
  );
}
