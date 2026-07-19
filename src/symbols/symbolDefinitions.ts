import { SymbolId } from "./SymbolId.ts";
import type { SymbolDefinition } from "./SymbolDefinition.ts";

export const SYMBOL_DEFINITIONS: Readonly<Record<SymbolId, SymbolDefinition>> =
  Object.freeze({
    [SymbolId.MaskedSurgeon]: Object.freeze({
      id: SymbolId.MaskedSurgeon,
      category: "human",
      canBeInfected: false,
      isWild: false,
      canSpreadInfection: false,
    }),
    [SymbolId.Nurse]: Object.freeze({
      id: SymbolId.Nurse,
      category: "human",
      canBeInfected: true,
      isWild: false,
      canSpreadInfection: false,
    }),
    [SymbolId.Human2]: Object.freeze({
      id: SymbolId.Human2,
      category: "human",
      canBeInfected: true,
      isWild: false,
      canSpreadInfection: false,
    }),
    [SymbolId.Human3]: Object.freeze({
      id: SymbolId.Human3,
      category: "human",
      canBeInfected: true,
      isWild: false,
      canSpreadInfection: false,
    }),
    [SymbolId.Equipment1]: Object.freeze({
      id: SymbolId.Equipment1,
      category: "equipment",
      canBeInfected: false,
      isWild: false,
      canSpreadInfection: false,
    }),
    [SymbolId.Equipment2]: Object.freeze({
      id: SymbolId.Equipment2,
      category: "equipment",
      canBeInfected: false,
      isWild: false,
      canSpreadInfection: false,
    }),
    [SymbolId.Equipment3]: Object.freeze({
      id: SymbolId.Equipment3,
      category: "equipment",
      canBeInfected: false,
      isWild: false,
      canSpreadInfection: false,
    }),
    [SymbolId.VirusWild]: Object.freeze({
      id: SymbolId.VirusWild,
      category: "wild",
      canBeInfected: false,
      isWild: true,
      canSpreadInfection: true,
    }),
    [SymbolId.InfectedWild]: Object.freeze({
      id: SymbolId.InfectedWild,
      category: "wild",
      canBeInfected: false,
      isWild: true,
      canSpreadInfection: false,
    }),
  });
