# Spread v1 Documentation

Spread is a 5×3 slot game engine and portfolio project written in TypeScript. Its purpose is learning, technical development, experimentation, combining creative ideas, and building a distinctive slot game. Infection is the central mechanic.

The project favors mechanical coherence and polish over accumulating unrelated features. New mechanics should reinforce the infection theme and remain understandable within the base game.

## Current status

**Implemented:** symbol metadata, provisional weighted symbol selection, 5×3 Grid generation, one-step orthogonal infection, five fixed paylines, left-to-right payline match evaluation, type-safe Paytable lookup, normal line-win multiplier calculation, a before/after terminal demo, and deterministic automated tests.

**Planned next:** define `SpinResult`, orchestrate a complete spin, and build simulation tools.

**Not implemented:** currency or bet-based payout calculation, betting and balance behavior, RTP or volatility simulation, complete spin orchestration, graphical presentation, bonus games, and special all-Wild outcomes.

The engine is a work in progress. Its weights and implemented Paytable values are provisional and are not mathematically validated.

## Project vision

Infection should remain the organizing idea for both mechanics and presentation. Future features should support that theme rather than exist only for feature count.

The long-term visual world should avoid generic casino aesthetics and generic medical realism. It may become stylized, unusual, darkly humorous, surreal, or absurd. The final art style and audio direction are **open design decisions**.

## Documentation index

- [Architecture](architecture.md) — component boundaries and data flow
- [Implemented features](implemented-features.md) — factual current capabilities
- [Current game rules](current-game-rules.md) — v1 source-of-truth behavior
- [Roadmap](roadmap.md) — ordered development milestones
- [Future concepts](future-concepts.md) — experimental ideas outside current gameplay
- [Balancing notes](balancing-notes.md) — provisional math and measurement goals

## Status vocabulary

- **Implemented:** present in the current code and covered by the current behavior.
- **Planned next:** ordered near-term work, not yet implemented.
- **Future concept:** exploratory work with no commitment to final rules.
- **Open design decision:** a question that still requires a decision or evidence.
- **Design target:** an intended outcome that has not yet been validated.
