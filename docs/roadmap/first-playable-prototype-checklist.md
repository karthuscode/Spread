# First Playable Graphical Prototype Checklist

## Purpose

This checklist defines the minimum work required to turn the current static graphical foundation and TypeScript gameplay domain into the first playable graphical prototype of *Spread*.

The target is one understandable interactive spin from player input through result presentation. It is a production-validation milestone, not a finished game or final visual-quality gate.

## Status Language

- **Prototype Complete** — usable for integration and validation; revision remains permitted.
- **Specification Ready** — documented well enough for asset production or implementation to begin.
- **Required** — must be complete before the first playable graphical prototype can be validated.
- **Deferred** — deliberately outside this milestone.

No **Prototype Complete** artwork is final production artwork.

## 1. Already Complete

### Gameplay and Technical Foundation

- [x] Core gameplay architecture — **Prototype Complete**
- [x] Five-reel, three-row Grid model — **Prototype Complete**
- [x] Weighted symbol generation — **Prototype Complete**
- [x] Infection mechanic — **Prototype Complete**
- [x] Payline evaluation — **Prototype Complete**
- [x] Paytable foundation and win calculation — **Prototype Complete**
- [x] Domain-level spin orchestration — **Prototype Complete**
- [x] Automated gameplay tests and simulation tools — **Prototype Complete**

### Visual Foundation

- [x] Visual direction and Visual DNA — **Prototype Complete**
- [x] Character and symbol specifications — **Prototype Complete**
- [x] Prototype symbol set — **Prototype Complete**
- [x] Prototype background — **Prototype Complete**
- [x] UI visual language — **Prototype Complete**
- [x] Reel Grid Specification — **Prototype Complete**
- [x] Reel Frame — **Prototype Complete**
- [x] First graphical prototype preview — **Prototype Complete**
- [x] README prototype showcase — **Prototype Complete**

### Remaining UI Documentation

- [x] HUD Panels specification — **Specification Ready**
- [x] Spin Button specification — **Specification Ready**
- [x] Prototype Logo specification — **Specification Ready**

The first graphical preview proves that the visual foundation can be composed. It does not prove runtime loading, interaction, state feedback, or a playable graphical spin.

## 2. Required Before First Playable Prototype

### UI Asset Production

- [ ] Generate and review Balance, Bet, and Win HUD panel assets
- [ ] Generate and review the Spin Button asset and required visual states
- [ ] Generate and review the prototype logo
- [ ] Export approved prototype UI assets to stable runtime paths under `assets/game/ui/`
- [ ] Keep runtime labels, values, focus rings, and state messages separate from artwork

### Static Assembly and Layout Validation

- [ ] Assemble a complete full-screen UI mockup
- [ ] Store the review composition under `assets/previews/full-screen-compositions/`
- [ ] Validate the locked 5×3 grid and 5:3 reel opening
- [ ] Validate HUD, Spin Button, and logo placement at the 1920 × 1080 reference canvas
- [ ] Review symbol scale, spacing, contrast, and grayscale readability
- [ ] Confirm that no UI artwork enters the gameplay opening
- [ ] Confirm that the mockup uses only prototype-quality status language

### Graphical Integration

- [ ] Integrate the prototype background
- [ ] Integrate the Reel Frame without changing the Reel Grid Specification
- [ ] Render the fixed 5×3 grid from gameplay state
- [ ] Load all prototype symbol assets through stable runtime paths
- [ ] Clip symbols and gameplay effects to the reel opening
- [ ] Render the prototype logo
- [ ] Render Balance, Bet, and Win values as runtime text
- [ ] Render the Spin Button and its required states

### Interaction and Result Presentation

- [ ] Connect the Spin Button to one complete domain-level spin
- [ ] Prevent additional spin input while a spin cannot be accepted
- [ ] Display the final 5×3 reel result
- [ ] Display the current Balance
- [ ] Display the current Bet
- [ ] Provide basic Bet increase and decrease controls
- [ ] Prevent invalid Bet adjustments
- [ ] Deduct the accepted wager from Balance
- [ ] Display the resolved Win value
- [ ] Apply the resolved payout to Balance
- [ ] Keep displayed values synchronized with gameplay state

### Minimum Gameplay Feedback

- [ ] Show clear infection transformation feedback from eligible human to Infected Wild
- [ ] Distinguish the pre-infection result from the resolved final grid
- [ ] Add a basic winning-line or winning-symbol highlight
- [ ] Keep payline feedback readable without covering symbols
- [ ] Provide a disabled Spin state during unavailable interaction
- [ ] Provide disabled Bet-control states at valid limits
- [ ] Provide a basic insufficient-Balance or rejected-action error state
- [ ] Return all controls to the correct state after result resolution

### Prototype Validation Gate

- [ ] A player can identify Balance, Bet, Win, and Spin within one second
- [ ] A player can adjust Bet within permitted prototype limits
- [ ] One button press completes one graphical spin
- [ ] The graphical result matches the domain `SpinResult`
- [ ] Infection feedback matches the final infected grid
- [ ] Win feedback matches evaluated paylines and calculated payout
- [ ] Balance, Bet, and Win remain correct across repeated spins
- [ ] Basic keyboard focus and activation work for interactive controls
- [ ] Errors do not leave the prototype in an unusable state
- [ ] The complete screen passes production review with no blocking readability or interaction defects

## 3. Deferred Until Later Polish

The following items are intentionally outside the first playable graphical prototype:

- [ ] Final production artwork
- [ ] Final symbol, background, Reel Frame, UI, or logo revisions
- [ ] Advanced reel, idle, win, and character animations
- [ ] Particles and advanced VFX
- [ ] Screen shake
- [ ] Full audio production
- [ ] Music
- [ ] Advanced transitions and cinematic presentation
- [ ] Multiple themes
- [ ] Final responsive polish and alternate mobile composition
- [ ] Final branding polish
- [ ] Advanced Auto Spin presentation and behavior
- [ ] Haptics and elaborate control feedback

Deferred work must not block validation of the first playable graphical prototype.

## Production Order

Follow this sequence:

1. HUD Panels specification — **Specification Ready**
2. Spin Button specification — **Specification Ready**
3. Prototype Logo specification — **Specification Ready**
4. Generate remaining UI assets
5. Assemble complete static UI mockup
6. Review layout and readability
7. Integrate visuals into the TypeScript project
8. Implement first functional graphical spin
9. Add basic gameplay feedback
10. Validate the first playable graphical prototype

## Completion Boundary

The milestone is reached when the required checklist supports a readable, repeatable graphical spin and passes the validation gate. Reaching it means the prototype is ready for further testing and iteration; it does not approve any asset, branding, animation, balance, or presentation as final.
