document
  .querySelector(".header__toggle")
  .addEventListener("click", function navFunc() {
    document.querySelector(".header__ul").classList.toggle("header__show");
  });

// var header = document.querySelector(".header");
// var sticky = header.offsetHeight;

// window.onscroll = function () {
//   // function stickyNav() {
//     if (window.pageYOffset >= sticky) {
//       console.log(window.pageYOffset)
//       document.querySelector(".header").classList.add("header__sticky");
//     } else {
//       header.classList.remove("header__sticky");
//     }
//   // }
// };
