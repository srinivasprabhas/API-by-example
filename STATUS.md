# API by Example — STATUS.md

> Current state of the project. Updated manually after each milestone.

**Last updated:** February 11, 2026

---

## Current Phase: Phase 1 — Setup (COMPLETE)

We are at the end of **Phase 1** and ready to begin **Phase 2 — Gold Standard**.

---

## What's Been Done

### Planning & Documentation
| Item | Status |
|------|--------|
| PLAN.md — Vision, architecture, project list, tech stack, tier rules | Done |
| GUIDE.md — Step-by-step execution rulebook (14 sections) | Done |
| Starter files — Templates for individual projects (page.js, layout.js, globals.css, route.js, apiClient.js, snippet.js, LEARNING.md, .env.example) | Done |

### repo-vercel (Homepage)
| Item | Status |
|------|--------|
| Built with Next.js (App Router) | Done |
| Hero section + tab filters (Beginner / Intermediate / Advanced) | Done |
| Stats bar (project count, live demos, snippets) | Done |
| Project cards grid with tier filtering | Done |
| Dark mode / light mode toggle | Done |
| Empty state for tiers with no projects yet | Done |
| Deployed to Vercel | Done |
| **Live URL:** [api-by-example.vercel.app](https://api-by-example.vercel.app/) | Working |

### Repository Structure
| Item | Status |
|------|--------|
| `repo-vercel/` — Homepage app | Created & deployed |
| `starter-files/` — Project templates | Created |
| `PLAN.md` | Created |
| `GUIDE.md` | Created |
| `beginner/` — Beginner projects folder | Not yet created |
| `intermediate/` — Intermediate projects folder | Not yet created |
| `advanced/` — Advanced projects folder | Not yet created |
| `snippets/` — Quick-copy snippets folder | Not yet created |
| `docs/` — Guides and references | Not yet created |
| `shared/` — Reusable utilities | Not yet created |
| `templates/` — Project starter template | Not yet created |
| `.github/` — PR template | Not yet created |
| Root `README.md` | Not yet created |

---

## What's NOT Done Yet

### Phase 2 — Gold Standard (NEXT UP)
These two projects must be built to perfection before anything else:

| # | Project | Tier | Status |
|---|---------|------|--------|
| 1 | Weather App API (OpenWeatherMap) | Beginner | Not started |
| 2 | Joke Generator API (JokeAPI) | Beginner | Not started |

### Phase 3 — Remaining Beginner Projects
| # | Project | Tier | Status |
|---|---------|------|--------|
| 3 | Currency Converter (ExchangeRate API) | Beginner | Not started |
| 4 | Dictionary API (Free Dictionary) | Beginner | Not started |
| 5 | News Headlines (NewsAPI) | Beginner | Not started |
| 6 | Cat/Dog Image Generator (TheCatAPI / Dog) | Beginner | Not started |
| 7 | Quotes Generator (Quotable API) | Beginner | Not started |
| 8 | URL Shortener (Custom) | Beginner | Not started |

### Phase 4 — Core Docs
| Doc | Status |
|-----|--------|
| `how-to-get-api-keys.md` | Not started |
| `environment-variables.md` | Not started |
| `handling-api-errors.md` | Not started |
| `nextjs-api-basics.md` | Not started |

### Phase 5 — Intermediate Projects
| # | Project | Status |
|---|---------|--------|
| 1 | Movie/TV App (TMDB) | Not started |
| 2 | GitHub Explorer (GitHub API) | Not started |
| 3 | Crypto Dashboard (CoinGecko) | Not started |
| 4 | Recipe Finder (Spoonacular) | Not started |
| 5 | Book Finder (Google Books) | Not started |
| 6 | Spotify Search (Spotify API) | Not started |
| 7 | Flight Tracker (AviationStack) | Not started |

### Phase 6 — Advanced Docs
| Doc | Status |
|-----|--------|
| `oauth-basics.md` | Not started |
| `supabase-basics.md` | Not started |
| `auth-with-supabase.md` | Not started |

### Phase 7 — Advanced Projects
| # | Project | Status |
|---|---------|--------|
| 1 | E-commerce Backend API (Custom + Stripe) | Not started |
| 2 | Social Media API (Custom + Supabase) | Not started |
| 3 | AI Chatbot API (OpenAI / Hugging Face) | Not started |
| 4 | Payment Gateway Integration (Stripe/PayPal) | Not started |
| 5 | Real-time Stock Tracker (WebSocket APIs) | Not started |
| 6 | Healthcare API (FHIR mock) | Not started |

### Phase 8 — Populate Snippets
- All `snippets/` files to be created alongside each project

### Phase 9 — Community
- Open for contributions (after core content is built)

---

## Deployments

| Vercel Project | Source Folder | URL | Status |
|---|---|---|---|
| api-by-example | `repo-vercel/` | [api-by-example.vercel.app](https://api-by-example.vercel.app/) | Live |
| weather-api | `beginner/weather-api/` | — | Not deployed |
| joke-generator | `beginner/joke-generator/` | — | Not deployed |

> Individual project URLs will be added here as they are deployed.

---

## Next Steps

1. **Build Weather App API** — First gold standard project (Beginner #1)
   - Create `beginner/weather-api/` folder
   - Use starter-files as base
   - Get OpenWeatherMap API key
   - Build API route + UI
   - Create snippet.js, LEARNING.md, README.md, .env.example
   - Deploy to Vercel
   - Add to `repo-vercel/app/page.js` PROJECTS array
   - Copy snippet to `snippets/weather-api.js`

2. **Build Joke Generator API** — Second gold standard project (Beginner #2)
   - Same process as above with JokeAPI

3. **Create root README.md** — Main repo overview with project table

> **Rule:** Quality over quantity. Don't start the next project until the current one hits gold standard (see GUIDE.md Section 12).

---

## Progress Summary

```
Phase 1 — Setup                  [##########] COMPLETE
Phase 2 — Gold Standard          [          ] NOT STARTED  ← YOU ARE HERE
Phase 3 — Remaining Beginner     [          ] NOT STARTED
Phase 4 — Core Docs              [          ] NOT STARTED
Phase 5 — Intermediate           [          ] NOT STARTED
Phase 6 — Advanced Docs          [          ] NOT STARTED
Phase 7 — Advanced               [          ] NOT STARTED
Phase 8 — Populate Snippets      [          ] NOT STARTED
Phase 9 — Community              [          ] NOT STARTED
```

**Overall Progress: Phase 1 of 9 complete**
