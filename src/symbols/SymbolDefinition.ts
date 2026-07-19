import type { SymbolId } from "./SymbolId.ts";

export type SymbolCategory = "human" | "equipment" | "wild";

export type SymbolDefinition = Readonly<{
  id: SymbolId;
  category: SymbolCategory;
  canBeInfected: boolean;
  isWild: boolean;
  canSpreadInfection: boolean;
}>;
