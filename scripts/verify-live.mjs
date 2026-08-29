import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PDFDocument } from 'pdf-lib';

const base = (process.env.LIVE_BASE_URL || 'https://branching-problem-circle.sociobot.in').replace(/\/$/, '');
const evidenceDir = process.env.EVIDENCE_DIR || '.factory/evidence';
const checks = [];
mkdirSync(evidenceDir, { recursive: true });

function record(name, detail = 'pass') {
  checks.push({ name, detail });
  process.stdout.write(`PASS ${name}: ${detail}\n`);
}

async function response(path) {
  return fetch(`${base}${path}`, { redirect: 'manual', cache: 'no-store' });
}

const rootResponse = await response('/');
assert.equal(rootResponse.status, 200);
const rootHtml = await rootResponse.text();
for (const [header, expected] of [
  ['content-security-policy', "frame-ancestors 'none'"],
  ['permissions-policy', 'camera=()'],
  ['x-content-type-options', 'nosniff'],
  ['x-frame-options', 'DENY']
]) assert.match(rootResponse.headers.get(header) || '', new RegExp(expected.replace(/[()]/g, '\\$&'), 'i'));
record('security headers');

const assetPath = rootHtml.match(/src="(\/assets\/app-[^"]+\.js)"/)?.[1];
assert.ok(assetPath);
const assetResponse = await response(assetPath);
assert.match(assetResponse.headers.get('cache-control') || '', /max-age=31536000.*immutable/i);
const manifestResponse = await response('/manifest.webmanifest');
assert.match(manifestResponse.headers.get('content-type') || '', /json/i);
record('cache and manifest headers', assetPath);

const unknownResponse = await response('/not-a-real-polish-4-route');
assert.equal(unknownResponse.status, 404);
assert.match(await unknownResponse.text(), /This page does not exist/);
record('real 404 status');

const browser = await chromium.launch();
const errors = [];
const requestLog = [];
const checkedLinks = new Set();

async function newPage(width, height) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push({ kind: 'pageerror', text: String(error), url: page.url() }));
  page.on('console', message => {
    if (message.type() === 'error') errors.push({ kind: 'console', text: message.text(), url: message.location().url });
  });
  page.on('request', request => requestLog.push({ method: request.method(), url: request.url() }));
  return { context, page };
}

async function scan(page, label) {
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.equal(await page.locator('main').count(), 1);
  assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1);
  assert.ok(await page.title());
  assert.ok(await page.locator('meta[name="description"]').getAttribute('content'));
  assert.ok(await page.locator('link[rel="canonical"]').getAttribute('href'));
  assert.match(await page.locator('meta[property="og:image"]').getAttribute('content') || '', /social-card\.jpg$/);
  assert.equal(await page.locator('img:not([alt])').count(), 0);
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const severe = axe.violations.filter(item => ['serious', 'critical'].includes(item.impact || ''));
  assert.deepEqual(severe, []);
  const hrefs = await page.locator('a[href]').evaluateAll(links => links.map(link => link.href));
  for (const href of hrefs) {
    if (!href.startsWith(base) || checkedLinks.has(href)) continue;
    const current = new URL(page.url());
    const linkedUrl = new URL(href);
    if (linkedUrl.origin === current.origin && linkedUrl.pathname === current.pathname && linkedUrl.search === current.search && linkedUrl.hash) continue;
    checkedLinks.add(href);
    const linked = await fetch(href, { redirect: 'manual', cache: 'no-store' });
    assert.ok(linked.status >= 200 && linked.status < 400, `dead link ${href}: ${linked.status}`);
  }
  record(`structure and axe ${label}`);
}

for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const { context, page } = await newPage(width, height);
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  await scan(page, `home ${name}`);
  assert.equal(await page.getByRole('heading', { level: 1 }).textContent(), 'Compare several approaches to one math problem');
  assert.ok(await page.getByText('For volunteer leaders of small math circles').isVisible());
  for (const locator of [
    page.getByRole('heading', { level: 1 }),
    page.getByText('Collect anonymous votes on several approaches, then reveal hints during the discussion.'),
    page.getByRole('link', { name: 'Try it with sample data' }),
    page.getByText('Opens a sample circle; nothing is saved.')
  ]) {
    const box = await locator.boundingBox();
    assert.ok(box && box.y + box.height <= height, `${name} first-screen element is below fold`);
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.screenshot({ path: `${evidenceDir}/polish-4-home-${name}.png`, fullPage: true });
  await context.close();
  record(`cold first screen ${name}`);
}

