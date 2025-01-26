const ctx = document.getElementById('lineGraph').getContext('2d');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
        datasets: [
            {
                label: 'Series 1',
                data: [10, 25, 15, 30, 40],
                borderColor: 'lightblue',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Series 2',
                data: [5, 20, 10, 25, 35],
                borderColor: 'cyan',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Series 3',
                data: [0, 10, 30, 20, 50],
                borderColor: 'aqua',
                borderWidth: 2,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    }
});
