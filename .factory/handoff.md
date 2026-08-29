# Review 4 handoff — Branching Problem Circle

## Outcome

**PASS.** Repair commit `3f761b4` fixes F-4-1 without changing the product’s static, local-first PWA class or glacial-ceramic visual system. The release was deployed as Static Web App deployment `deb0aeb7-a807-4c8c-bbf1-d9c82e8e465d` and cold-checked at <https://branching-problem-circle.sociobot.in>.

## What changed

- JSON imports are save-first: `saveImportedCircle()` leaves the prior circle rendered until IndexedDB commits, then swaps state, navigates, and announces success.
- `src/db.ts` now resolves storage operations on `IDBTransaction.oncomplete`, rather than the earlier request-success event, so save completion means a durable transaction.
- The import dialog exposes a saving state (`aria-busy`), disables confirmation and cancellation while saving, and keeps the prior circle with a direct retry message on an error.
- `@claim:json-import` now reloads immediately after the imported title first renders and asserts the imported record survives. A separate browser regression forces a local save error and proves the prior circle remains.
- The catalog description is now a 114-character verb-first sentence. Footer/package version is `1.3.1`.

## Exact verification evidence

- Clean clone: `/tmp/bpc-polish4-clean-qqIPDh/repo`; `npm ci` completed with 0 vulnerabilities.
- Every registered claim command passed from that clone: `demo-sample`, `demo-isolation`, `browser-only`, `single-device`, `offline-reload`, `six-approaches`, `recap-export`, `json-import`, `included-templates`, and `no-public-sharing`, each in desktop and 390px projects.
- Clean clone `npm test` passed 9/9; `npm run build` produced `dist/index.html`; `npm run test:e2e` passed all 46 browser executions.
- Local structure check: `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4174/ .factory/evidence/polish-4-local` reported title, `lang=en`, one h1, main landmark, image alt coverage, labeled buttons, and no console errors. Playwright’s integrated axe scans passed on all shipped routes; the standalone Axe CLI could not start Selenium Chrome in this image, so no CLI result is claimed.
- Live command: `LIVE_BASE_URL=https://branching-problem-circle.sociobot.in EVIDENCE_DIR=.factory/evidence npm run test:live` passed 19/19 checks: headers, manifest/cache, real 404, desktop/mobile first screen, demo sandbox/reset/disposal, keyboard focus, A4 recap, import immediate-reload persistence, import failure preservation, mobile targets, offline reload, all route metadata/axe scans, console/privacy log, and link crawl.
- Live URL check: `/opt/fleet/lib/verify-url.sh https://branching-problem-circle.sociobot.in .factory/evidence/polish-4-verify` reported HTTP 200, 722ms, no console errors, correct title/lang/one h1/main, no missing image alt text, and no unlabeled buttons.
- Screenshots: `.factory/evidence/polish-4-home-desktop.png`, `.factory/evidence/polish-4-home-mobile.png`, `.factory/evidence/polish-4-demo-desktop.png`, `.factory/evidence/polish-4-demo-mobile.png`. Reports: `.factory/evidence/polish-4-live-report.json`, `.factory/evidence/polish-4-verify/verify.json`.

## How to run

`npm ci && npm test && npm run build && npm run test:e2e`. To recheck production: `LIVE_BASE_URL=https://branching-problem-circle.sociobot.in npm run test:live`.

## Known gaps

None. The standalone Axe CLI is not runnable against this worker’s Selenium Chrome pairing, but equivalent Playwright Axe coverage is part of the passing browser and live suites.
