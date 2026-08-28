import './styles.css';
import { clearCircle, loadCircle, saveCircle } from './db';
import { CHECKOUT_URL, cachedLicenseState, captureLicense, forgetLicense, restoreLicense, verifyLicense, type LicenseState } from './license';
import { templates } from './templates';
import { createId, makeBranch, makeCircle, participationCount, totalVotes, validateImport, type Branch, type CircleSession, type Phase } from './types';

const appNode = document.querySelector<HTMLDivElement>('#app');
if (!appNode) throw new Error('App root is missing');
const app: HTMLDivElement = appNode;

let circle: CircleSession | undefined;
let loading = true;
let error = '';
let notice = '';
let editingBranchId: string | null = null;
let showTemplates = false;
let licenseState: LicenseState = 'free';
let installPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const esc = (value: unknown): string => String(value ?? '')
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#039;');

function footer(): string {
  return `<footer class="site-footer">
    <span>Private by design · works offline</span>
    <span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · Original AI-generated ceramic artwork</span>
  </footer>`;
}

function icon(name: 'branch' | 'lock' | 'offline' | 'spark'): string {
  const paths = {
    branch: '<path d="M5 4v8c0 4 3 6 7 6h7M5 9h5c4 0 6-2 6-5M16 4l-2-2m2 2 2-2M19 18l-2-2m2 2-2 2"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    offline: '<path d="m3 3 18 18M8.5 8.5A8.5 8.5 0 0 1 20 10m-2 4a8 8 0 0 0-3.5-2M4 10c.7-.7 1.5-1.3 2.4-1.8M7 14a7 7 0 0 1 3.5-2M12 19h.01"/>',
    spark: '<path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z"/><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/>'
  };
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
}

function renderWelcome(): string {
  return `<header class="masthead welcome-head">
      <a class="wordmark" href="/">${icon('branch')}<span>Branching Problem Circle</span></a>
      <button class="quiet-button" data-action="templates">Template shelf</button>
    </header>
    <main id="main" class="welcome">
      <section class="welcome-copy">
        <p class="eyebrow">A thinking table for 6–8 curious minds</p>
        <h1>Let the useful wrong turns stay.</h1>
        <p class="lede">Hold one problem, collect anonymous “try this” votes, and reveal competing paths when the room is ready. No accounts, rankings, or rush.</p>
        <div class="welcome-actions">
          <button class="primary-button" data-action="new-circle">Shape a new problem</button>
          <button class="text-button" data-action="import">Import a circle</button>
        </div>
        <ul class="proof-points" aria-label="Product qualities">
          <li><span>01</span> Everything stays on this device</li>
          <li><span>02</span> Up to six approaches, including dead ends</li>
          <li><span>03</span> One-page printable recap</li>
        </ul>
      </section>
      <figure class="hero-piece">
        <picture>
          <source type="image/webp" srcset="/assets/ceramic-paths-768.webp 768w, /assets/ceramic-paths-1280.webp 1280w" sizes="(max-width: 800px) calc(100vw - 32px), 52vw" />
          <img src="/assets/ceramic-paths-1280.jpg" width="1280" height="853" fetchpriority="high" decoding="async" alt="Blank handmade ceramic tiles branch three ways around a central tile, with six river stones marking choices." />
        </picture>
        <figcaption>One problem. More than one honest way in.</figcaption>
      </figure>
    </main>${footer()}`;
}

const phases: { id: Phase; short: string; label: string }[] = [
  { id: 'shape', short: '1', label: 'Shape' }, { id: 'vote', short: '2', label: 'Collect' },
  { id: 'explore', short: '3', label: 'Explore' }, { id: 'recap', short: '4', label: 'Recap' }
];

function appHeader(current: CircleSession): string {
  return `<header class="masthead app-head">
    <a class="wordmark" href="/" aria-label="Branching Problem Circle home">${icon('branch')}<span>Branching Problem Circle</span></a>
    <div class="connection" aria-live="polite">${navigator.onLine ? '<span class="online-dot"></span> Saved locally' : `${icon('offline')} Offline · still saving`}</div>
    <div class="head-actions">
      ${installPrompt ? '<button class="quiet-button" data-action="install">Install app</button>' : ''}
      <button class="quiet-button" data-action="templates">Templates</button>
      <button class="quiet-button" data-action="export">Export data</button>
      <button class="quiet-button" data-action="import">Import</button>
      <button class="quiet-button danger-text" data-action="clear-circle">Clear circle</button>
    </div>
    <nav class="phase-nav" aria-label="Session phases">
      <div role="tablist" aria-label="Session phases">
      ${phases.map(item => `<button role="tab" aria-selected="${current.phase === item.id}" tabindex="${current.phase === item.id ? '0' : '-1'}" class="phase-tab ${current.phase === item.id ? 'active' : ''}" data-phase="${item.id}"><span>${item.short}</span>${item.label}</button>`).join('')}
      </div>
    </nav>
  </header>`;
}

