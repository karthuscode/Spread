# Reel Grid — V1 Layout Specification

## Status and Authority

- **Asset type:** Gameplay layout
- **Applies to:** Reel system, Reel Frame, background composition, paylines, symbol presentation, animation, win effects, and HUD placement
- **Production status:** V1 source of truth
- **Reference canvas:** 1920 × 1080, 16:9
- **Grid:** 5 reels × 3 rows

This document defines the gameplay geometry independently from artwork. Its dimensions and relationships take priority over the Reel Frame, background, HUD, and decorative composition.

If an artwork asset conflicts with this specification, redesign or reposition the artwork. Never resize, crop, distort, or move the gameplay grid merely to preserve existing art.

## Inside-Out Layout Principle

All screen composition follows this dependency order:

```text
Gameplay Grid
      ↓
Reel Opening
      ↓
Reel Frame
      ↓
Background
      ↓
HUD
```

Each later layer conforms to the established footprint and safe areas of the layer above it. The HUD is placed last in this dependency sequence even when some HUD elements render visually above other layers.

## Coordinate System

Use screen coordinates with `(0, 0)` at the top-left. Positive X moves right and positive Y moves down.

Use the reference canvas only as a production baseline. For other resolutions, scale the complete layout uniformly by:

```text
scale = min(viewport width / 1920, viewport height / 1080)
```

Do not scale X and Y independently. Center the resulting 16:9 gameplay composition in the available viewport and letterbox or extend only the background when the viewport aspect ratio differs.

One grid unit, `C`, equals one cell width and one cell height. At the reference canvas:

```text
C = 200 px
```

All dimensions below may be implemented as multiples of `C`.

## Grid Definition

| Property | Production value |
|---|---:|
| Reel count / columns | 5 |
| Row count | 3 |
| Cell size | 200 × 200 px |
| Cell proportions | 1:1 |
| Horizontal spacing | 12 px / `0.06C` |
| Vertical spacing | 12 px / `0.06C` |
| Grid footprint | 1048 × 624 px |
| Gameplay grid aspect ratio | 131:78, approximately 1.679:1 |
| Reel opening | 1120 × 672 px |
| Reel opening aspect ratio | 5:3, approximately 1.667:1 |

The **grid footprint** includes all 15 cells and the spacing between them. It excludes reel padding.

The **reel opening** includes the grid footprint and its internal padding. It is the exact clean aperture that the Reel Frame must expose.

## Cell Geometry

Every cell is a square 200 × 200 px reference box. Square cells match the existing square symbol-master workflow, preserve consistent scaling across the complete symbol family, and prevent character symbols from being distorted to fit a landscape or portrait slot.

Cell bounds are logical layout bounds, not decorative panels. Do not draw heavy boxes around every cell. Reel separation, symbol spacing, and state effects should remain readable without turning the grid into a table.

Cell centers use:

```text
cell center X = grid left + 100 + column × 212
cell center Y = grid top + 100 + row × 212
```

Columns and rows are zero-indexed. Gameplay coordinates use `(column, row)`.

## Spacing

Horizontal and vertical spacing are both 12 px, or 6% of a cell dimension.

This gap is reserved visual separation. It may contain a subtle reel divider or low-contrast reel background, but not decorative frame hardware. Payline paths and animation effects may cross it.

Do not increase spacing to compensate for undersized symbols. Do not collapse spacing to make the grid fit existing artwork.

## Reel Padding

Padding between the grid footprint and the reel opening is:

| Side | Value | Relative to `C` |
|---|---:|---:|
| Left | 36 px | `0.18C` |
| Right | 36 px | `0.18C` |
| Top | 24 px | `0.12C` |
| Bottom | 24 px | `0.12C` |

Horizontal padding is wider to protect the first and fifth reels from the frame’s side supports and to provide clean entry and exit space for horizontal paylines.

Padding is part of the gameplay opening. It must remain free of frame plates, bolts, pipes, labels, cast shadows, contamination, and other decoration.

## Position, Alignment, and Center Point

At 1920 × 1080:

- reel opening bounds: `x = 400–1520`, `y = 164–836`;
- reel opening center: `(960, 500)`;
- normalized center: `(50%, 46.296%)`;
- grid footprint bounds: `x = 436–1484`, `y = 188–812`; and
- grid center: `(960, 500)`.

Align the grid and reel opening to the same center. Their vertical center sits 40 px above the canvas center to reserve more lower-screen space for the Spin Button and essential controls.

The grid must remain axis-aligned. No rotation, perspective convergence, keystone distortion, curved reel baseline, uneven column width, or artistic skew is permitted.

## Outer Margins

The reel opening leaves these reference-canvas margins:

| Side | Canvas edge to opening |
|---|---:|
| Left | 400 px |
| Right | 400 px |
| Top | 164 px |
| Bottom | 244 px |

These are composition margins, not permission to fill every available area. The lower margin is intentionally larger for controls. Side and top margins support the Reel Frame silhouette and future HUD without changing gameplay geometry.

## Safe Margins

Two safe-margin systems apply:

### Opening Safe Margin

The complete reel padding described above is a no-intrusion zone for artwork. Gameplay effects may enter it when required, but must clip at the reel opening boundary.

### Cell Content Safe Margin

Keep critical identifying features inside a centered 168 × 168 px box, equal to 84% of cell width and height. No essential face, silhouette feature, state marker, or icon meaning may depend on the outer 16 px around a cell.

