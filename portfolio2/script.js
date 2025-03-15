const citySelector = document.getElementById('city');
const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
const humidityCtx = document.getElementById('humidityChart').getContext('2d');
const windCtx = document.getElementById('windChart').getContext('2d');
const tooltip = document.getElementById('tooltip');
let map;
let marker;
let temperatureChart, humidityChart, windChart;

function generateMockWeatherData(city) {
    const data = {
        coord: {
            lat: 0,
            lon: 0
        },
        main: {
            temp: 0,
            humidity: 0
        },
        wind: {
            speed: 0
        }
    };

    if (city === 'London') {
        data.coord = { lat: 51.5074, lon: -0.1278 };
        data.main = { temp: 15, humidity: 70 };
        data.wind = { speed: 5 };
    } else if (city === 'New York') {
        data.coord = { lat: 40.7128, lon: -74.0060 };
        data.main = { temp: 20, humidity: 60 };
        data.wind = { speed: 7 };
    } else if (city === 'Tokyo') {
        data.coord = { lat: 35.6895, lon: 139.6917 };
        data.main = { temp: 25, humidity: 55 };
        data.wind = { speed: 3 };
    }

    return data;
}

function updateDashboard(data) {
    if (!map) {
        map = L.map('map').setView([data.coord.lat, data.coord.lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        marker = L.marker([data.coord.lat, data.coord.lon]).addTo(map);
    } else {
        map.setView([data.coord.lat, data.coord.lon], 10);
        marker.setLatLng([data.coord.lat, data.coord.lon]);
    }
    createCharts(data);
}

function createCharts(data) {
    const temperatureData = {
        labels: ['Temperature'],
        datasets: [{
            label: '°C',
            data: [data.main.temp],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const humidityData = {
        labels: ['Humidity'],
        datasets: [{
            label: '%',
            data: [data.main.humidity],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const windData = {
        labels: ['Wind Speed'],
        datasets: [{
            label: 'm/s',
            data: [data.wind.speed],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }]
    };

    if (temperatureChart) {
        temperatureChart.destroy();
        humidityChart.destroy();
        windChart.destroy();
    }

    temperatureChart = new Chart(temperatureCtx, { type: 'bar', data: temperatureData });
    humidityChart = new Chart(humidityCtx, { type: 'bar', data: humidityData });
    windChart = new Chart(windCtx, { type: 'bar', data: windData });
}

citySelector.addEventListener('change', () => {
    const data = generateMockWeatherData(citySelector.value);
    updateDashboard(data);
});

const initialData = generateMockWeatherData(citySelector.value);
updateDashboard(initialData); // Initial load