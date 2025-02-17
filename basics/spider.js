// Radar Chart Data
const ctx = document.getElementById('spiderChart').getContext('2d');

const molecules = {
    water: [80, 70, 90, 60, 75, 85],
    oxygen: [60, 85, 70, 80, 90, 75],
    carbon_dioxide: [70, 60, 80, 85, 65, 90],
    glucose: [50, 75, 85, 60, 80, 70],
    ethanol: [90, 85, 80, 75, 70, 65],
    sodium_chloride: [40, 60, 75, 85, 95, 70],
    ammonia: [85, 75, 65, 95, 60, 80],
    sulfuric_acid: [70, 85, 80, 90, 75, 65],
    nitrogen: [60, 70, 85, 80, 90, 75],
    benzene: [95, 80, 75, 85, 60, 70]
};

const labelSets = {
    set1: ['Field A', 'Field B', 'Field C', 'Field D', 'Field E', 'Field F'],
    set2: ['Aspect 1', 'Aspect 2', 'Aspect 3', 'Aspect 4', 'Aspect 5', 'Aspect 6'],
    set3: ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4', 'Metric 5', 'Metric 6']
};

const data = {
    labels: labelSets.set1,
    datasets: [
        {
            label: 'Molecule 1',
            data: [],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
        },
        {
            label: 'Molecule 2',
            data: [],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
        },
        {
            label: 'Molecule 3',
            data: [],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
        }
        
    ]
};

// Create Radar Chart
const spiderChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

function updateChart() {
    let molecule1 = document.getElementById('molecule1').value;
    let molecule2 = document.getElementById('molecule2').value;
    let molecule3 = document.getElementById('molecule3').value;

    // Update chart data for all three molecules
    spiderChart.data.datasets[0].data = molecules[molecule1] || [90,90,90,90,90,90];
    spiderChart.data.datasets[1].data = molecules[molecule2] || [90,90,90,90,90,90];
    spiderChart.data.datasets[2].data = molecules[molecule3] || [90,90,90,90,90,90];

    spiderChart.update();
}

// Graph Navigation
let graphs = ["spider", "line", "bar", "scatter"];
let currentGraphIndex = 0;

function nextGraph() {
    currentGraphIndex = (currentGraphIndex + 1) % graphs.length;
    window.location.href = graphs[currentGraphIndex] + ".html";
}

function prevGraph() {
    currentGraphIndex = (currentGraphIndex - 1 + graphs.length) % graphs.length;
    window.location.href = graphs[currentGraphIndex] + ".html";
}
function updateLabels() {
    const selectedSet = document.getElementById('labelDropdown').value;
    spiderChart.data.labels = labelSets[selectedSet];
    spiderChart.update();
}