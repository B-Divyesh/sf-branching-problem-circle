# Adversarial first-read review 2 — Branching Problem Circle

Reviewed 28 August 2026 against `https://branching-problem-circle.sociobot.in` and repository commit `1ca1092a1412669a4febae803e843f90605f580e`.

## Verdict: FAIL

The cold first screen, realistic isolated demo, core facilitator flow, privacy posture, claim commands, and build gates all work. Six remaining documentation/contract defects prevent a PASS: one landing claim and one README claim are not registered, the printable-recap claim is not actually proved by its test, and three earlier defects are only partly repaired (README storage jargon, legal/404 metadata, and 404 header parity).

## Cold first screen

Fresh Chromium contexts with no site data were opened at 390×844 and 1440×900 before scrolling.

- **What it does:** compare several approaches to one math problem, collect anonymous votes, then reveal hints.
- **For whom:** volunteer leaders of small math circles.
- **First click:** **Try it with sample data**; the adjacent text says it opens a sample circle and saves nothing.

This is clear in both viewports. The 390px viewport shows the audience, complete h1, explanation, primary action, and its outcome without scrolling. No blocking first-read finding.

## Findings

### Blocking — claim-contract defects

#### F-2-1 — The landing-page “one shared device” claim is unlisted

- **Quote/location:** landing, Limits and privacy: “Built for one shared device”.
- **Why this fails:** this is a practical limitation a facilitator can rely on, but no `.factory/claims.json` entry lists it and no tagged test proves the absence of a multi-device/public-room path. `no-public-sharing` covers accounts and public sharing, not this statement or location.
- **Concrete fix:** add a `single-device` claim whose `where` includes this heading and whose clean-demo test verifies that session data uses only local browser storage and the product exposes no room, pairing, sync, or public-share route. Alternatively rewrite the heading to a non-claim section name such as `Privacy and limits` and put the tested local-storage fact in the paragraph.

#### F-2-2 — README promises JSON import without a registered claim or import test

- **Quote/location:** README, What it does: “Export and import circle data as JSON.”
- **Why this fails:** `recap-export` claims only “printable recap and JSON export”; its `@claim:recap-export` test downloads JSON but does not import a valid export. A facilitator relying on import has no listed, observable proof.
- **Concrete fix:** add `json-import` to `claims.json` with this README location and a clean `/demo` test that imports a valid exported fixture, confirms the replacement preview, and confirms the imported circle persists only in the active namespace. If import is not supported, change the sentence to `Export circle data as JSON.`

#### F-2-3 — The “one-page printable recap” claim is not tested as a printable one-page result

- **Quote/location:** landing fact: “One-page printable recap”; `.factory/claims.json` `recap-export`; `tests/e2e/app.spec.ts` `@claim:recap-export`.
- **Why this fails:** the tagged test verifies a JSON download and then only checks that the banner is hidden under print media. It never invokes printing, captures a PDF, or asserts that the sample recap fits one page. It therefore does not prove the quantitative “one-page” part of the stated claim.
- **Concrete fix:** generate the demo recap with Chromium `Page.printToPDF` (or an equivalent print fixture) and assert one page plus the expected recap content. Keep the claim only if that check passes for the documented demo sample; otherwise change the landing text to `Printable recap`.

### Blocking — repeated earlier findings

#### F-1-29 — README still exposes implementation jargon in visitor-facing demo instructions

- **Quote/location:** README, Demo: “It uses the separate IndexedDB database `branching-problem-circle-demo`.”
- **Why this fails:** this is a recurrence of F-1-29’s unexplained implementation-term defect. `IndexedDB` and the database identifier do not help a volunteer decide whether the sample is safe. It also contradicts `.factory/copy-audit.md`, which says implementation-only words appear only in developer and sandbox documentation.
- **Concrete fix:** rewrite as `The sample is stored separately from your real circles.` Keep the database name in `.factory/demo.md` for verification.

#### F-1-14 — Legal and 404 routes still do not have the required full social metadata

- **Quote/location:** live `/privacy/` and `/terms/` have `twitter:card` only; live `/404.html` has no Open Graph or Twitter metadata. The corresponding source files are `privacy/index.html`, `terms/index.html`, and `404.html`.
- **Why this fails:** this is a partial repair of F-1-14, not a complete fix. The route contract requires each page to provide Open Graph and Twitter title, description, and the product-art image. Shared legal/error links consequently lack a complete preview and 404 has no route-specific social metadata at all.
- **Concrete fix:** add `og:type`, `og:title`, `og:description`, and `og:image`, plus `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` to all three files. Use each page’s existing title/description and `/assets/social-card.jpg`; add a regression test that checks every shipped HTML route.

