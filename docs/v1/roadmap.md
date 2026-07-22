# Roadmap

The roadmap prioritizes a complete, measurable base-game loop before presentation expansion or speculative mechanics.

## Immediate next milestone

**Planned next:** extend measurement to payout distribution and volatility while preserving the current baseline configuration.

## Short-term engine milestones

Paytable lookup, `WinCalculator`, `SpinResult`, `SpinEngine` orchestration, complete terminal reporting, large-sample simulation, estimated RTP, hit rate, average winning-spin multiplier, and maximum observed multiplier are implemented.

The implemented full data flow is documented in [Architecture](architecture.md#implemented-full-spin-flow).

## Simulation and balancing milestone

After the full spin path is deterministic and tested:

1. Measure median win and payout distribution.
2. Measure variance and volatility.
3. Record repeat-run stability and sample sizes.
4. Tune symbol weights and Paytable values from measured evidence.

Simulation results, rather than intuition alone, must drive final math. See [Balancing notes](balancing-notes.md).

## Later presentation milestones

Once the base engine and math are coherent, later work may include a graphical client, animation, sound, UI, and asset production. These presentation-layer concerns are separate from the engine core and are not current engine milestones.

The visual goal is distinctiveness rather than generic casino presentation or generic medical realism, but the final art and audio direction remain open decisions.

## Scope discipline

Bonus games, Wild Wheel behavior, chain reactions, and additional infection mechanics are [future concepts](future-concepts.md), not committed next work. They should be evaluated only after the base game can be simulated and balanced.
