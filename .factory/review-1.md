# Adversarial first-read review 1 — Branching Problem Circle

Reviewed 28 August 2026 against `https://branching-problem-circle.sociobot.in` and repository commit `7b37861c9ed063441aa937511c486d142bf41169`.

## Verdict: FAIL

There are 13 blocking findings and 23 additional findings. The first screen does not plainly identify the user, no safe sample demo exists, `.factory/claims.json` is absent, the paid checkout is dead, routing is broken, and every defect recorded in the prior handoff still reproduces. A passing automated suite does not compensate for these release-contract failures.

## Cold first screen

Fresh Chromium contexts were opened at 390×844 and 1440×900 with no saved site data. Before scrolling, my answers were:

- **What does it do?** Probably records several approaches to one problem, gathers anonymous votes, and reveals approaches later. I had to infer this from the paragraph because “thinking table” and “useful wrong turns” do not name a product or job.
- **For whom?** Unclear. “A thinking table for 6–8 curious minds” gives a group size but does not say volunteer math-circle leader, teacher, or facilitator.
- **What should I click first?** Probably “Shape a new problem,” but there is no safe sample action and “shape” does not name the resulting state.

The mobile first viewport showed the wordmark, Template shelf, eyebrow, headline, paragraph, both actions, and the three numbered facts. The desktop first viewport also showed the ceramic image. The ambiguity is copy, not clipping.

## Findings

### Blocking

#### F-1-1 — The first screen does not answer what, who, and first action plainly

- **Quote/location:** landing hero: “A thinking table for 6–8 curious minds”; “Let the useful wrong turns stay.”; “Shape a new problem.”
- **Why this fails:** the eyebrow is a metaphor and names children rather than the buyer/user. The headline is a mood line. The primary action offers an empty authoring form instead of a safe first experience. A cold visitor cannot answer all three mandatory questions from the first screen.
- **Concrete fix:** use `Compare several approaches to one math problem` as the h1; follow with `Volunteer math-circle leaders use one shared device to collect votes, compare approaches, and reveal hints.` Put `Try it with sample data` first, with `Opens a sample circle; nothing is saved.` beside it. Keep `Create a circle` as the real-data action.

#### F-1-2 — The required one-click demo is absent and `/demo` writes to real storage

- **Quote/location:** `/demo` renders the ordinary landing page and “Shape a new problem.” It has no “Demo — sample data, nothing is saved,” “Reset demo,” or “Start for real.” `.factory/demo.md` is also absent.
- **Evidence:** a clean `/demo` context showed the same h1 and empty-state actions as `/`. Saving `Demo namespace check` from `/demo` created IndexedDB `branching-problem-circle`; opening `/` in the same context loaded that title. Demo activity therefore uses the real `active` record.
- **Why this fails:** there is no sample to try, no visible sandbox state, no reset, and real data is not isolated. This directly violates the demo and privacy contract.
- **Concrete fix:** seed `/demo` with a realistic original problem, three approaches, several votes/rationales, a revealed hint, and a recap. Use a separate database or `demo:` namespace, show the persistent banner and both controls, make Reset deterministic, and discard demo state on exit. Document it in `.factory/demo.md` and test that root data is unchanged.

#### F-1-3 — No claims registry exists; every product claim is unlisted and untested

- **Quote/location:** `.factory/claims.json` does not exist; `rg '@claim:'` finds no tagged tests.
- **Why this fails:** zero listed claim tests can be run from the required clean demo. The existing unit and browser tests are not a claims registry and do not use claim tags. No claim is accepted as tested under the supplied contract.
- **Concrete fix:** add `.factory/claims.json`; give every entry exactly one `@claim:<id>` test that starts at `/demo` in clean storage. At minimum register all of these current claim-like statements (duplicates may share one entry only when `where` lists every location):

