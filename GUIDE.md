# API by Example — EXECUTION GUIDE

> Your step-by-step rulebook. Follow it every time you build a new project.

---

## TABLE OF CONTENTS

1. [Prerequisites & One-Time Setup](#1-prerequisites--one-time-setup)
2. [The Rules (Non-Negotiable)](#2-the-rules-non-negotiable)
3. [Repo Structure & Flow](#3-repo-structure--flow)
4. [How to Build a New Project (Step-by-Step)](#4-how-to-build-a-new-project-step-by-step)
5. [Folder Structure Rules](#5-folder-structure-rules)
6. [File-by-File Breakdown](#6-file-by-file-breakdown)
7. [UI Design System Rules](#7-ui-design-system-rules)
8. [API Route Rules](#8-api-route-rules)
9. [Environment Variables Rules](#9-environment-variables-rules)
10. [Deployment Process](#10-deployment-process)
11. [How to Add a Project to repo-vercel](#11-how-to-add-a-project-to-repo-vercel)
12. [Gold Standard Checklist](#12-gold-standard-checklist)
13. [Build Order (Roadmap)](#13-build-order-roadmap)
14. [Starter Files Reference](#14-starter-files-reference)

---

## 1. Prerequisites & One-Time Setup

### Install Once

| Tool | Command / Link | Why |
|------|---------------|-----|
| Node.js (v18+) | [nodejs.org](https://nodejs.org) | Runs JavaScript and Next.js |
| Git | [git-scm.com](https://git-scm.com) | Version control |
| VS Code | [code.visualstudio.com](https://code.visualstudio.com) | Code editor |
| Vercel CLI (optional) | `npm install -g vercel` | Deploy from terminal |

### Accounts You Need

| Service | Link | Used For |
|---------|------|----------|
| GitHub | [github.com](https://github.com) | Hosting your code |
| Vercel | [vercel.com](https://vercel.com) | Deploying projects |
| OpenWeatherMap | [openweathermap.org/api](https://openweathermap.org/api) | First project |

---

## 2. The Rules (Non-Negotiable)

### Tech Stack Rules
- **Framework:** Next.js with App Router ONLY
- **Language:** JavaScript ONLY (no TypeScript)
- **Backend:** Next.js API Routes ONLY
- **Database:** Supabase ONLY when needed (never for beginner)
- **Hosting:** Vercel ONLY
- **No Docker. No AWS. No complex infrastructure.**

### Tier Rules

| Tier | Database | Auth | Focus |
|------|----------|------|-------|
| Beginner | ❌ NEVER | ❌ NEVER | Pure API consumption |
| Intermediate | ✅ Optional | ❌ No | Pagination, rate limits, data transformation |
| Advanced | ✅ Default | ✅ Yes | Supabase auth, protected routes |

### Two-Layer Rule
Every project MUST have:
1. **snippet.js** — Raw API call, runnable with `node snippet.js`
2. **Full Next.js App** — API route + UI + error handling + Vercel deployment

### Snippet Placement (3 places)
1. `snippets/weather-api.js` — root snippets folder
2. `beginner/weather-api/snippet.js` — inside the project folder
3. `beginner/weather-api/README.md` — in the Quick Copy section

### Architecture Rule
```
Browser → YOUR API Route (/api/weather) → External API → Back to Browser
```
Browser NEVER calls external API directly. API route hides the key.

### Supabase Rules
- **NEVER** cache external API data in Supabase
- Weather, crypto, news, jokes → fetch fresh every time
- **DO** use Supabase for: users, auth, posts, comments, saved items
- Beginner: ZERO Supabase

### Code Quality Rules
- Every API route returns proper HTTP status codes (200, 400, 404, 500)
- Every API route has try/catch error handling
- Every response is structured JSON
- Code must be commented (explain WHY, not WHAT)
- No unused imports, no dead code

---

## 3. Repo Structure & Flow

### Directory Structure

```
api-by-example/
├── repo-vercel/             ← Homepage website (shows all projects)
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js          ← Hero + tier tabs + project cards
│   └── package.json
│
├── snippets/                ← Quick-copy snippets (one per API)
│   ├── weather-api.js
│   ├── joke-generator.js
│   └── ...
│
├── beginner/                ← Each folder = standalone Next.js app
│   ├── weather-api/
│   ├── joke-generator/
│   └── ...
│
├── intermediate/
│   ├── movie-tv-app/
│   └── ...
│
├── advanced/
│   ├── ecommerce-api/
│   └── ...
│
├── shared/
├── templates/
├── docs/
├── PLAN.md
├── GUIDE.md
└── README.md
```

### The Flow

1. **repo-vercel** is deployed at your main URL (e.g., `api-by-example.vercel.app`)
2. It shows a hero section + tab filters (Beginner | Intermediate | Advanced)
3. Only deployed projects appear (no "coming soon" — if it's not built, it's not shown)
4. Each project card links to that project's individual Vercel deployment
5. Each individual project (e.g., `beginner/weather-api/`) is its own Next.js app with its own Vercel URL
6. Individual projects have a "← All Projects" back link to repo-vercel

### Multiple Vercel Deployments

You'll have multiple Vercel projects:

| Vercel Project | Source Folder | URL (example) |
|---|---|---|
| api-by-example | `repo-vercel/` | `api-by-example.vercel.app` |
| weather-api | `beginner/weather-api/` | `weather-api-abe.vercel.app` |
| joke-generator | `beginner/joke-generator/` | `joke-api-abe.vercel.app` |
| ... | ... | ... |

Each project is imported separately in Vercel with its own root directory.

### Build Order

1. Build & deploy `repo-vercel` (homepage — will be empty at first)
2. Build & deploy `beginner/weather-api`
3. Add weather API to `repo-vercel/app/page.js` → redeploy
4. Continue with next project...

---

## 4. How to Build a New Project (Step-by-Step)

### Step 1: Create the Next.js App

```bash
cd beginner/weather-api
npx create-next-app@latest . --js --app --no-tailwind --no-eslint --no-src-dir --no-import-alias
```

### Step 2: Replace Generated Files

- Delete: `app/page.module.css`, `public/next.svg`, `public/vercel.svg`
- Replace `app/globals.css` with starter file `globals.css`
- Replace `app/layout.js` with starter file `layout.js`
- Replace `app/page.js` with starter file `page.js`

### Step 3: Get API Key

Sign up at the API provider, get your key.

### Step 4: Create `.env.local`

```bash
cp .env.example .env.local
# Edit .env.local with your real key
```

### Step 5: Build the API Route

Create `app/api/weather/route.js` based on the starter template.

### Step 6: Customize the UI

Edit the config section at the top of `page.js`:
- `PROJECT_NAME`, `TIER`, `DESCRIPTION`
- `INPUT_LABEL`, `INPUT_PLACEHOLDER`
- `API_ENDPOINT`, `QUERY_PARAM`
- `HOMEPAGE_URL` (your repo-vercel URL)

Customize the result display section for your specific API response.

### Step 7: Create Supporting Files

- `snippet.js` — raw API call
- `LEARNING.md` — what it teaches
- `.env.example` — placeholder keys
- `README.md` — following the template (Quick Copy FIRST)

### Step 8: Test Locally

```bash
npm run dev
```

Test: `http://localhost:3000` (UI) and `http://localhost:3000/api/weather?city=London` (API)

### Step 9: Push & Deploy

```bash
git add .
git commit -m "Add Weather API project"
git push
```

Deploy on Vercel (see Section 10).

### Step 10: Copy Snippet to Root

Copy `snippet.js` content → `snippets/weather-api.js`

### Step 11: Add to repo-vercel

Add the project entry in `repo-vercel/app/page.js` PROJECTS array (see Section 11).

### Step 12: Update README

Add the project to the root `README.md` API Status Table.

---

## 5. Folder Structure Rules

### Per-Project Structure

```
weather-api/
├── README.md
├── snippet.js
├── LEARNING.md
├── .env.example
├── .env.local           ← never committed
├── package.json
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.js
│   ├── layout.js
│   ├── globals.css
│   └── page.js
└── lib/
    └── apiClient.js
```

---

## 6. File-by-File Breakdown

### snippet.js
Raw API call. No framework. Runnable with `node snippet.js`. Always commented.

### .env.example
Placeholder keys with comments on where to get them. Always committed.

### .env.local
Real keys. NEVER committed. Already in `.gitignore`.

### LEARNING.md
Concepts covered + key takeaway + architecture diagram + files to study.

### README.md (Per Project — Follow This Template)
```markdown
# Project Name

## ⚡ Quick Copy
\```js
// Same as snippet.js
\```

## What This API Does
## What You'll Learn
## Tech Used
## API Endpoint
## Example Response
## How It Works
## Environment Variables
## Live Demo Link
```

Quick Copy goes FIRST. Always.

---

## 7. UI Design System Rules

Every project uses the SAME design system. No custom CSS per project.

### Design Tokens

| Property | Value |
|----------|-------|
| Primary Font | DM Sans (400, 500, 600, 700) |
| Mono Font | JetBrains Mono (400, 500) |
| Default Theme | Dark |
| Accent Color | `#60A5FA` (dark) / `#3B82F6` (light) |
| Border Radius | 12px cards, 8px inputs/buttons |
| No Popups | EVER — all content inline |

### Color Palette (Dark — Default)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#1A1A18` | Page background |
| `--bg-secondary` | `#222220` | Card backgrounds |
| `--bg-tertiary` | `#2A2A26` | Input backgrounds |
| `--text-primary` | `#E8E8E4` | Main text |
| `--text-secondary` | `#9C9C94` | Subtitles, labels |
| `--text-muted` | `#5C5C56` | Placeholder text |
| `--accent` | `#60A5FA` | Buttons, links |
| `--success` | `#4ADE80` | Beginner indicators |
| `--warning` | `#FBBF24` | Intermediate indicators |
| `--error` | `#F87171` | Advanced / error indicators |

### Color Palette (Light)

| Token | Value |
|-------|-------|
| `--bg-primary` | `#FAFAF8` |
| `--bg-secondary` | `#FFFFFF` |
| `--bg-tertiary` | `#F0F0EC` |
| `--text-primary` | `#1A1A1A` |
| `--text-secondary` | `#6B6B63` |
| `--accent` | `#3B82F6` |

### Tier Badges

| Tier | Color | Background |
|------|-------|------------|
| Beginner 🟢 | `#4ADE80` | `#132A1C` |
| Intermediate 🟡 | `#FBBF24` | `#2A2410` |
| Advanced 🔴 | `#F87171` | `#2A1414` |

### UI Layout — Individual Projects
1. **Navbar** — project name + tier badge + "← All Projects" back link + dark mode toggle
2. **Description** — one-liner about the project
3. **Input Section** — label + input field + submit button (inline)
4. **Error** — inline red message below input (no popups)
5. **Result Card** — formatted display + "Show Raw JSON" toggle
6. **Footer** — "API by Example" link

### UI Layout — repo-vercel Homepage
1. **Navbar** — "API by Example" logo + GitHub link + dark mode toggle
2. **Hero** — tag badge ("Open Source Learning Repo") + title + description
3. **Stats Bar** — project count, live demos, snippets
4. **Tab Filters** — Beginner | Intermediate | Advanced (with colored dot + count)
5. **Tier Header** — tier title + description
6. **Project Cards Grid** — number, API badge, title, description, teaches tags, live status, arrow
7. **Empty State** — when a tier has no deployed projects yet
8. **Footer** — repo link

---

## 8. API Route Rules

### Every API Route Must:
1. Wrap in try/catch
2. Validate input → return 400 if missing
3. Use `process.env.YOUR_KEY` (never hardcode)
4. Use `encodeURIComponent()` on user input
5. Check `res.ok` before parsing
6. Return structured JSON (not raw external response)
7. Use proper status codes: 200, 400, 404, 500
8. Handle external API being down

### Standard Template

```js
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    if (!city) {
      return Response.json({ error: "City parameter is required" }, { status: 400 });
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    if (!API_KEY) {
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      if (res.status === 404) {
        return Response.json({ error: `City "${city}" not found` }, { status: 404 });
      }
      return Response.json({ error: "Failed to fetch data" }, { status: res.status });
    }

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
    console.error("API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

---

## 9. Environment Variables Rules

| File | Committed? | Available Where? |
|------|-----------|-----------------|
| `.env.local` | ❌ NO | Server-side only |
| `.env.example` | ✅ YES | Template only |

- **NEVER** prefix with `NEXT_PUBLIC_` (exposes to browser)
- Naming: `SCREAMING_SNAKE_CASE` ending with `_KEY`, `_URL`, or `_SECRET`
- On Vercel: add same vars in Project Settings → Environment Variables

---

## 10. Deployment Process

### Deploy Any Project to Vercel

1. Push to GitHub
2. vercel.com → Add New → Project → Select repo
3. **Root Directory:** Set to project folder (e.g., `beginner/weather-api` or `repo-vercel`)
4. Add environment variables (if needed)
5. Deploy

### For repo-vercel (Homepage)
- Root Directory: `repo-vercel`
- No env vars needed

### For Individual Projects
- Root Directory: e.g., `beginner/weather-api`
- Add API keys in env vars
- Test both `/` and `/api/...`

---

## 11. How to Add a Project to repo-vercel

After deploying a new project:

1. Open `repo-vercel/app/page.js`
2. Find the `PROJECTS` array at the top
3. Add the project entry:

```js
{
  id: "weather-api",
  tier: "beginner",
  number: 1,
  title: "Weather App API",
  api: "OpenWeatherMap",
  description: "Fetch real-time weather data for any city.",
  teaches: ["GET requests", "Query params", "Error handling"],
  url: "https://weather-api-abe.vercel.app",  // ← your actual deployed URL
  status: "active",
},
```

4. Commit and push → Vercel auto-redeploys repo-vercel
5. The project now appears on the homepage under its tier tab

---

## 12. Gold Standard Checklist

A project is NOT complete until ALL are checked:

```
FOLDER STRUCTURE
[ ] Correct folder structure
[ ] snippet.js works with `node snippet.js`
[ ] LEARNING.md exists
[ ] .env.example exists with comments
[ ] README.md follows template (Quick Copy FIRST)

API ROUTE
[ ] Route at app/api/[name]/route.js
[ ] Input validation → 400
[ ] External errors handled
[ ] try/catch wraps everything
[ ] Structured JSON response
[ ] Proper HTTP status codes
[ ] API key via process.env

UI
[ ] Universal design system (DM Sans + JetBrains Mono)
[ ] Dark mode toggle works
[ ] "← All Projects" back link to repo-vercel
[ ] Input + submit button
[ ] Loading state
[ ] Error inline (no popups)
[ ] Formatted result + raw JSON toggle
[ ] Tier badge in navbar

DEPLOYMENT
[ ] Deployed on Vercel
[ ] UI + API route both work live
[ ] Env vars set in Vercel dashboard
[ ] Live link in project README

SNIPPET PLACEMENT (3 places)
[ ] snippets/[name].js
[ ] [tier]/[name]/snippet.js
[ ] [tier]/[name]/README.md Quick Copy

REPO-VERCEL INTEGRATION
[ ] Project added to PROJECTS array in repo-vercel/app/page.js
[ ] repo-vercel redeployed
[ ] Project card visible on homepage under correct tier

CODE QUALITY
[ ] Commented (explains WHY)
[ ] No unused imports
[ ] No hardcoded keys
[ ] encodeURIComponent on user input
```

---

## 13. Build Order (Roadmap)

Follow this exact order. Do NOT skip ahead.

### Phase 1 — Setup
1. Create repo directory structure on GitHub
2. Build & deploy `repo-vercel` (homepage — empty at first, shows empty states)

### Phase 2 — Gold Standard (Build These First)
3. **Weather API** (Beginner) → deploy → add to repo-vercel
4. **Joke Generator** (Beginner) → deploy → add to repo-vercel

These two become the reference. Get them perfect before moving on.

### Phase 3 — Remaining Beginner
5. Currency Converter → deploy → add to repo-vercel
6. Dictionary API → deploy → add to repo-vercel
7. News Headlines → deploy → add to repo-vercel
8. Cat/Dog Image Generator → deploy → add to repo-vercel
9. Quotes Generator → deploy → add to repo-vercel
10. URL Shortener → deploy → add to repo-vercel

### Phase 4 — Core Docs
11. Write `how-to-get-api-keys.md`
12. Write `environment-variables.md`
13. Write `handling-api-errors.md`
14. Write `nextjs-api-basics.md`

### Phase 5 — Intermediate
15. Movie/TV App (TMDB) → deploy → add to repo-vercel
16. GitHub Explorer → deploy → add to repo-vercel
17. Crypto Dashboard → deploy → add to repo-vercel
18. Recipe Finder → deploy → add to repo-vercel
19. Book Finder → deploy → add to repo-vercel
20. Spotify Search → deploy → add to repo-vercel
21. Flight Tracker → deploy → add to repo-vercel

### Phase 6 — Advanced Docs
22. Write `oauth-basics.md`
23. Write `supabase-basics.md`
24. Write `auth-with-supabase.md`

### Phase 7 — Advanced
25. E-commerce API → deploy → add to repo-vercel
26. Social Media API → deploy → add to repo-vercel
27. AI Chatbot → deploy → add to repo-vercel
28. Payment Gateway → deploy → add to repo-vercel
29. Stock Tracker → deploy → add to repo-vercel
30. Healthcare API → deploy → add to repo-vercel

### Phase 8 — Populate Snippets
31. Ensure all `snippets/` files are up to date

### Phase 9 — Community
32. Open for contributions

**Rule: Quality over quantity. Don't start the next project until the current one hits gold standard.**

---

## 14. Starter Files Reference

### Files You Download

**For repo-vercel (Homepage):**

| File | Where It Goes |
|------|--------------|
| `repo-vercel/app/globals.css` | Homepage design system |
| `repo-vercel/app/layout.js` | Homepage layout with fonts |
| `repo-vercel/app/page.js` | Homepage with hero + tabs + cards |
| `repo-vercel/package.json` | Dependencies |

**For Individual Projects (starter-files):**

| File | Where It Goes | What to Customize |
|------|--------------|-------------------|
| `app/globals.css` | `app/globals.css` | Nothing — universal |
| `app/layout.js` | `app/layout.js` | Title + description in metadata |
| `app/page.js` | `app/page.js` | Config section at top + result display |
| `app/api/example/route.js` | `app/api/[name]/route.js` | Entire API logic |
| `lib/apiClient.js` | `lib/apiClient.js` | Nothing — universal |
| `snippet.js` | `snippet.js` | Entire file per project |
| `LEARNING.md` | `LEARNING.md` | Entire file per project |
| `.env.example` | `.env.example` | Keys for this project |

### How to Use

**For repo-vercel:**
1. Copy the `repo-vercel/` folder into your repo
2. `cd repo-vercel && npm install && npm run dev`
3. Replace `YOUR_USERNAME` in GitHub links
4. Deploy to Vercel with root directory `repo-vercel`

**For each new project:**
1. `npx create-next-app@latest . --js --app --no-tailwind --no-eslint --no-src-dir --no-import-alias`
2. Delete `page.module.css`, `next.svg`, `vercel.svg`
3. Drop in starter files (globals.css, layout.js, page.js, apiClient.js)
4. Customize config in page.js
5. Build your API route
6. Fill in snippet.js, LEARNING.md, .env.example, README.md
7. Test → Push → Deploy → Add to repo-vercel

---

## Quick Reference Card

```
COMMANDS
────────
npx create-next-app@latest . --js --app --no-tailwind --no-eslint --no-src-dir --no-import-alias
npm run dev                    # Local server
npm run build                  # Test production build
git add . && git commit -m ""  # Commit
git push origin main           # Push

DATA FLOW
─────────
Browser → /api/your-route → External API → Structured JSON → Browser

STATUS CODES
────────────
200 = Success
400 = Bad input
404 = Not found
500 = Server error

EVERY PROJECT NEEDS
───────────────────
snippet.js        ← Raw API call (3 places)
LEARNING.md       ← What it teaches
.env.example      ← Placeholder keys
README.md         ← Quick Copy first
app/api/*/route.js← Server-side route
app/page.js       ← Demo UI
+ entry in repo-vercel PROJECTS array
```

---

*Last updated: February 2026*
*Repo: api-by-example*
