import { Grid } from "../grid/Grid.ts";
import { WeightedSymbolSelector } from "./WeightedSymbolSelector.ts";

export class ReelGenerator {
  private readonly selector: WeightedSymbolSelector;

  constructor(selector: WeightedSymbolSelector) {
    this.selector = selector;
  }

  generate(): Grid {
    const symbols = Array.from(
      { length: Grid.SYMBOL_COUNT },
      () => this.selector.select(),
    );

    return new Grid(symbols);
  }
}
