import { InfectionEngine } from "../infection/InfectionEngine.ts";
import { PaylineEvaluator } from "../paylines/PaylineEvaluator.ts";
import { ReelGenerator } from "../reel-generator/ReelGenerator.ts";
import { WinCalculator } from "../win/WinCalculator.ts";
import { SpinResult } from "./SpinResult.ts";

export class SpinEngine {
  private readonly reelGenerator: ReelGenerator;
  private readonly infectionEngine: InfectionEngine;
  private readonly paylineEvaluator: PaylineEvaluator;
  private readonly winCalculator: WinCalculator;

  constructor(
    reelGenerator: ReelGenerator,
    infectionEngine: InfectionEngine,
    paylineEvaluator: PaylineEvaluator,
    winCalculator: WinCalculator,
  ) {
    if (!(reelGenerator instanceof ReelGenerator)) {
      throw new TypeError("reelGenerator must be a ReelGenerator.");
    }

    if (!(infectionEngine instanceof InfectionEngine)) {
      throw new TypeError("infectionEngine must be an InfectionEngine.");
    }

    if (!(paylineEvaluator instanceof PaylineEvaluator)) {
      throw new TypeError("paylineEvaluator must be a PaylineEvaluator.");
    }

    if (!(winCalculator instanceof WinCalculator)) {
      throw new TypeError("winCalculator must be a WinCalculator.");
    }

    this.reelGenerator = reelGenerator;
    this.infectionEngine = infectionEngine;
    this.paylineEvaluator = paylineEvaluator;
    this.winCalculator = winCalculator;
  }

  spin(): SpinResult {
    const generatedGrid = this.reelGenerator.generate();
    const initialGrid = generatedGrid.snapshot();
    const finalGridState = this.infectionEngine.infect(generatedGrid);
    const finalGrid = finalGridState.snapshot();
    const evaluationResults = this.paylineEvaluator.evaluate(finalGridState);
    const winResult = this.winCalculator.calculate(evaluationResults);

    return new SpinResult(initialGrid, finalGrid, winResult);
  }
}
