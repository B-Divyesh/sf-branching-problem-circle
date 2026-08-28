# Branching Problem Circle — build handoff

## Independent verification — FAIL (2026-08-28)

Candidate `c7a44266186f3fdbb3486c9f0248f90dd2fee972` was independently tested from a clean checkout and against `https://branching-problem-circle.sociobot.in`. The live deployment is present and all 18 production files byte-match the fresh candidate build, so the earlier general deployment concern is resolved.

Release acceptance is **FAIL**:

- **High:** the advertised US $12 template-pack checkout returns HTTP `404` with `{"error":"enabled factory product","status":404}`; paid templates cannot be purchased.
- **Medium:** ArrowRight from the focused Collect tab activates Explore but drops focus to `BODY`; closing the template dialog also fails to return focus to its opener.
- **Medium:** at 390 px, the wordmark is `164×35` and the Privacy/Terms links are `49×15` and `40×15`, below the required 44×44 targets.
- **Medium:** a problem saves and persists with `rightsConfirmed: false`; the rights acknowledgement is not required.
- **Low:** malformed-import copy exposes a JSON parser diagnostic; hashed assets receive only `max-age=30`; CSP/frame/permissions policies are absent; the web manifest is served as `application/octet-stream`.

Fresh gates: `npm ci` PASS, `npm test` 3/3 PASS, `npm run build` PASS, `npm run test:e2e` 6/6 PASS, audit 0 vulnerabilities, axe serious/critical 0, console/page errors 0. Lighthouse mobile: performance 99, accessibility 100, best practices 100, SEO 100; FCP 1.0 s, LCP 1.3 s, TBT 110 ms, CLS 0. Offline reload, persisted data, precached legal page, installability, and a controlled service-worker update all passed. Full evidence and reproduction steps are in `.factory/verification.md`.

## Shipped

Finished v1 of the local-first facilitator tool described in `.factory/brief.json`:

- One editable, rights-acknowledged problem with up to six approach tiles.
- Separate participant-facing collection phase for anonymous votes, written rationales, and alternative paths.
- Facilitator-controlled hint and full-path reveals, vote totals, and preserved written thinking.
- Compact screen recap plus an A4 one-page print/save-PDF treatment; JSON export/import keeps full-fidelity data in the facilitator’s hands.
- IndexedDB persistence, online/offline state, install prompt, manifest (192/512/maskable icons), versioned service-worker caching, offline fallback, and update notice.
- Responsive 390px treatment, keyboard tab/arrow navigation, visible focus, semantic landmarks/forms, reduced-motion fallback, and non-color state labels.
- Welcome, empty, loading, storage error, invalid import, offline, and destructive confirmation states.
- `/privacy/` and `/terms/` pages.
- Optional US $12 one-time facilitator template pack using the Sociobot checkout/verify contract. License return capture, daily cached verification, offline optimistic unlock, revoked/invalid state, and paste-to-restore are included. Core circles, accessibility, voting, and exports are never gated.
- Original glacial-ceramic hero generated for this product, manually reviewed for unwanted text/symbols/brands and visual consistency, then shipped as responsive 34 KB/100 KB WebP plus a 185 KB JPEG fallback. Full prompt provenance is in `.factory/design.md` and `assets/src/`.

## Run and verify

```sh
npm install
npm test
npm run build
npm run test:e2e
npm run preview
```

The required build command is exactly `npm run build`. It type-checks and writes `dist/`; `dist/index.html` is at the deploy root.

Verification completed 2026-08-28:

- `npm test`: 3/3 unit tests passed.
- `npm run test:e2e`: 6/6 Playwright tests passed across desktop Chromium and a 390×844 Chromium touch viewport. This covers a complete author → vote → reveal → recap session, an axe WCAG 2 A/AA scan, and explicit `context.setOffline(true)` reload.
- `/opt/fleet/lib/verify-url.sh`: HTTP 200, title present, `lang="en"`, exactly one `h1`, main landmark present, zero missing image alts, zero unlabeled buttons, and zero page/console errors. Observed local load: 623 ms.
- Lighthouse 12.8.2, mobile defaults against the production build: performance **100**, accessibility **100**, best practices **100**, SEO **100**; FCP **0.9 s**, LCP **1.5 s**, TBT **0 ms**, CLS **0**, interactive **1.5 s**.
- Production payload: initial app JavaScript **27.8 KB** (9.7 KB gzip), CSS **19.6 KB** (5.4 KB gzip), mobile hero WebP **33.8 KB**. All are below the 200/50/300 KB budgets.
- `npm audit --audit-level=high`: zero vulnerabilities.

## Product/privacy notes

Circle content never leaves IndexedDB. The only runtime third-party request is an explicit or background license verification to `api.sociobot.in`; checkout opens the hosted Sociobot/Dodo flow. There are no analytics, CDN scripts, remote fonts, child accounts, public sharing, or AI solution calls.

Votes are intentionally collected on the facilitator’s shared device. The internal room code is not exposed as a join code because v1 has no network room and should not imply public sharing.

## Known gaps and factory next steps

- The factory still needs to register the paid product/return URL and exercise a live test checkout before release. The app uses the contract slug, not a hardcoded product ID.
- The worker image lacked an AVIF encoder. The required optimized WebP is present (34 KB mobile), with a JPEG fallback; this has no material budget impact.
- Local browser storage can be cleared by browser/OS policy. The UI explains this and provides JSON export; there is intentionally no cloud sync.
- Install availability depends on browser PWA support and HTTPS in production.
