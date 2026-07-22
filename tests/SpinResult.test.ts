import assert from "node:assert/strict";
import test from "node:test";

import { Grid, type GridSnapshot } from "../src/grid/Grid.ts";
import { SpinResult } from "../src/spin/index.ts";
import { SymbolId, type SymbolId as SymbolIdValue } from "../src/symbols/SymbolId.ts";
import type { WinResult } from "../src/win/types.ts";

const initialSymbols: readonly SymbolIdValue[] = [
  SymbolId.MaskedSurgeon,
  SymbolId.Nurse,
  SymbolId.Human2,
  SymbolId.Human3,
  SymbolId.Equipment1,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
  SymbolId.VirusWild,
  SymbolId.Nurse,
  SymbolId.Equipment1,
  SymbolId.Human2,
  SymbolId.Human3,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
  SymbolId.MaskedSurgeon,
];

const finalSymbols: readonly SymbolIdValue[] = initialSymbols.map(
  (symbol, index) =>
    index === 8 && symbol === SymbolId.Nurse
      ? SymbolId.InfectedWild
      : symbol,
);

const winResult: WinResult = Object.freeze({
  lineWins: Object.freeze([
    Object.freeze({
      paylineId: 1,
      symbolId: SymbolId.Equipment1,
      matchCount: 3,
      multiplier: 2,
    }),
  ]),
  totalMultiplier: 2,
});

const createInputs = () => ({
  initialGrid: new Grid(initialSymbols).snapshot(),
  finalGrid: new Grid(finalSymbols).snapshot(),
  winResult,
});

test("constructs a completed spin from supplied snapshots and win result", () => {
  const inputs = createInputs();
  const result = new SpinResult(
    inputs.initialGrid,
    inputs.finalGrid,
    inputs.winResult,
  );

  assert.equal(result.initialGrid, inputs.initialGrid);
  assert.equal(result.finalGrid, inputs.finalGrid);
  assert.equal(result.winResult, inputs.winResult);
});

test("freezes the SpinResult while preserving immutable snapshots", () => {
  const inputs = createInputs();
  const result = new SpinResult(
    inputs.initialGrid,
    inputs.finalGrid,
    inputs.winResult,
  );

  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.initialGrid), true);
  assert.equal(result.initialGrid.every(Object.isFrozen), true);
  assert.equal(Object.isFrozen(result.finalGrid), true);
  assert.equal(result.finalGrid.every(Object.isFrozen), true);
  assert.throws(() => {
    (result as { initialGrid: GridSnapshot }).initialGrid = inputs.finalGrid;
  }, TypeError);
});

test("accepts different snapshot contents", () => {
  const inputs = createInputs();
  const result = new SpinResult(
    inputs.initialGrid,
    inputs.finalGrid,
    inputs.winResult,
  );

  assert.notDeepEqual(result.initialGrid, result.finalGrid);
});

test("accepts identical snapshot contents", () => {
  const first = new Grid(initialSymbols).snapshot();
  const second = new Grid(initialSymbols).snapshot();

  const result = new SpinResult(first, second, winResult);

  assert.deepEqual(result.initialGrid, result.finalGrid);
});

test("source Grid mutation cannot change stored snapshots", () => {
  const initialSource = new Grid(initialSymbols);
  const finalSource = new Grid(finalSymbols);
  const initialGrid = initialSource.snapshot();
  const finalGrid = finalSource.snapshot();
  const result = new SpinResult(initialGrid, finalGrid, winResult);

  initialSource.replaceSymbol(0, 0, SymbolId.InfectedWild);
  finalSource.replaceSymbol(0, 0, SymbolId.Nurse);

  assert.equal(result.initialGrid[0][0], SymbolId.MaskedSurgeon);
  assert.equal(result.finalGrid[0][0], SymbolId.MaskedSurgeon);
});

test("does not mutate constructor inputs", () => {
  const inputs = createInputs();
  const initialBefore = structuredClone(inputs.initialGrid);
  const finalBefore = structuredClone(inputs.finalGrid);

  new SpinResult(inputs.initialGrid, inputs.finalGrid, inputs.winResult);

  assert.deepEqual(inputs.initialGrid, initialBefore);
  assert.deepEqual(inputs.finalGrid, finalBefore);
  assert.equal(inputs.winResult, winResult);
});

test("is deterministic for the same constructor inputs", () => {
  const inputs = createInputs();

  const first = new SpinResult(
    inputs.initialGrid,
    inputs.finalGrid,
    inputs.winResult,
  );
  const second = new SpinResult(
    inputs.initialGrid,
    inputs.finalGrid,
    inputs.winResult,
  );

  assert.deepEqual(first, second);
});

test("rejects missing, malformed, or mutable snapshots", () => {
  const inputs = createInputs();

  assert.throws(
    () =>
      new SpinResult(
        undefined as unknown as GridSnapshot,
        inputs.finalGrid,
        inputs.winResult,
      ),
    /initialGrid must be a 5x3 GridSnapshot/,
  );
  assert.throws(
    () =>
      new SpinResult(
        inputs.initialGrid,
        [] as unknown as GridSnapshot,
        inputs.winResult,
      ),
    /finalGrid must be a 5x3 GridSnapshot/,
  );
  assert.throws(
    () =>
      new SpinResult(
        structuredClone(inputs.initialGrid) as GridSnapshot,
        inputs.finalGrid,
        inputs.winResult,
      ),
    /initialGrid must be an immutable GridSnapshot/,
  );
});

test("rejects missing or malformed WinResult values", () => {
  const inputs = createInputs();

  for (const invalidWinResult of [
    undefined,
    {},
    { lineWins: [], totalMultiplier: Number.NaN },
    { lineWins: [], totalMultiplier: Number.POSITIVE_INFINITY },
  ]) {
    assert.throws(
      () =>
        new SpinResult(
          inputs.initialGrid,
          inputs.finalGrid,
          invalidWinResult as WinResult,
        ),
      /winResult must be a valid WinResult/,
    );
  }
});
