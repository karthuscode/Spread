# V1 Production Roadmap

## Production Goal

V1 is the first playable graphical prototype of *Spread*. Its goal is completeness rather than polish.

V1 must prove that the complete visual symbol set, essential game presentation, and existing gameplay systems work together in one playable build. Temporary simplicity is acceptable where it does not prevent the player from reading the game state or completing the core play loop.

## V1 Scope

The prototype includes:

- a complete symbol set;
- one finalized slot icon for every symbol;
- a background;
- a reel frame;
- basic UI;
- working gameplay integration;
- the infection mechanic;
- paylines;
- win calculation; and
- win highlighting.

One finalized icon per symbol means one approved, production-ready static icon that is readable at gameplay size and consistent with the established Visual DNA. V1 does not require alternate poses or animation frames.

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

Status notation: an unchecked item marked **In progress** is active production work. All other unchecked items have not yet reached completion.

- [ ] Masked Surgeon — **In progress**
- [ ] Nurse — **In progress**
- [ ] Human 2
- [ ] Human 3
- [ ] Medical Equipment 1
- [ ] Medical Equipment 2
- [ ] Medical Equipment 3
- [ ] Virus Wild
- [ ] Infected Wild

The three medical-equipment names remain provisional. Their final visual identities must be approved before their slot icons can be considered complete.

## UI Production Checklist

- [ ] Background
- [ ] Reel Frame
- [ ] Spin Button
- [ ] Basic HUD
- [ ] Logo
- [ ] Panels

The UI only needs the clarity and functionality required for the prototype. Advanced styling, animation, transitions, and cinematic treatment remain outside V1.

## Gameplay Integration Checklist

- [ ] All finalized symbol icons appear correctly on the reels
- [ ] Spin control completes a full playable spin
- [ ] Basic HUD communicates the information required to play
- [ ] Infection mechanic is represented correctly in the graphical build
- [ ] Paylines are integrated and readable
- [ ] Wins are calculated correctly
- [ ] Winning symbols or paylines are clearly highlighted
- [ ] Background, reel frame, logo, and panels assemble into one coherent playable screen

## V1 Completion Definition

V1 is officially complete when:

1. every item in the Symbol Production Checklist is complete, with one finalized static slot icon integrated for every symbol;
2. every item in the UI Production Checklist is complete at basic prototype quality;
3. the graphical build supports a complete playable spin from player input through final result;
4. the infection mechanic, paylines, and win calculation work in the graphical build;
5. wins are clearly highlighted and the resulting game state is readable; and
6. the complete prototype has been reviewed as an integrated build with no blocking visual or gameplay-integration defects.

V1 completion does not depend on animation, sprite sheets, VFX, particles, sound, cinematic presentation, or advanced UI polish.
