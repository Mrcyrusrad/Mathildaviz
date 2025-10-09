async function loadData() {
  const response = await fetch("data/example_data.json");
  const data = await response.json();

  const years = data.map(d => d.year);
  const cpi = data.map(d => d.cpi_index);
  const income = data.map(d => d.student_income);

  const trace1 = {
    x: years,
    y: cpi,
    mode: "lines+markers",
    name: "CPI Index",
    line: { color: "#ff7f0e" }
  };

  const trace2 = {
    x: years,
    y: income,
    mode: "lines+markers",
    name: "Student Income",
    line: { color: "#1f77b4" }
  };

  const layout = {
    title: "Rising Costs vs Student Income",
    xaxis: { title: "Year" },
    yaxis: { title: "Index (2018 = 100)" },
    paper_bgcolor: "#f7f9fc",
    plot_bgcolor: "#f7f9fc"
  };

  Plotly.newPlot("chart", [trace1, trace2], layout);
}

async function loadData() {
  const response = await fetch("data/example_data.json");
  const data = await response.json();

  // Chart 1: CPI vs Income
  Plotly.newPlot("chart1", [
    { x: data.map(d => d.year), y: data.map(d => d.cpi_index), name: "CPI" },
    { x: data.map(d => d.year), y: data.map(d => d.student_income), name: "Income" }
  ], { title: "Rising Costs vs Income" });

  // Chart 2: placeholder for now
  Plotly.newPlot("chart2", [
    { x: [1, 2, 3], y: [5, 3, 6], type: "bar", name: "Demo" }
  ], { title: "Example Second Chart" });
}

loadData();

