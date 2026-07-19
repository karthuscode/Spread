export const SymbolId = Object.freeze({
  MaskedSurgeon: "MaskedSurgeon",
  Nurse: "Nurse",
  Human2: "Human2",
  Human3: "Human3",
  Equipment1: "Equipment1",
  Equipment2: "Equipment2",
  Equipment3: "Equipment3",
  VirusWild: "VirusWild",
  InfectedWild: "InfectedWild",
} as const);

export type SymbolId = (typeof SymbolId)[keyof typeof SymbolId];
