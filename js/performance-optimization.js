/**
 * Target International School Website
 * Performance optimizations
 */

// Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  // Convert all images to lazy loading
  const images = document.querySelectorAll("img:not([loading])");
  images.forEach((img) => {
    img.setAttribute("loading", "lazy");
  });

  // Lazy load background images
  const lazyBackgrounds = document.querySelectorAll(".lazy-background");

  if ("IntersectionObserver" in window) {
    const lazyBackgroundObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyBackground = entry.target;
            lazyBackground.style.backgroundImage =
              lazyBackground.dataset.background;
            lazyBackgroundObserver.unobserve(lazyBackground);
          }
        });
      }
    );

    lazyBackgrounds.forEach((lazyBackground) => {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }

  // Optimize carousel performance
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    // Pause carousel when not in viewport to save resources
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          let carouselInstance = null;
          try {
            carouselInstance = bootstrap.Carousel.getInstance(carousel);
          } catch (e) {
            console.warn(
              "Bootstrap Carousel not properly initialized for",
              carousel
            );
          }
          if (!entry.isIntersecting && carouselInstance) {
            carouselInstance.pause();
          } else if (entry.isIntersecting && carouselInstance) {
            carouselInstance.cycle();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(carousel);
  });

  // Debounce scroll events for better performance
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
      const args = arguments;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  }

  // Apply debounce to scroll handlers
  const scrollHandlers = ["scroll", "resize"];
  scrollHandlers.forEach((event) => {
    window.addEventListener(
      event,
      debounce(() => {
        // Handle animations on scroll
        const animatedElements = document.querySelectorAll(
          ".animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-slide-up"
        );

        if (animatedElements.length > 0) {
          animatedElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const isInViewport =
              rect.top <=
              (window.innerHeight || document.documentElement.clientHeight) *
                0.8;

            if (isInViewport && element.style.opacity === "0") {
              element.style.opacity = "1";
            }
          });
        }

        // Handle back to top button visibility
        const backToTopButton = document.querySelector(".back-to-top");
        if (backToTopButton) {
          if (window.pageYOffset > 300) {
            backToTopButton.classList.add("show");
          } else {
            backToTopButton.classList.remove("show");
          }
        }
      })
    );
  });
});

// Preload critical resources
function preloadCriticalResources() {
  const resources = [
    "/img/article-original (1).png", // School logo
    "/img/sergelii.jfif", // Hero image
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  ];

  resources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = resource.endsWith(".css") ? "style" : "image";
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Call preload function
preloadCriticalResources();
