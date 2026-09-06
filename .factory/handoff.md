# Repair 1 handoff — Branching Problem Circle

## Outcome

**PASS.** Review 6 finding F-6-1 is closed. The public privacy promise, “Clear circle removes circle data from this browser,” is now a registered claim with one tagged outcome test.

- Implementation commit: `d072be41ebd1cffe8db4cfd53b015e6d4a35ab50` (`test: cover privacy data deletion claim`).
- Prior review/documentation baseline: `e973bf2910acca3a09f86ac35168099598d0d0db`.
- Product behavior and bundled application source were unchanged. The expanded test and live verifier prove the already-working deletion flow instead of changing it.

## What changed

- Added `data-deletion` to `.factory/claims.json` for the privacy-page promise.
- Added its only `@claim:data-deletion` Playwright test. It seeds the demo and a real circle, dismisses the first confirmation and proves the real circle remains, accepts the second confirmation, reloads, proves the real record is absent, and proves the demo record is unchanged.
- Added the same outcome flow to `npm run test:live`, so production checks cancellation, confirmed deletion, reload persistence, and demo isolation.
- Copied the 115-character verb-first catalog description to `/work/.evidence/catalog-description.txt`.

## Job, audience, and first action

On fresh 1440×900 desktop and 390×844 phone views before scrolling:

- Job: compare several approaches to one math problem, collect anonymous votes, and reveal hints.
- Audience: volunteer leaders of small math circles.
- First action: **Try it with sample data**; it opens a sample circle and does not save it.

## Verification

Clean clone: `/tmp/bpc-repair-clean-Rzr9it/repo` at implementation commit `d072be4`.

- `npm ci`: passed, 105 packages, 0 vulnerabilities.
- `npm test`: passed 9/9.
- `npm run build`: passed; `dist/index.html` produced. Initial JavaScript is 11.16 kB gzip and CSS is 5.90 kB gzip.
- All 11 exact commands from `.factory/claims.json` passed in both desktop Chromium and the 390×844 phone project: `demo-sample`, `demo-isolation`, `browser-only`, `data-deletion`, `single-device`, `offline-reload`, `six-approaches`, `recap-export`, `json-import`, `included-templates`, and `no-public-sharing`.
- `npm run test:e2e`: passed 48/48; Playwright recorded a passed final run.
- Local `/opt/fleet/lib/verify-url.sh`: passed title, `lang=en`, one h1, main landmark, image alt text, labeled buttons, and no browser errors.
- HTTPS `npm run test:live`: passed 20/20. This includes fresh desktop/phone first-screen checks, Axe scans, keyboard and mobile checks, demo reset/disposal, import durability, one-page A4 recap, offline reload, routes/404, headers, links, same-origin request trace, and the new deletion regression.
- HTTPS `/opt/fleet/lib/verify-url.sh`: passed in 562 ms with no console errors.
- Live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.14 s and CLS 0. Report: `/work/.evidence/repair-1-lighthouse.json`.

## Earlier findings

Review 6 rechecked all Review 1–5 and verification findings. The expanded live suite repeated their applicable behavior: demo isolation, claims registry, no dead paid offer, routes/metadata/404, keyboard focus, mobile targets, rights validation, import recovery and durability, response headers, manifest delivery, offline reload, privacy trace, and recap export. F-6-1 was the only remaining item and is now covered by `@claim:data-deletion`.

## Deployment and remaining gaps

`d072be4` was pushed to `origin/main`. This repair changes claim registration and verification code only; the static product bundle remains `app-DihcIyvW.js`, so there is no changed application image to roll out. The cold HTTPS product was nonetheless checked after the push with the expanded live suite and URL verifier.

No known product gaps remain. This is a static local-first PWA; backend tenant, persistence-restart, health, and 429 checks do not apply.

---

# Review 6 handoff — Branching Problem Circle

## Review 6 outcome

**FAIL.** Product behavior passed, but one public privacy claim is unlisted and untested. `.factory/review-6.md` records finding F-6-1. This review changed no product code.

## Review 6 verification

- Implementation candidate: `d0a8efbd1d4025a627e7762023f4831b3df7d16f`; documentation SHA before this report: `0387759cd0d1618ad3ec516b77e8cad713b5946a`.
- Fresh 390×844 phone and 1440×900 desktop live contexts passed the first-screen, demo, reset/disposal, keyboard, mobile, privacy-request, route, offline, and recovery checks.
- Clean clone `/tmp/branching-problem-circle-review6-8JhBtv/repo`: all ten claim commands passed, `npm test` passed 9/9, `npm run build` produced `dist/`, `npm run test:e2e` passed 46/46, and the dependency audit found no vulnerability.
- Clean `npm run test:live` passed 19/19. Standalone Axe found zero violations. Lighthouse mobile scored 100 in all four categories, with LCP 1.2 s and CLS 0.
- The clean build and live deployment have identical JavaScript and CSS hashes.

