# Compare math approaches in one circle — review 7

Reviewed 6 September 2026 UTC.

- Verdict: **PASS**
- Findings: **0**
- Untested claims: **0**
- Implementation candidate: `d072be41ebd1cffe8db4cfd53b015e6d4a35ab50`
- Documentation baseline: `3e7399c93b025fd1e53e34f472f4c6fe82fa36a9`
- Live URL: <https://branching-problem-circle.sociobot.in>
- Product code changed during review: none

Commits after the implementation candidate change only review and handoff documents. The live JavaScript, CSS, and service worker match the clean candidate build byte for byte.

## First screen before scrolling

Fresh 1440×900 desktop and 390×844 phone contexts had no saved site data. Both showed the required information above the fold.

| Question | Answer |
| --- | --- |
| Job | Compare several approaches to one math problem, collect anonymous votes, and reveal hints. |
| Audience | Volunteer leaders of small math circles. |
| First action | **Try it with sample data**. The adjacent text says a sample circle opens and nothing is saved. |

There was no horizontal overflow or unexpected console error. Visual inspection confirmed the complete phone and desktop layouts are readable and retain the product-specific ceramic design.

## Main job and demo sandbox

One click opened the original hexagon sample. It had three distinct approaches, six anonymous votes, written reasons, one alternative idea, an open hint, a revealed note, and a populated recap.

The persistent label read **Demo — sample data, nothing is saved**. **Reset demo** restored the shipped sample. **Start for real** deleted changed demo data and opened an empty real circle. Re-entry created a pristine sample. IndexedDB inspection showed separate `branching-problem-circle-demo` and `branching-problem-circle` databases, with no sample record copied into real data.

The complete leader path worked: enter a rights-cleared problem, add approaches, collect votes and explanations, reveal hints and notes, review the discussion, print one A4 page, and export or import JSON.

## Declared claims

Every exact command from `.factory/claims.json` ran separately from the clean clone. Each passed in desktop Chromium and the 390×844 phone project.

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

The registry contract passed: IDs are unique, commands match their IDs, and each claim has exactly one tagged browser test. Landing, application, README, privacy, terms, demo, offline, and 404 copy were compared with the registry. No missing, false, incomplete, unlisted, or untested public claim remains.

## Clean checkout checks

The clean clone was `/tmp/bpc-review7-w1yTHF/repo` at documentation baseline `3e7399c`. Its only changes during testing were ignored build and test output.

An initial attempt to run the live verifier in the clone preceded dependency installation because the first `npm ci` was accidentally run in the source workspace. That attempt did not launch a browser and produced no product result. `npm ci` was then run in the clone, and every measurement below completed successfully. The documented clean setup works.

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 105 packages installed, 0 vulnerabilities |
| `npm test` | PASS; 9/9 |
| `npm run build` | PASS; `dist/index.html` produced |
| Eleven exact claim commands | PASS; 22/22 desktop and phone executions |
| `npm run test:e2e` | PASS; 48/48 |
| Build budget | PASS; JS 33.38 kB raw / 11.16 kB gzip; CSS 22.06 kB raw / 5.90 kB gzip |

The clean tests covered the normal session, incomplete voting, rights validation, malformed and valid imports, a seven-approach import boundary, forced storage failure, immediate post-import reload, six-approach limit, deletion cancel/confirm, keyboard focus, mobile targets, reduced motion, route history, accessibility scans, offline reload, JSON export, and one-page PDF output.

## Live checks

The exact live command was:

`LIVE_BASE_URL=https://branching-problem-circle.sociobot.in EVIDENCE_DIR=/work/.evidence/review-7-live npm run test:live`

It passed 20/20 checks. This covered fresh desktop and phone first screens, demo reset and disposal, privacy deletion, import recovery and durability, keyboard focus, one-page recap, 44 px phone targets, offline reload, route metadata, Axe scans, security and cache headers, links, the deliberate HTTP 404, console output, and request logging.

