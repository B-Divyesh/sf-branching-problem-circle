# Branching Problem Circle

Branching Problem Circle helps volunteer math-circle leaders compare several approaches to one problem.

Keep starts, failed approaches, votes, hints, and solutions in one circle. Keep up to six approaches visible during one discussion.

It is made for a leader sharing one device with a small group. There are no child accounts, public rooms, rankings, test banks, or generated solutions. Use only problems you have permission to share.

Try the isolated sample at <https://branching-problem-circle.sociobot.in/demo>.

## What it does

- Create one problem with up to six approaches.
- Collect anonymous votes, written reasons, and alternative ideas.
- Reveal a hint or facilitator note when you choose.
- Print or save a one-page recap.
- Export and import circle data as JSON.
- Reload offline after the first visit.
- Keep circle data in your browser.

Starter templates are included. Circle authoring, voting, printing, and export are free.

See the [privacy notice](https://branching-problem-circle.sociobot.in/privacy/) and [terms](https://branching-problem-circle.sociobot.in/terms/).

## Demo

`/?demo=1` and `/demo` load an original hexagon problem with three approaches, six anonymous votes, a revealed hint, and a recap. The sample is stored separately from your real circles. **Reset demo** restores that sample. **Start for real** discards demo changes before returning to your circles.

## Develop

Requires Node.js 20 or newer.

```sh
npm ci
npm run dev
```

No environment variables or backend are required.

## Test and build

```sh
npm test
npm run build
npm run test:e2e
```

`npm run build` type-checks the app and writes the static deploy to `dist/`, with `dist/index.html` at its root. Browser tests use Playwright 1.58.2. They cover the demo, claims, accessibility, keyboard focus, mobile targets, import recovery, privacy, and offline reload.

## Deploy

Deploy `dist/` to the configured static host. HTTPS is required for service workers outside localhost. `public/staticwebapp.config.json` supplies routing, response headers, cache rules, and the 404 rewrite.

The original ceramic illustration and its provenance live in `assets/src/`. The visual rationale is in [`.factory/design.md`](.factory/design.md).

## License

MIT. See [LICENSE](LICENSE).