function renderShape(current: CircleSession): string {
  const editing = editingBranchId === 'new' ? makeBranch() : current.branches.find(branch => branch.id === editingBranchId);
  return `<main id="main" class="workspace">
    <section class="work-intro">
      <div><p class="eyebrow">Shape the problem</p><h1>${current.title ? esc(current.title) : 'Set one generous problem.'}</h1></div>
      <p>Give the room enough to begin. Keep solutions behind the tiles until discussion earns them.</p>
    </section>
    <form id="problem-form" class="problem-form" novalidate>
      <div class="field"><label for="title">Circle title <span>required</span></label><input id="title" name="title" required maxlength="80" value="${esc(current.title)}" autocomplete="off" /></div>
      <div class="field"><label for="problem">Problem prompt <span>required</span></label><textarea id="problem" name="problem" required maxlength="1600" rows="5">${esc(current.problem)}</textarea><small>Write what participants may see. No solution belongs here.</small></div>
      <div class="field"><label for="source">Source or credit</label><input id="source" name="source" maxlength="160" value="${esc(current.source)}" placeholder="e.g. My own problem, or book + page" /></div>
      <label class="check"><input type="checkbox" name="rights" ${current.rightsConfirmed ? 'checked' : ''} /> <span>I have permission to use this problem with my group.</span></label>
      <div class="form-end"><span class="save-note">Saved only in this browser</span><button class="primary-button" type="submit">Save problem</button></div>
    </form>
    <section class="approach-section" aria-labelledby="approach-heading">
      <div class="section-heading"><div><p class="eyebrow">Approach tiles</p><h2 id="approach-heading">Make room for competing starts.</h2></div><button class="secondary-button" data-action="add-branch" ${current.branches.length >= 6 ? 'disabled' : ''}>Add approach <span>${current.branches.length}/6</span></button></div>
      ${current.branches.length ? `<ol class="author-branches">${current.branches.map((branch, index) => `<li><span class="branch-number">${String(index + 1).padStart(2, '0')}</span><div><h3>${esc(branch.title)}</h3><p>${esc(branch.firstStep || 'No opening move added yet.')}</p></div><button class="text-button" data-action="edit-branch" data-id="${branch.id}">Edit</button><button class="text-button danger-text" data-action="delete-branch" data-id="${branch.id}">Remove</button></li>`).join('')}</ol>` : `<div class="empty-piece"><span class="empty-mark">Y</span><div><h3>No approaches yet</h3><p>Add the first plausible start—even one you expect to fail productively.</p></div></div>`}
    </section>
    ${editing ? renderBranchEditor(editing, editingBranchId === 'new') : ''}
  </main>`;
}

function renderBranchEditor(branch: Branch, isNew: boolean): string {
  return `<section class="branch-editor" aria-labelledby="branch-editor-heading">
    <div class="section-heading"><div><p class="eyebrow">${isNew ? 'New tile' : 'Edit tile'}</p><h2 id="branch-editor-heading">${isNew ? 'Name a way in.' : esc(branch.title)}</h2></div><button class="text-button" data-action="cancel-branch">Close</button></div>
    <form id="branch-form" data-id="${branch.id}">
      <div class="field"><label for="branch-title">Approach name <span>required</span></label><input id="branch-title" name="title" required maxlength="60" value="${esc(branch.title)}" placeholder="e.g. Build a smaller case" /></div>
      <div class="field"><label for="first-step">What participants see first</label><textarea id="first-step" name="firstStep" maxlength="280" rows="2" placeholder="A neutral first move, not the result">${esc(branch.firstStep)}</textarea></div>
      <div class="two-fields">
        <div class="field"><label for="hint">Hint to open later</label><textarea id="hint" name="hint" maxlength="400" rows="3">${esc(branch.hint)}</textarea></div>
        <div class="field"><label for="path">Full path or facilitator note</label><textarea id="path" name="path" maxlength="1000" rows="3">${esc(branch.path)}</textarea></div>
      </div>
      <div class="form-end"><span class="save-note">Hints stay hidden until you open them.</span><button class="primary-button" type="submit">${isNew ? 'Add approach' : 'Save approach'}</button></div>
    </form>
  </section>`;
}

