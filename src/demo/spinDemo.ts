import { PROVISIONAL_SYMBOL_WEIGHTS } from "../config/provisionalSymbolWeights.ts";
import { InfectionEngine } from "../infection/InfectionEngine.ts";
import { PaylineEvaluator } from "../paylines/PaylineEvaluator.ts";
import { defaultPaytable } from "../paytable/defaultPaytable.ts";
import { ReelGenerator } from "../reel-generator/ReelGenerator.ts";
import { WeightedSymbolSelector } from "../reel-generator/WeightedSymbolSelector.ts";
import { SpinEngine } from "../spin/SpinEngine.ts";
import { WinCalculator } from "../win/WinCalculator.ts";
import { formatSpinResult } from "./formatSpinResult.ts";

const selector = new WeightedSymbolSelector(
  PROVISIONAL_SYMBOL_WEIGHTS,
  Math.random,
);
const engine = new SpinEngine(
  new ReelGenerator(selector),
  new InfectionEngine(),
  new PaylineEvaluator(),
  new WinCalculator(defaultPaytable),
);
const result = engine.spin();

console.log(formatSpinResult(result));
