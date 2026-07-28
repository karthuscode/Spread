# UI Visual Language

## Purpose

This document defines the shared visual language for every *Spread* UI asset. The Reel Frame, HUD panels, buttons, meters, labels, modal panels, and future UI extensions must inherit these rules.

The UI belongs to the same absurd contaminated medical-experiment world as the symbols and background. It should feel assembled from old containment hardware: crooked, repaired, chemically stained, and still functional. It must not resemble futuristic software, fantasy ornament, or luxury casino furniture.

Gameplay clarity always outranks decoration.

## Core Principles

1. Function reads before theme.
2. Large shapes read before surface detail.
3. Controls look tactile and industrial, not digital or magical.
4. Contamination appears in controlled peripheral traces, never as visual noise.
5. Wear explains construction and use; it is not evenly scattered texture.
6. Bright colour and glow communicate state, not decoration.
7. Asymmetry gives personality, while alignment preserves usability.

## Materials

Use a restrained family of aged, opaque materials:

- painted steel worn through to dark metal at exposed edges;
- oxidized steel with cool, broken reflections;
- aged rubber seals with dull highlights and compressed corners;
- cloudy or cracked plastic only for small indicator covers;
- enamel-coated labels with chipped, faded surfaces;
- coarse insulated pipe and cable sleeves used sparingly; and
- dried chemical residue collected in seams and low points.

Materials should be readable through broad value and edge changes. Avoid photoreal micro-texture, polished chrome, precious metal, pristine plastic, wood, marble, and large areas of transparent glass.

## Shape Language

Build UI from heavy containment plates, compressed capsules, pinched wedges, crooked brackets, swollen seals, and uneven structural ribs. Combine rounded pressure-vessel forms with sharper fastening and warning shapes.

Primary functional geometry remains stable and easy to parse. Personality comes from unequal corner radii, offset plates, mismatched reinforcement, and slightly drifting seams. Never distort a hit area, number field, reel cell, or text line enough to reduce usability.

Avoid thin science-fiction tracery, fantasy scrollwork, ornate bevels, symmetrical palace framing, and generic rectangular panels with decorative texture pasted on top.

## Edge Treatment

Use a three-level edge system:

1. **Primary silhouette edges:** broad, clean, high-contrast, and readable at gameplay scale.
2. **Construction edges:** stepped plates, bevels, seals, and joints with controlled mid-value separation.
3. **Surface wear edges:** sparse chips, scratches, and residue that disappear first when reduced.

Outer corners may be dented, clipped, or asymmetrically rounded. Inner gameplay-facing edges must remain smooth and quiet. Do not use razor-thin highlights around every component or excessive bevel stacks.

## Contamination Style

Contamination is chemical, dry, and unnatural rather than biological. Use:

- acidic yellow-green tide marks;
- cloudy deposits around seals;
- dried rings beneath pipe joints;
- thin residue trapped in panel seams; and
- one-sided staining that suggests gravity or a past leak.

Concentrate contamination at outer corners, joins, lower edges, and non-interactive recesses. Keep text fields, symbol boundaries, gameplay openings, control labels, and active indicators clean. Never use blood, organs, tissue, wet gore, mold carpets, or random green splatter.

## Industrial Detailing

Industrial detail must explain how an asset is assembled or operated. Suitable details include reinforcement ribs, access plates, hinges, clamps, recessed handles, pressure seams, stamped index marks, and small warning labels.

Every detail should appear attached to a believable layer. Use a few large details rather than many tiny ones. Decorative density belongs at the outer perimeter; functional centers remain quiet.

## Bolts

Bolts are secondary rhythm marks, not a border pattern. Use uneven groups of two to four at real joints or stress points. Vary size slightly and allow one missing, replaced, or misaligned bolt where it supports the dark-comedy tone.

Keep bolts away from text and symbol silhouettes. Avoid evenly spaced rivets around every edge, jewel-like fasteners, oversized bolt heads, and dense repetition.

## Pipes and Cables

Pipes may connect components, imply pressure, or create a controlled directional path. Use thick, readable runs with few bends. Keep them behind or outside primary interaction areas and terminate them visibly at clamps, housings, or the canvas edge.

One pipe may be swollen, patched, or slightly misrouted. Do not create cable tangles, dense pipe networks, or loose elements crossing gameplay, labels, buttons, or meters.

## Scratches and Worn Paint

