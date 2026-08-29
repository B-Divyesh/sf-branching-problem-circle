# Polish round 4 — zero-finding closure

Reviewed inputs: `.factory/review-1.md`, `.factory/polish-1.md`, `.factory/review-2.md`, `.factory/polish-2.md`, `.factory/review-3.md`, `.factory/polish-3.md`, and `.factory/review-4.md`. Source repair commit: `3f761b4`.

## Evidence set

- Tests: every command registered in `.factory/claims.json` from clean clone `/tmp/bpc-polish4-clean-qqIPDh/repo`; `npm test`; `npm run build`; and `npm run test:e2e` (46 browser executions).
- Screenshots: `.factory/evidence/polish-4-home-desktop.png`, `.factory/evidence/polish-4-home-mobile.png`, `.factory/evidence/polish-4-demo-desktop.png`, `.factory/evidence/polish-4-demo-mobile.png`.
- Live checks: <https://branching-problem-circle.sociobot.in>; `npm run test:live` passed 19/19 after deployment `deb0aeb7-a807-4c8c-bbf1-d9c82e8e465d`; `.factory/evidence/polish-4-live-report.json`; `.factory/evidence/polish-4-verify/verify.json`.

`S` below refers to the screenshot set above. `L` is the named live-production check in `test:live` at the cited URL.

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Retained the direct job h1, named volunteer-leader audience, sample-first action, outcome note, and real-data action. | T `@claim:demo-sample`; S home desktop/mobile; L cold first screen desktop/mobile. |
| F-1-2 | Retained the seeded separate demo database, persistent banner, reset, and disposal before real mode. | T `@claim:demo-isolation`; S demo desktop/mobile; L demo exit disposal, pristine re-entry, and reset. |
| F-1-3 | Retained ten registered claims and the contract that requires one tagged browser test per ID. | T `claim registry contract` plus all ten claims; S demo desktop; L structure and axe demo. |
| F-1-4 | Retained included templates and no unreachable checkout, price, restore, or billing request. | T `@claim:included-templates`; S home desktop; L console and privacy request log. |
| F-1-5 | Retained direct demo/phase URLs and designed HTTP 404 routing. | T `uses route titles, deep links, and a real 404 page`; S home desktop; L real 404 status and structure/axe 404. |
| F-1-6 | Retained roving focus for ArrowLeft, ArrowRight, Home, and End phase navigation. | T `keeps keyboard focus for phase tabs and template dialog`; S demo mobile; L keyboard phase focus and one-page recap. |
| F-1-7 | Retained template-dialog focus restoration for Escape, Close, and template use. | T `keeps keyboard focus for phase tabs and template dialog`; S demo mobile; L structure and axe demo. |
| F-1-8 | Retained 44px links, buttons, dialog controls, and unclipped phase tabs at 390px. | T `has accessible pages and 44px mobile links`; S home/demo mobile; L mobile layout and 44px targets. |
| F-1-9 | Retained required rights acknowledgement, focused validation, and blocked persistence without consent. | T `enforces rights, recovers from bad imports, and keeps the prior circle`; S demo desktop; L rights enforcement, import recovery, preview, and persistence. |
| F-1-10 | Retained plain invalid-JSON recovery text and existing-circle preservation. | T `enforces rights, recovers from bad imports, and keeps the prior circle`; S demo desktop; L rights enforcement, import recovery, preview, and persistence. |
| F-1-11 | Retained immutable cache headers for hashed assets. | T `static deployment contract`; S home desktop; L cache and manifest headers. |
| F-1-12 | Retained CSP/frame denial, Permissions Policy, Referrer Policy, and nosniff response headers. | T `static deployment contract`; S home desktop; L security headers. |
| F-1-13 | Retained JSON MIME delivery for the linked web manifest. | T `static deployment contract`; S home desktop; L cache and manifest headers. |
| F-1-14 | Retained route-specific titles, descriptions, canonicals, OG/Twitter fields, icons, and social image. | T `ships complete route metadata and consistent static-page navigation`; S home desktop; L structure and axe for home, legal, offline, and 404. |
| F-1-15 | Retained History API phase routes, reload/back behavior, h1 focus, and polite route announcements. | T `uses route titles, deep links, and a real 404 page`; S demo desktop; L structure and axe demo. |
| F-1-16 | Retained the first screen, live sample preview, three steps, limits/privacy, templates, and footer in the landing order. | T `has the expected landing sections`; S home desktop/mobile; L cold first screen desktop/mobile. |
| F-1-17 | Retained consistent headers, legal footer, Param Factory credit, and version on every route. | T `ships complete route metadata and consistent static-page navigation`; S home desktop; L structure and axe for legal, offline, and 404. |
| F-1-18 | Kept the audience label `For volunteer leaders of small math circles`. | T `@claim:demo-sample`; S home desktop/mobile; L cold first screen desktop/mobile. |
| F-1-19 | Kept the h1 `Compare several approaches to one math problem`. | T `has the expected landing sections`; S home desktop/mobile; L cold first screen desktop/mobile. |
| F-1-20 | Kept the concrete explanation using approaches, votes, hints, and discussion. | T `@claim:demo-sample`; S home desktop/mobile; L cold first screen desktop/mobile. |
| F-1-21 | Kept concrete limits and removed the slogan. | T `@claim:no-public-sharing`; S home desktop/mobile; L cold first screen desktop/mobile. |
| F-1-22 | Kept `Browse templates` and `Templates`. | T `@claim:included-templates`; S home desktop; L structure and axe home desktop. |
| F-1-23 | Kept `Create a circle` beside the sample-first action. | T `@claim:demo-isolation`; S home desktop/mobile; L cold first screen desktop/mobile. |
| F-1-24 | Kept browser-scoped storage wording. | T `@claim:browser-only`; S home desktop; L console and privacy request log. |
| F-1-25 | Kept a descriptive illustration caption. | T `has the expected landing sections`; S home desktop/mobile; L structure and axe home desktop. |
| F-1-26 | Kept precise footer browser/offline facts. | T `@claim:browser-only`, `@claim:offline-reload`; S home desktop/mobile; L cold demo offline reload. |
| F-1-27 | Kept the direct, audience-specific README opening. | T `@claim:demo-sample`; S home desktop; L cold first screen desktop. |
| F-1-28 | Kept the README’s observable six-approach fact under the 22-word cap. | T `@claim:six-approaches`; S home desktop; L structure and axe home desktop. |
| F-1-29 | Kept visitor demo copy free of database jargon. | T `@claim:demo-isolation`; S demo desktop; L demo exit disposal, pristine re-entry, and reset. |
| F-1-30 | Kept circle/problem/approach/vote/hint/recap/demo as the visitor terms. | T `has the expected landing sections`; S home/demo desktop; L cold first screen desktop and structure/axe demo. |
| F-1-31 | Kept the dialog context label `Templates`. | T `@claim:included-templates`; S home desktop; L structure and axe demo. |
| F-1-32 | Kept `Choose a session template` as the dialog h2. | T `@claim:included-templates`; S home desktop; L structure and axe demo. |
| F-1-33 | Kept abstract paid-pack language removed. | T `@claim:included-templates`; S home desktop; L console and privacy request log. |
| F-1-34 | Kept the template name `Blank circle`. | T `@claim:included-templates`; S home desktop; L structure and axe demo. |
| F-1-35 | Kept the plain template name `Compare failed approaches`. | T `@claim:included-templates`; S home desktop; L structure and axe demo. |
| F-1-36 | Kept the unavailable session-shapes price and checkout removed. | T `@claim:included-templates`; S home desktop; L console and privacy request log. |
| F-2-1 | Retained the `single-device` claim and coverage for absent room, pairing, sync, and sharing paths. | T `@claim:single-device`; S demo mobile; L console and privacy request log. |
| F-2-2 | Strengthened valid JSON import: preview, save-first replacement, post-commit render, immediate reload, and namespace separation. | T `@claim:json-import`; S demo desktop; L rights enforcement, import recovery, preview, and persistence. |
| F-2-3 | Retained actual A4 PDF generation, one-page assertion, sample-content check, and JSON export. | T `@claim:recap-export`; S demo desktop; L keyboard phase focus and one-page recap. |
| F-3-1 | Kept the README’s testable six-approach wording. | T `@claim:six-approaches`; S home desktop; L structure and axe home desktop. |
| F-3-2 | Kept plain functional headings for approaches, add approach, voting prerequisite, and next-session question. | T `has accessible pages and 44px mobile links`; S demo desktop/mobile; L keyboard phase focus and one-page recap. |
| F-4-1 | Made import replacement save-first. The dialog is busy and both confirmation/cancel controls are disabled while `saveCircle` awaits IndexedDB transaction completion. Only a committed import replaces the in-memory circle, navigates, or announces success; a failure retains the prior circle with a recovery message. The storage helper now resolves only on `transaction.oncomplete`. | T `@claim:json-import` immediate reload plus `keeps the prior circle when an imported circle cannot be saved`; S demo desktop; L rights enforcement, import recovery, preview, and persistence. |

## Final result

The clean clone passed all ten claim commands, 9/9 unit/config tests, the 46-execution browser suite, and the build. Production passed all 19 live checks, including cold desktop/mobile first screen, isolated demo disposal/reset, immediate post-import reload, offline reload, PDF recap, route metadata/404, 44px mobile targets, axe scans, headers, link crawl, and same-origin privacy trace. No finding remains open.
