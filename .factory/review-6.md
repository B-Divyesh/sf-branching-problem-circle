# Review 6 — Compare approaches to one math problem

Reviewed 6 September 2026 at <https://branching-problem-circle.sociobot.in>.

- Implementation candidate: `d0a8efbd1d4025a627e7762023f4831b3df7d16f`
- Documentation reviewed: `0387759cd0d1618ad3ec516b77e8cad713b5946a`
- Verdict: **FAIL**
- Findings: **1**
- Untested claims: **1**

The product workflow works, but the public data-deletion promise is absent from `.factory/claims.json` and has no tagged claim test. The review contract requires zero findings and zero untested claims for a PASS.

## First screen before scrolling

Fresh 1440×900 desktop and 390×844 phone contexts showed the following without scrolling:

| Question | Answer |
| --- | --- |
| Job | Compare several approaches to one math problem, collect anonymous votes, and reveal hints. |
| Audience | Volunteer leaders of small math circles. |
| First action | **Try it with sample data**. The adjacent text says a sample opens and nothing is saved. |

The complete headline and first action were visible in both contexts. There was no horizontal overflow, third-party request, console error, or unclear first step.

## Finding

### F-6-1 — The public data-deletion claim is not registered or tested

- Severity: **Blocking claim-coverage finding**
- Location: `/privacy/`, under **Your control**: “Clear circle removes circle data from this browser.”
- Evidence: `.factory/claims.json` has ten entries, but none covers deletion. `rg` found no claim-tagged or ordinary test that selects **Clear circle** or verifies the record is removed after reload.
- Behavior check: in a fresh live phone context, I created and saved `Review 6 temporary circle`, accepted **Clear circle**, reloaded, and confirmed the real IndexedDB `active` record was absent. All requests were same-origin GETs. This touched only the disposable browser context and no existing user data.
- Why it fails: the behavior currently works, but the claims contract requires every public promise to have a registry entry and one matching `@claim:` test. Manual evidence does not replace that release test.
- Required repair: register a `data-deletion` claim and add one tagged browser test. Seed a real circle, verify cancel keeps it, accept deletion, reload, assert the real record is absent, and assert the demo namespace is unchanged.

## Demo and main workflow

- One click opened the populated hexagon circle with three approaches, six votes, written reasons, one alternative idea, opened content, and a usable recap.
- The persistent banner read **Demo — sample data, nothing is saved** and kept **Reset demo** and **Start for real** available.
- Reset restored the shipped sample. Start for real deleted changed demo data. Re-entry produced a pristine sample.
- Browser inspection found only `branching-problem-circle-demo` during the demo. The real namespace stayed empty.
- The A4 recap produced one PDF page with the sample content. JSON export and valid import worked.
- An imported circle survived an immediate reload. A simulated save failure kept the prior circle and showed a retry message.
- Missing rights consent blocked saving and focused the checkbox. Invalid JSON kept the current circle and gave plain recovery text.
- Six approaches were accepted; the seventh was blocked. Anonymous voting, reasons, alternative ideas, hints, and notes were covered by the passing full suite.

## Claims

Every command named in `.factory/claims.json` ran from the clean clone. Each passed in desktop Chromium and the 390×844 phone project.

| Claim id | Result |
| --- | --- |
| `demo-sample` | PASS, 2/2 |
| `demo-isolation` | PASS, 2/2 |
| `browser-only` | PASS, 2/2 |
| `single-device` | PASS, 2/2 |
| `offline-reload` | PASS, 2/2 |
| `six-approaches` | PASS, 2/2 |
| `recap-export` | PASS, 2/2 |
| `json-import` | PASS, 2/2 |
| `included-templates` | PASS, 2/2 |
| `no-public-sharing` | PASS, 2/2 |

The landing, README, catalog line, legal pages, and in-app status copy were cross-checked against the registry. F-6-1 is the one unlisted public promise.

## Clean checkout and live evidence

The clean clone was `/tmp/branching-problem-circle-review6-8JhBtv/repo` at documentation SHA `0387759cd0d1618ad3ec516b77e8cad713b5946a`.

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 105 packages, 0 vulnerabilities |
| Ten exact claim commands | PASS; 20/20 project executions |
| `npm test` | PASS; 9/9 |
| `npm run build` | PASS; `dist/index.html` produced |
| `npm run test:e2e` | PASS; 46/46 |
| `npm audit --audit-level=high` | PASS; 0 vulnerabilities |
| Clean `npm run test:live` | PASS; 19/19 |
| `verify-url.sh` | PASS; HTTP 200, 757 ms, title, `lang=en`, one h1, main, alt text, labels, no console errors |
| Standalone Axe CLI | PASS; 0 WCAG 2 A/AA violations after installing a matching ChromeDriver |
| Lighthouse mobile | 100 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.2 s, CLS 0, TBT 0 ms |

The build emitted 33.38 kB JavaScript (11.16 kB gzip), 22.06 kB CSS (5.90 kB gzip), and a 33,790-byte mobile hero. These are within the stated budgets.

The live JavaScript and CSS paths were `app-DihcIyvW.js` and `styles-Bxvp-meK.css`. Their live SHA-256 values matched the clean build byte-for-byte:

- JavaScript: `d14e1cad661f35aea9f8afb713b90cc15dfb2ffd4fa9e4dc28ae28b24e88286a`
- CSS: `1c71258fad600758ca79d5154cb16c8cd4ced77c31e6b9160d536a1b1c83b4cf`

The only commits after implementation candidate `d0a8efb` are documentation updates `e14ca69` and `0387759`. A tree comparison confirmed no product file differs after the candidate.

## Accessibility, privacy, offline, and routes

