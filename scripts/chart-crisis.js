// chart-crisis.js — Page 4 "The Crisis: Housing Pressures"
export function renderCrisisCharts() {
  console.log("📊 Rendering Page 4: Housing Crisis charts");
  
  drawRentBurdenMap();      // Choropleth-style bar chart
  drawCityBubbleMap();      // Bubble map
  drawMarimekkoChart();     // Marimekko chart
  drawHousingTreeMap();     // Tree map
  drawRegionTable();        // Summary table
}

// Chart 1: Rent Burden by City (Choropleth-style)
function drawRentBurdenMap() {
  const el = document.getElementById("chart4a");
  if (!el) return;

  const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Hobart"];
  const rentPercent = [60, 55, 48, 42, 40, 38];

  Plotly.newPlot(el, [{
    x: cities,
    y: rentPercent,
    type: "bar",
    marker: {
      color: rentPercent,
      colorscale: [[0, "#7BA05B"], [0.5, "#7BA05B"], [1, "#5B7C99"]],
      showscale: true,
      colorbar: {
        title: "% Income",
        thickness: 15,
        len: 0.7
      },
      line: { color: "#fff", width: 2 }
    },
    text: rentPercent.map(p => `${p}%`),
    textposition: "outside",
    textfont: { size: 14, weight: "bold" }
  }], {
    title: "",
    xaxis: {
      title: "City",
      tickangle: -20,
      tickfont: { size: 11 }
    },
    yaxis: {
      title: "% of Income Spent on Rent",
      range: [0, 70],
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 80, l: 60, r: 80 },
    annotations: [{
      x: "Sydney",
      y: 60,
      text: "Highest burden",
      showarrow: true,
      arrowhead: 2,
      ax: 0,
      ay: -40,
      font: { size: 11, color: "#5B7C99" }
    }]
  }, { displayModeBar: false });
}

// Chart 2: Bubble Map (City Rent vs Wellbeing)
function drawCityBubbleMap() {
  const el = document.getElementById("chart4b");
  if (!el) return;

  const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Hobart"];
  const avgRent = [640, 580, 490, 450, 420, 380];
  const wellbeing = [4.2, 4.8, 5.5, 5.8, 6.2, 6.5]; // Score out of 10
  const population = [5.3, 5.0, 2.5, 2.1, 1.4, 0.24];

  Plotly.newPlot(el, [{
    x: avgRent,
    y: wellbeing,
    mode: "markers+text",
    type: "scatter",
    text: cities,
    textposition: "top center",
    textfont: { size: 11, weight: "bold" },
    marker: {
      size: population.map(p => p * 18),
      color: wellbeing,
      colorscale: [[0, "#5B7C99"], [0.5, "#7BA05B"], [1, "#7BA05B"]],
      showscale: true,
      colorbar: {
        title: "Wellbeing",
        thickness: 15,
        len: 0.7
      },
      line: { color: "#fff", width: 2 },
      opacity: 0.8
    },
    hovertemplate: "<b>%{text}</b><br>Rent: $%{x}/wk<br>Wellbeing: %{y}/10<extra></extra>"
  }], {
    title: "",
    xaxis: {
      title: "Average Weekly Rent ($)",
      gridcolor: "rgba(0,0,0,0.05)"
    },
    yaxis: {
      title: "Wellbeing Score (0-10)",
      range: [3, 7],
      gridcolor: "rgba(0,0,0,0.05)"
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 40, b: 50, l: 60, r: 80 }
  }, { displayModeBar: false });
}

// Chart 3: Marimekko Chart (City vs Shared Housing × Distress)
function drawMarimekkoChart() {
  const el = document.getElementById("chart4c");
  if (!el) return;

  const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];
  const sharedHousing = [70, 65, 58, 52, 48]; // % in shared housing
  const distress = [52, 48, 44, 42, 40]; // % high distress

  Plotly.newPlot(el, [{
    x: cities,
    y: sharedHousing,
    type: "bar",
    name: "% in Shared Housing",
    marker: {
      color: sharedHousing,
      colorscale: [[0, "#D4A373"], [1, "#5B7C99"]],
      line: { color: "#fff", width: 2 }
    },
    text: sharedHousing.map(s => `${s}%`),
    textposition: "inside",
    yaxis: "y1"
  }, {
    x: cities,
    y: distress,
    type: "scatter",
    mode: "lines+markers",
    name: "% High Distress",
    line: { color: "#5B7C99", width: 3.5 },
    marker: { size: 10, color: "#5B7C99", line: { width: 2, color: "#fff" } },
    yaxis: "y2"
  }], {
    title: "",
    xaxis: {
      title: "City",
      tickangle: -20
    },
    yaxis: {
      title: "% in Shared Housing",
      gridcolor: "rgba(0,0,0,0.05)",
      range: [0, 80]
    },
    yaxis2: {
      title: "% High Distress",
      overlaying: "y",
      side: "right",
      range: [0, 60],
      showgrid: false
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0.3)",
    font: { family: "Inter, Manrope", color: "#1A1A1A", size: 12 },
    margin: { t: 30, b: 80, l: 60, r: 60 },
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: -0.35,
      xanchor: "center",
      x: 0.5
    },
    barmode: "stack"
  }, { displayModeBar: false });
}

// Chart 4: Tree Map (Housing Type Composition)
function drawHousingTreeMap() {
  const el = document.getElementById("chart4d");
  if (!el) return;

  const labels = ["Share House", "Solo Flat", "Campus", "Family Home", "Other"];
  const parents = ["", "", "", "", ""];
  const values = [40, 25, 20, 10, 5];
  const colors = ["#5B7C99", "#7BA05B", "#D4A373", "#7BA05B", "#F4E4C1"];

  Plotly.newPlot(el, [{
    type: "treemap",
    labels: labels,
    parents: parents,
    values: values,
    text: values.map(v => `${v}%`),
    textposition: "middle center",
    textfont: { size: 16, color: "#fff", weight: "bold" },
    marker: {
      colors: colors,
      line: { color: "#fff", width: 3 }
    },
    hovertemplate: "<b>%{label}</b><br>%{value}% of students<extra></extra>"
  }], {
    margin: { t: 10, b: 10, l: 10, r: 10 },
    paper_bgcolor: "rgba(0,0,0,0)",
    font: { family: "Inter, Manrope", size: 12 }
  }, { displayModeBar: false });
}

// Chart 5: Summary Table
function drawRegionTable() {
  const el = document.getElementById("chart4e");
  if (!el) return;

  const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Hobart"];
  const rentPercent = [60, 55, 48, 42, 40, 38];
  const distressIndex = [52, 48, 44, 42, 40, 38];
  const avgRent = [640, 580, 490, 450, 420, 380];

  Plotly.newPlot(el, [{
    type: "table",
    header: {
      values: ["<b>City</b>", "<b>Avg Rent ($/wk)</b>", "<b>% of Income</b>", "<b>Distress Index</b>"],
      align: "center",
      line: { width: 1, color: "#ddd" },
      fill: { color: "#D4A373" },
      font: { family: "Inter, Manrope", size: 13, color: "white", weight: "bold" }
    },
    cells: {
      values: [cities, avgRent, rentPercent.map(p => `${p}%`), distressIndex],
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
