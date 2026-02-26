# Joke Generator API

## ⚡ Quick Copy

```js
// Joke Generator Snippet — JokeAPI v2
// Usage: Run directly with: node snippet.js
// No API key required!

const category = "Programming"; // Options: Any, Programming, Miscellaneous, Pun, Spooky, Christmas

const res = await fetch(
  `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,racist,sexist,explicit`
);
const data = await res.json();

if (data.type === "single") {
  console.log(`[${data.category}] ${data.joke}`);
} else {
  console.log(`[${data.category}]`);
  console.log(`Q: ${data.setup}`);
  console.log(`A: ${data.delivery}`);
}
```

## What This API Does

Serves random jokes from multiple categories. JokeAPI is a free, open REST API that requires no authentication — perfect for learning the basics of API consumption.

## What You'll Learn

- Simple GET requests with optional query parameters
- Handling two different JSON response formats from the same endpoint
- Working with APIs that don't require authentication
- Input validation and category filtering
- Content filtering with blacklist flags

## Tech Used

- Next.js (App Router)
- JokeAPI v2
- Vercel (deployment)

## API Endpoint

```
GET /api/joke?category=Programming
```

### Parameters

| Param    | Required | Description                                                        |
|----------|----------|--------------------------------------------------------------------|
| category | No       | Joke category (default: Any). Options: Any, Programming, Miscellaneous, Pun, Spooky, Christmas |

## Example Response

**Single joke:**
```json
{
  "category": "Programming",
  "type": "single",
  "joke": "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "id": 1,
  "safe": true,
  "lang": "en"
}
```

**Two-part joke:**
```json
{
  "category": "Pun",
  "type": "twopart",
  "setup": "Why don't scientists trust atoms?",
  "delivery": "Because they make up everything!",
  "id": 42,
  "safe": true,
  "lang": "en"
}
```

## How It Works

1. Browser sends a request to `/api/joke` with an optional `category` parameter
2. API route validates the category against the allowed list
3. API route calls JokeAPI with the category and blacklist flags
4. JokeAPI returns a joke (either single or twopart format)
5. API route shapes the response into clean, consistent JSON
6. Browser checks the `type` field and displays accordingly

## Environment Variables

```
# No API key required! JokeAPI is free and open.
```

## Live Demo Link

[api-by-example-joke-generator-api.vercel.app](https://api-by-example-joke-generator-api.vercel.app)