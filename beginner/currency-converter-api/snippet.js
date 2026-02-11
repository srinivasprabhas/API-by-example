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