const { context: demoContext, page: demoPage } = await newPage(1440, 900);
await demoPage.goto(`${base}/?demo=1`, { waitUntil: 'networkidle' });
await scan(demoPage, 'demo');
assert.equal(await demoPage.title(), 'Demo — Branching Problem Circle');
assert.ok(await demoPage.getByLabel('Demo mode').getByText('Demo — sample data, nothing is saved').isVisible());
assert.equal(await demoPage.getByRole('heading', { level: 1 }).textContent(), 'A hexagon has six corners');
await demoPage.getByRole('button', { name: 'Close hint' }).first().click();
await demoPage.getByRole('button', { name: 'Start for real' }).click();
await demoPage.waitForURL(`${base}/`);
const recordsAfterExit = await demoPage.evaluate(async () => {
  const read = name => new Promise((resolve, reject) => {
    const opened = indexedDB.open(name, 1);
    opened.onerror = () => reject(opened.error);
    opened.onupgradeneeded = () => opened.result.createObjectStore('circles');
    opened.onsuccess = () => {
      const db = opened.result;
      const request = db.transaction('circles').objectStore('circles').get('active');
      request.onsuccess = () => { resolve(request.result); db.close(); };
      request.onerror = () => reject(request.error);
    };
  });
  return { demo: await read('branching-problem-circle-demo'), real: await read('branching-problem-circle') };
});
assert.deepEqual(recordsAfterExit, { demo: undefined, real: undefined });
await demoPage.goto(`${base}/?demo=1`);
await demoPage.getByText(/Each corner belongs/).waitFor();
await demoPage.getByRole('button', { name: 'Close hint' }).first().click();
await demoPage.getByRole('button', { name: 'Reset demo' }).click();
await demoPage.getByText(/Each corner belongs/).waitFor();
record('demo exit disposal, pristine re-entry, and reset');

const collectTab = demoPage.getByRole('tab', { name: /Collect/ });
await collectTab.focus();
await demoPage.keyboard.press('ArrowRight');
assert.equal(await demoPage.getByRole('tab', { name: /Explore/ }).evaluate(element => element === document.activeElement), true);
await demoPage.getByRole('tab', { name: /Recap/ }).click();
const pdf = await demoPage.pdf({ format: 'A4', printBackground: true });
assert.equal((await PDFDocument.load(pdf)).getPageCount(), 1);
assert.ok(await demoPage.getByRole('heading', { name: 'Question for the next session' }).isVisible());
await demoPage.screenshot({ path: `${evidenceDir}/polish-4-demo-desktop.png`, fullPage: true });
record('keyboard phase focus and one-page recap');
await demoContext.close();

