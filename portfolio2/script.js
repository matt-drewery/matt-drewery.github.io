const ctx = document.getElementById('weatherChart').getContext('2d');
const citySelector = document.getElementById('city');

let weatherChart;

function generateWeatherData(city) {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const temperatures = labels.map(() => Math.floor(Math.random() * 25) + (city === 'London' ? 0 : city === 'NewYork' ? -5 : 5)); // Simulated temperature data

    return { labels, temperatures };
}

function createChart(city) {
    const data = generateWeatherData(city);

    if (weatherChart) {
        weatherChart.destroy();
    }

    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Average Temperature (°C)',
                data: data.temperatures,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

createChart(citySelector.value);

citySelector.addEventListener('change', () => {
    createChart(citySelector.value);
});