| Location | Exact unlisted claim |
| --- | --- |
| Landing meta | “A calm, local-first board for exploring branching math approaches together.” |
| Landing hero | “Hold one problem, collect anonymous ‘try this’ votes, and reveal competing paths when the room is ready.” |
| Landing hero | “No accounts, rankings, or rush.” |
| Landing fact | “Everything stays on this device.” |
| Landing fact | “Up to six approaches, including dead ends.” |
| Landing fact | “One-page printable recap.” |
| Landing footer | “Private by design · works offline.” |
| Landing template dialog | “Core circles are free. The optional pack adds reusable facilitation structures.” |
| Landing template dialog | “Start with an empty problem and add approaches as they emerge.” |
| Landing template dialog | “Seed visual, algebraic, and pattern-seeking approaches.” |
| Landing template dialog | “Preserve two tempting starts and one reframing move.” |
| Landing template dialog | “Organize experiments around invariants, parity, and bounds.” |
| Landing template dialog | “Move from examples through a conjecture to an explanation.” |
| Landing template dialog | “Four repeatable session shapes · US $12 one-time purchase.” |
| Landing template dialog | “Checkout and refunds are handled by Sociobot/Dodo.” |
| README | “Branching Problem Circle is a facilitator-led, offline-capable board for small math circles.” |
| README | “It keeps promising starts, failed approaches, anonymous ‘try this’ votes, hints, and solution paths together so a 45-minute discussion does not collapse into a single answer line.” |
| README | “It is designed for volunteer leaders working with roughly 6–8 curious children.” |
| README | “There are no child profiles, public rooms, rankings, test banks, or generated solutions.” |
| README | “The facilitator supplies a rights-cleared problem and shares one device for anonymous voting turns.” |
| README feature list | “Author one problem and up to six branching approaches.” |
| README feature list | “Keep opening moves, hints, and full facilitator notes separate.” |
| README feature list | “Collect anonymous votes plus a rationale or an alternative path.” |
| README feature list | “Reveal each hint and path deliberately during discussion.” |
| README feature list | “Print/save a compact one-page recap.” |
| README feature list | “Export and import all circle data as JSON.” |
| README feature list | “Work after refresh, install as a PWA, and reload offline.” |
| README feature list | “Optionally unlock four reusable facilitation templates with a US $12 one-time license.” |
| README feature list | “Core circles and exports remain free.” |
| README privacy | “All circle content is held locally in IndexedDB.” |
| README privacy | “Only optional license verification contacts the Sociobot billing API.” |
| README setup | “No environment variables or backend are required.” |
| README test/build | “npm run build is the exact production command.” |
| README test/build | “It type-checks the app and writes the static deploy to dist/, with dist/index.html at its root.” |
| README test/build | “Browser tests use Playwright 1.58.2 and cover the full workflow at desktop and 390px, axe accessibility checks, and offline reload.” |

Observed evidence is not a substitute for registration: live offline reload worked, and an ordinary create/save flow requested only the product origin. The required demo privacy trace could not be run because there is no sandbox.

#### F-1-4 — The advertised US $12 purchase is still unavailable

- **Quote/location:** Template shelf: “Four repeatable session shapes · US $12 one-time purchase” and “Buy the pack.”
- **Evidence:** `GET https://api.sociobot.in/api/v1/products/branching-problem-circle/checkout` returned HTTP 404 with `{"error":"enabled factory product","status":404}` on 28 August 2026.
- **Why this fails:** visitors are offered paid templates that cannot be bought. This repeats the prior handoff’s high-severity finding.
- **Concrete fix:** register and enable the product/return URL in the Sociobot billing API, exercise a real test checkout and refund, and add a claim test for price, unlock, restore, and free-core behavior. Remove the offer until checkout works.

#### F-1-5 — Unknown and demo routes are silently rewritten to the landing page

- **Quote/location:** `/not-a-real-route` returns HTTP 200 with title “Branching Problem Circle” and landing h1; `/demo` also returns the landing page. No 404 document or `staticwebapp.config.json` exists.
- **Why this fails:** broken URLs masquerade as valid pages, `/demo` is not a place, and the product has no designed recovery route. This is broken routing, which the review contract makes blocking.
- **Concrete fix:** implement `/demo`, a styled `/404`/`404.html`, correct 404 status/rewrite configuration, and route-specific rendering. Add `/demo` and the 404 route to the sitemap where appropriate, and crawl them in tests.

