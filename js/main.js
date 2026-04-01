function loadSection(id, file) {
  fetch(`./sections/${file}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

// Load all sections
loadSection("navbar", "navbar.html");
loadSection("hero", "hero.html");
loadSection("features", "features.html");
loadSection("testimonials", "testimonials.html");
loadSection("cta", "cta.html");
loadSection("footer", "footer.html");

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  const currentText = document.getElementById("carousel-current");
  const totalText = document.getElementById("carousel-total");

  if (!track || slides.length === 0) return;

  let index = 0;
  const total = slides.length;

  totalText.textContent = total;

  function updateCarousel() {
    const width = slides[0].clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;

    // Update dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.style.width = "20px";
        dot.style.background = "#44D5E8"; // active dot color
      } else {
        dot.style.width = "6px";
        dot.style.background = "rgba(255,255,255,0.2)";
      }
    });

    // Update counter
    currentText.textContent = index + 1;
  }

  // Make functions global for onclick
  window.carouselMove = function(direction) {
    index += direction;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    updateCarousel();
  }

  window.carouselGoTo = function(i) {
    index = i;
    updateCarousel();
  }

  // Optional: auto-slide every 2s
  setInterval(() => {
    carouselMove(1);
  }, 2000);

  // Initial render
  updateCarousel();

  // Optional: resize listener for responsive
  window.addEventListener("resize", updateCarousel);
});