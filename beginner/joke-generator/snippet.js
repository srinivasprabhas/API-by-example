// Joke Generator Snippet — JokeAPI v2
// Usage: Run directly with: node snippet.js
// No API key required!

const category = "Programming";
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