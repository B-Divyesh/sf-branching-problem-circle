# Review 3 handoff — Branching Problem Circle

## Outcome

FAIL. This review changed no product code. The report is in `.factory/review-3.md` and is committed with this handoff.

## Verification performed

- Cold live checks at 390×844 and 1440×900.
- Live demo, reset, IndexedDB isolation, request-log, offline, link, route, metadata, accessibility, and security-header checks.
- Fresh clone `/tmp/bpc-review-3-clean-dAby7Q`: `npm ci`, `npm test` (6/6), every command in `.factory/claims.json`, `npm run build`, and `npm run test:e2e` (38/38) passed.

## Known gaps / next steps

1. **Blocking F-1-2:** Start for real does not discard altered demo data. Close a sample hint, exit, and reopen `/demo` to reproduce. Clear the demo namespace on exit (or explicitly offer a one-time transfer), and add a re-entry assertion to `@claim:demo-isolation`.
2. **F-3-1:** Rewrite or register the README outcome promise that cannot be observed in a test.
3. **F-3-2:** Replace remaining functional ceramic-metaphor headings with plain section/action labels.