#### F-1-6 — Arrow-key phase navigation still loses focus

- **Quote/location:** session phase tabs in `src/main.ts`, `setPhase()` re-renders the app after the next tab is focused.
- **Evidence:** ArrowRight from focused Collect selected Explore, then `document.activeElement` became `BODY`.
- **Why this fails:** keyboard users lose their place and must restart navigation. This repeats the prior handoff finding.
- **Concrete fix:** after rendering, focus the newly selected tab without triggering another state change; add assertions for Left/Right/Home/End, selected state, and retained focus.

#### F-1-7 — Closing the template dialog still loses focus

- **Quote/location:** “Templates” / “Template shelf” dialog opener and Escape/close handlers.
- **Evidence:** after Escape, `document.activeElement` was `BODY`, not the opener.
- **Why this fails:** the modal does not restore the keyboard user’s context. This repeats the prior handoff finding.
- **Concrete fix:** store the opener before `showModal()`, restore it after every close path, and test Escape, close button, and successful template use.

#### F-1-8 — Mobile link targets remain below 44×44 px

- **Quote/location:** 390×844 landing: wordmark `164×35`, Privacy `49×15`, Terms `40×15`; in the app state the icon-only home target measured `24×24` and legal links remained `49×15`/`40×15`.
- **Why this fails:** the links miss the required touch-target baseline. This repeats the prior handoff finding.
- **Concrete fix:** give each link an independent minimum 44×44 hit area while preserving visible spacing; assert bounding boxes in the mobile test.

#### F-1-9 — The rights acknowledgement is still optional

- **Quote/location:** “I have permission to use this problem with my group.”
- **Evidence:** a problem saved with the checkbox clear and persisted `rightsConfirmed: false`.
- **Why this fails:** the control looks mandatory in context but has no effect, contradicting the brief’s rights-cleared-problem constraint. This repeats the prior handoff finding.
- **Concrete fix:** make the input required, provide a plain validation message, block persistence until checked, and add a test that reads the stored record.

#### F-1-10 — Invalid import still exposes a JSON parser diagnostic

- **Quote/location:** importing `{bad` shows `Expected property name or '}' in JSON at position 1 (line 1 column 2)`.
- **Why this fails:** it does not tell a facilitator what happened or what to do. This repeats the prior handoff finding.
- **Concrete fix:** show `This file is not a valid circle export. Choose a JSON file exported by Branching Problem Circle.` Keep the previous circle unchanged and test both the message and retained data.

#### F-1-11 — Hashed assets still receive 30-second cache headers

- **Quote/location:** live `assets/app-BczBAuvt.js`: `Cache-Control: public, must-revalidate, max-age=30`.
- **Why this fails:** hashed immutable assets lose their caching benefit. This repeats the prior handoff finding.
- **Concrete fix:** serve hashed JS/CSS/images with a long immutable policy; keep HTML and `sw.js` short-lived. Add header assertions to deployment verification.

#### F-1-12 — Response security headers remain incomplete

- **Quote/location:** live HTML response has no Content-Security-Policy, frame protection, or Permissions-Policy. The repository has no host configuration that defines them.
- **Why this fails:** browser hardening required by the site-structure contract is absent. This repeats the prior handoff finding.
- **Concrete fix:** add host response headers with a CSP matching actual self-hosted resources, `frame-ancestors` in the response CSP, and an explicit Permissions Policy; test the deployed headers and browser console.

#### F-1-13 — The web manifest still has the wrong MIME type

- **Quote/location:** `/manifest.webmanifest` returns `Content-Type: application/octet-stream`.
- **Why this fails:** it relies on browser tolerance rather than correct PWA delivery. This repeats the prior handoff finding.
- **Concrete fix:** configure `application/manifest+json` (or `application/json`) and assert it after deployment.

### Major

#### F-1-14 — Titles and social/search metadata do not meet the route contract

