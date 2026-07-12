export function formatPrice(price: string) {
  const trimmedPrice = price.trim();

  if (!trimmedPrice) {
    return "";
  }

  const withoutCurrency = trimmedPrice
    .replace(/^R\$\s*/i, "")
    .replace(/\s/g, "");

  const normalizedNumber = normalizePriceNumber(withoutCurrency);

  if (normalizedNumber === null) {
    return trimmedPrice.startsWith("R$") ? trimmedPrice : `R$ ${trimmedPrice}`;
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(normalizedNumber);
}

function normalizePriceNumber(value: string) {
  if (!value) {
    return null;
  }

  const onlyNumberSeparators = value.replace(/[^\d,.]/g, "");

  if (!onlyNumberSeparators) {
    return null;
  }

  const hasComma = onlyNumberSeparators.includes(",");
  const hasDot = onlyNumberSeparators.includes(".");
  let normalized = onlyNumberSeparators;

  if (hasComma && hasDot) {
    const lastComma = onlyNumberSeparators.lastIndexOf(",");
    const lastDot = onlyNumberSeparators.lastIndexOf(".");
    const decimalSeparator = lastComma > lastDot ? "," : ".";

    normalized = onlyNumberSeparators
      .replace(decimalSeparator === "," ? /\./g : /,/g, "")
      .replace(decimalSeparator, ".");
  } else if (hasComma) {
    normalized = onlyNumberSeparators.replace(/\./g, "").replace(",", ".");
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}
