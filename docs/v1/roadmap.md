# Roadmap

The roadmap prioritizes a complete, measurable base-game loop before presentation expansion or speculative mechanics.

## Immediate next milestone

**Planned next:** implement large-sample simulation and begin measuring the provisional game math.

## Short-term engine milestones

Paytable lookup, `WinCalculator`, `SpinResult`, `SpinEngine` orchestration, and complete terminal reporting are implemented.

The implemented full data flow is documented in [Architecture](architecture.md#implemented-full-spin-flow).

## Simulation and balancing milestone

After the full spin path is deterministic and tested:

1. Implement large-sample simulation.
2. Measure RTP.
3. Measure hit frequency.
4. Measure average and median win.
5. Measure payout distribution.
6. Measure volatility.
7. Measure maximum observed win.
8. Tune symbol weights and paytable values.

Simulation results, rather than intuition alone, must drive final math. See [Balancing notes](balancing-notes.md).

## Later presentation milestones

Once the base engine and math are coherent, later work may include a graphical client, animation, sound, UI, and asset production. These presentation-layer concerns are separate from the engine core and are not current engine milestones.

The visual goal is distinctiveness rather than generic casino presentation or generic medical realism, but the final art and audio direction remain open decisions.

## Scope discipline

Bonus games, Wild Wheel behavior, chain reactions, and additional infection mechanics are [future concepts](future-concepts.md), not committed next work. They should be evaluated only after the base game can be simulated and balanced.
