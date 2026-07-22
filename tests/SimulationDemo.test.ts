import assert from "node:assert/strict";
import test from "node:test";

import {
  formatSimulationResult,
  parseSpinCount,
} from "../src/demo/simulationDemo.ts";
import { SimulationResult } from "../src/simulation/SimulationResult.ts";

test("formats the complete simulation report", () => {
  const result = new SimulationResult(
    1_000_000,
    241_700,
    758_300,
    734_820.5,
    73.48205,
    24.17,
    734_820.5 / 241_700,
    87.5,
  );
  const output = formatSimulationResult(result, 1.234);

  assert.match(output, /={40}\nSPREAD SIMULATION\n={40}/);
  assert.match(output, /Spins:\s+1,000,000/);
  assert.match(output, /Winning spins:\s+241,700/);
  assert.match(output, /Losing spins:\s+758,300/);
  assert.match(output, /Total returned:\s+734,820\.50x/);
  assert.match(output, /Estimated RTP:\s+73\.482%/);
  assert.match(output, /Hit rate:\s+24\.170%/);
  assert.match(output, /Average winning spin:\s+3\.040x/);
  assert.match(output, /Maximum observed win:\s+87\.500x/);
  assert.match(output, /Elapsed time:\s+1\.23s/);
});

test("uses one million spins by default and supports a custom count", () => {
  assert.equal(parseSpinCount(undefined), 1_000_000);
  assert.equal(parseSpinCount("100000"), 100_000);
});

test("rejects invalid CLI spin counts", () => {
  for (const argument of [
    "0",
    "-1",
    "1.5",
    "NaN",
    "Infinity",
    "not-a-number",
  ]) {
    assert.throws(
      () => parseSpinCount(argument),
      /Spin count must be a positive finite integer/,
    );
  }
});