Scratches follow use and construction: short directional marks near handles, shallow abrasions on exposed corners, and wear where plates meet. Worn paint reveals a darker substrate in broad chips at a few high-contact areas.

Do not distribute scratches uniformly. Do not use white scratch overlays, noisy grunge, or wear that breaks important silhouettes. At normal gameplay size, wear should support material recognition without becoming separate graphic information.

## Colour Palette

Use these palette roles across all UI assets. Values are production targets and may shift slightly during integration while preserving their hierarchy.

| Role | Target | Use |
|---|---:|---|
| Deep void | `#11171A` | recesses, separation, deepest shadows |
| Blackened blue-grey | `#1B252A` | major structural masses |
| Oxidized steel | `#46585A` | secondary plates and exposed metal |
| Dirty teal | `#355B59` | restrained identity colour |
| Faded neutral | `#77766D` | worn hardware and quiet labels |
| Cloudy off-white | `#C2C1AE` | primary text and rare edge lift |
| Contaminated yellow-green | `#A6C63A` | infection state and residue accents |
| Warning amber | `#D18A2C` | caution marks and actionable emphasis |
| Muted magenta | `#9A456E` | rare psychological or exceptional-state accent |

Do not use pure black or pure white across large areas. Exclude gold, jewel tones, casino red, glossy black, bright hospital blue, cheerful medical green, broad neon gradients, and rainbow state coding.

## Lighting Style

Light UI consistently from high viewer-left with broad, soft plane definition. Use cool, restrained reflections on metal and a weak contaminated bounce near lower or infected areas.

Recesses should be dark but not crushed. Highlights should identify depth and material rather than outline every shape. Keep lighting painted into static assets compatible with the scene; do not imply a different light direction on each component.

Glows must remain localized and must not wash over text, symbols, or neighboring controls.

## Warning Markings

Warning markings use faded amber, dirty off-white, or contaminated yellow-green. Prefer short diagonal bars, clipped triangles, containment ticks, and unreadable micro-label blocks.

Markings should be partially worn, asymmetrically placed, and subordinate to content. Use no readable safety claims in generated artwork and do not rely on markings alone to communicate an interactive state. Avoid full hazard-stripe borders, oversized warning symbols, and high-frequency striping.

## Glowing Elements

Glow is semantic. It may identify:

- a currently actionable primary control;
- infection or contamination status;
- a selected or active state;
- a win or exceptional event; or
- one small powered indicator.

Inactive elements do not glow. Use a bright core, narrow bloom, and rapid falloff. Limit simultaneous glow colours and preserve a darker boundary around luminous elements. Large decorative neon, continuous glowing frame outlines, and pulsing ambient lights are prohibited.

## Readability Philosophy

All UI must pass three checks:

- **One-second read:** the player can locate reels, primary action, and essential values immediately.
- **Thumbnail read:** primary silhouettes and state colours survive reduction without surface texture.
- **Grayscale read:** function and hierarchy remain understandable without hue.

Text and icons need quiet local backgrounds. State changes require at least two cues where practical, such as value plus shape, glow plus border, or colour plus icon. Decoration must never imitate a button, meter, symbol, payline, or notification.

## Visual Hierarchy

The default screen hierarchy is:

1. reel opening, symbols, wins, and gameplay state;
2. primary action and essential HUD values;
3. reel frame and functional panel boundaries;
4. secondary controls and status indicators;
5. contamination, construction detail, and environmental storytelling.

The Reel Frame anchors the composition but must not overpower the reel content. Asset-level contrast, saturation, detail, and glow should follow this order.

## Inheritance Rules

Every future UI specification must define:

- which palette roles it uses;
- its primary functional read;
- its clean content or interaction zone;
- its construction layers;
- the location and maximum density of contamination;
- its active, inactive, disabled, and exceptional states when applicable; and
- how it remains subordinate to higher-priority gameplay information.

If an asset requires an exception, document the exception in that asset’s specification. An undocumented exception is a production defect.

## Avoid

- overly futuristic interfaces, holograms, thin neon circuits, and spaceship dashboards;
- generic fantasy frames, heraldry, scrollwork, and magical runes;
- gold ornament, gems, luxury casino styling, and glossy premium finishes;
- wood, marble, crystal, and glass-palace aesthetics;
- busy decoration, repeated rivet borders, cable tangles, and dense pipe grids;
- contamination across readable content;
- large props extending into gameplay;
- baked-in text that must remain editable at runtime; and
- decorative elements that resemble interactive states.