`/opt/fleet/lib/verify-url.sh` passed with HTTP 200, a 799 ms load, `lang="en"`, one h1, one main landmark, image alternatives, named buttons, and no browser errors.

Fresh Lighthouse 12.8.2 mobile results were:

- Performance: **100**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**
- FCP: **0.90 s**
- LCP: **1.28 s**
- CLS: **0**
- Total blocking time: **0 ms**

The live and clean-build artifacts matched:

| Asset | SHA-256 |
| --- | --- |
| `app-DihcIyvW.js` | `d14e1cad661f35aea9f8afb713b90cc15dfb2ffd4fa9e4dc28ae28b24e88286a` |
| `styles-Bxvp-meK.css` | `1c71258fad600758ca79d5154cb16c8cd4ced77c31e6b9160d536a1b1c83b4cf` |
| `sw.js` | `dcaccbd114fe6a2f424dee83372e2036101d1c5d36a51ef4b487261aeb1779c6` |

## Accessibility, keyboard, and layout

- Playwright Axe found no serious or critical WCAG A/AA issue on home, demo, privacy, terms, offline, 404, import dialog, and populated views.
- The skip link was the first Tab stop, had a visible 3 px focus outline, and Enter targeted `#main`.
- Enter and Space operated native controls. Arrow keys, Home, End, and Escape operated phase tabs and dialogs. Dialog focus returned to its opener.
- Checked phone controls met 44×44 CSS px and did not clip at 390 px.
- Simulated 200% text size retained the main action and caused no horizontal overflow.
- Reduced-motion mode lowered animation and transition duration to `0.01 ms` and removed smooth movement.
- Forms have programmatic labels. Required-rights and voting errors are focused or announced. Dialogs expose names and state.

## Privacy, offline, routes, and recovery

- The live run recorded 56 requests. Every request was a same-origin GET. No analytics, trackers, remote fonts, CDN scripts, accounts, sync, checkout, or generated-solution request appeared.
- Cancelled deletion kept the real circle. Confirmed deletion removed it after reload and preserved the demo record.
- Demo mutations did not enter real storage. Starting for real removed demo state before returning home.
- The sample reloaded offline after its first controlled visit. Service-worker bytes match the candidate. No broader update promise is public.
- `/`, `/demo`, phase deep links, `/privacy/`, `/terms/`, `/offline.html`, manifest, icons, robots, sitemap, and social image worked.
- The unknown route returned the designed page with HTTP 404. Its expected failed resource message is not a defect.
- Titles, descriptions, canonicals, social metadata, common navigation, footer links, legal pages, CSP, frame denial, permissions policy, referrer policy, and MIME types passed.
- Malformed JSON retained the current circle and gave direct recovery text. A valid import preview named both circles and survived immediate reload. A forced IndexedDB failure retained the old circle and offered a retry.

## Earlier finding disposition

Every earlier review, verification, polish report, and handoff was inspected. The evidence codes below are: **L** live 20/20 verifier, **C** 22/22 claim executions, **E** 48/48 full browser suite plus 9/9 unit/config tests, **V** fresh visual inspection, **U** URL verifier, **H** artifact hashes, and **S** current source/copy inspection.

