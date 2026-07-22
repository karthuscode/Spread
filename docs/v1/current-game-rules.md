# Current Game Rules

This page is the v1 source of truth for implemented base-game behavior. Math values remain provisional.

## Grid and symbols

- The Grid is 5 columns by 3 rows, containing 15 positions.
- Generated symbols are `MaskedSurgeon`, `Nurse`, `Human2`, `Human3`, `Equipment1`, `Equipment2`, `Equipment3`, and `VirusWild`.
- `InfectedWild` is never generated. It exists only as a runtime infection result.
- Different human symbols do not merge during evaluation.
- `Equipment1`, `Equipment2`, and `Equipment3` are also distinct symbols.

## Paylines and matches

All five fixed paylines are intended to be active:

| ID | Name | Row indexes from columns 0–4 |
| ---: | --- | --- |
| 1 | Middle row | `[1, 1, 1, 1, 1]` |
| 2 | Top row | `[0, 0, 0, 0, 0]` |
| 3 | Bottom row | `[2, 2, 2, 2, 2]` |
| 4 | V | `[0, 1, 2, 1, 0]` |
| 5 | Inverted V | `[2, 1, 0, 1, 2]` |

- Wins are evaluated left to right and must begin on the first reel.
- Only the consecutive prefix before the first mismatch counts.
- The minimum winning length is three positions.
- `VirusWild` and `InfectedWild` substitute for paying symbols.
- Leading Wilds resolve to the first following paying symbol.
- `MaskedSurgeon` is evaluated as a normal paying symbol despite its infection immunity.
- Neither Wild type has a standalone normal payline payout.
- An all-Wild payline currently returns no normal payline win.
- Payline evaluation identifies matches only; it does not perform Paytable lookup or payout calculation.

## Paytable

- Only paying symbols can be used for Paytable lookup; `VirusWild` and `InfectedWild` are excluded.
- Supported match counts are exactly 3, 4, and 5.
- The Paytable stores provisional payout multipliers, not currency values.
- Paytable configuration is validated for complete paying-symbol and match-count coverage and positive finite integer multipliers.
- Configuration is copied and protected from mutation when a Paytable is constructed.
- Paytable lookup returns a configured multiplier only. It does not know about bets or balances and does not calculate total wins.
- `WinCalculator`, which will combine evaluated matches with Paytable multipliers, is not yet implemented.

## Infection

- Only `VirusWild` spreads infection.
- `InfectedWild` never spreads infection.
- A `VirusWild` checks orthogonally adjacent positions: left, right, up, and down.
- Diagonal positions are not affected.
- Vulnerable humans (`Nurse`, `Human2`, and `Human3`) become `InfectedWild`.
- `MaskedSurgeon` and equipment symbols are immune.
- Infection targets are determined from the pre-infection Grid state.
- Newly created `InfectedWild` symbols do not cause chain reactions in the base game.
- Overlapping targets from multiple `VirusWild` symbols are transformed once.

## Provisional math

The generated-symbol weights listed in [Implemented features](implemented-features.md#weighted-symbol-selection) and the current Paytable multipliers are implemented but provisional. Neither weights nor payouts should be treated as balanced until simulation and tuning are complete.

The intended MVP uses all five paylines and a total-bet model rather than independently configurable line bets. This is a **current design direction**, not implemented betting behavior.

See [Balancing notes](balancing-notes.md) for targets and open math questions.
