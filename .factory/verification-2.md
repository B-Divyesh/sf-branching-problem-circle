# Compare math approaches in one circle — independent verification 2

Verified 6 September 2026 UTC.

- Verdict: **PASS**
- Findings: **0**
- Untested claims: **0**
- Implementation candidate: `d072be41ebd1cffe8db4cfd53b015e6d4a35ab50`
- Documentation SHA reviewed: `6ca6e9bd26888504f97a89d410356531c8324052`
- Live URL: <https://branching-problem-circle.sociobot.in>
- Product code changed during verification: none

The documentation commit changes only `.factory/handoff.md`. The application, claim registry, browser tests, and production verifier come from the implementation candidate.

## First screen before scrolling

Fresh 1440×900 desktop and 390×844 phone contexts showed all required information before scrolling.

| Question | Answer |
| --- | --- |
| Job | Compare several approaches to one math problem, collect anonymous votes, and reveal hints. |
| Audience | Volunteer leaders of small math circles. |
| First action | **Try it with sample data**. The adjacent text says a sample circle opens and nothing is saved. |

The complete headline, audience, primary action, and action result were above the fold in both contexts. There was no horizontal overflow, third-party request, or unexpected console error.

## Main job and demo

One click opened the populated hexagon circle. It contained three distinct approaches, six anonymous votes, written reasons, an alternative idea, an open hint, a revealed note, and a usable recap.

The banner stayed visible and read **Demo — sample data, nothing is saved**. **Reset demo** restored the shipped sample. **Start for real** deleted changed demo data and opened an empty real circle. Re-entering the demo seeded a clean sample. Browser inspection showed separate `branching-problem-circle-demo` and `branching-problem-circle` databases, with no record copied between them.

The complete facilitator path worked: author a rights-cleared problem, add approaches, collect votes and explanations, control hints and notes, review the discussion, print one A4 recap, and export or import JSON.

## Declared claims

Every command in `.factory/claims.json` ran from the fresh clone. Each command passed in desktop Chromium and the 390×844 phone project.

| Claim | Exact command | Result |
| --- | --- | --- |
| `demo-sample` | `npm run test:e2e -- --grep @claim:demo-sample` | PASS, 2/2 |
| `demo-isolation` | `npm run test:e2e -- --grep @claim:demo-isolation` | PASS, 2/2 |
| `browser-only` | `npm run test:e2e -- --grep @claim:browser-only` | PASS, 2/2 |
| `data-deletion` | `npm run test:e2e -- --grep @claim:data-deletion` | PASS, 2/2 |
| `single-device` | `npm run test:e2e -- --grep @claim:single-device` | PASS, 2/2 |
| `offline-reload` | `npm run test:e2e -- --grep @claim:offline-reload` | PASS, 2/2 |
| `six-approaches` | `npm run test:e2e -- --grep @claim:six-approaches` | PASS, 2/2 |
| `recap-export` | `npm run test:e2e -- --grep @claim:recap-export` | PASS, 2/2 |
| `json-import` | `npm run test:e2e -- --grep @claim:json-import` | PASS, 2/2 |
| `included-templates` | `npm run test:e2e -- --grep @claim:included-templates` | PASS, 2/2 |
| `no-public-sharing` | `npm run test:e2e -- --grep @claim:no-public-sharing` | PASS, 2/2 |

The registry contract also passed: IDs are unique, commands match their IDs, and every claim has exactly one tagged browser test. Landing, README, legal, demo, footer, and in-app claim-like copy were compared with the registry. No unlisted public claim remains.

## Clean checkout checks

The independent clone was `/tmp/bpc-verify2-YjemyX/repo` at `6ca6e9b`. It matched `origin/main` before testing.

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 105 packages installed, 0 vulnerabilities |
| `npm test` | PASS; 9/9 |
| `npm run build` | PASS; `dist/index.html` produced |
| Eleven exact claim commands | PASS; 22/22 desktop and phone executions |
| `npm run test:e2e` | PASS; 48/48 |
| Build budget | PASS; JS 33.38 kB raw and 11.16 kB gzip; CSS 22.06 kB raw and 5.90 kB gzip |
| Mobile hero | PASS; 33,790 bytes |

The full suite covered the normal flow, malformed and valid imports, forced storage failure, immediate post-import reload, required rights consent, the six-approach boundary, empty voting, keyboard focus, mobile targets, reduced motion, route history, accessibility scans, offline reload, JSON export, and one-page PDF output.

## Live checks

The final exact command was:

