# API Learning Hub — PLAN.md

## 🎯 Vision

The goal of this repository is to become a **go-to place for learning APIs by building real projects** — and a quick-reference for developers who just need working code.

This is not a list of API links.  
This is not theory-heavy documentation.  
This is not localhost-only demos.

This repo serves **two audiences**:

1. **Beginners** who want to learn APIs by building real, deployed projects
2. **Working developers** who need ready-to-use API snippets they can copy in 30 seconds

If you can build even one project from this repo, you are already ahead of most beginners.

---

## 🧠 Core Philosophy

- Build first, explain alongside
- Keep everything simple and accessible
- Avoid unnecessary tools and complexity
- One clear stack across all projects
- Real deployment, not localhost-only demos
- Every project has two layers: **Snippet** (quick copy) and **Full Project** (learn by building)

This repository prioritizes **clarity over cleverness**.

---

## 🔑 Locked Tech Stack

To keep this repository beginner-friendly and consistent, we use one fixed stack:

| Tool            | Choice                          |
|-----------------|---------------------------------|
| Framework       | Next.js (App Router)            |
| Language        | JavaScript                      |
| Backend         | Next.js API Routes              |
| Database        | Supabase (only when required)   |
| Authentication  | Supabase Auth (advanced only)   |
| Hosting         | Vercel                          |
| Version Control | GitHub                          |

**Why this stack?**  
Zero backend setup. Works on free tiers. Easy to deploy. Industry-relevant. Perfect for learning APIs.

No Docker. No AWS. No complex infrastructure.

---

## 🏗️ The Two-Layer Architecture

Every project in this repo has **two layers** to serve both audiences:

### Layer 1 — Snippet (For Developers)

A standalone `snippet.js` file with the raw API call. No framework, no UI — just the fetch call with comments. Copy it and use it in 30 seconds.

**Example** (`snippet.js` for Weather API):

```js
// Weather API Snippet — OpenWeatherMap
// Usage: Replace YOUR_API_KEY, then run: node snippet.js

const city = "London";
const API_KEY = "YOUR_API_KEY";

const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);
const data = await res.json();
console.log(`Temperature in ${city}: ${data.main.temp}°C`);
console.log(`Weather: ${data.weather[0].description}`);
```

### Layer 2 — Full Project (For Learners)

A complete Next.js application with API route, demo UI, error handling, and live Vercel deployment. This is where you learn how APIs actually work in a real app.

---

## 📂 Repository Structure

```
api-learning-hub/
│
├── README.md                    # Main repo overview + project table
├── PLAN.md                      # This file — vision, rules, architecture
├── ROADMAP.md                   # Timeline and milestones
├── CONTRIBUTING.md              # How to contribute
│
├── snippets/                    # 🔥 Quick-reference API snippets
│   ├── weather-api.js
│   ├── currency-converter.js
│   ├── joke-generator.js
│   ├── dictionary-api.js
│   ├── news-headlines.js
│   ├── cat-dog-images.js
│   ├── quotes-generator.js
│   ├── movie-tv-search.js
│   ├── github-explorer.js
│   ├── spotify-search.js
│   ├── recipe-finder.js
│   ├── crypto-dashboard.js
│   ├── book-finder.js
│   ├── flight-tracker.js
│   └── ...
│
├── beginner/                    # 🟢 No database, no auth
│   ├── weather-api/
│   ├── currency-converter/
│   ├── joke-generator/
│   ├── dictionary-api/
│   ├── news-headlines/
│   ├── cat-dog-image-generator/
│   ├── quotes-generator/
│   └── url-shortener/
│
├── intermediate/                # 🟡 Pagination, rate limits, data transformation
│   ├── movie-tv-app/
│   ├── github-explorer/
│   ├── spotify-search/
│   ├── recipe-finder/
│   ├── crypto-dashboard/
│   ├── book-finder/
│   └── flight-tracker/
│
├── advanced/                    # 🔴 Auth, database, protected routes
│   ├── ecommerce-api/
│   ├── social-media-api/
│   ├── ai-chatbot/
│   ├── payment-gateway/
│   ├── stock-tracker/
│   └── healthcare-api/
│
├── shared/                      # 🔧 Reusable utilities and components
│   ├── utils/
│   │   ├── errorHandler.js      # Consistent error handling
│   │   ├── rateLimiter.js       # Reusable rate limiting helper
│   │   └── apiResponse.js       # Standard API response formatter
│   └── components/
│       ├── JsonDisplay.js       # Raw JSON output component
│       └── ApiTester.js         # Input + submit + output component
│
├── templates/                   # 📋 Starter template for new projects
│   └── project-starter/
│       ├── README.md
│       ├── snippet.js
│       ├── LEARNING.md
│       ├── .env.example
│       ├── package.json
│       └── app/
│           ├── api/example/route.js
│           └── page.js
│
├── docs/                        # 📚 Guides and references
│   ├── how-to-get-api-keys.md
│   ├── environment-variables.md
│   ├── nextjs-api-basics.md
│   ├── handling-api-errors.md
│   ├── understanding-rate-limits.md
│   ├── oauth-basics.md
│   ├── server-vs-client-calls.md
│   ├── supabase-basics.md
│   ├── auth-with-supabase.md
│   └── deploying-on-vercel.md
│
└── .github/
    └── pull_request_template.md # PR checklist
```

