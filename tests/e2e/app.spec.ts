import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PDFDocument } from 'pdf-lib';
import { readFileSync } from 'node:fs';

test('@claim:demo-sample opens a realistic sample circle in one click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\?demo=1$/);
  await expect(page.getByLabel('Demo mode')).toContainText('sample data, nothing is saved');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A hexagon has six corners');
  await expect(page.getByText('3 votes', { exact: true })).toBeVisible();
  await expect(page.getByText(/Each corner belongs/)).toBeVisible();
});

test('@claim:demo-isolation keeps sample data out of the real circle', async ({ page }) => {
  await page.goto('/?demo=1');
  await expect(page.getByLabel('Demo mode')).toContainText('sample data, nothing is saved');
  await page.getByRole('button', { name: 'Close hint' }).first().click();
  await expect(page.getByText(/Each corner belongs/)).toHaveCount(0);

  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Compare several approaches/);
  const recordsAfterExit = await page.evaluate(async () => {
    const read = (name: string) => new Promise<unknown>((resolve, reject) => {
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
  expect(recordsAfterExit).toEqual({ demo: undefined, real: undefined });

  await page.goto('/?demo=1');
  await expect(page.getByText(/Each corner belongs/)).toBeVisible();
  await page.getByRole('button', { name: 'Close hint' }).first().click();
  await expect(page.getByText(/Each corner belongs/)).toHaveCount(0);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByText(/Each corner belongs/)).toBeVisible();
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('/');
  await page.getByRole('button', { name: 'Create a circle' }).click();
  await expect(page.getByLabel('Circle title')).toHaveValue('');
});

test('@claim:browser-only keeps normal and demo flows same-origin', async ({ page }) => {
  const requests: { method: string; url: string }[] = [];
  page.on('request', request => requests.push({ method: request.method(), url: request.url() }));
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Open hint' }).first().click();
  await page.getByRole('button', { name: 'Reveal note' }).first().click();
  expect(requests.every(request => new URL(request.url).origin === 'http://127.0.0.1:4173')).toBeTruthy();
  expect(requests.every(request => request.method === 'GET')).toBeTruthy();
});

test('@claim:single-device exposes only local shared-device controls and storage', async ({ page }) => {
  const urls: string[] = [];
  page.on('request', request => urls.push(request.url()));
  await page.goto('/?demo=1');
  await expect(page.getByText('Shared-device turn · anonymous')).toHaveCount(0);
  await page.getByRole('tab', { name: /Collect/ }).click();
  await expect(page.getByText('Shared-device turn · anonymous')).toBeVisible();
  expect((await page.locator('a, button, input').allTextContents()).join(' ')).not.toMatch(/join room|pair device|sync|public share/i);
  await expect(page.locator('a[href*="room"], a[href*="share"], a[href*="sync"]')).toHaveCount(0);
  const databases = await page.evaluate(async () => (await indexedDB.databases()).map(item => item.name));
  expect(databases).toEqual(['branching-problem-circle-demo']);
  expect(urls.every(url => new URL(url).origin === 'http://127.0.0.1:4173')).toBeTruthy();
});

test('@claim:offline-reload reloads the demo offline after its first visit', async ({ page, context }) => {
  await page.goto('/demo');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A hexagon has six corners');
});

test('@claim:six-approaches limits a circle to six approaches', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Create a circle' }).click();
  for (let index = 1; index <= 6; index++) {
    await page.getByRole('button', { name: /Add approach \d\/6/ }).click();
    await page.getByLabel('Approach name').fill(`Approach ${index}`);
    await page.getByRole('button', { name: 'Add approach' }).last().click();
  }
  await expect(page.getByRole('button', { name: /Add approach 6\/6/ })).toBeDisabled();
});

test('@claim:recap-export prints one A4 page with sample content and exports JSON', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('tab', { name: /Recap/ }).click();
  await expect(page.getByText('Approaches from this session')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A hexagon has six corners' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Draw and arrange' })).toBeVisible();
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  expect((await PDFDocument.load(pdf)).getPageCount()).toBe(1);
  const download = page.waitForEvent('download');
  await page.locator('#main').getByRole('button', { name: 'Export data' }).click();
  expect((await download).suggestedFilename()).toContain('hexagon');
});

