import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

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
});
