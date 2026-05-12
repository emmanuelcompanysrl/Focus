const CACHE_NAME = 'focus-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icona.png',
  // Aggiungi qui i tuoi file CSS o JS (es. '/style.css', '/script.js')
];

// Installazione: salviamo i file nella cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Attivazione: pulizia vecchie cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch: serviamo i contenuti dalla cache se siamo offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
