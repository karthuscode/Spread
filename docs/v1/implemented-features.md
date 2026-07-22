# Implemented Features

This page describes only behavior present in the current codebase.

## TypeScript foundation

The project uses strict TypeScript, Node.js ES modules, Node's test runner, and a no-emit type-checking configuration. Domain responsibilities are separated into symbol, grid, generation, infection, and payline modules.

## Symbol model

The symbol set contains `MaskedSurgeon`, `Nurse`, `Human2`, `Human3`, `Equipment1`, `Equipment2`, `Equipment3`, `VirusWild`, and `InfectedWild`.

Each symbol has immutable definition metadata:

- category: human, equipment, or Wild;
- whether it can be infected;
- whether it acts as a Wild;
- whether it can spread infection.

Generated symbols use a narrower type that excludes `InfectedWild`. It is a runtime-only transformation result and is absent from generated-symbol weights.

## Grid

`Grid` has five columns, three rows, and exactly 15 positions. Its constructor accepts a row-major sequence and copies it. It supports validated `(column, row)` access and symbol replacement.

Snapshots are immutable three-row views detached from mutable Grid state. Neither constructor input nor a previously captured snapshot changes when the Grid changes later.

## Payline definitions

Five fixed paylines are implemented in documented order: middle row, top row, bottom row, V, and inverted V. The payline collection and each row path are frozen.

## Weighted symbol selection

The provisional generated-symbol weights are:

| Symbol | Weight |
| --- | ---: |
| MaskedSurgeon | 4 |
| Nurse | 7 |
| Human2 | 10 |
| Human3 | 10 |
| Equipment1 | 14 |
| Equipment2 | 14 |
| Equipment3 | 14 |
| VirusWild | 3 |

`WeightedSymbolSelector` constructs cumulative ranges in the supplied entry order. It accepts an injected random source and requires each result to be finite and within `[0, 1)`. It rejects empty configurations and weights that are zero, negative, fractional, `NaN`, or infinite. Every configured weight must be a positive finite integer.

## Grid generation

`ReelGenerator` uses the selector once for every Grid position, producing exactly 15 generated symbols in row-major order. Injected selection randomness makes generation deterministic in tests. Each call returns a separate `Grid` instance, and a newly generated Grid cannot contain `InfectedWild`.

## Infection

`InfectionEngine` evaluates infection from a pre-infection snapshot. Only original `VirusWild` positions spread infection, and they inspect left, right, up, and down within Grid boundaries. Diagonals are ignored.

Vulnerability comes from symbol metadata. `Nurse`, `Human2`, and `Human3` may become `InfectedWild`; `MaskedSurgeon`, equipment, `VirusWild`, and existing `InfectedWild` remain unchanged. Newly created `InfectedWild` symbols do not spread, so the base game has no infection chain reactions. Targets reached by multiple VirusWild symbols are de-duplicated and replaced once.

## Payline evaluation

`PaylineEvaluator` reads every configured line from left to right through the Grid API. A match must start on the first reel and contain at least three consecutive positions. Both Wild types substitute for an exact paying symbol.

Leading Wilds resolve to the first following non-Wild paying symbol. An all-Wild line returns no normal payline win. `MaskedSurgeon` behaves as a normal paying symbol during evaluation, while every human and equipment symbol retains its distinct identity.

Winning results contain a one-based payline identifier, resolved paying `SymbolId`, and match count. Results preserve payline order and do not include payouts.

## Paytable

`Paytable` is a pure data and lookup component. Its type-safe API accepts only the seven paying symbols and match counts 3, 4, or 5. `VirusWild` and `InfectedWild` are excluded because neither has a standalone normal payline payout.

The configuration stores payout multipliers rather than currency values and has no knowledge of bets or balances. Construction requires every paying symbol and every supported match count, rejects unsupported entries, and requires each multiplier to be a positive finite integer. It copies and freezes the supplied entries so later input mutation cannot change lookup behavior and callers cannot mutate internal state.

