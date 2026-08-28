# Polish round 2 — zero-finding closure

Candidate `1ca1092a1412669a4febae803e843f90605f580e` was repaired against review commit `f16f908a6b61d059561a3db3054c3b7e83a4e2bf`. Every finding in `.factory/review-1.md`, `.factory/polish-1.md`, and `.factory/review-2.md` was rechecked. Live checks below target <https://branching-problem-circle.sociobot.in> after deployment `da1f2e59-f330-490f-9c6b-76a032e97992`.

Evidence screenshots:

- `.factory/evidence/polish-2-home-desktop.png`
- `.factory/evidence/polish-2-home-mobile.png`
- `.factory/evidence/polish-2-demo-desktop.png`
- `.factory/evidence/polish-2-demo-mobile.png`

## Review 1 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the direct job headline, volunteer-leader audience, sample-first action, outcome note, and separate real-data action. | `@claim:demo-sample`; home screenshots; cold live h1/action check. |
| F-1-2 | Kept `/demo` and `/?demo=1` in the isolated demo database with seeded data, persistent banner, reset, and real-mode exit. Expanded the regression to mutate and reset the query-string entry. | `@claim:demo-isolation`; demo screenshots; live real record was empty while the demo record held the sample. |
| F-1-3 | Expanded `.factory/claims.json` to ten claims with exactly one tagged test each. | All ten claim commands passed twice, desktop and mobile, in clean clone `/tmp/bpc-polish2-release-E37BYD`. |
| F-1-4 | Kept the unavailable paid offer removed; all five templates remain included and enabled. | `@claim:included-templates`; no checkout link or price in live template dialog. |
| F-1-5 | Kept real demo/phase routes and the styled 404 response configuration. | `uses route titles, deep links, and a real 404 page`; live unknown URL returned HTTP 404. |
| F-1-6 | Kept roving phase-tab focus for ArrowLeft, ArrowRight, Home, and End. | `keeps keyboard focus for phase tabs and template dialog`; 38/38 browser runs passed. |
| F-1-7 | Kept opener restoration for Escape, close, and template selection. | Keyboard regression; live Escape check returned focus to Templates. |
| F-1-8 | Kept independent 44px link targets and verified them at 390px. | `has accessible pages and 44px mobile links`; live mobile measurement and mobile screenshots. |
| F-1-9 | Kept the rights checkbox required before persistence. | `enforces rights, recovers from bad imports, and keeps the prior circle`. |
| F-1-10 | Kept actionable invalid-import text and preservation of the existing circle. | Same import-recovery regression. |
| F-1-11 | Kept immutable caching for hashed assets. | `static deployment contract`; live `app-Bl3iY0ex.js` response contained `immutable`. |
| F-1-12 | Kept CSP, frame denial, permissions, referrer, and nosniff response headers. | `static deployment contract`; live response-header assertions passed. |
| F-1-13 | Kept the JSON manifest rewrite and MIME handling. | `static deployment contract`; live `/manifest.webmanifest` returned HTTP 200 with JSON content type. |
| F-1-14 | Completed Open Graph and Twitter title, description, image, type, canonical, favicon, and Apple icon metadata on legal, 404, and offline pages. Runtime phase/demo metadata now updates Twitter and canonical fields too. | `ships complete route metadata and consistent static-page navigation`; route browser loop; live checks on four static routes. |
| F-1-15 | Kept History API phase routes and added phase-specific real-mode titles plus root-to-phase URL normalization for saved circles. | `uses route titles, deep links, and a real 404 page`; live Back returned to recap and focused its h1. |
| F-1-16 | Kept the product preview, three-step explanation, limits/privacy, and included-template section. | Home desktop/mobile screenshots. |
| F-1-17 | Added the missing How it works link to 404 and the app header; all static routes now share Demo, How it works, Privacy, legal footer links, maker credit, and v1.2.0. | Static navigation test; live header parity check on privacy, terms, 404, and offline pages. |
| F-1-18 | Kept `For volunteer leaders of small math circles`. | `.factory/copy-audit.md`; home screenshots. |
| F-1-19 | Kept `Compare several approaches to one math problem`. | Copy audit; cold live h1 check. |
| F-1-20 | Kept one concrete explanation using approaches and hints. | Copy audit; home screenshots. |
| F-1-21 | Kept the slogan removed and concrete limits visible. | `@claim:no-public-sharing`; home screenshot. |
| F-1-22 | Kept `Browse templates` and `Templates`. | `@claim:included-templates`. |
| F-1-23 | Kept `Create a circle` as the real-data action. | `@claim:demo-isolation`; cold live check. |
| F-1-24 | Kept browser-specific privacy wording. | `@claim:browser-only`; live same-origin request trace. |
| F-1-25 | Kept the descriptive illustration caption. | Home screenshots; copy audit. |
| F-1-26 | Kept the exact browser-storage and offline footer facts. | `@claim:browser-only`, `@claim:offline-reload`; live offline reload. |
| F-1-27 | Kept the direct README opening for volunteer leaders. | `.factory/copy-audit.md`. |
| F-1-28 | Kept README sentences below 22 words. | Copy audit: longest visitor sentence is 20 words. |
| F-1-29 | Replaced the visitor-facing IndexedDB/database sentence with `The sample is stored separately from your real circles.` Technical names remain only in factory verification docs. | README review; copy audit. |
| F-1-30 | Kept circle, problem, approach, vote, hint, recap, and demo as the single visitor terms. | Copy-audit terminology table. |
| F-1-31 | Kept the dialog eyebrow `Templates`. | `@claim:included-templates`. |
| F-1-32 | Kept `Choose a session template`. | `@claim:included-templates`. |
| F-1-33 | Kept abstract pack copy removed; templates are plainly included. | `@claim:included-templates`. |
| F-1-34 | Kept `Blank circle`. | `@claim:included-templates`. |
| F-1-35 | Kept `Compare failed approaches`. | `@claim:included-templates`; copy audit. |
| F-1-36 | Kept the paid session-shapes offer removed. | `@claim:included-templates`; live dialog has no price or checkout. |

