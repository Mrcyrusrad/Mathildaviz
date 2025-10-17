// scripts/chart-transition.js — Page 1 scrollytelling

export function renderTransitionChart(){
  // Render all charts for the viz sections
  drawAnxietyBar();        // chart0: Excitement vs Anxiety
  drawSleepHistogram();    // chart0b: Sleep distribution
  drawOptimismSparkline(); // chart0c: Optimism trend 2010-2025
  drawStressRunChart();    // chart0d: Stress over 10 weeks
  
  console.log("✅ Page 1 transition charts initialized");
}

/* ---------- PICTOGRAM ---------- */
function buildPictogram(){
  const wrap = document.getElementById("pictogram");
  if(!wrap) return;
  const total = 18; // 18 students icons
  const anxiousCount = Math.round(total/3); // 1 in 3
  for(let i=0;i<total;i++){
    const d = document.createElement("div");
    d.className = "person" + (i < anxiousCount ? " anxious" : "");
    if(i < anxiousCount) d.classList.add("pulse");
    d.title = i < anxiousCount ? "Constant stress" : "Coping";
    wrap.appendChild(d);
  }
}

function animateCounter(id, target, duration=1000){
  const el = document.getElementById(id);
  if(!el) return;
  const start = performance.now();
  const step = (t)=>{
    const p = Math.min(1, (t - start)/duration);
    const val = Math.round(p*target);
    el.textContent = val;
    if(p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- CHARTS ---------- */
// Chart 1: Anxiety vs Excitement Bar Chart
function drawAnxietyBar(){
  const el = document.getElementById("chart0");
  if(!el) return;

  const categories = ["Excited about independence", "Anxious about finances/workload"];
  const values = [78, 42];

  Plotly.newPlot(el, [{
    x: categories,
    y: values,
    type: "bar",
    marker: { 
      color: ["#7BA05B", "#5B7C99"],
      line: { color: "#fff", width: 2 }
    },
    text: values.map(v => `${v}%`),
    textposition: "outside",
    textfont: { size: 16, weight: "bold", color: "#2E294E" }
  }], {
    margin: { l: 60, r: 30, t: 20, b: 100 },
    xaxis: { 
      tickangle: -15,
      tickfont: { size: 12, color: "#2E294E" }
    },
    yaxis: { 
      title: "% of Students",
      range: [0, 90],
      gridcolor: "rgba(0,0,0,0.08)",
      tickfont: { size: 11, color: "#2E294E" }
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.2)",
    font: { family: "Inter, Manrope", color: "#2E294E" },
    showlegend: true
  }, { displayModeBar: true, responsive: true, modeBarButtonsToRemove: ["lasso2d", "select2d"], displaylogo: false });
}

// Chart 2: Sleep Distribution Histogram
function drawSleepHistogram(){
  const el = document.getElementById("chart0b");
  if(!el) return;
  
  // Sleep hours distribution (n=300 students)
  const bins = ["4-5h", "5-6h", "6-7h", "7-8h", "8-9h", "9+h"];
  const counts = [15, 40, 100, 90, 45, 10];

  Plotly.newPlot(el, [{
    x: bins,
    y: counts,
    type: "bar",
    marker: { 
      color: "#D4A373",
      line: { color: "#fff", width: 2 }
    },
    text: counts,
    textposition: "outside",
    textfont: { size: 13, color: "#2E294E" }
  }], {
    margin: { l: 60, r: 20, t: 20, b: 70 },
    xaxis: { 
      title: "Sleep Hours per Night",
      tickfont: { size: 11, color: "#2E294E" },
      titlefont: { size: 12 }
    },
    yaxis: { 
      title: "Students",
      gridcolor: "rgba(0,0,0,0.08)",
      tickfont: { size: 11, color: "#2E294E" }
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.2)",
    font: { family: "Inter, Manrope", color: "#2E294E" },
    bargap: 0.15
  }, { displayModeBar: true, responsive: true, modeBarButtonsToRemove: ["lasso2d", "select2d"], displaylogo: false });
}

// Chart 3: Optimism Trend Sparkline (2010-2025)
function drawOptimismSparkline(){
  const el = document.getElementById("chart0c");
  if(!el) return;
  
  const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const optimism = [72, 74, 75, 76, 78, 77, 75, 72, 70, 68, 67, 65, 64, 63, 62, 60];

  Plotly.newPlot(el, [{
    x: years,
    y: optimism,
    type: "scatter",
    mode: "lines+markers",
    line: { 
      width: 3.5, 
      color: "#7BA05B",
      shape: "spline"
    },
    marker: { 
      size: 8, 
      color: "#7BA05B",
      line: { width: 2, color: "#fff" }
    },
    fill: "tozeroy",
    fillcolor: "rgba(123, 160, 91, 0.12)"
  }], {
    margin: { l: 60, r: 20, t: 20, b: 60 },
    xaxis: { 
      title: "Year",
      tickvals: [2010, 2015, 2020, 2025],
      gridcolor: "rgba(0,0,0,0.08)",
      tickfont: { size: 11, color: "#2E294E" }
    },
    yaxis: { 
      title: "% Optimistic",
      range: [55, 80],
      gridcolor: "rgba(0,0,0,0.08)",
      tickfont: { size: 11, color: "#2E294E" }
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.2)",
    font: { family: "Inter, Manrope", color: "#2E294E" },
    hovermode: "closest"
  }, { displayModeBar: true, responsive: true, modeBarButtonsToRemove: ["lasso2d", "select2d"], displaylogo: false });
}

// Chart 4: Stress Run Chart (10 weeks)
function drawStressRunChart(){
  const el = document.getElementById("chart0d");
  if(!el) return;
  
  const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const stress = [3, 3, 4, 5, 6, 5, 6, 7, 7, 8];

  Plotly.newPlot(el, [{
    x: weeks,
    y: stress,
    type: "scatter",
    mode: "lines+markers",
    line: { 
      width: 4, 
      color: "#5B7C99",
      shape: "spline"
    },
    marker: { 
      size: 10, 
      color: "#5B7C99",
      line: { width: 2, color: "#fff" }
    }
  }], {
    margin: { l: 60, r: 30, t: 20, b: 60 },
    xaxis: { 
      title: "Week of Semester",
      tickvals: weeks,
      gridcolor: "rgba(0,0,0,0.08)",
      tickfont: { size: 11, color: "#2E294E" }
    },
    yaxis: { 
      title: "Stress Level (0-10)",
      range: [0, 10],
      gridcolor: "rgba(0,0,0,0.08)",
      tickfont: { size: 11, color: "#2E294E" }
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.2)",
    font: { family: "Inter, Manrope", color: "#2E294E" },
    annotations: [{
      x: 10,
      y: 8,
      text: "Peak stress",
      showarrow: true,
      arrowhead: 2,
      ax: -40,
      ay: -40,
      font: { size: 12, color: "#5B7C99", weight: "bold" }
    }]
  }, { displayModeBar: true, responsive: true, modeBarButtonsToRemove: ["lasso2d", "select2d"], displaylogo: false });
}

/* ---------- SCROLL BEHAVIOUR ---------- */
function setupSteps(){
  // Optional: Add scroll-based interactions if needed
  console.log("✅ Page 1 charts initialized");
}
