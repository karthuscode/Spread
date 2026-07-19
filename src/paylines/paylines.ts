export type Payline = readonly [number, number, number, number, number];

export const PAYLINES: readonly Payline[] = Object.freeze([
  Object.freeze([1, 1, 1, 1, 1] as const),
  Object.freeze([0, 0, 0, 0, 0] as const),
  Object.freeze([2, 2, 2, 2, 2] as const),
  Object.freeze([0, 1, 2, 1, 0] as const),
  Object.freeze([2, 1, 0, 1, 2] as const),
]);
