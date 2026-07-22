import { Grid, type GridSnapshot } from "../grid/Grid.ts";
import type { WinResult } from "../win/types.ts";

export class SpinResult {
  readonly initialGrid: GridSnapshot;
  readonly finalGrid: GridSnapshot;
  readonly winResult: WinResult;

  constructor(
    initialGrid: GridSnapshot,
    finalGrid: GridSnapshot,
    winResult: WinResult,
  ) {
    this.assertGridSnapshot("initialGrid", initialGrid);
    this.assertGridSnapshot("finalGrid", finalGrid);

    if (
      typeof winResult !== "object" ||
      winResult === null ||
      !Array.isArray(winResult.lineWins) ||
      typeof winResult.totalMultiplier !== "number" ||
      !Number.isFinite(winResult.totalMultiplier)
    ) {
      throw new TypeError("winResult must be a valid WinResult.");
    }

    this.initialGrid = initialGrid;
    this.finalGrid = finalGrid;
    this.winResult = winResult;

    Object.freeze(this);
  }

  private assertGridSnapshot(
    name: "initialGrid" | "finalGrid",
    snapshot: unknown,
  ): asserts snapshot is GridSnapshot {
    if (
      !Array.isArray(snapshot) ||
      snapshot.length !== Grid.ROWS ||
      !snapshot.every(
        (row) => Array.isArray(row) && row.length === Grid.COLUMNS,
      )
    ) {
      throw new TypeError(
        `${name} must be a ${Grid.COLUMNS}x${Grid.ROWS} GridSnapshot.`,
      );
    }

    if (
      !Object.isFrozen(snapshot) ||
      !snapshot.every((row) => Object.isFrozen(row))
    ) {
      throw new TypeError(`${name} must be an immutable GridSnapshot.`);
    }
  }
}
