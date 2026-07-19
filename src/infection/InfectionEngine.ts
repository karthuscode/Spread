import { Grid } from "../grid/Grid.ts";
import { SymbolId } from "../symbols/SymbolId.ts";
import { SYMBOL_DEFINITIONS } from "../symbols/symbolDefinitions.ts";

type Coordinate = Readonly<{
  column: number;
  row: number;
}>;

const ORTHOGONAL_OFFSETS: readonly Coordinate[] = Object.freeze([
  Object.freeze({ column: -1, row: 0 }),
  Object.freeze({ column: 1, row: 0 }),
  Object.freeze({ column: 0, row: -1 }),
  Object.freeze({ column: 0, row: 1 }),
]);

export class InfectionEngine {
  infect(grid: Grid): Grid {
    const beforeInfection = grid.snapshot();
    const targetIndexes = new Set<number>();

    for (let row = 0; row < Grid.ROWS; row += 1) {
      for (let column = 0; column < Grid.COLUMNS; column += 1) {
        const sourceSymbol = beforeInfection[row][column];

        if (
          sourceSymbol !== SymbolId.VirusWild ||
          !SYMBOL_DEFINITIONS[sourceSymbol].canSpreadInfection
        ) {
          continue;
        }

        for (const offset of ORTHOGONAL_OFFSETS) {
          const targetColumn = column + offset.column;
          const targetRow = row + offset.row;

          if (
            targetColumn < 0 ||
            targetColumn >= Grid.COLUMNS ||
            targetRow < 0 ||
            targetRow >= Grid.ROWS
          ) {
            continue;
          }

          const targetSymbol = beforeInfection[targetRow][targetColumn];

          if (SYMBOL_DEFINITIONS[targetSymbol].canBeInfected) {
            targetIndexes.add(targetRow * Grid.COLUMNS + targetColumn);
          }
        }
      }
    }

    for (const targetIndex of targetIndexes) {
      const column = targetIndex % Grid.COLUMNS;
      const row = Math.floor(targetIndex / Grid.COLUMNS);
      grid.replaceSymbol(column, row, SymbolId.InfectedWild);
    }

    return grid;
  }
}
