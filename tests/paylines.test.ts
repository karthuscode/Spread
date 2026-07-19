import assert from "node:assert/strict";
import test from "node:test";

import { PAYLINES } from "../src/paylines/paylines.ts";

test("contains the five documented paylines in order", () => {
  assert.deepEqual(PAYLINES, [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
  ]);
});

test("payline collection and row paths are immutable", () => {
  assert.equal(Object.isFrozen(PAYLINES), true);
  assert.equal(PAYLINES.every(Object.isFrozen), true);
});

test("each payline crosses five valid grid rows", () => {
  for (const payline of PAYLINES) {
    assert.equal(payline.length, 5);
    assert.equal(payline.every((row) => row >= 0 && row <= 2), true);
  }
});
