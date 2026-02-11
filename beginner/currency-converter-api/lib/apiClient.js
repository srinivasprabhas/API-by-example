// API Client — Universal helper for all projects
// Handles fetch calls to your own API routes with error handling

export async function apiGet(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
    }

    return data;
}