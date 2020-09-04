if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });

  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();

    deferredPrompt = event;

    document.querySelector(".header__install").classList.toggle("hidden");
  });

  document
    .querySelector(".header__install")
    .addEventListener("click", function () {
      document.querySelector(".header__install").classList.add("hidden");
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
      });
    });
}

// Notifikation

let params = new URLSearchParams(window.location.search);
const category = params.get("teamId");

//   let key = "a5a4d5c58a0c4b919432efda878b0473";
let key = "0680b02955df429a92dd6bdd50d42210";
if (category !== null) {
  console.log(category)
  fetch(
    `https://api.sportsdata.io/v3/csgo/scores/json/MembershipsByTeam/${category}?key=${key}`
    // `https://api.sportsdata.io/v3/csgo/scores/json/ActiveMemberships?key=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      Notification.requestPermission(function (status) {
        console.log("Notification permission status:", status);
        if (Notification.permission == "granted") {
          document
            .querySelector(".sub")
            .addEventListener("click", function (event) {
              console.log(
                `Show notification message: "You now get notifications of ${data[0].TeamName}"`
              );
              navigator.serviceWorker.getRegistration().then(function (reg) {
                const title = data[0].TeamName;
                var options = {
                  body: `You now get notifications of ${data[0].TeamName}`,
                  icon: "/assets/images/placeholderGroup.png",
                  vibrate: [200, 100, 200, 100, 200, 100, 400],
                  data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1,
                  },
                  actions: [
                    {
                      action: "close",
                      title: "Close notification",
                      icon: "/assets/images/xmark.png",
                    },
                  ],
                };

                reg.showNotification(title, options);
              });
            });
        }
      });
    })
    .catch((err) => console.log(err));
}

// let key = "a5a4d5c58a0c4b919432efda878b0473";
// fetch(
//   `https://api.sportsdata.io/v3/csgo/scores/json/MembershipsByTeam/100000078?key=${key}`
//   // `https://api.sportsdata.io/v3/csgo/scores/json/ActiveMemberships?key=${key}`
// )
//   .then((response) => response.json())
//   .then((data) => {
//     document.getElementsByClassName("testBtn").addEventListener("click", function (event) {
//     // self.addEventListener("push", function (event) {
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
// actions: [
//   {
//     action: "explore",
//     title: "Explore the app",
//     icon: "/assets/images/checkmark.png",
//   },
//   {
//     action: "close",
//     title: "Close notification",
//     icon: "/assets/images/xmark.png",
//   },
// ],
//       };

//       event.waitUntil(self.registration.showNotification(title, options));
//     });
//   })
//   .catch((err) => console.log(err));
