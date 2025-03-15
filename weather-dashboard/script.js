document.addEventListener('DOMContentLoaded', () => {
    const citySelector = document.getElementById('city');
    const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
    const humidityCtx = document.getElementById('humidityChart').getContext('2d');
    const windCtx = document.getElementById('windChart').getContext('2d');
    const historicalCtx = document.getElementById('historicalChart').getContext('2d');
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    const tooltip = document.getElementById('tooltip');
    let map;
    let marker;
    let temperatureChart, humidityChart, windChart, historicalChart, radarChart;
    let temperatureRange = [0, 35]; // Default temperature range

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
                `<b>${citySelector.value}</b><br>Temp: ${data.main.temp}°C<br>Humidity: ${data.main.humidity}%<br>Wind: ${data.wind.speed} m/s`
            );
        } else {
            map.setView([data.coord.lat, data.coord.lon], 10);
            marker.setLatLng([data.coord.lat, data.coord.lon]).setPopupContent(
                `<b>${citySelector.value}</b><br>Temp: ${data.main.temp}°C<br>Humidity: ${data.main.humidity}%<br>Wind: ${data.wind.speed} m/s`
            );
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

        const historicalData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Average Temperature (°C)',
                data: data.historical,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        const radarData = {
            labels: ['Temperature', 'Humidity', 'Wind Speed'],
            datasets: [{
                label: 'Weather Conditions',
                data: [data.radar.temp, data.radar.humidity, data.radar.wind],
                backgroundColor: 'rgba(179, 181, 198, 0.2)',
                borderColor: 'rgba(179, 181, 198, 1)',
                pointBackgroundColor: 'rgba(179, 181, 198, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179, 181, 198, 1)'
            }]
        };

        if (temperatureChart) {
            temperatureChart.destroy();
            humidityChart.destroy();
            windChart.destroy();
            historicalChart.destroy();
            radarChart.destroy();
        }

        temperatureChart = new Chart(temperatureCtx, { type: 'bar', data: temperatureData });
        humidityChart = new Chart(humidityCtx, { type: 'bar', data: humidityData });
        windChart = new Chart(windCtx, { type: 'bar', data: windData });
        historicalChart = new Chart(historicalCtx, { type: 'line', data: historicalData });
        radarChart = new Chart(radarCtx, { type: 'radar', data: radarData });
    }

    citySelector.addEventListener('change', () => {
        const data = generateMockWeatherData(citySelector.value);
        updateDashboard(data);
    });

    const initialData = generateMockWeatherData(citySelector.value);
    updateDashboard(initialData); // Initial load

    $('input[data-rangeslider]').rangeslider({
        onSlide: function(position, value) {
            temperatureRange = value.split(',');
            document.getElementById('temperatureRangeValue').innerHTML = `${temperatureRange[0]}°C - ${temperatureRange[1]}°C`;
        },
        onLoad: function(position, value) {
            document.getElementById('temperatureRangeValue').innerHTML = `${temperatureRange[0]}°C - ${temperatureRange[1]}°C`;
        }
    });
}); 