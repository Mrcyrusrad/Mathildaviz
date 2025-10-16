// scroll-effects.js — handles background fades, section reveals, and subtle scroll polish
export function initScrollEffects() {
  /* -------------------------------
     FADE-IN ELEMENTS
  ------------------------------- */
  const fadeElements = document.querySelectorAll(".fade-in, .transition-line");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeElements.forEach(el => observer.observe(el));

  /* -------------------------------
     PAGE 2 GRADIENT DARKEN EFFECT
  ------------------------------- */
  window.addEventListener("scroll", () => {
    const page2 = document.getElementById("page2");
    if (!page2) return;

    const scrollPos = window.scrollY;
    const maxDarkness = 0.25;
    const darkFactor = Math.min(scrollPos / 800, maxDarkness);

    page2.style.background = `
      linear-gradient(
        135deg,
        rgba(232,241,255,1),
        rgba(255,245,245,${0.9 - darkFactor})
      )`;
  });

  /* -------------------------------
     EVOLUTION BAR SMOOTH APPEAR / HIDE
  ------------------------------- */
  const evoBar = document.getElementById("evolution-bar");
  if (evoBar) {
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      evoBar.style.opacity = "1";
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        evoBar.style.opacity = "0.5"; // fades when idle
      }, 1200);
    }, { passive: true });
  }

  /* -------------------------------
     SCROLL SHADOW HEADER (OPTIONAL)
  ------------------------------- */
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    });
  }
}
