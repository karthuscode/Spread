import { SpinEngine } from "../spin/SpinEngine.ts";
import { SimulationResult } from "./SimulationResult.ts";

export class SimulationRunner {
  private readonly spinEngine: SpinEngine;

  constructor(spinEngine: SpinEngine) {
    if (!(spinEngine instanceof SpinEngine)) {
      throw new TypeError("spinEngine must be a SpinEngine.");
    }

    this.spinEngine = spinEngine;
  }

  run(totalSpins: number): SimulationResult {
    if (
      typeof totalSpins !== "number" ||
      !Number.isFinite(totalSpins) ||
      !Number.isInteger(totalSpins) ||
      totalSpins <= 0
    ) {
      throw new RangeError(
        `totalSpins must be a positive finite integer; received ${String(totalSpins)}.`,
      );
    }

    let winningSpins = 0;
    let totalReturnedMultiplier = 0;
    let maximumObservedWinMultiplier = 0;

    for (let spinIndex = 0; spinIndex < totalSpins; spinIndex += 1) {
      const returnedMultiplier =
        this.spinEngine.spin().winResult.totalMultiplier;

      totalReturnedMultiplier += returnedMultiplier;

      if (returnedMultiplier > 0) {
        winningSpins += 1;
      }

      if (returnedMultiplier > maximumObservedWinMultiplier) {
        maximumObservedWinMultiplier = returnedMultiplier;
      }
    }

    const losingSpins = totalSpins - winningSpins;
    const estimatedRtpPercentage =
      (totalReturnedMultiplier / totalSpins) * 100;
    const hitRatePercentage = (winningSpins / totalSpins) * 100;
    const averageWinMultiplier =
      winningSpins === 0 ? 0 : totalReturnedMultiplier / winningSpins;

    return new SimulationResult(
      totalSpins,
      winningSpins,
      losingSpins,
      totalReturnedMultiplier,
      estimatedRtpPercentage,
      hitRatePercentage,
      averageWinMultiplier,
      maximumObservedWinMultiplier,
    );
  }
}
