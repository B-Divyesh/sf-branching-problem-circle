# Adversarial first-read review 4 — Branching Problem Circle

Reviewed 28 August 2026 against `https://branching-problem-circle.sociobot.in` and source commit `74430b46c10a31829442f53ed0e1c06bc18ec910`.

## Verdict: FAIL

One blocking persistence defect remains. A visitor can see an imported circle immediately, reload immediately, and return to the old circle. The deployed live verifier reproduced this exact failure. All other checks in this review passed, but `PASS` requires zero findings.

## Cold first screen

Fresh Chromium contexts with no cookies, storage, or service worker were opened at 390×844 and 1440×900 before scrolling.

- **What it does:** compare several approaches to one math problem; collect anonymous votes and reveal hints.
- **For whom:** volunteer leaders of small math circles.
- **What to click first:** **Try it with sample data**; the adjacent line says it opens a sample circle and does not save it.

This information was visible above the fold in both contexts. The 390px layout had no horizontal overflow and no console errors. This is not a blocking first-read issue.

## Findings

### Blocking

#### F-4-1 — Import reports success before the imported circle is durable

- **Quote/location:** the import confirmation button is **“Replace circle”**. In `src/main.ts`, its handler assigns `circle = pendingImport`, calls `navigate(...)` (which immediately renders the imported heading), then starts but does not await `persist('Imported circle saved on this device.')`.
- **Evidence:** `LIVE_BASE_URL=https://branching-problem-circle.sociobot.in npm run test:live` failed at `scripts/verify-live.mjs:176`: after pressing **Replace circle**, seeing `Imported live circle`, and immediately reloading, the h1 was `Circle to replace`, not `Imported live circle`. A separate immediate-reload stress run lost the import in six of its first eight iterations (`Circle 1`, `Circle 2`, `Circle 3`, `Circle 4`, `Circle 5`, `Circle 7`, and `Circle 8` remained). The deployed asset hash matches this source build (`app-BmxgZCJR.js`).
- **Why this fails:** a first-time facilitator has no reason to wait after an action labelled **Replace circle**. The UI shows the new title and can announce `Imported circle saved on this device.` while the IndexedDB write is still pending. Closing, reloading, or navigating at that point can discard the imported data, violating the `json-import` claim.
- **Concrete fix:** make replacement a save-first operation. Disable the confirmation button while saving, await the IndexedDB write, and only then navigate/render the imported circle and announce success. On failure, retain the prior circle and present one recovery message. Extend `@claim:json-import` with an immediate reload directly after **Replace circle** (before waiting for a toast or another save-dependent signal) and assert the imported record is loaded.

## Copy audit

Counts are whitespace-delimited. I audited headings, controls, image alternative, and caption as well as prose. No landing or README unit exceeds 22 words. No current landing button is a generic verb: **Try**, **Create**, **Import**, **Open**, and **Browse** name their result. No jargon, inconsistent product term, mood-only heading, marketing adjective, or unlisted visitor-facing product claim was found in this audit.

### Landing page

| Copy unit | Words |
| --- | ---: |
| Skip to the circle | 4 |
| Branching Problem Circle | 3 |
| Demo | 1 |
| How it works | 3 |
| Privacy | 1 |
| For volunteer leaders of small math circles | 7 |
| Compare several approaches to one math problem | 7 |
| Collect anonymous votes on several approaches, then reveal hints during the discussion. | 12 |
| Try it with sample data | 5 |
| Opens a sample circle; nothing is saved. | 7 |
| Create a circle | 3 |
| Import a circle | 3 |
| Circle data stays in this browser | 6 |
| Up to six approaches, including dead ends | 7 |
| One-page printable recap | 3 |
| Blank handmade ceramic tiles branch three ways around a central tile, with six river stones marking choices. | 17 |
| The illustration shows one problem branching into three approaches. | 9 |
| See the circle in use | 5 |
| One problem, three approaches, a shared discussion | 7 |
| Open the sample to inspect votes, hints, and a printable recap before making your own circle. | 15 |
| Open the sample circle | 4 |
| Write a problem. | 3 |
| Confirm you can use it with your group. | 8 |
| Add approaches. | 2 |
| Keep up to six possible starts visible. | 7 |
| Reveal and recap. | 3 |
| Collect votes, open hints, then print or export. | 8 |
| Limits and privacy | 3 |
| Built for one shared device | 6 |
| No public sharing, child accounts, rankings, test banks, or generated solutions. | 10 |
| Circle data stays in your browser. | 6 |
| Templates | 1 |
| Starter templates are included | 4 |
| Authoring, voting, printing, and export are free. | 7 |
| Browse templates | 2 |
| Circle data stays in this browser · reloads offline after your first visit. | 12 |
| Terms | 1 |
| Built by Param Factory | 4 |

### README