## Review 2 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | Registered `single-device` and added a clean-demo test for local namespaced storage, shared-device controls, absent room/pair/sync/share paths, and same-origin requests. | `@claim:single-device` passed desktop/mobile from the clean clone and live. |
| F-2-2 | Registered `json-import`; valid exported demo JSON now has a tested replacement preview, import, persistence, phase route, and demo/real namespace separation. | `@claim:json-import` passed desktop/mobile; live import ended at `/circle/explore`. |
| F-2-3 | Upgraded `recap-export` to render the actual demo recap through Chromium, parse the PDF, assert exactly one A4 page, verify sample content, and still verify JSON download. | `@claim:recap-export` passed desktop/mobile; live PDF page count was 1. |

## Additional cold-live finding

The final live axe scan found `aria-label` on the decorative recap writing line. Commit `060361c` replaced it with `aria-hidden="true"` and added recap-specific axe coverage. The rebuilt local suite passed 38/38, the site was redeployed, and the repeated live recap scan returned zero serious or critical violations.

## Final evidence

- Clean clone: `/tmp/bpc-polish2-release-E37BYD`; `npm ci` found zero vulnerabilities; 6/6 unit/config tests passed; all ten claim commands passed in both projects; full browser suite passed 38/38.
- Build: `dist/index.html` present; initial JavaScript 10.77 KB gzip; CSS 5.76 KB gzip; mobile hero WebP 36 KB.
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.3 s, CLS 0, TBT 0 ms.
- Live verifier: HTTP 200, 636 ms load, one h1, `lang=en`, main landmark, no missing alt text, no unlabeled buttons, no console errors.
- Final live audit: one-page PDF, JSON import, demo reset/isolation, offline reload, route focus, metadata, header parity, 404 status, security headers, manifest MIME, cache headers, and privacy trace all passed.

No review finding remains open.