function renderVote(current: CircleSession): string {
  const ready = current.title && current.problem && current.branches.length;
  return `<main id="main" class="vote-stage">
    ${ready ? `<section class="vote-problem"><p class="room-chip">Shared-device turn · anonymous</p><h1>${esc(current.title)}</h1><p>${esc(current.problem)}</p></section>
      <form id="vote-form" class="vote-form">
        <fieldset><legend>Which path would you try first?</legend><p class="field-help">There is no fastest-path prize. Pick what feels promising.</p>
          <div class="vote-grid">${current.branches.map((branch, index) => `<label class="vote-tile"><input type="radio" name="branch" value="${branch.id}" /><span class="tile-index">${String(index + 1).padStart(2, '0')}</span><strong>${esc(branch.title)}</strong><small>${esc(branch.firstStep || 'Try this direction and decide the first move together.')}</small><span class="choose-mark">Choose this path</span></label>`).join('')}</div>
        </fieldset>
        <div class="response-fields"><div class="field"><label for="rationale">Why might it work?</label><textarea id="rationale" name="rationale" rows="2" maxlength="320" placeholder="One thought is enough"></textarea></div>
        <div class="or"><span>or</span></div><div class="field"><label for="alternative">Offer a different path</label><textarea id="alternative" name="alternative" rows="2" maxlength="320" placeholder="What else could the circle try?"></textarea></div></div>
        <p id="vote-error" class="form-error" role="alert"></p>
        <button class="primary-button large-button" type="submit">Place my idea</button>
      </form>` : `<section class="not-ready"><p class="eyebrow">Collect ideas</p><h1>The voting table needs a little more clay.</h1><p>Add a title, prompt, and at least one approach before inviting the next thinker.</p><button class="primary-button" data-phase="shape">Return to shaping</button></section>`}
  </main>`;
}

function renderExplore(current: CircleSession): string {
  return `<main id="main" class="workspace explore-workspace">
    <section class="work-intro"><div><p class="eyebrow">Explore together</p><h1>${esc(current.title || 'Open the paths slowly.')}</h1></div><p>${totalVotes(current)} anonymous ${totalVotes(current) === 1 ? 'vote' : 'votes'} placed. Counts invite discussion; they do not rank thinkers.</p></section>
    <div class="problem-ribbon"><span>Problem</span><p>${esc(current.problem || 'Add a problem in Shape.')}</p></div>
    ${current.branches.length ? `<section class="path-board" aria-label="Approach branches">${current.branches.map((branch, index) => `<article class="path-tile ${branch.pathRevealed ? 'revealed' : ''}">
      <div class="tile-top"><span class="tile-index">${String(index + 1).padStart(2, '0')}</span><span class="vote-count"><b>${branch.votes}</b> ${branch.votes === 1 ? 'vote' : 'votes'}</span></div>
      <h2>${esc(branch.title)}</h2><p>${esc(branch.firstStep || 'Let the group propose a first move.')}</p>
      ${branch.hintRevealed ? `<div class="reveal-block hint"><span>Opened hint</span><p>${esc(branch.hint || 'No hint was written for this path.')}</p></div>` : ''}
      ${branch.pathRevealed ? `<div class="reveal-block path"><span>Revealed path</span><p>${esc(branch.path || 'No facilitator note was written for this path.')}</p></div>` : ''}
      <div class="tile-actions"><button class="secondary-button" data-action="toggle-hint" data-id="${branch.id}" ${!branch.hint ? 'disabled' : ''}>${branch.hintRevealed ? 'Close hint' : 'Open hint'}</button><button class="${branch.pathRevealed ? 'secondary-button' : 'primary-button'}" data-action="toggle-path" data-id="${branch.id}">${branch.pathRevealed ? 'Fold path' : 'Reveal path'}</button></div>
      ${branch.rationales.length ? `<details><summary>Hear ${branch.rationales.length} ${branch.rationales.length === 1 ? 'reason' : 'reasons'}</summary><ul class="rationale-list">${branch.rationales.map(item => `<li>“${esc(item.text)}”</li>`).join('')}</ul></details>` : '<p class="no-reasons">No written reasons yet.</p>'}
    </article>`).join('')}</section>` : `<div class="empty-piece"><span class="empty-mark">Y</span><div><h2>No paths to open</h2><p>Return to Shape and add at least one approach.</p></div></div>`}
    ${current.alternativeIdeas.length ? `<section class="alternative-ideas"><p class="eyebrow">Paths from the room</p><h2>Ideas that arrived outside the tiles</h2><ul>${current.alternativeIdeas.map(item => `<li>${esc(item.text)}</li>`).join('')}</ul></section>` : ''}
  </main>`;
}