Non-critical silhouettes, hair, tools, infection tendrils, and animation overshoot may enter the outer cell area, but must remain inside the 200 × 200 px cell during a settled result.

## Symbol Occupancy

For the settled gameplay state:

- target symbol bounding-box width: **78–84%** of cell width;
- target symbol bounding-box height: **80–86%** of cell height;
- default production target: **82% width × 84% height**;
- maximum settled occupancy: **88% on either axis**; and
- minimum clear space at the default target: approximately **16–18 px per side**.

Occupancy is measured from the visible non-transparent symbol bounds, excluding soft shadow, glow, particles, and temporary animation effects.

Character symbols should normally use the upper end of the height range. Compact equipment symbols may use slightly less area but should be optically scaled to comparable visual weight. Do not scale every source image by the same numeric percentage without accounting for transparent bounds and silhouette density.

The occupancy target supports:

- large, immediately readable symbols;
- clear separation between adjacent silhouettes;
- unobstructed payline paths;
- room for infection and win effects;
- controlled animation anticipation and overshoot; and
- clean comparison of symbols across reels.

## Recommended Symbol Scaling

Trim transparent source padding before layout. Scale each symbol uniformly; never stretch width or height independently.

Use this fitting rule for the settled symbol:

```text
maximum target box = 168 × 172 px
scale = min(168 / source visible width, 172 / source visible height)
```

Then optically adjust within the allowed occupancy range so the symbol family has consistent perceived weight. Preserve the approved silhouette and keep the visual center on the cell center.

Allow a maximum 6 px optical vertical offset for symbols whose visual mass is top- or bottom-heavy. Do not alter the logical cell center used by paylines, infection adjacency, selections, or hit testing.

Transient animation may expand to 96% of a cell on either axis. Effects extending beyond a cell must not obscure neighboring settled symbols or leave the reel opening.

## Payline and Animation Space

Paylines pass through cell centers. Their primary path must remain within a 20 px corridor centered on the mathematical line between adjacent cell centers.

Symbols must not contain persistent high-contrast horizontal or diagonal marks that imitate active paylines. Payline strokes, win borders, and infection effects render independently from symbol artwork.

Reserve the cell’s outer 6–10% for animation easing, highlight borders, and local infection effects. Major bursts may temporarily cross cell spacing but must preserve the readability of every affected cell and remain clipped to the reel opening.

## Layer Order

Use this back-to-front render order:

1. Main Background
2. Reel Frame rear chassis and outer shadow
3. Reel opening background or reel strips
4. Low-contrast reel separators
5. Symbols
6. Infection transformations and symbol-local animation
7. Paylines, win highlights, selections, and gameplay-state overlays
8. Reel Frame front lip and inner seal, outside the opening only
9. HUD panels, values, controls, and notifications
10. Screen-level transitions or accessibility overlays

The Reel Frame’s front layer may visually meet the opening boundary but must never cover any part of the defined 1120 × 672 px aperture.

## Visual Hierarchy

The intended visual order is:

1. active gameplay state, winning symbols, and infection changes;
2. complete symbol grid;
3. primary control and essential HUD values;
4. reel boundary and Reel Frame structure;
5. background and decorative storytelling.

During a neutral state, symbols are the highest-contrast information within the opening. During a win or infection event, state overlays may briefly become dominant without concealing the affected symbols.

The frame, reel separators, and opening background must remain lower in contrast, saturation, and detail than the symbol set.

## Responsive and Implementation Rules

- Treat the reference values as one uniformly scaled group.
- Derive all cell positions from the opening origin and the constants in this document.
- Use the reel opening as the clipping rectangle for symbols and gameplay effects.
- Use cell centers as the source of truth for paylines, infection adjacency effects, highlights, and input targeting.
- Apply pixel rounding only after scaling; distribute any rounding error symmetrically from the center outward.
- Keep the grid centered at the normalized center unless a later gameplay-layout revision explicitly changes this document.
- Do not use artwork bounds to calculate grid geometry.

## Reel Frame Conformance Requirements

The Reel Frame must be revised around the exact 1120 × 672 px reference opening.

Required adjustments:

1. Replace any artist-defined aperture with the fixed 5:3 gameplay opening.
2. Center the opening at `(960, 500)` on the 1920 × 1080 reference canvas.
3. Remove every inner protrusion, corner plate, pipe, bolt, stain, shadow, or glow that enters the opening bounds.
4. Keep the frame’s inner edge outside the opening rather than overlaying it.
5. Rebalance top, side, and lower frame masses around the locked aperture; do not scale the grid to fit the current silhouette.
6. Preserve the upper-side HUD attachment zones and larger lower control margin without moving the grid.
7. Build the frame as separate rear and front layers so gameplay and effects can be clipped and composited correctly.

Any percentage-based opening dimensions in an artwork brief are subordinate to the exact grid and opening geometry in this document.

## Production Validation

The layout is approved only when:

- all 15 cells are equal squares;
- the full reel opening measures 5:3;
- spacing and padding scale uniformly;
- all cell centers align with gameplay coordinates and paylines;
- settled symbols meet the occupancy range without collision;
- symbol-local animation has visible breathing room;
- no Reel Frame artwork enters the opening;
- the complete grid remains centered at the specified point;
- colour and grayscale tests preserve the visual hierarchy; and
- resizing the viewport does not distort cells or change grid proportions.

## Non-Negotiable Rule

Design from gameplay outward. The gameplay grid does not adapt to preserve the Reel Frame, background, HUD, or any other artwork. When a conflict occurs, the conflicting artwork must be redesigned.
