import assert from "node:assert/strict";
import test from "node:test";

import { SimulationResult } from "../src/simulation/SimulationResult.ts";

const createValidResult = (): SimulationResult =>
  new SimulationResult(5, 3, 2, 8.5, 170, 60, 8.5 / 3, 5);

test("accepts and exposes immutable aggregate values", () => {
  const result = createValidResult();

  assert.equal(result.totalSpins, 5);
  assert.equal(result.winningSpins, 3);
  assert.equal(result.losingSpins, 2);
  assert.equal(result.totalReturnedMultiplier, 8.5);
  assert.equal(result.estimatedRtpPercentage, 170);
  assert.equal(result.hitRatePercentage, 60);
  assert.equal(result.averageWinMultiplier, 8.5 / 3);
  assert.equal(result.maximumObservedWinMultiplier, 5);
  assert.equal(Object.isFrozen(result), true);
  assert.throws(() => {
    (result as { totalSpins: number }).totalSpins = 10;
  }, TypeError);
});

test("rejects inconsistent spin counts", () => {
  assert.throws(
    () => new SimulationResult(5, 2, 2, 8.5, 170, 40, 4.25, 5),
    /must sum to totalSpins/,
  );
});

test("rejects invalid total and outcome counts", () => {
  assert.throws(
    () => new SimulationResult(0, 0, 0, 0, 0, 0, 0, 0),
    /totalSpins must be a positive finite integer/,
  );
  assert.throws(
    () => new SimulationResult(1, -1, 2, 0, 0, 0, 0, 0),
    /winningSpins must be a non-negative finite integer/,
  );
  assert.throws(
    () => new SimulationResult(1, 1, -1, 0, 0, 100, 0, 0),
    /losingSpins must be a non-negative finite integer/,
  );
});

test("rejects non-finite aggregate values", () => {
  const invalidValues = [
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ];

  for (const value of invalidValues) {
    assert.throws(
      () => new SimulationResult(1, 1, 0, value, 100, 100, 1, 1),
      /totalReturnedMultiplier must be a non-negative finite number/,
    );
  }
});

test("rejects negative aggregate values", () => {
  assert.throws(
    () => new SimulationResult(1, 1, 0, 1, -1, 100, 1, 1),
    /estimatedRtpPercentage must be a non-negative finite number/,
  );
  assert.throws(
    () => new SimulationResult(1, 1, 0, 1, 100, 100, -1, 1),
    /averageWinMultiplier must be a non-negative finite number/,
  );
  assert.throws(
    () => new SimulationResult(1, 1, 0, 1, 100, 100, 1, -1),
    /maximumObservedWinMultiplier must be a non-negative finite number/,
  );
});

test("rejects invalid hit-rate percentages", () => {
  assert.throws(
    () => new SimulationResult(1, 1, 0, 1, 100, -1, 1, 1),
    /hitRatePercentage must be a non-negative finite number/,
  );
  assert.throws(
    () => new SimulationResult(1, 1, 0, 1, 100, 100.1, 1, 1),
    /hitRatePercentage must not exceed 100/,
  );
});
