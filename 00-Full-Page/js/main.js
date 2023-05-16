gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();

  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      // add class
      link.classList.add("animate-out");
      setTimeout(() => {
        // remove class
        link.classList.remove("animate-out");
      }, 300);
    });
  });

  const navAnimation = (direction) => {
    // if user scrolling down, const scrollingDown = true
    const scrollingDown = direction === 1;
    const links = scrollingDown? mainNavLinks: mainNavLinksRev;
    // fade them out (autoAlpha 0) / fade them in (autoAlpha 1) and pushing them down (y 20)
    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => (scrollingDown ? 0 : 1),
      y: () => (scrollingDown ? 20 : 0),
      ease: 'power4.out'
    });
  };

  ScrollTrigger.create({
    // when we scroll down 100pixels we will add class 'has-scrolled' to body
    start: 100,
    end: 'bottom bottom+=20',
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({ direction }) => navAnimation(direction),
    // checking the direction of the scroll to see if we're scrolling up or down
    onLeaveBack: ({ direction }) => navAnimation(direction),
    markers: true,
  });
}

function init() {
  initNavigation();
  // start here
}

window.addEventListener("load", function () {
  init();
});
