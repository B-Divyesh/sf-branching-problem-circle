# Adversarial first-read review 3 — Branching Problem Circle

Reviewed 28 August 2026 against `https://branching-problem-circle.sociobot.in` and repository commit `2388d682a6e9eb2e19ca9f55a87a9ae3b908d552`.

## Verdict: FAIL

One prior blocking sandbox requirement remains only partly fixed, and two plain-language copy defects remain in the product. The landing is otherwise clear, the sample is immediate and realistic, the registered claim tests pass, and the route/metadata/privacy checks pass. A PASS requires zero findings.

## Cold first screen

Fresh Chromium contexts with no prior storage were opened at 390×844 and 1440×900 before scrolling.

- **What it does:** compares several approaches to one math problem, collects anonymous votes, then reveals hints.
- **For whom:** volunteer leaders of small math circles.
- **First click:** **Try it with sample data**. The adjacent text says, “Opens a sample circle; nothing is saved.”

Both viewports show the audience, complete headline, explanation, primary action, and its result without scrolling. The 390px layout is readable and has no overlap. This part passes.

## Findings

### Blocking

#### F-1-2 — Demo data is not discarded on exit

- **Quote/location:** demo banner, “Demo — sample data, nothing is saved” and “Start for real”; `.factory/demo.md`: “Start for real returns to `/` and discards access to the demo namespace.”
- **Live reproduction:** in a clean context, open `/demo`; choose **Close hint** for “Each corner belongs to two side sums”; choose **Start for real**; open `/demo` again. The hint remains closed. IndexedDB still contains the modified `branching-problem-circle-demo` record (`hintRevealed: false`). No real-circle database was created, but the demo state was retained.
- **Code confirmation:** `src/main.ts` renders **Start for real** as a plain `<a href="/">`; it does not call `clearCircle()` while the demo namespace is active. `src/db.ts` therefore leaves the demo record intact.
- **Why this fails:** the demo sandbox contract requires leaving demo mode to discard demo data unless the visitor is explicitly offered a one-time “keep this as my data” action. A return visit can show a prior visitor’s altered sample while the banner says that nothing is saved. This is a half-fix of the original F-1-2 requirement to discard demo state on exit.
- **Concrete fix:** make **Start for real** clear the active record in `branching-problem-circle-demo` before navigating to `/`, or offer an explicit one-time transfer choice. Add `@claim:demo-isolation` coverage that mutates demo data, exits, returns to `/demo`, and asserts a newly seeded untouched sample and no real record.

### Minor

#### F-3-1 — README contains an unlisted, non-observable outcome promise

- **Quote/location:** README introduction: “Lead a discussion without reducing it to one answer.”
- **Why this fails:** it is a visitor-facing outcome promise, but no `.factory/claims.json` entry or sandbox test can observe it. It also does not tell a first-time leader what control or result the product provides.
- **Concrete fix:** replace it with `Keep up to six approaches visible during one discussion.` and add this README location to `six-approaches`, or remove the sentence.

#### F-3-2 — Core empty-state and editor headings retain unexplained ceramic metaphors

- **Quote/location:** `src/main.ts`: Shape heading “Make room for competing starts.”; new-approach heading “Name a way in.”; unavailable voting heading “The voting table needs a little more clay.”; recap reflection heading “Carry one question forward.”
- **Why this fails:** these headings do not name their section or the required next action when read out of context. “Clay” and “way in” are product lore rather than facilitator instructions, contrary to the plain-words requirement for headings and empty states.
- **Concrete fix:** use `Approaches`, `Add an approach`, `Add a problem and approach before collecting votes`, and `Question for the next session`, respectively. Keep the ceramic treatment in the visual design rather than in functional copy.

## Complete copy audit

Counts use whitespace-delimited words. Headings, labels, actions, alt text, and footer copy are included because they are exposed to a first-time visitor. No landing unit exceeds 22 words, uses a banned marketing adjective, or has a non-result-naming action. F-3-1 is the sole README audit flag.

### Landing page

