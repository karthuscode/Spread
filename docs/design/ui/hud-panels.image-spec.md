# HUD Panels — V1 Image Specification

## Production Identity

- **Asset type:** UI / HUD panel set
- **Asset name:** HUD Panels
- **Asset goal:** Minimum readable Balance, Bet, and Win presentation for the first playable graphical prototype
- **Production phase:** UI Production
- **Production status:** Specification Ready
- **Reference canvas:** 1920 × 1080, 16:9

This is a prototype specification, not final interface art. It inherits the project [Visual DNA](../visual-dna.md), [UI Visual Language](ui-visual-language.md), and [Reel Grid Specification](../layout/reel-grid-spec.md). Gameplay geometry and readability take priority over panel artwork.

## Purpose

Create one compact, coherent HUD family for the values required to understand and operate the prototype:

- **Balance** — current available credit;
- **Bet** — wager applied to the next spin; and
- **Win** — amount returned by the most recently resolved spin.

The Bet panel may include simple increase and decrease controls. An Auto Spin element may appear only as a clearly inactive placeholder if needed for layout validation. These optional elements must not delay the playable prototype.

The HUD remains secondary to the reels and primary Spin Button.

## Screen Position

Use one lower HUD band beneath the locked reel opening. At the 1920 × 1080 reference canvas:

| Panel | Bounds | Size |
|---|---|---:|
| Balance | `x = 400–700`, `y = 884–980` | 300 × 96 px |
| Bet | `x = 724–980`, `y = 884–980` | 256 × 96 px |
| Win | `x = 1004–1304`, `y = 884–980` | 300 × 96 px |

These are anchor bounds for the static mockup and first integration pass. Preserve the order **Balance → Bet → Win → Spin** from left to right. Keep at least 24 px between panels and at least 36 px between the Win panel and Spin Button hit area.

Do not move or resize the reel opening to accommodate the HUD.

## Proportions and Spacing

Use low landscape capsules or compressed containment plates. Balance and Win share identical outer dimensions. Bet may be narrower but must share height, corner logic, label placement, and number baseline.

Within each panel:

- outer structural inset: 10–14 px;
- clean content inset: at least 20 px horizontally and 12 px vertically;
- label-to-value gap: 4–8 px;
- minimum label/value separation from hardware: 12 px; and
- minimum gap between a numeric value and Bet controls: 16 px.

Spacing and typography baselines must be mechanically aligned even when outer silhouettes contain controlled asymmetry.

## Shared Visual Language

Use the shared palette roles:

- deep void `#11171A` for the value recess;
- blackened blue-grey `#1B252A` for the main housing;
- oxidized steel `#46585A` and dirty teal `#355B59` for secondary plates;
- cloudy off-white `#C2C1AE` for runtime labels and values;
- warning amber `#D18A2C` for actionable Bet adjustment;
- contaminated yellow-green `#A6C63A` only for a positive Win state; and
- muted magenta `#9A456E` only for a compact error cue.

Light from high viewer-left. Use restrained paint wear and one small contamination event across the complete three-panel family, not one event per panel. Do not use continuous glow, dense bolts, full warning stripes, or decorative pipes.

## Panel Construction

Build every panel from:

1. a quiet outer contact shadow;
2. one painted-steel structural housing;
3. one recessed rubber- or enamel-edged content well;
4. a clean runtime typography area; and
5. no more than one small plate joint or two-bolt group.

Balance, Bet, and Win must read as one system without being a single baked strip. Separate panels allow responsive repositioning and independent state treatment.

Panel artwork must not contain baked labels, currency values, numbers, Bet arrows, or state messages. Runtime typography and icons render above the panel asset.

## Typography Area

Reserve a left-aligned uppercase label line above or beside a larger numeric value. Use one shared sans-serif family with sturdy, slightly condensed forms; keep type clean rather than distressed.

At the reference canvas:

- label cap height target: 16–20 px;
- primary number cap height target: 30–38 px;
- minimum numeric field width: 180 px for Balance and Win;
- minimum numeric field width: 112 px for Bet; and
- consistent tabular numerals are required.

Use localized labels and formatted values at runtime. Never bake punctuation, currency symbols, decimal separators, or placeholder digits into the artwork.

## Number Readability

Primary values must maintain a minimum 4.5:1 contrast ratio against the local recess. Labels may be lower emphasis but must remain readable at a minimum 3:1 contrast ratio.

Use tabular numerals to prevent horizontal jumping as values change. Truncate neither Balance nor Win silently. If a value exceeds the prototype field, reduce the numeric font only to the documented minimum; after that, use a compact notation or expand the runtime field without changing gameplay geometry.

Win is neutral when zero and may use contaminated yellow-green when positive. Colour must support, not replace, the numeric value.

## States

### Default

Panel is powered but quiet. Values are clear, with no decorative glow.

### Updating

Use a brief value change or restrained local emphasis implemented at runtime. The static panel artwork does not change.

