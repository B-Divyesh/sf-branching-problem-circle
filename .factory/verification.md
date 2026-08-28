# Independent product verification — FAIL

Verified 2026-08-28 UTC.

- Candidate: `c7a44266186f3fdbb3486c9f0248f90dd2fee972`
- Repository: `https://github.com/B-Divyesh/sf-branching-problem-circle.git`, branch `main`
- Live URL: `https://branching-problem-circle.sociobot.in`
- Artifact: offline-capable PWA
- Environment: Node `v22.23.2`, npm `10.9.8`, Chrome for Testing `145.0.7632.6`
- Starting state: clean checkout, `HEAD` exactly matched the candidate and `main` matched `origin/main`
- Product-code changes during verification: none

## Verdict

**FAIL.** The core facilitator workflow works locally and live, the live deployment exactly matches the candidate build, and the PWA works offline. Release acceptance is nevertheless blocked by one high-severity commerce failure and accessibility/contract defects: the advertised purchase link is dead, phase-tab keyboard navigation loses focus, three mobile links miss the 44 px target requirement, and a problem can be saved without the rights acknowledgement.

There was no general deployment failure at verification time. Every one of the 18 files in a fresh `dist/` was downloaded from the live URL and compared by SHA-256; all 18 pairs were identical. Representative matches:

| File | SHA-256 (local and live) |
| --- | --- |
| `index.html` | `9a0083d9adbf533f86940c53b2b24a9b3c10db414712c465f4551db5ae120980` |
| `assets/app-BczBAuvt.js` | `a11fdb0aa2de79e939b2eadb49e50e8f8f0b41c23791e74e92c2b0f8a4c2c317` |
| `assets/styles-BJJTD7NL.css` | `83b2c6e59ffd3391ab9e4f939dd782c4a88c3017d70ecb07d48b4d24be2dbf7a` |
| `sw.js` | `985f69be1b17c953cec312b3d80a42e1af0b141743dcedb232235e88ea42d8b3` |

## Defects

### High

1. **The paid template-pack checkout is unavailable.**
   - Open **Template shelf** and follow **Buy the pack**. It targets the required Sociobot URL, `https://api.sociobot.in/api/v1/products/branching-problem-circle/checkout`.
   - Fresh direct request result: HTTP `404`, body `{"error":"enabled factory product","status":404}`.
   - The dialog advertises “US $12 one-time purchase” and keeps four templates disabled, but no customer can buy the unlock. The invalid-license verification endpoint itself is live and correctly returned HTTP `200` with `{"expires_at":null,"reason":"invalid","valid":false}`.

### Medium

1. **Arrow-key phase navigation discards keyboard focus.**
   - With **Collect** focused, pressing `ArrowRight` activates **Explore**, then `document.activeElement` becomes `BODY` instead of the selected Explore tab.
   - The keyboard user must restart tab navigation from the document. Closing the Template shelf with `Escape` likewise leaves focus on `BODY` instead of returning it to the opener.
   - This violates the work order's keyboard and dialog focus-management baseline even though the controls remain reachable after retabbing.

2. **Mobile interactive targets are below the required 44×44 CSS px.**
   - At a 390×844 viewport: the Branching Problem Circle wordmark measured `164×35`, Privacy `49×15`, and Terms `40×15`.
   - Other visible welcome controls met the size requirement, and the page had no horizontal overflow (`390 px` viewport and document width).

3. **The rights acknowledgement is not enforced.**
   - Create a circle, enter a valid title and problem, leave “I have permission to use this problem with my group” unchecked, then select **Save problem**.
   - The app reports “Problem saved on this device”; IndexedDB persists `rightsConfirmed: false`, and the workflow can continue.
   - This contradicts the acceptance constraint that facilitators supply rights-cleared problems and makes a prominent acknowledgement ineffective.

### Low

1. **Malformed JSON exposes a parser diagnostic instead of actionable recovery copy.** Importing `{bad` preserves the existing circle, but the visible message is `Expected property name or '}' in JSON at position 1 (line 1 column 2)` rather than explaining that the file is invalid and should be re-exported or replaced.
2. **Production cache headers do not use immutable caching for hashed assets.** `app-BczBAuvt.js`, `styles-BJJTD7NL.css`, images, icons, HTML, and the service worker all return `Cache-Control: public, must-revalidate, max-age=30`. The hashed JS/CSS/image assets should have a long immutable lifetime; HTML and `sw.js` should remain short-lived.
3. **Browser response hardening is incomplete.** HTTPS responses include HSTS, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, and `X-DNS-Prefetch-Control: off`, but omit Content Security Policy, frame protection (`frame-ancestors` or `X-Frame-Options`), and Permissions Policy.
4. **The live manifest uses a generic MIME type.** `/manifest.webmanifest` returns `application/octet-stream`, not `application/manifest+json` or `application/json`. Chrome still parsed it and reported zero installability errors in this run.

