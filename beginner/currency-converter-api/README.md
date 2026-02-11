# Currency Converter API

## ⚡ Quick Copy

```js
// Currency Converter Snippet — ExchangeRate API
// Usage: Replace YOUR_API_KEY, then run: node snippet.js

const API_KEY = "YOUR_API_KEY";
const from = "USD";
const to = "EUR";
const amount = 100;

const res = await fetch(
  `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`
);
const data = await res.json();

console.log(`${amount} ${data.base_code} = ${data.conversion_result} ${data.target_code}`);
console.log(`Exchange Rate: 1 ${data.base_code} = ${data.conversion_rate} ${data.target_code}`);
console.log(`Last Updated: ${data.time_last_update_utc}`);
```

## What This API Does

Converts any amount from one currency to another using real-time exchange rates. Supports 150+ world currencies with data updated daily on the free tier.

## What You'll Learn

- GET requests with multiple query parameters
- Data parsing from JSON responses
- Server-side API calls to hide API keys
- Input validation and error handling
- Number formatting for currency display

## Tech Used

- Next.js (App Router)
- ExchangeRate API v6
- Vercel (deployment)

## API Endpoint

```
GET /api/convert?from=USD&to=EUR&amount=100
```

### Parameters

| Param  | Required | Description                     |
|--------|----------|---------------------------------|
| from   | Yes      | Source currency code (e.g. USD) |
| to     | Yes      | Target currency code (e.g. EUR) |
| amount | No       | Amount to convert (default: 1)  |

## Example Response

```json
{
  "from": "USD",
  "to": "EUR",
  "rate": 0.9234,
  "amount": 100,
  "result": 92.34,
  "last_updated": "Mon, 10 Feb 2025 00:00:00 +0000"
}
```

## How It Works

1. Browser sends a request to `/api/convert` with `from`, `to`, and `amount` parameters
2. API route validates the input and checks for the API key
3. API route calls ExchangeRate API's pair conversion endpoint
4. External API returns the exchange rate and converted amount
5. API route formats the response and sends it to the browser
6. Browser displays the result with formatted numbers

## Environment Variables

```
EXCHANGERATE_API_KEY=your_api_key_here
```

Get your free API key at [exchangerate-api.com](https://www.exchangerate-api.com/) — 1,500 requests/month on the free plan.

## Live Demo Link

[currency-converter-abe.vercel.app](https://currency-converter-abe.vercel.app)