document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("barChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
        "Category 6",
      ],
      datasets: [
        {
          label: "Sample Data",
          data: [12, 19, 3, 5, 2, 10],
          backgroundColor: [
            "rgba(128, 0, 0, 0.6)", // Maroon
            "rgba(255, 215, 0, 0.6)", // Gold
            "rgba(128, 0, 0, 0.6)", // Maroon
            "rgba(255, 215, 0, 0.6)", // Gold
            "rgba(128, 0, 0, 0.6)", // Maroon
            "rgba(255, 215, 0, 0.6)", // Gold
          ],
          borderColor: [
            "rgba(128, 0, 0, 1)", // Maroon
            "rgba(255, 215, 0, 1)", // Gold
            "rgba(128, 0, 0, 1)", // Maroon
            "rgba(255, 215, 0, 1)", // Gold
            "rgba(128, 0, 0, 1)", // Maroon
            "rgba(255, 215, 0, 1)", // Gold
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
