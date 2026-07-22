# Future Concepts

Everything on this page is outside the currently implemented base game. These ideas are exploratory and must not be read as finalized rules.

## Wild Wheel

**Status: Future concept / experimental mechanic**

### Trigger concept

An entire payline containing five Wild symbols may trigger a special Wild Wheel event. Current `PaylineEvaluator` behavior remains unchanged: an all-Wild line produces no normal payline win.

### Possible behavior

- The event may select one premium paying symbol.
- The all-Wild line may then be valued as five instances of that symbol.
- A later version may also select an example multiplier such as 3×, 5×, or 7×. These values are not final.
- The engine should determine the result; a future graphical wheel should only visualize an already determined outcome.

This trigger should be handled separately from normal payline evaluation. A future `SpecialOutcomeDetector` or equivalent responsibility could detect and resolve special-event eligibility without putting payout or event logic into `PaylineEvaluator`.

### Open design decisions

- Whether multiple all-Wild paylines in one spin trigger one event or multiple events.
- The currently preferred direction is at most one Wild Wheel event per spin, but this is not decided.
- Premium symbol selection probabilities.
- Multiplier probabilities.
- Whether multipliers should be 3×, 5×, and 7× or use different values.

Trigger frequency and RTP contribution must be measured before the feature is balanced or accepted.

## Bonus Game

**Status: Future concept**

A bonus game is planned eventually but is not a current development priority. It should expand the infection theme. Possible directions include chain reactions, persistent infection, spreading states, mutation, or another infection-related system. Final trigger, state, award, and completion rules are deliberately undefined.

## Additional mechanics

**Status: Future concept**

Additional mechanics may coexist with infection if they preserve mechanical clarity and support the theme. Unusual or absurd ideas are welcome, but the base game should not become overcrowded. No additional mechanic is currently committed.

## Visual and audio direction

**Status: Future concept with open design decisions**

The intended visual world may become stylized, unusual, darkly humorous, surreal, or absurd. It should avoid generic casino aesthetics and generic medical realism. No final art style or audio direction has been selected.

## Other open design decisions

- Bonus game structure.
- Additional infection mechanics.
- Exact Wild Wheel trigger handling.
- One or multiple Wild Wheel events per spin.
- Final visual style.
- Final audio direction.

Near-term committed work is listed separately in the [Roadmap](roadmap.md).

