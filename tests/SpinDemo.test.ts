import assert from "node:assert/strict";
import test from "node:test";

import { formatInfectionSummary, formatSpinResult } from "../src/demo/formatSpinResult.ts";
import { Grid } from "../src/grid/Grid.ts";
import { SpinResult } from "../src/spin/SpinResult.ts";
import { SymbolId, type SymbolId as SymbolIdValue } from "../src/symbols/SymbolId.ts";
import type { WinResult } from "../src/win/types.ts";

const initialSymbols: readonly SymbolIdValue[] = [
  SymbolId.Equipment1,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
  SymbolId.Equipment1,
  SymbolId.Equipment2,
  SymbolId.Nurse,
  SymbolId.Human2,
  SymbolId.VirusWild,
  SymbolId.Nurse,
  SymbolId.Nurse,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
  SymbolId.Equipment1,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
];

const finalSymbols: readonly SymbolIdValue[] = initialSymbols.map(
  (symbol, index) =>
    index === 6 || index === 8 ? SymbolId.InfectedWild : symbol,
);

const winResult: WinResult = Object.freeze({
  lineWins: Object.freeze([
    Object.freeze({
      paylineId: 1,
      symbolId: SymbolId.Nurse,
      matchCount: 5,
      multiplier: 60,
    }),
  ]),
  totalMultiplier: 60,
});

test("formats every required terminal section deterministically", () => {
  const result = new SpinResult(
    new Grid(initialSymbols).snapshot(),
    new Grid(finalSymbols).snapshot(),
    winResult,
  );

  assert.equal(
    formatSpinResult(result),
    [
      "SPREAD — BASE GAME SPIN",
      "",
      "INITIAL GRID",
      "| E1 | E2 | E3 | E1 | E2 |",
      "| NU | H2 | VW | NU | NU |",
      "| E2 | E3 | E1 | E2 | E3 |",
      "",
      "INFECTION SUMMARY",
      "2 symbol(s) infected at: (1, 1), (3, 1).",
      "",
      "FINAL GRID",
      "| E1 | E2 | E3 | E1 | E2 |",
      "| NU | IW | VW | IW | NU |",
      "| E2 | E3 | E1 | E2 | E3 |",
      "",
      "WINNING PAYLINES",
      "Payline 1: Nurse x5 = 60x",
      "",
      "TOTAL MULTIPLIER",
      "60x",
    ].join("\n"),
  );
});

test("formats no-infection and no-win summaries", () => {
  const snapshot = new Grid(initialSymbols).snapshot();
  const noWins: WinResult = Object.freeze({
    lineWins: Object.freeze([]),
    totalMultiplier: 0,
  });
  const output = formatSpinResult(new SpinResult(snapshot, snapshot, noWins));

  assert.equal(formatInfectionSummary(snapshot, snapshot), "No symbols were infected.");
  assert.match(output, /WINNING PAYLINES\nNo winning paylines\./);
  assert.match(output, /TOTAL MULTIPLIER\n0x$/);
});
