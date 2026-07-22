import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

import { PROVISIONAL_SYMBOL_WEIGHTS } from "../config/provisionalSymbolWeights.ts";
import { InfectionEngine } from "../infection/InfectionEngine.ts";
import { PaylineEvaluator } from "../paylines/PaylineEvaluator.ts";
import { defaultPaytable } from "../paytable/defaultPaytable.ts";
import { ReelGenerator } from "../reel-generator/ReelGenerator.ts";
import { WeightedSymbolSelector } from "../reel-generator/WeightedSymbolSelector.ts";
import type { SimulationResult } from "../simulation/SimulationResult.ts";
import { SimulationRunner } from "../simulation/SimulationRunner.ts";
import { SpinEngine } from "../spin/SpinEngine.ts";
import { WinCalculator } from "../win/WinCalculator.ts";

const DEFAULT_SPIN_COUNT = 1_000_000;

export const parseSpinCount = (argument: string | undefined): number => {
  if (argument === undefined) {
    return DEFAULT_SPIN_COUNT;
  }

  const spinCount = Number(argument);

  if (
    !Number.isFinite(spinCount) ||
    !Number.isInteger(spinCount) ||
    spinCount <= 0
  ) {
    throw new RangeError(
      `Spin count must be a positive finite integer; received ${argument}.`,
    );
  }

  return spinCount;
};

const formatInteger = (value: number): string =>
  value.toLocaleString("en-US", { maximumFractionDigits: 0 });

const formatDecimal = (value: number, digits: number): string =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

const formatMetric = (label: string, value: string): string =>
  `${label.padEnd(30)}${value.padStart(12)}`;

export const formatSimulationResult = (
  result: SimulationResult,
  elapsedSeconds: number,
): string =>
  [
    "========================================",
    "SPREAD SIMULATION",
    "========================================",
    "",
    formatMetric("Spins:", formatInteger(result.totalSpins)),
    formatMetric("Winning spins:", formatInteger(result.winningSpins)),
    formatMetric("Losing spins:", formatInteger(result.losingSpins)),
    formatMetric(
      "Total returned:",
      `${formatDecimal(result.totalReturnedMultiplier, 2)}x`,
    ),
    formatMetric(
      "Estimated RTP:",
      `${formatDecimal(result.estimatedRtpPercentage, 3)}%`,
    ),
    formatMetric(
      "Hit rate:",
      `${formatDecimal(result.hitRatePercentage, 3)}%`,
    ),
    formatMetric(
      "Average winning spin:",
      `${formatDecimal(result.averageWinMultiplier, 3)}x`,
    ),
    formatMetric(
      "Maximum observed win:",
      `${formatDecimal(result.maximumObservedWinMultiplier, 3)}x`,
    ),
    formatMetric("Elapsed time:", `${formatDecimal(elapsedSeconds, 2)}s`),
  ].join("\n");

export const runSimulationDemo = (spinCount: number): string => {
  const selector = new WeightedSymbolSelector(
    PROVISIONAL_SYMBOL_WEIGHTS,
    Math.random,
  );
  const spinEngine = new SpinEngine(
    new ReelGenerator(selector),
    new InfectionEngine(),
    new PaylineEvaluator(),
    new WinCalculator(defaultPaytable),
  );
  const runner = new SimulationRunner(spinEngine);
  const startedAt = performance.now();
  const result = runner.run(spinCount);
  const elapsedSeconds = (performance.now() - startedAt) / 1_000;

  return formatSimulationResult(result, elapsedSeconds);
};

if (
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    const spinCount = parseSpinCount(process.argv[2]);
    console.log(runSimulationDemo(spinCount));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
