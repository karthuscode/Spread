import assert from "node:assert/strict";
import test from "node:test";

import { PROVISIONAL_SYMBOL_WEIGHTS } from "../src/config/provisionalSymbolWeights.ts";
import { SymbolId } from "../src/symbols/SymbolId.ts";
import { SYMBOL_DEFINITIONS } from "../src/symbols/symbolDefinitions.ts";

test("defines every symbol exactly once", () => {
  assert.deepEqual(
    Object.keys(SYMBOL_DEFINITIONS).sort(),
    Object.values(SymbolId).sort(),
  );
});

test("only vulnerable human symbols can be infected", () => {
  const infectableIds = Object.values(SYMBOL_DEFINITIONS)
    .filter((definition) => definition.canBeInfected)
    .map((definition) => definition.id)
    .sort();

  assert.deepEqual(
    infectableIds,
    [SymbolId.Nurse, SymbolId.Human2, SymbolId.Human3].sort(),
  );
});

test("virus and infected wilds have distinct spreading behavior", () => {
  const virusWild = SYMBOL_DEFINITIONS[SymbolId.VirusWild];
  const infectedWild = SYMBOL_DEFINITIONS[SymbolId.InfectedWild];

  assert.equal(virusWild.isWild, true);
  assert.equal(virusWild.canSpreadInfection, true);
  assert.equal(infectedWild.isWild, true);
  assert.equal(infectedWild.canSpreadInfection, false);
});

test("keeps generated symbol weights provisional and excludes infected wild", () => {
  assert.deepEqual(PROVISIONAL_SYMBOL_WEIGHTS, {
    MaskedSurgeon: 4,
    Nurse: 7,
    Human2: 10,
    Human3: 10,
    Equipment1: 14,
    Equipment2: 14,
    Equipment3: 14,
    VirusWild: 3,
  });
  assert.equal("InfectedWild" in PROVISIONAL_SYMBOL_WEIGHTS, false);
});