---

## 📦 Project Structure (Per API)

Each API lives in its own folder and is a standalone Next.js application.

```
project-name/
│
├── README.md            # Project overview + quick copy snippet at top
├── snippet.js           # 🔥 Layer 1: Raw API call, no framework
├── LEARNING.md          # What concepts this project teaches
├── .env.example         # Required environment variables
├── package.json
│
├── app/
│   ├── api/
│   │   └── example/
│   │       └── route.js # API route handler
│   └── page.js          # Demo UI
│
└── lib/
    └── apiClient.js     # API helper functions
```

### Rules

- One API route per project (can have sub-routes if needed)
- One demo UI per project
- Structured JSON responses with proper HTTP status codes
- Minimal UI, maximum clarity
- Every project must include `snippet.js`
- Every project must include `LEARNING.md`

---

## 📖 README Template (Per Project)

Every project README must follow this structure:

```markdown
# Project Name

## ⚡ Quick Copy

\`\`\`js
// Paste the raw API call here — same as snippet.js
\`\`\`

## What This API Does
## What You'll Learn
## Tech Used
## API Endpoint
## Example Response
## How It Works (short explanation)
## Environment Variables
## Live Demo Link
```

The **Quick Copy** section goes first. Developers scan top-down — put the most useful thing at the top.

---

## 🌍 Live Demo Rule

Every project must be deployed on Vercel.

- `/` → Demo UI
- `/api/...` → API endpoint

The demo UI should:

- Accept input (if applicable)
- Call the API
- Display raw JSON output

Design is not the focus. Functionality is.

---

## 🗄️ Supabase Usage Policy

Supabase is used **only when persistence or authentication is required**.

| Tier         | Supabase Usage                                          |
|--------------|---------------------------------------------------------|
| Beginner     | **Never** — all projects are stateless                  |
| Intermediate | **Optional** — only for watchlists, favorites, etc.     |
| Advanced     | **Default** — used for auth, database, protected routes |

**Use Supabase for:** Users, authentication, posts, comments, likes, orders, payments, saved items

**Do NOT use Supabase as:** A cache for external API data. If the data comes from an external API (weather, crypto prices, news, jokes, quotes), fetch it fresh every time.

---

## 🟢 Beginner Projects

**Focus areas:** API routes, query parameters, external API consumption, basic error handling, GET and POST requests

| #  | Project Name            | API Used         | Description                              | Teaches                    |
|----|-------------------------|------------------|------------------------------------------|----------------------------|
| 1  | Weather App API         | OpenWeatherMap   | Fetch real-time weather data             | GET requests, query params |
| 2  | Currency Converter API  | ExchangeRate API | Convert currencies with exchange rates   | GET requests, data parsing |
| 3  | Joke Generator API      | JokeAPI          | Random jokes on demand                   | Simple GET, JSON response  |
| 4  | Dictionary API App      | Free Dictionary  | Search word meanings and synonyms        | Query params, nested JSON  |
| 5  | News Headlines API      | NewsAPI          | Latest headlines by category             | Server-side fetching ⚠️    |
| 6  | Cat/Dog Image Generator | Cat/Dog APIs     | Random animal images                     | Image APIs, randomization  |
| 7  | Quotes Generator        | Quotable API     | Random inspirational quotes              | Simple fetch, display      |
| 8  | URL Shortener API       | Custom           | Shorten URLs via POST request            | POST requests, validation  |

