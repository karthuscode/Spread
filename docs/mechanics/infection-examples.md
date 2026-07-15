Infection Examples

This document contains simple examples of the infection mechanic.

Symbol Legend

* H — infectable human
* M — Masked Person
* T — tool symbol
* V — Virus Wild
* W — Wild created by infection

Example 1 — One Human Is Infected

Before infection:

T H T H T
H V T M H
T T H T H

After infection:

T W T H T
H V T M H
T T H T H

The human directly above the Virus Wild becomes a Wild.

Example 2 — Multiple Humans Are Infected

Before infection:

T H T H T
H V H M H
T H T T H

After infection:

T W T H T
W V W M H
T W T T H

The Virus Wild infects the humans above, below, left, and right.

Example 3 — Masked Person Is Immune

Before infection:

T M T H T
H V T H H
T H T T H

After infection:

T M T H T
W V T H H
T W T T H

The Masked Person remains unchanged.

Example 4 — Tool Symbols Cannot Be Infected

Before infection:

T T T H T
T V H M H
T H T T H

After infection:

T T T H T
T V W M H
T W T T H

Tool symbols remain unchanged.

Example 5 — No Chain Reaction

Before infection:

T H H H T
T V H H T
T T T T T

After infection:

T W H H T
T V W H T
T T T T T

The newly created Wild symbols do not infect additional humans in the base game.
