# Roadmap

The roadmap prioritizes a complete, measurable base-game loop before presentation expansion or speculative mechanics.

## Immediate next milestone

**Planned next:** extend the terminal demo to display complete `SpinResult` output from the implemented base-game engine.

## Short-term engine milestones

Paytable lookup, `WinCalculator`, `SpinResult`, and `SpinEngine` orchestration are complete. The remaining intended order is:

1. Extend the terminal demo to show complete spin results.

The implemented full data flow is documented in [Architecture](architecture.md#implemented-full-spin-flow).

## Simulation and balancing milestone

After the full spin path is deterministic and tested:

2. Implement large-sample simulation.
3. Measure RTP.
4. Measure hit frequency.
5. Measure average and median win.
6. Measure payout distribution.
7. Measure volatility.
8. Measure maximum observed win.
9. Tune symbol weights and paytable values.

Simulation results, rather than intuition alone, must drive final math. See [Balancing notes](balancing-notes.md).

## Later presentation milestones

Once the base engine and math are coherent, later work may include a graphical client, animation, sound, UI, and asset production. These presentation-layer concerns are separate from the engine core and are not current engine milestones.

The visual goal is distinctiveness rather than generic casino presentation or generic medical realism, but the final art and audio direction remain open decisions.

## Scope discipline

Bonus games, Wild Wheel behavior, chain reactions, and additional infection mechanics are [future concepts](future-concepts.md), not committed next work. They should be evaluated only after the base game can be simulated and balanced.
