import type { Grid } from "../grid/Grid.ts";
import type { SymbolId } from "../symbols/SymbolId.ts";
import { SYMBOL_DEFINITIONS } from "../symbols/symbolDefinitions.ts";
import { PAYLINES } from "./paylines.ts";

export type PaylineEvaluationResult = Readonly<{
  paylineId: number;
  symbolId: SymbolId;
  matchCount: number;
}>;

export class PaylineEvaluator {
  evaluate(grid: Grid): readonly PaylineEvaluationResult[] {
    const wins: PaylineEvaluationResult[] = [];

    for (const [paylineIndex, payline] of PAYLINES.entries()) {
      const symbols = payline.map((row, column) =>
        grid.getSymbol(column, row),
      );
      const resolvedSymbol = symbols.find(
        (symbol) => !SYMBOL_DEFINITIONS[symbol].isWild,
      );

      if (resolvedSymbol === undefined) {
        continue;
      }

      let matchCount = 0;

      for (const symbol of symbols) {
        if (
          symbol !== resolvedSymbol &&
          !SYMBOL_DEFINITIONS[symbol].isWild
        ) {
          break;
        }

        matchCount += 1;
      }

      if (matchCount >= 3) {
        wins.push(
          Object.freeze({
            paylineId: paylineIndex + 1,
            symbolId: resolvedSymbol,
            matchCount,
          }),
        );
      }
    }

    return Object.freeze(wins);
  }
}
