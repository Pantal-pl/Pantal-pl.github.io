let triggerStart;
const sections = document.querySelectorAll("section");

gsap.registerPlugin(ScrollTrigger);

if (window.innerWidth <= 400 ? (triggerStart = 220) : (triggerStart = 130));

sections.forEach((section) => {
  gsap.fromTo(
    section.children,
    { y: "+=200", opacity: 0.3 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "easeInOut",
      scrollTrigger: {
        trigger: section,
        start: `top ${triggerStart}%`,
        scrub: 1,
      },
    }
  );
});
