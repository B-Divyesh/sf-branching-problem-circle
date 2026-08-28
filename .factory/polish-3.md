# Polish round 3 — cumulative finding closure

Reviewed inputs: `.factory/review-1.md`, `.factory/polish-1.md`, `.factory/review-2.md`, `.factory/polish-2.md`, and `.factory/review-3.md`. This map reopens every earlier finding and records current evidence rather than relying on a prior closure note.

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the direct job h1, volunteer-leader audience, sample-first action, result note, and separate real action above the fold. | `@claim:demo-sample`; `polish-3-home-desktop.png`; `polish-3-home-mobile.png`; live `cold first screen` checks. |
| F-1-2 | **Start for real** now clears `branching-problem-circle-demo` before navigation. The claim mutates the sample, exits, inspects both databases, re-enters for a pristine seed, resets, then creates a blank real circle. | `@claim:demo-isolation` passed desktop/mobile from the final clean clone; live `demo exit disposal, pristine re-entry, and reset`; `/demo`; `/?demo=1`. |
| F-1-3 | Kept ten claims in `.factory/claims.json`; a unit contract enforces unique IDs and exactly one matching tag per claim. | `claims.test.ts`; all ten listed commands passed in both projects, 20/20 executions. |
| F-1-4 | Kept the dead paid offer removed. All five templates are included and no checkout, restore, price, or billing request remains. | `@claim:included-templates`; live template dialog; same-origin request log. |
| F-1-5 | Kept direct demo and phase routes, a designed 404, and Azure response override that returns HTTP 404. | `uses route titles, deep links, and a real 404 page`; `deploy-config.test.ts`; live `/not-a-real-polish-3-route` check. |
| F-1-6 | Kept roving focus after ArrowLeft, ArrowRight, Home, and End despite app re-rendering. | `keeps keyboard focus for phase tabs and template dialog`; live `keyboard phase focus` check. |
| F-1-7 | Template focus returns to its opener after Escape, Close, and template selection. | Same keyboard regression, now covering every exit path. |
| F-1-8 | Wordmark, legal links, buttons, dialog controls, and phase tabs have at least 44px targets. All phase tabs now fit without clipping at 390px. | `has accessible pages and 44px mobile links`; live `mobile layout and 44px targets`; `polish-3-demo-mobile.png`. |
| F-1-9 | Saving is blocked until the rights acknowledgement is checked; focus and an announced error identify the required action. Persistence is inspected. | `enforces rights, recovers from bad imports, and keeps the prior circle`; live rights check. |
| F-1-10 | Invalid JSON shows a direct recovery instruction and leaves the current circle unchanged. | Same import-recovery test; live invalid-import check. |
| F-1-11 | Hashed assets keep a one-year immutable cache policy while HTML and the service worker remain revalidatable. | `static deployment contract`; live `/assets/app-BmxgZCJR.js` header check. |
| F-1-12 | CSP, `frame-ancestors`, frame denial, permissions, referrer, and nosniff headers remain response headers. | `static deployment contract`; live `security headers`; no unexpected console errors. |
| F-1-13 | The manifest rewrite returns JSON MIME and the page links the web manifest. | `static deployment contract`; live `cache and manifest headers`. |
| F-1-14 | Home, demo/phase, legal, offline, and 404 routes have specific titles, descriptions, canonicals, OG/Twitter fields, icons, and the product-art social image. | `ships complete route metadata and consistent static-page navigation`; live Axe/structure route loop. |
| F-1-15 | History routes, deep links, Back/Forward state, h1 focus, and polite announcements remain implemented. | `uses route titles, deep links, and a real 404 page`; keyboard/focus browser tests. |
| F-1-16 | Landing order includes first screen, live sample preview, three steps, limits/privacy, included templates, and footer. | Home screenshots; live first-screen checks. |
| F-1-17 | Every route keeps Demo, How it works, Privacy, Terms, Param Factory credit, and the version. | Static navigation contract; live checks on privacy, terms, offline, and 404. |
| F-1-18 | Audience label remains `For volunteer leaders of small math circles`. | `.factory/copy-audit.md`; home screenshots. |
| F-1-19 | H1 remains `Compare several approaches to one math problem`. | Copy audit; live exact-h1 check. |
| F-1-20 | Explanation uses the concrete terms approaches, votes, hints, and discussion. | Copy audit; `@claim:demo-sample`. |
| F-1-21 | Removed the slogan and kept concrete absent features in Limits and privacy. | `@claim:no-public-sharing`; home screenshots. |
| F-1-22 | Template action and section remain `Browse templates` and `Templates`. | `@claim:included-templates`; live dialog check. |
| F-1-23 | Real-data action remains `Create a circle`; the sample is the primary action. | `@claim:demo-isolation`; home screenshots. |
| F-1-24 | Privacy wording is scoped to circle data in this browser. | `@claim:browser-only`; live same-origin request log. |
| F-1-25 | The image caption directly explains that one problem branches into three approaches. | Copy audit; home screenshots. |
| F-1-26 | Footer uses tested browser-storage and offline-reload facts. | `@claim:browser-only`; `@claim:offline-reload`; live offline reload. |
| F-1-27 | README opens with the audience and concrete comparison job. | `.factory/copy-audit.md`; README review. |
| F-1-28 | The long README outcome was split and the remaining unobservable sentence was replaced with a six-approach fact. | Copy audit; `@claim:six-approaches`. |
| F-1-29 | Visitor demo copy describes separate real and sample circles without IndexedDB/database jargon. | README and copy audit. |
| F-1-30 | Visitor terms are consistently circle, problem, approach, vote, hint, note, recap, and demo. | Copy-audit terminology table. |
| F-1-31 | Dialog context label remains `Templates`. | `@claim:included-templates`. |
| F-1-32 | Dialog h2 remains `Choose a session template`. | `@claim:included-templates`; dialog focus regression. |
| F-1-33 | Abstract paid-pack wording stays removed; copy plainly says templates are included. | `@claim:included-templates`; live dialog. |
| F-1-34 | Template is named `Blank circle`. | `@claim:included-templates`. |
| F-1-35 | Template is named `Compare failed approaches`. | `@claim:included-templates`; copy audit. |
| F-1-36 | The unavailable paid session-shapes offer stays removed. | `@claim:included-templates`; no checkout in live link crawl/request log. |
| F-2-1 | Registered and retained the one-shared-device claim with no room, pairing, sync, or public-share path. | `@claim:single-device`; live same-origin request log. |
| F-2-2 | Registered JSON import. Valid exported data gets an accessible named replacement preview, persists after reload, and never crosses the demo namespace. | `@claim:json-import`; live `rights enforcement, import recovery, preview, and persistence`. |
| F-2-3 | Recap verification prints the real demo state, parses the PDF, asserts one A4 page and sample content, and verifies JSON export. | `@claim:recap-export`; live `keyboard phase focus and one-page recap`. |
| F-3-1 | Replaced the unobservable README outcome with `Keep up to six approaches visible during one discussion.` and listed README under the existing claim. | `@claim:six-approaches`; copy audit. |
| F-3-2 | Replaced the four remaining functional metaphors with `Approaches`, `Add an approach`, `Add a problem and approach before collecting votes`, and `Question for the next session`. | Exact text assertions in `app.spec.ts`; copy audit; live demo screenshots. |

## Final verification

The final pushed app commit `4622779` was tested from clean clone `/tmp/bpc-polish3-final2-55rjjt/repo`:

- every claim command: 10/10 commands, 20/20 desktop/mobile executions;
- unit/deployment contract: 9/9;
- full Playwright suite: 42/42;
- build: passed, with 10.98 KB gzip initial JS and 5.90 KB gzip CSS;
- dependency audit: 0 vulnerabilities.

Deployment `0d413a2f-1a1d-48e7-9040-c8becdafa998` was opened cold at <https://branching-problem-circle.sociobot.in>. The live browser audit passed 19/19 checks and the independent URL verifier reported zero console errors. Mobile Lighthouse scored 100/100/100/100 with LCP 1.3 s and CLS 0.

Screenshots: `.factory/evidence/polish-3-home-desktop.png`, `.factory/evidence/polish-3-home-mobile.png`, `.factory/evidence/polish-3-demo-desktop.png`, and `.factory/evidence/polish-3-demo-mobile.png`. Machine-readable reports: `.factory/evidence/polish-3-live-report.json`, `.factory/evidence/polish-3-lighthouse.json`, and `.factory/evidence/polish-3-verify/verify.json`.

## Remaining findings

None.
