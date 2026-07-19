import assert from "node:assert/strict";
import test from "node:test";

import { Grid } from "../src/grid/Grid.ts";
import { InfectionEngine } from "../src/infection/InfectionEngine.ts";
import { SymbolId, type SymbolId as SymbolIdValue } from "../src/symbols/SymbolId.ts";

type PositionedSymbol = readonly [column: number, row: number, symbol: SymbolIdValue];

const createGrid = (...positions: readonly PositionedSymbol[]): Grid => {
  const symbols = Array<SymbolIdValue>(Grid.SYMBOL_COUNT).fill(
    SymbolId.Equipment1,
  );

  for (const [column, row, symbol] of positions) {
    symbols[row * Grid.COLUMNS + column] = symbol;
  }

  return new Grid(symbols);
};

const infect = (grid: Grid): Grid => new InfectionEngine().infect(grid);

test("VirusWild infects a vulnerable human above", () => {
  const grid = createGrid(
    [2, 1, SymbolId.VirusWild],
    [2, 0, SymbolId.Nurse],
  );

  infect(grid);

  assert.equal(grid.getSymbol(2, 0), SymbolId.InfectedWild);
});

test("VirusWild infects a vulnerable human below", () => {
  const grid = createGrid(
    [2, 1, SymbolId.VirusWild],
    [2, 2, SymbolId.Human2],
  );

  infect(grid);

  assert.equal(grid.getSymbol(2, 2), SymbolId.InfectedWild);
});

test("VirusWild infects a vulnerable human to the left", () => {
  const grid = createGrid(
    [2, 1, SymbolId.VirusWild],
    [1, 1, SymbolId.Human3],
  );

  infect(grid);

  assert.equal(grid.getSymbol(1, 1), SymbolId.InfectedWild);
});

test("VirusWild infects a vulnerable human to the right", () => {
  const grid = createGrid(
    [2, 1, SymbolId.VirusWild],
    [3, 1, SymbolId.Nurse],
  );

  infect(grid);

  assert.equal(grid.getSymbol(3, 1), SymbolId.InfectedWild);
});

test("does not infect diagonal positions", () => {
  const grid = createGrid(
    [2, 1, SymbolId.VirusWild],
    [1, 0, SymbolId.Nurse],
    [3, 0, SymbolId.Human2],
    [1, 2, SymbolId.Human3],
    [3, 2, SymbolId.Nurse],
  );

  infect(grid);

  assert.deepEqual(
    [grid.getSymbol(1, 0), grid.getSymbol(3, 0), grid.getSymbol(1, 2), grid.getSymbol(3, 2)],
    [SymbolId.Nurse, SymbolId.Human2, SymbolId.Human3, SymbolId.Nurse],
  );
});

test("leaves MaskedSurgeon immune", () => {
  const grid = createGrid(
    [2, 1, SymbolId.VirusWild],
    [2, 0, SymbolId.MaskedSurgeon],
  );

  infect(grid);

  assert.equal(grid.getSymbol(2, 0), SymbolId.MaskedSurgeon);
});

test("leaves equipment immune", () => {
  const grid = createGrid(
    [2, 1, SymbolId.VirusWild],
    [1, 1, SymbolId.Equipment1],
    [3, 1, SymbolId.Equipment2],
    [2, 0, SymbolId.Equipment3],
  );

  infect(grid);

  assert.equal(grid.getSymbol(1, 1), SymbolId.Equipment1);
  assert.equal(grid.getSymbol(3, 1), SymbolId.Equipment2);
  assert.equal(grid.getSymbol(2, 0), SymbolId.Equipment3);
});

test("keeps edge and corner neighbor checks within grid boundaries", () => {
  const grid = createGrid(
    [0, 0, SymbolId.VirusWild],
    [1, 0, SymbolId.Nurse],
    [0, 1, SymbolId.Human2],
    [4, 1, SymbolId.VirusWild],
    [4, 0, SymbolId.Human3],
    [4, 2, SymbolId.Nurse],
    [3, 1, SymbolId.Human2],
  );

  infect(grid);

  assert.deepEqual(
    [grid.getSymbol(1, 0), grid.getSymbol(0, 1), grid.getSymbol(4, 0), grid.getSymbol(4, 2), grid.getSymbol(3, 1)],
    Array(5).fill(SymbolId.InfectedWild),
  );
});

test("handles multiple VirusWild symbols", () => {
  const grid = createGrid(
    [1, 1, SymbolId.VirusWild],
    [3, 1, SymbolId.VirusWild],
    [1, 0, SymbolId.Nurse],
    [1, 2, SymbolId.Human2],
    [3, 0, SymbolId.Human3],
    [3, 2, SymbolId.Nurse],
  );

  infect(grid);

  assert.deepEqual(
    [grid.getSymbol(1, 0), grid.getSymbol(1, 2), grid.getSymbol(3, 0), grid.getSymbol(3, 2)],
    Array(4).fill(SymbolId.InfectedWild),
  );
  assert.equal(grid.getSymbol(1, 1), SymbolId.VirusWild);
  assert.equal(grid.getSymbol(3, 1), SymbolId.VirusWild);
});

test("infects an overlapping target only once", () => {
  const grid = createGrid(
    [1, 1, SymbolId.VirusWild],
    [2, 1, SymbolId.Nurse],
    [3, 1, SymbolId.VirusWild],
  );

  infect(grid);

  assert.equal(grid.getSymbol(2, 1), SymbolId.InfectedWild);
});

test("does not chain through a newly created InfectedWild", () => {
  const grid = createGrid(
    [0, 1, SymbolId.VirusWild],
    [1, 1, SymbolId.Nurse],
    [2, 1, SymbolId.Human2],
  );

  infect(grid);

  assert.equal(grid.getSymbol(1, 1), SymbolId.InfectedWild);
  assert.equal(grid.getSymbol(2, 1), SymbolId.Human2);
});

test("an existing InfectedWild does not spread", () => {
  const grid = createGrid(
    [2, 1, SymbolId.InfectedWild],
    [2, 0, SymbolId.Nurse],
    [2, 2, SymbolId.Human2],
    [1, 1, SymbolId.Human3],
    [3, 1, SymbolId.Nurse],
  );
  const before = grid.snapshot();

  infect(grid);

  assert.deepEqual(grid.snapshot(), before);
});

test("returns the unchanged supplied Grid when no VirusWild exists", () => {
  const grid = createGrid(
    [0, 0, SymbolId.Nurse],
    [2, 1, SymbolId.Human2],
    [4, 2, SymbolId.InfectedWild],
  );
  const before = grid.snapshot();

  const result = infect(grid);

  assert.equal(result, grid);
  assert.deepEqual(result.snapshot(), before);
});
