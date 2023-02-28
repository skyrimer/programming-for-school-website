Prism.plugins.autoloader.languages_path = "/static/node_modules/prismjs/components/";
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);
const duration = 0.5;
const animationStartPosition = "top 80%";
const swup = new Swup({
  plugins: [
    new SwupScrollPlugin({
      doScrollingRightAway: true,
      offset: () => document.querySelector("nav.navbar").offsetHeight,
    }),
    new SwupSlideTheme({ reversed: false }),
    new SwupPreloadPlugin(),
  ],
});

window.onload = () => {
  document.querySelector(".loader-wrapper").style.opacity = 0;
  document.querySelector(".main-wrapper").style.opacity = 1;
};

const initialiseAllAnimations = () => {
  const onloadTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "section",
      start: animationStartPosition,
    },
  });
  if (document.querySelector(".cards-wrapper")) {
    const cardsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards-wrapper",
        start: animationStartPosition,
      },
    });
    cardsTimeline.from(".cards-wrapper", {
      x: 100,
      y: 100,
      opacity: 0,
      duration: duration,
    });
  }
  const cards = gsap.utils.toArray(".card");
  cards.forEach((card) => {
    gsap.from(card, {
      opacity: 1,
      scrollTrigger: {
        trigger: card,
        start: animationStartPosition,
      },
    });
  });
  if (document.querySelector(".skill-bars")) {
    document.querySelectorAll(".progress-line span").forEach((bar) => {
      bar.style.width = bar.dataset.progress + "%";
    });
    const skillsBarTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".bar",
        start: animationStartPosition,
      },
    });
    skillsBarTimeline.to(".info span", {
      opacity: 1,
      duration: duration,
    });
    skillsBarTimeline.to(".progress-line", {
      scaleX: 1,
      duration: duration,
    });
    skillsBarTimeline.to(".progress-line span", {
      scaleX: 1,
      duration: duration,
    });
    skillsBarTimeline.to(
      CSSRulePlugin.getRule(".progress-line span::after"),
      {
        opacity: 1,
        duration: duration,
      },
      `-=${duration}`
    );
    skillsBarTimeline.to(
      CSSRulePlugin.getRule(".progress-line span::before"),
      {
        opacity: 1,
        duration: duration,
      },
      `-=${duration}`
    );
  }
  const skills = gsap.utils.toArray(".card");
  skills.forEach((skill) => {
    gsap.from(skill, {
      opacity: 0,
      scrollTrigger: {
        trigger: skill,
        start: animationStartPosition,
      },
    });
  });
  if (document.querySelector("section .column img")) {
    onloadTimeline.from(".column-content", { x: -100, opacity: 0, duration: duration });
    onloadTimeline.from("section .column img", {
      x: 100,
      opacity: 0,
      duration: duration,
    });
  }
  onloadTimeline.from(
    "main section:not(:first-child)",
    { opacity: 0, duration: 1 },
    `-=${duration}`
  );

  VanillaTilt.init(document.querySelectorAll("[data-tilt-element]"), {
    max: 10,
    speed: 600,
    scale: 1.05,
  });
  document.querySelectorAll("code").forEach((block) => {
    Prism.highlightElement(block);
  });
};
initialiseAllAnimations();
swup.on("animationInStart", initialiseAllAnimations);

// const nav = document.querySelector("nav.navbar");

// const navbarObserver = new IntersectionObserver(
//   (entries, observer) => {
//     entries.forEach((entry) => {
//       nav.classList.toggle("glassy", entry.isIntersecting);
//     });
//   },
//   {
//     rootMargin: "0px",
//   }
// );
// navbarObserver.observe(document.querySelector("section"));