#### F-1-17 — The 404 header is still not consistent with the rest of the site

- **Quote/location:** live `/404.html` header links are `Demo` and `Privacy`; `/`, `/privacy/`, and `/terms/` also provide `How it works`.
- **Why this fails:** this is a partial repair of F-1-17, not a complete fix. The site-structure contract requires a consistent header with the wordmark, Demo, product main section, and Privacy. A visitor who lands on a bad URL loses the main explainer link.
- **Concrete fix:** add `<a href="/#how-it-works">How it works</a>` to the 404 header and cover header-link parity in the route smoke test.

## Complete copy audit

Word counts use whitespace-delimited words. Headings, button labels, and alt text are listed as copy units because they are read by a first-time visitor. No landing or README copy unit exceeds 22 words. The only copy finding is repeated F-1-29; all landing labels are plain and the action labels name a result.

### Landing page

| Copy unit | Words | Result |
| --- | ---: | --- |
| Skip to the circle | 4 | Pass |
| Branching Problem Circle | 3 | Pass — wordmark |
| Demo | 1 | Pass — navigation |
| How it works | 3 | Pass — section navigation |
| Privacy | 1 | Pass — navigation |
| For volunteer leaders of small math circles | 7 | Pass |
| Compare several approaches to one math problem | 7 | Pass — clear h1 |
| Collect anonymous votes on several approaches, then reveal hints during the discussion. | 11 | Pass |
| Try it with sample data | 5 | Pass — result-naming action |
| Opens a sample circle; nothing is saved. | 7 | Pass — covered by demo claims |
| Create a circle | 3 | Pass — result-naming action |
| Import a circle | 3 | Pass — result-naming action |
| Circle data stays in this browser | 6 | Pass — `browser-only` |
| Up to six approaches, including dead ends | 6 | Pass — `six-approaches` |
| One-page printable recap | 3 | F-2-3 |
| Blank handmade ceramic tiles branch three ways around a central tile, with six river stones marking choices. | 17 | Pass — useful alt text |
| The illustration shows one problem branching into three approaches. | 9 | Pass |
| See the circle in use | 5 | Pass — preview label |
| One problem, three approaches, a shared discussion | 7 | Pass — preview heading |
| Open the sample to inspect votes, hints, and a printable recap before making your own circle. | 16 | Pass — covered by demo/recap claims |
| Open the sample circle | 4 | Pass — result-naming action |
| How it works | 3 | Pass — section heading |
| Write a problem. | 3 | Pass |
| Confirm you can use it with your group. | 8 | Pass |
| Add approaches. | 2 | Pass |
| Keep up to six possible starts visible. | 7 | Pass — `six-approaches` |
| Reveal and recap. | 3 | Pass |
| Collect votes, open hints, then print or export. | 8 | Pass — covered by demo/recap claims |
| Limits and privacy | 3 | Pass — section heading |
| Built for one shared device | 6 | F-2-1 |
| No public sharing, child accounts, rankings, test banks, or generated solutions. | 10 | Pass — `no-public-sharing` |
| Circle data stays in your browser. | 6 | Pass — `browser-only` |
| Templates | 1 | Pass — section heading |
| Starter templates are included | 4 | Pass — `included-templates` |
| Authoring, voting, printing, and export are free. | 6 | Pass — `included-templates` |
| Browse templates | 2 | Pass — result-naming action |
| Circle data stays in this browser | 6 | Pass — `browser-only` |
| reloads offline after your first visit. | 6 | Pass — `offline-reload` |
| Terms | 1 | Pass — navigation |
| Built by Param Factory | 4 | Pass — provenance |

### README

