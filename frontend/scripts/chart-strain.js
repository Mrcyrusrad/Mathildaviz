// chart-strain.js — Page 3 "The Strain: Mental Health & Money"
export function renderStrainCharts() {
  console.log("📊 Rendering Page 3: Strain charts");
  
  drawDualAxisRentDistress();  // Dual-axis line chart
  drawScatterRentDistress();   // Scatter plot
  drawCityBubbleChart();       // Bubble chart
  drawSleepBoxPlot();          // Box plot
}

// Chart 1: Dual-Axis Line Chart (Rent vs Distress 2015-2025)
function drawDualAxisRentDistress() {
  const el = document.getElementById("chart3a");
  if (!el) return;

  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const rent = [350, 360, 380, 410, 450, 490, 520, 550, 580, 610, 640];
  const distress = [28, 29, 31, 33, 35, 37, 39, 42, 45, 48, 50];

  Plotly.newPlot(el, [
    {
      x: years,
      y: rent,
      name: "Average Weekly Rent ($)",
      type: "scatter",
      mode: "lines+markers",
      line: { color: "#5B7C99", width: 3.5, shape: "spline" },
      marker: { size: 8, color: "#5B7C99", line: { width: 2, color: "#fff" } },
      yaxis: "y1"
    },
    {
      x: years,
      y: distress,
      name: "High Distress (%)",
      type: "scatter",
      mode: "lines+markers",
      line: { color: "#5B7C99", width: 3.5, dash: "dot", shape: "spline" },
      marker: { size: 8, color: "#5B7C99", line: { width: 2, color: "#fff" } },
      yaxis: "y2"
    }
  ], {
    title: "",
    xaxis: {
      title: "Year",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      title: "Weekly Rent ($)",
      titlefont: { color: "#5B7C99" },
      tickfont: { color: "#5B7C99" },
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis2: {
      title: "High Distress (%)",
      titlefont: { color: "#5B7C99" },
      tickfont: { color: "#5B7C99" },
      overlaying: "y",
      side: "right",
      showgrid: false
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 50, l: 60, r: 60 },
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: -0.25,
      xanchor: "center",
      x: 0.5
    },
    hovermode: "closest"
  }, { displayModeBar: false });
}

// Chart 2: Scatter Plot (Rent vs Distress Correlation)
function drawScatterRentDistress() {
  const el = document.getElementById("chart3c");
  if (!el) return;

  const rent = [350, 380, 410, 450, 490, 520, 550, 580, 610, 640];
  const distress = [28, 31, 33, 35, 37, 39, 42, 45, 48, 50];

  Plotly.newPlot(el, [{
    x: rent,
    y: distress,
    mode: "markers",
    type: "scatter",
    marker: {
      size: 12,
      color: distress,
      colorscale: [[0, "#7BA05B"], [0.5, "#7BA05B"], [1, "#5B7C99"]],
      showscale: true,
      colorbar: {
        title: "Distress %",
        thickness: 15,
        len: 0.7
      },
      line: { width: 2, color: "#fff" }
    },
    text: rent.map((r, i) => `Rent: $${r}<br>Distress: ${distress[i]}%`),
    hovertemplate: "%{text}<extra></extra>"
  }], {
    title: "",
    xaxis: {
      title: "Weekly Rent ($)",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      title: "High Distress (%)",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 50, l: 60, r: 80 },
    annotations: [{
      x: 640,
      y: 50,
      text: "r ≈ 0.9",
      showarrow: false,
      font: { size: 14, color: "#5B7C99", weight: "bold" },
      bgcolor: "rgba(255,255,255,0.8)",
      borderpad: 4
    }]
  }, { displayModeBar: false });
}

// Chart 3: Bubble Chart (City Size vs Distress vs Rent)
function drawCityBubbleChart() {
  const el = document.getElementById("chart3d");
  if (!el) return;

  const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Hobart"];
  const avgRent = [640, 580, 490, 450, 420, 380];
  const distress = [52, 48, 44, 42, 40, 38];
  const population = [5.3, 5.0, 2.5, 2.1, 1.4, 0.24]; // millions

  Plotly.newPlot(el, [{
    x: avgRent,
    y: distress,
    mode: "markers+text",
    type: "scatter",
    text: cities,
    textposition: "top center",
    textfont: { size: 11, weight: "bold" },
    marker: {
      size: population.map(p => p * 15), // Scale bubble size
      color: distress,
      colorscale: [[0, "#7BA05B"], [0.5, "#7BA05B"], [1, "#5B7C99"]],
      showscale: true,
      colorbar: {
        title: "Distress %",
        thickness: 15,
        len: 0.7
      },
      line: { width: 2, color: "#fff" },
      opacity: 0.8
    },
    hovertemplate: "<b>%{text}</b><br>Rent: $%{x}<br>Distress: %{y}%<extra></extra>"
  }], {
    title: "",
    xaxis: {
      title: "Average Weekly Rent ($)",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      title: "High Distress (%)",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 40, b: 50, l: 60, r: 80 }
  }, { displayModeBar: false });
}

// Chart 4: Box Plot (Sleep Hours by Income Level)
function drawSleepBoxPlot() {
  const el = document.getElementById("chart3b");
  if (!el) return;

  Plotly.newPlot(el, [
    {
      y: [4.5, 5.0, 5.2, 5.5, 5.8, 6.0, 5.7, 5.3, 5.9, 6.1],
      name: "< $300/wk",
      type: "box",
      marker: { color: "#5B7C99" },
      boxmean: "sd"
    },
    {
      y: [6.0, 6.2, 6.5, 6.7, 6.8, 7.0, 6.9, 6.4, 6.6, 7.1],
      name: "$300-500/wk",
      type: "box",
      marker: { color: "#7BA05B" },
      boxmean: "sd"
    },
    {
      y: [7.0, 7.2, 7.5, 7.8, 8.0, 8.2, 8.5, 7.6, 7.9, 8.1],
      name: "> $500/wk",
      type: "box",
      marker: { color: "#7BA05B" },
      boxmean: "sd"
    }
  ], {
    title: "",
    yaxis: {
      title: "Sleep Hours per Night",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    xaxis: {
      title: "Income Level"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 60, l: 60, r: 30 },
    showlegend: true
  }, { displayModeBar: false });
}
    