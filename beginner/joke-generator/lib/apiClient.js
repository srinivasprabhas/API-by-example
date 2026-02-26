// lib/apiClient.js
// Universal API client helper
// Usage: const data = await fetchAPI("/api/joke?category=Programming");
export async function fetchAPI(endpoint, params = {}) {
    const query = new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    ).toString();

    const url = query ? `${endpoint}?${query}` : endpoint;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
    }
    return { data, error: null};
}