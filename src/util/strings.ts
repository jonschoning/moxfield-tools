/** normalize & remove diacritics */
export function normalize(str: string) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function toFixedFloat(n: number, d: number = 2) {
  return parseFloat(n.toFixed(d));
}
