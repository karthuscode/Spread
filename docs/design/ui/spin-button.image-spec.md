# Spin Button — V1 Image Specification

## Production Identity

- **Asset type:** UI / Primary control
- **Asset name:** Spin Button
- **Asset goal:** Start one graphical prototype spin with clear interaction feedback
- **Production phase:** UI Production
- **Production status:** Specification Ready
- **Reference canvas:** 1920 × 1080, 16:9

This is prototype UI artwork, not final control design. It inherits the project [Visual DNA](../visual-dna.md), [UI Visual Language](ui-visual-language.md), [Reel Grid Specification](../layout/reel-grid-spec.md), and [HUD Panels Specification](hud-panels.image-spec.md).

## Purpose and Hierarchy

The Spin Button is the primary interaction control. It must be locatable within one second in the neutral screen state and remain readable across all required states.

The button may dominate the neutral HUD, but active wins, infection changes, and essential gameplay feedback temporarily take visual priority.

## Silhouette

Use one large, tactile, rounded pressure-switch silhouette mounted in a compact asymmetric metal housing. The interactive face is circular or a softly compressed circle; its outer silhouette must remain distinct from rectangular HUD panels, reel cells, indicator lights, and frame bolts.

Avoid a jewel, casino token, futuristic touch surface, ornate medallion, or oversized mechanical wheel.

## Placement and Scale

At the 1920 × 1080 reference canvas:

- visible button target: 128–136 px diameter;
- minimum interaction hit area: 144 × 144 px;
- hit-area center: `(1424, 932)`;
- hit-area bounds: `x = 1352–1496`, `y = 860–1004`; and
- minimum separation from the reel opening: 24 px.

The button occupies the lower-right end of the HUD band. Keep at least 36 px between its hit area and the Win panel.

Placement must not cover the reel opening, frame silhouette, HUD values, or screen-edge safe area. Do not move the grid to enlarge the button.

## Material and Construction

Build the button from:

1. a dark contact shadow;
2. a blackened painted-steel mounting collar;
3. an aged-rubber compression ring;
4. a warning-amber button face;
5. a recessed or printed Spin icon/label area; and
6. restrained wear at the most frequently touched edge.

Use oxidized steel and dirty teal only on the mounting housing. Keep contamination outside the touch face and label area. The face should feel mechanically powered rather than neon-lit.

## Icon or Text Treatment

Use either:

- a bold clockwise circular-arrow icon; or
- the uppercase runtime label `SPIN`.

The icon is preferred for compact readability, with an accessible text label supplied by the interface. If visible text is used, render it at runtime rather than baking it into the artwork.

Do not combine a large icon and large label if they compete. The active mark must remain clear in grayscale and must not resemble infection tendrils or a payline.

## Lighting

Follow the shared high viewer-left light. The face uses a brighter upper-left plane and deeper lower-right compression shadow.

Glow is semantic and localized. The default state may use a narrow warning-amber rim; hover may increase it slightly. No broad halo may touch the Win panel, frame, or reels.

## Interaction States

### Default

- Face sits level inside the collar.
- Warning amber is bright enough to locate but not luminous across the screen.
- Icon or label has strong contrast.
- Shadow and rim establish a clickable raised form.

### Hover

- Increase the face value and local rim contrast by approximately 10%.
- Add a narrow upper-left highlight.
- Preserve the same silhouette and position.
- Do not use scale growth that moves neighboring layout.

### Pressed

- Depress the face visually by 4–6 px at reference scale.
- Reduce the outer rim highlight and strengthen the inner lower-right shadow.
- Move the icon or label with the face.
- Input response must begin immediately; artwork must not create artificial delay.

### Disabled

- Reduce saturation and contrast.
- Recess the face slightly and remove the active glow.
- Preserve the icon or label at readable contrast.
- Pair the visual state with disabled behavior and an unavailable cursor or focus state.

### Optional Stop

During a spin, the same hit area may display a square Stop icon and a contaminated yellow-green or cloudy off-white core. Stop must be visually distinct from Spin through both icon shape and colour.

The Stop state is optional for V1. If stopping reels is not implemented, keep the button disabled or non-retriggerable during the spin rather than showing a false Stop state.

### Error

For a rejected action, keep the button readable and use a brief muted-magenta edge segment plus a separate runtime message. Do not flash the full screen or cover gameplay.

### Focus

Keyboard focus requires a clean external focus ring separate from hover. Generate it in code or as a scalable overlay, not as part of the static button texture.

## Feedback

Minimum prototype feedback includes:

- immediate visual press response;
- clear disabled behavior while a spin cannot start;
- hover and keyboard-focus distinction;
- restoration to the correct state when the spin resolves; and
- a basic error cue if the wager cannot be accepted.

Audio, haptics, particles, screen shake, elaborate pulses, and advanced transitions are deferred.

## Readability and Safe Zones

Keep the icon or label inside the central 72% of the button face. Keep scratches, chips, and reflections out of that area.

The button must remain recognizable:

- at the prototype’s minimum test size;
- in grayscale;
- without glow;
- when the background is reduced to similar values; and
- beside a positive Win state.

No state may enter the locked reel opening. Temporary feedback remains clipped to the button’s 160 × 160 px local effect box.

## Responsive Behavior

Scale position and artwork with the 16:9 gameplay composition. Preserve a minimum 44 × 44 CSS-pixel hit area on supported devices.

When space is constrained, reduce optional HUD controls before reducing the Spin Button below its minimum usable hit area. Do not distort the circular face. Final responsive polish and alternate mobile composition are deferred.

## Export Requirements

Store source masters under `assets/source/ui/buttons/` and runtime exports under `assets/game/ui/`.

Prepare separate transparent assets or a state atlas for:

```text
spin-button-default.png
spin-button-hover.png
spin-button-pressed.png
spin-button-disabled.png
spin-button-stop.png
```

The Stop export is required only if the behavior is implemented. Use a 2× PNG master for textured artwork. SVG may be used for the icon and focus ring. Keep icon, text, glow, and focus treatment separable where practical.

All state canvases must share identical dimensions, origin, pivot, and transparent padding. Do not bake the background, HUD, Reel Frame, or localized label into the button files.

## Prototype Acceptance Criteria

- The button is the most obvious neutral-state control within one second.
- Its 144 × 144 px reference hit area does not overlap other controls.
- Default, hover, pressed, disabled, and focus states are distinct.
- The optional Stop state appears only when Stop behavior exists.
- Pressed feedback is immediate and does not move the surrounding layout.
- Icon or label remains readable in colour and grayscale without relying on glow.
- The button does not compete with active wins or infection feedback.
- Runtime state and accessibility behavior match the displayed artwork.
- Exported states align exactly with no visual jump.
- No advanced effects or final-polish dependencies are required.

## Avoid

- tiny controls, hidden hit areas, or decoration resembling the primary button;
- broad neon halos, particles, screen shake, or elaborate animation;
- gold, gems, casino-red gloss, glass, or futuristic touch-screen styling;
- baked localized text;
- a Stop state without implemented Stop behavior; and
- any intrusion into gameplay or change to the locked reel layout.
