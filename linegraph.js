document.addEventListener("DOMContentLoaded", async function () {
  async function loadJSON(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Could not load JSON: " + error);
      return null;
    }
  }

  const elements = await loadJSON("data.json");
  if (!elements) return;

  const xSelect = document.getElementById("line-x-axis");
  const ySelect = document.getElementById("line-y-axis");

  const numericFields = Object.keys(elements[0]).filter(
    (key) => typeof elements[0][key] === "number"
  );

  numericFields.forEach((field) => {
    xSelect.add(new Option(field, field));
    ySelect.add(new Option(field, field));
  });

  // Default selections
  xSelect.value = "atomicNumber";
  ySelect.value = "boilingPoint";

  const ctx = document.getElementById("lineChart").getContext("2d");
  let lineChart;

  function updateLineChart() {
    const xKey = xSelect.value;
    const yKey = ySelect.value;

    const sorted = elements
      .filter((el) => el[xKey] !== null && el[yKey] !== null)
      .sort((a, b) => a[xKey] - b[xKey]);

    const xData = sorted.map((el) => el[xKey]);
    const yData = sorted.map((el) => el[yKey]);

    const chartData = {
      labels: xData,
      datasets: [
        {
          label: `${yKey} vs ${xKey}`,
          data: yData,
          fill: false,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };

    const config = {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const index = context.dataIndex;
                return `${xKey}: ${xData[index]}, ${yKey}: ${yData[index]}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: xKey,
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20,
            },
          },
          y: {
            title: {
              display: true,
              text: yKey,
            },
            beginAtZero: false,
          },
        },
      },
    };

    if (lineChart) {
      lineChart.destroy();
    }

    lineChart = new Chart(ctx, config);
  }

  xSelect.addEventListener("change", updateLineChart);
  ySelect.addEventListener("change", updateLineChart);

  updateLineChart(); // Initial render
});
