function loadSection(id, file, callback) {
  fetch(`./sections/${file}`)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then(data => {
      const el = document.getElementById(id);
      if (!el) return;

      el.innerHTML = data;

      if (callback) callback();
    })
    .catch(err => console.error(err));
}

function initNavbar() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !mobileMenu) return;

  const newBtn = menuBtn.cloneNode(true);
  menuBtn.replaceWith(newBtn);

  newBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  const links = mobileMenu.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Initialize carousel
function initCarousel() {
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

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.style.width = "20px";
        dot.style.background = "#44D5E8";
      } else {
        dot.style.width = "6px";
        dot.style.background = "rgba(255,255,255,0.2)";
      }
    });

    currentText.textContent = index + 1;
  }

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

  setInterval(() => carouselMove(1), 2000);
  updateCarousel();
  window.addEventListener("resize", updateCarousel);
}

loadSection("navbar", "navbar.html", initNavbar);
loadSection("hero", "hero.html", initCarousel);
loadSection("features", "features.html");
loadSection("about", "about.html");


/* function loadSection(id, file, callback) {
  fetch(`./sections/${file}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback(); // initialize after load
    });
}

// Initialize carousel
function initCarousel() {
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

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.style.width = "20px";
        dot.style.background = "#44D5E8";
      } else {
        dot.style.width = "6px";
        dot.style.background = "rgba(255,255,255,0.2)";
      }
    });

    currentText.textContent = index + 1;
  }

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

  setInterval(() => carouselMove(1), 3000);
  updateCarousel();
  window.addEventListener("resize", updateCarousel);
}

// Load all sections, init carousel after hero loads
loadSection("navbar", "navbar.html");
loadSection("hero", "hero.html", initCarousel); // <-- callback here
loadSection("features", "features.html");
loadSection("testimonials", "testimonials.html");
loadSection("cta", "cta.html");
loadSection("footer", "footer.html"); */