## Review 6 required next step

Register the `/privacy/` promise “Clear circle removes circle data from this browser” in `.factory/claims.json` and add one matching tagged test covering cancel, confirmed deletion, reload, and demo-namespace preservation. The live action worked during this review, but manual evidence does not satisfy the claims contract.

# Review 5 handoff — Branching Problem Circle

## Review 5 outcome

**PASS.** This reviewer changed no product code. The complete zero-finding report is in `.factory/review-5.md`.

## Review 5 verification

- Fresh 390px and desktop live contexts passed the cold-read check with no console errors or third-party requests.
- Clean clone `/tmp/branching-problem-circle-review5`: all ten `.factory/claims.json` commands passed; `npm test` passed 9/9; `npm run build` produced `dist/`; the complete Playwright suite passed 46 tests.
- `LIVE_BASE_URL=https://branching-problem-circle.sociobot.in npm run test:live` passed 19/19 live checks: demo sandbox, privacy request log, offline reload, import durability, A4 recap, accessibility, metadata, routing, headers, and links.

## Review 5 known gaps

None identified. The retained Review 4 details below are historical verification context.

# Review 4 handoff — Branching Problem Circle

## Outcome

**PASS.** Repair commit `3f761b4` fixes F-4-1; final audited commit is `d0a8efb`. The product remains a static, local-first PWA with its glacial-ceramic visual system. The release was deployed as Static Web App deployment `cce2768b-d8b0-473d-b980-be92dae0ec3f` and cold-checked at <https://branching-problem-circle.sociobot.in>.

## What changed

- JSON imports are save-first: `saveImportedCircle()` leaves the prior circle rendered until IndexedDB commits, then swaps state, navigates, and announces success.
- `src/db.ts` now resolves storage operations on `IDBTransaction.oncomplete`, rather than the earlier request-success event, so save completion means a durable transaction.
- The import dialog exposes a saving state (`aria-busy`), disables confirmation and cancellation while saving, and keeps the prior circle with a direct retry message on an error.
- `@claim:json-import` now reloads immediately after the imported title first renders and asserts the imported record survives. A separate browser regression forces a local save error and proves the prior circle remains.
- The catalog description is now a 114-character verb-first sentence. Footer/package version is `1.3.1`.

## Exact verification evidence

- Clean clone: `/tmp/bpc-polish4-final-Ll0dS7/repo` at `d0a8efbd1d4025a627e7762023f4831b3df7d16f`; `npm ci` completed with 0 vulnerabilities.
- Every registered claim command passed from that clone: `demo-sample`, `demo-isolation`, `browser-only`, `single-device`, `offline-reload`, `six-approaches`, `recap-export`, `json-import`, `included-templates`, and `no-public-sharing`, each in desktop and 390px projects.
- Clean clone `npm test` passed 9/9; `npm run build` produced `dist/index.html`; `npm run test:e2e` passed all 46 browser executions.
- Local structure check: `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4174/ .factory/evidence/polish-4-local` reported title, `lang=en`, one h1, main landmark, image alt coverage, labeled buttons, and no console errors. Playwright’s integrated axe scans passed on all shipped routes; the standalone Axe CLI could not start Selenium Chrome in this image, so no CLI result is claimed.
- Live command: `LIVE_BASE_URL=https://branching-problem-circle.sociobot.in EVIDENCE_DIR=.factory/evidence npm run test:live` passed 19/19 checks: headers, manifest/cache, real 404, desktop/mobile first screen, demo sandbox/reset/disposal, keyboard focus, A4 recap, import immediate-reload persistence, import failure preservation, mobile targets, offline reload, all route metadata/axe scans, console/privacy log, and link crawl.
- Live URL check: `/opt/fleet/lib/verify-url.sh https://branching-problem-circle.sociobot.in .factory/evidence/polish-4-verify` reported HTTP 200, 652ms, no console errors, correct title/lang/one h1/main, no missing image alt text, and no unlabeled buttons.
- Live Lighthouse (mobile): Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.1s and CLS 0. Report: `.factory/evidence/polish-4-lighthouse.json`.
- Screenshots: `.factory/evidence/polish-4-home-desktop.png`, `.factory/evidence/polish-4-home-mobile.png`, `.factory/evidence/polish-4-demo-desktop.png`, `.factory/evidence/polish-4-demo-mobile.png`. Reports: `.factory/evidence/polish-4-live-report.json`, `.factory/evidence/polish-4-verify/verify.json`.

## How to run

`npm ci && npm test && npm run build && npm run test:e2e`. To recheck production: `LIVE_BASE_URL=https://branching-problem-circle.sociobot.in npm run test:live`.

## Known gaps

None. The standalone Axe CLI could not start this worker’s Selenium Chrome pairing; equivalent Playwright Axe coverage is part of the passing browser and live suites.
