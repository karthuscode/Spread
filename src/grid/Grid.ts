import type { SymbolId } from "../symbols/SymbolId.ts";

export type GridSnapshot = readonly [
  readonly [SymbolId, SymbolId, SymbolId, SymbolId, SymbolId],
  readonly [SymbolId, SymbolId, SymbolId, SymbolId, SymbolId],
  readonly [SymbolId, SymbolId, SymbolId, SymbolId, SymbolId],
];

export class Grid {
  static readonly COLUMNS = 5;
  static readonly ROWS = 3;
  static readonly SYMBOL_COUNT = Grid.COLUMNS * Grid.ROWS;

  private readonly symbols: SymbolId[];

  /**
   * Creates a grid from symbols in row-major order: top row first, with each
   * row ordered from column 0 through column 4.
   */
  constructor(symbols: readonly SymbolId[]) {
    if (symbols.length !== Grid.SYMBOL_COUNT) {
      throw new RangeError(
        `Grid requires exactly ${Grid.SYMBOL_COUNT} symbols; received ${symbols.length}.`,
      );
    }

    this.symbols = [...symbols];
  }

  getSymbol(column: number, row: number): SymbolId {
    return this.symbols[this.indexOf(column, row)]!;
  }

  replaceSymbol(column: number, row: number, symbol: SymbolId): void {
    this.symbols[this.indexOf(column, row)] = symbol;
  }

  snapshot(): GridSnapshot {
    const row = (rowIndex: number) =>
      Object.freeze([
        this.getSymbol(0, rowIndex),
        this.getSymbol(1, rowIndex),
        this.getSymbol(2, rowIndex),
        this.getSymbol(3, rowIndex),
        this.getSymbol(4, rowIndex),
      ] as const);

    return Object.freeze([row(0), row(1), row(2)] as const);
  }

  private indexOf(column: number, row: number): number {
    this.assertCoordinate("column", column, Grid.COLUMNS - 1);
    this.assertCoordinate("row", row, Grid.ROWS - 1);

    return row * Grid.COLUMNS + column;
  }

  private assertCoordinate(
    name: "column" | "row",
    value: number,
    maximum: number,
  ): void {
    if (!Number.isInteger(value) || value < 0 || value > maximum) {
      throw new RangeError(
        `Grid ${name} must be an integer from 0 to ${maximum}; received ${value}.`,
      );
    }
  }
}