| Earlier id | Current disposition |
| --- | --- |
| F-1-1 | Closed (L, V): job, audience, action, and result appear before scrolling on phone and desktop. |
| F-1-2 | Closed (L, C): separate demo storage, persistent label, reset, exit deletion, and pristine re-entry passed. |
| F-1-3 | Closed (C, E, S): 11 registry entries each have one tagged test; all exact commands passed. |
| F-1-4 | Closed (C, L, S): the dead paid offer is absent; five included templates work and no checkout request occurs. |
| F-1-5 | Closed (L, E): demo and phase routes work; an unknown path returns the designed HTTP 404. |
| F-1-6 | Closed (L, E): Arrow, Home, and End keep focus on the selected phase tab. |
| F-1-7 | Closed (E): Escape, close, and template use restore opener focus. |
| F-1-8 | Closed (L, E, V): phone controls meet 44 px and do not clip. |
| F-1-9 | Closed (L, E): saving is blocked until rights consent is checked and focused. |
| F-1-10 | Closed (L, E): malformed JSON gives plain recovery text and retains the current circle. |
| F-1-11 | Closed (L): hashed assets return one-year immutable caching. |
| F-1-12 | Closed (L): CSP, frame denial, permissions, referrer, and nosniff headers passed. |
| F-1-13 | Closed (L): the manifest returns JSON MIME. |
| F-1-14 | Closed (L, E): route titles, descriptions, canonicals, social metadata, and icons passed. |
| F-1-15 | Closed (L, E): deep links, Back, reload, h1 focus, and polite route announcements passed. |
| F-1-16 | Closed (V, E): landing order contains preview, three steps, limits, templates, and footer. |
| F-1-17 | Closed (L, E): checked routes share navigation, footer, legal links, maker credit, and version. |
| F-1-18 | Closed (V, S): the audience names volunteer leaders of small math circles. |
| F-1-19 | Closed (V, S): the h1 names the approach-comparison job. |
| F-1-20 | Closed (S): problem, approach, vote, hint, note, recap, and demo terms are consistent. |
| F-1-21 | Closed (V, S): concrete limits replace the former slogan. |
| F-1-22 | Closed (V, E): template actions are **Browse templates** and **Templates**. |
| F-1-23 | Closed (V, E): the real-data action is **Create a circle**. |
| F-1-24 | Closed (C, S): storage wording is scoped to circle data in this browser. |
| F-1-25 | Closed (V, U): the illustration has useful alt text and a direct caption. |
| F-1-26 | Closed (C, S): footer browser and offline facts map to registered claims. |
| F-1-27 | Closed (S): README starts with the audience and concrete job. |
| F-1-28 | Closed (S): visitor README sentences remain within the plain-word limit. |
| F-1-29 | Closed (S): visitor demo copy omits database implementation terms. |
| F-1-30 | Closed (S): visitor terminology remains consistent. |
| F-1-31 | Closed (V, E): the dialog context is **Templates**. |
| F-1-32 | Closed (V, E): the dialog heading is **Choose a session template**. |
| F-1-33 | Closed (C, S): abstract paid-pack language is absent. |
| F-1-34 | Closed (E, S): the blank template is **Blank circle**. |
| F-1-35 | Closed (E, S): the failed-approach template uses direct wording. |
| F-1-36 | Closed (C, S): unavailable price and paid session-shape language remain absent. |
| F-2-1 | Closed (C): shared-device coverage proves no room, pairing, sync, or public-share path. |
| F-2-2 | Closed (C, L): JSON export/import, preview, durable reload, and demo separation passed. |
| F-2-3 | Closed (C, L): the test verifies sample content in a one-page A4 PDF and JSON export. |
| F-3-1 | Closed (C, S): README uses the observable six-approach statement. |
| F-3-2 | Closed (E, S): authoring, approach, voting, and recap headings are direct. |
| F-4-1 | Closed (C, L, H): import waits for durable storage and survives immediate live reload. |
| F-6-1 | Closed (C, L): deletion has a registered claim covering cancel, confirm, reload, and demo preservation. |

The first independent verification’s unnumbered checkout, keyboard focus, dialog focus, touch target, rights, import error, caching, security-header, manifest, privacy, and offline-update issues overlap F-1-4 and F-1-6 through F-1-13. All passed again. Reviews 5 and the repaired Review 6 introduced no other product finding.

## Scope decisions

This is a static, local-first PWA. Backend tenant isolation, server restart persistence, health endpoints, and 429/Retry-After do not apply. There is no paid tier.

No missed AI, sync, or extra import/export feature is implied. The brief excludes generated solutions and public sharing, specifies one shared device, and already receives JSON ownership plus a printable recap. Adding AI or sync would change the intended private facilitator workflow.

## Final decision

**PASS. Finding count: 0. Untested claim count: 0.** The live product matches implementation candidate `d072be4`, completes the facilitator’s real job, and meets the supplied contracts.
