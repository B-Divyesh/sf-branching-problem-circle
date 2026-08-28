import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

interface Claim {
  id: string;
  claim: string;
  where: string;
  test: string;
  sandbox: string;
}

describe('claim registry contract', () => {
  const claims = JSON.parse(readFileSync('.factory/claims.json', 'utf8')) as Claim[];
  const browserTests = readFileSync('tests/e2e/app.spec.ts', 'utf8');

  it('gives every claim a unique id and complete verification recipe', () => {
    expect(new Set(claims.map(claim => claim.id)).size).toBe(claims.length);
    for (const claim of claims) {
      expect(claim.id).toMatch(/^[a-z0-9-]+$/);
      expect(claim.claim.length).toBeGreaterThan(0);
      expect(claim.where.length).toBeGreaterThan(0);
      expect(claim.sandbox.length).toBeGreaterThan(0);
      expect(claim.test).toBe(`npm run test:e2e -- --grep @claim:${claim.id}`);
    }
  });

  it('has exactly one tagged browser test for every registered claim', () => {
    const tags = [...browserTests.matchAll(/test\(['"]@claim:([a-z0-9-]+)/g)].map(match => match[1]);
    expect(tags.sort()).toEqual(claims.map(claim => claim.id).sort());
  });
});
