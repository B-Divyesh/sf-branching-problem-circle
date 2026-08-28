export type Phase = 'shape' | 'vote' | 'explore' | 'recap';

export interface Rationale {
  id: string;
  text: string;
  createdAt: number;
}

export interface Branch {
  id: string;
  title: string;
  firstStep: string;
  hint: string;
  path: string;
  votes: number;
  rationales: Rationale[];
  hintRevealed: boolean;
  pathRevealed: boolean;
}

export interface CircleSession {
  id: string;
  title: string;
  problem: string;
  source: string;
  rightsConfirmed: boolean;
  roomCode: string;
  phase: Phase;
  branches: Branch[];
  alternativeIdeas: Rationale[];
  createdAt: number;
  updatedAt: number;
}

export function createId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function makeCircle(): CircleSession {
  const now = Date.now();
  return {
    id: createId(),
    title: '',
    problem: '',
    source: '',
    rightsConfirmed: false,
    roomCode: Math.random().toString(36).slice(2, 6).toUpperCase(),
    phase: 'shape',
    branches: [],
    alternativeIdeas: [],
    createdAt: now,
    updatedAt: now
  };
}

export function makeBranch(): Branch {
  return {
    id: createId(), title: '', firstStep: '', hint: '', path: '', votes: 0,
    rationales: [], hintRevealed: false, pathRevealed: false
  };
}

export function totalVotes(circle: CircleSession): number {
  return circle.branches.reduce((sum, branch) => sum + branch.votes, 0);
}

export function participationCount(circle: CircleSession): number {
  return circle.branches.reduce((sum, branch) => sum + branch.rationales.length, 0) + circle.alternativeIdeas.length;
}

export function validateImport(value: unknown): CircleSession {
  if (!value || typeof value !== 'object') throw new Error('That file does not contain a circle.');
  const circle = value as Partial<CircleSession>;
  if (typeof circle.title !== 'string' || typeof circle.problem !== 'string' || !Array.isArray(circle.branches)) {
    throw new Error('That file is missing a title, problem, or approaches.');
  }
  if (circle.branches.length > 6) throw new Error('A circle can contain at most six approaches.');
  const base = makeCircle();
  return {
    ...base,
    ...circle,
    id: typeof circle.id === 'string' ? circle.id : base.id,
    phase: ['shape', 'vote', 'explore', 'recap'].includes(circle.phase ?? '') ? circle.phase as Phase : 'shape',
    branches: circle.branches.map((raw) => {
      if (!raw || typeof raw !== 'object') throw new Error('One approach is not readable.');
      const branch = raw as Partial<Branch>;
      return {
        ...makeBranch(), ...branch,
        id: typeof branch.id === 'string' ? branch.id : createId(),
        title: String(branch.title ?? ''), firstStep: String(branch.firstStep ?? ''),
        hint: String(branch.hint ?? ''), path: String(branch.path ?? ''),
        votes: Math.max(0, Number(branch.votes) || 0),
        rationales: Array.isArray(branch.rationales) ? branch.rationales : []
      };
    }),
    alternativeIdeas: Array.isArray(circle.alternativeIdeas) ? circle.alternativeIdeas : [],
    updatedAt: Date.now()
  };
}
