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

// Notification.requestPermission(function (status) {
//   console.log("Notification permission status:", status);
//   if (Notification.permission == "granted") {
//     navigator.serviceWorker.getRegistration().then(function (reg) {
//       var options = {
//         body: "Here is a notification body!",
//         icon: "assets/images/mario.png",
//         vibrate: [100, 50, 100],
//         data: {
//           dateOfArrival: Date.now(),
//           primaryKey: 1,
//         },
//         actions: [
//           {
//             action: "explore",
//             title: "Explore the app",
//             icon: "images/checkmark.png",
//           },
//           {
//             action: "close",
//             title: "Close notification",
//             icon: "images/xmark.png",
//           },
//         ],
//       };
//       reg.showNotification("Velkommen til Gulp + PWA template", options);
//     });
//   }
// });
