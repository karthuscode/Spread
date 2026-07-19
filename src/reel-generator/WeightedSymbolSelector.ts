import type { GeneratedSymbolId } from "../config/provisionalSymbolWeights.ts";
import { SymbolId } from "../symbols/SymbolId.ts";

export type RandomSource = () => number;

export type GeneratedSymbolWeights = Readonly<
  Partial<Record<GeneratedSymbolId, number>>
>;

type WeightedRange = Readonly<{
  symbol: GeneratedSymbolId;
  upperBound: number;
}>;

export class WeightedSymbolSelector {
  private readonly ranges: readonly WeightedRange[];
  private readonly totalWeight: number;
  private readonly random: RandomSource;

  constructor(weights: GeneratedSymbolWeights, random: RandomSource) {
    const entries = Object.entries(weights);

    if (entries.length === 0) {
      throw new RangeError("Symbol weight map must not be empty.");
    }

    let cumulativeWeight = 0;
    this.ranges = entries.map(([symbol, weight]) => {
      if (symbol === SymbolId.InfectedWild) {
        throw new RangeError("InfectedWild cannot be selected by generation.");
      }

      if (!Number.isFinite(weight) || !Number.isInteger(weight) || weight <= 0) {
        throw new RangeError(
          `Weight for ${symbol} must be a positive finite integer; received ${weight}.`,
        );
      }

      cumulativeWeight += weight;

      return Object.freeze({
        symbol: symbol as GeneratedSymbolId,
        upperBound: cumulativeWeight,
      });
    });
    this.totalWeight = cumulativeWeight;
    this.random = random;
  }

  select(): GeneratedSymbolId {
    const randomValue = this.random();

    if (
      !Number.isFinite(randomValue) ||
      randomValue < 0 ||
      randomValue >= 1
    ) {
      throw new RangeError(
        `Random source must return a finite number from 0 (inclusive) to 1 (exclusive); received ${randomValue}.`,
      );
    }

    const target = randomValue * this.totalWeight;
    const range = this.ranges.find(({ upperBound }) => target < upperBound);

    // A valid random value and positive finite weights always select a range.
    return range!.symbol;
  }
}
