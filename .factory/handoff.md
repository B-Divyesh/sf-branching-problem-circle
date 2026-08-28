# Polish 1 handoff — Branching Problem Circle

## Outcome

Repair commits: `72d7a4b5e37188fb261b6c42fc81bd3fd7089987` (workflow and review closure), `a55dc1c` (evidence), and `231ebff` (live manifest MIME repair). They close every F-1-1 through F-1-36 finding in `.factory/review-1.md`; the mapping is in `.factory/polish-1.md`.

The product remains a static, local-first PWA with the glacial-ceramic visual system. `/demo` now opens a realistic, one-click sample in the separate `branching-problem-circle-demo` IndexedDB database. The persistent banner provides Reset demo and Start for real. The real circle database is `branching-problem-circle` and is never read or written while in demo mode.

The unreachable paid checkout was removed rather than left exposed. All shipped starter templates are included; core authoring, voting, printing, and export remain available.

## Verification

Run in the repaired worktree:

- `npm test` — 5 tests passed.
- `npm run build` — passed; `dist/` exists with `index.html` at its root.
- `npm run test:e2e` — 24 Playwright tests passed across desktop and 390×844 mobile.
- Axe is integrated in the Playwright welcome-page test: zero serious/critical WCAG A/AA violations.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/ /tmp/bpc-evidence` — passed: 534 ms load, title, `lang=en`, one h1, main, image alt, labeled buttons, and zero console/page errors. Screenshots: `/tmp/bpc-evidence/screenshot-desktop.png` and `/tmp/bpc-evidence/screenshot-mobile.png`.
- Final live production check: `/manifest.json` and compatibility `/manifest.webmanifest` both return JSON MIME; `/not-a-real-route` returns HTTP 404 with the designed title; hashed JS returns `max-age=31536000, immutable`; CSP, frame, permissions, nosniff, and referrer headers are present.
- Final live cold browser check at `https://branching-problem-circle.sociobot.in/`: correct landing headline, one-click sample banner, sample h1, phase-arrow focus on Explore, and zero console errors. Live Axe at 390px: 0 violations / 0 serious or critical.
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

None known. Azure Static Web Apps deployed the final `dist/` successfully (deployment `3fdd5c36-e185-4719-a1d0-b5b0a0e3444d`) and the production-only headers, routing, cache policy, and manifest MIME were checked live. The final initial bundle is 10.65 kB gzip JavaScript and 5.76 kB gzip CSS.
