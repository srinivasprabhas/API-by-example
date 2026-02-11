// app/api/weather/route.js
// Server-side API route — hides API key from the browser
// CUSTOMIZE: endpoint URL, query params, response structure

export async function GET(request) {
  try {
    // 1. Get query parameters
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    // 2. Validate input
    if (!city) {
      return Response.json(
        { error: "City parameter is required" },
        { status: 400 }
      );
    }

    // 3. Get API key from environment (never hardcode)
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!API_KEY) {
      console.error("OPENWEATHER_API_KEY is not set");
      return Response.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 4. Call external API (server-side — key is hidden)
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    // 5. Handle external API errors
    if (!res.ok) {
      if (res.status === 404) {
        return Response.json(
          { error: `City "${city}" not found` },
          { status: 404 }
        );
      }
      return Response.json(
        { error: "Failed to fetch weather data" },
        { status: res.status }
      );
    }

    // 6. Return STRUCTURED JSON (not raw external response)
    const data = await res.json();

    return Response.json({
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
    });
  } catch (error) {
    // 7. Catch unexpected errors
    console.error("Weather API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
