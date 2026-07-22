export class SimulationResult {
  readonly totalSpins: number;
  readonly winningSpins: number;
  readonly losingSpins: number;
  readonly totalReturnedMultiplier: number;
  readonly estimatedRtpPercentage: number;
  readonly hitRatePercentage: number;
  readonly averageWinMultiplier: number;
  readonly maximumObservedWinMultiplier: number;

  constructor(
    totalSpins: number,
    winningSpins: number,
    losingSpins: number,
    totalReturnedMultiplier: number,
    estimatedRtpPercentage: number,
    hitRatePercentage: number,
    averageWinMultiplier: number,
    maximumObservedWinMultiplier: number,
  ) {
    this.assertPositiveInteger("totalSpins", totalSpins);
    this.assertNonNegativeInteger("winningSpins", winningSpins);
    this.assertNonNegativeInteger("losingSpins", losingSpins);

    if (winningSpins + losingSpins !== totalSpins) {
      throw new RangeError(
        "winningSpins and losingSpins must sum to totalSpins.",
      );
    }

    this.assertNonNegativeFinite(
      "totalReturnedMultiplier",
      totalReturnedMultiplier,
    );
    this.assertNonNegativeFinite(
      "estimatedRtpPercentage",
      estimatedRtpPercentage,
    );
    this.assertNonNegativeFinite("hitRatePercentage", hitRatePercentage);

    if (hitRatePercentage > 100) {
      throw new RangeError(
        `hitRatePercentage must not exceed 100; received ${hitRatePercentage}.`,
      );
    }

    this.assertNonNegativeFinite("averageWinMultiplier", averageWinMultiplier);
    this.assertNonNegativeFinite(
      "maximumObservedWinMultiplier",
      maximumObservedWinMultiplier,
    );

    this.totalSpins = totalSpins;
    this.winningSpins = winningSpins;
    this.losingSpins = losingSpins;
    this.totalReturnedMultiplier = totalReturnedMultiplier;
    this.estimatedRtpPercentage = estimatedRtpPercentage;
    this.hitRatePercentage = hitRatePercentage;
    this.averageWinMultiplier = averageWinMultiplier;
    this.maximumObservedWinMultiplier = maximumObservedWinMultiplier;

    Object.freeze(this);
  }

  private assertPositiveInteger(name: string, value: number): void {
    if (!Number.isFinite(value) || !Number.isInteger(value) || value <= 0) {
      throw new RangeError(
        `${name} must be a positive finite integer; received ${value}.`,
      );
    }
  }

  private assertNonNegativeInteger(name: string, value: number): void {
    if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0) {
      throw new RangeError(
        `${name} must be a non-negative finite integer; received ${value}.`,
      );
    }
  }

  private assertNonNegativeFinite(name: string, value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(
        `${name} must be a non-negative finite number; received ${value}.`,
      );
    }
  }
}
