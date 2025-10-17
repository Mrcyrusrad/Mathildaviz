// chart-light.js — Page 6: The Light - What Helps
export function renderLightCharts() {
  console.log("💡 Rendering Page 6: The Light charts");
  
  drawSupportProgramsBar();    // Bar chart
  drawWellbeingNetwork();      // Network diagram
  drawRecoveryAreaChart();     // Area chart
  drawProgramSparklines();     // Small multiple sparklines
  drawTherapyTable();          // Stem-and-leaf / Table
}

// Chart 1: Support Programs Uptake Bar Chart
function drawSupportProgramsBar() {
  const el = document.getElementById("chart6");
  if (!el) return;

  // Chart 1 — Support program uptake
  const programs = ["Counselling", "Headspace", "Peer Mentoring", "Online Therapy", "Financial Aid"];
  const uptake = [40, 35, 28, 22, 30];

  Plotly.newPlot(el, [{
    x: programs,
    y: uptake,
    type: "bar",
    marker: {
      color: ["#7BA05B", "#D4A373", "#7BA05B", "#F4E4C1", "#8BC34A"],
      line: { color: "#fff", width: 2 }
    },
    text: uptake.map(u => `${u}%`),
    textposition: "outside",
    textfont: { size: 13, weight: "bold" }
  }], {
    title: "",
    xaxis: {
      tickangle: -20,
      tickfont: { size: 11 }
    },
    yaxis: {
      title: "% of Students Using Program",
      range: [0, 50],
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 80, l: 60, r: 30 }
  }, { displayModeBar: false });
}

// Chart 2: Wellbeing Network Diagram
function drawWellbeingNetwork() {
  const el = document.getElementById("chart6b");
  if (!el) return;

  const nodes = [
    { name: "Wellbeing", x: 0, y: 0, size: 35, color: "#D4A373", weight: 0.7 },
    { name: "Sleep", x: -0.9, y: 0.6, size: 22, color: "#7BA05B", weight: 0.6 },
    { name: "Exercise", x: 0.9, y: 0.7, size: 20, color: "#7BA05B", weight: 0.5 },
    { name: "Social", x: -1, y: -0.5, size: 22, color: "#F4E4C1", weight: 0.6 },
    { name: "Support", x: 0.8, y: -0.6, size: 20, color: "#8BC34A", weight: 0.4 },
    { name: "Therapy", x: 0, y: -1, size: 20, color: "#64B5F6", weight: 0.5 }
  ];

  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5]];

  const edgeTraces = edges.map(([src,tgt]) => ({
    x: [nodes[src].x, nodes[tgt].x],
    y: [nodes[src].y, nodes[tgt].y],
    mode: "lines",
    line: {
      width: nodes[tgt].weight * 8,
      color: "rgba(212, 163, 115, 0.3)"
    },
    hoverinfo: "none",
    showlegend: true
  }));

  const nodeTrace = {
    x: nodes.map(n => n.x),
    y: nodes.map(n => n.y),
    mode: "markers+text",
    text: nodes.map(n => n.name),
    textposition: "top center",
    textfont: { size: 11, weight: "bold" },
    marker: {
      size: nodes.map(n => n.size),
      color: nodes.map(n => n.color),
      line: { width: 2, color: "#fff" }
    },
    hovertemplate: "<b>%{text}</b><br>Correlation: %{marker.size}<extra></extra>",
    showlegend: true
  };

  Plotly.newPlot(el, [...edgeTraces, nodeTrace], {
    showlegend: true,
    xaxis: { visible: false, range: [-1.2, 1.2] },
    yaxis: { visible: false, range: [-1.2, 1.2] },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    margin: { t: 20, l: 20, r: 20, b: 20 },
    height: 350
  }, { displayModeBar: false });
}

// Chart 3: Recovery Area Chart (% Improved Mood 2020-2025)
function drawRecoveryAreaChart() {
  const el = document.getElementById("chart6c");
  if (!el) return;

  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const improved = [35, 40, 45, 48, 52, 55];

  Plotly.newPlot(el, [{
    x: years,
    y: improved,
    type: "scatter",
    mode: "lines",
    fill: "tozeroy",
    fillcolor: "rgba(123, 160, 91, 0.3)",
    line: {
      color: "#7BA05B",
      width: 3.5,
      shape: "spline"
    },
    marker: {
      size: 8,
      color: "#7BA05B",
      line: { width: 2, color: "#fff" }
    }
  }], {
    title: "",
    xaxis: {
      title: "Year",
      tickvals: years,
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      title: "% Reporting Improved Mood",
      range: [0, 65],
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 50, l: 60, r: 30 },
    annotations: [{
      x: 2025,
      y: 55,
      text: "Recovery grows",
      showarrow: true,
      arrowhead: 2,
      ax: -50,
      ay: -30,
      font: { size: 11, color: "#7BA05B" }
    }]
  }, { displayModeBar: false });
}

// Chart 4: Program Sparklines (Small Multiples)
function drawProgramSparklines() {
  const el = document.getElementById("chart6d");
  if (!el) return;

  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const programs = {
    "Counselling": [25, 28, 30, 33, 36, 38, 39, 40],
    "Headspace": [20, 22, 25, 28, 30, 32, 34, 35],
    "Peer Support": [15, 17, 19, 22, 24, 26, 27, 28],
    "Online Therapy": [10, 12, 14, 16, 18, 20, 21, 22]
  };

  const traces = Object.entries(programs).map(([name, data], i) => ({
    x: years,
    y: data,
    type: "scatter",
    mode: "lines+markers",
    name: name,
    line: {
      width: 2.5,
      shape: "spline"
    },
    marker: {
      size: 6
    }
  }));

  Plotly.newPlot(el, traces, {
    title: "",
    xaxis: {
      title: "Year",
      tickvals: [2018, 2020, 2022, 2024],
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      title: "% Uptake",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 11 },
    margin: { t: 30, b: 50, l: 60, r: 30 },
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: -0.3,
      xanchor: "center",
      x: 0.5,
      font: { size: 10 }
    },
    hovermode: "closest"
  }, { displayModeBar: false });
}

// Chart 5: Therapy Session Counts Table
function drawTherapyTable() {
  const el = document.getElementById("chart6e");
  if (!el) return;

  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9"];
  const sessions = [8, 10, 12, 13, 15, 17, 19, 22, 25];

  Plotly.newPlot(el, [{
    type: "table",
    header: {
      values: ["<b>Week</b>", "<b>Therapy Sessions</b>"],
      align: "center",
      line: { width: 1, color: "#ddd" },
      fill: { color: "#7BA05B" },
      font: { family: "Inter, Manrope", size: 13, color: "white", weight: "bold" }
    },
    cells: {
      values: [weeks, sessions],
      align: "center",
      line: { color: "#ddd", width: 1 },
      fill: { color: [["#fff", "#f9f9f9"]] },
      font: { family: "Inter, Manrope", size: 12 },
      height: 30
    }
  }], {
    margin: { t: 10, b: 10, l: 10, r: 10 },
    paper_bgcolor: "rgba(0,0,0,0)"
  }, { displayModeBar: false });
}