function renderRecap(current: CircleSession): string {
  return `<main id="main" class="workspace recap-workspace">
    <section class="recap-title"><div><p class="eyebrow">Session recap · ${new Date(current.updatedAt).toLocaleDateString()}</p><h1>${esc(current.title || 'Untitled circle')}</h1><p>${esc(current.problem || 'No problem prompt was added.')}</p></div><div class="recap-actions"><button class="primary-button" data-action="print">Print one-page recap</button><button class="secondary-button" data-action="export">Export data</button></div></section>
    <dl class="recap-stats"><div><dt>Ideas placed</dt><dd>${participationCount(current)}</dd></div><div><dt>Votes</dt><dd>${totalVotes(current)}</dd></div><div><dt>Paths opened</dt><dd>${current.branches.filter(b => b.pathRevealed).length}/${current.branches.length}</dd></div></dl>
    <section class="recap-paths" aria-labelledby="recap-paths-heading"><h2 id="recap-paths-heading">The paths we kept</h2>
      ${current.branches.length ? `<ol>${current.branches.map(branch => `<li><header><h3>${esc(branch.title)}</h3><span>${branch.votes} ${branch.votes === 1 ? 'vote' : 'votes'}</span></header><p>${esc(branch.path || branch.firstStep || 'No note added.')}</p>${branch.rationales.length ? `<ul>${branch.rationales.map(r => `<li>“${esc(r.text)}”</li>`).join('')}</ul>` : ''}</li>`).join('')}</ol>` : '<p>No approaches were recorded.</p>'}
    </section>
    ${current.alternativeIdeas.length ? `<section class="recap-alternatives"><h2>Other paths proposed</h2><ul>${current.alternativeIdeas.map(r => `<li>${esc(r.text)}</li>`).join('')}</ul></section>` : ''}
    <section class="reflection"><h2>Carry one question forward</h2><div class="reflection-line" aria-label="Blank line for a handwritten reflection"></div></section>
    <p class="print-credit">Made locally with Branching Problem Circle · no participant accounts</p>
  </main>`;
}

function templateDialog(): string {
  const unlocked = licenseState === 'unlocked';
  const statusText = licenseState === 'checking' ? 'Checking license…' : licenseState === 'offline' ? 'License check is unavailable offline.' : licenseState === 'invalid' ? 'This license is no longer active.' : unlocked ? 'Template pack unlocked on this device.' : 'Core circles are free. The optional pack adds reusable facilitation structures.';
  return `<dialog id="template-dialog" class="template-dialog" aria-labelledby="template-title">
    <div class="dialog-head"><div><p class="eyebrow">Facilitator shelf</p><h2 id="template-title">Begin with a useful shape.</h2></div><button class="icon-button" data-action="close-templates" aria-label="Close templates">×</button></div>
    <p>${statusText}</p>
    <div class="template-grid">${templates.map(template => `<article><div class="template-tag">${template.paid ? `${icon('lock')} Pack` : 'Included'}</div><h3>${esc(template.name)}</h3><p>${esc(template.description)}</p><button class="secondary-button" data-action="use-template" data-id="${template.id}" ${template.paid && !unlocked ? 'disabled' : ''}>Use template</button></article>`).join('')}</div>
    ${!unlocked ? `<aside class="unlock-panel"><div>${icon('spark')}<h3>Facilitator template pack</h3><p>Four repeatable session shapes · US $12 one-time purchase. Checkout and refunds are handled by Sociobot/Dodo.</p></div><a class="primary-button link-button" href="${CHECKOUT_URL}">Buy the pack</a></aside>
    <form id="license-form" class="license-form"><label for="license-token">Have a license? Paste it here</label><div><input id="license-token" name="token" required autocomplete="off" /><button class="secondary-button" type="submit">Restore purchase</button></div></form>` : `<button class="text-button" data-action="forget-license">Remove license from this device</button>`}
    <p class="dialog-legal"><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></p>
  </dialog>`;
}

