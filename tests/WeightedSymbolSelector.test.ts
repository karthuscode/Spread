import assert from "node:assert/strict";
import test from "node:test";

import type {
  GeneratedSymbolId,
} from "../src/config/provisionalSymbolWeights.ts";
import {
  WeightedSymbolSelector,
  type GeneratedSymbolWeights,
} from "../src/reel-generator/WeightedSymbolSelector.ts";
import { SymbolId } from "../src/symbols/SymbolId.ts";

const boundaryWeights: GeneratedSymbolWeights = {
  [SymbolId.MaskedSurgeon]: 1,
  [SymbolId.Nurse]: 2,
  [SymbolId.VirusWild]: 1,
};

test("selects the first symbol at the first range boundary", () => {
  const selector = new WeightedSymbolSelector(boundaryWeights, () => 0);

  assert.equal(selector.select(), SymbolId.MaskedSurgeon);
});

test("assigns an exact internal boundary to the following range", () => {
  const selector = new WeightedSymbolSelector(boundaryWeights, () => 0.25);

  assert.equal(selector.select(), SymbolId.Nurse);
});

test("selects the ranges immediately below and above an internal boundary", () => {
  const randomValues = [0.25 - Number.EPSILON, 0.25 + Number.EPSILON];
  const selector = new WeightedSymbolSelector(
    boundaryWeights,
    () => randomValues.shift()!,
  );

  assert.equal(selector.select(), SymbolId.MaskedSurgeon);
  assert.equal(selector.select(), SymbolId.Nurse);
});

test("selects the final possible range", () => {
  const selector = new WeightedSymbolSelector(
    boundaryWeights,
    () => 1 - Number.EPSILON,
  );

  assert.equal(selector.select(), SymbolId.VirusWild);
});

test("makes every configured symbol reachable in provided entry order", () => {
  const randomValues = [0.125, 0.5, 0.875];
  const selector = new WeightedSymbolSelector(
    boundaryWeights,
    () => randomValues.shift()!,
  );

  assert.deepEqual(
    [selector.select(), selector.select(), selector.select()],
    [SymbolId.MaskedSurgeon, SymbolId.Nurse, SymbolId.VirusWild],
  );
});

test("does not permit InfectedWild in generated-symbol weights", () => {
  const compileTimeInvalidWeights: GeneratedSymbolWeights = {
    // @ts-expect-error InfectedWild is created only by infection, not generation.
    [SymbolId.InfectedWild]: 1,
  };

  const invalidWeights = {
    [SymbolId.InfectedWild]: 1,
  } as unknown as GeneratedSymbolWeights;

  assert.ok(compileTimeInvalidWeights);

  assert.throws(
    () => new WeightedSymbolSelector(invalidWeights, () => 0),
    /InfectedWild cannot be selected/,
  );
});

test("rejects non-positive and non-finite-integer weights", () => {
  const invalidWeights = [
    0,
    -1,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ];

  for (const weight of invalidWeights) {
    assert.throws(
      () =>
        new WeightedSymbolSelector(
          { [SymbolId.Nurse]: weight },
          () => 0,
        ),
      /must be a positive finite integer/,
    );
  }
});

test("rejects an empty weight map", () => {
  assert.throws(
    () => new WeightedSymbolSelector({}, () => 0),
    /weight map must not be empty/i,
  );
});

test("rejects random results outside the finite [0, 1) interval", () => {
  const invalidRandomValues = [
    -Number.EPSILON,
    1,
    1 + Number.EPSILON,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ];

  for (const randomValue of invalidRandomValues) {
    const selector = new WeightedSymbolSelector(
      boundaryWeights,
      () => randomValue,
    );

    assert.throws(
      () => selector.select(),
      /must return a finite number from 0 \(inclusive\) to 1 \(exclusive\)/,
    );
  }
});

test("returns only GeneratedSymbolId values", () => {
  const generated: GeneratedSymbolId = new WeightedSymbolSelector(
    boundaryWeights,
    () => 0.5,
  ).select();

  assert.notEqual(generated, SymbolId.InfectedWild);
});
