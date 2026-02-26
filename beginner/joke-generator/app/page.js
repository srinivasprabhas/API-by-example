"use client";

import { useState } from "react";

// ============================================
// ⚙️ CONFIG
// ============================================
const HOMEPAGE_URL = "https://api-by-example.vercel.app";

// Available joke categories from JokeAPI v2
const CATEGORIES = [
  { value: "Any", label: "Any", emoji: "🎲" },
  { value: "Programming", label: "Programming", emoji: "💻" },
  { value: "Miscellaneous", label: "Miscellaneous", emoji: "🎭" },
  { value: "Pun", label: "Pun", emoji: "😏" },
  { value: "Spooky", label: "Spooky", emoji: "👻" },
  { value: "Christmas", label: "Christmas", emoji: "🎄" },
];

export default function JokeGeneratorPage() {
  const [dark, setDark] = useState(false);
  const [category, setCategory] = useState("Any");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showJson, setShowJson] = useState(false);

  // Toggle dark mode — same pattern as currency converter
  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  // Fetch a joke from our API route
  const getJoke = async (cat) => {
    const c = cat || category;
    setCategory(c);
    setLoading(true);
    setError("");
    setResult(null);
    setShowJson(false);

    try {
      const res = await fetch(
        `/api/joke?category=${encodeURIComponent(c)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data);
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

      {/* ===== HERO + INPUT ===== */}
      <section className="hero">
        <h1 className="hero-title">Joke Generator</h1>
        <p className="hero-sub">
          Random jokes from JokeAPI v2 — no API key required.
          Pick a category and learn how to handle different JSON response formats.
        </p>

        {/* Category selector + Get Joke button */}
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          {/* Category dropdown */}
          <div style={{ marginBottom: 12 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "var(--text-muted)",
                marginBottom: 6,
              }}
            >
              Category
            </label>
            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%", padding: "14px 14px" }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Get Joke button — same class as currency converter */}
          <button
            className="search-btn"
            onClick={() => getJoke()}
            disabled={loading}
            style={{
              position: "relative",
              width: "100%",
              transform: "none",
              top: "auto",
              right: "auto",
              padding: "14px 20px",
              fontSize: 14,
            }}
          >
            {loading ? "Getting joke..." : "Get Joke 🎲"}
          </button>
        </div>

        {/* Quick category buttons */}
        <div className="quick">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              className="quick-btn"
              onClick={() => getJoke(cat.value)}
            >
              {cat.emoji} {cat.label}
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

        {/* Joke result */}
        {!loading && result && (
          <div key={`${result.id}-${result.category}`}>
            {/* Main joke card — glassmorphic */}
            <div className="glass-card fade-in" style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: 24,
                }}
              >
                {result.category}
              </div>

              {result.type === "single" ? (
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: "var(--text-primary)",
                    maxWidth: 560,
                    margin: "0 auto",
                  }}
                >
                  {result.joke}
                </div>
              ) : (
                <>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      lineHeight: 1.6,
                      color: "var(--text-primary)",
                      marginBottom: 20,
                    }}
                  >
                    {result.setup}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      lineHeight: 1.5,
                      color: "var(--success)",
                      fontStyle: "italic",
                    }}
                  >
                    {result.delivery}
                  </div>
                </>
              )}

              <div
                style={{
                  marginTop: 24,
                  fontSize: 12,
                  color: "var(--text-faint)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Joke #{result.id}
              </div>
            </div>

            {/* Stat cards — joke metadata */}
            <div className="stats fade-in-1" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className="stat">
                <div className="stat-label">Category</div>
                <div className="stat-value" style={{ fontSize: 18 }}>
                  {result.category}
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Type</div>
                <div className="stat-value" style={{ fontSize: 18 }}>
                  {result.type === "single" ? "One-liner" : "Two-part"}
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Safe</div>
                <div className="stat-value" style={{ fontSize: 18 }}>
                  {result.safe ? "✓ Yes" : "✗ No"}
                </div>
              </div>
            </div>

            {/* Detail list — bordered rows */}
            <div className="detail-row fade-in-2">
              <div className="detail-item">
                <span className="detail-key">Category</span>
                <span className="detail-val">{result.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Type</span>
                <span className="detail-val">{result.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Joke ID</span>
                <span className="detail-val">#{result.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Language</span>
                <span className="detail-val">{result.lang}</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Safe</span>
                <span className="detail-val">{result.safe ? "Yes" : "No"}</span>
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
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Empty state — before any joke is fetched */}
        {!loading && !result && !error && (
          <div className="empty">
            <div className="empty-icon">😂</div>
            <div className="empty-text">Ready to laugh?</div>
            <div className="empty-hint">Pick a category and hit "Get Joke" — or click a quick button above</div>
          </div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <span>
          Part of <a href={HOMEPAGE_URL}>API Learning Hub</a>
        </span>
        <span>Powered by JokeAPI</span>
      </footer>
    </div>
  );
}