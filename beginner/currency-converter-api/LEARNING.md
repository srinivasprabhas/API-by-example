# Currency Converter — What You'll Learn

## Concepts Covered

1. **GET Requests with Multiple Query Parameters** — Sending `from`, `to`, and `amount` in a single request
2. **Data Parsing** — Extracting specific fields from a JSON response
3. **Server-Side API Calls** — Hiding API keys by proxying through Next.js API routes
4. **Input Validation** — Checking for missing parameters and invalid values before calling external APIs
5. **Error Handling** — Handling API-level errors (unsupported currency codes, rate limits) gracefully
6. **Structured Responses** — Transforming raw API data into a clean, consistent format

## Architecture

```
Browser (page.js)
    ↓ GET /api/convert?from=USD&to=EUR&amount=100
Your API Route (app/api/convert/route.js)
    ↓ GET https://v6.exchangerate-api.com/v6/KEY/pair/USD/EUR/100
ExchangeRate API
    ↓ JSON response
Your API Route
    ↓ Structured JSON
Browser → Displays result
```

## Key Takeaway

API routes act as a secure proxy — the browser never sees your API key, and you control exactly what data gets returned to the frontend.

## Files to Study

| File | What to Learn |
|------|--------------|
| `app/api/convert/route.js` | Query param extraction, input validation, external API call, error handling |
| `app/page.js` | Dropdown inputs, swap logic, formatting numbers for display |
| `snippet.js` | The simplest possible API call — just fetch and log |