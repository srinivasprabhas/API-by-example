// [Project Name] Snippet — [API Provider]
// Usage: Replace YOUR_API_KEY, then run: node snippet.js
// Docs: [link to API docs]

const API_KEY = "YOUR_API_KEY";

const res = await fetch(
  `https://api.example.com/endpoint?key=${API_KEY}&param=value`
);
const data = await res.json();

console.log(data);