- **Quote/location:** `/` title is only “Branching Problem Circle”; `/demo` has the same title; legal titles use `Privacy · ...` and `Terms · ...`. Canonical, Open Graph, Twitter card, and apple-touch icon are absent everywhere. Legal pages also lack meta descriptions and any favicon. There is no 1200×630 product-art social image.
- **Why this fails:** tabs do not explain the job, routes are not distinguishable as specified, and shared/search results lack required identity and descriptions.
- **Concrete fix:** use `Branching Problem Circle — Compare Math Approaches` on `/`, `Demo — Branching Problem Circle`, `Privacy — Branching Problem Circle`, and `Terms — Branching Problem Circle`; add route-specific descriptions, canonicals, OG/Twitter metadata, a product-art 1200×630 image, SVG favicon, and 180px apple-touch icon.

#### F-1-15 — Browser history and route-change focus are not implemented

- **Quote/location:** creating a circle and changing Shape/Collect/Explore/Recap keep the same URL; there is no `pushState` or `popstate` code. Phase re-renders do not focus the new h1 or announce navigation as a route change.
- **Why this fails:** session places cannot be deep-linked, browser Back does not return through them, and focus is lost during keyboard phase changes.
- **Concrete fix:** give stable URLs to meaningful app states, use History API navigation, restore state/scroll on Back/Forward, focus the new h1, and announce the route in a polite live region. Test direct reload and Back/Forward.

#### F-1-16 — The landing page omits the standard product skeleton

- **Quote/location:** after the hero, the page ends at the footer. It has no live product preview, “How it works” section, explicit limits/privacy section, or visible paid-tier section. The US $12 tier is hidden in “Template shelf.”
- **Why this fails:** visitors cannot inspect the workflow or limits before committing, and the price is not in the required information order.
- **Concrete fix:** after the first screen, show the populated demo UI; add three verb-led steps; state no public sharing, child accounts, or generated solutions; show the exact optional template price and what remains free.

#### F-1-17 — Header and footer are inconsistent and incomplete across routes

- **Quote/location:** landing header has wordmark + Template shelf; legal headers have only the wordmark. Landing footer differs from legal footers. None includes “Built by Param Factory” or a version/build id, and there is no Demo navigation link.
- **Why this fails:** visitors lose the same navigation and provenance on legal routes.
- **Concrete fix:** use one header/footer component or identical markup on every route: wordmark, Demo, main section, Privacy, product one-liner, Privacy, Terms, Param Factory credit, and build id.

### Minor — copy and terminology

Each flagged line below is a separate finding and rewrite.

#### F-1-18 — “A thinking table for 6–8 curious minds” is metaphorical and does not name the user

- **Location:** landing eyebrow, 7 words.
- **Concrete fix:** `For volunteer leaders of small math circles` (8 words).

#### F-1-19 — “Let the useful wrong turns stay.” is a mood headline

- **Location:** landing h1, 6 words.
- **Concrete fix:** `Compare several approaches to one math problem` (7 words).

#### F-1-20 — The hero explanation mixes metaphor with inconsistent terms

- **Quote/location:** “Hold one problem, collect anonymous ‘try this’ votes, and reveal competing paths when the room is ready.” (17 words).
- **Why this fails:** “paths” conflicts with “approaches,” and “when the room is ready” is mood copy.
- **Concrete fix:** `Collect anonymous votes on several approaches, then reveal hints during the discussion.` (11 words).

#### F-1-21 — “No accounts, rankings, or rush” ends in a slogan rather than a feature

- **Location:** landing hero, 5 words.
- **Concrete fix:** `No child accounts or rankings.` (5 words).

#### F-1-22 — “Template shelf” is a noun label and brand metaphor, not a result-naming action

- **Location:** landing header button, 2 words.
- **Concrete fix:** `Browse templates` (2 words).

#### F-1-23 — “Shape a new problem” uses the ceramic metaphor for the main action

- **Location:** landing primary button, 4 words.
- **Concrete fix:** after adding the demo action, use `Create a circle` (3 words) for real use.

#### F-1-24 — “Everything stays on this device” is overbroad

- **Location:** landing fact, 5 words.
- **Why this fails:** license verification sends a token off-device, so “everything” is not literally true.
- **Concrete fix:** `Circle data stays in this browser.` (6 words).

#### F-1-25 — The image caption is a slogan

