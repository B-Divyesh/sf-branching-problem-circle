import type { CircleSession } from './types';

const DB_NAME = 'branching-problem-circle';
const STORE = 'circles';
const ACTIVE_KEY = 'active';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
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
    const req = action(tx.objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(new Error('The circle could not be saved locally.'));
    tx.oncomplete = () => db.close();
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
