// lib/apiClient.js
// Helper to call your API routes from the frontend
// Usage: const { data, error } = await fetchApi("/api/weather", { city: "London" });

export async function fetchApi(endpoint, params = {}) {
  try {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).filter(
          ([, v]) => v !== undefined && v !== null && v !== ""
        )
      )
    ).toString();

    const url = query ? `${endpoint}?${query}` : endpoint;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return { data: null, error: data.error || "Something went wrong" };
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: "Failed to connect to the API" };
  }
}
