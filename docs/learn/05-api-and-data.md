# 05 — API Calls & Data Fetching

> Real apps need real data. This covers how we fetch from external APIs, handle errors gracefully, and fall back to mock data when things go wrong.

---

## The Service Layer — Separating API Logic

API calls don't belong inside components. We keep them in a `services/` folder so they're reusable, testable, and easy to swap out.

### Base Request Wrapper

```jsx
// src/services/api.js
export async function request(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
```

**Why a wrapper?**
- Adds default headers in one place
- Checks `res.ok` and throws on errors (so callers can `.catch()` consistently)
- Easy to add auth tokens, logging, or retry logic later

### Service Functions

```jsx
// src/services/restaurantService.js
export async function fetchRestaurantsList() {
  const json = await request(getRestaurantsListUrl());
  const restaurants =
    json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? [];
  return Array.isArray(restaurants) ? restaurants : [];
}

export async function fetchRestaurantMenu(restaurantId) {
  const json = await request(getRestaurantMenuUrl(restaurantId));
  return json?.data ?? null;
}
```

**Notice:** The service handles the messy response structure (deeply nested Swiggy API format) and returns clean data. Components never need to know about `json.data.cards[4].card.card.gridElements...`.

---

## Fetching in Hooks — The Pattern

Our custom hooks handle the fetch lifecycle:

```
1. Set loading = true
2. Call the service function
3. On success → update state with data, set loading = false
4. On error → handle error, set loading = false
```

### useRestaurants — With Redux and Fallback

```jsx
// src/hooks/useRestaurants.js
useEffect(() => {
  let cancelled = false;
  dispatch(setLoading(true));

  fetchRestaurantsList()
    .then((restaurants) => {
      if (!cancelled) {
        if (restaurants.length > 0) {
          dispatch(setRestaurants(restaurants));     // Use API data
        } else {
          dispatch(setRestaurants(resList));          // Fallback to mock
        }
      }
    })
    .catch((err) => {
      if (!cancelled) {
        console.warn("API failed, using mock data:", err.message);
        dispatch(setRestaurants(resList));            // Fallback to mock
      }
    });

  return () => { cancelled = true; };
}, [dispatch]);
```

**Key patterns here:**
1. **`cancelled` flag** — prevents state updates after unmount
2. **Fallback to mock data** — the app works even when the API is down
3. **Dispatches to Redux** — so the data is globally available

### useRestaurantMenu — With Local State

```jsx
// src/hooks/useRestaurantMenu.js
const fetch = useCallback(() => {
  if (!restaurantId) { setLoading(false); return; }
  setLoading(true);
  setError(null);
  fetchRestaurantMenu(restaurantId)
    .then((data) => {
      setMenu(data);
      // Extract restaurant info from the response
      const cards = data?.cards ?? [];
      const infoCard = cards.find(
        (c) => c?.card?.card?.["@type"]?.includes("Restaurant")
      );
      setInfo(infoCard?.card?.card ?? null);
    })
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, [restaurantId]);
```

**This one uses `useState` instead of Redux** because menu data is only needed by one page. No need for global state.

---

## Error Handling Strategy

Our app handles errors at multiple levels:

### Level 1: Service Layer

```jsx
// api.js throws on non-200 responses
if (!res.ok) throw new Error(`API error: ${res.status}`);
```

### Level 2: Hook Layer

```jsx
// useRestaurants.js catches and falls back
.catch((err) => {
  dispatch(setRestaurants(resList));  // silent fallback
});
```

### Level 3: Component Layer

```jsx
// HomePage.js — only shows error if fallback also failed
if (error && list.length === 0) {
  return <p className="error">Error: {error}</p>;
}
```

### Level 4: Fallback UI

```jsx
// RestaurantDetailPage.js — uses Redux data when API fails
const restaurantFromList = allRestaurants.find((r) => r?.info?.id === id);
const name = info?.name ?? restaurantFromList?.info?.name ?? "Restaurant";
```

**The result:** The app almost never shows an error to the user. It degrades gracefully.

---

## Mock Data — Why and How

External APIs can fail (CORS, downtime, rate limits). Mock data ensures the app is always functional:

```jsx
// src/utils/mockData.js — 12 restaurants with all required fields
const resList = [
  {
    type: "restaurant",
    info: {
      id: "334475",
      name: "KFC",
      imageUrl: "https://images.unsplash.com/...",
      cuisines: ["Burgers", "American", "Fast Food"],
      costForTwo: 40000,
      avgRating: "3.8",
      deliveryTime: 36,
      // ...
    },
  },
  // ...11 more restaurants
];
```

**The mock data matches the exact shape of the API response.** This means components don't need any special handling — they work the same with real or mock data.

---

## Optional Chaining — Defensive Data Access

External API responses are unpredictable. We use optional chaining (`?.`) everywhere:

```jsx
// Without optional chaining — crashes if any level is undefined:
json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants

// With optional chaining — returns undefined instead of crashing:
json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? []
```

The `??` (nullish coalescing) provides a default value when the chain results in `null` or `undefined`.

---

## Architecture Summary

```
Component (HomePage)
  ↓ calls
Custom Hook (useRestaurants)
  ↓ calls
Service (restaurantService.fetchRestaurantsList)
  ↓ calls
API Wrapper (api.request)
  ↓ calls
fetch() → External API
  ↓ fails?
Mock Data (mockData.js) ← fallback
```

Each layer has a single responsibility. Swapping the API (e.g., from Swiggy to your own backend) means changing only the service layer — hooks and components stay the same.

---

## Next Up

The app works and handles errors. Now make sure it keeps working with **[06 — Testing with Jest](./06-testing.md)**.
