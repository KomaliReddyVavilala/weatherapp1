document.getElementById('openWeatherCard').addEventListener('click', function() {
    const card = document.getElementById('cardContainer');
  
    if (card.style.display === 'flex') {
        card.style.display = 'none';
    } else {
        card.style.display = 'flex'; 
    }
});

document.getElementById('search-btn').addEventListener('click', async () => {
    const searchBox = document.getElementById('search-box');
    const city = searchBox.value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Your OpenWeather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert(error.message);
    }
});

function updateWeather(data) {
    document.querySelector('.city').textContent = data.name;
    document.querySelector('.temp').textContent = `${data.main.temp}°C`;
    document.querySelector('.description').textContent = data.weather[0].description;
    document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.querySelector('.humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.querySelector('.wind').textContent = `Wind Speed: ${data.wind.speed} km/h`;
    document.querySelector('.pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
    document.querySelector('.timezone').textContent = `Timezone: UTC ${data.timezone / 3600}`;
    document.querySelector('.visibility').textContent = `Visibility: ${data.visibility / 1000} km`;
}