> ⚠️ **News Headlines note:** NewsAPI blocks client-side browser requests on the free tier. This project demonstrates why server-side API routes matter — a key learning moment.

**Rules:** No database. No authentication. Pure API consumption.

---

## 🟡 Intermediate Projects

**Focus areas:** Pagination, rate limits, data transformation, external API best practices, optional persistence

| #  | Project Name       | API Used         | Description                              | Teaches                          |
|----|--------------------|------------------|------------------------------------------|----------------------------------|
| 1  | Movie/TV App       | TMDB API         | Search and display movies/TV shows       | Pagination, image handling       |
| 2  | GitHub Explorer    | GitHub API       | Fetch profiles, repos, and commits       | Pagination, rate limits          |
| 3  | Spotify Search     | Spotify API      | Search tracks and artists (no auth)      | API keys, search patterns        |
| 4  | Recipe Finder App  | Spoonacular API  | Search recipes with filters              | Query building, data transform   |
| 5  | Crypto Dashboard   | CoinGecko API    | Real-time crypto prices and charts       | Polling, data visualization      |
| 6  | Book Finder        | Google Books API | Search books with detailed info          | Nested JSON, error handling      |
| 7  | Flight Tracker     | AviationStack    | Track flight statuses                    | Rate limits, fallback strategies |

> **Spotify note:** Scoped to search-only (no OAuth). Full playlist management with auth belongs in the advanced tier.

> **Flight Tracker note:** Most free aviation APIs are rate-limited. Project includes mock/fallback data strategy for when limits are hit.

**Database usage:** Optional. Only for features like user watchlists or saved searches.

---

## 🔴 Advanced Projects

**Focus areas:** Supabase database modeling, authentication & authorization, protected API routes, real-world API flows

| #  | Project Name                  | API Used              | Description                                   | Teaches                            |
|----|-------------------------------|-----------------------|-----------------------------------------------|------------------------------------|
| 1  | E-commerce Backend API        | Custom + Stripe       | CRUD, authentication, cart & orders            | DB modeling, auth, payments        |
| 2  | Social Media API              | Custom + Supabase     | Posts, likes, comments with JWT auth           | Auth flows, protected routes       |
| 3  | AI Chatbot API                | OpenAI / Hugging Face | Integrate AI models into an app               | Streaming, token management        |
| 4  | Payment Gateway Integration   | Stripe or PayPal      | Secure payment processing                     | Webhooks, security, error handling |
| 5  | Real-time Stock Tracker       | WebSocket APIs        | Live stock price updates                      | WebSockets, real-time data         |
| 6  | Healthcare API                | FHIR (mock)           | Manage patients, appointments, prescriptions  | Complex DB modeling, validation    |

> **E-commerce note:** Built in phases — Phase 1: Products CRUD → Phase 2: Cart + Orders → Phase 3: Payments with Stripe.

> **Stock Tracker note:** This is a tracker/dashboard, not a trading platform. No trade execution.

> **Healthcare note:** Uses mock FHIR-compliant data. No real patient data.

These projects resemble production systems.

---

## 📚 Documentation (`/docs`)

Docs explain **how things actually work** — not definitions.

