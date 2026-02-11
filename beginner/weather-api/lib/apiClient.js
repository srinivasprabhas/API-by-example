/**
 * API Client — Universal helper for calling your API routes
 *
 * Usage:
 *   import { fetchApi } from "@/lib/apiClient";
 *   const data = await fetchApi("/api/weather", { city: "London" });
 */

export async function fetchApi(endpoint, params = {}) {
    // Build query string from params object
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    ).toString();
  
    const url = query ? `${endpoint}?${query}` : endpoint;
  
    const res = await fetch(url);
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.error || `API error: ${res.status}`);
    }
  
    return data;
  }