- **Quote/location:** “One problem. More than one honest way in.” (8 words across two sentences).
- **Concrete fix:** delete it, or use `The illustration shows one problem branching into three approaches.` (9 words).

#### F-1-26 — “Private by design” is vague marketing copy

- **Location:** landing footer: “Private by design · works offline” (6 words).
- **Concrete fix:** `Circle data stays in this browser · reloads offline after your first visit.` (12 words), backed by claim tests.

#### F-1-27 — The README opening uses jargon

- **Quote/location:** “Branching Problem Circle is a facilitator-led, offline-capable board for small math circles.” (12 words).
- **Concrete fix:** `Branching Problem Circle helps volunteer math-circle leaders compare several approaches to one problem.` (13 words).

#### F-1-28 — One README sentence exceeds 22 words and uses a metaphor

- **Quote/location:** README opening: “It keeps promising starts, failed approaches, anonymous ‘try this’ votes, hints, and solution paths together so a 45-minute discussion does not collapse into a single answer line.” (27 words).
- **Concrete fix:** `Keep starts, failed approaches, votes, hints, and solutions in one circle. Use them to lead a 45-minute discussion without reducing it to one answer.` (24 words across two sentences; 11 and 13).

#### F-1-29 — README feature wording uses slashes and unexplained implementation terms

- **Quotes/location:** “Print/save a compact one-page recap”; “install as a PWA”; “held locally in IndexedDB”; “contacts the Sociobot billing API.”
- **Concrete fix:** use `Print or save a one-page recap`; `Install it as an app and reload it offline after your first visit`; `Circle data stays in your browser`; and `Only license checks contact Sociobot’s payment service.` Keep PWA/IndexedDB details in the developer section if needed.

#### F-1-30 — The same concepts have too many names

- **Quote/location:** landing, README, and app copy call the product/session a “thinking table,” “board,” “circle,” and “discussion”; an option is an “approach,” “branch,” “path,” “tile,” “start,” or “direction.”
- **Why this fails:** a first-time visitor must infer whether these words identify distinct objects.
- **Concrete fix:** use this terminology everywhere: `circle` = saved session; `problem` = prompt; `approach` = one proposed method; `vote` = anonymous choice; `hint` = facilitator reveal; `recap` = printable/exported summary. Reserve “branch” for the product name or code only.

#### F-1-31 — “Facilitator shelf” continues the decorative shelf metaphor

- **Location:** landing template-dialog eyebrow, 2 words.
- **Concrete fix:** `Templates` (1 word).

#### F-1-32 — “Begin with a useful shape” is a mood heading

- **Location:** landing template-dialog h2, 5 words.
- **Concrete fix:** `Choose a session template` (4 words).

#### F-1-33 — “Reusable facilitation structures” is abstract jargon

- **Quote/location:** template dialog: “The optional pack adds reusable facilitation structures.” (7 words).
- **Concrete fix:** `The paid pack adds four reusable session templates.` (8 words).

#### F-1-34 — “Blank thinking table” is an unclear template name

- **Location:** free template heading, 3 words.
- **Concrete fix:** `Blank circle` (2 words).

#### F-1-35 — “Productive dead ends” is a metaphorical template heading

- **Location:** paid template heading, 3 words.
- **Concrete fix:** `Compare failed approaches` (3 words).

#### F-1-36 — “Session shapes” repeats the product metaphor

- **Quote/location:** purchase panel: “Four repeatable session shapes · US $12 one-time purchase.” (10 words).
- **Concrete fix:** `Four reusable session templates · US $12 once.` (8 words).

## Complete landing-page copy audit

Word counts treat whitespace-separated tokens as words. The average is 6.2 words across 17 copy units; the issue is clarity, not average length.

