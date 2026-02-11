"use client";

import { useState } from "react";

// ============================================
// PROJECT REGISTRY — Only add deployed projects
// ============================================
const PROJECTS = [
  // --- BEGINNER ---
  {
    id: "weather-api",
    tier: "beginner",
    number: 1,
    title: "Weather App API",
    api: "OpenWeatherMap",
    description: "Fetch real-time weather data for any city.",
    teaches: ["GET requests", "Query params", "Error handling"],
    url: "https://api-by-example-weather-api.vercel.app/",
  },
  {
    id: "currency-converter-api",
    tier: "beginner",
    number: 2,
    title: "Currency Converter API",
    api: "ExchangeRate API",
    description: "Convert between currencies using real-time exchange rates.",
    teaches: ["GET requests", "Query params", "Error handling"],
    url: "https://api-by-example-currency-converter-api.vercel.app/",
  },
  // {
  //   id: "joke-generator",
  //   tier: "beginner",
  //   number: 2,
  //   title: "Joke Generator API",
  //   api: "JokeAPI",
  //   description: "Random jokes on demand with category filters.",
  //   teaches: ["Simple GET", "JSON response", "Randomization"],
  //   url: "https://joke-generator-abe.vercel.app",
  // },

  // --- INTERMEDIATE ---
  // {
  //   id: "crypto-dashboard",
  //   tier: "intermediate",
  //   number: 1,
  //   title: "Crypto Dashboard",
  //   api: "CoinGecko",
  //   description: "Real-time cryptocurrency prices and market data.",
  //   teaches: ["Polling", "Data visualization", "Rate limits"],
  //   url: "https://crypto-dashboard-abe.vercel.app",
  // },

  // --- ADVANCED ---
  // {
  //   id: "ecommerce-api",
  //   tier: "advanced",
  //   number: 1,
  //   title: "E-commerce API",
  //   api: "Custom + Stripe",
  //   description: "Full CRUD with auth, cart, and payments.",
  //   teaches: ["Auth flows", "DB modeling", "Webhooks", "CRUD"],
  //   url: "https://ecommerce-api-abe.vercel.app",
  // },
];

const TIERS = {
  beginner: {
    key: "beginner",
    label: "Beginner",
    title: "Beginner Projects",
    description:
      "No database, no auth. Learn API routes, query parameters, external API consumption, and error handling.",
  },
  intermediate: {
    key: "intermediate",
    label: "Intermediate",
    title: "Intermediate Projects",
    description:
      "Pagination, rate limits, data transformation, and real-world API patterns. Optional database.",
  },
  advanced: {
    key: "advanced",
    label: "Advanced",
    title: "Advanced Projects",
    description:
      "Supabase database, authentication, protected routes, webhooks, and production-grade API flows.",
  },
};

const TIER_ORDER = ["beginner", "intermediate", "advanced"];

export default function Home() {
  const [activeTier, setActiveTier] = useState("beginner");
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute(
      "data-theme",
      next ? "dark" : "light"
    );
  };

  const filteredProjects = PROJECTS.filter((p) => p.tier === activeTier);
  const counts = TIER_ORDER.reduce((acc, tier) => {
    acc[tier] = PROJECTS.filter((p) => p.tier === tier).length;
    return acc;
  }, {});
  const tier = TIERS[activeTier];
  const totalProjects = PROJECTS.length;
  const liveCount = PROJECTS.filter((p) => p.url).length;

  return (
    <>
      {/* ===== NAV ===== */}
      <nav className="hp-nav">
        <a href="/" className="hp-logo">
          <span className="hp-logo-dot" />
          API by Example
        </a>
        <div className="hp-nav-r">
          <a
            href="https://github.com/srinivasprabhas"
            className="hp-nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <div className="hp-toggle-wrap">
            <span
              className="hp-sun"
              style={{ opacity: dark ? 0.3 : 1 }}
            >
              ☀
            </span>
            <button
              className={`hp-toggle${dark ? " on" : ""}`}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <span className="hp-toggle-knob" />
            </button>
            <span
              className="hp-moon"
              style={{
                opacity: dark ? 1 : 0.3,
                color: dark ? "#FBBF24" : undefined,
              }}
            >
              ☾
            </span>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hp-hero">
        <div className="hp-hero-tag">Open Source Learning Repo</div>
        <h1 className="hp-hero-title">
          Learn APIs by building real projects
        </h1>
        <p className="hp-hero-desc">
          Every project comes with a ready-to-use code snippet and a full
          Next.js app deployed on Vercel. No theory walls — just working code
          you can learn from or copy in 30 seconds.
        </p>
      </section>

      {/* ===== STATS ===== */}
      <div className="hp-stats">
        <div className="hp-stat">
          <span className="hp-stat-val">{totalProjects}</span>
          <span className="hp-stat-label">Projects</span>
        </div>
        <div className="hp-stat">
          <span className="hp-stat-val">{liveCount}</span>
          <span className="hp-stat-label">Live Demos</span>
        </div>
        <div className="hp-stat">
          <span className="hp-stat-val">{totalProjects}</span>
          <span className="hp-stat-label">Snippets</span>
        </div>
      </div>

      {/* ===== TIER NAV ===== */}
      <nav className="hp-tier-nav">
        {TIER_ORDER.map((t) => (
          <button
            key={t}
            className={`hp-tier-btn${activeTier === t ? " active" : ""}`}
            onClick={() => setActiveTier(t)}
          >
            <span className={`hp-tier-dot ${t}`} />
            {TIERS[t].label}
            <span className="hp-tier-count">{counts[t]}</span>
          </button>
        ))}
      </nav>

      {/* ===== PROJECTS ===== */}
      <main className="hp-projects">
        <div
          className="hp-t-header hp-fade"
          key={`header-${activeTier}`}
        >
          <span className={`hp-t-badge ${activeTier}`}>
            {tier.label}
          </span>
          <h2 className="hp-t-title">{tier.title}</h2>
          <p className="hp-t-desc">{tier.description}</p>
        </div>

        {filteredProjects.length > 0 ? (
          <div
            className="hp-grid hp-fade"
            key={`grid-${activeTier}`}
          >
            {filteredProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hp-card"
              >
                <span className="hp-card-num">
                  #{String(project.number).padStart(2, "0")}
                </span>
                <div className="hp-card-body">
                  <div className="hp-card-top">
                    <span className="hp-card-title">{project.title}</span>
                    <span className="hp-card-api">{project.api}</span>
                  </div>
                  <p className="hp-card-desc">{project.description}</p>
                  <div className="hp-card-tags">
                    {project.teaches.map((tag) => (
                      <span key={tag} className="hp-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hp-card-right">
                  <div className="hp-card-status">
                    <span className="hp-status-dot" />
                    Live
                  </div>
                  <span className="hp-card-arrow">→</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div
            className="hp-empty hp-fade"
            key={`empty-${activeTier}`}
          >
            <span className="hp-empty-icon">🚧</span>
            <span className="hp-empty-title">No projects yet</span>
            <span className="hp-empty-hint">
              {activeTier === "beginner"
                ? "Beginner projects are being built first. Check back soon!"
                : activeTier === "intermediate"
                ? "Intermediate projects come after all beginner projects are complete."
                : "Advanced projects are the final phase. Beginner and intermediate come first."}
            </span>
          </div>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="hp-footer">
        <a
          href="https://github.com/srinivasprabhas"
          target="_blank"
          rel="noopener noreferrer"
        >
          API by Example
        </a>
        {" "}— Learn APIs by building real projects · Built with Next.js ·
        Deployed on Vercel
      </footer>
    </>
  );
}