function render(): void {
  if (loading) {
    app.innerHTML = `<main id="main" class="loading-piece" aria-live="polite"><div class="loading-tile"></div><h1>Setting the thinking table…</h1></main>`;
    return;
  }
  const status = `<div class="toast-region" aria-live="polite" aria-atomic="true">${error ? `<div class="toast error">${esc(error)}<button data-action="dismiss-status" aria-label="Dismiss message">×</button></div>` : notice ? `<div class="toast">${esc(notice)}<button data-action="dismiss-status" aria-label="Dismiss message">×</button></div>` : ''}</div>`;
  if (!circle) app.innerHTML = `${renderWelcome()}${status}${showTemplates ? templateDialog() : ''}<input id="import-input" aria-label="Import circle JSON file" class="visually-hidden" type="file" accept="application/json,.json" />`;
  else {
    const phaseContent = circle.phase === 'shape' ? renderShape(circle) : circle.phase === 'vote' ? renderVote(circle) : circle.phase === 'explore' ? renderExplore(circle) : renderRecap(circle);
    app.innerHTML = `${appHeader(circle)}${phaseContent}${footer()}${status}${showTemplates ? templateDialog() : ''}<input id="import-input" aria-label="Import circle JSON file" class="visually-hidden" type="file" accept="application/json,.json" />`;
  }
  if (showTemplates) {
    const dialog = document.querySelector<HTMLDialogElement>('#template-dialog');
    dialog?.showModal();
    dialog?.addEventListener('cancel', () => { showTemplates = false; render(); }, { once: true });
  }
}

async function persist(message?: string): Promise<void> {
  if (!circle) return;
  try { await saveCircle(circle); error = ''; if (message) notice = message; }
  catch (reason) { error = reason instanceof Error ? reason.message : 'The circle could not be saved.'; }
  render();
}

function setPhase(phase: Phase): void {
  if (!circle) return;
  editingBranchId = null;
  circle.phase = phase;
  void persist();
}

