let triggerStart = 110;
const section = document.querySelector("section");
const divSection = section.querySelectorAll("div");
gsap.registerPlugin(ScrollTrigger);

divSection.forEach((div) => {
  gsap.fromTo(
    div,
    { y: "+=200", opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: .75,
      ease: Power4.easeIn,
      scrollTrigger: {
        trigger: div,
        start: `top ${triggerStart}%`,
      },
    }
  );
});