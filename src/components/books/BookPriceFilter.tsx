type BookPriceFilterProps = {
  minPrice: string;
  maxPrice: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  minLabel: string;
  maxLabel: string;
  placeholder: string;
};

export function BookPriceFilter(props: BookPriceFilterProps) {
  const inputClass = "min-h-12 w-full rounded-xl border border-gold/30 bg-ivory/80 px-4 text-base text-coffee outline-none placeholder:text-clay/65 focus:border-gold focus:ring-2 focus:ring-gold/25";

  return (
    <>
      <label className="block min-w-0">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-clay">{props.minLabel}</span>
        <input type="text" inputMode="decimal" value={props.minPrice} onChange={(event) => props.onMinChange(event.target.value)} placeholder={props.placeholder} className={inputClass} />
      </label>
      <label className="block min-w-0">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-clay">{props.maxLabel}</span>
        <input type="text" inputMode="decimal" value={props.maxPrice} onChange={(event) => props.onMaxChange(event.target.value)} placeholder={props.placeholder} className={inputClass} />
      </label>
    </>
  );
}
