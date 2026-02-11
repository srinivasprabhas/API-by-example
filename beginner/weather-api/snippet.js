// Weather API Snippet — OpenWeatherMap
// Usage: Replace YOUR_API_KEY, then run: node snippet.js

const city = "London";
const API_KEY = "YOUR_API_KEY";

const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);
const data = await res.json();

console.log(`City: ${data.name}, ${data.sys.country}`);
console.log(`Temperature: ${data.main.temp}°C`);
console.log(`Feels Like: ${data.main.feels_like}°C`);
console.log(`High: ${data.main.temp_max}°C / Low: ${data.main.temp_min}°C`);
console.log(`Weather: ${data.weather[0].description}`);
console.log(`Humidity: ${data.main.humidity}%`);
console.log(`Wind Speed: ${data.wind.speed} m/s`);
console.log(`Pressure: ${data.main.pressure} hPa`);
console.log(`Visibility: ${Math.round(data.visibility / 1000)} km`);