| Copy unit | Words | Result |
| --- | ---: | --- |
| Branching Problem Circle | 3 | Pass — document title |
| Branching Problem Circle helps volunteer math-circle leaders compare several approaches to one problem. | 12 | Pass |
| Keep starts, failed approaches, votes, hints, and solutions in one circle. | 11 | Pass |
| Lead a discussion without reducing it to one answer. | 10 | Pass |
| It is made for a leader sharing one device with a small group. | 13 | F-2-1 — same unlisted limitation |
| There are no child accounts, public rooms, rankings, test banks, or generated solutions. | 12 | Pass — `no-public-sharing` |
| Use only problems you have permission to share. | 9 | Pass — instruction |
| Try the isolated sample at https://branching-problem-circle.sociobot.in/demo. | 6 | Pass |
| What it does | 3 | Pass — heading |
| Create one problem with up to six approaches. | 8 | Pass — `six-approaches` |
| Collect anonymous votes, written reasons, and alternative ideas. | 8 | Pass — demo workflow |
| Reveal a hint or facilitator note when you choose. | 10 | Pass — demo workflow |
| Print or save a one-page recap. | 7 | F-2-3 |
| Export and import circle data as JSON. | 7 | F-2-2 |
| Reload offline after the first visit. | 6 | Pass — `offline-reload` |
| Keep circle data in your browser. | 6 | Pass — `browser-only` |
| Starter templates are included. | 4 | Pass — `included-templates` |
| Circle authoring, voting, printing, and export are free. | 8 | Pass — `included-templates` |
| See the privacy notice and terms. | 6 | Pass — navigation |
| Demo | 1 | Pass — heading |
| /demo loads an original hexagon problem with three approaches, six anonymous votes, a revealed hint, and a recap. | 18 | Pass — `demo-sample` |
| It uses the separate IndexedDB database branching-problem-circle-demo. | 7 | F-1-29 |
| Reset demo restores that sample. | 5 | Pass — `demo-isolation` |
| Start for real returns to the normal branching-problem-circle database without copying demo data. | 12 | Pass — `demo-isolation` |
| Develop | 1 | Pass — heading |
| Requires Node.js 20 or newer. | 5 | Pass — setup requirement |
| No environment variables or backend are required. | 8 | Pass — setup requirement |
| Test and build | 3 | Pass — heading |
| npm run build type-checks the app and writes the static deploy to dist/, with dist/index.html at its root. | 18 | Pass — developer instruction |
| Browser tests use Playwright 1.58.2. | 5 | Pass — developer instruction |
| They cover the demo, claims, accessibility, keyboard focus, mobile targets, import recovery, privacy, and offline reload. | 14 | Pass — developer instruction |
| Deploy | 1 | Pass — heading |
| Deploy dist/ to the configured static host. | 7 | Pass — developer instruction |
| HTTPS is required for service workers outside localhost. | 8 | Pass — platform requirement |
| public/staticwebapp.config.json supplies routing, response headers, cache rules, and the 404 rewrite. | 9 | Pass — developer instruction |
| The original ceramic illustration and its provenance live in assets/src/. | 9 | Pass — repository fact |
| The visual rationale is in .factory/design.md. | 7 | Pass — repository fact |
| License | 1 | Pass — heading |
| MIT. | 1 | Pass |

## Demo, privacy, claims, and quality gates

- `/demo` opens immediately to the original hexagon sample with three approaches, six votes, a revealed hint/path, and recap data. The persistent banner says `Demo — sample data, nothing is saved` and exposes **Reset demo** and **Start for real**.
- In a fresh local browser context, demo activity created only IndexedDB `branching-problem-circle-demo`; after **Start for real**, the normal landing screen appeared and no real database was created or read. **Reset demo** restored `A hexagon has six corners`.
- The full demo-flow request log contained only the product origin (document, bundled JS, bundled CSS, and navigation). The live cold landing request log also contained only `https://branching-problem-circle.sociobot.in` resources. No tracker, remote font, or third-party script was observed.
- A fresh first visit to `/demo`, followed by `context.setOffline(true)` and reload, retained the sample h1 and UI. This independently confirms the offline statement, including without the extra online reload used by the existing claim test.
- Clean clone `/tmp/bpc-review-vN3u1R`: `npm ci`, `npm test` (5/5), and `npm run build` passed. Every command named in `claims.json` passed in desktop and 390px projects: `demo-sample`, `demo-isolation`, `browser-only`, `offline-reload`, `six-approaches`, `recap-export`, `included-templates`, and `no-public-sharing`.
- The complete local Playwright suite passed: 24/24. The build emits `dist/`; initial JavaScript is 10.65 kB gzip.

## Structure and visual checks

