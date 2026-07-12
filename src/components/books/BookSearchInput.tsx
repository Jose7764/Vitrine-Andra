type BookSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
};

export function BookSearchInput({ value, onChange, label, placeholder }: BookSearchInputProps) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-clay">{label}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-xl border border-gold/30 bg-ivory/80 px-4 text-base text-coffee outline-none placeholder:text-clay/65 focus:border-gold focus:ring-2 focus:ring-gold/25"
      />
    </label>
  );
}
