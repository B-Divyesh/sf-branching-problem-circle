import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';

describe('static deployment contract', () => {
  const config = JSON.parse(readFileSync('public/staticwebapp.config.json', 'utf8')) as {
    responseOverrides: Record<string, { rewrite: string; statusCode: number }>;
    globalHeaders: Record<string, string>;
    routes: { route: string; rewrite?: string; headers?: Record<string, string> }[];
  };

  it('sends unknown paths to the styled 404 with a 404 status', () => {
    expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
    expect(config.routes.filter(route => route.rewrite)).toEqual([
      { route: '/demo', rewrite: '/index.html' },
      { route: '/circle/*', rewrite: '/index.html' },
      { route: '/manifest.webmanifest', rewrite: '/manifest.json' }
    ]);
  });

  it('ships the required browser hardening and immutable asset policy', () => {
    expect(config.globalHeaders['Content-Security-Policy']).toContain("frame-ancestors 'none'");
    expect(config.globalHeaders['Permissions-Policy']).toContain('camera=()');
    expect(config.routes.find(route => route.route === '/assets/*')?.headers?.['Cache-Control']).toContain('immutable');
    expect(config.routes.find(route => route.route === '/manifest.webmanifest')?.rewrite).toBe('/manifest.json');
    expect(config.routes.find(route => route.route === '/manifest.json')?.headers?.['Cache-Control']).toContain('86400');
  });

  it('ships complete route metadata and consistent static-page navigation', () => {
    const routes = ['index.html', 'privacy/index.html', 'terms/index.html', '404.html', 'offline.html'];
    for (const route of routes) {
      const document = new JSDOM(readFileSync(route, 'utf8')).window.document;
      expect(document.documentElement.lang, route).toBe('en');
      expect(document.querySelectorAll('title'), route).toHaveLength(1);
      expect(document.title.length, route).toBeLessThanOrEqual(60);
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')?.length, route).toBeGreaterThan(0);
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), route).toMatch(/^https:\/\/branching-problem-circle\.sociobot\.in\//);
      for (const selector of [
        'meta[property="og:type"]', 'meta[property="og:title"]', 'meta[property="og:description"]',
        'meta[property="og:image"]', 'meta[name="twitter:card"]', 'meta[name="twitter:title"]',
        'meta[name="twitter:description"]', 'meta[name="twitter:image"]'
      ]) expect(document.querySelector(selector)?.getAttribute('content'), `${route} ${selector}`).toBeTruthy();
    }

    for (const route of ['privacy/index.html', 'terms/index.html', '404.html', 'offline.html']) {
      const document = new JSDOM(readFileSync(route, 'utf8')).window.document;
      const labels = [...document.querySelectorAll('nav[aria-label="Site"] a')].map(link => link.textContent);
      expect(labels, route).toEqual(['Demo', 'How it works', 'Privacy']);
      expect([...document.querySelectorAll('footer a')].map(link => link.textContent), route).toEqual(['Privacy', 'Terms']);
    }
  });
});
