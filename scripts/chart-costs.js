// chart-costs.js — Page 2 "Cost of Independence"
export function renderCostChart() {
  drawCPIvsRentIncome();  // Main line chart
  drawCumulativePressure(); // Area chart
  drawSpendingControl();   // Control chart
}

// Chart 1: CPI vs Rent Index vs Student Income (2015-2025)
function drawCPIvsRentIncome() {
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const dataCPI = [100, 103, 106, 110, 114, 118, 123, 128, 132, 136, 140];
  const dataRent = [100, 108, 116, 125, 135, 145, 155, 165, 175, 185, 195];
  const dataIncome = [100, 102, 103, 105, 106, 107, 108, 109, 110, 111, 112];

  const traces = [
    { 
      x: years, y: dataCPI, 
      mode: "lines+markers", 
      name: "CPI", 
      line: { color: "#5B7C99", width: 3.5, shape: 'spline' },
      marker: { size: 8, color: "#5B7C99", line: { width: 2, color: "#fff" } }
    },
    { 
      x: years, y: dataRent, 
      mode: "lines+markers", 
      name: "Rent Index", 
      line: { color: "#7BA05B", width: 3.5, shape: 'spline' },
      marker: { size: 8, color: "#7BA05B", line: { width: 2, color: "#fff" } }
    },
    { 
      x: years, y: dataIncome, 
      mode: "lines+markers", 
      name: "Student Income", 
      line: { color: "#D4A373", width: 3.5, dash: "dot", shape: 'spline' },
      marker: { size: 8, color: "#D4A373", line: { width: 2, color: "#fff" } }
    },
  ];

  const layout = {
    title: "",
    xaxis: { 
      title: "Year",
      gridcolor: "rgba(0,0,0,0.05)",
      linecolor: "rgba(0,0,0,0.1)"
    },
    yaxis: { 
      title: "Index (2018 = 100)",
      gridcolor: "rgba(0,0,0,0.05)",
      linecolor: "rgba(0,0,0,0.1)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 50, l: 60, r: 30 },
    showlegend: true,
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: -0.25,
      xanchor: "center",
      x: 0.5,
      bgcolor: "rgba(255,255,255,0.8)",
      bordercolor: "rgba(0,0,0,0.1)",
      borderwidth: 1
    },
    hovermode: "closest"
  };

  Plotly.newPlot("chart1", traces, layout, { displayModeBar: false });
}

// Chart 2: Cumulative Inflation Pressure (Area Chart)
function drawCumulativePressure() {
  const el = document.getElementById("chart1c");
  if (!el) return;

  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const pressure = [0, 6, 13, 20, 29, 38, 47, 56, 65, 74, 83]; // CPI - Income difference

  Plotly.newPlot(el, [{
    x: years,
    y: pressure,
    type: "scatter",
    mode: "lines",
    fill: "tozeroy",
    fillcolor: "rgba(91, 124, 153, 0.3)",
    line: {
      color: "#5B7C99",
      width: 3,
      shape: "spline"
    },
    name: "Cumulative Pressure"
  }], {
    title: "",
    xaxis: {
      title: "Year",
      gridcolor: "rgba(0,0,0,0.05)",
      linecolor: "rgba(0,0,0,0.1)"
    },
    yaxis: {
      title: "Inflation Pressure (Index Points)",
      gridcolor: "rgba(0,0,0,0.05)",
      linecolor: "rgba(0,0,0,0.1)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 50, l: 60, r: 30 },
    showlegend: true,
    hovermode: "closest",
    annotations: [{
      x: 2025,
      y: 83,
      text: "Gap widens",
      showarrow: true,
      arrowhead: 2,
      ax: -50,
      ay: -30,
      font: { size: 11, color: "#5B7C99" }
    }]
  }, { displayModeBar: false });
}

// Chart 3: Weekly Spending Control Chart
function drawSpendingControl() {
  const el = document.getElementById("chart1d");
  if (!el) return;

  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  const spending = [295, 310, 285, 320, 290, 305, 315, 280, 300, 310, 295, 305];
  const mean = 300;
  const ucl = 320; // Upper control limit
  const lcl = 280; // Lower control limit

  Plotly.newPlot(el, [
    {
      x: weeks,
      y: spending,
      type: "scatter",
      mode: "lines+markers",
      name: "Weekly Spending",
      line: { color: "#D4A373", width: 2.5 },
      marker: { size: 8, color: "#D4A373", line: { width: 2, color: "#fff" } }
    },
    {
      x: weeks,
      y: Array(12).fill(mean),
      type: "scatter",
      mode: "lines",
      name: "Mean ($300)",
      line: { color: "#666", width: 2, dash: "dash" }
    },
    {
      x: weeks,
      y: Array(12).fill(ucl),
      type: "scatter",
      mode: "lines",
      name: "UCL ($320)",
      line: { color: "#5B7C99", width: 1.5, dash: "dot" }
    },
    {
      x: weeks,
      y: Array(12).fill(lcl),
      type: "scatter",
      mode: "lines",
      name: "LCL ($280)",
      line: { color: "#7BA05B", width: 1.5, dash: "dot" }
    }
  ], {
    title: "",
    xaxis: {
      title: "Week",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      title: "Weekly Spending ($)",
      range: [270, 330],
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
