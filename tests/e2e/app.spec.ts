import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('@claim:demo-sample opens a realistic sample circle in one click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByLabel('Demo mode')).toContainText('sample data, nothing is saved');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A hexagon has six corners');
  await expect(page.getByText('3 votes', { exact: true })).toBeVisible();
  await expect(page.getByText(/Each corner belongs/)).toBeVisible();
});

test('@claim:demo-isolation keeps sample data out of the real circle', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Compare several approaches/);
  await page.getByRole('button', { name: 'Create a circle' }).click();
  await expect(page.getByLabel('Circle title')).toHaveValue('');
});

test('@claim:browser-only keeps normal and demo flows same-origin', async ({ page }) => {
  const urls: string[] = [];
  page.on('request', request => urls.push(request.url()));
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Open hint' }).first().click();
  await page.getByRole('button', { name: 'Reveal path' }).first().click();
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

test('@claim:recap-export exports the shown circle as JSON', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('tab', { name: /Recap/ }).click();
  await expect(page.getByText('The paths we kept')).toBeVisible();
  const download = page.waitForEvent('download');
  await page.locator('#main').getByRole('button', { name: 'Export data' }).click();
  expect((await download).suggestedFilename()).toContain('hexagon');
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByRole('banner')).toBeHidden();
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
  await page.getByLabel(/permission/).check();
  await page.getByRole('button', { name: 'Save problem' }).click();
  await expect(page.getByText('Problem saved on this device.')).toBeVisible();
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
  await expect(page.getByRole('tab', { name: /Shape/ })).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab', { name: /Recap/ })).toBeFocused();
  await page.getByRole('button', { name: 'Templates' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Templates' })).toBeFocused();
});

test('has accessible pages and 44px mobile links', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  for (const link of [page.getByRole('link', { name: 'Branching Problem Circle' }), page.getByRole('link', { name: 'Privacy' }).first(), page.getByRole('link', { name: 'Terms' })]) {
    const box = await link.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
});

test('uses route titles, deep links, and a real 404 page', async ({ page }) => {
  await page.goto('/demo');
  await expect(page).toHaveTitle('Demo — Branching Problem Circle');
  await page.getByRole('tab', { name: /Recap/ }).click();
  await expect(page).toHaveURL(/\/circle\/recap\?demo=1$/);
  await page.reload();
  await expect(page.getByText('The paths we kept')).toBeVisible();
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page is not part of the circle');
});