| # | Words | Exact copy | Result |
| --- | ---: | --- | --- |
| L1 | 4 | Skip to the circle | Pass |
| L2 | 3 | Branching Problem Circle | Pass as wordmark |
| L3 | 2 | Template shelf | F-1-22 |
| L4 | 7 | A thinking table for 6–8 curious minds | F-1-18 |
| L5 | 6 | Let the useful wrong turns stay. | F-1-19 |
| L6 | 17 | Hold one problem, collect anonymous “try this” votes, and reveal competing paths when the room is ready. | F-1-20; unlisted claim F-1-3 |
| L7 | 5 | No accounts, rankings, or rush. | F-1-21; unlisted claim F-1-3 |
| L8 | 4 | Shape a new problem | F-1-23 |
| L9 | 3 | Import a circle | Pass |
| L10 | 5 | Everything stays on this device | F-1-24; unlisted claim F-1-3 |
| L11 | 7 | Up to six approaches, including dead ends | Unlisted claim F-1-3 |
| L12 | 3 | One-page printable recap | Unlisted claim F-1-3 |
| L13 | 17 | Blank handmade ceramic tiles branch three ways around a central tile, with six river stones marking choices. | Pass as useful image alt |
| L14 | 2 | One problem. | F-1-25 |
| L15 | 6 | More than one honest way in. | F-1-25 |
| L16 | 6 | Private by design · works offline | F-1-26; unlisted claim F-1-3 |
| L17 | 8 | Privacy · Terms · Original AI-generated ceramic artwork | Pass; provenance is useful |

### Landing template-dialog copy

Opening Template shelf from the landing page adds these 32 copy units. The average is 3.8 words; the issues are metaphor, jargon, and unlisted claims.

| # | Words | Exact copy | Result |
| --- | ---: | --- | --- |
| D1 | 2 | Facilitator shelf | F-1-31 |
| D2 | 5 | Begin with a useful shape. | F-1-32 |
| D3 | 4 | Core circles are free. | Unlisted claim F-1-3 |
| D4 | 7 | The optional pack adds reusable facilitation structures. | F-1-33; unlisted claim F-1-3 |
| D5 | 1 | Included | Pass |
| D6 | 3 | Blank thinking table | F-1-34 |
| D7 | 11 | Start with an empty problem and add approaches as they emerge. | Unlisted claim F-1-3 |
| D8 | 2 | Use template | Pass |
| D9 | 1 | Pack | Pass |
| D10 | 3 | Compare three lenses | Pass |
| D11 | 6 | Seed visual, algebraic, and pattern-seeking approaches. | Unlisted claim F-1-3 |
| D12 | 2 | Use template | Pass |
| D13 | 1 | Pack | Pass |
| D14 | 3 | Productive dead ends | F-1-35 |
| D15 | 8 | Preserve two tempting starts and one reframing move. | Unlisted claim F-1-3 |
| D16 | 2 | Use template | Pass |
| D17 | 1 | Pack | Pass |
| D18 | 3 | What cannot change? | Pass as a specific math-template name |
| D19 | 7 | Organize experiments around invariants, parity, and bounds. | Unlisted claim F-1-3 |
| D20 | 2 | Use template | Pass |
| D21 | 1 | Pack | Pass |
| D22 | 4 | From hunch to proof | Pass as a specific template name |
| D23 | 9 | Move from examples through a conjecture to an explanation. | Unlisted claim F-1-3 |
| D24 | 2 | Use template | Pass |
| D25 | 3 | Facilitator template pack | Pass |
| D26 | 10 | Four repeatable session shapes · US $12 one-time purchase. | F-1-36; unlisted claim F-1-3; live failure F-1-4 |
| D27 | 7 | Checkout and refunds are handled by Sociobot/Dodo. | Unlisted claim F-1-3; checkout failure F-1-4 |
| D28 | 3 | Buy the pack | Pass |
| D29 | 3 | Have a license? | Pass |
| D30 | 3 | Paste it here | Pass |
| D31 | 2 | Restore purchase | Pass |
| D32 | 2 | Privacy · Terms | Pass |

## Complete README copy audit

The average is 8.3 words across 39 copy units. One sentence exceeds 22 words. Developer-section technical terms are acceptable where they are commands or filenames; visitor-facing implementation jargon is flagged.