| Copy unit | Words |
| --- | ---: |
| Branching Problem Circle | 3 |
| Branching Problem Circle helps volunteer math-circle leaders compare several approaches to one problem. | 13 |
| Keep starts, failed approaches, votes, hints, and solutions in one circle. | 11 |
| Keep up to six approaches visible during one discussion. | 9 |
| It is made for a leader sharing one device with a small group. | 13 |
| There are no child accounts, public rooms, rankings, test banks, or generated solutions. | 13 |
| Use only problems you have permission to share. | 8 |
| Try the isolated sample at `https://branching-problem-circle.sociobot.in/demo`. | 6 |
| What it does | 3 |
| Create one problem with up to six approaches. | 8 |
| Collect anonymous votes, written reasons, and alternative ideas. | 8 |
| Reveal a hint or facilitator note when you choose. | 9 |
| Print or save a one-page recap. | 6 |
| Export and import circle data as JSON. | 7 |
| Reload offline after the first visit. | 6 |
| Keep circle data in your browser. | 6 |
| Starter templates are included. | 4 |
| Circle authoring, voting, printing, and export are free. | 8 |
| See the privacy notice and terms. | 6 |
| Demo | 1 |
| `/?demo=1` and `/demo` load an original hexagon problem with three approaches, six anonymous votes, a revealed hint, and a recap. | 20 |
| The sample is stored separately from your real circles. | 9 |
| Reset demo restores that sample. | 5 |
| Start for real discards demo changes before returning to your circles. | 11 |
| Develop | 1 |
| Requires Node.js 20 or newer. | 5 |
| No environment variables or backend are required. | 7 |
| Test and build | 3 |
| `npm run build` type-checks the app and writes the static deploy to `dist/`, with `dist/index.html` at its root. | 18 |
| Browser tests use Playwright 1.58.2. | 5 |
| They cover the demo, claims, accessibility, keyboard focus, mobile targets, import recovery, privacy, and offline reload. | 16 |
| Deploy | 1 |
| Deploy `dist/` to the configured static host. | 7 |
| HTTPS is required for service workers outside localhost. | 8 |
| `public/staticwebapp.config.json` supplies routing, response headers, cache rules, and the 404 rewrite. | 11 |
| The original ceramic illustration and its provenance live in `assets/src/`. | 10 |
| The visual rationale is in `.factory/design.md`. | 6 |
| License | 1 |
| MIT. | 1 |
| See LICENSE. | 2 |

The README's build, runtime, and deployment sentences are technical instructions rather than visitor-facing product promises. Product assertions map to the existing ten claim records; no new unlisted claim is recorded.

## Demo, privacy, claims, and history

- **Demo:** one click from the landing enters `/?demo=1` with the realistic hexagon circle already populated: three approaches, votes, a revealed hint, and recap. The persistent banner says `Demo — sample data, nothing is saved`, with **Reset demo** and **Start for real**. Browser inspection confirmed demo uses `branching-problem-circle-demo`, real mode uses `branching-problem-circle`, reset re-seeds, and exit deletes demo data. No real data was read or written while the banner was present.
- **Network/privacy:** fresh demo request logs contained only same-origin GET requests. Offline reload after service-worker readiness succeeded.
- **Claims:** in a clean clone at `/tmp/bpc-review4-salNpN/repo`, all ten commands from `.factory/claims.json` passed in desktop and 390px projects (20 claim executions). `npm test` passed 9/9, `npm run build` passed and produced `dist/`, and the unfiltered Playwright suite passed 42/42. The live acceptance command still failed on F-4-1, so the passing claim test is insufficient and needs the immediate-reload regression assertion above.
- **Earlier findings:** I read every `review-*.md`, `polish-*.md`, and the handoff. The cold first screen, separate demo namespace/disposal, claims registry, removal of paid checkout, real 404, focus restoration, 44px mobile controls, rights validation, import error recovery, cache/security/manifest delivery, metadata, deep links, common header/footer, direct terminology, recap/export, templates, and offline reload all reproduced as fixed in the live deployment and source. F-4-1 is a newly observed persistence race, not a closure by documentation.

## Structure and product scope

`/`, `/demo`, `/privacy/`, `/terms/`, `/offline.html`, and `/404.html` returned 200; an unknown path returned the designed 404 with HTTP 404. Titles, descriptions, canonicals, OG/Twitter data, favicon, one h1, main landmark, Skip link, and consistent header/footer verified on the checked routes. The CSP, Permissions Policy, frame denial, referrer policy, and nosniff headers were response headers. The internal-link crawl found no dead links. The calm ceramic tiles, original product art, uneven forms, and cobalt/ice palette are distinct rather than a generic SaaS template.

The brief does not imply an AI, sync, or additional import/export feature beyond the present local-first authoring, anonymous shared-device voting, JSON import/export, and printable recap. Adding AI or sync would weaken the stated privacy and facilitation model, so no missed-leverage finding is recorded.

## What would make this perfect

Make import replacement durable before presenting it as complete, add the immediate-reload claim regression test, and rerun the live acceptance suite until it completes with zero failures. At that point, no other review-4 work is identified.
