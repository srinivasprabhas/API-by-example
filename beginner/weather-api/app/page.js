"use client";

import { useState, useEffect } from "react";

// ============================================
// ⚙️ CONFIG
// ============================================
const QUICK_CITIES = ["London", "Tokyo", "New York", "Dubai", "Paris"];
const HOMEPAGE_URL = "https://api-by-example.vercel.app";

export default function WeatherPage() {
  const [dark, setDark] = useState(false);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [time, setTime] = useState(new Date());
  const [showJson, setShowJson] = useState(false);

  // Update clock every minute
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Toggle dark mode on the root element
  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  // Map weather description to emoji icon
  const getIcon = (description) => {
    const d = (description || "").toLowerCase();
    if (d.includes("clear")) return "☀️";
    if (d.includes("cloud") && d.includes("scatter")) return "⛅";
    if (d.includes("cloud")) return "☁️";
    if (d.includes("rain") || d.includes("drizzle")) return "🌧";
    if (d.includes("thunder")) return "⛈";
    if (d.includes("snow")) return "❄️";
    if (d.includes("mist") || d.includes("fog") || d.includes("haze")) return "🌫";
    return "🌤";
  };

  // Call /api/weather with the city
  const search = async (c) => {
    const q = c || city;
    if (!q.trim()) return;

    setCity(q);
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setWeather(data);
      setTime(new Date());
    } catch (err) {
      setError("Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ===== NAVBAR ===== */}
      <nav className="nav">
        <a href={HOMEPAGE_URL} className="nav-logo">
          <span className="nav-dot" />
          API Learning Hub
        </a>
        <div className="nav-right">
          <span className="tier-badge tier-badge-beginner"> Beginner</span>
          <a className="nav-link" href={HOMEPAGE_URL}>← All Projects</a>
          <div className="theme-icons">
            <span className="theme-sun" style={{ opacity: dark ? 0.3 : 1 }}>☀</span>
            <button
              className={`theme-toggle${dark ? " on" : ""}`}
              onClick={toggleDark}
              aria-label="Toggle theme"
            >
              <span className="theme-knob" />
            </button>
            <span
              className="theme-moon"
              style={{ opacity: dark ? 1 : 0.3, color: dark ? "#FBBF24" : undefined }}
            >
              ☾
            </span>
          </div>
        </div>
      </nav>

      {/* ===== HERO + SEARCH ===== */}
      <section className="hero">
        <h1 className="hero-title">Weather</h1>
        <p className="hero-sub">
          Real-time weather data from OpenWeatherMap. Search any city to see current conditions.
        </p>

        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <button
            className="search-btn"
            onClick={() => search()}
            disabled={loading || !city.trim()}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        <div className="quick">
          {QUICK_CITIES.map((c) => (
            <button key={c} className="quick-btn" onClick={() => search(c)}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="content">
        {/* Error — inline, no popups */}
        {error && <div className="error-inline fade-in">{error}</div>}

        {/* Loading spinner */}
        {loading && (
          <div className="loading-center">
            <div className="spinner" />
          </div>
        )}

        {/* Weather result */}
        {!loading && weather && (
          <div key={weather.city}>
            {/* Main weather card — glassmorphic */}
            <div
              className="glass-card fade-in"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "8px",
                  }}
                >
                  {weather.city}, {weather.country}
                </div>
                <div
                  style={{
                    fontSize: "72px",
                    fontWeight: 700,
                    letterSpacing: "-3px",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {Math.round(weather.temperature)}°
                </div>
                <div style={{ fontSize: "16px", color: "var(--text-secondary)" }}>
                  {weather.description}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    marginTop: "4px",
                  }}
                >
                  Feels like {Math.round(weather.feels_like)}°C
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "80px", lineHeight: 1, marginBottom: "8px" }}>
                  {getIcon(weather.description)}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                    ↑ {Math.round(weather.temp_max)}°
                  </span>{" "}
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                    ↓ {Math.round(weather.temp_min)}°
                  </span>
                </div>
              </div>
            </div>

            {/* Stat cards — 4 column grid */}
            <div className="stats fade-in-1">
              <div className="stat">
                <div className="stat-label">Humidity</div>
                <div className="stat-value">
                  {weather.humidity}
                  <span className="stat-unit">%</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Wind Speed</div>
                <div className="stat-value">
                  {weather.wind_speed}
                  <span className="stat-unit">m/s</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Pressure</div>
                <div className="stat-value">
                  {weather.pressure}
                  <span className="stat-unit">hPa</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Visibility</div>
                <div className="stat-value">
                  {weather.visibility}
                  <span className="stat-unit">km</span>
                </div>
              </div>
            </div>

            {/* Detail list — bordered rows */}
            <div className="detail-row fade-in-2">
              <div className="detail-item">
                <span className="detail-key">Temperature</span>
                <span className="detail-val">{weather.temperature}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Feels Like</span>
                <span className="detail-val">{weather.feels_like}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">High / Low</span>
                <span className="detail-val">
                  {Math.round(weather.temp_max)}° / {Math.round(weather.temp_min)}°
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Condition</span>
                <span className="detail-val">{weather.description}</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Updated</span>
                <span className="detail-val">
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {/* Raw JSON toggle */}
            <div className="json-toggle fade-in-3">
              <button
                className="json-toggle-btn"
                onClick={() => setShowJson(!showJson)}
              >
                {showJson ? "▾ Hide" : "▸ Show"} Raw JSON
              </button>
              {showJson && (
                <pre className="json-output">
                  {JSON.stringify(weather, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Empty state — before any search */}
        {!loading && !weather && !error && (
          <div className="empty">
            <div className="empty-icon">🌤</div>
            <div className="empty-text">Search for a city to see the weather</div>
            <div className="empty-hint">Try London, Tokyo, New York, Dubai, or Paris</div>
          </div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <span>
          Part of <a href={HOMEPAGE_URL}>API Learning Hub</a>
        </span>
        <span>Powered by OpenWeatherMap</span>
      </footer>
    </div>
  );
}