# Polish round 2 handoff — Branching Problem Circle

## Outcome

PASS. All 36 findings from review 1 and all three findings from review 2 are closed. The glacial ceramic visual system and static offline-PWA deployment class are unchanged.

The repair adds registered proof for the one-device and JSON-import claims, an actual one-page PDF check, complete route metadata and navigation, plain README demo copy, stronger phase routing, and broader accessibility coverage. A serious ARIA issue found during the final live audit was also fixed before handoff.

Live site: <https://branching-problem-circle.sociobot.in>

## Verification

- Clean clone `/tmp/bpc-polish2-release-E37BYD`: `npm ci` completed with zero vulnerabilities.
- `npm test`: 6/6 unit and deployment-contract tests passed.
- Every command in `.factory/claims.json`: ten claims, each passed in desktop and 390px projects.
- `npm run test:e2e`: 38/38 passed after the claim runs.
- `npm run build`: produced `dist/index.html`; JS 10.77 KB gzip and CSS 5.76 KB gzip.
- Accessibility: axe ran on landing, recap, privacy, terms, 404, and offline views with zero serious/critical violations. The supplied live verifier found one h1, `lang=en`, a main landmark, complete alt text, labeled buttons, and zero console errors.
- Privacy: demo workflow emitted only same-origin requests. The live demo record existed only in `branching-problem-circle-demo`; the real namespace had no active record.
- Offline: a fresh live demo loaded once, switched offline, and reloaded with the sample intact.
- Routing: live demo/phase routes, History Back focus, route titles/canonicals, legal pages, and header/footer parity passed. An unknown live URL returned the styled page with HTTP 404.
- Print/import: Chromium produced one A4 page containing the sample recap. A downloaded demo export replaced a named real circle after confirmation, persisted, and routed to `/circle/explore`.
- PWA/security: manifest returned JSON MIME; CSP, frame denial, permissions, referrer, and nosniff headers were present; hashed assets were immutable.
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.3 s, CLS 0, TBT 0 ms.
- Live deployment: Azure Static Web Apps deployment `da1f2e59-f330-490f-9c6b-76a032e97992`; custom domain returned HTTP 200.

Evidence screenshots are in `.factory/evidence/`. The full finding-by-finding map is `.factory/polish-2.md`.

## Run it

```sh
npm ci
npm test
npm run build
npm run test:e2e
```

Run any claim exactly as listed in `.factory/claims.json`.

## Known gaps and next steps

None. No paid or AI feature is included: the broken paid offer was removed in round 1, and generated solutions conflict with the brief’s facilitator-supplied, rights-cleared problem model.
