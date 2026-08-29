# Adversarial first-read review 5 — Branching Problem Circle

Reviewed 29 August 2026 against <https://branching-problem-circle.sociobot.in> and source commit `e14ca69c81b234c1f85bb4c4e05005727a85e088`.

## Verdict: PASS

No findings remain. Fresh 390×844 mobile and 1440×900 desktop browser contexts, a clean-clone claim run, current-source inspection, and the live acceptance suite found zero untested claims, regressions, or unlisted landing-page claims.

## Cold first screen

| Question | Answer before scrolling |
| --- | --- |
| What does it do? | It collects anonymous votes on several approaches to one math problem, then reveals hints during discussion. |
| For whom? | Volunteer leaders of small math circles. |
| What should I click first? | **Try it with sample data**; the adjacent sentence says it opens a sample circle and saves nothing. |

Both viewports showed the audience, headline, explanation, sample-first action, outcome, and real-data action without horizontal overflow. Cold request logs contained only same-origin document, JavaScript, CSS, and self-hosted illustration requests. No console errors occurred.

## Copy audit

Counts are whitespace-delimited. All units are at or below 22 words. No jargon, marketing adjective, mood-only heading, inconsistent product term, or non-result-naming action was found.

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
| Collect anonymous votes on several approaches, then reveal hints during the discussion. | 11 |
| Try it with sample data | 5 |
| Opens a sample circle; nothing is saved. | 7 |
| Create a circle | 3 |
| Import a circle | 3 |
| Circle data stays in this browser | 6 |
| Up to six approaches, including dead ends | 6 |
| One-page printable recap | 3 |
| The illustration shows one problem branching into three approaches. | 9 |
| See the circle in use | 5 |
| One problem, three approaches, a shared discussion | 7 |
| Open the sample to inspect votes, hints, and a printable recap before making your own circle. | 16 |
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
| Authoring, voting, printing, and export are free. | 6 |
| Browse templates | 2 |
| Circle data stays in this browser · reloads offline after your first visit. | 12 |
| Privacy | 1 |
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
| Try the isolated sample at https://branching-problem-circle.sociobot.in/demo. | 6 |
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
| /?demo=1 and /demo load an original hexagon problem with three approaches, six anonymous votes, a revealed hint, and a recap. | 20 |
| The sample is stored separately from your real circles. | 9 |
| Reset demo restores that sample. | 5 |
| Start for real discards demo changes before returning to your circles. | 11 |
| Develop | 1 |
| Requires Node.js 20 or newer. | 5 |
| No environment variables or backend are required. | 7 |
| Test and build | 3 |
| npm run build type-checks the app and writes the static deploy to dist/, with dist/index.html at its root. | 18 |
| Browser tests use Playwright 1.58.2. | 5 |
| They cover the demo, claims, accessibility, keyboard focus, mobile targets, import recovery, privacy, and offline reload. | 14 |
| Deploy | 1 |
| Deploy dist/ to the configured static host. | 7 |
| HTTPS is required for service workers outside localhost. | 8 |
| public/staticwebapp.config.json supplies routing, response headers, cache rules, and the 404 rewrite. | 11 |
| The original ceramic illustration and its provenance live in assets/src/. | 10 |
| The visual rationale is in .factory/design.md. | 6 |
| License | 1 |
| MIT. | 1 |
| See LICENSE. | 2 |

## Demo, privacy, and claims

- One landing click opened `/?demo=1` directly into **A hexagon has six corners**, with three approaches, six votes, revealed content, and recap controls already visible.
- The persistent `Demo — sample data, nothing is saved` banner includes **Reset demo** and **Start for real**. Reset restored the sample; a focused fresh Start for real test returned to `/`. The live check verifies disposal, pristine re-entry, and namespace separation.
- The demo request trace was same-origin only. `context.setOffline(true)` after the first demo visit reloaded the sample successfully.
- `.factory/claims.json` has ten claims, each tied to exactly one `@claim:` test. Every listed command was run from clean clone `/tmp/branching-problem-circle-review5`; all passed in desktop and 390px projects. `npm test` passed 9/9, `npm run build` produced `dist/`, and the complete Playwright suite passed 46 tests.
- The landing’s observable promises map to the registered demo, browser-only, six-approaches, recap-export, single-device, no-public-sharing, included-templates, and offline-reload claims. No unlisted claim was found.