The default configuration contains the current provisional multipliers. These values are not mathematically balanced and must be tuned through simulation. Paytable lookup returns one configured multiplier and does not calculate line wins or total wins.

## Win calculation

`WinCalculator` consumes the ordered `PaylineEvaluationResult` objects returned by `PaylineEvaluator` and uses the Paytable as a passive dependency. It asks the Paytable for every line multiplier and returns an immutable `WinResult`.

Each immutable `LineWin` contains the one-based `paylineId`, paying `symbolId`, supported `matchCount`, and configured `multiplier`. `WinResult` contains the ordered `lineWins` collection and `totalMultiplier`, which is only the sum of normal line-win multipliers.

The calculator does not handle bets, currency, balances, RTP, Grid state, infection, bonuses, or special outcomes.

## Spin result

`SpinResult` is an immutable domain object representing one completed spin. It stores an immutable pre-infection `GridSnapshot`, an immutable post-infection `GridSnapshot`, and the `WinResult` calculated from the final Grid state. Snapshot contents may be identical.

The object preserves supplied snapshot and win-result values and freezes itself. It performs no reel generation, infection, payline evaluation, payout lookup, or orchestration.

## Spin orchestration

`SpinEngine` orchestrates one complete base-game spin using constructor-injected `ReelGenerator`, `InfectionEngine`, `PaylineEvaluator`, and `WinCalculator` dependencies. It generates a Grid, captures the immutable initial snapshot, applies infection, captures the immutable final snapshot, evaluates only the final post-infection Grid, calculates normal line-win multipliers, and returns `SpinResult`.

The service contains no game-rule calculations and does not instantiate hidden default dependencies. It does not call random sources directly, retain per-spin state, log, or handle betting, simulation, presentation, bonuses, or special outcomes. Dependency errors propagate to the caller.

## Terminal demo

`npm run demo` constructs the existing engine with `Math.random`, provisional symbol weights, and the default provisional Paytable, then executes exactly one complete spin. It prints a title, initial Grid, infection summary, final Grid, winning paylines, and total multiplier.

Grid labels, infection comparison, no-win messaging, and all terminal formatting remain in the demo layer. The engine contains no output or presentation logic. The earlier `npm run demo:grid` command remains available for the narrower generation-and-infection view.

## Simulation and estimated RTP

`SimulationRunner` synchronously executes `SpinEngine.spin()` for any positive finite integer spin count. For each spin it reads only `winResult.totalMultiplier` and incrementally updates total spins, winning and losing spins, total returned multiplier, and the maximum observed multiplier. It retains no array of individual spin results and uses O(1) aggregate memory.

`SimulationResult` is an immutable passive object containing those counters plus estimated RTP percentage, hit-rate percentage, average winning-spin multiplier, and maximum observed win multiplier. One wager unit is assumed per spin. RTP is estimated as `(totalReturnedMultiplier / totalSpins) × 100`; hit rate is `(winningSpins / totalSpins) × 100`; average winning-spin multiplier is `totalReturnedMultiplier / winningSpins`, or `0` without wins.

`npm run simulate` runs the real complete engine for 1,000,000 spins. A custom count can be supplied with `npm run simulate -- 100000`. Elapsed time and decimal formatting exist only in the demo layer.

Simulation results are sample estimates and independent runs may differ. `maximumObservedWinMultiplier` is not a theoretical maximum. Current measurements provide a provisional baseline, not regulatory-grade validation or final balancing. Payout distribution, volatility, and automatic tuning are not implemented.

## Automated validation

Deterministic tests cover the Grid, symbol metadata, paylines, weighted selection boundaries and validation, generation, infection, payline evaluation, Paytable lookup and validation, WinCalculator transformations, SpinResult construction, complete spin orchestration, terminal formatting, simulation aggregation and invariants, and simulation report formatting and CLI parsing. Type checking is available through `npm run typecheck`.

For rules rather than implementation detail, see [Current game rules](current-game-rules.md). For missing systems, see the [Roadmap](roadmap.md).
