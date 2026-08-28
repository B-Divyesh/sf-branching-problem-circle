# Branching Problem Circle

Branching Problem Circle is a facilitator-led, offline-capable board for small math circles. It keeps promising starts, failed approaches, anonymous “try this” votes, hints, and solution paths together so a 45-minute discussion does not collapse into a single answer line.

It is designed for volunteer leaders working with roughly 6–8 curious children. There are no child profiles, public rooms, rankings, test banks, or generated solutions. The facilitator supplies a rights-cleared problem and shares one device for anonymous voting turns.

Live: <https://branching-problem-circle.sociobot.in>

## What v1 includes

- Author one problem and up to six branching approaches.
- Keep opening moves, hints, and full facilitator notes separate.
- Collect anonymous votes plus a rationale or an alternative path.
- Reveal each hint and path deliberately during discussion.
- Print/save a compact one-page recap.
- Export and import all circle data as JSON.
- Work after refresh, install as a PWA, and reload offline.
- Optionally unlock four reusable facilitation templates with a US $12 one-time license. Core circles and exports remain free.

All circle content is held locally in IndexedDB. Only optional license verification contacts the Sociobot billing API. See [`/privacy`](https://branching-problem-circle.sociobot.in/privacy/) and [`/terms`](https://branching-problem-circle.sociobot.in/terms/).

## Develop

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

The development server prints its local URL. No environment variables or backend are required.

## Test and build

```sh
npm test
npm run build
npm run test:e2e
```

`npm run build` is the exact production command. It type-checks the app and writes the static deploy to `dist/`, with `dist/index.html` at its root. Browser tests use Playwright 1.58.2 and cover the full workflow at desktop and 390px, axe accessibility checks, and offline reload.

To inspect the production build manually:

```sh
npm run preview
```

## Deploy

Deploy the contents of `dist/` to a static host. HTTPS is required for service workers outside localhost. The factory owns deployment and billing product registration; this repository does not contain infrastructure or secrets.

The original generated ceramic hero source and prompt provenance live in `assets/src/`. The optimized WebP/JPEG files and authored PWA icons live in `public/`. The complete visual rationale is in [`.factory/design.md`](.factory/design.md).

## License

MIT. See [LICENSE](LICENSE).
