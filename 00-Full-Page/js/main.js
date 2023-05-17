gsap.registerPlugin(ScrollTrigger);

// animation for the nav bar
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
    const links = scrollingDown ? mainNavLinks : mainNavLinksRev;
    // fade them out (autoAlpha 0) / fade them in (autoAlpha 1) and pushing them down (y 20)
    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => (scrollingDown ? 0 : 1),
      y: () => (scrollingDown ? 20 : 0),
      ease: "power4.out",
    });
  };

  ScrollTrigger.create({
    // when we scroll down 100pixels we will add class 'has-scrolled' to body
    start: 100,
    end: "bottom bottom+=20",
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({ direction }) => navAnimation(direction),
    // checking the direction of the scroll to see if we're scrolling up or down
    onLeaveBack: ({ direction }) => navAnimation(direction),
  });
}

//animation for the header (hero page)
function initHeaderTilt() {
  document.querySelector("header").addEventListener("mousemove", moveImages);
}

function moveImages(e) {
  const { offsetX, offsetY, target } = e;
  // will give us current size of the header
  // give us -0.5 and 0.5 when were on the edge of the screen
  const { clientWidth, clientHeight } = target;

  // get 0 0 when were in the center of the screen

  const xPos = offsetX / clientWidth - 0.5;
  const yPos = offsetY / clientHeight - 0.5;

  const leftImages = gsap.utils.toArray(".hg__left .hg__image");
  const rightImages = gsap.utils.toArray(".hg__right .hg__image");

  const modifier = (index) => index * 1.2 + 0.5;
  // move left 3 images
  leftImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * 20 * modifier(index),
      y: yPos * 30 * modifier(index),
      rotationY: xPos*40,
      rotationX: yPos*10
    });
  });

  rightImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * 20 * modifier(index),
      y: yPos * -30 * modifier(index),
      rotationY: xPos*40,
      rotationX: yPos*10
    })
  })

  gsap.to('.decor__circle', {
    duration: 1.7,
    x: 100 * xPos,
    y: 120 * yPos,
    ease: 'power4.out'
  })
}

function init() {
  initNavigation();
  initHeaderTilt();
}

window.addEventListener("load", function () {
  init();
});
