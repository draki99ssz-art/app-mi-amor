const CACHE_NAME = 'mi-app-cache-v1';
const urlsToCache = [
  './index.html',
  './css/style.css',
  './css/style.mobile.css',
  './js/script.js',
  './js/hearts.js',
  './Music/No Hace Falta (Versión Acústica).mp4',
  './my-love-192.png',
  './my-love-512.png'
];

// Instalación: cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activación: limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// Fetch: servir archivos cacheados
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
