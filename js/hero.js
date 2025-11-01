document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-bg-slide");
  let currentSlide = 0;

  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Smooth scroll for the scroll down button
  document
    .querySelector(".scroll-down")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const welcomeSection = document.querySelector("#welcome");
      welcomeSection.scrollIntoView({ behavior: "smooth" });
    });
});
