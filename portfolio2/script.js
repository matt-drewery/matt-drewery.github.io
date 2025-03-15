const apiKey = '8084cd39c882ef990f599f57a10ed30e'; // Replace with your API key
const citySelector = document.getElementById('city');
const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
const humidityCtx = document.getElementById('humidityChart').getContext('2d');
const windCtx = document.getElementById('windChart').getContext('2d');
const tooltip = document.getElementById('tooltip');
let map;
let marker;
let temperatureChart, humidityChart, windChart;

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateDashboard(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
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
    fetchWeatherData(citySelector.value);
});

fetchWeatherData(citySelector.value); // Initial load