`LIVE_BASE_URL=https://branching-problem-circle.sociobot.in EVIDENCE_DIR=/work/.evidence/verification-2-live npm run test:live`

It passed 20/20 checks. These included fresh desktop and phone first screens, demo reset and disposal, privacy deletion, import recovery and durability, keyboard focus, one-page recap, 44 px phone targets, offline reload, route metadata, Axe scans, security and cache headers, links, the deliberate 404, console output, and request logging.

`/opt/fleet/lib/verify-url.sh` also passed: HTTP 200 in 600 ms, `lang="en"`, one h1, one main landmark, image alternatives, button names, and no browser errors.

Fresh Lighthouse 12.8.2 mobile results were:

- Performance: **100**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**
- LCP: **1.28 s**
- CLS: **0**
- Total blocking time: **0 ms**

The live and clean-build artifacts matched byte for byte:

| Asset | SHA-256 |
| --- | --- |
| `app-DihcIyvW.js` | `d14e1cad661f35aea9f8afb713b90cc15dfb2ffd4fa9e4dc28ae28b24e88286a` |
| `styles-Bxvp-meK.css` | `1c71258fad600758ca79d5154cb16c8cd4ced77c31e6b9160d536a1b1c83b4cf` |
| `sw.js` | `dcaccbd114fe6a2f424dee83372e2036101d1c5d36a51ef4b487261aeb1779c6` |

The first live-verifier run sampled the invalid-import message immediately after the asynchronous file read and exited before it was visible. An independent fresh context waited for the user-visible result: the plain error appeared in 18 ms, the existing circle remained, and no browser error occurred. The unchanged full command then passed 20/20. This was a verifier timing sample, not a failed user path or claim.

## Accessibility and input

- Playwright Axe scans found no serious or critical WCAG A/AA violation on home, demo, privacy, terms, offline, and 404 views.
- Keyboard checks covered Tab, Enter, Space through native controls, ArrowLeft, ArrowRight, Home, End, Escape, dialog entry, dialog exit, route focus, and focus restoration.
- The skip link was the first Tab stop, became visible, and targeted `#main`.
- Focus used a visible 3 px solid outline. Dialog focus opened on **Close templates** and returned to **Templates** after Escape.
- Every checked phone link, button, phase tab, and dialog control met 44×44 CSS px. Nothing clipped at 390 px.
- The layout had no horizontal overflow at 390 px or at the 640 CSS px layout pressure produced by 200% browser zoom from 1280 px.
- Reduced-motion mode lowered animation and transition duration to `0.01 ms` and removed smooth scrolling.
- Forms have programmatic labels. Rights and voting errors are focused or announced. Import dialogs expose their names, state, and focus order.

## Privacy, storage, offline, and routes

- The live run recorded 56 requests. Every request was a same-origin GET. No analytics, tracker, remote font, CDN script, account, sync, checkout, or generated-solution request appeared.
- Cancelled deletion retained the real circle. Confirmed deletion removed it after reload and preserved the demo record.
- Demo mutations never entered real storage. Starting for real removed the demo record before returning home.
- The demo reloaded while the browser context was offline after the first visit.
- The service worker, cache names, precache list, cleanup, and revalidation policy are present. `sw.js` is revalidated and its live bytes match the candidate. Offline reload is the public update-related promise; there is no separate public update guarantee.
- `/`, `/demo`, phase deep links, `/privacy/`, `/terms/`, `/offline.html`, manifest, icons, robots, sitemap, and social image worked.
- An unknown URL returned the designed page with HTTP 404. Its one expected browser resource error is not a defect. No unexpected console error occurred.
- Route titles, descriptions, canonicals, Open Graph and Twitter metadata, common navigation, footer links, legal pages, and response security headers passed.

## Invalid, boundary, and recovery checks

- Empty or incomplete vote submissions showed direct guidance and did not change totals.
- Saving without rights consent was blocked and moved focus to the required checkbox.
- Six approaches were accepted; the add control was disabled at the limit.
- Malformed JSON kept the current circle and explained which file to choose.
- A valid import showed a named replacement preview, committed before rendering success, and survived immediate reload.
- A forced IndexedDB write failure kept the prior circle and showed a retry message.
- Destructive clear supported cancel and named confirmation.
- Back, forward, reload, direct phase links, demo reset, real-mode exit, and offline reload recovered the expected state.

## Earlier finding disposition

Every earlier verification, review, polish report, and handoff was inspected. Each prior finding was checked against current live output, the clean suite, or both.

