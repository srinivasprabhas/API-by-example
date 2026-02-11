# Weather App API

## ⚡ Quick Copy

```js
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
```

## What This API Does

OpenWeatherMap provides real-time weather data for any city in the world. You send a city name, it returns temperature, humidity, wind speed, pressure, visibility, and weather conditions.

## What You'll Learn

- Making GET requests with query parameters
- Server-side API routes (hiding API keys)
- Input validation and error handling
- Structured JSON responses
- Using `encodeURIComponent()` for safe URLs
- Dark mode toggle with CSS variables

## Tech Used

| Tool | Purpose |
|------|---------|
| Next.js (App Router) | Framework |
| JavaScript | Language |
| OpenWeatherMap API | Weather data |
| Vercel | Hosting |

## API Endpoint

```
GET /api/weather?city=London
```

## Example Response

```json
{
  "city": "London",
  "country": "GB",
  "temperature": 12.5,
  "feels_like": 10.8,
  "temp_min": 10.2,
  "temp_max": 14.1,
  "description": "scattered clouds",
  "humidity": 72,
  "wind_speed": 5.1,
  "pressure": 1013,
  "visibility": 10
}
```

## How It Works

```
Browser → /api/weather?city=London → OpenWeatherMap API → Structured JSON → Browser
```

1. User types a city and clicks Search
2. Browser calls your API route: `/api/weather?city=London`
3. API route reads the key from `process.env`, calls OpenWeatherMap
4. OpenWeatherMap returns raw data
5. Route extracts the useful fields and returns clean JSON
6. Browser displays the result

The API key never reaches the browser.

## Environment Variables

```
OPENWEATHER_API_KEY=your_api_key_here
```

Get your free key at [openweathermap.org/api](https://openweathermap.org/api).

## Live Demo Link

[weather-api-abe.vercel.app](https://weather-api-abe.vercel.app)