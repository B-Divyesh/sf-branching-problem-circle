# Branching Problem Circle — visual thesis

## Direction: glacial minimal ceramics

The circle is a quiet thinking table, not a quiz stage. The interface borrows from a pale ceramic workbench beside glacial water: warm chalk-white clay, hairline blue-grey edges, ink-dark type, and a single cobalt glaze that gathers around decisions. Approach branches look like imperfect handmade tiles rather than score cards. The slight irregularity makes unfinished thinking feel welcome; the disciplined spacing keeps facilitation calm.

The product is intentionally single-mode. A painted light background is part of the material metaphor, and all colors below meet WCAG AA in that treatment.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--ice` | `#F2F5F3` | app background |
| `--slip` | `#FBFCF8` | raised ceramic surfaces |
| `--clay` | `#E4E8E2` | dividers and quiet fills |
| `--ink` | `#172625` | primary text |
| `--moraine` | `#52615E` | secondary text |
| `--cobalt` | `#174E72` | actions, focus, selected state |
| `--cobalt-deep` | `#0F3A57` | pressed actions |
| `--lichen` | `#47633B` | success / revealed |
| `--ochre` | `#79531F` | caution / hint |
| `--oxide` | `#8A342F` | destructive / errors |

Body text on `--ice` and `--slip` is at least 7:1. Cobalt, lichen, ochre, and oxide are paired with labels or icons so color never carries state alone.

## Type

- Display: Georgia, `Times New Roman`, serif. Its broad, bookish shapes suggest a hand-set problem sheet without importing a font.
- Interface and body: system UI (`Inter`-like platform stack). It stays crisp in a busy room and costs no font bytes or third-party request.
- Scale: 14, 16, 18, 22, 30, and a fluid 38–58px display. Body is never below 16px. Long text is held to 68 characters.
- Numbers and vote counts use tabular figures.

## Space and shape

An 8px base rhythm with 4px used only for optical adjustment. Content maxes at 1180px. Primary reading columns max at 720px. Controls are at least 44px high with 8px separation. Corners use 18–28px soft ceramic radii; approach tiles alternate subtly asymmetric corner recipes to feel formed rather than manufactured. Shadows are cool, short, and diffuse; hairline borders do most of the depth work.

On phones, the facilitator rail becomes a compact top status area and branch tiles stack. The session phase switcher scrolls horizontally. Authoring forms and projection controls retain full labels. The decorative hero is cropped and recedes behind the core “Start a circle” action.

## Interaction grammar

- `Write` creates or edits the problem and its approaches.
- `Invite ideas` opens the anonymous participant voting view with a short room code.
- `Open hint` and `Reveal note` uncover content in facilitator-controlled order.
- Votes appear as small cobalt glaze beads and exact counts, never a leaderboard.
- Every mutation confirms in a restrained live region. Destructive actions name the target and require confirmation; import previews before replacement.
- Keyboard: ordinary tab order, Enter/Space for actions, arrow keys inside the phase tabs, Escape closes dialogs.

## Motion

150–240ms opacity and translate transitions model lifting or setting down a ceramic tile. A newly revealed branch rises 6px and settles once. No loops, confetti, timers, or competitive motion. Under `prefers-reduced-motion: reduce`, transforms and smooth scrolling are removed and state changes use an instant outline/opacity change.

## Original asset plan and provenance

One generated still-life hero clarifies the product metaphor: an overhead circle of handmade porcelain tiles branching around a central blank problem tile, with cobalt glaze marks and six small river stones suggesting anonymous votes. It contains no people, text, symbols, brands, or UI. The final is used as atmospheric context on the welcome/empty state; the actual workflow is rendered accessibly in HTML.

Prompt sheet:

> Use case: stylized-concept. Asset type: responsive landing-page hero illustration. Primary request: an overhead still life of a collaborative math thinking circle expressed as handmade porcelain tiles; one central blank ivory tile with three gently branching chains of smaller irregular tiles, and six small rounded river stones gathered near different paths. Scene: pale glacial stone tabletop. Style: tactile editorial ceramic photography, restrained and believable, slight handmade imperfections. Composition: landscape, centered object cluster, clean negative space around edges, no crop of the arrangement. Lighting: diffuse arctic morning light, soft short shadows, calm and curious. Palette: chalk white, celadon ice, blue-grey, sparing deep cobalt glaze, charcoal. Materials: matte unglazed porcelain, subtle glaze pools, fine stone grain. Constraints: no people, no hands, no writing, no numerals, no mathematical symbols, no UI, no logos, no watermark. Avoid: generic 3D blobs, glossy plastic, gradients, school clichés, chess pieces, busy props.

- Generator: Azure OpenAI image deployment `factory-image` via `/opt/fleet/lib/gen-image.sh`.
- Date: 2026-08-28.
- License/provenance: original AI-generated asset created for this product; disclosed in the footer. Source PNG and prompt sidecar live under `assets/src/`; optimized WebP/AVIF outputs live under `public/assets/`.
- Review checklist: no accidental text/symbols, no branding, credible tile joins and shadows, coherent cobalt/ice palette, enough negative space, and no misleading depiction of product capability.

App icons and small interface marks are original inline SVG geometry authored for the product, not generated imagery or a third-party icon set.
