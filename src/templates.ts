import { makeBranch, makeCircle, type CircleSession } from './types';

export interface CircleTemplate {
  id: string;
  name: string;
  description: string;
  paid: boolean;
  build: () => CircleSession;
}

function fromTitles(title: string, problem: string, titles: string[]): CircleSession {
  const circle = makeCircle();
  circle.title = title;
  circle.problem = problem;
  circle.source = 'Facilitator-supplied problem';
  circle.branches = titles.map((branchTitle) => ({ ...makeBranch(), title: branchTitle }));
  return circle;
}

export const templates: CircleTemplate[] = [
  {
    id: 'blank', name: 'Blank circle', paid: false,
    description: 'Start with an empty problem and add approaches as they emerge.',
    build: makeCircle
  },
  {
    id: 'compare', name: 'Compare three approaches', paid: false,
    description: 'Seed visual, algebraic, and pattern-seeking approaches.',
    build: () => fromTitles('Three lenses', 'Paste your rights-cleared problem here.', ['Draw or model it', 'Name the quantities', 'Test a pattern'])
  },
  {
    id: 'stuck', name: 'Compare failed approaches', paid: false,
    description: 'Preserve two tempting starts and one reframing move.',
    build: () => fromTitles('Compare a tempting start', 'Paste your rights-cleared problem here.', ['The tempting shortcut', 'Small cases first', 'Change the question'])
  },
  {
    id: 'invariants', name: 'What cannot change?', paid: false,
    description: 'Organize experiments around invariants, parity, and bounds.',
    build: () => fromTitles('What stays put?', 'Paste your rights-cleared problem here.', ['Track parity', 'Find an invariant', 'Trap it with bounds'])
  },
  {
    id: 'proof', name: 'From hunch to proof', paid: false,
    description: 'Move from examples through a conjecture to an explanation.',
    build: () => fromTitles('From hunch to proof', 'Paste your rights-cleared problem here.', ['Try tiny cases', 'State the hunch', 'Explain why always'])
  }
];