| Copy unit | Words | Result |
| --- | ---: | --- |
| Skip to the circle | 4 | Pass |
| Branching Problem Circle | 3 | Pass — wordmark |
| Demo | 1 | Pass |
| How it works | 3 | Pass |
| Privacy | 1 | Pass |
| For volunteer leaders of small math circles | 7 | Pass |
| Compare several approaches to one math problem | 7 | Pass — h1 |
| Collect anonymous votes on several approaches, then reveal hints during the discussion. | 11 | Pass — `demo-sample` |
| Try it with sample data | 5 | Pass — result-naming action |
| Opens a sample circle; nothing is saved. | 7 | Pass — see F-1-2 for exit-state defect |
| Create a circle | 3 | Pass — result-naming action |
| Import a circle | 3 | Pass — result-naming action |
| Circle data stays in this browser | 6 | Pass — `browser-only` |
| Up to six approaches, including dead ends | 6 | Pass — `six-approaches` |
| One-page printable recap | 3 | Pass — `recap-export` |
| Blank handmade ceramic tiles branch three ways around a central tile, with six river stones marking choices. | 17 | Pass — alt text |
| The illustration shows one problem branching into three approaches. | 9 | Pass |
| See the circle in use | 5 | Pass — section label |
| One problem, three approaches, a shared discussion | 7 | Pass — preview heading |
| Open the sample to inspect votes, hints, and a printable recap before making your own circle. | 16 | Pass — demo/recap claims |
| Open the sample circle | 4 | Pass — result-naming action |
| Write a problem. | 3 | Pass |
| Confirm you can use it with your group. | 8 | Pass |
| Add approaches. | 2 | Pass |
| Keep up to six possible starts visible. | 7 | Pass — `six-approaches` |
| Reveal and recap. | 3 | Pass |
| Collect votes, open hints, then print or export. | 8 | Pass — demo/recap claims |
| Limits and privacy | 3 | Pass — section heading |
| Built for one shared device | 6 | Pass — `single-device` |
| No public sharing, child accounts, rankings, test banks, or generated solutions. | 10 | Pass — `no-public-sharing` |
| Circle data stays in your browser. | 6 | Pass — `browser-only` |
| Templates | 1 | Pass — section heading |
| Starter templates are included | 4 | Pass — `included-templates` |
| Authoring, voting, printing, and export are free. | 6 | Pass — `included-templates` |
| Browse templates | 2 | Pass — result-naming action |
| Circle data stays in this browser · reloads offline after your first visit. | 13 | Pass — `browser-only`, `offline-reload` |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Pass |

### README

| Copy unit | Words | Result |
| --- | ---: | --- |
| Branching Problem Circle | 3 | Pass — document title |
| Branching Problem Circle helps volunteer math-circle leaders compare several approaches to one problem. | 13 | Pass — core job demonstrated by `demo-sample` |
| Keep starts, failed approaches, votes, hints, and solutions in one circle. | 11 | Pass — demonstrated sample workflow |
| Lead a discussion without reducing it to one answer. | 10 | F-3-1 |
| It is made for a leader sharing one device with a small group. | 13 | Pass — `single-device` |
| There are no child accounts, public rooms, rankings, test banks, or generated solutions. | 13 | Pass — `no-public-sharing` |
| Use only problems you have permission to share. | 9 | Pass — instruction |
| Try the isolated sample at https://branching-problem-circle.sociobot.in/demo. | 6 | Pass — demo entry |
| What it does | 3 | Pass — heading |
| Create one problem with up to six approaches. | 8 | Pass — `six-approaches` |
| Collect anonymous votes, written reasons, and alternative ideas. | 8 | Pass — sample workflow |
| Reveal a hint or facilitator note when you choose. | 10 | Pass — sample workflow |
| Print or save a one-page recap. | 7 | Pass — `recap-export` |
| Export and import circle data as JSON. | 7 | Pass — `json-import` |
| Reload offline after the first visit. | 6 | Pass — `offline-reload` |
| Keep circle data in your browser. | 6 | Pass — `browser-only` |
| Starter templates are included. | 4 | Pass — `included-templates` |
| Circle authoring, voting, printing, and export are free. | 8 | Pass — `included-templates` |
| See the privacy notice and terms. | 6 | Pass — links |
| Demo | 1 | Pass — heading |
| /demo and /?demo=1 load an original hexagon problem with three approaches, six anonymous votes, a revealed hint, and a recap. | 20 | Pass — `demo-sample` |
| The sample is stored separately from your real circles. | 9 | Pass — `demo-isolation` |
| Reset demo restores that sample. | 5 | Pass — reset control |
| Start for real returns to your circles without copying demo data. | 10 | Pass as written; F-1-2 covers the missing discard-on-exit requirement |
| Develop | 1 | Pass — heading |
| Requires Node.js 20 or newer. | 5 | Pass — setup requirement |
| No environment variables or backend are required. | 8 | Pass — setup requirement |
| Test and build | 3 | Pass — heading |
| npm run build type-checks the app and writes the static deploy to dist/, with dist/index.html at its root. | 18 | Pass — verified locally |
| Browser tests use Playwright 1.58.2. | 5 | Pass — lockfile/package configuration |
| They cover the demo, claims, accessibility, keyboard focus, mobile targets, import recovery, privacy, and offline reload. | 14 | Pass — suite inspection |
| Deploy | 1 | Pass — heading |
| Deploy dist/ to the configured static host. | 7 | Pass — instruction |
| HTTPS is required for service workers outside localhost. | 8 | Pass — platform requirement |
| public/staticwebapp.config.json supplies routing, response headers, cache rules, and the 404 rewrite. | 9 | Pass — source inspection |
| The original ceramic illustration and its provenance live in assets/src/. | 9 | Pass — repository fact |
| The visual rationale is in .factory/design.md. | 7 | Pass — repository fact |
| License | 1 | Pass — heading |
| MIT. | 1 | Pass |

## Demo, claims, privacy, and quality gates

