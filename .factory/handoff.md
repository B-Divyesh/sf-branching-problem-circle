# Polish 1 handoff — Branching Problem Circle

## Outcome

Repair commit: `72d7a4b5e37188fb261b6c42fc81bd3fd7089987` (will be superseded by this documentation commit). It closes every F-1-1 through F-1-36 finding in `.factory/review-1.md`; the mapping is in `.factory/polish-1.md`.

The product remains a static, local-first PWA with the glacial-ceramic visual system. `/demo` now opens a realistic, one-click sample in the separate `branching-problem-circle-demo` IndexedDB database. The persistent banner provides Reset demo and Start for real. The real circle database is `branching-problem-circle` and is never read or written while in demo mode.

The unreachable paid checkout was removed rather than left exposed. All shipped starter templates are included; core authoring, voting, printing, and export remain available.

## Verification

Run in the repaired worktree:

- `npm test` — 5 tests passed.
- `npm run build` — passed; `dist/` exists with `index.html` at its root.
- `npm run test:e2e` — 24 Playwright tests passed across desktop and 390×844 mobile.
- Axe is integrated in the Playwright welcome-page test: zero serious/critical WCAG A/AA violations.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/ /tmp/bpc-evidence` — passed: 534 ms load, title, `lang=en`, one h1, main, image alt, labeled buttons, and zero console/page errors. Screenshots: `/tmp/bpc-evidence/screenshot-desktop.png` and `/tmp/bpc-evidence/screenshot-mobile.png`.
- Local manifest response: `Content-Type: application/manifest+json`.
- `tests/deploy-config.test.ts` asserts production 404 rewrite/status, immutable assets, CSP/frame policy, permissions policy, and manifest MIME configuration.

Fresh-clone evidence (`/tmp/bpc-clean-c9ohXS`, cloned from repair commit): `npm ci` and `npm run build` passed. Every claims command from `.factory/claims.json` passed:

- `@claim:demo-sample`
- `@claim:demo-isolation`
- `@claim:browser-only`
- `@claim:offline-reload`
- `@claim:six-approaches`
- `@claim:recap-export`
- `@claim:included-templates`
- `@claim:no-public-sharing`

Each ran in desktop and mobile Playwright projects from clean storage. The offline claim waits for the service worker, switches the context offline, reloads `/demo`, and asserts the sample remains visible.

## Run and deploy

```sh
npm ci
npm test
npm run build
npm run test:e2e
```

Deploy `dist/` through the static work order. `public/staticwebapp.config.json` is copied into the build and supplies deep routes, the 404 document, cache rules, MIME, and response headers.

## Known gaps

No product defect is knowingly left. The local Vite preview does not emulate Static Web Apps response headers or unknown-route status, so those production-only settings are validated as configuration and must be rechecked on the deployed host. The attempted standalone Lighthouse CLI could not connect to the bundled Chrome in this container; the prior live audit recorded 99 performance / 100 accessibility, and this repair keeps the initial JS at 10.70 kB gzip and CSS at 5.79 kB gzip.
