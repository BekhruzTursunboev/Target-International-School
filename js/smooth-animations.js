/**
 * Target International School Website
 * Smooth animations and transitions
 */

document.addEventListener("DOMContentLoaded", () => {
  // Smooth page transitions
  const links = document.querySelectorAll(
    'a:not([href^="#"]):not([target="_blank"]):not([href^="mailto:"]):not([href^="tel:"])'
  );

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only apply to internal links
      if (this.hostname === window.location.hostname) {
        e.preventDefault();

        // Add fade-out effect
        document.body.classList.add("page-transition-out");

        // Navigate after transition
        setTimeout(() => {
          window.location.href = this.href;
        }, 300);
      }
    });
  });

  // Add fade-in effect when page loads
  document.body.classList.add("page-transition-in");

  // Smooth scrolling with easing function
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#") {
        e.preventDefault();

        const targetElement = document.querySelector(href);

        if (targetElement) {
          const headerOffset = 80; // Adjust based on your fixed header height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          // Smooth scroll with easing
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Enhance hover animations
  const hoverElements = document.querySelectorAll(
    ".program-card, .news-card, .campus-card, .contact-info-card, .social-link, .btn"
  );

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transition =
        "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.transition = "all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)";
    });
  });

  // Add parallax effect to hero images
  const heroImages = document.querySelectorAll(
    ".carousel-item img, .banner-image img, .results-hero-bg"
  );

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;

    heroImages.forEach((image) => {
      // Only apply parallax if image is in viewport
      const rect = image.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Parallax effect - move image slightly as user scrolls
        image.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    });
  });

  // Add subtle animations to statistics counters
  const statNumbers = document.querySelectorAll(
    ".stat-number, .stats-number, .animated-counter"
  );

  // Animate counter function
  function animateCounter(
    element,
    target,
    duration = 2000,
    prefix = "",
    suffix = ""
  ) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        start += increment;
        element.textContent = prefix + Math.floor(start) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Use Intersection Observer to trigger counter animations when visible
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = Number.parseFloat(
            element.textContent.replace(/[^\d.-]/g, "")
          );
          const prefix = element.textContent.match(/^[^\d]*/)[0] || "";
          const suffix = element.textContent.match(/[^\d]*$/)[0] || "";

          animateCounter(element, target, 2000, prefix, suffix);
          counterObserver.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((counter) => {
    counterObserver.observe(counter);
  });
});
