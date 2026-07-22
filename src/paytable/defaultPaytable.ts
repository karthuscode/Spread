import {
  Paytable,
  type PaytableConfig,
} from "./Paytable.ts";
import { SymbolId } from "../symbols/SymbolId.ts";

/**
 * Provisional multipliers. These values are not mathematically balanced and
 * must be tuned through simulation before they are treated as final.
 */
export const PROVISIONAL_PAYTABLE_CONFIG: PaytableConfig = Object.freeze({
  [SymbolId.MaskedSurgeon]: Object.freeze({ 3: 8, 4: 25, 5: 100 }),
  [SymbolId.Nurse]: Object.freeze({ 3: 6, 4: 18, 5: 60 }),
  [SymbolId.Human2]: Object.freeze({ 3: 4, 4: 12, 5: 40 }),
  [SymbolId.Human3]: Object.freeze({ 3: 4, 4: 12, 5: 40 }),
  [SymbolId.Equipment1]: Object.freeze({ 3: 2, 4: 6, 5: 20 }),
  [SymbolId.Equipment2]: Object.freeze({ 3: 2, 4: 6, 5: 20 }),
  [SymbolId.Equipment3]: Object.freeze({ 3: 2, 4: 6, 5: 20 }),
});

export const defaultPaytable = new Paytable(PROVISIONAL_PAYTABLE_CONFIG);
