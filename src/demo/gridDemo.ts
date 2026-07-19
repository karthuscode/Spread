import { PROVISIONAL_SYMBOL_WEIGHTS } from "../config/provisionalSymbolWeights.ts";
import { ReelGenerator } from "../reel-generator/ReelGenerator.ts";
import { WeightedSymbolSelector } from "../reel-generator/WeightedSymbolSelector.ts";
import { SymbolId, type SymbolId as SymbolIdValue } from "../symbols/SymbolId.ts";

const DISPLAY_LABELS: Readonly<Record<SymbolIdValue, string>> = {
  [SymbolId.MaskedSurgeon]: "MS",
  [SymbolId.Nurse]: "NU",
  [SymbolId.Human2]: "H2",
  [SymbolId.Human3]: "H3",
  [SymbolId.Equipment1]: "E1",
  [SymbolId.Equipment2]: "E2",
  [SymbolId.Equipment3]: "E3",
  [SymbolId.VirusWild]: "VW",
  [SymbolId.InfectedWild]: "IW",
};

const selector = new WeightedSymbolSelector(
  PROVISIONAL_SYMBOL_WEIGHTS,
  Math.random,
);
const grid = new ReelGenerator(selector).generate();

for (const row of grid.snapshot()) {
  console.log(`| ${row.map((symbol) => DISPLAY_LABELS[symbol]).join(" | ")} |`);
}
