# Main Background — V1 Image Specification

## Production Identity

- **Asset Type:** Background
- **Asset Goal:** Prototype Background
- **Asset name:** Main Background
- **Purpose:** Establish the *Spread* universe within one second while keeping the reels, symbols, paylines, win highlights, and UI as the primary visual information.
- **Production status:** Definitive V1 background specification.

## Overall Environment

Create a stylized medical-experiment chamber distorted by psychological dark-comedy logic. The room is not a functional hospital. It is an oversized, crooked containment space assembled from bowed wall panels, warped observation glass, swollen ventilation forms, oxidized structural ribs, and old sealed surfaces.

The architecture should look obsessively controlled but physically incapable of remaining straight. Large shapes lean at conflicting angles while still framing a stable central gameplay area. The environment feels contaminated and absurd rather than dangerous or horrific.

## Camera

Use a fixed, centered, straight-on camera for a 16:9 prototype screen. Keep the horizon slightly below vertical center so the side walls appear tall and enclosing without converging aggressively.

Use mild wide-angle distortion only at the outer edges. The central reel zone must remain optically stable, level, and free of perspective distortion. Do not use a Dutch angle.

## Depth

Build three broad depth layers:

1. a dark rear wall with a quiet central field behind the reels;
2. mid-depth architectural ribs and contaminated observation panels confined mainly to the outer thirds; and
3. restrained foreground edge shapes at the extreme lower corners.

Depth must come from overlapping large masses, value separation, and controlled scale. Do not use dense props, fog, or photoreal atmospheric perspective.

## Lighting

Use soft directional light from high viewer-left to establish broad wall planes. Add a restrained contaminated yellow-green bounce from low outer edges and a muted cool rim along selected oxidized structures.

The center behind the reels should be evenly subdued, with no bright hotspots, hard reflections, or high-contrast shadows. The outer thirds may carry stronger lighting character, but they must guide the eye inward. Keep all essential UI zones readable.

## Colour Palette

Use:

- charcoal and blackened blue-grey for the rear wall;
- dirty teal and deep desaturated green for large architectural masses;
- oxidized grey and faded neutral metal;
- contaminated yellow-green in small controlled traces;
- muted violet or magenta as one sparse psychological accent; and
- cloudy off-white only as a minor worn material note.

Keep the central reel field dark, low-saturation, and lower-contrast than the symbols. Avoid pure black that swallows silhouettes and avoid bright clinical white, hospital blue, cheerful green, casino red, gold, gemstones, or broad neon colour.

## Contamination

Represent infection through a few large, readable contamination events:

- one broad dried chemical tide mark along a side wall;
- two or three swollen residue seams following crooked architecture;
- cloudy deposits trapped behind outer observation glass; and
- sparse acidic-green staining near floor-level edges.

Contamination must look chemical and material, never biological. Keep it away from the central reel field except for one extremely faint, low-contrast stain that does not form a readable object.

## Architectural Language

Use asymmetric combinations of rounded containment forms and pinched structural wedges. Panels should bow, seams should drift off-axis, and supports should vary in width. Large vents may appear inflated or compressed. Observation windows should use thick cloudy glass in crooked frames.

Repeat the *Spread* material language: oxidized steel, painted metal worn to darker layers, cracked plastic, aged rubber seals, cloudy glass, and waxy contaminated coatings. Render these as broad material cues, not busy photoreal textures.

## Background Storytelling

Suggest a failed attempt to keep a strange experiment orderly:

- one outer wall panel has been meticulously relabelled with unreadable marks;
- a containment seam has swollen beyond its intended channel;
- an observation window is cloudy on the wrong side;
- paired wall structures almost match but differ absurdly in scale; and
- one small indicator housing points in an impossible direction.

Storytelling remains peripheral and readable as shape before detail. Do not include characters, creatures, readable text, logos, active procedures, or literal narrative scenes.

## Foreground Separation

Foreground elements may occupy only the extreme left, right, and lower corners. Use one dark curved structural lip on one side and one smaller angular obstruction on the opposite side. Keep their edges broad and soft enough that they do not resemble reel framing.

No foreground object may overlap the reel frame, controls, HUD panels, paylines, win highlights, or title area.

## Symbol Readability

The reels and symbols are the highest visual priority. Behind the complete reel footprint, provide one continuous low-detail field with:

- restrained value variation;
- no sharp silhouettes;
- no bright contamination;
- no face-like shapes;
- no repeated circles that resemble symbols; and
- no edges aligned with internal reel divisions.

The background must preserve clear separation for dark, pale, teal, green, violet, and oxidized symbol palettes. Test it behind the full symbol set in colour and grayscale.

## UI Readability

Reserve quieter peripheral zones for HUD panels and controls. Keep the lower-center Spin Button area free of bright stains and strong diagonals. Keep the upper title area readable without placing a literal sign or generated typography into the background.

Button labels, HUD text, logo, reel frame, and panels remain separate assets. Do not bake UI, labels, numbers, title lettering, paylines, or control surfaces into the background.

## Empty Visual Space Behind Reels

Reserve approximately the central 58 percent of canvas width and central 62 percent of canvas height as the reel-safe field. This field should contain only broad, low-contrast tonal transitions and an extremely faint material stain.

Maintain generous empty space around the future reel frame so its silhouette reads immediately. Large props, windows, pipes, vents, lights, and contamination clusters must remain outside this zone.

## Visual Focus

Use side architecture and outer lighting to create a shallow inward funnel toward the empty reel-safe field. The background itself must not contain a competing focal object.

The intended read order is:

1. reels and symbols after integration;
2. essential controls and HUD;
3. contaminated crooked chamber;
4. peripheral environmental storytelling.

## Canvas and Export

Compose for 16:9. Use a high-resolution PNG source master, preferably 3840 × 2160, and prepare an optimized WebP runtime export at the prototype’s implemented resolution.

Composition, safe zones, and readability take priority over exact output resolution. The background is opaque and contains no text, UI, reel frame, symbols, or transparent cutouts.

## Visual Priorities

1. Quiet central reel-safe field
2. Immediate contaminated medical-experiment atmosphere
3. Large asymmetric architectural shapes
4. Controlled dark palette with restrained infection accents
5. Peripheral dark-comedy storytelling

## Avoid

- Realistic hospital, laboratory, operating room, ward, or clinical photography
- Horror-movie set, haunted asylum, dungeon, industrial torture room, or apocalyptic ruin
- Blood, gore, wounds, organs, biological tissue, zombies, corpses, or body horror
- Realistic medical equipment, procedures, patient beds, surgical tables, or human figures
- Overly dark lighting, crushed blacks, strobing highlights, heavy fog, smoke, or murky haze
- Busy micro-textures, dense pipes, cable tangles, cluttered shelves, repeated small props, or photoreal grime
- Large objects, windows, lamps, vents, stains, faces, or high-contrast edges directly behind the reels
- Bright clinical white, hospital blue, cheerful green, casino red, gold, gems, polished luxury, or broad neon glow
- Readable signage, labels, symbols, warnings, logos, typography, UI, paylines, or baked-in controls
- Centered environmental focal objects that compete with gameplay
- Symmetrical pristine architecture or ordinary believable room proportions
