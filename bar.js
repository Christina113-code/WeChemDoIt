async function loadJSON(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Failed to load JSON");
    return await response.json();
  } catch (err) {
    console.error("Error loading JSON:", err);
    return null;
  }
}

let barChart;

function updateBarChart(elements, field) {
  const labels = elements.map((e) => e.name);
  const data = elements.map((e) => e[field]);

  const ctx = document.getElementById("barChart").getContext("2d");

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${field} by Element`,
        data: data,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: chartData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: field,
          },
        },
        x: {
          ticks: {
            autoSkip: true,
            maxRotation: 90,
            minRotation: 45,
          },
        },
      },
    },
  };

  if (barChart) {
    barChart.destroy();
  }
  barChart = new Chart(ctx, config);
}

document.addEventListener("DOMContentLoaded", async () => {
  const elements = await loadJSON("data.json");
  if (!elements) return;

  const barFieldSelect = document.getElementById("barField");

  const numericFields = Object.keys(elements[0]).filter(
    (key) => typeof elements[0][key] === "number"
  );

  numericFields.forEach((field) => {
    const option = new Option(field, field);
    barFieldSelect.add(option);
  });

  barFieldSelect.value = "atomicMass";
  updateBarChart(elements, barFieldSelect.value);

  barFieldSelect.addEventListener("change", () => {
    const selectedField = barFieldSelect.value;
    updateBarChart(elements, selectedField);
  });
});
