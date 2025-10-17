// chart-expenses.js — Page 2 expense visualizations
export function renderExpensePie() {
  drawExpensePie();    // Pie chart
  drawExpensePareto(); // Pareto chart
}

// Pie Chart: Spending Breakdown
function drawExpensePie() {
  const expenses = ["Rent", "Food", "Transport", "Utilities", "Study Costs", "Savings"];
  const percents = [45, 22, 14, 8, 6, 5];
  const colors = ["#D4A373", "#7BA05B", "#F4E4C1", "#D4A373", "#7BA05B", "#F4E4C1"];

  const data = [{
    values: percents,
    labels: expenses,
    type: "pie",
    textinfo: "label+percent",
    marker: { colors: colors }
  }];

  const layout = {
    height: 300,
    width: 350,
    showlegend: true,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)"
  };

  Plotly.newPlot("chart1b", data, layout, { displayModeBar: false });
}

// Pareto Chart: Categories Causing Financial Stress
function drawExpensePareto() {
  const el = document.getElementById("chart1e");
  if (!el) return;

  const categories = ["Rent", "Food", "Transport", "Utilities", "Tuition", "Other"];
  const percentages = [45, 22, 14, 8, 6, 5];
  
  // Calculate cumulative percentages
  let cumulative = [];
  let sum = 0;
  for (let p of percentages) {
    sum += p;
    cumulative.push(sum);
  }

  Plotly.newPlot(el, [
    {
      x: categories,
      y: percentages,
      type: "bar",
      name: "% Causing Stress",
      marker: { 
        color: ["#5B7C99", "#7BA05B", "#D4A373", "#F4E4C1", "#7BA05B", "#D4A373"],
        line: { color: "#fff", width: 2 }
      },
      text: percentages.map(p => `${p}%`),
      textposition: "outside",
      yaxis: "y1"
    },
    {
      x: categories,
      y: cumulative,
      type: "scatter",
      mode: "lines+markers",
      name: "Cumulative %",
      line: { color: "#1A1A1A", width: 3 },
      marker: { size: 10, color: "#1A1A1A", symbol: "diamond" },
      yaxis: "y2"
    }
  ], {
    title: "",
    xaxis: {
      title: "Expense Category",
      tickangle: -20,
      tickfont: { size: 11 }
    },
    yaxis: {
      title: "% Causing Stress",
      side: "left",
      gridcolor: "rgba(0,0,0,0.05)",
      range: [0, 50]
    },
    yaxis2: {
      title: "Cumulative %",
      overlaying: "y",
      side: "right",
      range: [0, 110],
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
    hovermode: "closest"
  }, { displayModeBar: false });
}
