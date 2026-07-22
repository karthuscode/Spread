# Spread

A TypeScript slot-game engine built as a long-term portfolio project.

## Current milestone

- ✅ Engine foundation
- ✅ Infection mechanic
- ✅ Payline evaluation
- ✅ Win calculation
- ✅ Complete spin orchestration
- ✅ Terminal demonstration
- ✅ Large-sample simulation and estimated RTP
- 🚧 Payout distribution and volatility measurement

## Terminal demo

Run one complete base-game spin:

```bash
npm run demo
```

The demo prints the initial Grid, infection summary, final Grid, winning paylines, and total multiplier. Formatting remains separate from the engine.

## Simulation

Run the default 1,000,000-spin simulation:

```bash
npm run simulate
```

Provide a custom positive spin count after `--`:

```bash
npm run simulate -- 100000
```

The simulation assumes one wager unit per spin. It estimates RTP as `totalReturnedMultiplier / totalSpins × 100`, hit rate as `winningSpins / totalSpins × 100`, and the average winning-spin multiplier as `totalReturnedMultiplier / winningSpins` (or `0` when there are no wins).

Only aggregate counters are retained; individual spin results are not stored. Results are sampled estimates, so independent runs may differ. The maximum observed multiplier is not necessarily the theoretical maximum, and the first measurements are a provisional baseline rather than final balancing or regulatory-grade validation. Symbol-weight and Paytable tuning will follow further measurement.

## Documentation

See:

docs/v1/