## Structure, accessibility, and visual identity

`LIVE_BASE_URL=https://branching-problem-circle.sociobot.in npm run test:live` passed all 19 checks: security/cache/manifest delivery, real 404, home/demo/legal/offline/404 metadata and axe scans, mobile targets, keyboard focus, route history, immediate import durability, A4 recap, offline reload, privacy request trace, and internal link crawl.

The title pattern, one h1, main landmark, description, canonical, OG/Twitter metadata, favicon, and consistent header/footer are present on checked routes. The original ceramic illustration, irregular tile geometry, cobalt/ice palette, Georgia/system typography, and reduced-motion treatment match `.factory/design.md` and are distinct from a generic SaaS template.

## Earlier finding verification

Every earlier review, polish report, verification report, and handoff was read. This table confirms current live behavior and source/tests, not merely an earlier closure note.

| Earlier id | Current confirmation |
| --- | --- |
| F-1-1 | Cold views show explicit job, audience, sample-first action, outcome, and real action. |
| F-1-2 | Demo uses seeded separate storage with reset, banner, and disposal on exit. |
| F-1-3 | Ten registered claims have one matching tag each and all commands pass. |
| F-1-4 | Templates are included; no price, checkout, restore, or billing request remains. |
| F-1-5 | Demo and phase routes resolve; an unknown path receives styled HTTP 404. |
| F-1-6 | Arrow, Home, and End retain focus on the selected phase tab. |
| F-1-7 | Template dialog exits restore focus to the opener. |
| F-1-8 | Live 390px checks confirm 44px targets and no clipping. |
| F-1-9 | Rights acknowledgement blocks saving and focuses the required control. |
| F-1-10 | Invalid JSON gives recovery text and retains the prior circle. |
| F-1-11 | Hashed assets receive immutable caching. |
| F-1-12 | Required security policies are response headers. |
| F-1-13 | Manifest delivery has JSON MIME. |
| F-1-14 | Home, demo, legal, offline, and 404 metadata is complete and route-specific. |
| F-1-15 | History URLs, Back/Forward, route focus, and announcements are verified. |
| F-1-16 | Landing contains preview, workflow, limits/privacy, templates, and footer. |
| F-1-17 | Checked routes share header/footer and legal links. |
| F-1-18 | Audience wording is plain volunteer-leader language. |
| F-1-19 | The h1 names the comparison job. |
| F-1-20 | Copy consistently uses approaches, votes, hints, and discussion. |
| F-1-21 | Concrete limits replace the slogan. |
| F-1-22 | Template controls use Browse templates/Templates. |
| F-1-23 | Create a circle remains the named real-data action. |
| F-1-24 | Storage wording is scoped to circle data in the browser. |
| F-1-25 | The illustration caption describes its purpose. |
| F-1-26 | Footer privacy/offline facts have matching claims. |
| F-1-27 | README opens with audience and concrete job language. |
| F-1-28 | README visitor sentences are under the 22-word cap. |
| F-1-29 | Visitor demo wording omits database implementation jargon. |
| F-1-30 | Circle, problem, approach, vote, hint, recap, and demo are consistent. |
| F-1-31 | Template dialog context is Templates. |
| F-1-32 | Dialog heading is Choose a session template. |
| F-1-33 | Abstract paid-pack language is absent. |
| F-1-34 | Blank template is named Blank circle. |
| F-1-35 | Failed-approach template uses plain wording. |
| F-1-36 | Unavailable paid session-shapes offer remains absent. |
| F-2-1 | `single-device` verifies absent room, pairing, sync, and share paths. |
| F-2-2 | `json-import` verifies export, preview, import, persistence, and demo separation. |
| F-2-3 | `recap-export` inspects a one-page A4 PDF and JSON export. |
| F-3-1 | README uses the observable six-approach statement. |
| F-3-2 | Editor headings are plain and functional. |
| F-4-1 | Save-first import awaits IndexedDB completion; immediate-reload live check passes. |

## Missed leverage

No missing AI, sync, or export feature is indicated. The brief requires facilitator-supplied rights-cleared problems, forbids generated-solution service, and specifies a local-first shared-device model. The useful implied adjuncts—sample data, JSON import/export, and printable recap—are present and tested.

## What would make this perfect

No product change is currently indicated. Keep the ten claim commands and 19 live checks in release verification so this zero-finding state remains true after future changes.
