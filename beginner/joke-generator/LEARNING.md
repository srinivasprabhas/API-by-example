# Joke Generator — What You'll Learn

## Concepts Covered

**Simple GET Requests** — Making a basic GET request to an external API with optional query parameters

**Handling Different Response Formats** — JokeAPI returns two different JSON structures (`single` and `twopart`) from the same endpoint. You'll learn to check the `type` field and render accordingly

**No API Key Required** — Not all APIs need authentication. JokeAPI is completely free and open — this teaches you to recognize when keys are and aren't needed

**Query Parameter Building** — Constructing URLs with category filters and blacklist flags to control what data you get back

**Input Validation** — Validating that the category parameter matches an allowed list before making the external API call

**Consistent Error Handling** — Using try/catch, checking `res.ok`, and returning structured error responses even when the external API has its own error format

## Architecture

```
Browser (page.js)
    ↓ GET /api/joke?category=Programming
Your API Route (app/api/joke/route.js)
    ↓ GET https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit
JokeAPI
    ↓ JSON response
Your API Route
    ↓ Clean, structured JSON
Browser → Displays joke
```

## Key Takeaway

Even when an API doesn't require a key, you should still proxy through your own API route. This gives you control over response format, error handling, and content filtering — the browser calls YOUR endpoint, not the external API directly.

## Why Two Response Formats Matter

JokeAPI returns either:
```json
{ "type": "single", "joke": "The whole joke in one string" }
```
or:
```json
{ "type": "twopart", "setup": "Why did...", "delivery": "Because..." }
```

Your code must check `data.type` and handle both. This is common in real APIs — responses often vary based on the data. Learning to handle this now prepares you for more complex APIs later.

## Files to Study

| File | What to Learn |
|------|--------------|
| `app/api/joke/route.js` | Category validation, blacklist flags, handling two response formats, why we proxy even without a key |
| `app/page.js` | Dropdown input, conditional rendering based on joke type, quick category buttons |
| `snippet.js` | The simplest possible JokeAPI call — just fetch and log |