test('@claim:json-import replaces a real circle from a valid export without changing the demo', async ({ page }) => {
  await page.goto('/demo');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export data' }).first().click();
  const exported = await downloadEvent;
  const exportPath = await exported.path();
  expect(exportPath).toBeTruthy();
  const exportBuffer = readFileSync(exportPath!);
  expect(JSON.parse(exportBuffer.toString('utf8')).title).toBe('A hexagon has six corners');

  await page.getByRole('button', { name: 'Start for real' }).click();
  await page.getByRole('button', { name: 'Create a circle' }).click();
  await page.getByLabel('Circle title').fill('Circle to replace');
  await page.getByLabel('Problem prompt').fill('This circle should be replaced.');
  await page.getByLabel(/permission/).check();
  await page.getByRole('button', { name: 'Save problem' }).click();
  await expect(page.getByText('Problem saved on this device.')).toBeVisible();

  await page.locator('#import-input').setInputFiles({ name: 'hexagon-circle.json', mimeType: 'application/json', buffer: exportBuffer });
  const importPreview = page.getByRole('dialog', { name: 'Replace the current circle?' });
  await expect(importPreview).toContainText('“Circle to replace” will be replaced with “A hexagon has six corners”.');
  await expect(importPreview.getByRole('button', { name: 'Cancel import' })).toBeFocused();
  const previewAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(previewAxe.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  await importPreview.getByRole('button', { name: 'Replace circle' }).click();
  await expect(page.getByText('Imported circle saved on this device.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A hexagon has six corners' })).toBeVisible();

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'A hexagon has six corners' })).toBeVisible();
  await page.goto('/?demo=1');
  await expect(page.getByLabel('Demo mode')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A hexagon has six corners' })).toBeVisible();
  const databases = await page.evaluate(async () => (await indexedDB.databases()).map(item => item.name).sort());
  expect(databases).toEqual(['branching-problem-circle', 'branching-problem-circle-demo']);
});

test('@claim:included-templates makes every shipped template usable without checkout', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Templates' }).click();
  await expect(page.getByRole('heading', { name: 'Choose a session template' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Use template' })).toHaveCount(5);
  for (const button of await page.getByRole('button', { name: 'Use template' }).all()) await expect(button).toBeEnabled();
  await expect(page.getByText(/US \$12|Buy the pack/)).toHaveCount(0);
});

test('@claim:no-public-sharing has no account or public-service request in the shipped flow', async ({ page }) => {
  const urls: string[] = [];
  page.on('request', request => urls.push(request.url()));
  await page.goto('/');
  await expect(page.locator('input[type="password"], input[type="email"]')).toHaveCount(0);
  await expect(page.getByText(/No public sharing, child accounts, rankings, test banks, or generated solutions/)).toBeVisible();
  expect(urls.every(url => new URL(url).origin === 'http://127.0.0.1:4173')).toBeTruthy();
});

test('enforces rights, recovers from bad imports, and keeps the prior circle', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Create a circle' }).click();
  await page.getByLabel('Circle title').fill('Rights check');
  await page.getByLabel('Problem prompt').fill('Can we share this?');
  await page.getByRole('button', { name: 'Save problem' }).click();
  await expect(page.getByLabel(/permission/)).toBeFocused();
  const beforePermission = await page.evaluate(async () => new Promise<{ title: string; rightsConfirmed: boolean }>((resolve, reject) => {
    const opened = indexedDB.open('branching-problem-circle', 1);
    opened.onerror = () => reject(opened.error);
    opened.onsuccess = () => {
      const db = opened.result;
      const request = db.transaction('circles').objectStore('circles').get('active');
      request.onsuccess = () => { resolve(request.result); db.close(); };
      request.onerror = () => reject(request.error);
    };
  }));
  expect(beforePermission).toMatchObject({ title: '', rightsConfirmed: false });
  await page.getByLabel(/permission/).check();
  await page.getByRole('button', { name: 'Save problem' }).click();
  await expect(page.getByText('Problem saved on this device.')).toBeVisible();
  const afterPermission = await page.evaluate(async () => new Promise<{ title: string; rightsConfirmed: boolean }>((resolve, reject) => {
    const opened = indexedDB.open('branching-problem-circle', 1);
    opened.onerror = () => reject(opened.error);
    opened.onsuccess = () => {
      const db = opened.result;
      const request = db.transaction('circles').objectStore('circles').get('active');
      request.onsuccess = () => { resolve(request.result); db.close(); };
      request.onerror = () => reject(request.error);
    };
  }));
  expect(afterPermission).toMatchObject({ title: 'Rights check', rightsConfirmed: true });
  await page.getByRole('button', { name: 'Import', exact: true }).click();
  await page.locator('#import-input').setInputFiles({ name: 'bad.json', mimeType: 'application/json', buffer: Buffer.from('{bad') });
  await expect(page.getByText('This file is not a valid circle export. Choose a JSON file exported by Branching Problem Circle.')).toBeVisible();
  await expect(page.getByLabel('Circle title')).toHaveValue('Rights check');
});

test('keeps keyboard focus for phase tabs and template dialog', async ({ page }) => {
  await page.goto('/demo');
  const collect = page.getByRole('tab', { name: /Collect/ });
  await collect.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: /Explore/ })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: /Recap/ })).toBeFocused();
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: /Write/ })).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab', { name: /Recap/ })).toBeFocused();
  await page.getByRole('button', { name: 'Templates' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Templates' })).toBeFocused();
  await page.getByRole('button', { name: 'Templates' }).click();
  await page.getByRole('button', { name: 'Close templates' }).click();
  await expect(page.getByRole('button', { name: 'Templates' })).toBeFocused();
  await page.getByRole('button', { name: 'Templates' }).click();
  page.once('dialog', dialog => void dialog.accept());
  await page.getByRole('button', { name: 'Use template' }).first().click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Templates', exact: true })).toBeFocused();
});

