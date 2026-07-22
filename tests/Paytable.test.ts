import assert from "node:assert/strict";
import test from "node:test";

import {
  defaultPaytable,
  PROVISIONAL_PAYTABLE_CONFIG,
} from "../src/paytable/defaultPaytable.ts";
import {
  Paytable,
  type MatchCount,
  type PaytableConfig,
  type PayingSymbolId,
} from "../src/paytable/Paytable.ts";
import { SymbolId } from "../src/symbols/SymbolId.ts";

const payingSymbols = [
  SymbolId.MaskedSurgeon,
  SymbolId.Nurse,
  SymbolId.Human2,
  SymbolId.Human3,
  SymbolId.Equipment1,
  SymbolId.Equipment2,
  SymbolId.Equipment3,
] as const;

const matchCounts = [3, 4, 5] as const;

const mutableConfig = (): Record<PayingSymbolId, Record<MatchCount, number>> =>
  Object.fromEntries(
    payingSymbols.map((symbol) => [
      symbol,
      { ...PROVISIONAL_PAYTABLE_CONFIG[symbol] },
    ]),
  ) as Record<PayingSymbolId, Record<MatchCount, number>>;

test("looks up every configured multiplier exactly", () => {
  for (const symbol of payingSymbols) {
    for (const matchCount of matchCounts) {
      assert.equal(
        defaultPaytable.getMultiplier(symbol, matchCount),
        PROVISIONAL_PAYTABLE_CONFIG[symbol][matchCount],
      );
    }
  }
});

test("uses the provisional premium-symbol multipliers", () => {
  assert.deepEqual(
    matchCounts.map((count) =>
      defaultPaytable.getMultiplier(SymbolId.MaskedSurgeon, count),
    ),
    [8, 25, 100],
  );
  assert.deepEqual(
    matchCounts.map((count) =>
      defaultPaytable.getMultiplier(SymbolId.Nurse, count),
    ),
    [6, 18, 60],
  );
});

test("keeps Human2 and Human3 payouts identical", () => {
  for (const matchCount of matchCounts) {
    assert.equal(
      defaultPaytable.getMultiplier(SymbolId.Human2, matchCount),
      defaultPaytable.getMultiplier(SymbolId.Human3, matchCount),
    );
  }
});

test("keeps all equipment payouts identical", () => {
  for (const matchCount of matchCounts) {
    const expected = defaultPaytable.getMultiplier(
      SymbolId.Equipment1,
      matchCount,
    );
    assert.equal(
      defaultPaytable.getMultiplier(SymbolId.Equipment2, matchCount),
      expected,
    );
    assert.equal(
      defaultPaytable.getMultiplier(SymbolId.Equipment3, matchCount),
      expected,
    );
  }
});

test("rejects both Wild symbols", () => {
  for (const wild of [SymbolId.VirusWild, SymbolId.InfectedWild]) {
    const config = { ...mutableConfig(), [wild]: { 3: 1, 4: 1, 5: 1 } };
    assert.throws(
      () => new Paytable(config as unknown as PaytableConfig),
      new RegExp(`Unsupported paytable symbol: ${wild}`),
    );
  }
});

test("rejects incomplete and extra symbol configurations", () => {
  const { Nurse: _omitted, ...incomplete } = mutableConfig();
  assert.throws(
    () => new Paytable(incomplete as unknown as PaytableConfig),
    /Missing payout configuration for Nurse/,
  );

  const extra = { ...mutableConfig(), Unknown: { 3: 1, 4: 1, 5: 1 } };
  assert.throws(
    () => new Paytable(extra as unknown as PaytableConfig),
    /Unsupported paytable symbol: Unknown/,
  );
});

test("rejects incomplete and unsupported match-count configurations", () => {
  const incomplete = mutableConfig();
  delete (incomplete.Nurse as Partial<Record<MatchCount, number>>)[4];
  assert.throws(
    () => new Paytable(incomplete),
    /Missing 4-match multiplier for Nurse/,
  );

  const extra = mutableConfig() as unknown as Record<
    string,
    Record<number, number>
  >;
  extra.Nurse[2] = 1;
  assert.throws(
    () => new Paytable(extra as unknown as PaytableConfig),
    /Unsupported match count 2 for Nurse/,
  );
});

test("rejects invalid multiplier values", () => {
  const invalidValues: unknown[] = [
    0,
    -1,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    "8",
  ];

  for (const value of invalidValues) {
    const config = mutableConfig() as unknown as Record<
      string,
      Record<number, unknown>
    >;
    config.Nurse[3] = value;
    assert.throws(
      () => new Paytable(config as unknown as PaytableConfig),
      /must be a positive finite integer/,
    );
  }
});

test("freezes default configuration and isolates behavior from constructor input", () => {
  assert.equal(Object.isFrozen(PROVISIONAL_PAYTABLE_CONFIG), true);
  for (const entry of Object.values(PROVISIONAL_PAYTABLE_CONFIG)) {
    assert.equal(Object.isFrozen(entry), true);
  }

  assert.throws(
    () => {
      (PROVISIONAL_PAYTABLE_CONFIG.Nurse as Record<number, number>)[3] = 999;
    },
    TypeError,
  );

  const config = mutableConfig();
  const paytable = new Paytable(config);
  config.Nurse[3] = 999;

  assert.equal(paytable.getMultiplier(SymbolId.Nurse, 3), 6);
});

test("public lookup accepts only paying symbols and supported match counts", () => {
  const payingSymbol: PayingSymbolId = SymbolId.Nurse;
  const matchCount: MatchCount = 3;
  assert.equal(defaultPaytable.getMultiplier(payingSymbol, matchCount), 6);

  if (false) {
    // @ts-expect-error Wild symbols have no standalone normal payline payout.
    defaultPaytable.getMultiplier(SymbolId.VirusWild, 3);
    // @ts-expect-error Only 3, 4, and 5 matches are supported.
    defaultPaytable.getMultiplier(SymbolId.Nurse, 2);
  }
});
