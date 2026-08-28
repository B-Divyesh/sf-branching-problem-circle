# Polish round 1 — review finding closure

Candidate repaired from `c7a44266186f3fdbb3486c9f0248f90dd2fee972`; adversarial report read: `8d748ef14f44ca8f69c9f10b5fb80b90adbc4135` (`.factory/review-1.md`) and prior verification/handoff.

| Finding | Change | Evidence |
| --- | --- | --- |
| F-1-1 | Rewrote the first screen with the specified job, audience, demo action, and real-data action. | `@claim:demo-sample`; `/tmp/bpc-evidence/screenshot-desktop.png` |
| F-1-2 | Added `/demo`, deterministic hexagon sample, `branching-problem-circle-demo` DB, banner, reset, exit, and demo docs. | `@claim:demo-sample`, `@claim:demo-isolation` |
| F-1-3 | Added `claims.json` and one tagged Playwright declaration for every registered claim. | Fresh-clone claim commands, all pass |
| F-1-4 | Removed the unavailable paid offer, checkout, restore path, and billing requests; shipped included templates instead. | `@claim:included-templates` |
| F-1-5 | Added `/demo` and `/circle/*` rewrites, `404.html`, and a 404 response override. | `deploy-config.test.ts`; `404.html` browser test |
| F-1-6 | Preserved selected phase-tab focus after ArrowLeft/Right/Home/End. | Keyboard regression test |
| F-1-7 | Restored Templates opener focus after Escape, close, and template use. | Keyboard regression test |
| F-1-8 | Made wordmark and legal/site links independently 44px high. | Mobile bounding-box assertions |
| F-1-9 | Made the rights acknowledgement required. | Rights regression test |
| F-1-10 | Replaced JSON parser detail with actionable import recovery text. | Import regression test |
| F-1-11 | Added immutable cache policy for hashed assets. | `deploy-config.test.ts` |
| F-1-12 | Added CSP, frame protection, referrer, permissions, and nosniff headers. | `deploy-config.test.ts` |
| F-1-13 | Configured manifest MIME as `application/manifest+json`. | `deploy-config.test.ts`; local header check |
| F-1-14 | Added route titles, descriptions, canonicals, OG/Twitter tags, SVG favicon, Apple icon, and social image. | Route/title browser test; local smoke |
| F-1-15 | Added History API phase URLs, popstate restore, route announcement, and heading focus. | Route/title browser test |
| F-1-16 | Added sample preview, three-step explanation, limits/privacy, and templates section. | Landing smoke screenshot |
| F-1-17 | Unified header/footer navigation, legal links, Param Factory credit, and build id. | Browser/local smoke |
| F-1-18 | Replaced audience eyebrow with volunteer-leader wording. | `copy-audit.md` |
| F-1-19 | Replaced mood headline with the plain job headline. | `copy-audit.md` |
| F-1-20 | Replaced mixed/metaphorical explanation with one approach term. | `copy-audit.md` |
| F-1-21 | Removed slogan; limits state concrete absences. | `copy-audit.md` |
| F-1-22 | Replaced Template shelf with Browse templates/Templates. | Browser regression |
| F-1-23 | Replaced Shape action with Create a circle. | Landing smoke |
| F-1-24 | Replaced overbroad device claim with browser-specific wording. | `@claim:browser-only` |
| F-1-25 | Replaced image slogan with descriptive caption. | Local smoke |
| F-1-26 | Rewrote footer privacy/offline statement and registered tests. | `@claim:browser-only`, `@claim:offline-reload` |
| F-1-27 | Rewrote README opening in plain language. | `copy-audit.md` |
| F-1-28 | Split the long README sentence. | `copy-audit.md` |
| F-1-29 | Rewrote visitor-facing implementation jargon in README. | README review |
| F-1-30 | Standardized circle/problem/approach/vote/hint/recap terms. | `copy-audit.md` terminology table |
| F-1-31 | Replaced Facilitator shelf with Templates. | Template dialog browser test |
| F-1-32 | Replaced mood dialog heading with Choose a session template. | `@claim:included-templates` |
| F-1-33 | Removed abstract paid-pack language. | `@claim:included-templates` |
| F-1-34 | Renamed Blank thinking table to Blank circle. | `@claim:included-templates` |
| F-1-35 | Renamed Productive dead ends to Compare failed approaches. | Template dialog browser test |
| F-1-36 | Removed paid “session shapes” offer and unreachable price. | `@claim:included-templates` |

The ceramic visual system, original asset provenance, offline PWA class, and static deployment class are retained. No AI feature was added: facilitator-supplied, rights-cleared problems and no generated solutions are explicit product constraints.
