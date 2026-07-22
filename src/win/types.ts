import type { MatchCount, PayingSymbolId } from "../paytable/Paytable.ts";

export interface LineWin {
  readonly paylineId: number;
  readonly symbolId: PayingSymbolId;
  readonly matchCount: MatchCount;
  readonly multiplier: number;
}

export interface WinResult {
  readonly lineWins: readonly LineWin[];
  readonly totalMultiplier: number;
}