| Document                    | What It Covers                                             |
|-----------------------------|------------------------------------------------------------|
| `how-to-get-api-keys.md`   | Step-by-step for getting keys from popular API providers    |
| `environment-variables.md` | `.env.local` vs `.env.example`, how Next.js loads them      |
| `nextjs-api-basics.md`     | Route handlers, request/response, status codes             |
| `handling-api-errors.md`   | Try/catch, error responses, graceful degradation           |
| `understanding-rate-limits.md` | What they are, how to handle 429s, backoff strategies  |
| `oauth-basics.md`          | OAuth flow explained simply (needed before Spotify, etc.)  |
| `server-vs-client-calls.md`| When to call APIs from server vs browser (and why)         |
| `supabase-basics.md`       | Setting up tables, queries, and real-time subscriptions    |
| `auth-with-supabase.md`    | Sign up, login, protected routes, JWT basics               |
| `deploying-on-vercel.md`   | From `git push` to live URL — environment variables, domains |

Written in simple language. No jargon without explanation.

---

## 📊 API Status Table

Free APIs go down, change versions, or deprecate. This table lives in the main `README.md` and is kept updated:

| Project              | API Used         | Status     | Free Tier     | Auth Required |
|----------------------|------------------|------------|---------------|---------------|
| Weather App          | OpenWeatherMap   | ✅ Active  | Yes           | API Key       |
| Currency Converter   | ExchangeRate API | ✅ Active  | Yes           | API Key       |
| Joke Generator       | JokeAPI          | ✅ Active  | Yes           | None          |
| Dictionary App       | Free Dictionary  | ✅ Active  | Yes           | None          |
| News Headlines       | NewsAPI          | ⚠️ Limited | Browser-blocked | API Key     |
| Cat/Dog Images       | TheCatAPI / Dog  | ✅ Active  | Yes           | Optional      |
| Quotes Generator     | Quotable API     | ✅ Active  | Yes           | None          |
| Movie/TV App         | TMDB             | ✅ Active  | Yes           | API Key       |
| GitHub Explorer      | GitHub API       | ✅ Active  | Yes           | Optional      |
| Crypto Dashboard     | CoinGecko        | ✅ Active  | Yes           | None          |

---

## 🤝 Contribution Guidelines

### Rules

- One project per pull request
- Must follow the project folder structure (including `snippet.js` and `LEARNING.md`)
- Must include README following the template
- Must include `.env.example`
- Must include live Vercel link
- Code must be clean and commented

### PR Template (`.github/pull_request_template.md`)

```markdown
## Project Submission

**Project Name:**  
**Tier:** Beginner / Intermediate / Advanced  
**Live Demo:**  

### Checklist

- [ ] Follows folder structure
- [ ] Includes `snippet.js`
- [ ] Includes `LEARNING.md`
- [ ] Includes README with all required sections
- [ ] Includes `.env.example`
- [ ] Deployed on Vercel with live link
- [ ] API route returns proper HTTP status codes
- [ ] Error handling implemented
- [ ] Code is commented and clean
```

Beginner-friendly contributions are encouraged.

---

## 🛣️ Roadmap

| Phase | Goal                                                      |
|-------|-----------------------------------------------------------|
| 1     | Build 2 beginner projects (Weather + Joke Generator) to gold standard |
| 2     | Create project starter template in `templates/`           |
| 3     | Complete remaining beginner projects                      |
| 4     | Write core docs (API keys, env variables, error handling) |
| 5     | Build intermediate projects                               |
| 6     | Write advanced docs (OAuth, Supabase, auth)               |
| 7     | Build advanced projects                                   |
| 8     | Populate `snippets/` folder with all standalone snippets  |
| 9     | Community contributions and maintenance                   |

**Quality over quantity.** Each project must meet the gold standard before moving to the next.

---

## 🚫 What This Repo Is NOT

- **Not a list of API links** — every API has working code and a live demo
- **Not theory-heavy docs** — we build first, explain alongside
- **Not a full-stack boilerplate** — each project is focused on one API concept
- **Not localhost-only** — every project is deployed and accessible
- **Not framework-agnostic** — we use one stack to reduce confusion

---

## 🚀 Final Note

This repository is designed to be:

- **Practical** — every project solves a real problem
- **Beginner-safe** — no assumed knowledge beyond basic JavaScript
- **Developer-useful** — snippets that working devs can grab and go
- **Real-world relevant** — deployed, not just running on localhost
- **Easy to maintain** — one stack, one structure, one standard

If someone can understand and run the projects here, this repo has succeeded.

Happy building 🚀