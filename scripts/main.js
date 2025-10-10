

document.addEventListener("DOMContentLoaded", async () => {

  // -----------------------------
  // CHART 0 — Psychological Distress Before vs After Transition
  // -----------------------------
  const transitionData = [
    { group: "15–17 yrs (High School)", distress: 13 },
    { group: "18–24 yrs (Young Adults)", distress: 23 }
  ];

  const trace = {
    x: transitionData.map(d => d.distress),
    y: transitionData.map(d => d.group),
    type: "bar",
    orientation: "h",
    marker: { color: ["#6AB7FF", "#FF8A80"] },
    text: transitionData.map(d => `${d.distress}%`),
    textposition: "auto"
  };

  const layout = {
    margin: { l: 150, r: 40, t: 30, b: 40 },
    xaxis: { title: "Very High Distress (%)", range: [0, 30] },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { family: "Helvetica Neue", color: "#003366" },
    showlegend: false
  };

  Plotly.newPlot("chart0", [trace], layout, { displayModeBar: false });


  // -----------------------------
  // CHART 1 — Rising Costs vs Student Income
  // -----------------------------
  try {
    const response = await fetch("data/example_data.json");
    const data = await response.json();

    const years = data.map(d => d.year);
    const cpi = data.map(d => d.cpi_index);
    const income = data.map(d => d.student_income);

    const traceCPI = {
      x: years,
      y: cpi,
      mode: "lines+markers",
      name: "CPI Index",
      line: { color: "#ff7f0e", width: 3 }
    };

    const traceIncome = {
      x: years,
      y: income,
      mode: "lines+markers",
      name: "Student Income",
      line: { color: "#1f77b4", width: 3 }
    };

    const layout1 = {
      title: "Rising Costs vs Student Income",
      xaxis: { title: "Year" },
      yaxis: { title: "Index (2018 = 100)" },
      paper_bgcolor: "#f7f9fc",
      plot_bgcolor: "#f7f9fc",
      font: { family: "Helvetica Neue", color: "#222" }
    };

    Plotly.newPlot("chart1", [traceCPI, traceIncome], layout1, { displayModeBar: false });

  } catch (error) {
    console.error("Error loading data:", error);
  }

  // -----------------------------
  // Fade-In on Scroll
  // -----------------------------
  const fadeElements = document.querySelectorAll('.fade-in, .transition-line');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeElements.forEach(el => observer.observe(el));
});

// CHART 0b — Emotional Shift (Stacked Bars)
const moodData = [
  { stage: "High School", positive: 72, distress: 13 },
  { stage: "First-Year Uni", positive: 58, distress: 23 },
  { stage: "Second-Year+", positive: 46, distress: 28 }
];

const tracePositive = {
  x: moodData.map(d => d.positive),
  y: moodData.map(d => d.stage),
  name: "Positive Outlook",
  type: "bar",
  orientation: "h",
  marker: { color: "#8FBCFF" }
};

const traceDistress = {
  x: moodData.map(d => d.distress),
  y: moodData.map(d => d.stage),
  name: "High Distress",
  type: "bar",
  orientation: "h",
  marker: { color: "#FF8A80" }
};

const layout0b = {
  barmode: "stack",
  height: 280,
  margin: { l: 120, r: 30, t: 30, b: 50 },
  xaxis: { title: "Percentage of Students (%)", range: [0, 100] },
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  font: { family: "Helvetica Neue", color: "#003366" },
  showlegend: false
};

Plotly.newPlot("chart0b", [tracePositive, traceDistress], layout0b, { displayModeBar: false });

// -----------------------------
// CHART 1 — Rising Costs vs Student Income
// -----------------------------
const dataCPI = [100, 104, 108, 113, 120, 128, 134];
const dataRent = [100, 107, 115, 124, 136, 145, 155];
const dataIncome = [100, 101, 102, 103, 104, 105, 106];
const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

const traceCPI = {
  x: years,
  y: dataCPI,
  mode: "lines+markers",
  name: "CPI Index",
  line: { color: "#FF7B7B", width: 3 },
};

const traceRent = {
  x: years,
  y: dataRent,
  mode: "lines+markers",
  name: "Rent Index",
  line: { color: "#FFAF7B", width: 3 },
};

const traceIncome = {
  x: years,
  y: dataIncome,
  mode: "lines+markers",
  name: "Student Income",
  line: { color: "#1F77B4", width: 3, dash: "dot" },
};

const layout2 = {
  title: "",
  xaxis: { title: "Year" },
  yaxis: { title: "Index (2018 = 100)" },
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  font: { family: "Manrope", color: "#2E2E2E" },
  margin: { t: 30, b: 40, l: 60, r: 20 },
  showlegend: true
};

Plotly.newPlot("chart1", [traceCPI, traceRent, traceIncome], layout2, { displayModeBar: false });

// Animate background darkening as data diverges
window.addEventListener("scroll", () => {
  const page2 = document.getElementById("page2");
  const scrollPos = window.scrollY;
  const maxDarkness = 0.25;
  const darkFactor = Math.min(scrollPos / 800, maxDarkness);
  page2.style.background = `linear-gradient(135deg, rgba(232,241,255,1), rgba(255,245,245,${0.9 - darkFactor}))`;
});



