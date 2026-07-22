import assert from "node:assert/strict";
import test from "node:test";

import { Grid } from "../src/grid/Grid.ts";
import { InfectionEngine } from "../src/infection/InfectionEngine.ts";
import { PaylineEvaluator } from "../src/paylines/PaylineEvaluator.ts";
import { defaultPaytable } from "../src/paytable/defaultPaytable.ts";
import { ReelGenerator } from "../src/reel-generator/ReelGenerator.ts";
import { WeightedSymbolSelector } from "../src/reel-generator/WeightedSymbolSelector.ts";
import { SimulationRunner } from "../src/simulation/SimulationRunner.ts";
import { SpinEngine } from "../src/spin/SpinEngine.ts";
import { SpinResult } from "../src/spin/SpinResult.ts";
import { SymbolId } from "../src/symbols/SymbolId.ts";
import { WinCalculator } from "../src/win/WinCalculator.ts";
import type { WinResult } from "../src/win/types.ts";

const snapshot = new Grid(
  Array(Grid.SYMBOL_COUNT).fill(SymbolId.Equipment1),
).snapshot();

const createSpinResult = (totalMultiplier: number): SpinResult => {
  const winResult: WinResult = Object.freeze({
    lineWins: Object.freeze([]),
    totalMultiplier,
  });

  return new SpinResult(snapshot, snapshot, winResult);
};

const createBaseSpinEngine = (): SpinEngine => {
  const selector = new WeightedSymbolSelector(
    { [SymbolId.Equipment1]: 1 },
    () => 0,
  );

  return new SpinEngine(
    new ReelGenerator(selector),
    new InfectionEngine(),
    new PaylineEvaluator(),
    new WinCalculator(defaultPaytable),
  );
};

const createSequenceEngine = (
  multipliers: readonly number[],
  onSpin?: (callCount: number) => void,
): SpinEngine => {
  const baseEngine = createBaseSpinEngine();
  let callCount = 0;

  return new Proxy(baseEngine, {
    get(target, property) {
      if (property === "spin") {
        return () => {
          callCount += 1;
          onSpin?.(callCount);
          return createSpinResult(
            multipliers[(callCount - 1) % multipliers.length]!,
          );
        };
      }

      return Reflect.get(target, property, target);
    },
  });
};

test("aggregates the known deterministic multiplier sequence", () => {
  let spinCalls = 0;
  const runner = new SimulationRunner(
    createSequenceEngine([0, 2, 0, 5, 1.5], () => {
      spinCalls += 1;
    }),
  );

  const result = runner.run(5);

  assert.equal(spinCalls, 5);
  assert.deepEqual({ ...result }, {
    totalSpins: 5,
    winningSpins: 3,
    losingSpins: 2,
    totalReturnedMultiplier: 8.5,
    estimatedRtpPercentage: 170,
    hitRatePercentage: 60,
    averageWinMultiplier: 8.5 / 3,
    maximumObservedWinMultiplier: 5,
  });
});

test("handles all losing spins", () => {
  const result = new SimulationRunner(createSequenceEngine([0])).run(4);

  assert.equal(result.winningSpins, 0);
  assert.equal(result.losingSpins, 4);
  assert.equal(result.totalReturnedMultiplier, 0);
  assert.equal(result.estimatedRtpPercentage, 0);
  assert.equal(result.hitRatePercentage, 0);
  assert.equal(result.averageWinMultiplier, 0);
  assert.equal(result.maximumObservedWinMultiplier, 0);
});

test("handles all winning spins and decimal multipliers", () => {
  const result = new SimulationRunner(createSequenceEngine([1.25, 2.5])).run(
    4,
  );

  assert.equal(result.winningSpins, 4);
  assert.equal(result.losingSpins, 0);
  assert.equal(result.totalReturnedMultiplier, 7.5);
  assert.equal(result.estimatedRtpPercentage, 187.5);
  assert.equal(result.hitRatePercentage, 100);
  assert.equal(result.averageWinMultiplier, 1.875);
  assert.equal(result.maximumObservedWinMultiplier, 2.5);
});

test("is deterministic and does not leak aggregate state between runs", () => {
  const runner = new SimulationRunner(createSequenceEngine([0, 2, 0, 5, 1.5]));

  const first = runner.run(5);
  const second = runner.run(5);

  assert.deepEqual(first, second);
  assert.notEqual(first, second);
});

test("returns aggregates without retaining individual SpinResult objects", () => {
  const result = new SimulationRunner(createSequenceEngine([1, 0])).run(2);

  assert.deepEqual(Object.keys(result).sort(), [
    "averageWinMultiplier",
    "estimatedRtpPercentage",
    "hitRatePercentage",
    "losingSpins",
    "maximumObservedWinMultiplier",
    "totalReturnedMultiplier",
    "totalSpins",
    "winningSpins",
  ]);
  assert.equal("spinResults" in result, false);
});

test("propagates SpinEngine errors unchanged", () => {
  const expectedError = new Error("spin failed");
  const engine = createSequenceEngine([0], () => {
    throw expectedError;
  });

  assert.throws(
    () => new SimulationRunner(engine).run(1),
    (error) => error === expectedError,
  );
});

test("rejects invalid spin counts", () => {
  const runner = new SimulationRunner(createSequenceEngine([0]));

  for (const spinCount of [
    0,
    -1,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    undefined,
    "5",
  ]) {
    assert.throws(
      () => runner.run(spinCount as number),
      /totalSpins must be a positive finite integer/,
    );
  }
});

test("rejects a missing SpinEngine dependency", () => {
  assert.throws(
    () => new SimulationRunner(undefined as unknown as SpinEngine),
    /spinEngine must be a SpinEngine/,
  );
});
