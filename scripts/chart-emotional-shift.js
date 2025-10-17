// chart-emotional-shift.js — stacked “emotional shift” bars
export function renderEmotionalShift() {
  const moodData = [
    { stage: "High School", positive: 72, distress: 13 },
    { stage: "First-Year Uni", positive: 58, distress: 23 },
    { stage: "Second-Year+", positive: 46, distress: 28 },
  ];

  const tracePositive = {
    x: moodData.map(d => d.positive),
    y: moodData.map(d => d.stage),
    name: "Positive Outlook",
    type: "bar",
    orientation: "h",
    marker: { color: "#8FBCFF" },
  };

  const traceDistress = {
    x: moodData.map(d => d.distress),
    y: moodData.map(d => d.stage),
    name: "High Distress",
    type: "bar",
    orientation: "h",
    marker: { color: "#C9A882" },
  };

  const layout = {
    barmode: "stack",
    height: 280,
    margin: { l: 120, r: 30, t: 30, b: 50 },
    xaxis: { title: "Percentage of Students (%)", range: [0, 100] },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { family: "Manrope", color: "#003366" },
    showlegend: false,
  };

  Plotly.newPlot("chart0b", [tracePositive, traceDistress], layout, { displayModeBar: false });
}
