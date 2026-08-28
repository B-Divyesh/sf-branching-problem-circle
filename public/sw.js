const VERSION = 'bpc-v2';
const SHELL = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;
const PRECACHE = [
  '/', '/index.html', '/demo', '/offline.html', '/privacy/', '/terms/', '/404.html', '/manifest.webmanifest',
  '/assets/ceramic-paths-768.webp', '/assets/ceramic-paths-1280.webp',
  '/icons/icon-192.png', '/icons/icon-512.png', '/icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(SHELL).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => ![SHELL, RUNTIME].includes(key)).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone();
      caches.open(RUNTIME).then(cache => cache.put(request, copy));
      return response;
    }).catch(async () => (await caches.match(request)) || (await caches.match('/')) || caches.match('/offline.html')));
    return;
  }

  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
      const copy = response.clone(); caches.open(RUNTIME).then(cache => cache.put(request, copy)); return response;
    })));
    return;
  }

  event.respondWith(fetch(request).then(response => {
    const copy = response.clone(); caches.open(RUNTIME).then(cache => cache.put(request, copy)); return response;
  }).catch(() => caches.match(request)));
});
