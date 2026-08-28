# Polish round 3 handoff — Branching Problem Circle

## Outcome

PASS. Every finding in reviews 1–3 is resolved, including the repeated demo-disposal defect and all copy-only findings. No known gap or deferred item remains.

The repaired app is live at <https://branching-problem-circle.sociobot.in>. Product source was deployed from commit `4622779`. Deployment ID: `0d413a2f-1a1d-48e7-9040-c8becdafa998`.

## What changed

- **Start for real** now deletes the altered demo record before returning to real mode. Re-entry seeds the original sample, and real storage stays empty.
- The landing sample action uses the direct `/?demo=1` entry. The banner, reset, exit, separate storage namespace, and realistic seeded circle remain available on `/demo` too.
- All four review-3 workflow headings and the README outcome sentence now use direct, tested language.
- Import replacement now uses an accessible in-product preview that names both circles, preserves the current circle until confirmation, and restores focus on cancellation.
- Claim registration checks enforce one tagged test for each claim. Browser coverage now proves demo disposal, IndexedDB persistence, all dialog exit paths, reduced motion, console health, mobile targets, and fully visible phase controls.
- The catalog description is verb-first and 88 characters: `Compare math approaches, collect anonymous votes, and reveal hints on one shared device.`
- The original glacial-ceramic visual system, generated still life, irregular tiles, cobalt/ice palette, and restrained motion remain intact.

The complete finding-to-change-to-evidence map is in [`.factory/polish-3.md`](polish-3.md).

## Clean-clone verification

Final pushed commit `4622779` was cloned to `/tmp/bpc-polish3-final2-55rjjt/repo` with no retained browser or build state.

- `npm ci` — passed; 106 packages audited, 0 vulnerabilities.
- Every command in `.factory/claims.json` — passed. Ten commands ran in both desktop and 390px projects: 20/20 claim executions.
- `npm test` — 9/9 unit and deployment-contract tests passed.
- `npm run build` — passed and produced `dist/index.html`.
- `npm run test:e2e` — 42/42 browser tests passed.
- `npm audit --audit-level=high` — passed with 0 vulnerabilities.
- Built JS: 32.97 KB raw / 10.98 KB gzip. Built CSS: 22.06 KB raw / 5.90 KB gzip. The hero WebP is 33,790 bytes.

## Deployed verification

After the final deployment, `LIVE_BASE_URL=https://branching-problem-circle.sociobot.in npm run test:live` passed 19/19 checks. It covered:

- cold desktop and 390px first screens;
- demo mutation, exit deletion, database inspection, pristine re-entry, and reset;
- keyboard phase focus and a parsed one-page A4 recap;
- required rights acknowledgement, invalid-import recovery, replacement preview, and reload persistence;
- 390px layout, 44px targets, and four fully visible phase tabs;
- offline demo reload after service-worker readiness;
- titles, metadata, landmarks, image alternatives, Axe WCAG A/AA checks, and navigation on home, demo, privacy, terms, offline, and 404;
- real HTTP 404, response security headers, immutable hashed assets, JSON manifest MIME, internal links, and 45 same-origin GET requests with no unexpected console error.

The intentional unknown-route navigation produced the browser's expected 404 network entry. No script, asset, or rendered page produced an error.

`/opt/fleet/lib/verify-url.sh` independently returned HTTP 200, `lang=en`, one h1, one main landmark, zero missing image alternatives, zero unnamed buttons, zero console errors, and 768 ms load time.

Mobile Lighthouse on the live URL scored 100 performance, 100 accessibility, 100 best practices, and 100 SEO. FCP was 0.9 s, LCP 1.3 s, CLS 0, TBT 0 ms, and total transfer 83 KiB.

Evidence:

- `.factory/evidence/polish-3-live-report.json`
- `.factory/evidence/polish-3-lighthouse.json`
- `.factory/evidence/polish-3-verify/verify.json`
- `.factory/evidence/polish-3-home-desktop.png`
- `.factory/evidence/polish-3-home-mobile.png`
- `.factory/evidence/polish-3-demo-desktop.png`
- `.factory/evidence/polish-3-demo-mobile.png`

## Run, test, and deploy

```sh
npm ci
npm test
npm run build
npm run test:e2e
LIVE_BASE_URL=https://branching-problem-circle.sociobot.in npm run test:live
```

Deploy the generated `dist/` through the factory work-order command:

```sh
/opt/fleet/lib/deploy-static.sh branching-problem-circle dist
```

## Known gaps

None.
