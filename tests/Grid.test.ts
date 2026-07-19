import assert from "node:assert/strict";
import test from "node:test";

import { Grid } from "../src/grid/Grid.ts";
import { SymbolId } from "../src/symbols/SymbolId.ts";
import type { SymbolId as SymbolIdValue } from "../src/symbols/SymbolId.ts";

const symbols: readonly SymbolIdValue[] = [
  SymbolId.MaskedSurgeon,
  SymbolId.Nurse,
  SymbolId.Human2,
  SymbolId.Human3,
  SymbolId.Equipment1,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
  SymbolId.VirusWild,
  SymbolId.InfectedWild,
  SymbolId.MaskedSurgeon,
  SymbolId.Nurse,
  SymbolId.Human2,
  SymbolId.Human3,
  SymbolId.Equipment1,
  SymbolId.Equipment2,
];

test("constructs a five-column by three-row grid", () => {
  const grid = new Grid(symbols);

  assert.equal(Grid.COLUMNS, 5);
  assert.equal(Grid.ROWS, 3);
  assert.deepEqual(grid.snapshot(), [
    symbols.slice(0, 5),
    symbols.slice(5, 10),
    symbols.slice(10, 15),
  ]);
});

test("requires exactly fifteen symbols", () => {
  assert.throws(
    () => new Grid(symbols.slice(0, 14)),
    /requires exactly 15 symbols; received 14/,
  );
  assert.throws(
    () => new Grid([...symbols, SymbolId.Nurse]),
    /requires exactly 15 symbols; received 16/,
  );
});

test("reads symbols using column then row coordinates", () => {
  const grid = new Grid(symbols);

  assert.equal(grid.getSymbol(0, 0), SymbolId.MaskedSurgeon);
  assert.equal(grid.getSymbol(4, 0), SymbolId.Equipment1);
  assert.equal(grid.getSymbol(0, 1), SymbolId.Equipment2);
  assert.equal(grid.getSymbol(4, 2), SymbolId.Equipment2);
});

test("replaces one symbol at a coordinate", () => {
  const grid = new Grid(symbols);

  grid.replaceSymbol(2, 1, SymbolId.Nurse);

  assert.equal(grid.getSymbol(2, 1), SymbolId.Nurse);
  assert.equal(grid.getSymbol(1, 1), SymbolId.Equipment3);
});

test("rejects invalid column and row coordinates", () => {
  const grid = new Grid(symbols);

  assert.throws(() => grid.getSymbol(-1, 0), /column.*0 to 4.*-1/);
  assert.throws(() => grid.getSymbol(5, 0), /column.*0 to 4.*5/);
  assert.throws(() => grid.getSymbol(1.5, 0), /column.*integer/);
  assert.throws(
    () => grid.replaceSymbol(0, -1, SymbolId.Nurse),
    /row.*0 to 2.*-1/,
  );
  assert.throws(
    () => grid.replaceSymbol(0, 3, SymbolId.Nurse),
    /row.*0 to 2.*3/,
  );
  assert.throws(
    () => grid.replaceSymbol(0, Number.NaN, SymbolId.Nurse),
    /row.*integer/,
  );
});

test("returns an immutable snapshot detached from grid state", () => {
  const constructorInput = [...symbols];
  const grid = new Grid(constructorInput);
  const snapshot = grid.snapshot();

  constructorInput[0] = SymbolId.InfectedWild;
  grid.replaceSymbol(1, 1, SymbolId.InfectedWild);

  assert.equal(snapshot[0][0], SymbolId.MaskedSurgeon);
  assert.equal(snapshot[1][1], SymbolId.Equipment3);
  assert.equal(grid.getSymbol(0, 0), SymbolId.MaskedSurgeon);
  assert.equal(Object.isFrozen(snapshot), true);
  assert.equal(snapshot.every(Object.isFrozen), true);
  assert.throws(
    () =>
      (snapshot as unknown as SymbolIdValue[][])[0]!.splice(
        0,
        1,
        SymbolId.Nurse,
      ),
    TypeError,
  );
});
