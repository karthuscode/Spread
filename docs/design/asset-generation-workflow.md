# V1 Asset Generation Workflow

## Purpose

This document defines the image-generation workflow for static V1 production assets. It applies the established visual documentation architecture; it does not revise the visual direction, character definitions, or gameplay.

V1 generation produces production assets for the first playable graphical prototype. It is not a concept-exploration phase. The image generator must follow the supplied direction and create the requested asset, not redesign it or produce multiple alternatives unless the task explicitly requests alternatives.

## Mandatory Generation Hierarchy

Every generated visual asset must be based on three documents:

1. [Visual DNA](visual-dna.md) — the mandatory artistic foundation of the *Spread* universe. Its rules are not optional.
2. The requested asset’s `<asset>.image-spec.md` — the unique visual specification for that asset.
3. [AI Generation Guide](ai-generation-guide.md) — the rules for interpreting the documentation during generation.

The image generator must read all three documents completely before generating an asset. They form one combined production specification.

```text
Visual DNA
        ↓
Asset Image Specification
        ↓
AI Generation Guide
```

If information conflicts, the higher-priority document overrides the lower-priority document. The Asset Goal identifies the required deliverable but does not override the three-document specification or authorize redesign.

## Standard Image-Generation Input

Every generation request must contain the complete standard generation package:

- `visual-dna.md`;
- the requested asset’s `<asset>.image-spec.md`;
- `ai-generation-guide.md`; and
- a task-specific Asset Goal.

Do not generate an asset when any required document is missing, unread, incomplete, or points to an unresolved visual decision. Return the package for correction instead of inventing the missing direction.

### Asset Goal

The Asset Goal is a concise production instruction that names the requested output type and its immediate use. It must identify the output as one of:

- slot icon;
- UI element;
- background;
- reel frame;
- logo; or
- preview composition.

It should also state the required dimensions, transparency, format, destination category, and any task-specific crop or integration constraint. It should request one production result unless alternatives are explicitly required.

Example:

```text
Asset Goal: Produce one static Nurse slot icon for the V1 prototype.
Deliver a centered, transparent, square source master at 1024 × 1024.
Preserve thumbnail readability and leave the icon free of frames, text,
logos, scenery, and environmental backgrounds.
```

## V1 Asset Scope

V1 production includes:

- one static slot icon for every symbol;
- background;
- reel frame;
- basic buttons;
- HUD panels;
- logo or title treatment; and
- other essential prototype UI assets.

V1 does not currently require:

- character animation;
- idle animation;
- win animation;
- sprite sheets;
- particles;
- VFX;
- cinematic transitions; or
- advanced visual polish.

The generator must not add excluded deliverables to a generation task unless explicitly requested.

## Generation Procedure

1. Confirm the Asset Goal and output type.
2. Identify the exact asset Image Specification.
3. Read Visual DNA completely.
4. Read the asset Image Specification completely.
5. Read the AI Generation Guide completely.
6. Resolve instructions according to the documented priority order.
7. Generate the single requested production asset.
8. Check the output against the combined production specification and Asset Goal.
9. Store the original and high-resolution working material under `assets/source/`.
10. Select and clean the approved result.
11. Export the runtime-ready asset to the matching location under `assets/game/`.
12. Integrate and review it in the prototype at its actual display size.

Preview compositions, if requested, belong under `assets/previews/` and must never become runtime dependencies.

## Slot Icon Generation Standard

Every V1 slot icon must be:

- static;
- square;
- centered;
- transparent;
- readable at small size;
- silhouette-driven;
- visually distinct from every other symbol;
- consistent with the complete symbol set;
- free of frames, logos, text, scenery, and environmental backgrounds; and
- suitable for direct integration into the prototype.

The character or object should occupy approximately 75–85 percent of the canvas. Its identity must remain recognizable at thumbnail size. Review the silhouette, value grouping, crop, and distinction from neighboring symbols before approving surface detail.

## Production Review

Generation is not approval. Review the result against all three governing documents and the Asset Goal. A visually attractive result is not acceptable if it contradicts the Visual DNA, changes the specified identity, fails at runtime size, or introduces unrequested presentation.

Use this lifecycle for every asset:

```text
Planned
        ↓
Specified
        ↓
Generated
        ↓
Selected
        ↓
Cleaned
        ↓
Exported
        ↓
Integrated
        ↓
Reviewed
```

- **Planned:** The asset is identified in V1 scope.
- **Specified:** Its approved Image Specification and Asset Goal are ready.
- **Generated:** A source result has been produced from the complete generation package.
- **Selected:** The production result has been chosen.
- **Cleaned:** Artifacts, edges, transparency, and composition are prepared.
- **Exported:** A correctly named runtime file has been created.
- **Integrated:** The runtime asset is used by the prototype.
- **Reviewed:** The integrated result passes visual, readability, and technical review.

An asset is complete only at **Reviewed**.