### Positive Win

The Win value receives contaminated yellow-green colour and a narrow local highlight. Balance and Bet remain quiet. This state must remain subordinate to symbol and payline feedback.

### Disabled

Reduce value and control contrast while preserving legibility. Bet controls are visibly unavailable. Do not hide the current values.

### Error

Use a small muted-magenta border segment or icon plus a short runtime message. Never rely on colour alone. Do not cover the reels or replace all three values with an error graphic.

### Optional Auto Spin Placeholder

If present, show a compact inactive control with an explicit disabled appearance. It has no active glow and must not suggest implemented behavior.

## Bet Adjustment Controls

If included, place decrease and increase controls inside or immediately beside the Bet panel. Use minus and plus glyphs rendered at runtime.

Each control requires a minimum 44 × 44 px hit area at the reference layout’s CSS-pixel scale. The visible control may be smaller but must remain centered in that hit area. Disabled limits require reduced contrast and non-interactive cursor/behavior.

Do not use tiny arrowheads, rotary knobs, or controls whose shapes resemble decorative bolts.

## Safe Zones

- Keep the locked 1120 × 672 px reel opening completely unobstructed.
- Keep at least 24 px of visual separation below the Reel Frame’s visible lower silhouette.
- Keep all critical text and controls inside the panel content insets.
- Keep wear, contamination, bolts, and seams outside typography areas.
- Keep the lower screen edge at least 40 px from panel artwork.
- Do not enter the Spin Button’s 144 × 144 px hit area.

## Contrast and Visual Hierarchy

The values should be readable in one second, but no neutral panel may approach the contrast, saturation, or glow of an active Spin Button, winning symbol, infection change, or payline highlight.

The hierarchy is:

1. current reel gameplay and feedback;
2. Spin Button;
3. Win value when positive;
4. Balance, Bet, and neutral Win values;
5. panel construction and wear.

## Relationship with the Reel Frame

The HUD appears mounted to the same containment-machine system but remains a separate layer and asset family. Match the Reel Frame’s light direction, plate thickness, rubber recesses, and controlled wear.

Do not attach panels by extending new plates over the gameplay opening. Avoid tangencies with the frame’s warning bars, pipes, and lower hardware. The HUD may sit visually in front of the lower background and below the frame, but it must not force any change to the grid center or opening.

## Relationship with the Spin Button

The three panels form a quiet horizontal lead-in to the primary control. Keep their top and bottom rhythm compatible with the button without imitating its circular silhouette or active glow.

The Bet controls are secondary. Their local contrast, scale, and hit feedback must remain below the Spin Button.

## Responsive Behavior

Scale the complete 16:9 composition uniformly according to the Reel Grid Specification. At narrower supported viewports:

1. preserve the reel opening and Spin Button priority;
2. reduce gaps between HUD panels only to 12 px;
3. reduce panel width while maintaining content insets and minimum type size;
4. stack or group labels above values if necessary; and
5. move optional Bet controls or Auto Spin placeholder before reducing essential value readability.

Do not distort panel artwork. Use 9-slice scaling, SVG geometry, or size-specific exports. Final responsive polish is deferred, but the prototype must remain usable at its selected test resolutions.

## Export Requirements

Store source masters under `assets/source/ui/panels/` and runtime exports under `assets/game/ui/`.

Prepare:

- one transparent panel backing for Balance and Win;
- one transparent Bet backing if its construction differs;
- optional separate inactive control backings;
- a 2× PNG master for textured artwork; and
- a lossless PNG or SVG runtime asset as appropriate.

Use stable lowercase kebab-case filenames such as:

```text
hud-panel-wide.png
hud-panel-bet.png
hud-adjust-control.svg
```

Keep labels, values, plus/minus glyphs, focus indicators, error messages, and state colours programmable. Do not flatten the full HUD into one image.

## Prototype Acceptance Criteria

- Balance, Bet, and Win are visible and correctly ordered.
- All values remain readable at the prototype’s minimum test size.
- Tabular number changes do not shift the surrounding layout.
- Panel artwork never enters the reel opening or Spin Button hit area.
- The family visibly inherits the Reel Frame and UI material language.
- Runtime text remains separate from artwork.
- Default, positive Win, disabled, and error states are distinguishable without relying only on hue.
- Bet adjustment controls meet the minimum hit-area requirement when implemented.
- The HUD remains subordinate to reels, wins, infection feedback, and the Spin Button.
- Assets export cleanly with stable runtime paths and transparent edges.

## Avoid

- oversized dashboards or a full-width decorative console;
- dense pipes, warning stripes, bolts, scratches, or contamination;
- futuristic glass panels, holograms, gold trim, or casino-luxury styling;
- baked numbers, labels, currency, or state messages;
- tiny controls and low-contrast values;
- a permanent glow around all three panels; and
- any layout change to the gameplay grid for the sake of the HUD.
