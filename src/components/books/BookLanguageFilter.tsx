import type { Locale } from "@/types/book";

type BookLanguageFilterProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: Record<Locale | "all", string>;
};

export function BookLanguageFilter({ value, onChange, label, options }: BookLanguageFilterProps) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-clay">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-xl border border-gold/30 bg-ivory/80 px-4 text-base text-coffee outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
      >
        <option value="">{options.all}</option>
        <option value="pt">{options.pt}</option>
        <option value="es">{options.es}</option>
        <option value="en">{options.en}</option>
      </select>
    </label>
  );
}
