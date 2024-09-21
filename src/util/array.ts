export function toSorted<T>(array: T[], compareFn: (a: T, b: T) => number) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return Array.prototype.toSorted !== undefined
    ? array.toSorted(compareFn)
    : array.slice().sort(compareFn);
}
