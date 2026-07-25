# Image Generation Standard

## Purpose

This standard formalizes the complete V1 image-generation workflow for *Spread*. It governs how approved visual documentation becomes a reviewed asset in the playable prototype. It does not redefine the project’s visual direction, asset identities, or gameplay.

## Final Production Workflow

```text
Visual DNA
        ↓
Asset Image Specification
        ↓
AI Generation Guide
        ↓
Asset Type
        ↓
Asset Goal
        ↓
Image Generation
        ↓
Manual Review
        ↓
Prototype Integration
```

Each stage is required. Generation must not begin until the first five stages provide a complete, unambiguous production package.

## Stage 1: Visual DNA

[Visual DNA](visual-dna.md) defines the entire artistic language of the *Spread* universe. It establishes the shared rules for shape language, caricature, silhouette, facial treatment, colour, materials, readability, and visual identity.

Visual DNA is:

- mandatory for every generated asset;
- the highest authority in the document hierarchy; and
- not optional, even when an individual specification or task does not repeat its rules.

The generator must never ignore or override the Visual DNA.

## Stage 2: Asset Image Specification

The Asset Image Specification defines one specific asset. It converts the shared artistic language into concrete requirements for the requested subject or deliverable.

An asset specification may define a:

- character;
- slot icon;
- background;
- button;
- reel frame; or
- logo.

The specification owns asset-specific identity, composition, forms, colours, materials, required features, exclusions, readability, and target impression. It must not redefine the shared Visual DNA.

The specification has lower authority than Visual DNA and higher authority than the AI Generation Guide.

## Stage 3: AI Generation Guide

The [AI Generation Guide](ai-generation-guide.md) defines how the supplied visual documentation must be interpreted by an image generator. It governs fidelity, consistency, invention limits, and handling of instructions during generation.

It is the lowest-priority document in the three-document hierarchy:

```text
Visual DNA
        ↓
Asset Image Specification
        ↓
AI Generation Guide
```

The generator must read all three documents completely and treat them as one combined production specification. If instructions conflict, the higher-priority document overrides the lower-priority document.

## Stage 4: Asset Type

Every image-generation request must explicitly declare one supported Asset Type. Asset Type identifies the output’s functional category and determines how composition, transparency, scale, and integration readiness are evaluated.

### Supported V1 Asset Types

- **Slot Icon** — A static reel symbol designed for immediate recognition at gameplay and thumbnail sizes.
- **Background** — Environmental artwork behind the gameplay interface, composed for the selected prototype aspect ratio without reducing UI readability.
- **Reel Frame** — The visual structure surrounding and separating the reels while preserving a clear gameplay area.
- **Button** — A reusable interactive control surface designed to support separate labels and clear UI states.
- **HUD Panel** — A structured interface surface for displaying gameplay information with clear hierarchy and legibility.
- **Logo** — A scalable title or brand treatment that identifies *Spread* within the prototype presentation.
- **Preview Composition** — A non-runtime review image used for symbol showcases, UI mockups, or complete-screen visual evaluation.

Only one Asset Type should be assigned unless the request explicitly calls for multiple separate deliverables.

## Stage 5: Asset Goal

Every image-generation request must explicitly define its Asset Goal: the concrete production objective for the requested output.

The Asset Goal states what is being produced, why it is needed, and what constitutes a usable result. It may include required canvas behavior, transparency, target context, output count, and integration constraints. It supplements the governing documents but cannot override them.

### Standardized Asset Goals

- **Concept Illustration** — A directed illustration used to evaluate an explicitly requested visual question. It is not automatically a runtime asset.
- **Production Slot Icon** — A final static symbol image prepared for cleanup, export, and direct reel integration.
- **Prototype Background** — A background composed for the playable V1 screen and its selected aspect ratio.
- **UI Button** — A production-ready button surface designed for prototype interaction and separate label treatment.
- **Prototype Logo** — A title treatment prepared for use in the V1 prototype.

When another production objective is necessary, name it with the same specificity and state its intended use. “Generate an image” is not an acceptable Asset Goal.

Concept Illustration must be requested explicitly. It must not replace a production deliverable when the requested goal is a final V1 asset.

## Stage 6: Image Generation

Image Generation produces the requested output from the complete production package:

- Visual DNA;
- the Asset Image Specification;
- the AI Generation Guide;
- the declared Asset Type; and
- the declared Asset Goal.

The generator must:

- read every attached document completely;
- respect the document hierarchy;
- never redesign the asset;
- never ignore the Visual DNA; and
- produce one production-ready asset unless multiple outputs are explicitly requested.

The generator must not invent alternatives, broaden the request, or treat production generation as open concept exploration.

## Stage 7: Manual Review

A human reviewer evaluates the generated result before it enters the prototype. Generation alone does not approve an asset.

Manual Review confirms that:

- Visual DNA is preserved;
- the Asset Image Specification is satisfied;
- the Asset Type and Asset Goal are fulfilled;
- prohibited redesign or invention has not occurred;
- composition and readability suit the intended use;
- technical requirements such as transparency and safe margins are correct; and
- the asset remains coherent with the full V1 asset set.

Rejected or revision-required results return to the appropriate earlier stage. Review feedback must identify the governing requirement that was missed rather than silently changing the specification.

## Stage 8: Prototype Integration

Prototype Integration places the reviewed runtime export into its intended V1 context. Integration verifies the asset under actual scale, layout, contrast, and interaction conditions.

An integrated asset must:

- use the appropriate stable runtime path and filename;
- display correctly at its intended size;
- preserve readability alongside neighboring assets and UI;
- avoid clipping, unintended backgrounds, or layout conflicts; and
- satisfy its production purpose in the playable prototype.

An asset is not complete merely because its standalone image has passed review. Final acceptance requires successful prototype integration.

## Universal V1 Canvas Rules

Canvas decisions must serve the declared Asset Type and Asset Goal. Composition is more important than exact output resolution: a technically large image is not production-ready when its crop, margins, scale, or focal hierarchy fail in the prototype.

Exact dimensions may vary by runtime target, but generation and review must preserve the composition needed for clean resizing and export.

### Slot Icons

Every V1 Slot Icon requires:

- a square composition;
- a transparent background;
- a centered subject;
- safe margins;
- approximately 75–85 percent canvas occupancy; and
- readability at thumbnail size.

The subject’s full identifying silhouette must remain inside the safe area. Empty space should protect the form from clipping without making the icon appear undersized. Thumbnail recognition takes priority over fine surface detail or unnecessarily high resolution.

## Required Generation Request

Before generation, record the production package in this form:

```text
Visual DNA: docs/design/visual-dna.md
Asset Image Specification: <path-to-asset>.image-spec.md
AI Generation Guide: docs/design/ai-generation-guide.md
Asset Type: <supported V1 Asset Type>
Asset Goal: <specific production objective>
Output Count: 1, unless multiple outputs are explicitly requested
```

A request with a missing document, Asset Type, or Asset Goal is incomplete and must not proceed to Image Generation.
