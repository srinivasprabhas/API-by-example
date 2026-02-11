"use client";

import { useState } from "react";

// ============================================
// ⚙️ CONFIG
// ============================================
const HOMEPAGE_URL = "https://api-by-example.vercel.app";

// Popular currency pairs for quick buttons
const QUICK_PAIRS = [
  { from: "USD", to: "EUR", label: "USD → EUR" },
  { from: "USD", to: "GBP", label: "USD → GBP" },
  { from: "EUR", to: "JPY", label: "EUR → JPY" },
  { from: "GBP", to: "INR", label: "GBP → INR" },
  { from: "USD", to: "JPY", label: "USD → JPY" },
];

// Common currencies for dropdowns
const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
];

export default function CurrencyConverterPage() {
  const [dark, setDark] = useState(false);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showJson, setShowJson] = useState(false);

  // Toggle dark mode
  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  // Swap from/to currencies
  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  // Get currency symbol by code
  const getSymbol = (code) => {
    const currency = CURRENCIES.find((c) => c.code === code);
    return currency ? currency.symbol : code;
  };

  // Call /api/convert
  const convert = async (fromCode, toCode, amt) => {
    const f = fromCode || from;
    const t = toCode || to;
    const a = amt || amount;

    if (!a || parseFloat(a) <= 0) return;

    setFrom(f);
    setTo(t);
    setAmount(a);
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `/api/convert?from=${encodeURIComponent(f)}&to=${encodeURIComponent(t)}&amount=${encodeURIComponent(a)}`
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

  // Handle quick pair click
  const handleQuickPair = (pair) => {
    setAmount("1");
    convert(pair.from, pair.to, "1");
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

      {/* ===== HERO + CONVERTER ===== */}
      <section className="hero">
        <h1 className="hero-title">Currency Converter</h1>
        <p className="hero-sub">
          Real-time exchange rates from ExchangeRate API. Convert between 150+ world currencies instantly.
        </p>

        {/* Converter input area */}
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          {/* Amount input */}
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
              Amount
            </label>
            <input
              className="search-input"
              type="number"
              min="0.01"
              step="any"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && convert()}
              style={{ paddingLeft: 20 }}
            />
          </div>

          {/* From / Swap / To row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 12,
              marginBottom: 16,
            }}
          >
            {/* From currency */}
            <div style={{ flex: 1 }}>
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
                From
              </label>
              <select
                className="select"
                value={from}
                onChange={(e) => { setFrom(e.target.value); setResult(null); }}
                style={{ width: "100%", padding: "14px 14px" }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap button */}
            <button
              onClick={swapCurrencies}
              style={{
                background: "var(--bg-sunken)",
                border: "1px solid var(--border-primary)",
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
                color: "var(--text-secondary)",
                transition: "all 0.15s ease",
                marginBottom: 1,
                flexShrink: 0,
              }}
              title="Swap currencies"
            >
              ⇄
            </button>

            {/* To currency */}
            <div style={{ flex: 1 }}>
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
                To
              </label>
              <select
                className="select"
                value={to}
                onChange={(e) => { setTo(e.target.value); setResult(null); }}
                style={{ width: "100%", padding: "14px 14px" }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Convert button */}
          <button
            className="search-btn"
            onClick={() => convert()}
            disabled={loading || !amount || parseFloat(amount) <= 0}
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
            {loading ? "Converting..." : "Convert"}
          </button>
        </div>

        {/* Quick pairs */}
        <div className="quick">
          {QUICK_PAIRS.map((pair) => (
            <button
              key={pair.label}
              className="quick-btn"
              onClick={() => handleQuickPair(pair)}
            >
              {pair.label}
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

        {/* Conversion result */}
        {!loading && result && (
          <div key={`${result.from}-${result.to}-${result.amount}`}>
            {/* Main result card — glassmorphic */}
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
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: 8,
                  }}
                >
                  {result.from} → {result.to}
                </div>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 700,
                    letterSpacing: "-2px",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {getSymbol(result.to)}{result.result.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}
                </div>
                <div style={{ fontSize: 16, color: "var(--text-secondary)" }}>
                  {result.amount.toLocaleString()} {result.from} = {result.result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {result.to}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 80, lineHeight: 1, marginBottom: 8, opacity: 0.8 }}>
                ⇄
                </div>
              </div>
            </div>

            {/* Stat cards — exchange rate details */}
            <div className="stats fade-in-1" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className="stat">
                <div className="stat-label">Exchange Rate</div>
                <div className="stat-value" style={{ fontSize: 18 }}>
                  {result.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Inverse Rate</div>
                <div className="stat-value" style={{ fontSize: 18 }}>
                  {(1 / result.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Amount</div>
                <div className="stat-value" style={{ fontSize: 18 }}>
                  {getSymbol(result.from)}{result.amount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Detail list — bordered rows */}
            <div className="detail-row fade-in-2">
              <div className="detail-item">
                <span className="detail-key">From</span>
                <span className="detail-val">{result.from}</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">To</span>
                <span className="detail-val">{result.to}</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Rate</span>
                <span className="detail-val">1 {result.from} = {result.rate} {result.to}</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Inverse</span>
                <span className="detail-val">1 {result.to} = {(1 / result.rate).toFixed(6)} {result.from}</span>
              </div>
              <div className="detail-item">
                <span className="detail-key">Last Updated</span>
                <span className="detail-val">{result.last_updated}</span>
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

        {/* Empty state — before any conversion */}
        {!loading && !result && !error && (
          <div className="empty">
            <div className="empty-icon">⇄</div>
            <div className="empty-text">Select currencies and enter an amount to convert</div>
            <div className="empty-hint">Try USD → EUR, GBP → INR, or any of 150+ currencies</div>
          </div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <span>
          Part of <a href={HOMEPAGE_URL}>API Learning Hub</a>
        </span>
        <span>Powered by ExchangeRate API</span>
      </footer>
    </div>
  );
}