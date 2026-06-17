const CACHE = 'macro-v3';
const ASSETS = ['/macro-calculator/', '/macro-calculator/index.html'];

// Install: cache assets and immediately skip the waiting phase
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
));

// Activate: wipe old caches, take control of all open tabs immediately
self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));

self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then(r => r || fetch(e.request))
));
