# Review 2 handoff — Branching Problem Circle

## Outcome

Performed the requested adversarial first-read review without changing product code. Wrote `.factory/review-2.md`.

Verdict: **FAIL** with six remaining findings:

1. Unlisted one-shared-device landing/README claim.
2. README JSON-import promise is not registered or tested.
3. Printable one-page recap is not proved by the existing claim test.
4. **Repeated F-1-29:** README leaks `IndexedDB` implementation jargon to facilitators.
5. **Repeated F-1-14:** Legal/404 routes lack complete social metadata.
6. **Repeated F-1-17:** 404 header omits the normal `How it works` navigation link.

## Verification

- Fresh live browser checks at 390×844 and 1440×900: first screen is clear; no console/page errors.
- Demo opens populated sample data in one click. Demo uses only `branching-problem-circle-demo`, reset works, and Start for real returns to the normal landing screen without copying data.
- Demo and landing request logs were same-origin only. A fresh `/demo` visit reloaded offline successfully.
- Fresh clone `/tmp/bpc-review-vN3u1R`: `npm ci`, `npm test` (5 passing), and `npm run build` passed. Every listed claim command passed in both Playwright projects; the full suite passed 24/24 in the original review worktree.
- Live crawl checked landing, demo, legal, 404, manifest, sitemap, robots, icons, and assets; ordinary routes were healthy and unknown routes returned designed HTTP 404.

## Handoff

No product-code files were modified. Commit the two review documentation files after inspecting the findings.