- `/demo` immediately displays the original hexagon problem, three approaches, six votes, two written reasons, an alternative idea, an opened hint/path, and recap data. The persistent banner exposes **Reset demo** and **Start for real**.
- **Reset demo** works: after closing the opened hint, reset restores it. Demo storage is a separate IndexedDB database named `branching-problem-circle-demo`; a fresh demo context does not create the real database. The exit disposal defect is F-1-2.
- A live demo-flow request log contained only the product origin (HTML, JS, CSS). No remote font, tracker, third-party script, or API request occurred. The live browser console had no errors on landing or demo.
- Fresh `/demo` visit, service-worker readiness, offline switch, and reload retained the sample. The registered `offline-reload` test also passed.
- `.factory/claims.json` has ten entries and exactly one matching `@claim:<id>` test each. From clean clone `/tmp/bpc-review-3-clean-dAby7Q`, all listed commands passed for desktop and 390px projects: `demo-sample`, `demo-isolation`, `browser-only`, `single-device`, `offline-reload`, `six-approaches`, `recap-export`, `json-import`, `included-templates`, and `no-public-sharing`.
- In that clean clone, `npm test` passed 6/6, `npm run build` produced `dist/`, and `npm run test:e2e` passed 38/38. The built initial JS is 10.77 KB gzip and CSS is 5.76 KB gzip.

## Structure, accessibility, and visual checks

- `/`, `/demo`, `/privacy/`, `/terms/`, `/404.html`, `/offline.html`, manifest URLs, sitemap, robots, icons, and product assets return 200. An unknown route returns the designed 404 with HTTP 404. Crawled site links resolve or are explicit `mailto:` links.
- Home, demo, legal, offline, and 404 routes have route-specific titles, one h1, a main landmark, `lang=en`, meta descriptions, canonical URLs, Open Graph/Twitter title/description/image metadata, favicon, Apple touch icon, and consistent Demo/How it works/Privacy header plus legal footer.
- Demo and phase URLs use History API, reload correctly, and Back returns focus to the phase h1. The live axe scan on landing, demo, legal routes, and unknown-route 404 reported no serious or critical violations. Focus and 390px 44px target checks pass in the browser suite.
- CSP is delivered as an HTTP header with `frame-ancestors 'none'`; nosniff, referrer, permissions, and frame-denial headers are present. Hashed assets are immutable and both manifest URLs have JSON MIME.
- The glacial-ceramic palette, system/Georgia type pairing, original ceramic still life, irregular tile geometry, and reduced-motion CSS match `.factory/design.md`. The site reads as product-specific rather than a generic SaaS template.

## Earlier finding verification

All earlier `.factory/review-*.md`, `.factory/polish-*.md`, and handoff material were read. The status below reflects both current source and current live behavior, not earlier closure notes.

| Earlier finding | Current verification |
| --- | --- |
| F-1-1 | Fixed: cold landing names job, audience, sample action, and outcome. |
| F-1-2 | **Repeated, blocking:** demo exit retains altered demo state; see finding above. |
| F-1-3 | Fixed: registry has ten entries with one tagged test each; clean-clone commands pass. |
| F-1-4 | Fixed: no paid offer or unreachable checkout remains; five templates are included. |
| F-1-5 | Fixed: demo/phase routes resolve and unknown route returns styled HTTP 404. |
| F-1-6 / F-1-7 | Fixed: roving phase focus and template-opener restoration pass keyboard tests. |
| F-1-8 | Fixed: 390px target-height assertions pass. |
| F-1-9 / F-1-10 | Fixed: rights acknowledgement blocks saving; invalid import explains recovery and preserves data. |
| F-1-11 / F-1-12 / F-1-13 | Fixed: immutable assets, security headers, and JSON manifest MIME verified live. |
| F-1-14 / F-1-15 / F-1-17 | Fixed: metadata, route titles/canonicals, history focus, and consistent 404 navigation verified live. |
| F-1-16 | Fixed: landing has preview, workflow, limits/privacy, and templates sections. |
| F-1-18 through F-1-28 | Fixed on landing/README: direct audience, job, terminology, actions, image caption, and plain privacy/offline facts remain present. |
| F-1-29 | Fixed: README says the sample is stored separately; database jargon is absent from visitor demo copy. |
| F-1-30 through F-1-36 | Fixed: template language is plain, consistent, included, and has no paid-pack offer. |
| F-2-1 | Fixed: `single-device` claim/test covers local shared-device operation and absent room/sync/share paths. |
| F-2-2 | Fixed: `json-import` exports, previews replacement, imports, persists real data, and preserves demo separation. |
| F-2-3 | Fixed: `recap-export` generates and inspects a one-page A4 PDF plus JSON download. |

## Missed leverage

No missing AI feature is identified. The brief requires facilitator-supplied, rights-cleared problems and excludes generated solutions; adding an AI solver would be decorative and contrary to that purpose. The useful implied adjuncts—isolated demo, JSON import/export, and printable recap—exist. The remaining work is to make the sandbox genuinely disposable and finish the copy cleanup.

## What would make this perfect

Discard altered demo state when **Start for real** is selected and prove re-entry starts from the shipped sample. Remove the README’s untestable outcome promise, replace the remaining functional ceramic metaphors with plain labels, then rerun the complete fresh-context review. Only then would this be PASS-adjacent.
