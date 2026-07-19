import assert from "node:assert/strict";
import test from "node:test";

import { Grid } from "../src/grid/Grid.ts";
import { ReelGenerator } from "../src/reel-generator/ReelGenerator.ts";
import {
  WeightedSymbolSelector,
  type GeneratedSymbolWeights,
} from "../src/reel-generator/WeightedSymbolSelector.ts";
import { SymbolId } from "../src/symbols/SymbolId.ts";

const alternatingWeights: GeneratedSymbolWeights = {
  [SymbolId.MaskedSurgeon]: 1,
  [SymbolId.VirusWild]: 1,
};

test("selects exactly fifteen symbols for each generated grid", () => {
  let selectionCount = 0;
  const selector = new WeightedSymbolSelector(
    { [SymbolId.Nurse]: 1 },
    () => {
      selectionCount += 1;
      return 0;
    },
  );

  new ReelGenerator(selector).generate();

  assert.equal(selectionCount, Grid.SYMBOL_COUNT);
});

test("places selected symbols into the grid in row-major order", () => {
  const randomValues = Array.from(
    { length: Grid.SYMBOL_COUNT },
    (_, index) => (index % 2 === 0 ? 0 : 0.5),
  );
  const selector = new WeightedSymbolSelector(
    alternatingWeights,
    () => randomValues.shift()!,
  );

  const grid = new ReelGenerator(selector).generate();

  assert.deepEqual(grid.snapshot(), [
    [
      SymbolId.MaskedSurgeon,
      SymbolId.VirusWild,
      SymbolId.MaskedSurgeon,
      SymbolId.VirusWild,
      SymbolId.MaskedSurgeon,
    ],
    [
      SymbolId.VirusWild,
      SymbolId.MaskedSurgeon,
      SymbolId.VirusWild,
      SymbolId.MaskedSurgeon,
      SymbolId.VirusWild,
    ],
    [
      SymbolId.MaskedSurgeon,
      SymbolId.VirusWild,
      SymbolId.MaskedSurgeon,
      SymbolId.VirusWild,
      SymbolId.MaskedSurgeon,
    ],
  ]);
});

test("generates deterministically from controlled random values", () => {
  const randomValues = Array.from(
    { length: Grid.SYMBOL_COUNT },
    (_, index) => index / Grid.SYMBOL_COUNT,
  );
  const selector = new WeightedSymbolSelector(
    alternatingWeights,
    () => randomValues.shift()!,
  );

  const grid = new ReelGenerator(selector).generate();

  assert.deepEqual(grid.snapshot(), [
    Array(5).fill(SymbolId.MaskedSurgeon),
    [
      SymbolId.MaskedSurgeon,
      SymbolId.MaskedSurgeon,
      SymbolId.MaskedSurgeon,
      SymbolId.VirusWild,
      SymbolId.VirusWild,
    ],
    Array(5).fill(SymbolId.VirusWild),
  ]);
});

test("returns a Grid instance", () => {
  const selector = new WeightedSymbolSelector(
    { [SymbolId.Human2]: 1 },
    () => 0,
  );

  assert.ok(new ReelGenerator(selector).generate() instanceof Grid);
});

test("never generates InfectedWild", () => {
  const selector = new WeightedSymbolSelector(alternatingWeights, () => 0.75);
  const snapshot = new ReelGenerator(selector).generate().snapshot();

  assert.equal(
    snapshot.flat().includes(SymbolId.InfectedWild),
    false,
  );
});

test("returns separate grids that do not share mutable state", () => {
  const selector = new WeightedSymbolSelector(
    { [SymbolId.Nurse]: 1 },
    () => 0,
  );
  const generator = new ReelGenerator(selector);
  const first = generator.generate();
  const second = generator.generate();

  first.replaceSymbol(0, 0, SymbolId.InfectedWild);

  assert.notEqual(first, second);
  assert.equal(first.getSymbol(0, 0), SymbolId.InfectedWild);
  assert.equal(second.getSymbol(0, 0), SymbolId.Nurse);
});
