# Roadmap

The roadmap prioritizes a complete, measurable base-game loop before presentation expansion or speculative mechanics.

## Immediate next milestone

**Planned next:** implement `SpinEngine` to orchestrate the completed generation, infection, evaluation, win-calculation, and result components.

## Short-term engine milestones

Paytable lookup, `WinCalculator`, and `SpinResult` are complete. The remaining intended order is:

1. Implement `SpinEngine`, including pre-infection and post-infection snapshot creation.
2. Extend the terminal demo to show complete spin results.

The planned full data flow is documented in [Architecture](architecture.md#planned-full-spin-flow).

## Simulation and balancing milestone

After the full spin path is deterministic and tested:

3. Implement large-sample simulation.
4. Measure RTP.
5. Measure hit frequency.
6. Measure average and median win.
7. Measure payout distribution.
8. Measure volatility.
9. Measure maximum observed win.
10. Tune symbol weights and paytable values.

Simulation results, rather than intuition alone, must drive final math. See [Balancing notes](balancing-notes.md).

## Later presentation milestones

Once the base engine and math are coherent, later work may include richer terminal reporting, a graphical client, animation, sound, and asset production. These are not current engine milestones.

The visual goal is distinctiveness rather than generic casino presentation or generic medical realism, but the final art and audio direction remain open decisions.

## Scope discipline

Bonus games, Wild Wheel behavior, chain reactions, and additional infection mechanics are [future concepts](future-concepts.md), not committed next work. They should be evaluated only after the base game can be simulated and balanced.
