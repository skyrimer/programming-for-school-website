gsap.registerPlugin(ScrollTrigger);
const duration = 1;
const swup = new Swup();
const initialiseAllAnimations = () => {
  const onloadTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "section",
      start: "top 90%",
    },
  });

  const cardsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".cards-wrapper",
      start: "top 90%",
    },
  });
  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "section.footer",
      start: "top 90%",
    },
  });
  const cards = gsap.utils.toArray(".card");
  cards.forEach((card) => {
    gsap.from(card, {
      x: 100,
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
      },
    });
  });

  onloadTimeline.from(".column-content", { x: -100, opacity: 0, duration: duration });
  onloadTimeline.from("section.glassy .column img", {
    x: 100,
    opacity: 0,
    duration: duration,
  });
  onloadTimeline.from(
    "main section:not(:first-child)",
    { opacity: 0, duration: 1 },
    `-=${duration}`
  );
  cardsTimeline.from(".cards-wrapper", {
    x: 100,
    y: 100,
    opacity: 0,
    duration: duration,
  });
  footerTimeline.from("section.footer > .container", {
    y: 50,
    opacity: 0,
    duration: duration,
  });

  VanillaTilt.init(document.querySelectorAll("[data-tilt-element]"), {
    max: 10,
    speed: 600,
    scale: 1.05,
  });
};
initialiseAllAnimations();
swup.on("contentReplaced", initialiseAllAnimations);

const nav = document.querySelector("nav.navbar")

const navbarObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      nav.classList.toggle("glassy", entry.isIntersecting);
    });
  },
  {
    rootMargin: "0px",
  }
);
navbarObserver.observe(document.querySelector("section"));
