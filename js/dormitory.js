document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  initAnimations();

  // Initialize scroll spy for navigation
  initScrollSpy();
});

function initAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(
    ".animate-slide-up, .animate-slide-left, .animate-slide-right"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    if (element.classList.contains("animate-slide-up")) {
      element.style.transform = "translateY(50px)";
    } else if (element.classList.contains("animate-slide-left")) {
      element.style.transform = "translateX(-50px)";
    } else if (element.classList.contains("animate-slide-right")) {
      element.style.transform = "translateX(50px)";
    }
    observer.observe(element);
  });
}

function initScrollSpy() {
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Add parallax effect to hero section
window.addEventListener("scroll", function () {
  const hero = document.querySelector(".dormitory-hero");
  if (hero) {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + "px";
  }
});
