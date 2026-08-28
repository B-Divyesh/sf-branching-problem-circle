# Review 4 handoff — Branching Problem Circle

## Outcome

Review 4 is **FAIL**. No product source was modified. The review and this handoff are the only intended repository changes.

## Finding

- `F-4-1`: importing a circle updates the displayed app state before its IndexedDB save is durable. An immediate reload can restore the old circle. The live acceptance check failed at `scripts/verify-live.mjs:176`, and an immediate-reload stress check also reproduced losses.

The fix is to await the import save before rendering/announcing completion, keep the confirmation disabled while saving, preserve the old circle on error, and add an immediate-reload assertion to `@claim:json-import`.

## Verification performed

- Fresh live browser contexts at 390×844 and 1440×900: clear first screen, no overflow, no console errors.
- Live demo: realistic sample, persistent sandbox banner, reset, exit disposal, separate IndexedDB database, same-origin request log, and offline reload verified.
- Clean clone `/tmp/bpc-review4-salNpN/repo`: `npm ci`, `npm test` (9/9), `npm run build` (produced `dist/`), all ten individually filtered claim commands (20 desktop/mobile executions), and `npm run test:e2e` (42/42) passed.
- Live routing, response headers, metadata, accessibility, link crawl, 404 behavior, prior-review regressions, and visual identity checked.
- `LIVE_BASE_URL=https://branching-problem-circle.sociobot.in npm run test:live` failed only at the immediate import/reload persistence assertion described above.

## Next step

Repair F-4-1, then rerun the clean-clone claim commands, full Playwright suite, build, and the live acceptance command. Do not mark the review passed until the live immediate-reload check succeeds.
