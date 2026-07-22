import type { PaylineEvaluationResult } from "../paylines/PaylineEvaluator.ts";
import {
  type MatchCount,
  PAYING_SYMBOL_IDS,
  Paytable,
  type PayingSymbolId,
  SUPPORTED_MATCH_COUNTS,
} from "../paytable/Paytable.ts";
import type { LineWin, WinResult } from "./types.ts";

export class WinCalculator {
  private readonly paytable: Paytable;

  constructor(paytable: Paytable) {
    this.paytable = paytable;
  }

  calculate(winningLines: readonly PaylineEvaluationResult[]): WinResult {
    if (!Array.isArray(winningLines)) {
      throw new TypeError("Winning lines must be an array.");
    }

    const lineWins: LineWin[] = winningLines.map((winningLine, index) => {
      this.assertWinningLine(winningLine, index);

      const symbol = winningLine.symbolId as PayingSymbolId;
      const matchCount = winningLine.matchCount as MatchCount;
      const multiplier = this.paytable.getMultiplier(symbol, matchCount);

      return Object.freeze({
        paylineId: winningLine.paylineId,
        symbolId: symbol,
        matchCount,
        multiplier,
      });
    });

    const immutableLineWins = Object.freeze(lineWins);
    const totalMultiplier = immutableLineWins.reduce(
      (total, lineWin) => total + lineWin.multiplier,
      0,
    );

    return Object.freeze({
      lineWins: immutableLineWins,
      totalMultiplier,
    });
  }

  private assertWinningLine(
    winningLine: unknown,
    index: number,
  ): asserts winningLine is PaylineEvaluationResult {
    if (
      typeof winningLine !== "object" ||
      winningLine === null ||
      Array.isArray(winningLine)
    ) {
      throw new TypeError(`Winning line at index ${index} must be an object.`);
    }

    const candidate = winningLine as Record<string, unknown>;

    if (
      typeof candidate.paylineId !== "number" ||
      !Number.isInteger(candidate.paylineId) ||
      candidate.paylineId <= 0
    ) {
      throw new RangeError(
        `Winning line at index ${index} must have a positive integer paylineId.`,
      );
    }

    if (
      typeof candidate.symbolId !== "string" ||
      !(PAYING_SYMBOL_IDS as readonly string[]).includes(candidate.symbolId)
    ) {
      throw new RangeError(
        `Winning line at index ${index} has an unsupported paying symbol: ${String(candidate.symbolId)}.`,
      );
    }

    if (
      typeof candidate.matchCount !== "number" ||
      !(SUPPORTED_MATCH_COUNTS as readonly number[]).includes(
        candidate.matchCount,
      )
    ) {
      throw new RangeError(
        `Winning line at index ${index} has an unsupported match count: ${String(candidate.matchCount)}.`,
      );
    }
  }
}
