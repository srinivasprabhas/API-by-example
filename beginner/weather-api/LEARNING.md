# Weather App API — What You'll Learn

## Concepts Covered

### 1. Server-Side API Routes
Your browser never talks to OpenWeatherMap directly. Instead, it calls YOUR API route (`/api/weather`), which calls OpenWeatherMap on the server. This keeps your API key hidden.

### 2. GET Requests with Query Parameters
The browser sends: `/api/weather?city=London`
Your route reads the `city` parameter using `searchParams.get("city")`.

### 3. Environment Variables
API keys live in `.env.local` and are accessed via `process.env.OPENWEATHER_API_KEY`. They never appear in browser code.

### 4. Input Validation
Before calling the external API, the route checks if a city was provided. If not, it returns a `400 Bad Request` with a clear error message.

### 5. Error Handling
- Missing input → `400`
- City not found → `404`
- External API down → forwards the status code
- Unexpected crash → `500` via try/catch

### 6. Structured JSON Responses
Instead of forwarding the raw OpenWeatherMap response (which has deeply nested data), the route returns a clean, flat object with only the fields the UI needs.

### 7. `encodeURIComponent()`
User input like "New York" contains a space. `encodeURIComponent` converts it to `New%20York` so the URL doesn't break.

---

## Architecture

```
Browser (page.js)
    ↓ fetch("/api/weather?city=London")
Your API Route (app/api/weather/route.js)
    ↓ fetch("https://api.openweathermap.org/...")  [with API key]
OpenWeatherMap API
    ↓ raw response
Your API Route
    ↓ structured JSON { city, temperature, humidity, ... }
Browser
    ↓ displays result
```

---

## Key Files to Study

| File | What to Learn |
|------|--------------|
| `app/api/weather/route.js` | Server-side API route pattern, error handling, structured responses |
| `app/page.js` | Client-side fetching, loading/error states, dark mode toggle |
| `snippet.js` | The raw API call stripped of all framework code |
| `.env.example` | How environment variables are structured |

---

## Key Takeaway

**Never expose API keys to the browser.** Always proxy external API calls through your own server-side route. This is the #1 pattern you'll use in every project in this repo.