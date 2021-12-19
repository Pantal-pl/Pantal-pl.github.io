const toggleMenuBtn = document.querySelector(".toggle-menu");
const mobileMenu = document.querySelector(".navbar-mobile");
const navbarMobileLinks = document.querySelectorAll(".link-mobile");
const spanNavbar = document.querySelectorAll(".span-navbar");

navbarMobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("navbar-mobile-active");
    document.querySelector("body").classList.remove("navbar-mobile-active");
  });
});
toggleMenuBtn.addEventListener("click", () => {
  spanNavbar[0].classList.toggle("span-active1");
  spanNavbar[1].classList.toggle("span-active2");
  spanNavbar[2].classList.toggle("span-active3");
  toggleMenuBtn.classList.toggle("toggleMenuBtn-active")
  mobileMenu.classList.toggle("navbar-mobile-active");
  document.querySelector("body").classList.toggle("navbar-mobile-active");
});

const housesLink = document.querySelector("#houses-link");
const housesList = document.querySelector(".houses-list");
housesLink.addEventListener("mouseenter", () => {
  housesList.style.display = "flex";
});
housesLink.addEventListener("mouseleave", () => {
  housesList.style.display = "none";
});

