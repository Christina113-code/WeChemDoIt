document.addEventListener("DOMContentLoaded", async function () {
  // Load JSON data
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

  const xSelect = document.getElementById("x-axis");
  const ySelect = document.getElementById("y-axis");

  const numericFields = Object.keys(elements[0]).filter(
    (key) => typeof elements[0][key] === "number"
  );

  numericFields.forEach((field) => {
    xSelect.add(new Option(field, field));
    ySelect.add(new Option(field, field));
  });

  // Default selections
  xSelect.value = "atomicNumber";
  ySelect.value = "electronegativity";

  const ctx = document.getElementById("scatterChart").getContext("2d");
  let scatterChart;

  function updateChart() {
    const xKey = xSelect.value;
    const yKey = ySelect.value;

    const dataPoints = elements
      .filter((el) => el[xKey] !== null && el[yKey] !== null)
      .map((el) => ({
        x: el[xKey],
        y: el[yKey],
        label: el.name,
      }));

    const chartData = {
      datasets: [
        {
          label: `${yKey} vs ${xKey}`,
          data: dataPoints,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          pointRadius: 5,
        },
      ],
    };

    const config = {
      type: "scatter",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const point = context.raw;
                return `${point.label}: (${point.x}, ${point.y})`;
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
          },
          y: {
            title: {
              display: true,
              text: yKey,
            },
          },
        },
      },
    };

    if (scatterChart) {
      scatterChart.destroy();
    }

    scatterChart = new Chart(ctx, config);
  }

  xSelect.addEventListener("change", updateChart);
  ySelect.addEventListener("change", updateChart);

  updateChart(); // Initial chart render
});
