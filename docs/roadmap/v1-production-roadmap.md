# V1 Production Roadmap

## Production Goal

V1 is the first playable graphical prototype of *Spread*. Its goal is completeness rather than polish.

V1 must prove that the complete visual symbol set, essential game presentation, and existing gameplay systems work together in one playable build. Temporary simplicity is acceptable where it does not prevent the player from reading the game state or completing the core play loop.

**Current production phase:** UI Production

**Next milestone:** First Playable Graphical Prototype

All current artwork is **Prototype Complete** only: usable for integration and production validation, but open to later revision.

## V1 Scope

The prototype includes:

- a complete symbol set;
- one production-ready prototype slot icon for every symbol;
- a background;
- a reel frame;
- basic UI;
- working gameplay integration;
- the infection mechanic;
- paylines;
- win calculation; and
- win highlighting.

One production-ready prototype icon per symbol means one usable static icon that is readable at gameplay size and consistent with the established Visual DNA. These icons enable prototype integration; they are not final artwork, are not permanently locked, and may receive future visual revisions. V1 does not require alternate poses or animation frames.

## Intentional Exclusions

V1 intentionally excludes:

- idle animations;
- win animations;
- sprite sheets;
- VFX;
- particles;
- sound;
- cinematic presentation; and
- advanced UI polish.

These exclusions are not missing V1 work. They belong to the V2 polish phase and must not delay completion of the playable graphical prototype.

## V1 Asset Pipeline

Every V1 symbol asset follows the same production path:

```text
Visual Direction
        ↓
Visual DNA
        ↓
Character Bible
        ↓
Image Specification
        ↓
AI Generation
        ↓
Slot Icon
        ↓
Prototype Integration
```

An asset is not complete merely because an image has been generated. It must be converted into a readable slot icon and integrated into the playable prototype.

## Symbol Production Checklist

Every V1 symbol has a usable slot icon and has entered prototype production:

- [x] Masked Surgeon — **Prototype Complete**
- [x] Nurse — **Prototype Complete**
- [x] Human 2 — **Prototype Complete**
- [x] Human 3 — **Prototype Complete**
- [x] Medical Equipment 1 — **Prototype Complete**
- [x] Medical Equipment 2 — **Prototype Complete**
- [x] Medical Equipment 3 — **Prototype Complete**
- [x] Virus Wild — **Prototype Complete**
- [x] Infected Wild — **Prototype Complete**

**Prototype Complete** does not mean Final. It confirms that a usable icon exists and can be integrated into the first complete playable graphical prototype. Visual review, replacement, and refinement remain permitted.

## Graphical Foundation Status

- [x] Symbol Production — **Prototype Complete**
- [x] Environment Production — **Prototype Complete**
- [x] Reel Grid Specification — **Prototype Complete**
- [x] Reel Frame — **Prototype Complete**
- [x] First Graphical Prototype Foundation — **Prototype Complete**

The graphical foundation confirms that the background, frame, symbols, and locked 5×3 layout can be reviewed together in a static composition. It does not yet provide graphical interaction or a playable screen.

## Active Phase: UI Production

The minimum remaining interface is documented in:

- [HUD Panels Specification](../design/ui/hud-panels.image-spec.md) — **Specification Ready**
- [Spin Button Specification](../design/ui/spin-button.image-spec.md) — **Specification Ready**
- [Prototype Logo Specification](../design/ui/logo.image-spec.md) — **Specification Ready**

UI work is limited to the assets and states required for a readable first playable graphical prototype. Advanced styling, animation polish, transitions, audio, and cinematic treatment remain outside V1.

### Next Production Steps

1. [ ] Generate remaining prototype UI assets
2. [ ] Assemble a complete static full-screen prototype mockup
3. [ ] Review layout and readability
4. [ ] Integrate the visual assets into the TypeScript project
5. [ ] Implement the first functional graphical spin
6. [ ] Add basic gameplay feedback
7. [ ] Validate the First Playable Graphical Prototype

The detailed production gate is maintained in the [First Playable Graphical Prototype Checklist](first-playable-prototype-checklist.md).

## Gameplay Integration Checklist

- [ ] Background and Reel Frame render around the locked reel opening
- [ ] All Prototype Complete symbol icons load and render in the 5×3 grid
- [ ] Spin control completes one full graphical spin
- [ ] Balance, Bet, and Win communicate the information required to play
- [ ] Basic Bet adjustment rejects invalid values
- [ ] Infection transformation is represented correctly in the graphical build
- [ ] Winning lines or symbols receive a basic readable highlight
- [ ] Displayed results and values match the existing gameplay domain
- [ ] Basic error and disabled states prevent invalid interaction
- [ ] Background, Reel Frame, logo, panels, controls, and symbols assemble into one coherent playable screen

## First Playable Prototype Validation

The next milestone is validated when:

1. every required prototype asset has a stable runtime export;
2. the graphical build supports a complete spin from player input through final result;
3. Balance, Bet, Win, infection, and winning results are correctly represented;
4. essential controls provide usable default, disabled, and error states;
5. the screen follows the Reel Grid Specification and remains readable; and
6. the integrated build has no blocking visual or interaction defects.

Passing this gate establishes the first playable graphical prototype. It does not make the game or its artwork final. Animation polish, sprite sheets, VFX, particles, sound, music, cinematic presentation, final responsive polish, and final branding remain deferred.