| Earlier id | Current disposition and evidence |
| --- | --- |
| F-1-1 | Closed: both first screens show the job, audience, sample action, result, and real action. |
| F-1-2 | Closed: demo storage is separate; reset, exit deletion, and pristine re-entry passed live. |
| F-1-3 | Closed: 11 claims have exactly one tagged test; all 11 commands passed. |
| F-1-4 | Closed: the dead paid offer is absent; five templates are included and no checkout request occurs. |
| F-1-5 | Closed: demo and phase routes work; an unknown path returns the designed HTTP 404. |
| F-1-6 | Closed: Arrow, Home, and End keep focus on the selected phase tab. |
| F-1-7 | Closed: Escape, close, and template use restore opener focus. |
| F-1-8 | Closed: live phone controls meet 44 px and do not clip. |
| F-1-9 | Closed: rights consent blocks persistence until checked. |
| F-1-10 | Closed: malformed JSON gives recovery text and retains the current circle. |
| F-1-11 | Closed: hashed assets return one-year immutable caching. |
| F-1-12 | Closed: CSP, frame denial, Permissions Policy, Referrer Policy, and nosniff are headers. |
| F-1-13 | Closed: the linked live manifest returns JSON MIME. |
| F-1-14 | Closed: route titles, descriptions, canonicals, social metadata, and icons passed. |
| F-1-15 | Closed: deep links, Back, reload, h1 focus, and polite route announcements passed. |
| F-1-16 | Closed: landing order includes preview, three steps, limits, templates, and footer. |
| F-1-17 | Closed: all checked routes share navigation, footer, legal links, maker credit, and version. |
| F-1-18 | Closed: the audience names volunteer leaders of small math circles. |
| F-1-19 | Closed: the h1 names the approach-comparison job. |
| F-1-20 | Closed: copy uses approaches, votes, hints, and discussion consistently. |
| F-1-21 | Closed: concrete limits replace the former slogan. |
| F-1-22 | Closed: the actions are **Browse templates** and **Templates**. |
| F-1-23 | Closed: the real-data action is **Create a circle**. |
| F-1-24 | Closed: storage wording is scoped to circle data in this browser. |
| F-1-25 | Closed: the image caption explains its purpose. |
| F-1-26 | Closed: footer browser and offline facts map to registered claims. |
| F-1-27 | Closed: README starts with the audience and concrete job. |
| F-1-28 | Closed: visitor README sentences stay within the 22-word cap. |
| F-1-29 | Closed: visitor demo copy omits database implementation terms. |
| F-1-30 | Closed: circle, problem, approach, vote, hint, note, recap, and demo remain consistent. |
| F-1-31 | Closed: the dialog context is **Templates**. |
| F-1-32 | Closed: the dialog heading is **Choose a session template**. |
| F-1-33 | Closed: abstract paid-pack language is absent. |
| F-1-34 | Closed: the blank template is named **Blank circle**. |
| F-1-35 | Closed: the failed-approach template uses plain wording. |
| F-1-36 | Closed: the unavailable price and paid session-shapes offer remain absent. |
| F-2-1 | Closed: the shared-device claim proves no room, pairing, sync, or public-share path. |
| F-2-2 | Closed: export/import, preview, durable reload, and demo separation passed. |
| F-2-3 | Closed: the test inspects a one-page A4 recap and JSON export. |
| F-3-1 | Closed: README uses the observable, tested six-approach statement. |
| F-3-2 | Closed: authoring, approach, voting, and recap headings are direct. |
| F-4-1 | Closed: import waits for storage completion and survives immediate live reload. |
| F-6-1 | Closed: `data-deletion` is registered and its cancel, confirm, reload, and demo-preservation test passed. |

The unnumbered defects in the first independent verification were the dead paid checkout, phase and dialog focus, mobile targets, rights validation, malformed import copy, asset caching, security headers, and manifest MIME. They are the same behaviors covered above by F-1-4 and F-1-6 through F-1-13, and all passed again.

Reviews 5 and the repaired Review 6 state introduced no additional open product finding.

## Product scope checks

This is a static local-first PWA. Backend tenant isolation, server restart persistence, health endpoints, and 429/Retry-After checks do not apply. The product has no paid tier, so billing checks do not apply.

No missing AI, sync, or additional export feature is indicated. The brief requires facilitator-supplied problems, excludes generated solutions, and specifies one shared device. JSON ownership and the printable recap cover the useful adjacent needs without changing that scope.

## Final decision

**PASS.** Finding count is 0. Untested claim count is 0. The live product matches implementation candidate `d072be4`, completes the real facilitator job, and meets the attached product contracts.
