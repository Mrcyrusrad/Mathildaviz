// main.js
import { renderTransitionChart } from "./chart-transition.js";
import { renderEmotionalShift } from "./chart-emotional-shift.js";
import { renderCostChart } from "./chart-costs.js";
import { renderExpensePie } from "./chart-expenses.js";
import { initScrollEffects } from "./scroll-effects.js";

document.addEventListener("DOMContentLoaded", () => {
  renderTransitionChart();   // Page 1
  renderEmotionalShift();    // Page 1 secondary
  renderCostChart();         // Page 2
  renderExpensePie();        // Page 2 mini-chart
  initScrollEffects();       // Global scroll-based animation
});
