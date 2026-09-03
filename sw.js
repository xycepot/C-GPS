const CACHE_NAME = 'gps-app-v1';

// Saat Service Worker di-install
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Saat Service Worker aktif
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Menangani Fetch request dengan aman (mencegah crash saat offline/online)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
