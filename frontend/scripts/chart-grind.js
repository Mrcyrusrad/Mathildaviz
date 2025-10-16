// chart-grind.js — Page 5: The Grind - Survival Economy
export function renderGrindChart() {
  console.log("📊 Rendering Page 5: Grind charts");
  
  drawStackedTimeBar();     // Stacked bar chart
  drawRestStripe();         // Stripe graphic
  drawEnergyRunChart();     // Run chart
  drawWorkHoursHistogram(); // Histogram
  drawBurnoutBoxPlot();     // Box plot
}

// Chart 1: Stacked Bar Chart (Time per week)
function drawStackedTimeBar() {
  const el = document.getElementById("chart5");
  if (!el) return;

  const categories = ["Average Student"];

  Plotly.newPlot(el, [
    {
      x: [25],
      y: categories,
      name: "Work",
      type: "bar",
      orientation: "h",
      marker: { color: "#5B7C99" },
      text: ["25h"],
      textposition: "inside",
      textfont: { color: "#fff", weight: "bold" }
    },
    {
      x: [35],
      y: categories,
      name: "Study",
      type: "bar",
      orientation: "h",
      marker: { color: "#7BA05B" },
      text: ["35h"],
      textposition: "inside",
      textfont: { color: "#fff", weight: "bold" }
    },
    {
      x: [40],
      y: categories,
      name: "Sleep",
      type: "bar",
      orientation: "h",
      marker: { color: "#D4A373" },
      text: ["40h"],
      textposition: "inside",
      textfont: { color: "#fff", weight: "bold" }
    },
    {
      x: [10],
      y: categories,
      name: "Leisure",
      type: "bar",
      orientation: "h",
      marker: { color: "#7BA05B" },
      text: ["10h"],
      textposition: "inside",
      textfont: { color: "#fff", weight: "bold" }
    }
  ], {
    title: "",
    xaxis: {
      title: "Hours per Week",
      range: [0, 120],
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      showticklabels: false
    },
    barmode: "stack",
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 50, l: 60, r: 30 },
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: -0.3,
      xanchor: "center",
      x: 0.5
    },
    annotations: [{
      x: 110,
      y: 0,
      text: "110h/week total",
      showarrow: false,
      font: { size: 12, weight: "bold" },
      xanchor: "left"
    }]
  }, { displayModeBar: false });
}

// Chart 2: Stripe Graphic (Rest Timeline)
function drawRestStripe() {
  const el = document.getElementById("chart5b");
  if (!el) return;

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const rest = [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]; // 1 = good sleep, 0 = poor

  Plotly.newPlot(el, [{
    x: days,
    y: rest,
    type: "bar",
    marker: {
      color: rest.map(r => r === 1 ? "#7BA05B" : "#5B7C99"),
      line: { color: "#fff", width: 1 }
    },
    hovertemplate: "Day %{x}: %{text}<extra></extra>",
    text: rest.map(r => r === 1 ? "Good rest (7+ hrs)" : "Poor sleep (< 5 hrs)")
  }], {
    title: "",
    xaxis: {
      title: "Day of Month",
      tickvals: [1, 5, 10, 15, 20, 25, 30],
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      title: "Rest Quality",
      tickvals: [0, 1],
      ticktext: ["Poor", "Good"],
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 50, l: 60, r: 30 },
    showlegend: true,
    bargap: 0.1
  }, { displayModeBar: false });
}

// Chart 3: Energy Level Run Chart
function drawEnergyRunChart() {
  const el = document.getElementById("chart5c");
  if (!el) return;

  const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const energy = [8, 7, 6, 6, 5, 4, 3, 3, 2, 2, 2, 1];

  Plotly.newPlot(el, [{
    x: weeks,
    y: energy,
    type: "scatter",
    mode: "lines+markers",
    line: {
      color: "#5B7C99",
      width: 3.5,
      shape: "spline"
    },
    marker: {
      size: 9,
      color: energy,
      colorscale: [[0, "#5B7C99"], [0.5, "#7BA05B"], [1, "#7BA05B"]],
      showscale: false,
      line: { width: 2, color: "#fff" }
    },
    fill: "tozeroy",
    fillcolor: "rgba(91, 124, 153, 0.1)"
  }], {
    title: "",
    xaxis: {
      title: "Week of Semester",
      tickvals: weeks,
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      title: "Energy Level (1-10)",
      range: [0, 10],
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 50, l: 60, r: 30 },
    annotations: [{
      x: 12,
      y: 1,
      text: "Exhaustion",
      showarrow: true,
      arrowhead: 2,
      ax: -40,
      ay: -40,
      font: { size: 11, color: "#5B7C99" }
    }]
  }, { displayModeBar: false });
}

// Chart 4: Work Hours Histogram
function drawWorkHoursHistogram() {
  const el = document.getElementById("chart5d");
  if (!el) return;

  const bins = ["0-10h", "10-15h", "15-20h", "20-25h", "25-30h", "30+h"];
  const students = [45, 80, 120, 95, 70, 40];

  Plotly.newPlot(el, [{
    x: bins,
    y: students,
    type: "bar",
    marker: {
      color: students,
      colorscale: [[0, "#7BA05B"], [0.5, "#7BA05B"], [1, "#5B7C99"]],
      line: { color: "#fff", width: 2 }
    },
    text: students,
    textposition: "outside"
  }], {
    title: "",
    xaxis: {
      title: "Work Hours per Week",
      tickfont: { size: 11 }
    },
    yaxis: {
      title: "Number of Students",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 60, l: 60, r: 30 },
    bargap: 0.15
  }, { displayModeBar: false });
}

// Chart 5: Burnout Box Plot by Employment Type
function drawBurnoutBoxPlot() {
  const el = document.getElementById("chart5e");
  if (!el) return;

  Plotly.newPlot(el, [
    {
      y: [2, 2.5, 3, 3.2, 3.5, 3.8, 4, 3.6, 3.3, 2.8],
      name: "No Employment",
      type: "box",
      marker: { color: "#7BA05B" },
      boxmean: "sd"
    },
    {
      y: [4, 4.5, 5, 5.5, 6, 6.5, 7, 6.8, 5.8, 5.2],
      name: "Part-time",
      type: "box",
      marker: { color: "#7BA05B" },
      boxmean: "sd"
    },
    {
      y: [6, 6.5, 7, 7.5, 8, 8.5, 9, 8.8, 8.2, 7.8],
      name: "Full-time",
      type: "box",
      marker: { color: "#5B7C99" },
      boxmean: "sd"
    }
  ], {
    title: "",
    yaxis: {
      title: "Burnout Score (0-10)",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    xaxis: {
      title: "Employment Type"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 60, l: 60, r: 30 },
    showlegend: true
  }, { displayModeBar: false });
}
