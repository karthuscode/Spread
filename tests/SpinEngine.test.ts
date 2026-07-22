import assert from "node:assert/strict";
import test from "node:test";

import { Grid } from "../src/grid/Grid.ts";
import { InfectionEngine } from "../src/infection/InfectionEngine.ts";
import {
  PaylineEvaluator,
  type PaylineEvaluationResult,
} from "../src/paylines/PaylineEvaluator.ts";
import { defaultPaytable } from "../src/paytable/defaultPaytable.ts";
import { ReelGenerator } from "../src/reel-generator/ReelGenerator.ts";
import { WeightedSymbolSelector } from "../src/reel-generator/WeightedSymbolSelector.ts";
import { SpinEngine, SpinResult } from "../src/spin/index.ts";
import { SymbolId } from "../src/symbols/SymbolId.ts";
import type { GeneratedSymbolId } from "../src/config/provisionalSymbolWeights.ts";
import { WinCalculator, type WinResult } from "../src/win/index.ts";

const infectionScenario: readonly GeneratedSymbolId[] = [
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

const noInfectionScenario: readonly GeneratedSymbolId[] = [
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

const createReelGenerator = (
  symbols: readonly GeneratedSymbolId[],
): ReelGenerator => {
  const baseSelector = new WeightedSymbolSelector(
    { [SymbolId.Nurse]: 1 },
    () => 0,
  );
  let selectionIndex = 0;
  const selector = new Proxy(baseSelector, {
    get(target, property) {
      if (property === "select") {
        return () => symbols[selectionIndex++ % symbols.length]!;
      }

      return Reflect.get(target, property, target);
    },
  });

  return new ReelGenerator(selector);
};

const createEngine = (
  symbols: readonly GeneratedSymbolId[] = infectionScenario,
): SpinEngine =>
  new SpinEngine(
    createReelGenerator(symbols),
    new InfectionEngine(),
    new PaylineEvaluator(),
    new WinCalculator(defaultPaytable),
  );

test("executes a complete spin and returns a SpinResult", () => {
  const result = createEngine().spin();

  assert.ok(result instanceof SpinResult);
  assert.equal(result.initialGrid[1][1], SymbolId.Human2);
  assert.equal(result.finalGrid[1][1], SymbolId.InfectedWild);
  assert.equal(result.initialGrid[1][3], SymbolId.Nurse);
  assert.equal(result.finalGrid[1][3], SymbolId.InfectedWild);
  assert.notDeepEqual(result.initialGrid, result.finalGrid);
  assert.deepEqual(result.winResult, {
    lineWins: [
      {
        paylineId: 1,
        symbolId: SymbolId.Nurse,
        matchCount: 5,
        multiplier: 60,
      },
      {
        paylineId: 4,
        symbolId: SymbolId.Equipment1,
        matchCount: 4,
        multiplier: 6,
      },
    ],
    totalMultiplier: 66,
  });
});

test("initial snapshot remains detached from infection mutation", () => {
  const result = createEngine().spin();

  assert.equal(result.initialGrid[1][1], SymbolId.Human2);
  assert.equal(result.initialGrid[1][3], SymbolId.Nurse);
  assert.equal(Object.isFrozen(result.initialGrid), true);
  assert.equal(result.initialGrid.every(Object.isFrozen), true);
});

test("supports identical snapshots when infection changes nothing", () => {
  const result = createEngine(noInfectionScenario).spin();

  assert.deepEqual(result.initialGrid, result.finalGrid);
});

test("uses the final Grid and preserves dependency outputs in semantic order", () => {
  const calls: string[] = [];
  const generatedGrid = new Grid(infectionScenario);
  const reelGenerator = new Proxy(createReelGenerator(infectionScenario), {
    get(target, property) {
      if (property === "generate") {
        return () => {
          calls.push("generate");
          return generatedGrid;
        };
      }

      return Reflect.get(target, property, target);
    },
  });
  const infectionEngine = new Proxy(new InfectionEngine(), {
    get(target, property) {
      if (property === "infect") {
        return (grid: Grid) => {
          calls.push("infect");
          return target.infect(grid);
        };
      }

      return Reflect.get(target, property, target);
    },
  });
  let evaluationResults: readonly PaylineEvaluationResult[] | undefined;
  const paylineEvaluator = new Proxy(new PaylineEvaluator(), {
    get(target, property) {
      if (property === "evaluate") {
        return (grid: Grid) => {
          calls.push("evaluate");
          assert.equal(grid, generatedGrid);
          assert.equal(grid.getSymbol(1, 1), SymbolId.InfectedWild);
          evaluationResults = target.evaluate(grid);
          return evaluationResults;
        };
      }

      return Reflect.get(target, property, target);
    },
  });
  const expectedWinResult: WinResult = Object.freeze({
    lineWins: Object.freeze([]),
    totalMultiplier: 0,
  });
  const winCalculator = new Proxy(new WinCalculator(defaultPaytable), {
    get(target, property) {
      if (property === "calculate") {
        return (results: readonly PaylineEvaluationResult[]) => {
          calls.push("calculate");
          assert.equal(results, evaluationResults);
          return expectedWinResult;
        };
      }

      return Reflect.get(target, property, target);
    },
  });

  const result = new SpinEngine(
    reelGenerator,
    infectionEngine,
    paylineEvaluator,
    winCalculator,
  ).spin();

  assert.deepEqual(calls, ["generate", "infect", "evaluate", "calculate"]);
  assert.equal(result.winResult, expectedWinResult);
});

test("calls every dependency once for each spin", () => {
  const calls = { generate: 0, infect: 0, evaluate: 0, calculate: 0 };
  const reelGenerator = new Proxy(createReelGenerator(noInfectionScenario), {
    get(target, property) {
      if (property === "generate") {
        return () => {
          calls.generate += 1;
          return target.generate();
        };
      }
      return Reflect.get(target, property, target);
    },
  });
  const infectionEngine = new Proxy(new InfectionEngine(), {
    get(target, property) {
      if (property === "infect") {
        return (grid: Grid) => {
          calls.infect += 1;
          return target.infect(grid);
        };
      }
      return Reflect.get(target, property, target);
    },
  });
  const paylineEvaluator = new Proxy(new PaylineEvaluator(), {
    get(target, property) {
      if (property === "evaluate") {
        return (grid: Grid) => {
          calls.evaluate += 1;
          return target.evaluate(grid);
        };
      }
      return Reflect.get(target, property, target);
    },
  });
  const winCalculator = new Proxy(new WinCalculator(defaultPaytable), {
    get(target, property) {
      if (property === "calculate") {
        return (results: readonly PaylineEvaluationResult[]) => {
          calls.calculate += 1;
          return target.calculate(results);
        };
      }
      return Reflect.get(target, property, target);
    },
  });
  const engine = new SpinEngine(
    reelGenerator,
    infectionEngine,
    paylineEvaluator,
    winCalculator,
  );

  engine.spin();

  assert.deepEqual(calls, { generate: 1, infect: 1, evaluate: 1, calculate: 1 });
});

test("deterministic dependencies produce equivalent independent spins", () => {
  const engine = createEngine();

  const first = engine.spin();
  const second = engine.spin();

  assert.deepEqual(first, second);
  assert.notEqual(first, second);
  assert.notEqual(first.initialGrid, second.initialGrid);
  assert.notEqual(first.finalGrid, second.finalGrid);
  assert.notEqual(first.winResult, second.winResult);
});

test("dependency errors propagate unchanged", () => {
  const expectedError = new Error("generation failed");
  const reelGenerator = new Proxy(createReelGenerator(infectionScenario), {
    get(target, property) {
      if (property === "generate") {
        return () => {
          throw expectedError;
        };
      }
      return Reflect.get(target, property, target);
    },
  });
  const engine = new SpinEngine(
    reelGenerator,
    new InfectionEngine(),
    new PaylineEvaluator(),
    new WinCalculator(defaultPaytable),
  );

  assert.throws(() => engine.spin(), (error) => error === expectedError);
});

test("rejects missing constructor dependencies", () => {
  const valid = {
    reelGenerator: createReelGenerator(infectionScenario),
    infectionEngine: new InfectionEngine(),
    paylineEvaluator: new PaylineEvaluator(),
    winCalculator: new WinCalculator(defaultPaytable),
  };

  assert.throws(
    () =>
      new SpinEngine(
        undefined as unknown as ReelGenerator,
        valid.infectionEngine,
        valid.paylineEvaluator,
        valid.winCalculator,
      ),
    /reelGenerator must be a ReelGenerator/,
  );
  assert.throws(
    () =>
      new SpinEngine(
        valid.reelGenerator,
        undefined as unknown as InfectionEngine,
        valid.paylineEvaluator,
        valid.winCalculator,
      ),
    /infectionEngine must be an InfectionEngine/,
  );
  assert.throws(
    () =>
      new SpinEngine(
        valid.reelGenerator,
        valid.infectionEngine,
        undefined as unknown as PaylineEvaluator,
        valid.winCalculator,
      ),
    /paylineEvaluator must be a PaylineEvaluator/,
  );
  assert.throws(
    () =>
      new SpinEngine(
        valid.reelGenerator,
        valid.infectionEngine,
        valid.paylineEvaluator,
        undefined as unknown as WinCalculator,
      ),
    /winCalculator must be a WinCalculator/,
  );
});
