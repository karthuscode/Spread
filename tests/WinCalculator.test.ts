import assert from "node:assert/strict";
import test from "node:test";

import type { PaylineEvaluationResult } from "../src/paylines/PaylineEvaluator.ts";
import { Paytable, type PaytableConfig } from "../src/paytable/Paytable.ts";
import { SymbolId } from "../src/symbols/SymbolId.ts";
import { WinCalculator } from "../src/win/index.ts";

const TEST_PAYTABLE_CONFIG: PaytableConfig = {
  [SymbolId.MaskedSurgeon]: { 3: 103, 4: 104, 5: 105 },
  [SymbolId.Nurse]: { 3: 203, 4: 204, 5: 205 },
  [SymbolId.Human2]: { 3: 303, 4: 304, 5: 305 },
  [SymbolId.Human3]: { 3: 403, 4: 404, 5: 405 },
  [SymbolId.Equipment1]: { 3: 503, 4: 504, 5: 505 },
  [SymbolId.Equipment2]: { 3: 603, 4: 604, 5: 605 },
  [SymbolId.Equipment3]: { 3: 703, 4: 704, 5: 705 },
};

const paytable = new Paytable(TEST_PAYTABLE_CONFIG);
const calculator = new WinCalculator(paytable);

const winningLine = (
  paylineId: number,
  symbolId: PaylineEvaluationResult["symbolId"],
  matchCount: number,
): PaylineEvaluationResult =>
  Object.freeze({ paylineId, symbolId, matchCount });

test("returns an immutable empty result for no winning lines", () => {
  const result = calculator.calculate([]);

  assert.deepEqual(result, { lineWins: [], totalMultiplier: 0 });
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.lineWins), true);
});

test("converts a single winning line through the Paytable", () => {
  const result = calculator.calculate([
    winningLine(2, SymbolId.Nurse, 4),
  ]);

  assert.deepEqual(result, {
    lineWins: [
      {
        paylineId: 2,
        symbolId: SymbolId.Nurse,
        matchCount: 4,
        multiplier: 204,
      },
    ],
    totalMultiplier: 204,
  });
});

test("preserves order and sums different symbols and match counts", () => {
  const lines = [
    winningLine(4, SymbolId.Equipment2, 3),
    winningLine(1, SymbolId.MaskedSurgeon, 5),
    winningLine(3, SymbolId.Human3, 4),
  ];
  const result = calculator.calculate(lines);

  assert.deepEqual(result.lineWins, [
    {
      paylineId: 4,
      symbolId: SymbolId.Equipment2,
      matchCount: 3,
      multiplier: 603,
    },
    {
      paylineId: 1,
      symbolId: SymbolId.MaskedSurgeon,
      matchCount: 5,
      multiplier: 105,
    },
    {
      paylineId: 3,
      symbolId: SymbolId.Human3,
      matchCount: 4,
      multiplier: 404,
    },
  ]);
  assert.equal(result.totalMultiplier, 1112);
});

test("supports identical symbols on different paylines", () => {
  const result = calculator.calculate([
    winningLine(1, SymbolId.Human2, 3),
    winningLine(5, SymbolId.Human2, 5),
  ]);

  assert.deepEqual(
    result.lineWins.map(({ paylineId, multiplier }) => ({
      paylineId,
      multiplier,
    })),
    [
      { paylineId: 1, multiplier: 303 },
      { paylineId: 5, multiplier: 305 },
    ],
  );
  assert.equal(result.totalMultiplier, 608);
});

test("asks the Paytable for every line on every calculation", () => {
  const calls: unknown[][] = [];
  const observedPaytable = new Proxy(paytable, {
    get(target, property) {
      if (property === "getMultiplier") {
        return (...args: Parameters<Paytable["getMultiplier"]>) => {
          calls.push(args);
          return target.getMultiplier(...args);
        };
      }

      return Reflect.get(target, property, target);
    },
  });
  const observedCalculator = new WinCalculator(observedPaytable);
  const lines = [
    winningLine(1, SymbolId.Nurse, 3),
    winningLine(2, SymbolId.Equipment1, 5),
  ];

  observedCalculator.calculate(lines);
  observedCalculator.calculate(lines);

  assert.deepEqual(calls, [
    [SymbolId.Nurse, 3],
    [SymbolId.Equipment1, 5],
    [SymbolId.Nurse, 3],
    [SymbolId.Equipment1, 5],
  ]);
});

test("returns deeply immutable results", () => {
  const result = calculator.calculate([
    winningLine(1, SymbolId.MaskedSurgeon, 3),
  ]);

  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.lineWins), true);
  assert.equal(Object.isFrozen(result.lineWins[0]), true);
  assert.throws(() => {
    (result.lineWins[0] as { multiplier: number }).multiplier = 999;
  }, TypeError);
});

test("does not mutate winning-line input", () => {
  const line = {
    paylineId: 3,
    symbolId: SymbolId.Equipment3,
    matchCount: 4,
  };
  const lines = [line];
  const before = structuredClone(lines);

  calculator.calculate(lines);

  assert.deepEqual(lines, before);
  assert.equal(Object.isFrozen(lines), false);
  assert.equal(Object.isFrozen(line), false);
});

test("is deterministic for the same inputs", () => {
  const lines = [
    winningLine(1, SymbolId.Nurse, 5),
    winningLine(2, SymbolId.Equipment1, 3),
  ];

  assert.deepEqual(calculator.calculate(lines), calculator.calculate(lines));
});

test("rejects malformed winning-line collections and objects", () => {
  assert.throws(
    () => calculator.calculate(null as unknown as PaylineEvaluationResult[]),
    /Winning lines must be an array/,
  );
  assert.throws(
    () => calculator.calculate([null] as unknown as PaylineEvaluationResult[]),
    /at index 0 must be an object/,
  );
  assert.throws(
    () =>
      calculator.calculate([
        { symbolId: SymbolId.Nurse, matchCount: 3 },
      ] as unknown as PaylineEvaluationResult[]),
    /positive integer paylineId/,
  );
});

test("rejects invalid payline identifiers", () => {
  for (const paylineId of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(
      () => calculator.calculate([winningLine(paylineId, SymbolId.Nurse, 3)]),
      /positive integer paylineId/,
    );
  }
});

test("rejects unsupported paying symbols", () => {
  for (const symbolId of [
    SymbolId.VirusWild,
    SymbolId.InfectedWild,
    "Unknown",
  ]) {
    assert.throws(
      () =>
        calculator.calculate([
          winningLine(
            1,
            symbolId as PaylineEvaluationResult["symbolId"],
            3,
          ),
        ]),
      /unsupported paying symbol/,
    );
  }
});

test("rejects unsupported match counts", () => {
  for (const matchCount of [
    2,
    6,
    3.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    "3",
  ]) {
    assert.throws(
      () =>
        calculator.calculate([
          winningLine(1, SymbolId.Nurse, matchCount as number),
        ]),
      /unsupported match count/,
    );
  }
});
