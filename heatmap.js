document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("heatmapChart").getContext("2d");

    // Labels for X and Y axes
    const xLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const yLabels = ["Morning", "Afternoon", "Evening"];

    // Generate random dummy data for heatmap
    const data = [];
    for (let i = 0; i < yLabels.length; i++) {
        for (let j = 0; j < xLabels.length; j++) {
            data.push({ x: j, y: i, value: Math.floor(Math.random() * 100) });
        }
    }

    new Chart(ctx, {
        type: "bubble",
        data: {
            datasets: [{
                label: "Heatmap Data",
                data: data.map(d => ({
                    x: d.x,
                    y: d.y,
                    r: d.value / 5 // Bubble size based on value
                })),
                backgroundColor: data.map(d => `rgba(255, ${255 - d.value * 2}, ${255 - d.value * 2}, 0.8)`)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "linear",
                    position: "bottom",
                    ticks: {
                        callback: (value) => xLabels[value],
                        stepSize: 1
                    }
                },
                y: {
                    type: "linear",
                    ticks: {
                        callback: (value) => yLabels[value],
                        stepSize: 1
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `Value: ${data[context.dataIndex].value}`
                    }
                }
            }
        }
    });
});
