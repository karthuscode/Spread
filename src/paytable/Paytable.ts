import { SymbolId, type SymbolId as SymbolIdType } from "../symbols/SymbolId.ts";

export type PayingSymbolId = Exclude<
  SymbolIdType,
  typeof SymbolId.VirusWild | typeof SymbolId.InfectedWild
>;

export type MatchCount = 3 | 4 | 5;

export type PayoutEntry = Readonly<Record<MatchCount, number>>;

export type PaytableConfig = Readonly<Record<PayingSymbolId, PayoutEntry>>;

export const PAYING_SYMBOL_IDS: readonly PayingSymbolId[] = Object.freeze([
  SymbolId.MaskedSurgeon,
  SymbolId.Nurse,
  SymbolId.Human2,
  SymbolId.Human3,
  SymbolId.Equipment1,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
]);

export const SUPPORTED_MATCH_COUNTS: readonly MatchCount[] = Object.freeze([
  3,
  4,
  5,
]);
const MATCH_COUNT_KEYS: readonly string[] = Object.freeze(
  SUPPORTED_MATCH_COUNTS.map(String),
);

export class Paytable {
  private readonly payouts: PaytableConfig;

  constructor(config: PaytableConfig) {
    const suppliedSymbols = Object.keys(config);

    for (const symbol of PAYING_SYMBOL_IDS) {
      if (!Object.hasOwn(config, symbol)) {
        throw new RangeError(`Missing payout configuration for ${symbol}.`);
      }
    }

    for (const symbol of suppliedSymbols) {
      if (!(PAYING_SYMBOL_IDS as readonly string[]).includes(symbol)) {
        throw new RangeError(`Unsupported paytable symbol: ${symbol}.`);
      }
    }

    const payouts = {} as Record<PayingSymbolId, PayoutEntry>;

    for (const symbol of PAYING_SYMBOL_IDS) {
      const entry = config[symbol] as PayoutEntry;
      const suppliedMatchCounts = Object.keys(entry);

      for (const matchCount of SUPPORTED_MATCH_COUNTS) {
        if (!Object.hasOwn(entry, matchCount)) {
          throw new RangeError(
            `Missing ${matchCount}-match multiplier for ${symbol}.`,
          );
        }
      }

      for (const matchCount of suppliedMatchCounts) {
        if (!MATCH_COUNT_KEYS.includes(matchCount)) {
          throw new RangeError(
            `Unsupported match count ${matchCount} for ${symbol}.`,
          );
        }
      }

      const copiedEntry = {} as Record<MatchCount, number>;

      for (const matchCount of SUPPORTED_MATCH_COUNTS) {
        const multiplier: unknown = entry[matchCount];

        if (
          typeof multiplier !== "number" ||
          !Number.isFinite(multiplier) ||
          !Number.isInteger(multiplier) ||
          multiplier <= 0
        ) {
          throw new RangeError(
            `Multiplier for ${symbol} at ${matchCount} matches must be a positive finite integer; received ${String(multiplier)}.`,
          );
        }

        copiedEntry[matchCount] = multiplier;
      }

      payouts[symbol] = Object.freeze(copiedEntry);
    }

    this.payouts = Object.freeze(payouts);
  }

  getMultiplier(symbol: PayingSymbolId, matchCount: MatchCount): number {
    return this.payouts[symbol][matchCount];
  }
}
