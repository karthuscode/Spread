import { Grid, type GridSnapshot } from "../grid/Grid.ts";
import type { SpinResult } from "../spin/SpinResult.ts";
import { SymbolId, type SymbolId as SymbolIdValue } from "../symbols/SymbolId.ts";

const DISPLAY_LABELS: Readonly<Record<SymbolIdValue, string>> = Object.freeze({
  [SymbolId.MaskedSurgeon]: "MS",
  [SymbolId.Nurse]: "NU",
  [SymbolId.Human2]: "H2",
  [SymbolId.Human3]: "H3",
  [SymbolId.Equipment1]: "E1",
  [SymbolId.Equipment2]: "E2",
  [SymbolId.Equipment3]: "E3",
  [SymbolId.VirusWild]: "VW",
  [SymbolId.InfectedWild]: "IW",
});

export const formatGrid = (snapshot: GridSnapshot): string =>
  snapshot
    .map(
      (row) =>
        `| ${row.map((symbol) => DISPLAY_LABELS[symbol]).join(" | ")} |`,
    )
    .join("\n");

export const formatInfectionSummary = (
  initialGrid: GridSnapshot,
  finalGrid: GridSnapshot,
): string => {
  const infectedPositions: string[] = [];

  for (let row = 0; row < Grid.ROWS; row += 1) {
    for (let column = 0; column < Grid.COLUMNS; column += 1) {
      if (
        initialGrid[row][column] !== SymbolId.InfectedWild &&
        finalGrid[row][column] === SymbolId.InfectedWild
      ) {
        infectedPositions.push(`(${column}, ${row})`);
      }
    }
  }

  if (infectedPositions.length === 0) {
    return "No symbols were infected.";
  }

  return `${infectedPositions.length} symbol(s) infected at: ${infectedPositions.join(", ")}.`;
};

export const formatSpinResult = (result: SpinResult): string => {
  const winningPaylines =
    result.winResult.lineWins.length === 0
      ? "No winning paylines."
      : result.winResult.lineWins
          .map(
            (lineWin) =>
              `Payline ${lineWin.paylineId}: ${lineWin.symbolId} x${lineWin.matchCount} = ${lineWin.multiplier}x`,
          )
          .join("\n");

  return [
    "SPREAD — BASE GAME SPIN",
    "",
    "INITIAL GRID",
    formatGrid(result.initialGrid),
    "",
    "INFECTION SUMMARY",
    formatInfectionSummary(result.initialGrid, result.finalGrid),
    "",
    "FINAL GRID",
    formatGrid(result.finalGrid),
    "",
    "WINNING PAYLINES",
    winningPaylines,
    "",
    "TOTAL MULTIPLIER",
    `${result.winResult.totalMultiplier}x`,
  ].join("\n");
};
