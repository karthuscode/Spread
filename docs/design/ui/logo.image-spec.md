# Prototype Logo — V1 Image Specification

## Production Identity

- **Asset type:** UI / Logo
- **Asset name:** Spread Prototype Logo
- **Asset goal:** Identify the game in the first playable graphical prototype
- **Production phase:** UI Production
- **Production status:** Specification Ready
- **Branding status:** Prototype treatment; not final branding
- **Reference canvas:** 1920 × 1080, 16:9

The logo inherits the project [Visual DNA](../visual-dna.md), [UI Visual Language](ui-visual-language.md), and [Reel Grid Specification](../layout/reel-grid-spec.md). It identifies the interface but remains subordinate to gameplay.

## Purpose

Create a compact, readable title treatment for the word **Spread**. The asset validates name recognition, screen placement, scale, and compatibility with the prototype UI.

It is not key art, a permanent brand lockup, or a final marketing logo. Future typography and branding revisions remain expected.

## Placement and Maximum Size

Place the logo above the locked reel opening, centered on the screen:

- anchor center: `(960, 92)`;
- maximum visible bounds: 440 × 112 px;
- maximum bounds: `x = 740–1180`, `y = 36–148`; and
- minimum clear gap to the reel opening: 16 px.

The logo may overlap a quiet outer portion of the Reel Frame’s top assembly only if its silhouette and title remain fully readable. It must not enter the reel opening, cover warning indicators, obscure functional HUD information, or require movement of the gameplay grid.

If the current frame leaves less room, reduce the logo before altering gameplay geometry.

## Silhouette

Use one compact horizontal wordmark with an unmistakable overall outline. Slightly uneven letter heights, one compressed join, or one controlled off-axis feature may express the project’s crooked world.

The word must still read immediately as **Spread**. Avoid a tall crest, circular casino badge, character illustration, large virus mascot, framing plaque, or sprawling contamination silhouette.

## Typography Direction

Use bold, condensed or semi-condensed custom lettering with sturdy industrial construction. Forms may suggest stamped enamel, worn containment labeling, or letters assembled from imperfect plates.

Typography should feel psychologically strange through controlled asymmetry rather than illegibility. Keep counters open, distinguish `S`, `p`, and `e` at interface size, and avoid extreme distress.

Do not imitate a real medical logo, pharmaceutical brand, fantasy title, heavy-metal band mark, or luxury casino identity.

## Material and Colour

Use cloudy off-white `#C2C1AE` as the primary letter value over a dark edge or shallow blackened blue-grey backing. Add dirty teal or oxidized steel to selected secondary planes.

Reserve contaminated yellow-green `#A6C63A` for one small infection trace. Warning amber and muted magenta may appear only as tiny secondary marks if required by integration; broad multicolour treatment is prohibited.

Use opaque, matte-to-satin painted surfaces. No gold, chrome, gemstones, polished glass, or broad neon.

## Contamination Treatment

Apply one controlled chemical event to no more than 12% of the visible wordmark area:

- a short acidic residue seam;
- a dried tide mark affecting one letter edge; or
- one cloudy deposit caught in a recessed join.

Contamination must not cross several letters, replace a letterform, form a large splatter, or reduce title recognition. Use no gore, tissue, mold carpet, or dripping biological matter.

## Lighting

Use the shared high viewer-left direction with broad, shallow plane separation. A narrow edge lift may distinguish the logo from the background or frame.

The neutral logo does not glow. Any infection accent uses a tight local luminance increase without a large bloom.

## Readability and Clear Space

The complete word must remain readable:

- at 220 px displayed width;
- in grayscale;
- without surface scratches or contamination;
- against the dark background and Reel Frame; and
- within a one-second screen scan.

Maintain clear space around the visible wordmark equal to at least half the cap height. Keep environment edges, pipes, frame bolts, HUD labels, and bright indicators outside this area.

Surface wear must disappear before letter structure at small size.

## Relationship with the Interface

The hierarchy is:

1. reel gameplay and active feedback;
2. Spin Button and essential HUD values;
3. prototype logo;
4. frame and environmental detail.

The logo may be brighter than neutral frame metal, but its occupied area and peak accent must remain smaller than active gameplay highlights. It must not resemble a Win banner, bonus notification, or interactive control.

## Responsive Behavior

Scale the logo uniformly with the 16:9 composition. Preserve its centered relationship to the reel opening.

At constrained widths, reduce the logo to 220 px before repositioning it. If vertical space is insufficient, hide the logo only after retaining an accessible game title elsewhere in the interface. Do not crop, stretch, wrap, or stack the word.

Final responsive and branding polish is deferred.

## Export Requirements

Store editable masters under `assets/source/ui/logo/` and runtime exports under `assets/game/ui/`.

Prepare:

- a transparent SVG master when letter geometry permits;
- a transparent 2× PNG master when textured paint and wear are raster-based;
- a transparent runtime SVG or PNG;
- no baked background, frame, HUD, characters, or key-art illustration; and
- a stable runtime filename: `prototype-logo.svg` or `prototype-logo.png`.

Crop to consistent transparent bounds while preserving documented clear space. Convert display lettering to outlined paths for the asset export, and retain editable source text separately.

## Prototype Acceptance Criteria

- The title reads as **Spread** immediately at interface size.
- The asset fits within 440 × 112 px at the reference canvas.
- It does not enter the reel opening or displace gameplay.
- It inherits the contaminated industrial identity without becoming an illustration.
- It remains readable at 220 px width and in grayscale.
- Contamination affects no more than 12% of the visible area.
- The transparent export has clean edges and stable bounds.
- The logo is visibly a prototype treatment and creates no dependency on final branding.
- It remains below gameplay and primary controls in visual hierarchy.

## Avoid

- large key-art compositions, characters, mascots, or environment scenes;
- illegible distressed lettering and contamination across the title;
- gold, gems, fantasy ornament, casino-luxury styling, or polished glass;
- pharmaceutical, hospital, biohazard, or generic science-fiction branding;
- full-word neon glow;
- baked background or frame artwork; and
- language implying permanent or final branding.
