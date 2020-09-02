let cacheVersion = 2;
let cacheName = `static-cache-${cacheVersion}`;
let filesToCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/news/index.html",
  "/fallback.html",
  "/assets/css/style.css",
  "/assets/images/csgo-icon.ico",
  "/assets/images/csgo-icon.png",
  "/assets/images/csgoicon.png",

  //   '/css/styles.css',
  //   '/js/scripts.js',
  //   '/images/logo.svg',
];

self.addEventListener("install", function (event) {
  console.log("service worker installed");
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("[ServiceWorker] Caching app shell");
      cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("install", function (event) {
  console.log("service worker installed");
});

self.addEventListener("activate", function (e) {
  // console.log("activate", e);
  e.waitUntil(
    caches.keys().then(function (keys) {
      if (e != cacheName) caches.delete(e);
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  // console.log("fetch", event);
  event.respondWith(
    caches.open(cacheName).then(function (cache) {
      return cache
        .match(event.request)
        .then(function (response) {
          return (
            response ||
            fetch(event.request).then(function (response) {
              cache.put(event.request, response.clone());
              return response;
            })
          );
        })
        .catch(function () {
          return caches.match("/fallback.html");
        });
    })
  );
});
