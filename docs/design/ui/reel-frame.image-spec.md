# Reel Frame — V1 Image Specification

## Production Identity

- **Asset type:** UI / Reel Frame
- **Asset name:** Reel Frame
- **Production phase:** UI Production
- **Production status:** Prototype Complete; revision remains permitted
- **Priority:** Highest-priority UI asset
- **Shared language:** Inherits [UI Visual Language](ui-visual-language.md) and [Reel Grid Specification](../layout/reel-grid-spec.md)

## Identity

The Reel Frame is a crooked containment-machine housing built to hold the game’s reel array. It should feel heavy, repaired, chemically exposed, and still dependable. Its personality comes from asymmetric industrial construction rather than ornament.

## Purpose

The frame establishes one clear gameplay stage, separates symbols from the environment, and guides attention into the reel opening. It must improve symbol readability without becoming a competing focal object. It also provides a stable visual anchor for later HUD panels and controls.

## Silhouette and Overall Proportions

Use a broad landscape silhouette centered on the screen. The outer mass should be wider than the gameplay opening, with a substantial top beam, side supports, and a slightly heavier lower assembly.

Target the opening at approximately 72–78% of the frame’s outer width and 66–72% of its outer height. Keep side structures compact. The top and bottom may vary in thickness, but no edge should feel ornamental or top-heavy.

The silhouette may lean or bulge subtly at the outer perimeter. The gameplay opening itself remains level, stable, and optically rectangular.

## Shape Language

Construct the frame from compressed containment plates, bowed steel ribs, rounded pressure housings, clipped wedges, and aged rubber seals. Use controlled asymmetry: one side may carry a thicker brace, while the opposite side uses a smaller inspection plate or pipe connection.

Do not use fantasy arches, decorative scrollwork, thin futuristic tracery, palace columns, or a generic gold slot-machine surround.

## Materials

Primary materials are blackened painted steel, oxidized steel, dirty-teal coating, and a thick aged-rubber inner seal. Secondary details may use faded enamel, cloudy indicator plastic, and insulated pipe sleeves.

Paint wear reveals dark metal at exposed corners. Surfaces are matte to satin, never glossy or luxurious. Material changes must remain legible at gameplay scale without photoreal grunge.

## Industrial Construction

Build the frame as four visually connected assemblies:

1. a top containment beam;
2. left and right structural supports;
3. a lower load-bearing sill; and
4. a continuous recessed inner seal around the reel opening.

Show stepped plate overlaps, two or three reinforcement ribs, sparse clamps, and small bolt groups at real joins. The structure must look assembled, not carved from a single decorative slab.

## Medical Contamination

Use restrained chemical contamination at the outer lower corners, one side seam, and beneath one pipe or clamp connection. Include a faded acidic yellow-green tide mark and a small cloudy deposit trapped in a recess.

The inner seal and opening-facing surfaces remain mostly clean. No stain, drip, glow, or residue may cross the gameplay opening or form a face-like or symbol-like shape.

## Frame Depth and Layer Separation

Use five readable depth layers:

1. outer shadow separating the frame from the background;
2. rear structural chassis;
3. raised face plates and braces;
4. recessed inner channel with rubber seal; and
5. gameplay opening and reels.

Use broad occlusion, restrained bevels, and value steps to communicate depth. The frame should feel thick enough to contain machinery, but not so deep that it tunnels or shadows the symbols. Avoid excessive bevel stacks and hard reflections.

## Corner Design

Outer corners are asymmetrical, clipped, dented, or unevenly rounded. Each corner should feel engineered and used, with one clear large shape rather than clustered detail.

Inner corners are softly compressed and consistent enough to preserve the rectangular opening. Keep them smooth, dark, and free of protrusions. No bolt, pipe, label, or decorative brace may enter an inner corner’s gameplay-safe area.

## Decorative Elements

Allowed decorative elements are construction-led:

- one short faded warning-bar group on an outer plate;
- one small crooked inspection cover;
- two sparse bolt clusters;
- one restrained pipe connection outside the opening;
- one tiny powered indicator; and
- limited scratches and chipped paint at exposed edges.

These elements should create secondary asymmetry and dark-comedy character. They must not form a continuous decorated border or repeat around all four sides.

## Negative Space

The center is a single uninterrupted field for reels. Maintain a quiet buffer between the inner seal and the first readable part of each symbol. Keep the internal opening free of brackets, dangling cables, pipe ends, stains, labels, bolts, and cast shadows.

Outside the frame, preserve breathing room for the background silhouette and future HUD attachment points. Do not fill every side gap with hardware.

## Gameplay Opening

The reel opening is the primary visual focus. Size it from the implemented reel grid aspect ratio; do not crop, stretch, or conceal any cell. Maintain equal visual access to the outermost rows and columns.