- `/`, `/demo`, `/privacy/`, `/terms/`, `/404.html`, the manifest URLs, robots, sitemap, icons, and product assets returned 200; an unknown route returned the designed 404 with HTTP 404. No dead ordinary link was found; mailto links are explicit external actions.
- Landing title, description, canonical, Open Graph/Twitter image metadata, SVG favicon, Apple icon, one h1, `lang=en`, main landmark, visible focus, and skip link are present. `/demo` updates to `Demo — Branching Problem Circle`; route phases deep-link and reload.
- `/privacy/`, `/terms/`, and `/404.html` have one h1 and main landmark. Repeated F-1-14 and F-1-17 remain for their metadata/navigation parity.
- Live response headers include CSP with `frame-ancestors 'none'`, `X-Content-Type-Options`, Referrer Policy, Permissions Policy, and frame denial. Hashed assets are immutable cached; manifest URLs are JSON MIME.
- The ceramic illustration, self-hosted system typography, cobalt/ice palette, irregular tile geometry, and restrained reduced-motion behavior match `.factory/design.md` and are distinct from a generic SaaS template.

## Earlier-finding verification

All prior review/polish/handoff files were read. Most prior findings are fixed in both current code and observed behavior. The three partial repairs below are repeated under their original IDs, as required.

| Earlier finding | Current verification |
| --- | --- |
| F-1-1 | Landing now names the job, audience, sample action, and outcome. |
| F-1-2 | `/demo` seeds realistic data in a separate demo DB with reset/exit banner. |
| F-1-3 | `claims.json` and eight tagged claim tests exist and pass from a clean clone. |
| F-1-4 | Paid checkout/price offer removed; all templates are enabled and included. |
| F-1-5 | `/demo` and phase routes resolve; unknown path returns designed HTTP 404. |
| F-1-6 | Arrow/Home/End retain selected phase-tab focus. |
| F-1-7 | Escape from Templates returns focus to Templates. |
| F-1-8 | 390px wordmark, Privacy, and Terms links meet 44px height tests. |
| F-1-9 | Rights checkbox blocks save and receives focus until checked. |
| F-1-10 | Bad JSON shows actionable import recovery text and preserves current circle. |
| F-1-11 | Live hashed assets send immutable cache headers. |
| F-1-12 | Live CSP/frame/permissions/nosniff/referrer headers are present. |
| F-1-13 | Both manifest URLs serve JSON MIME. |
| F-1-14 | **Repeated, blocking:** route social metadata is still incomplete on legal/404 pages; see F-1-14 above. |
| F-1-15 | Phase URLs, `pushState`, reload, back-focus handling, and live route announcement code exist. |
| F-1-16 | Landing includes sample preview, How it works, limits/privacy, and included-templates section. |
| F-1-17 | **Repeated, blocking:** 404 still omits the main How it works link; see F-1-17 above. |
| F-1-18 | Audience label is plain volunteer-leader language. |
| F-1-19 | H1 states the concrete job. |
| F-1-20 | Explanation consistently uses approaches and hints. |
| F-1-21 | Empty slogan removed; concrete limits listed. |
| F-1-22 | Template shelf renamed Browse templates/Templates. |
| F-1-23 | Primary real-data action is Create a circle. |
| F-1-24 | Browser-specific privacy wording replaces overbroad device wording. |
| F-1-25 | Caption describes the illustration. |
| F-1-26 | Footer has test-backed browser/offline facts. |
| F-1-27 | README opening is plain and audience-specific. |
| F-1-28 | Long README statement is split below the 22-word cap. |
| F-1-29 | **Repeated, blocking:** README still exposes IndexedDB in visitor-facing demo copy; see F-1-29 above. |
| F-1-30 | Visitor terminology consistently uses circle, problem, approach, vote, hint, and recap. |
| F-1-31 | Dialog eyebrow is Templates. |
| F-1-32 | Dialog h2 is Choose a session template. |
| F-1-33 | Abstract paid-pack language removed. |
| F-1-34 | Blank template is Blank circle. |
| F-1-35 | Failed-approach template uses plain wording. |
| F-1-36 | Paid session-shapes offer removed. |

## Missed leverage

No AI feature is missing. The brief requires facilitator-supplied, rights-cleared problems and specifically excludes generated solutions; adding generation would be decorative and counter to the product’s purpose. The obvious valuable adjuncts—isolated sample, JSON import/export, and printable recap—are present. F-2-2 requires the existing import promise to be proved, not a new capability.

## What would make this perfect

Register and prove the single-device and JSON-import promises; make the print test verify an actual one-page output; remove the README’s database jargon; and complete the legal/404 metadata and 404 navigation. Then rerun this whole review from fresh desktop and mobile contexts. A PASS requires zero findings, including copy and metadata details.
