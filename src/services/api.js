import { API_BASE, DEFAULT_LAT, DEFAULT_LNG } from "../utils/constants";

const defaultHeaders = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
};

/**
 * Base fetch wrapper for external API calls.
 * In production, use a backend proxy to avoid CORS and expose a single origin API.
 */
export async function request(url, options = {}) {
  const config = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  };
  const res = await fetch(url, config);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function getRestaurantsListUrl() {
  return `${API_BASE}/restaurants/list/v5?lat=${DEFAULT_LAT}&lng=${DEFAULT_LNG}&page_type=DESKTOP_WEB_LISTING`;
}

export function getRestaurantMenuUrl(restaurantId) {
  return `${API_BASE}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${DEFAULT_LAT}&lng=${DEFAULT_LNG}&restaurantId=${restaurantId}`;
}
