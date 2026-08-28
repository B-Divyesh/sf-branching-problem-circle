# Review 1 handoff — Branching Problem Circle

## Outcome

Adversarial first-read review 1 is complete. Verdict: **FAIL**.

The full report is in `.factory/review-1.md`. Product code was not modified. The review records 13 blocking findings and 23 additional findings, including the absent/unsafe demo, missing claims registry, dead checkout, broken routing, first-screen copy failure, structure/metadata gaps, and every unresolved defect from the previous handoff.

## Verification performed

- Opened the live site cold at 390×844 and 1440×900 and captured the visible first-screen copy.
- Opened `/demo`, checked for sample state/banner/reset/start controls, and proved a record saved there appears at `/` through the shared `branching-problem-circle` IndexedDB database.
- Read `.factory/brief.json`, `.factory/design.md`, the prior handoff, and `.factory/verification.md`; no earlier review or polish files exist.
- Audited every landing-page and README copy unit with word counts and proposed rewrites for every flag.
- Confirmed `.factory/claims.json` and `@claim:` tests are absent; inventoried all unlisted claim-like copy.
- Reproduced every previous defect live and in code: dead paid checkout, phase/dialog focus loss, undersized mobile targets, optional rights acknowledgement, raw import error, short asset cache, missing security headers, and manifest MIME.
- Audited `/`, `/demo`, `/privacy/`, `/terms/`, and an unknown route for titles, h1, metadata, header/footer, links, and 404 behavior.
- Confirmed live offline reload and same-origin requests during an ordinary create/save flow. The required demo privacy trace cannot pass because demo mode does not exist.
- Ran accessibility and basic live smoke checks; no axe, console, missing-alt, or unlabeled-button errors were found.

## Commands run

```sh
npm ci
npm test
npm run build
npm run test:e2e
/opt/fleet/lib/verify-url.sh https://branching-problem-circle.sociobot.in <temporary-evidence-directory>
```

Results: 3/3 unit tests passed, the production build completed and wrote `dist/`, 6/6 Playwright tests passed, the live basic verifier passed, and a live axe WCAG A/AA scan found zero violations. These do not satisfy the missing claims/demo contracts.

## Work remaining

Fix all findings in `.factory/review-1.md`, beginning with the plain first screen, isolated seeded demo, claims registry/tests, paid checkout, routing/404, and prior accessibility/data-contract regressions. Then deploy and repeat the full review from clean browser contexts. No product repair was authorized in this work order.
