function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function initEvolutionBar() {
  const track = document.getElementById("evolution-track");
  const fill  = document.getElementById("evolution-fill");
  const thumb = document.getElementById("evolution-thumb");
  const evolutionBar = document.getElementById("evolution-bar");
  if (!track || !fill || !thumb || !evolutionBar) return;

  let isDragging = false;
  let progress = 0;
  let scrollTimeout;

  // Show/hide on scroll
  let isScrolling = false;
  
  const handleScroll = () => {
    // Show immediately when scrolling
    if (!isScrolling) {
      evolutionBar.classList.add('visible');
      isScrolling = true;
    }
    
    // Hide after scrolling stops
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (!isDragging) {
        evolutionBar.classList.remove('visible');
        isScrolling = false;
      }
    }, 1500);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  const setProgress = (p) => {
    p = clamp(p, 0, 1);
    const trackH = track.clientHeight;
    const thumbH = thumb.offsetHeight || 40;
    const usable = trackH - thumbH;
    const yPx = usable * p;

    fill.style.height = `${yPx + thumbH / 2}px`;
    thumb.style.top = `${yPx + thumbH / 2}px`;

    // Simple indicator - no emojis
    thumb.textContent = "●";
  };

  const syncScroll = () => {
    if (isDragging) return;
    const docH = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const scrollP = window.scrollY / docH;
    // smooth update
    progress += (scrollP - progress) * 0.08;
    setProgress(progress);
  };

  // scroll → move bar
  window.addEventListener("scroll", () => requestAnimationFrame(syncScroll), { passive: true });

  // drag → scroll
  thumb.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.mozUserSelect = "none";
    document.body.style.msUserSelect = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const rect = track.getBoundingClientRect();
    const thumbH = thumb.offsetHeight || 40;
    const usable = rect.height - thumbH;
    const y = clamp(e.clientY - rect.top - thumbH / 2, 0, usable);
    const percent = y / usable;
    setProgress(percent);
    const docH = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    window.scrollTo({ top: docH * percent, behavior: "auto" });
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
    document.body.style.mozUserSelect = "";
    document.body.style.msUserSelect = "";
  });

  // initial sync
  syncScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEvolutionBar);
} else {
  initEvolutionBar();
}