const { context: importContext, page: importPage } = await newPage(1280, 900);
await importPage.goto(`${base}/`);
await importPage.getByRole('button', { name: 'Create a circle' }).click();
assert.ok(await importPage.getByRole('heading', { name: 'Approaches', exact: true }).isVisible());
await importPage.getByLabel('Circle title').fill('Circle to replace');
await importPage.getByLabel('Problem prompt').fill('This circle should be replaced.');
await importPage.getByRole('button', { name: 'Save problem' }).click();
assert.equal(await importPage.getByLabel(/permission/).evaluate(element => element === document.activeElement), true);
await importPage.getByLabel(/permission/).check();
await importPage.getByRole('button', { name: 'Save problem' }).click();
await importPage.getByText('Problem saved on this device.').waitFor();
await importPage.locator('#import-input').setInputFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{bad') });
assert.ok(await importPage.getByText('This file is not a valid circle export. Choose a JSON file exported by Branching Problem Circle.').isVisible());
assert.equal(await importPage.getByLabel('Circle title').inputValue(), 'Circle to replace');
const fixture = {
  title: 'Imported live circle', problem: 'Can four odd numbers have an odd sum?', rightsConfirmed: true,
  phase: 'shape', branches: [], alternativeIdeas: []
};
await importPage.locator('#import-input').setInputFiles({
  name: 'imported-live-circle.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(fixture))
});
const importPreview = importPage.getByRole('dialog', { name: 'Replace the current circle?' });
assert.match(await importPreview.textContent(), /Circle to replace.*Imported live circle/s);
await importPreview.getByRole('button', { name: 'Replace circle' }).click();
await importPage.getByRole('heading', { name: 'Imported live circle' }).waitFor();
await importPage.reload();
assert.equal(await importPage.getByRole('heading', { level: 1 }).textContent(), 'Imported live circle');
record('rights enforcement, import recovery, preview, and persistence');
await importContext.close();

const { context: mobileContext, page: mobilePage } = await newPage(390, 844);
await mobilePage.goto(`${base}/?demo=1`, { waitUntil: 'networkidle' });
assert.equal(await mobilePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
for (const tab of await mobilePage.getByRole('tab').all()) {
  const box = await tab.boundingBox();
  assert.ok(box && box.height >= 44 && box.x >= 0 && box.x + box.width <= 390, 'phase tab is clipped on mobile');
}
for (const control of await mobilePage.locator('a:visible, button:visible').all()) {
  const box = await control.boundingBox();
  assert.ok(box && box.width >= 44 && box.height >= 44, `small target: ${await control.textContent()}`);
}
await mobilePage.getByRole('button', { name: 'Templates' }).click();
for (const control of await mobilePage.getByRole('dialog').locator('a:visible, button:visible').all()) {
  const box = await control.boundingBox();
  assert.ok(box && box.width >= 44 && box.height >= 44, `small dialog target: ${await control.textContent()}`);
}
await mobilePage.getByRole('button', { name: 'Close templates' }).click();
await mobilePage.screenshot({ path: `${evidenceDir}/polish-4-demo-mobile.png`, fullPage: true });
record('mobile layout and 44px targets');
await mobileContext.close();

const { context: offlineContext, page: offlinePage } = await newPage(390, 844);
await offlinePage.goto(`${base}/?demo=1`);
await offlinePage.evaluate(() => navigator.serviceWorker.ready);
await offlinePage.reload();
await offlineContext.setOffline(true);
await offlinePage.reload();
assert.equal(await offlinePage.getByRole('heading', { level: 1 }).textContent(), 'A hexagon has six corners');
record('cold demo offline reload');
await offlineContext.close();

const { context: routeContext, page: routePage } = await newPage(1280, 900);
for (const [path, title] of [
  ['/privacy/', 'Privacy — Branching Problem Circle'],
  ['/terms/', 'Terms — Branching Problem Circle'],
  ['/offline.html', 'Offline — Branching Problem Circle'],
  ['/not-a-real-polish-4-route', 'Page not found — Branching Problem Circle']
]) {
  const navigation = await routePage.goto(`${base}${path}`, { waitUntil: 'networkidle' });
  assert.equal(navigation?.status(), path.startsWith('/not-') ? 404 : 200);
  assert.equal(await routePage.title(), title);
  await scan(routePage, path);
  for (const name of ['Demo', 'How it works', 'Privacy']) assert.ok(await routePage.getByRole('navigation', { name: 'Site' }).getByRole('link', { name }).isVisible());
}
await routeContext.close();

const expected404Errors = errors.filter(error => error.kind === 'console'
  && error.text === 'Failed to load resource: the server responded with a status of 404 ()'
  && error.url === `${base}/not-a-real-polish-4-route`);
const unexpectedErrors = errors.filter(error => !expected404Errors.includes(error));
assert.equal(expected404Errors.length, 1);
assert.deepEqual(unexpectedErrors, []);
assert.ok(requestLog.length > 0);
assert.equal(requestLog.every(request => new URL(request.url).origin === new URL(base).origin), true);
assert.equal(requestLog.every(request => request.method === 'GET'), true);
record('console and privacy request log', `no unexpected errors; ${requestLog.length} same-origin GET requests`);
record('internal link crawl', `${checkedLinks.size} unique links`);

await browser.close();
const report = { base, checkedAt: new Date().toISOString(), checks, errors: unexpectedErrors, expected404Errors, requests: requestLog.length };
writeFileSync(`${evidenceDir}/polish-4-live-report.json`, `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`LIVE VERIFY PASS (${checks.length} checks)\n`);
