import assert from "node:assert/strict";
import test from "node:test";

import { Grid } from "../src/grid/Grid.ts";
import {
  PaylineEvaluator,
  type PaylineEvaluationResult,
} from "../src/paylines/PaylineEvaluator.ts";
import { PAYLINES } from "../src/paylines/paylines.ts";
import { SymbolId, type SymbolId as SymbolIdValue } from "../src/symbols/SymbolId.ts";

const baselineSymbols: readonly SymbolIdValue[] = [
  SymbolId.MaskedSurgeon,
  SymbolId.Nurse,
  SymbolId.Human2,
  SymbolId.Human3,
  SymbolId.Equipment1,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
  SymbolId.MaskedSurgeon,
  SymbolId.Nurse,
  SymbolId.Human2,
  SymbolId.Human3,
  SymbolId.Equipment1,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
  SymbolId.MaskedSurgeon,
];

const gridWithLines = (
  lines: ReadonlyArray<
    readonly [paylineIndex: number, symbols: readonly SymbolIdValue[]]
  >,
): Grid => {
  const symbols = [...baselineSymbols];

  for (const [paylineIndex, lineSymbols] of lines) {
    const payline = PAYLINES[paylineIndex]!;

    lineSymbols.forEach((symbol, column) => {
      symbols[payline[column]! * Grid.COLUMNS + column] = symbol;
    });
  }

  return new Grid(symbols);
};

const gridWithMiddleLine = (...symbols: readonly SymbolIdValue[]): Grid =>
  gridWithLines([[0, symbols]]);

const evaluate = (grid: Grid): readonly PaylineEvaluationResult[] =>
  new PaylineEvaluator().evaluate(grid);

const resultFor = (
  grid: Grid,
  paylineId = 1,
): PaylineEvaluationResult | undefined =>
  evaluate(grid).find((result) => result.paylineId === paylineId);

test("reports three identical paying symbols from the first reel", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Nurse,
      SymbolId.Nurse,
      SymbolId.Nurse,
      SymbolId.Equipment1,
      SymbolId.Human2,
    ),
  );

  assert.deepEqual(result, {
    paylineId: 1,
    symbolId: SymbolId.Nurse,
    matchCount: 3,
  });
});

test("reports four identical paying symbols from the first reel", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Human2,
      SymbolId.Human2,
      SymbolId.Human2,
      SymbolId.Human2,
      SymbolId.Equipment1,
    ),
  );

  assert.equal(result?.matchCount, 4);
  assert.equal(result?.symbolId, SymbolId.Human2);
});

test("reports five identical paying symbols from the first reel", () => {
  const result = resultFor(
    gridWithMiddleLine(...Array(5).fill(SymbolId.Human3)),
  );

  assert.equal(result?.matchCount, 5);
  assert.equal(result?.symbolId, SymbolId.Human3);
});

test("returns no win for fewer than three matches", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Nurse,
      SymbolId.Nurse,
      SymbolId.Human2,
      SymbolId.Nurse,
      SymbolId.Nurse,
    ),
  );

  assert.equal(result, undefined);
});

test("returns no win when matching symbols begin after the first reel", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Equipment1,
      SymbolId.Nurse,
      SymbolId.Nurse,
      SymbolId.Nurse,
      SymbolId.Nurse,
    ),
  );

  assert.equal(result, undefined);
});

test("stops counting at the first mismatch", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Human3,
      SymbolId.Human3,
      SymbolId.Human3,
      SymbolId.Equipment2,
      SymbolId.Human3,
    ),
  );

  assert.equal(result?.matchCount, 3);
});

test("VirusWild substitutes in the middle of a match", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Nurse,
      SymbolId.VirusWild,
      SymbolId.Nurse,
      SymbolId.Equipment1,
      SymbolId.Nurse,
    ),
  );

  assert.equal(result?.symbolId, SymbolId.Nurse);
  assert.equal(result?.matchCount, 3);
});

test("InfectedWild substitutes in the middle of a match", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Human2,
      SymbolId.InfectedWild,
      SymbolId.Human2,
      SymbolId.Equipment1,
      SymbolId.Human2,
    ),
  );

  assert.equal(result?.symbolId, SymbolId.Human2);
  assert.equal(result?.matchCount, 3);
});

test("both Wild types substitute in one winning line", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Equipment1,
      SymbolId.VirusWild,
      SymbolId.InfectedWild,
      SymbolId.Equipment1,
      SymbolId.Equipment2,
    ),
  );

  assert.equal(result?.symbolId, SymbolId.Equipment1);
  assert.equal(result?.matchCount, 4);
});

test("leading Wilds resolve to the first paying symbol", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.VirusWild,
      SymbolId.InfectedWild,
      SymbolId.MaskedSurgeon,
      SymbolId.MaskedSurgeon,
      SymbolId.Equipment1,
    ),
  );

  assert.equal(result?.symbolId, SymbolId.MaskedSurgeon);
  assert.equal(result?.matchCount, 4);
});

test("returns no win for an all-Wild line", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.VirusWild,
      SymbolId.InfectedWild,
      SymbolId.VirusWild,
      SymbolId.InfectedWild,
      SymbolId.VirusWild,
    ),
  );

  assert.equal(result, undefined);
});

test("MaskedSurgeon forms a win with Wild substitutions", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.MaskedSurgeon,
      SymbolId.VirusWild,
      SymbolId.InfectedWild,
      SymbolId.MaskedSurgeon,
      SymbolId.Nurse,
    ),
  );

  assert.equal(result?.symbolId, SymbolId.MaskedSurgeon);
  assert.equal(result?.matchCount, 4);
});

test("distinct human symbols do not match each other", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Nurse,
      SymbolId.VirusWild,
      SymbolId.Human2,
      SymbolId.Human3,
      SymbolId.Nurse,
    ),
  );

  assert.equal(result, undefined);
});

test("distinct equipment symbols do not match each other", () => {
  const result = resultFor(
    gridWithMiddleLine(
      SymbolId.Equipment1,
      SymbolId.InfectedWild,
      SymbolId.Equipment2,
      SymbolId.Equipment3,
      SymbolId.Equipment1,
    ),
  );

  assert.equal(result, undefined);
});

test("returns multiple wins in configured payline order", () => {
  const grid = gridWithLines([
    [0, [SymbolId.Nurse, SymbolId.Nurse, SymbolId.Nurse, SymbolId.Equipment1, SymbolId.Human2]],
    [1, [SymbolId.Human2, SymbolId.Human2, SymbolId.Human2, SymbolId.Human2, SymbolId.Equipment2]],
    [2, [SymbolId.Equipment3, SymbolId.Equipment3, SymbolId.Equipment3, SymbolId.Equipment1, SymbolId.Equipment2]],
  ]);

  const results = evaluate(grid);

  assert.deepEqual(
    results.map((result) => result.paylineId),
    [1, 2, 3],
  );
  assert.equal(results.length, 3);
});

test("evaluation leaves the supplied Grid unchanged", () => {
  const grid = gridWithMiddleLine(
    SymbolId.Nurse,
    SymbolId.VirusWild,
    SymbolId.InfectedWild,
    SymbolId.Nurse,
    SymbolId.Equipment1,
  );
  const before = grid.snapshot();

  const results = evaluate(grid);

  assert.deepEqual(grid.snapshot(), before);
  assert.equal(Object.isFrozen(results), true);
  assert.equal(results.every(Object.isFrozen), true);
});
