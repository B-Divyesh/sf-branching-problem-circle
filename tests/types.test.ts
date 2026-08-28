import { describe, expect, it } from 'vitest';
import { makeBranch, makeCircle, participationCount, totalVotes, validateImport } from '../src/types';

describe('circle data', () => {
  it('counts anonymous participation without profiles', () => {
    const circle = makeCircle();
    const branch = makeBranch();
    branch.votes = 2;
    branch.rationales = [{ id: 'r1', text: 'Small cases might expose a pattern.', createdAt: 1 }];
    circle.branches = [branch];
    circle.alternativeIdeas = [{ id: 'r2', text: 'Draw a table.', createdAt: 2 }];
    expect(totalVotes(circle)).toBe(2);
    expect(participationCount(circle)).toBe(2);
  });

  it('rejects imported circles with more than six branches', () => {
    const circle = makeCircle();
    circle.title = 'Too many';
    circle.problem = 'A problem';
    circle.branches = Array.from({ length: 7 }, makeBranch);
    expect(() => validateImport(circle)).toThrow(/at most six/i);
  });

  it('normalizes imported vote counts', () => {
    const circle = makeCircle();
    circle.title = 'Imported';
    circle.problem = 'Count this';
    const branch = makeBranch();
    branch.votes = -9;
    circle.branches = [branch];
    expect(validateImport(circle).branches[0].votes).toBe(0);
  });
});
