# Architecture

Spread is a strict TypeScript domain project using ES modules. Source code is organized by responsibility under `src/`, with automated tests under `tests/` and a terminal-only demonstration under `src/demo/`.

## Implemented components

| Component | Responsibility |
| --- | --- |
| Symbol model | Defines stable `SymbolId` values and metadata for category, infection vulnerability, Wild behavior, and infection spreading. |
| Provisional weights | Defines positive integer weights for symbols that may be generated. `InfectedWild` is excluded by the generated-symbol type. |
| `WeightedSymbolSelector` | Maps an injected `[0, 1)` random value into cumulative weighted ranges in configured entry order. |
| `ReelGenerator` | Requests exactly 15 selections and constructs a row-major `Grid`. |
| `Grid` | Owns the mutable 5×3 symbol state, provides coordinate access and replacement, and returns immutable detached snapshots. |
| `InfectionEngine` | Finds original `VirusWild` positions from a pre-infection snapshot and applies one-step orthogonal infection. |
| Payline definitions | Store five immutable row paths in evaluation order. |
| `PaylineEvaluator` | Reads the Grid without mutation and returns ordered matches of at least three consecutive symbols from the first reel. |
| `Paytable` | Validates and owns an immutable copy of provisional payout multipliers, then looks them up by paying symbol and a match count of 3, 4, or 5. |
| `WinCalculator` | Converts ordered `PaylineEvaluationResult` objects into immutable line-win multiplier results using Paytable lookup. |
| `SpinResult` | Stores immutable pre-infection and post-infection Grid snapshots with the `WinResult` calculated from the final state. |
| `SpinEngine` | Orchestrates one complete base-game spin through generation, snapshots, infection, final-state evaluation, win calculation, and result construction. |
| Terminal demo | Instantiates `SpinEngine`, executes one spin, and formats the returned snapshots, infection summary, paylines, and multiplier outside the engine. |
| `SimulationRunner` | Calls only `SpinEngine.spin()` repeatedly and incrementally aggregates return and hit statistics without retaining individual spin results. |
| `SimulationResult` | Stores immutable aggregate counts, multiplier totals, estimated percentages, average winning-spin multiplier, and maximum observed multiplier. |
| Simulation demo | Constructs the real engine, times one aggregate simulation, and formats the final report outside the simulation and engine layers. |

Empty placeholders currently exist for broader game, balance, and statistics responsibilities. Their presence is not an implementation of those systems.

## Current engine flow

```text
Generated symbol weights
→ WeightedSymbolSelector
→ ReelGenerator
→ Grid
→ InfectionEngine
→ PaylineEvaluator
→ PaylineEvaluationResult[]
→ WinCalculator ← Paytable
→ WinResult
→ SpinResult
```

`SpinEngine` owns this sequence but none of its game rules. The selector owns probability mapping, the generator owns board construction, the Grid owns symbol state and snapshot creation, infection performs the permitted transformation, payline evaluation describes matches, and win calculation converts them to multipliers. Each boundary has a narrow responsibility.

`Paytable` is not a sequential Grid-processing step. It is an independent, passive data dependency queried by `WinCalculator`.

## State ownership

`Grid` copies its row-major constructor input. Consumers read positions through `getSymbol(column, row)` and may use `replaceSymbol` for controlled state changes. `snapshot()` returns frozen rows detached from later Grid mutation.

`InfectionEngine` deliberately mutates and returns the supplied Grid, but first takes a snapshot so every target is derived from the same pre-infection state. `PaylineEvaluator` only uses the public coordinate API and does not mutate the Grid. Its result objects and result collection are readonly and frozen.

`WinCalculator` does not mutate evaluation results or the Paytable. It creates frozen `LineWin` objects in evaluation order, freezes the returned collection and `WinResult`, and asks the Paytable for each multiplier on every calculation.

`SpinResult` preserves the immutable `GridSnapshot` values and `WinResult` supplied to it and freezes its own instance. It performs no generation, infection, evaluation, payout lookup, or orchestration.

`SpinEngine` retains no per-spin state. It receives its generator, infection engine, evaluator, and win calculator through constructor injection and lets dependency failures propagate.

## Implemented full spin flow

```text
SpinEngine
  → WeightedSymbolSelector / ReelGenerator
  → Grid
  → initial GridSnapshot before infection
  → InfectionEngine
  → final GridSnapshot after infection
  → PaylineEvaluator
  → PaylineEvaluationResult[]
  → WinCalculator ← Paytable
  → WinResult
  → SpinResult(initialGrid, finalGrid, winResult)
```

`SpinEngine` calls `Grid.snapshot()` immediately after generation and again after infection. It evaluates paylines only from the post-infection Grid returned by `InfectionEngine`, passes those exact results to `WinCalculator`, and assembles `SpinResult`. It performs no symbol selection, infection, matching, payout, betting, simulation, or presentation calculations of its own.

## Simulation flow

```text
SimulationRunner
  → SpinEngine.spin() repeated N times
  → incremental aggregate counters
  → SimulationResult
  → simulation demo formatting and elapsed time
```

`SimulationRunner` has `SpinEngine` as its only gameplay dependency. It uses O(1) aggregate memory, does not retain a collection of `SpinResult` objects, and performs no logging or formatting. `SimulationResult` contains no timing data. Timing, thousands separators, percentage precision, and multiplier precision belong to the demo layer.

## Evaluation and payout separation

`PaylineEvaluator` identifies the payline, resolved paying symbol, and consecutive match count. It does not know bets, Paytable multipliers, or currency values. `Paytable` independently maps a paying symbol and a supported match count to a multiplier. It stores no currency values or betting data and does not calculate individual or total wins. `WinCalculator` consumes `PaylineEvaluationResult` objects, queries the Paytable, and returns a `WinResult` containing ordered immutable `LineWin` entries and their summed `totalMultiplier`. This separation keeps matching rules and provisional math independently testable.

Each `LineWin` contains `paylineId`, `symbolId`, `matchCount`, and `multiplier`. `WinCalculator` has no responsibility for bets, currency, balances, RTP, Grid state, infection, bonuses, or special outcomes.

The Paytable lookup API accepts only paying symbols, so `VirusWild` and `InfectedWild` cannot receive standalone normal payline payouts. Its complete configuration covers match counts 3, 4, and 5. Construction rejects missing or unsupported symbols and match counts and multipliers that are not positive finite integers. The constructor copies and freezes every entry, protecting behavior from later input mutation and preventing callers from mutating its internal state.

Special outcomes should also remain outside normal payline evaluation. For example, a future all-Wild event has trigger and award rules distinct from an ordinary paying-symbol match. A future `SpecialOutcomeDetector` or equivalent component should identify such events, while `PaylineEvaluator` continues to return only normal line matches. See [Future concepts](future-concepts.md).

## Related documentation

- [Implemented features](implemented-features.md)
- [Current game rules](current-game-rules.md)
- [Roadmap](roadmap.md)
