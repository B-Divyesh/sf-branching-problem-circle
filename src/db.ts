import type { CircleSession } from './types';

const DB_NAME = 'branching-problem-circle';
const STORE = 'circles';
const ACTIVE_KEY = 'active';

function databaseName(): string {
  return location.pathname === '/demo' || new URLSearchParams(location.search).get('demo') === '1'
    ? `${DB_NAME}-demo` : DB_NAME;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName(), 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('Your browser could not open local storage.'));
  });
}

async function request<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    let result: T;
    let settled = false;
    const fail = () => {
      if (settled) return;
      settled = true;
      db.close();
      reject(new Error('The circle could not be saved locally.'));
    };
    let req: IDBRequest<T>;
    try { req = action(tx.objectStore(STORE)); }
    catch { fail(); return; }
    req.onsuccess = () => { result = req.result; };
    req.onerror = fail;
    tx.onerror = fail;
    tx.onabort = fail;
    tx.oncomplete = () => {
      if (settled) return;
      settled = true;
      db.close();
      resolve(result);
    };
  });
}

export async function loadCircle(): Promise<CircleSession | undefined> {
  return request('readonly', store => store.get(ACTIVE_KEY));
}

export async function saveCircle(circle: CircleSession): Promise<void> {
  circle.updatedAt = Date.now();
  await request('readwrite', store => store.put(circle, ACTIVE_KEY));
}

export async function clearCircle(): Promise<void> {
  await request('readwrite', store => store.delete(ACTIVE_KEY));
}
