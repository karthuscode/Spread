Win Examples

This document defines basic examples of how paylines and Wild substitution are evaluated.

Symbol Legend

* S — Masked Surgeon
* N — Nurse
* H2 — Human 2
* H3 — Human 3
* T — Medical equipment symbol
* W — Virus Wild

Different human symbols are treated as separate paying symbols.

For example, the Nurse and Human 2 do not match each other.

Example 1 — Three Matching Symbols

N - N - N - T - H2

Result:

3 Nurse symbols

The first three consecutive reels contain the same symbol.

Example 2 — Four Matching Symbols

H2 - H2 - H2 - H2 - T

Result:

4 Human 2 symbols

The equipment symbol on the fifth reel ends the combination.

Example 3 — Wild Substitution

N - W - N - T - H3

Result:

3 Nurse symbols

The Virus Wild substitutes for the Nurse symbol.

Example 4 — Masked Surgeon With Wilds

S - W - W - S - T

Result:

4 Masked Surgeon symbols

The Virus Wild can substitute for the Masked Surgeon even though the Masked Surgeon is immune to infection.

Example 5 — Different Human Symbols Do Not Match

N - W - H2 - T - H3

Result:

No win

The Wild can substitute for either the Nurse or Human 2, but it cannot make the Nurse and Human 2 count as the same symbol.

Example 6 — Combination Must Start on the First Reel

T - N - N - N - N

Result:

No Nurse win

The Nurse combination starts on the second reel.

Payline wins must begin on the first reel.

Example 7 — Combination Must Be Consecutive

H3 - H3 - T - H3 - H3

Result:

No win

The medical equipment symbol interrupts the Human 3 combination.

Symbols after the interruption are not included.

Example 8 — Wild at the Beginning

W - N - N - T - H2

Result:

3 Nurse symbols

The Wild on the first reel substitutes for the Nurse.

Example 9 — Multiple Possible Wild Interpretations

W - W - S - S - T

Possible interpretation:

4 Masked Surgeon symbols

The game should choose the valid interpretation with the highest payout.

Example 10 — All Wild Combination

W - W - W - W - W

The Virus Wild currently has no separate payout.

The game should evaluate the Wilds as the regular symbol combination that produces the highest valid payout.

The exact handling of an all-Wild payline may be reviewed later during paytable design.

Evaluation Rules

For each active payline:

1. Evaluation starts on the first reel.
2. Symbols are checked from left to right.
3. At least three consecutive matching symbols are required.
4. Virus Wild symbols may substitute for any regular paying symbol.
5. Different human symbols do not match each other.
6. The Masked Surgeon may form wins with Virus Wild symbols.
7. Only the highest valid win is paid for a single payline.
