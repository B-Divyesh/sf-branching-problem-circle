import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('runs a complete small-group circle', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/useful wrong turns/i);
  await page.getByRole('button', { name: 'Shape a new problem' }).click();
  await page.getByLabel(/Circle title/).fill('The pebble crossing');
  await page.getByLabel(/Problem prompt/).fill('Can every pebble cross the line in exactly three moves?');
  await page.getByLabel(/permission/).check();
  await page.getByRole('button', { name: 'Save problem' }).click();
  await page.getByRole('button', { name: /Add approach/ }).click();
  await page.getByLabel(/Approach name/).fill('Try a tiny case');
  await page.getByLabel(/participants see first/).fill('Begin with two pebbles.');
  await page.getByLabel(/Hint to open/).fill('Record what changes after each move.');
  await page.getByLabel(/Full path/).fill('Parity blocks the proposed ending.');
  await page.getByRole('button', { name: 'Add approach' }).last().click();
  await page.getByRole('tab', { name: /Collect/ }).click();
  await page.getByText('Try a tiny case', { exact: true }).click();
  await page.getByLabel(/Why might/).fill('A small case could show what stays unchanged.');
  await page.getByRole('button', { name: 'Place my idea' }).click();
  await expect(page.getByText(/Pass the device/)).toBeVisible();
  await page.getByRole('tab', { name: /Explore/ }).click();
  await expect(page.getByText('1 vote', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Open hint' }).click();
  await expect(page.getByText(/Record what changes/)).toBeVisible();
  await page.getByRole('button', { name: 'Reveal path' }).click();
  await expect(page.getByText(/Parity blocks/)).toBeVisible();
  await page.getByRole('tab', { name: /Recap/ }).click();
  await expect(page.getByText('The paths we kept')).toBeVisible();
});

test('has no serious accessibility violations on welcome', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
});

test('reloads offline after the service worker has cached the app', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
