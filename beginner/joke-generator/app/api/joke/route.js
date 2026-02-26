// Joke API Route — JokeAPI v2
// Flow: Browser → /api/joke?category=Programming → JokeAPI → JSON → Browser
// No API key required. Teaching moment: not all APIs need keys.

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category") || "Any";

        // Valid categories from JokeAPI v2
        const valid = ["Any", "Programming", "Miscellaneous", "Pun", "Spooky", "Christmas"];
        if (!valid.includes(category)) {
            return Response.json(
                { error: `Invalid category. Use one of: ${valid.join(", ")}` },
                { status: 400 }
            );
        }

        const url = `https://v2.jokeapi.dev/joke/${encodeURIComponent(category)}?blacklistFlags=nsfw,racist,sexist,explicit`;
        const res = await fetch(url);

        if (!res.ok) {
            return Response.json(
                { error: "Failed to fetch joke from JokeAPI" },
                { status: res.status }
            );
        }

        const data = await res.json();
        return Response.json(data);
    } catch (err) {
        console.error("Joke API error:", err);
        return Response.json(
            { error: "Server error while fetching joke" },
            { status: 500 }
        );
    }
}
