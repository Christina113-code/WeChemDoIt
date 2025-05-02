document.addEventListener("DOMContentLoaded", async () => {
  async function loadJSON(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Could not load JSON: ", error);
      return null;
    }
  }

  const elements = await loadJSON("data.json");
  if (!elements) return;

  const elementSelect = document.getElementById("elementSelect");
  const ctx = document.getElementById("barChart").getContext("2d");

  // Populate element dropdown
  elements.forEach((el) => {
    const option = new Option(el.Name);
    elementSelect.add(option);
  });

  let barChart;

  function updateBarChart() {
    const selectedElementName = elementSelect.value;
    const element = elements.find((el) => el.Name === selectedElementName);
    console.log("Selected:", selectedElementName);
    console.log("Element found:", element);
    if (!element) return;

    const numericFields = Object.keys(element).filter(
      (key) => typeof element[key] === "number"
    );

    const labels = numericFields;
    const data = numericFields.map((field) => element[field]);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: selectedElementName,
          data: data,
          backgroundColor: "#550000",
          borderColor: "#550000",
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Properties of ${selectedElementName}`,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Property",
            },
            ticks: {
              autoSkip: false,
              maxRotation: 60,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Value",
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

  elementSelect.addEventListener("change", updateBarChart);

  elementSelect.value = elements[0].name; // default selection
  updateBarChart(); // Initial render
});