| # | Words | Exact copy | Result |
| --- | ---: | --- | --- |
| R1 | 3 | Branching Problem Circle | Pass as document title |
| R2 | 12 | Branching Problem Circle is a facilitator-led, offline-capable board for small math circles. | F-1-27; unlisted claim F-1-3 |
| R3 | 27 | It keeps promising starts, failed approaches, anonymous “try this” votes, hints, and solution paths together so a 45-minute discussion does not collapse into a single answer line. | F-1-28; unlisted claim F-1-3 |
| R4 | 12 | It is designed for volunteer leaders working with roughly 6–8 curious children. | Unlisted claim F-1-3 |
| R5 | 13 | There are no child profiles, public rooms, rankings, test banks, or generated solutions. | Unlisted claim F-1-3 |
| R6 | 14 | The facilitator supplies a rights-cleared problem and shares one device for anonymous voting turns. | Unlisted claim F-1-3 |
| R7 | 2 | Live: https://branching-problem-circle.sociobot.in | Pass |
| R8 | 3 | What v1 includes | Pass |
| R9 | 9 | Author one problem and up to six branching approaches. | Unlisted claim F-1-3 |
| R10 | 9 | Keep opening moves, hints, and full facilitator notes separate. | Unlisted claim F-1-3 |
| R11 | 10 | Collect anonymous votes plus a rationale or an alternative path. | Unlisted claim F-1-3 |
| R12 | 8 | Reveal each hint and path deliberately during discussion. | Unlisted claim F-1-3 |
| R13 | 5 | Print/save a compact one-page recap. | F-1-29; unlisted claim F-1-3 |
| R14 | 8 | Export and import all circle data as JSON. | Unlisted claim F-1-3 |
| R15 | 10 | Work after refresh, install as a PWA, and reload offline. | F-1-29; unlisted claim F-1-3 |
| R16 | 12 | Optionally unlock four reusable facilitation templates with a US $12 one-time license. | Unlisted claim F-1-3; live failure F-1-4 |
| R17 | 6 | Core circles and exports remain free. | Unlisted claim F-1-3 |
| R18 | 8 | All circle content is held locally in IndexedDB. | F-1-29; unlisted claim F-1-3 |
| R19 | 9 | Only optional license verification contacts the Sociobot billing API. | F-1-29; unlisted claim F-1-3 |
| R20 | 4 | See /privacy and /terms. | Pass |
| R21 | 1 | Develop | Pass |
| R22 | 5 | Requires Node.js 20 or newer. | Pass as setup requirement |
| R23 | 7 | The development server prints its local URL. | Pass |
| R24 | 7 | No environment variables or backend are required. | Unlisted setup claim F-1-3 |
| R25 | 3 | Test and build | Pass |
| R26 | 8 | npm run build is the exact production command. | Unlisted build claim F-1-3 |
| R27 | 16 | It type-checks the app and writes the static deploy to dist/, with dist/index.html at its root. | Unlisted build claim F-1-3 |
| R28 | 20 | Browser tests use Playwright 1.58.2 and cover the full workflow at desktop and 390px, axe accessibility checks, and offline reload. | Unlisted test-coverage claim F-1-3 |
| R29 | 6 | To inspect the production build manually: | Pass |
| R30 | 1 | Deploy | Pass |
| R31 | 9 | Deploy the contents of dist/ to a static host. | Pass as instruction |
| R32 | 8 | HTTPS is required for service workers outside localhost. | Pass as platform requirement |
| R33 | 16 | The factory owns deployment and billing product registration; this repository does not contain infrastructure or secrets. | Pass as scope statement |
| R34 | 12 | The original generated ceramic hero source and prompt provenance live in assets/src/. | Pass; verified repository fact |
| R35 | 11 | The optimized WebP/JPEG files and authored PWA icons live in public/. | Pass; verified repository fact |
| R36 | 7 | The complete visual rationale is in .factory/design.md. | Pass; verified repository fact |
| R37 | 1 | License | Pass |
| R38 | 1 | MIT. | Pass |
| R39 | 2 | See LICENSE. | Pass |

## Earlier-finding verification

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files. The prior `.factory/handoff.md` and `.factory/verification.md` were read in full. Each recorded defect was checked live and in code, not accepted from its status label.