function downloadData(): void {
  if (!circle) return;
  const blob = new Blob([JSON.stringify(circle, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${(circle.title || 'problem-circle').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.json`;
  link.click();
  URL.revokeObjectURL(url);
  notice = 'A portable JSON copy was downloaded.';
  render();
}

app.addEventListener('click', event => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('[data-action], [data-phase]');
  if (!target) return;
  if (target.dataset.phase) { setPhase(target.dataset.phase as Phase); return; }
  const action = target.dataset.action;
  if (action === 'new-circle') { circle = makeCircle(); void persist('A blank thinking table is ready.'); }
  if (action === 'templates') { showTemplates = true; render(); }
  if (action === 'close-templates') { showTemplates = false; render(); }
  if (action === 'dismiss-status') { notice = ''; error = ''; render(); }
  if (action === 'add-branch' && circle) { editingBranchId = 'new'; render(); document.querySelector('#branch-editor-heading')?.scrollIntoView({ behavior: 'smooth' }); }
  if (action === 'cancel-branch') { editingBranchId = null; render(); }
  if (action === 'edit-branch') { editingBranchId = target.dataset.id ?? null; render(); document.querySelector('#branch-editor-heading')?.scrollIntoView({ behavior: 'smooth' }); }
  if (action === 'delete-branch' && circle) {
    const branch = circle.branches.find(item => item.id === target.dataset.id);
    if (branch && confirm(`Remove “${branch.title}” and its ${branch.votes} votes? This cannot be undone.`)) {
      circle.branches = circle.branches.filter(item => item.id !== branch.id); void persist(`“${branch.title}” was removed.`);
    }
  }
  if ((action === 'toggle-hint' || action === 'toggle-path') && circle) {
    const branch = circle.branches.find(item => item.id === target.dataset.id);
    if (branch) { if (action === 'toggle-hint') branch.hintRevealed = !branch.hintRevealed; else branch.pathRevealed = !branch.pathRevealed; void persist(); }
  }
  if (action === 'export') downloadData();
  if (action === 'import') document.querySelector<HTMLInputElement>('#import-input')?.click();
  if (action === 'clear-circle' && circle && confirm(`Clear “${circle.title || 'this circle'}” and all of its anonymous votes from this device? Export first if you want to keep it.`)) {
    const clearedTitle = circle.title || 'The circle';
    circle = undefined;
    editingBranchId = null;
    void clearCircle().then(() => { notice = `${clearedTitle} was cleared from this device.`; render(); }).catch(() => { error = 'The circle could not be cleared. Try again.'; render(); });
  }
  if (action === 'print') window.print();
  if (action === 'install' && installPrompt) { void installPrompt.prompt().then(() => { installPrompt = null; render(); }); }
  if (action === 'forget-license') { forgetLicense(); licenseState = 'free'; render(); }
  if (action === 'use-template') {
    const template = templates.find(item => item.id === target.dataset.id);
    if (template && (!template.paid || licenseState === 'unlocked')) {
      const replace = !circle || confirm(`Replace “${circle.title || 'your current circle'}” with the ${template.name} template? Export first if you want to keep it.`);
      if (replace) { circle = template.build(); showTemplates = false; void persist(`${template.name} is ready to shape.`); }
    }
  }
});

app.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (form.id === 'problem-form' && circle) {
    circle.title = String(data.get('title') ?? '').trim(); circle.problem = String(data.get('problem') ?? '').trim();
    circle.source = String(data.get('source') ?? '').trim(); circle.rightsConfirmed = data.get('rights') === 'on';
    void persist('Problem saved on this device.');
  }
  if (form.id === 'branch-form' && circle) {
    const id = form.dataset.id ?? createId();
    let branch = circle.branches.find(item => item.id === id);
    if (!branch) { branch = { ...makeBranch(), id }; circle.branches.push(branch); }
    branch.title = String(data.get('title') ?? '').trim(); branch.firstStep = String(data.get('firstStep') ?? '').trim();
    branch.hint = String(data.get('hint') ?? '').trim(); branch.path = String(data.get('path') ?? '').trim();
    editingBranchId = null; void persist(`“${branch.title}” is on the table.`);
  }
  if (form.id === 'vote-form' && circle) {
    const branchId = String(data.get('branch') ?? ''); const rationale = String(data.get('rationale') ?? '').trim(); const alternative = String(data.get('alternative') ?? '').trim();
    const errorNode = form.querySelector('#vote-error');
    if ((!branchId && !alternative) || (branchId && !rationale && !alternative)) {
      if (errorNode) errorNode.textContent = branchId ? 'Add one reason or offer a different path.' : 'Choose a path or offer a different one.';
      return;
    }
    const now = Date.now();
    if (branchId) { const branch = circle.branches.find(item => item.id === branchId); if (branch) { branch.votes += 1; if (rationale) branch.rationales.push({ id: createId(), text: rationale, createdAt: now }); } }
    if (alternative) circle.alternativeIdeas.push({ id: createId(), text: alternative, createdAt: now });
    void persist('Idea placed. Pass the device to the next thinker.');
  }
  if (form.id === 'license-form') {
    const token = String(data.get('token') ?? '').trim();
    if (token) { restoreLicense(token); licenseState = 'checking'; render(); void verifyLicense(true).then(state => { licenseState = state; render(); }); }
  }
});

app.addEventListener('change', event => {
  const input = event.target as HTMLInputElement;
  if (input.id !== 'import-input' || !input.files?.[0]) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = validateImport(JSON.parse(String(reader.result)));
      if (circle && !confirm(`Replace “${circle.title || 'your current circle'}” with “${imported.title || 'the imported circle'}”?`)) return;
      circle = imported; void persist('Imported circle saved on this device.');
    } catch (reason) { error = reason instanceof Error ? reason.message : 'That file could not be imported.'; render(); }
  };
  reader.onerror = () => { error = 'That file could not be read. Try exporting it again.'; render(); };
  reader.readAsText(input.files[0]);
});

app.addEventListener('keydown', event => {
  const tab = (event.target as HTMLElement).closest<HTMLElement>('[role="tab"]');
  if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const tabs = [...document.querySelectorAll<HTMLElement>('[role="tab"]')];
  const index = tabs.indexOf(tab);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].focus(); tabs[next].click();
});

window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event as BeforeInstallPromptEvent; render(); });
window.addEventListener('online', render); window.addEventListener('offline', render);

async function start(): Promise<void> {
  captureLicense();
  licenseState = cachedLicenseState();
  try { circle = await loadCircle(); } catch (reason) { error = reason instanceof Error ? reason.message : 'Local storage is unavailable.'; }
  loading = false; render();
  if (licenseState !== 'free') { licenseState = await verifyLicense(); render(); }
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        worker?.addEventListener('statechange', () => { if (worker.state === 'activated' && navigator.serviceWorker.controller) { notice = 'The offline app has been updated.'; render(); } });
      });
    } catch { /* The app remains usable without install support. */ }
  }
}

void start();
