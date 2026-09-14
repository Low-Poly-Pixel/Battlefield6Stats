// Scales a decimal into a milli-unit integer once, at the boundary, so every
// comparison and percentage calculation downstream operates on exact integers
// instead of repeating float arithmetic on the raw decimal.
export const toMilli = (value: number): number => Math.round(value * 1000);

export const formatMilli = (milli: number, decimals: number): string =>
  (milli / 1000).toFixed(decimals);
