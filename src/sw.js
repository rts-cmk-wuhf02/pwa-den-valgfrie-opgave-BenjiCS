let cacheVersion = 1;
let cacheName = `static-cache-${cacheVersion}`;
let filesToCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/team/index.html",
  "/fallback.html",
  "/assets/css/style.css",
  "/assets/css/header.css",
  "/assets/images/csgo-icon.ico",
  "/assets/images/csgo-icon.png",
  "/assets/images/csgoicon.png",
  "/assets/images/placeholderGroup.png",
  "/assets/images/placeholderPlayer.png",
  "/assets/images/checkmark.png",
  "/assets/images/xmark.png",
  "/assets/javascript/data.js",
  "/assets/javascript/header.js",
  "/assets/javascript/leagues.js",
  "/assets/javascript/singleTeam.js",
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

const applicationServerPublicKey =
  "BFO1KBDiEAvarv9NlT_69UhcfqlpDbK8LsWr-SRNB9R0YoAeb67xDxcUl1JBlbclKJRrceMIo5-hIDsSt3_27_o";

/* eslint-enable max-len */

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// let key = "a5a4d5c58a0c4b919432efda878b0473";
// fetch(
//   `https://api.sportsdata.io/v3/csgo/scores/json/MembershipsByTeam/100000078?key=${key}`
//   // `https://api.sportsdata.io/v3/csgo/scores/json/ActiveMemberships?key=${key}`
// )
//   .then((response) => response.json())
//   .then((data) => {
//     self.addEventListener("push", function (event) {
//       console.log("[Service Worker] Push Received.");
//       console.log(
//         `[Service Worker] Push had this data: "${event.data.text()}"`
//       );

//       const title = data[0].TeamName;
//       var options = {
//         body: data[0].PlayerName,
//         icon: "/assets/images/csgo-icon.png",
//         vibrate: [200, 100, 200, 100, 200, 100, 400],
//         data: {
//           dateOfArrival: Date.now(),
//           primaryKey: 1,
//         },
//         actions: [
//           {
//             action: "explore",
//             title: "Explore the app",
//             icon: "/assets/images/checkmark.png",
//           },
//           {
//             action: "close",
//             title: "Close notification",
//             icon: "/assets/images/xmark.png",
//           },
//         ],
//       };

//       event.waitUntil(self.registration.showNotification(title, options));
//     });
//   })
//   .catch((err) => console.log(err));

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();
  var notification = event.notification;

  var action = event.action;

  if (action === "close") {
    notification.close();
  } else {
    clients.openWindow("https://google.com/");
    notification.close();
  }
});

self.addEventListener("pushsubscriptionchange", function (event) {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired.");
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      .then(function (newSubscription) {
        // TODO: Send to application server
        console.log("[Service Worker] New subscription: ", newSubscription);
      })
  );
});