| Earlier defect | Current result | Finding |
| --- | --- | --- |
| Checkout returns 404 | Reproduced live; unchanged checkout URL in code | F-1-4, blocking |
| Phase arrows lose focus | Reproduced live; render replaces focused element | F-1-6, blocking |
| Dialog does not restore opener focus | Reproduced live; no opener storage in code | F-1-7, blocking |
| Mobile targets under 44×44 | Reproduced at 390px | F-1-8, blocking |
| Rights acknowledgement not enforced | Reproduced; unchecked record saved | F-1-9, blocking |
| Raw parser diagnostic on import | Reproduced with `{bad` | F-1-10, blocking |
| Hashed assets use `max-age=30` | Reproduced from live headers | F-1-11, blocking |
| CSP/frame/permissions policy absent | Reproduced from live headers and repo | F-1-12, blocking |
| Manifest served as octet-stream | Reproduced from live headers | F-1-13, blocking |

The handoff’s WebP-without-AVIF note remains accurate and is not itself a release defect. Its local-storage and browser-support caveats are disclosed. They do not resolve the missing demo isolation.

## Structure, links, accessibility, and visual identity

- `/`, `/privacy/`, `/terms/`, `robots.txt`, `sitemap.xml`, the manifest, and all ordinary internal links returned 200. The paid checkout is the dead link in F-1-4. `mailto:` links were treated as explicit external actions.
- Each inspected page had `lang="en"`, one h1, and a main landmark. The live verifier found no missing image alt, unlabeled button, console error, or page error.
- Live axe WCAG A/AA scan at 390px returned zero violations. This does not cover the manual focus and touch-target failures.
- Reduced motion and initial JavaScript size remain covered by the existing suite/build. App JS is 27.79 KB raw and 9.67 KB gzip, below the budget.
- The glacial ceramic palette, irregular tiles, typography, original artwork, and motion policy are documented in `.factory/design.md` and visibly product-specific. This does not look like a generic gradient SaaS template.

## Sandbox, offline, and privacy evidence

- Live service-worker reload succeeded after `context.setOffline(true)`.
- The normal create/save flow made requests only to `https://branching-problem-circle.sociobot.in`; no analytics, remote fonts, or third-party scripts appeared.
- A demo privacy trace cannot pass: `/demo` has no demo state and uses the production IndexedDB namespace. F-1-2 remains decisive.
- The license path is explicitly cross-origin by design, but the broad landing phrase “Everything stays on this device” fails to disclose that exception.

## Missed leverage

No additional AI feature is warranted. The brief calls for facilitator-supplied, rights-cleared problems and explicitly excludes generated solutions; adding AI would weaken the product. JSON import/export and printable recap already exist, and cloud sync would conflict with the local-first privacy model. The obvious missing leverage is the populated, isolated sample workflow already captured in F-1-2.

## Verification run

| Check | Result |
| --- | --- |
| Clean baseline | PASS: worktree clean; `HEAD` and `origin/main` both `7b37861c9ed063441aa937511c486d142bf41169` |
| `npm ci` | PASS; 98 packages; 0 vulnerabilities |
| Claims file/tests | **BLOCKING:** `.factory/claims.json` absent; zero `@claim:` tests |
| `npm test` | PASS; 3/3 |
| `npm run build` | PASS; `dist/` produced |
| `npm run test:e2e` | PASS; 6/6 desktop/mobile tests |
| Live `verify-url.sh` | PASS basic smoke; HTTP 200, one h1/main, no console errors |
| Live axe WCAG A/AA | PASS; zero violations |
| Live offline reload | PASS |
| Live normal-flow request log | PASS for observed flow; same-origin only |
| Demo isolation | **FAIL:** same IndexedDB record appears at `/demo` and `/` |
| Paid checkout | **FAIL:** HTTP 404 |
| Unknown-route behavior | **FAIL:** landing page returned with HTTP 200 |

## What would make this perfect

Resolve every finding above, then rerun this entire checklist from fresh 390px and desktop contexts. Perfection here means a plain first screen, an immediate realistic demo in a provably separate namespace, every claim registered and passing, working checkout, real routing/404/history/focus, correct metadata and headers, consistent site skeleton, plain terminology, and zero regressed handoff defects. Anything less remains a FAIL.
