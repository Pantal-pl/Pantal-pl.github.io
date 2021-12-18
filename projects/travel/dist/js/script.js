let triggerStart;

const toggleMenuBtn = document.querySelector(".toggle-menu")
const mobileMenu = document.querySelector(".navbar-mobile")
const navbarMobileLinks = document.querySelectorAll(".link-mobile")

navbarMobileLinks.forEach(link => {
  link.addEventListener("click",()=>{
    mobileMenu.classList.remove("navbar-mobile-active")
    document.querySelector("body").classList.remove("navbar-mobile-active")
  })
});
toggleMenuBtn.addEventListener("click", ()=>{
  mobileMenu.classList.toggle("navbar-mobile-active")
  document.querySelector("body").classList.toggle("navbar-mobile-active")
})

const CTAButton = document.querySelector(".get-start")
setInterval(()=>{
    CTAButton.classList.toggle("jello-horizontal")
},1500)
gsap.registerPlugin(ScrollTrigger);

if(window.innerWidth <=400 ? triggerStart=220 : triggerStart=130);

const sections = document.querySelectorAll('section');
sections.forEach(section => {
  gsap.fromTo(section.children, {y: '+=200', opacity: .30}, {y: 0, opacity: 1, duration: .5, ease: 'easeInOut', scrollTrigger: {
  trigger: section,
  start: `top ${triggerStart}%`,
  scrub:1,
}});  
});
