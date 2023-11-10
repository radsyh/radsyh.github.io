// Toggle class active
const nvabarNav = document.querySelector(".navbar-nav");

// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  nvabarNav.classList.toggle("active");
};

// klik diluar sidebar untuk menghilangkan hamburger
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !nvabarNav.contains(e.target)) {
    nvabarNav.classList.remove("active");
  }
});
