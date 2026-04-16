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

      requestAnimationFrame(() => {
        if (callback) callback();
      });
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

let carouselInterval = null;

function initCarousel() {
  const track = document.getElementById("carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  const currentText = document.getElementById("carousel-current");
  const totalText = document.getElementById("carousel-total");

  if (!track || slides.length === 0) return;

  let index = 0;
  const total = slides.length;

  if (totalText) totalText.textContent = total;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.style.width = "20px";
        dot.style.background = "#44D5E8";
      } else {
        dot.style.width = "6px";
        dot.style.background = "rgba(255,255,255,0.2)";
      }
    });

    if (currentText) currentText.textContent = index + 1;
  }

  function move(direction) {
    index = (index + direction + total) % total;
    updateCarousel();
  }

  function goTo(i) {
    index = i;
    updateCarousel();
  }


  window.carouselMove = move;
  window.carouselGoTo = goTo;


  if (carouselInterval) {
    clearInterval(carouselInterval);
  }

  carouselInterval = setInterval(() => {
    move(1);
  }, 2000);


  if (!window.__carouselResizeBound) {
    window.addEventListener("resize", updateCarousel);
    window.__carouselResizeBound = true;
  }

  updateCarousel();
}

loadSection("navbar", "navbar.html", initNavbar);
loadSection("hero", "hero.html", initCarousel);
loadSection("features", "features.html");
loadSection("about", "about.html");
loadSection("cta", "cta.html");
loadSection("footer", "footer.html");