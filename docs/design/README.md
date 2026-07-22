# Spread Visual Design Documentation

This directory contains the visual design documentation for *Spread*. It separates creative development from image-generation instructions so that each document has one audience and one responsibility.

Long-form documents are useful for human judgment, discussion, and continuity. They are not efficient direct inputs for image-generation models: nuanced reasoning, alternatives, and background context can dilute visual priorities or encourage unintended interpretation. Compact specifications are better suited to image generation, while a shared guide keeps interpretation consistent across the complete symbol set.

## Documentation Pipeline

```text
Visual Direction
        ↓
Visual DNA
        ↓
Character Bible
        ↓
Image Specification
        ↓
AI Generation Guide
        ↓
Concept Art
        ↓
Design Critique
        ↓
Documentation Update
        ↓
Next Rotation
```

The Image Specification and AI Generation Guide are used together. The specification defines what a particular symbol should look like; the guide defines how the specification should be interpreted.

## Layer 1: Visual Direction

**Audience:** Art direction, design leadership, and all visual contributors.

**Responsibility:** Define the project’s broad artistic territory, tone, boundaries, and intended audience impression.

The shared [Visual Direction](visual-direction.md) establishes the world-level direction before individual character decisions are made.

## Layer 2: Visual DNA

**Audience:** Character designers, concept artists, reviewers, and AI-assisted workflows.

**Responsibility:** Define the immutable visual rules inherited by every character.

The shared [Visual DNA](visual-dna.md) governs caricature, proportion, silhouette, facial language, colour, materials, recognition, and signature exaggeration. It creates family resemblance without making characters identical.

## Layer 3: Character Bible

**Audience:** Human designers, artists, art directors, and reviewers.

**Responsibility:** Preserve the long-form creative identity of one character or symbol.

A Character Bible records narrative intent, personality, emotional direction, visual reasoning, artistic boundaries, relationships, and long-term design decisions. It supports discussion and future iteration. It may explain why a choice matters and retain context that should not be compressed out of the human design process.

A Character Bible is not sent directly to an image-generation model. Its approved visual decisions are distilled into a separate Image Specification.

Character Bibles live under [`symbols/`](symbols/).

## Layer 4: Image Specification

**Audience:** AI image generators, with human review.

**Responsibility:** Define the visible requirements for one image subject.

An Image Specification is a compact, structured visual brief of approximately 150–300 words. It contains only information that should affect the image: identity, silhouette, face, costume, colours, composition, readability, exclusions, and target impression. It removes narrative explanation, gameplay context, design history, and unresolved discussion.

Every symbol should eventually receive its own Image Specification derived from its approved Character Bible or equivalent human design source. The shared format is defined in [Image Specification](image-specification.md).

## Layer 5: AI Generation Guide

**Audience:** AI image-generation models and the humans preparing generation inputs.

**Responsibility:** Define how all Image Specifications must be interpreted.

The shared [AI Generation Guide](ai-generation-guide.md) establishes priority, fidelity, consistency, invention limits, and concept-art expectations. It does not define any individual symbol. It accompanies every symbol-specific Image Specification and should remain stable across a generation batch.

## Concept Art and Rotation

Generated concept art is exploratory material, not an automatic production asset or design decision. Design Critique compares the result against the Image Specification, Character Bible, Visual DNA, and Visual Direction. Rejected deviations do not silently redefine the character.

Accepted discoveries move through Documentation Update before the Next Rotation begins. When a design changes, update the human reference first, then derive a revised Image Specification. This preserves a traceable direction from creative intent to visual output.
