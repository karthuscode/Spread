import { SymbolId } from "../symbols/SymbolId.ts";

export type GeneratedSymbolId = Exclude<SymbolId, "InfectedWild">;

/**
 * Experimental prototype values. These weights are provisional and must be
 * validated through simulation before they are treated as final game values.
 */
export const PROVISIONAL_SYMBOL_WEIGHTS: Readonly<
  Record<GeneratedSymbolId, number>
> = Object.freeze({
  [SymbolId.MaskedSurgeon]: 4,
  [SymbolId.Nurse]: 7,
  [SymbolId.Human2]: 10,
  [SymbolId.Human3]: 10,
  [SymbolId.Equipment1]: 14,
  [SymbolId.Equipment2]: 14,
  [SymbolId.Equipment3]: 14,
  [SymbolId.VirusWild]: 3,
});