## Clean local gates

Executed from the clean candidate checkout using the lockfile:

| Gate | Result |
| --- | --- |
| `npm ci` | PASS; 98 packages installed; lockfile unchanged |
| `npm test` | PASS; 3/3 Vitest tests |
| `npm run build` | PASS; `tsc --noEmit` and Vite 7.3.6; `dist/` produced |
| `npm run test:e2e` | PASS; 6/6 Playwright tests across desktop Chromium and 390×844 mobile |
| `npm audit --audit-level=high` | PASS; 0 vulnerabilities |
| Lint | Not available; no lint script/configuration is exposed by the repository |

Exact production output:

- JavaScript: `27,792` bytes (`9.67 kB` gzip), below the 200 kB budget.
- CSS: `19,805` bytes (`5.45 kB` gzip), below the 50 kB budget.
- Mobile hero WebP: `33,790` bytes, below the 300 kB budget.
- No webfont payload or remote font request.

## Independent end-to-end coverage

The expanded run used the live deployment after build parity was established. It covered:

- Welcome, empty authoring, native required-field rejection, rights state, and six-approach maximum.
- Anonymous shared-device voting: empty submission rejection, selected path without rationale rejection, accepted rationale, and alternative path.
- IndexedDB persistence across reload; hint and full-path reveal; vote counts; recap contents; print-media fallback.
- JSON export with six branches, one vote, one rationale, and one alternative; malformed JSON recovery; seven-branch import rejection while retaining the current session.
- Destructive clear confirmation: cancel retained the circle and accept removed it.
- Desktop and 390×844 mobile rendering, visible `3 px` focus outline, skip link, keyboard phase arrows, touch sizes, and horizontal overflow.
- Reduced-motion emulation: animation/transition durations reduced to `0.01 ms`, with automatic scrolling disabled.
- Axe WCAG A/AA scans on the welcome screen, Template shelf dialog, populated Explore screen, and mobile welcome: **0 serious/critical findings**.
- Browser console and page errors: **0** throughout the expanded run.
- `/opt/fleet/lib/verify-url.sh`: HTTP `200`, load `734 ms`, title present, `lang="en"`, exactly one `h1`, main landmark present, no missing image alt, no unlabeled buttons, and no console/page errors.

The core workflow succeeded and retained both the participant rationale and alternative idea in the recap. Visual inspection found a coherent desktop recap and intentional mobile stacking without clipping.

## PWA, privacy, and network evidence

- Chrome parsed the manifest, found the 192/512/maskable icons, and returned zero installability errors.
- The live service worker registered and controlled the page. With Playwright `context.setOffline(true)`, a populated recap reloaded with persisted data; the precached `/privacy/` page also loaded offline.
- A controlled update simulation served the exact `dist/` and then changed only the service-worker response bytes. The new worker activated, the in-app “The offline app has been updated.” toast appeared, and an offline reload still succeeded.
- Default load and the complete free session contacted only `https://branching-problem-circle.sociobot.in`; no analytics, trackers, CDN scripts, remote fonts, or solution-generation services were observed.
- A fake `?license=qa-invalid-token` was saved under `sb_license:branching-problem-circle`, stripped from the visible URL, and verified only against `https://api.sociobot.in`; the UI correctly changed to “This license is no longer active.”
- Circle content remained in IndexedDB. Export/import ownership, privacy and terms pages, and offline storage disclosure all worked.

## Live performance and delivery

Lighthouse 12.8.2 mobile against the live URL:

- Performance **99**
- Accessibility **100**
- Best Practices **100**
- SEO **100**
- FCP **1.0 s**, LCP **1.3 s**, TBT **110 ms**, CLS **0**, Speed Index **1.1 s**

The response was HTTP/2 `200` over HTTPS with HSTS. The live HTML referenced the exact candidate asset names. No backend/concurrency test applies to this static local-first PWA; the exact artifact hash comparison is the build-identity check.

## Release decision

Do not promote this candidate as accepted. Enable/register the Sociobot paid product, repair phase/dialog focus restoration and mobile target sizes, require the rights acknowledgement, then rerun live checkout and the focused regression checks. The core local-first circle, export, print, PWA update/offline behavior, privacy posture, bundle budgets, and automated gates are otherwise in good condition.