The complete opening must be visually clean and optically flat. Its internal edge should provide a dark, continuous separation band around the reel content without resembling an extra reel cell or payline.

No frame element may overlap:

- symbols or reel cells;
- paylines;
- win highlights;
- infection transformations;
- anticipation or selection indicators; or
- the visible spin result.

## Visual Hierarchy

The intended read order is:

1. reel opening, symbols, and active gameplay state;
2. dark inner seal defining the playfield;
3. major structural silhouette of the frame;
4. future HUD and primary control;
5. frame hardware, contamination, and wear.

Keep the frame below symbols in peak contrast and saturation. Its brightest non-state accent must remain dimmer and smaller than important gameplay highlights.

## Readability

Test the assembled frame with every symbol, in grayscale, and at the prototype’s minimum supported display size. Pale, dark, green, teal, violet, and oxidized symbol edges must all separate from the opening and seal.

Texture must disappear before construction shapes when reduced. The opening must remain identifiable in one second. Decorative marks must not resemble Wild indicators, paylines, selection corners, notification dots, or interactive buttons.

## Colour Palette

Use the shared palette as follows:

- deep void `#11171A` for recesses and the inner separation channel;
- blackened blue-grey `#1B252A` for the main chassis;
- dirty teal `#355B59` for selected face plates;
- oxidized steel `#46585A` for braces and worn metal;
- faded neutral `#77766D` for quiet hardware;
- contaminated yellow-green `#A6C63A` for residue and one small state-capable indicator;
- warning amber `#D18A2C` for the short warning marking; and
- cloudy off-white `#C2C1AE` only for tiny label or edge accents.

Do not use broad bright colour. Muted magenta is reserved for a future exceptional state and should not appear in the neutral frame asset.

## Lighting

Light from high viewer-left with broad, soft plane changes. Add a weak cool reflection on selected exposed steel and a very restrained contaminated bounce near one lower outer edge.

Keep the inner seal evenly dark. Do not cast strong frame shadows across the reels. The optional indicator may use a narrow glow with rapid falloff; the neutral frame itself must not have a glowing outline.

## Relationship with the Background

The frame sits clearly in front of the Main Background’s quiet central field. Use a soft outer contact shadow and value separation rather than a hard luminous border.

Its outer asymmetry should complement, not align exactly with, the background architecture. Background pipes, windows, ribs, stains, and highlights must not appear to continue through the frame or create tangencies at the gameplay opening.

## Relationship with Symbols

Symbols remain brighter, more expressive, and more detailed than the frame. The dark inner seal provides a consistent local boundary for the complete symbol palette.

Do not repeat character faces, symbol silhouettes, virus spikes, or strong symbol colours as frame decoration. Contamination near the frame must not imply that a particular reel cell is infected.

## Relationship with Future HUD

Provide quiet external attachment zones near the upper-left and upper-right outer structure for future HUD panels. Keep the lower center visually open for the Spin Button and essential controls.

HUD panels should appear mounted to or layered above the same industrial system, but remain separate assets. Do not bake numbers, labels, meters, logo typography, balance values, bet values, or buttons into the Reel Frame.

## Canvas, Safe Zones, and Export

Compose against the implemented 16:9 game screen and derive final dimensions from the actual reel grid before artwork approval. Maintain:

- zero intrusion into the gameplay opening;
- a minimum inner clean buffer equal to 3% of the opening’s shorter dimension;
- an outer decoration zone confined to the frame structure;
- clear upper-side attachment space for HUD; and
- clear lower-center space for controls.

Produce a layered source master at 2× the intended runtime dimensions. Separate chassis, face plates, inner seal, wear/contamination, and optional indicator glow. Export the frame as a transparent PNG or lossless WebP at runtime size. Do not include the background, reels, symbols, text, HUD, paylines, or controls.

## Production Acceptance Criteria

- The full reel grid is visible with no decorative overlap.
- The opening is the first visual read in colour and grayscale.
- Every V1 symbol remains distinct against the inner boundary.
- The frame separates cleanly from the Main Background.
- The frame follows the shared UI material, edge, contamination, and lighting rules.
- Construction reads through large shapes at gameplay size.
- Future HUD and lower-center controls retain clear attachment space.
- No prohibited aesthetic appears.

## Avoid

- overly futuristic UI, holograms, neon circuits, or spaceship-console styling;
- generic fantasy framing, gold ornaments, gems, or casino luxury;
- wood, marble, crystal, large glass structures, or palace aesthetics;
- dense pipes, repeated rivets, busy warning stripes, and uniform grunge;
- large objects extending into the reel window;
- brackets, shadows, stains, labels, or glow overlapping gameplay;
- bright inner edges that compete with symbols or win effects;
- realistic hospital equipment or readable medical signage;
- blood, gore, tissue, body horror, or biological contamination; and
- baked-in HUD, text, logo, paylines, symbols, or controls.
