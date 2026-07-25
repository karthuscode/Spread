# Asset Storage Guide

## Purpose

This guide defines where visual assets are stored, which files may be used by the game, and how production filenames and formats remain predictable throughout V1.

## Directory Structure

```text
assets/
├── source/
│   ├── symbols/
│   ├── ui/
│   │   ├── buttons/
│   │   ├── panels/
│   │   ├── reel-frame/
│   │   └── logo/
│   └── environment/
│       ├── backgrounds/
│       └── overlays/
│
├── game/
│   ├── symbols/
│   ├── ui/
│   └── environment/
│
└── previews/
    ├── symbol-showcases/
    ├── ui-mockups/
    └── full-screen-compositions/
```

## Directory Purposes

### `assets/source/`

Stores production source material and working files. The game must never reference this directory directly.

It contains:

- original AI generations;
- high-resolution masters;
- alternate versions;
- editable working files;
- images that may later support animation; and
- selected high-resolution source artwork.

Its subdirectories are:

- `source/symbols/` — generated and edited high-resolution symbol masters.
- `source/ui/` — source artwork for interface assets.
- `source/ui/buttons/` — button shapes, states, textures, and working masters.
- `source/ui/panels/` — HUD and interface-panel masters.
- `source/ui/reel-frame/` — reel-frame source artwork and editable construction files.
- `source/ui/logo/` — logo and title-treatment source files.
- `source/environment/` — source artwork used to build the surrounding presentation.
- `source/environment/backgrounds/` — high-resolution background masters.
- `source/environment/overlays/` — foreground, texture, lighting, and screen-overlay sources.

### `assets/game/`

Contains only approved assets ready for direct runtime integration.

It must not contain:

- rejected generations;
- alternate concepts;
- concept sheets;
- showcases;
- temporary exports; or
- versioned experiments.

Its subdirectories are:

- `game/symbols/` — final runtime slot-symbol icons.
- `game/ui/` — final runtime buttons, panels, reel frame, logo, and other interface elements.
- `game/environment/` — final runtime backgrounds and environmental presentation assets.

Runtime filenames must remain stable when artwork is replaced. Code should reference the stable runtime path while the approved file at that path is updated.

### `assets/previews/`

Stores presentation and review material that is not loaded by the game.

It contains:

- symbol showcase sheets;
- cast comparisons;
- UI mockups;
- complete-screen visual compositions; and
- documentation illustrations.

Its subdirectories are:

- `previews/symbol-showcases/` — individual symbol presentations, lineup sheets, and cast comparisons.
- `previews/ui-mockups/` — interface studies and review compositions.
- `previews/full-screen-compositions/` — complete-screen layouts combining symbols, UI, and environment.

Preview files are not runtime dependencies. A preview may reference runtime assets for presentation, but the runtime must not reference the preview.

## Naming Convention

Use lowercase kebab-case for files and directories.

Examples:

```text
masked-surgeon.png
nurse.png
virus-wild.png
infected-wild.png
spin-button.png
reel-frame.png
main-background.webp
```

Source versions may use version suffixes:

```text
nurse-v01-original.png
nurse-v02-refined.png
nurse-v03-selected.png
```

Runtime filenames must not contain version numbers:

```text
assets/game/symbols/nurse.png
```

Replace the artwork while preserving this path unless an intentional integration change requires a new asset identity.

## Recommended Image Formats

### Slot Symbols

- Use PNG.
- Use a transparent background.
- Use a square canvas.
- Keep a 1024 × 1024 source master.
- Export a 512 × 512 or 256 × 256 runtime asset according to prototype requirements.

Source example:

```text
assets/source/symbols/nurse-v03-selected.png
```

Runtime example:

```text
assets/game/symbols/nurse.png
```

### Backgrounds

- Keep a high-resolution PNG source master.
- Export an optimized WebP runtime asset.
- Match dimensions to the selected prototype aspect ratio.

Do not finalize runtime dimensions before the prototype aspect ratio is selected.

### UI Assets

- Use PNG for textured artwork or artwork requiring transparency.
- Use SVG for simple scalable geometry and logos.
- Use WebP for larger, non-transparent textured elements.

Generated text should not normally be baked into buttons. Keep button artwork and button labels separate whenever possible so labels remain crisp, editable, localizable, and reusable across button states.

## Promotion from Source to Game

Moving an asset into `assets/game/` is a production gate, not a file-organization convenience. Before export:

1. select the approved source version;
2. clean generation artifacts and transparency;
3. confirm composition and small-size readability;
4. export in the correct runtime format and dimensions;
5. apply the stable runtime filename;
6. place only the final export in the matching `assets/game/` directory; and
7. preserve masters and version history under `assets/source/`.

Showcases and mockups remain under `assets/previews/`, even when they use approved artwork.
