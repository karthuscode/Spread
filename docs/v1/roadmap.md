# Roadmap

The roadmap prioritizes a complete, measurable base-game loop before presentation expansion or speculative mechanics.

## Immediate next milestone

**Planned next:** implement `WinCalculator`. It should combine resolved paying symbols and match counts from `PaylineEvaluator` with provisional multipliers from the implemented Paytable, without adding bet or presentation concerns to either lookup or evaluation.

## Short-term engine milestones

The Paytable data structure and lookup are complete. The remaining intended order is:

1. Implement `WinCalculator` and convert `PaylineEvaluator` results into payout multipliers.
2. Implement `SpinResult`.
3. Implement full spin orchestration.
4. Extend the terminal demo to show complete spin results.

The planned full data flow is documented in [Architecture](architecture.md#planned-full-spin-flow).

## Simulation and balancing milestone

After the full spin path is deterministic and tested:

5. Implement large-sample simulation.
6. Measure RTP.
7. Measure hit frequency.
8. Measure average and median win.
9. Measure payout distribution.
10. Measure volatility.
11. Measure maximum observed win.
12. Tune symbol weights and paytable values.

Simulation results, rather than intuition alone, must drive final math. See [Balancing notes](balancing-notes.md).

## Later presentation milestones

Once the base engine and math are coherent, later work may include richer terminal reporting, a graphical client, animation, sound, and asset production. These are not current engine milestones.

The visual goal is distinctiveness rather than generic casino presentation or generic medical realism, but the final art and audio direction remain open decisions.

## Scope discipline

Bonus games, Wild Wheel behavior, chain reactions, and additional infection mechanics are [future concepts](future-concepts.md), not committed next work. They should be evaluated only after the base game can be simulated and balanced.
