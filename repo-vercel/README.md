# API by Example — Homepage

The main hub website for the [API by Example](https://github.com/srinivasprabhas/api-by-example) learning repository. Deploy this to your primary URL (e.g. `api-by-example.vercel.app`).

## What This Does

- **Hero section** — Tagline and description of the learning hub
- **Tier tabs** — Filter by Beginner | Intermediate | Advanced
- **Project cards** — Each deployed project appears with title, API used, description, and link to its live demo
- **Empty state** — When a tier has no projects yet, shows a friendly empty message
- **Dark mode toggle** — Theme switch in navbar

Only **deployed** projects appear. No "coming soon" placeholders. If it's built and live, it's listed.

## Tech Used

| Tool        | Purpose                    |
|-------------|----------------------------|
| Next.js 16  | App Router                 |
| React 19    | UI                         |
| JavaScript  | Language                   |
| Vercel      | Hosting                    |

No API keys. No database. Static hub page.

## How to Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to Deploy on Vercel

1. Push this repo to GitHub
2. [vercel.com](https://vercel.com) → Add New → Project → Import repo
3. **Root Directory:** Set to `repo-vercel` (important)
4. Deploy — no environment variables needed

## How to Add a Project

After deploying a new project (e.g. `beginner/weather-api`):

1. Open `app/page.js`
2. Find the `PROJECTS` array
3. Add an entry:

```js
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
```

4. Commit and push — Vercel auto-redeploys
5. The project appears on the homepage under its tier tab

## Structure

```
repo-vercel/
├── app/
│   ├── globals.css    # Design system (DM Sans, JetBrains Mono)
│   ├── layout.js      # Root layout
│   └── page.js        # Hero + tier tabs + project cards
├── public/
├── package.json
└── README.md
```

## Live Demo

[api-by-example.vercel.app](https://api-by-example.vercel.app) *(update with your actual URL)*
