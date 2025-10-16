const sections = [
  "./sections/page1-transition.html",
  "./sections/page2-cost.html",
  "./sections/page3-strain.html",
  "./sections/page4-crisis.html",
  "./sections/page5-grind.html",
  "./sections/page6-light.html"   // ✅ add this
];
const { renderLightCharts } = await import("./chart-light.js");




const main = document.getElementById("main-content");

export async function loadSections() {
  for (const path of sections) {
    const res = await fetch(path);
    if (!res.ok) {
      console.error(`❌ Failed to load section: ${path}`);
      continue;
    }
    const html = await res.text();
    main.insertAdjacentHTML("beforeend", html);
  }

  // ✅ Load and run charts only AFTER all sections exist
  const { renderTransitionChart } = await import("./chart-transition.js");
  const { renderEmotionalShift } = await import("./chart-emotional-shift.js");
  const { renderCostChart } = await import("./chart-costs.js");
  const { renderExpensePie } = await import("./chart-expenses.js");
  const { renderCrisisCharts } = await import("./chart-crisis.js");

  const { initScrollEffects } = await import("./scroll-effects.js");
  const { renderGrindChart } = await import("./chart-grind.js");



  // Run charts for pages 1–2
  renderTransitionChart();
  renderEmotionalShift();
  renderCostChart();
  renderExpensePie();
  renderCrisisCharts();  // ✅ new line
  renderGrindChart();
  renderLightCharts();

  // ✅ NEW: Run charts for Page 3
  const { renderStrainCharts } = await import("./chart-strain.js");
  renderStrainCharts();

  // Add scroll effects last
  initScrollEffects();

  console.log("✅ All sections loaded and charts initialized");
}

loadSections();