- Keyboard tests passed for Tab, phase Arrow keys, Home, End, dialog Escape/close, focus restoration, route focus, and destructive confirmation.
- Visible controls met the 44×44 px phone target check. The page did not clip at 390 px.
- Reduced-motion emulation reduced transitions and animation to effectively zero. Axe found no serious or critical issue on every shipped route and no violation at all on the standalone home scan.
- The demo and complete live verifier generated 45 same-origin GET requests and no unexpected console errors. No tracker, remote font, CDN script, account, sync, public room, checkout, or generated-solution request appeared.
- The sample reloaded offline after its first visit. Manifest icons, display mode, versioned service-worker caches, cache cleanup, and update notification code are present. Offline reload is the only public PWA behavior claim.
- `/`, `/demo`, `/privacy/`, `/terms/`, `/offline.html`, `/404.html`, robots, sitemap, manifest, icons, and social image returned the expected responses.
- An unknown route returned the styled page with HTTP 404. That deliberate 404 is expected and is not a defect.
- Route titles, one h1, main landmark, descriptions, canonicals, Open Graph/Twitter metadata, common navigation, legal links, skip links, and security headers passed.
- This is a static local-first PWA. Backend tenant, restart, health, and 429 checks do not apply.

## Earlier finding disposition

Every earlier review, polish report, verification report, and handoff was inspected. “Closed” below means the behavior was proved again from current live output, the clean suite, or both.

| Earlier id | Current disposition and evidence |
| --- | --- |
| F-1-1 | Closed: fresh desktop and phone views state the job, audience, sample action, and outcome before scrolling. |
| F-1-2 | Closed: separate demo storage, persistent banner, reset, exit deletion, and pristine re-entry passed live. |
| F-1-3 | Closed: ten registry entries have exactly one tagged test each; all ten commands passed. |
| F-1-4 | Closed: the unavailable paid offer is absent; five included templates are enabled and no checkout request occurs. |
| F-1-5 | Closed: demo and phase routes work; an unknown route returns the designed HTTP 404. |
| F-1-6 | Closed: Arrow, Home, and End retain focus on the selected phase tab. |
| F-1-7 | Closed: Escape, close, and template use return focus to the Templates opener. |
| F-1-8 | Closed: live 390 px links, buttons, and phase tabs meet 44 px targets without clipping. |
| F-1-9 | Closed: unchecked rights consent blocks persistence and receives focus. |
| F-1-10 | Closed: malformed JSON gives a direct recovery message and keeps the current circle. |
| F-1-11 | Closed: hashed assets return one-year immutable caching. |
| F-1-12 | Closed: CSP, frame denial, Permissions Policy, Referrer Policy, and nosniff are response headers. |
| F-1-13 | Closed: the live manifest has JSON MIME. |
| F-1-14 | Closed: route-specific titles, descriptions, canonicals, social metadata, and icons passed. |
| F-1-15 | Closed: phase deep links, reload, Back, h1 focus, and polite route announcement passed. |
| F-1-16 | Closed: landing order includes the first screen, sample preview, three steps, limits/privacy, templates, and footer. |
| F-1-17 | Closed: home, legal, offline, and 404 pages share navigation, footer, legal links, factory credit, and version. |
| F-1-18 | Closed: the audience label names volunteer leaders of small math circles. |
| F-1-19 | Closed: the h1 names the approach-comparison job. |
| F-1-20 | Closed: the explanation uses consistent problem, approach, vote, hint, and discussion terms. |
| F-1-21 | Closed: concrete product limits replace the former slogan. |
| F-1-22 | Closed: template actions use **Browse templates** and **Templates**. |
| F-1-23 | Closed: the real-data action is **Create a circle**. |
| F-1-24 | Closed: privacy wording is scoped to circle data in this browser. |
| F-1-25 | Closed: the illustration caption explains its purpose. |
| F-1-26 | Closed: footer browser/offline facts map to registered claims. |
| F-1-27 | Closed: the README begins with the audience and job in plain words. |
| F-1-28 | Closed: visitor-facing README sentences remain within the 22-word limit. |
| F-1-29 | Closed: visitor demo copy omits database implementation jargon. |
| F-1-30 | Closed: circle, problem, approach, vote, hint, note, recap, and demo remain consistent terms. |
| F-1-31 | Closed: the dialog context label is **Templates**. |
| F-1-32 | Closed: the dialog heading is **Choose a session template**. |
| F-1-33 | Closed: abstract paid-pack language is absent. |
| F-1-34 | Closed: the blank template is named **Blank circle**. |
| F-1-35 | Closed: the failed-approach template uses plain wording. |
| F-1-36 | Closed: the unavailable price and paid session-shapes offer remain absent. |
| F-2-1 | Closed: the single-device test proves no room, pairing, sync, or public-share path. |
| F-2-2 | Closed: valid JSON export/import, preview, durable reload, and demo separation passed. |
| F-2-3 | Closed: the recap test inspects sample content in a one-page A4 PDF and checks JSON export. |
| F-3-1 | Closed: the README uses the observable, tested six-approach statement. |
| F-3-2 | Closed: authoring, voting, approach, and recap headings are direct and functional. |
| F-4-1 | Closed: import waits for IndexedDB completion; the imported circle survives an immediate live reload. |

The earlier independent verification’s unnumbered paid checkout, phase and dialog focus, mobile target, rights, invalid import, cache, security-header, manifest, offline-update, and privacy findings are the same behaviors covered by F-1-4 and F-1-6 through F-1-13. Their current checks passed.

## Missing useful feature check

No missing AI, sync, or additional export feature is indicated. The brief requires facilitator-supplied problems, excludes generated solutions, and calls for one shared device. The sample, JSON ownership, and printable recap cover the useful adjacent needs without weakening privacy.

## Required next step

Add the one deletion claim and its tagged test, then rerun all claims and live checks. No product behavior repair was identified.
