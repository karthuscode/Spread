# Balancing Notes

Spread's current math is provisional. No claim of balance, production readiness, certified fairness, or target achievement should be inferred from the current weights or draft paytable.

## Current targets and status

| Item | Status |
| --- | --- |
| Maximum win: 5000× | **Design target**; not mathematically validated |
| Target RTP | **Open design decision:** TBD |
| Target volatility | **Open design decision:** TBD |
| Generated-symbol weights | Implemented but provisional |
| Paytable values | Implemented and available through lookup, but provisional; win calculation is not implemented |
| Five active paylines | Current design direction |
| Total-bet model | Current MVP design direction; not implemented |

The intended MVP bet model treats the selected stake as a total bet across all five active paylines rather than offering independently configurable line bets. Its accounting and payout semantics must be finalized with the paytable and are not current engine behavior.

## Required simulation measurements

Large-sample simulation should measure:

- RTP;
- hit frequency;
- average win;
- median win;
- payout distribution;
- volatility;
- maximum observed win;
- generated `VirusWild` frequency;
- infection frequency and number of transformed symbols;
- all-Wild payline frequency, even before a special award exists.

Final weights and paytable values must be based on measured behavior rather than intuition alone. Confidence and sample size should be recorded alongside results, especially for rare events.

## Maximum-win target

The 5000× figure is a **design target**, not a property of the current engine. The exact maximum-win construction is an **open design decision**. It depends on finalized paytable values, bet semantics, simultaneous line wins, and any future special outcomes.

## Wild Wheel questions

The Wild Wheel is a [future concept](future-concepts.md#wild-wheel), not part of current RTP. Before adopting it, simulation must establish:

- the frequency of a five-Wild payline;
- the frequency of multiple qualifying paylines in one spin;
- the RTP contribution at each premium-symbol probability;
- the RTP and volatility effects of candidate multipliers;
- whether an at-most-one-event rule produces clearer and safer math than multiple events.

Example multipliers of 3×, 5×, and 7× are placeholders, not balancing commitments.

## Open math decisions

- Exact paytable values.
- Final generated-symbol weights.
- Target RTP.
- Target volatility.
- Exact maximum-win construction.
- Premium symbol selection probabilities.
- Wild Wheel multiplier probabilities and values.

The implementation order for resolving these questions is in the [Roadmap](roadmap.md#simulation-and-balancing-milestone).
