// Define un nombre y versión para la caché
const CACHE_NAME = 'tec4-eval-inic-cache-v1';

// Lista de archivos para almacenar en caché.
// Como tu CSS está dentro del HTML, solo necesitamos cachear el index.html
const urlsToCache = [
  '/TEC4EvalInic/',
  '/TEC4EvalInic/index.html'
];

// Evento 'install': se dispara cuando el service worker se instala.
// Aquí es donde guardamos los archivos de la aplicación en la caché.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la página realiza una petición de red.
// Interceptamos la petición para servir archivos desde la caché si es posible.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si encontramos una respuesta en la caché, la devolvemos.
        if (response) {
          return response;
        }
        // Si no, realizamos la petición a la red.
        return fetch(event.request);
      }
    )
  );
});