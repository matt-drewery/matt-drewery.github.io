document.addEventListener('DOMContentLoaded', () => {
    const citySelector = document.getElementById('city');
    const combinedCtx = document.getElementById('combinedChart').getContext('2d');
    const historicalCtx = document.getElementById('historicalChart').getContext('2d');
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    const tooltip = document.getElementById('tooltip');
    const temperatureRangeOutput = document.getElementById('temperatureRangeValue');
    let map;
    let marker;
    let combinedChart, historicalChart, radarChart;
    let temperatureRange = [0, 35]; // Initial temperature range
    let $temperatureRange = $('#temperatureRange'); // Cache the jQuery object


    function generateMockWeatherData(city) {
        const data = {
            coord: { lat: 0, lon: 0 },
            main: { temp: 0, humidity: 0 },
            wind: { speed: 0 },
            historical: [],
            radar: { temp: 0, humidity: 0, wind: 0 }
        };

        if (city === 'London') {
            data.coord = { lat: 51.5074, lon: -0.1278 };
            data.main = { temp: 12, humidity: 80 };
            data.wind = { speed: 6 };
            data.historical = [8, 9, 11, 13, 15, 17, 18, 17, 15, 13, 10, 9];
            data.radar = { temp: 12, humidity: 80, wind: 6 };
        } else if (city === 'New York') {
            data.coord = { lat: 40.7128, lon: -74.0060 };
            data.main = { temp: 22, humidity: 65 };
            data.wind = { speed: 8 };
            data.historical = [2, 4, 8, 14, 20, 25, 28, 27, 22, 16, 10, 5];
            data.radar = { temp: 22, humidity: 65, wind: 8 };
        } else if (city === 'Tokyo') {
            data.coord = { lat: 35.6895, lon: 139.6917 };
            data.main = { temp: 27, humidity: 75 };
            data.wind = { speed: 4 };
            data.historical = [5, 8, 12, 18, 23, 27, 30, 31, 28, 22, 16, 10];
            data.radar = { temp: 27, humidity: 75, wind: 4 };
        }

        return data;
    }

    function updateDashboard(data) {
        if (!map) {
            map = L.map('map').setView([data.coord.lat, data.coord.lon], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            marker = L.marker([data.coord.lat, data.coord.lon]).addTo(map).bindPopup(
                `<b>${citySelector.value}</b><br>Temperature: ${data.main.temp}°C<br>Humidity: ${data.main.humidity}%<br>Wind Speed: ${data.wind.speed} m/s`
            );
        } else {
            map.setView([data.coord.lat, data.coord.lon], 10);
            marker.setLatLng([data.coord.lat, data.coord.lon]).setPopupContent(
                `<b>${citySelector.value}</b><br>Temperature: ${data.main.temp}°C<br>Humidity: ${data.main.humidity}%<br>Wind Speed: ${data.wind.speed} m/s`
            );
        }

        // Filter historical data based on the current temperatureRange
        const filteredHistorical = data.historical.filter(temp => {
            return temp >= temperatureRange[0] && temp <= temperatureRange[1];
        });

        // Create a new data object with filtered historical data
        const filteredData = {
            ...data,
            historical: filteredHistorical
        };

        createCharts(filteredData);
    }

    function createCharts(data) {
        const combinedData = {
            labels: ['Temperature', 'Humidity', 'Wind Speed'],
            datasets: [{
                label: 'Current Conditions',
                data: [data.main.temp, data.main.humidity, data.wind.speed],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        };

        const historicalData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Average Temperature (°C)',
                data: data.historical,
                fill: false,
                borderColor: '#bb86fc',
                tension: 0.3,
                pointBackgroundColor: '#bb86fc',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#bb86fc'
            }]
        };

        const radarData = {
            labels: ['Temperature', 'Humidity', 'Wind Speed'],
            datasets: [{
                label: 'Weather Conditions',
                data: [data.radar.temp, data.radar.humidity, data.radar.wind],
                backgroundColor: 'rgba(179, 181, 198, 0.4)',
                borderColor: 'rgba(179, 181, 198, 1)',
                pointBackgroundColor: 'rgba(179, 181, 198, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179, 181, 198, 1)'
            }]
        };

        if (combinedChart) {
            combinedChart.destroy();
            historicalChart.destroy();
            radarChart.destroy();
        }

        combinedChart = new Chart(combinedCtx, { type: 'bar', data: combinedData, options: {
            scales: { y: { beginAtZero: true } },
            plugins: { tooltip: { callbacks: { label: function(context) {
                const label = context.label || '';
                const value = context.parsed.y;
                if (label === 'Temperature') return `Temperature: ${value}°C`;
                if (label === 'Humidity') return `Humidity: ${value}%`;
                if (label === 'Wind Speed') return `Wind Speed: ${value} m/s`;
                return `${label}: ${value}`;
            } } } } } });

        historicalChart = new Chart(historicalCtx, { type: 'line', data: historicalData, options: {
            scales: { y: { beginAtZero: true } },
            plugins: { tooltip: { mode: 'index', intersect: false } } } });

        radarChart = new Chart(radarCtx, { type: 'radar', data: radarData, options: {
            scales: { r: { angleLines: { color: 'rgba(255, 255, 255, 0.1)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }, pointLabels: { color: '#e0e0e0' } } },
            plugins: { tooltip: { mode: 'point' } } } });
    }

    // Initialize rangeslider
    $temperatureRange.rangeslider({
        polyfill: false,
        rangeClass: 'rangeslider',
        fillClass: 'rangeslider__fill',
        handleClass: 'rangeslider__handle',
        start: [0, 35],

        onInit: function() {
            // Get initial values from the plugin
            const values = this.value.split(',').map(Number);
            temperatureRange[0] = values[0];
            temperatureRange[1] = values[1];
            temperatureRangeOutput.textContent = `${temperatureRange[0]}°C - ${temperatureRange[1]}°C`;
        },
        onSlide: function(position, value) {
            // Get the values, split the string, and convert to numbers
            const values = this.value.split(',').map(Number);
            temperatureRange[0] = values[0];
            temperatureRange[1] = values[1];
            temperatureRangeOutput.textContent = `${temperatureRange[0]}°C - ${temperatureRange[1]}°C`;

            const selectedCity = citySelector.value;
            const currentData = generateMockWeatherData(selectedCity);
            updateDashboard(currentData);
        },
        onSlideEnd: function(position, value) {
            const values = this.value.split(',').map(Number);
            temperatureRange[0] = values[0];
            temperatureRange[1] = values[1];
            const selectedCity = citySelector.value;
            const currentData = generateMockWeatherData(selectedCity);
            updateDashboard(currentData);
        }
    });

    citySelector.addEventListener('change', () => {
        const data = generateMockWeatherData(citySelector.value);
        updateDashboard(data);
    });

    // Initial data load
    const initialData = generateMockWeatherData(citySelector.value);
    updateDashboard(initialData);
});