test('respects reduced motion and loads without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/demo');
  const timing = await page.locator('.path-tile').first().evaluate(element => {
    const style = getComputedStyle(element);
    const milliseconds = (value: string) => value.endsWith('ms') ? Number.parseFloat(value) : Number.parseFloat(value) * 1000;
    return { animation: milliseconds(style.animationDuration), transition: milliseconds(style.transitionDuration) };
  });
  expect(timing.animation).toBeLessThanOrEqual(0.01);
  expect(timing.transition).toBeLessThanOrEqual(0.01);
  for (const route of ['/', '/privacy/', '/terms/', '/404.html', '/offline.html']) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('has accessible pages and 44px mobile links', async ({ page }) => {
  await page.goto('/');
  let results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  for (const link of [page.getByRole('link', { name: 'Branching Problem Circle' }), page.getByRole('link', { name: 'Privacy' }).first(), page.getByRole('link', { name: 'Terms' })]) {
    const box = await link.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  await page.goto('/demo');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.getByRole('button', { name: 'Templates' }).click();
  const dialogBox = await page.getByRole('dialog').boundingBox();
  expect(dialogBox?.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  for (const control of await page.getByRole('dialog').locator('a:visible, button:visible').all()) {
    const box = await control.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  await page.getByRole('button', { name: 'Close templates' }).click();
  await page.getByRole('tab', { name: /Recap/ }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
});

test('uses route titles, deep links, and a real 404 page', async ({ page }) => {
  await page.goto('/demo');
  await expect(page).toHaveTitle('Demo — Branching Problem Circle');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://branching-problem-circle.sociobot.in/demo');
  await page.getByRole('tab', { name: /Recap/ }).click();
  await expect(page).toHaveURL(/\/circle\/recap\?demo=1$/);
  await expect(page).toHaveTitle('Demo — Branching Problem Circle');
  await page.getByRole('tab', { name: /Explore/ }).click();
  await page.goBack();
  await expect(page).toHaveURL(/\/circle\/recap\?demo=1$/);
  await expect(page.getByRole('heading', { name: 'A hexagon has six corners' })).toBeFocused();
  await page.reload();
  await expect(page.getByText('Approaches from this session')).toBeVisible();
  await page.goto('/');
  await page.getByRole('button', { name: 'Create a circle' }).click();
  await expect(page).toHaveTitle('Write a problem — Branching Problem Circle');
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page does not exist');
  await expect(page.getByRole('link', { name: 'How it works' })).toBeVisible();
});

test('uses direct headings for authoring, empty voting, and recap', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Create a circle' }).click();
  await expect(page.getByRole('heading', { name: 'Approaches', exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Add approach 0\/6/ }).click();
  await expect(page.getByRole('heading', { name: 'Add an approach' })).toBeVisible();
  await page.getByRole('tab', { name: /Collect/ }).click();
  await expect(page.getByRole('heading', { name: 'Add a problem and approach before collecting votes' })).toBeVisible();
  await page.goto('/?demo=1');
  await page.getByRole('tab', { name: /Recap/ }).click();
  await expect(page.getByRole('heading', { name: 'Question for the next session' })).toBeVisible();
});

for (const route of ['/', '/privacy/', '/terms/', '/404.html', '/offline.html']) {
  test(`has accessible metadata, navigation, and legal links at ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Branching Problem Circle/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /social-card\.jpg$/);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', /Branching Problem Circle/);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /social-card\.jpg$/);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(axe.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
    for (const name of ['Demo', 'How it works', 'Privacy']) {
      await expect(page.getByRole('navigation', { name: 'Site' }).getByRole('link', { name })).toBeVisible();
    }
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Privacy' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Terms' })).toBeVisible();
  });
}
