export type Payline = readonly [number, number, number, number, number];

export const PAYLINES: readonly Payline[] = Object.freeze([
  Object.freeze([1, 1, 1, 1, 1]),
  Object.freeze([0, 0, 0, 0, 0]),
  Object.freeze([2, 2, 2, 2, 2]),
  Object.freeze([0, 1, 2, 1, 0]),
  Object.freeze([2, 1, 0, 1, 2]),
]);
