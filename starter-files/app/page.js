// app/page.js
// Universal project UI template
// CUSTOMIZE the config section below for each project

"use client";

import { useState } from "react";

// ============================================
// CUSTOMIZE THESE FOR EACH PROJECT
// ============================================
const PROJECT_NAME = "Weather API";
const TIER = "beginner"; // "beginner" | "intermediate" | "advanced"
const DESCRIPTION =
  "Fetch real-time weather data for any city using the OpenWeatherMap API.";
const INPUT_LABEL = "Enter a city name";
const INPUT_PLACEHOLDER = "London";
const API_ENDPOINT = "/api/weather";
const QUERY_PARAM = "city";
// Replace with your actual repo-vercel homepage URL
const HOMEPAGE_URL = "https://api-by-example.vercel.app";
// ============================================

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `${API_ENDPOINT}?${QUERY_PARAM}=${encodeURIComponent(query.trim())}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Failed to connect to the API. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      {/* --- Navbar --- */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-title">{PROJECT_NAME}</span>
          <span className={`tier-badge ${TIER}`}>{TIER}</span>
        </div>
        <div className="navbar-right">
          <a href={HOMEPAGE_URL} className="navbar-back">
            ← All Projects
          </a>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      {/* --- Main --- */}
      <main className="main-content">
        <p className="page-description">{DESCRIPTION}</p>

        {/* --- Input --- */}
        <div className="input-section">
          <label className="input-label">{INPUT_LABEL}</label>
          <div className="input-row">
            <input
              className="input-field"
              type="text"
              placeholder={INPUT_PLACEHOLDER}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading || !query.trim()}
            >
              {loading ? "Loading" : "Search"}
              {loading && <span className="loading-dots" />}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>

        {/* --- Result --- */}
        {result && (
          <div className="result-section">
            <div className="result-card">
              {/* ============================================
                  CUSTOMIZE: Display your result data here
                  Below is the Weather API example
                  ============================================ */}
              <h2 className="result-title">
                {result.city}, {result.country}
              </h2>

              <div className="result-grid">
                <div className="result-item">
                  <span className="result-item-label">Temperature</span>
                  <span className="result-item-value large">
                    {result.temperature}°C
                  </span>
                </div>
                <div className="result-item">
                  <span className="result-item-label">Feels Like</span>
                  <span className="result-item-value">
                    {result.feels_like}°C
                  </span>
                </div>
                <div className="result-item">
                  <span className="result-item-label">Weather</span>
                  <span className="result-item-value">
                    {result.description}
                  </span>
                </div>
                <div className="result-item">
                  <span className="result-item-label">Humidity</span>
                  <span className="result-item-value">{result.humidity}%</span>
                </div>
                <div className="result-item">
                  <span className="result-item-label">Wind Speed</span>
                  <span className="result-item-value">
                    {result.wind_speed} m/s
                  </span>
                </div>
              </div>
              {/* ============================================ */}

              {/* --- Raw JSON --- */}
              <div className="json-toggle">
                <button
                  className={`json-toggle-btn ${showJson ? "active" : ""}`}
                  onClick={() => setShowJson(!showJson)}
                >
                  {showJson ? "Hide" : "Show"} Raw JSON
                </button>
              </div>

              {showJson && (
                <div className="json-output">
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* --- Footer --- */}
      <footer className="footer">
        <a href={HOMEPAGE_URL} target="_blank" rel="noopener noreferrer">
          API by Example
        </a>{" "}
        — Learn APIs by building real projects
      </footer>
    </>
  );
}
