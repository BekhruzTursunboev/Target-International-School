/**
 * Target International School Website
 * Main JavaScript file
 */

document.addEventListener("DOMContentLoaded", function () {
  // Animation on scroll
  const animatedElements = document.querySelectorAll(
    ".animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-slide-up"
  );

  if (animatedElements.length > 0) {
    // Initially set all elements to opacity 0
    animatedElements.forEach((element) => {
      element.style.opacity = "0";
    });

    // Function to check if element is in viewport
    const isInViewport = function (element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8
      );
    };

    // Function to handle scroll animation
    const handleScrollAnimation = function () {
      animatedElements.forEach((element) => {
        if (isInViewport(element) && element.style.opacity === "0") {
          element.style.opacity = "1";
        }
      });
    };

    // Initial check on load
    handleScrollAnimation();

    // Check on scroll
    window.addEventListener("scroll", handleScrollAnimation);
  }

  // Back to top button functionality
  const backToTopButton = document.querySelector(".back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Language switcher
  const langLinks = document.querySelectorAll(".lang-link");

  langLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = link.getAttribute("data-lang");
      if (lang) {
        setLanguage(lang);

        // Update active state
        langLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // Initialize language on page load
  const currentLang = getCurrentLanguage();
  langLinks.forEach((link) => {
    if (link.getAttribute("data-lang") === currentLang) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
  updatePageContent();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#") {
        e.preventDefault();

        const targetElement = document.querySelector(href);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Mobile menu behavior with animation
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    // Add animation class to navbar links
    const navLinks = navbarCollapse.querySelectorAll(".nav-link");
    navLinks.forEach((link, index) => {
      link.classList.add("animate-fade-in");
      link.style.transitionDelay = `${0.1 * (index + 1)}s`;
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        navbarCollapse.classList.contains("show") &&
        !navbarCollapse.contains(e.target) &&
        !navbarToggler.contains(e.target)
      ) {
        navbarToggler.click();
      }
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }
      });
    });
  }

  // Campus map tabs functionality
  const campusTabs = document.querySelectorAll('[data-bs-toggle="tab"]');

  if (campusTabs.length > 0) {
    campusTabs.forEach((tab) => {
      tab.addEventListener("shown.bs.tab", function (e) {
        // Get the target map iframe
        const targetId = e.target.getAttribute("data-bs-target");
        const mapIframe = document.querySelector(`${targetId} iframe`);

        if (mapIframe) {
          // Refresh the map by reloading the iframe src
          const src = mapIframe.getAttribute("src");
          mapIframe.setAttribute("src", src);
        }
      });
    });
  }
});
