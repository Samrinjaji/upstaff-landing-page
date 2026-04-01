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