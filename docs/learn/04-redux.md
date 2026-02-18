# 04 — Redux Toolkit: Global State Management

> Redux manages state that needs to be shared across multiple components. When the cart updates in `RestaurantDetailPage`, the `Header` instantly shows the new count — that's Redux.

---

## Why Not Just useState?

`useState` is great for **local** state (a single component). But some state is needed by many components:

- **Cart items** — needed by the Header (badge count), CartPage (list), and RestaurantDetailPage (add button)
- **Restaurant list** — needed by HomePage and RestaurantDetailPage (for fallback info)

Without Redux, you'd have to pass data through many layers of props ("prop drilling") or lift state to a common ancestor. Redux solves this by putting shared state in one central **store** that any component can read from.

---

## Core Concepts

### Store

The store holds your entire app's state. Created once in `src/store/index.js`:

```jsx
import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./slices/restaurantSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,    // state.restaurants
    cart: cartReducer,                 // state.cart
  },
});
```

The store's state looks like:
```
{
  restaurants: { list: [...], allRestaurants: [...], loading, error, sortBy, filterTopRated },
  cart: { items: [...], restaurantId, restaurantName }
}
```

The store is provided to the entire app in `src/App.js`:
```jsx
<Provider store={store}>
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
</Provider>
```

### Slice

A slice is a piece of the store with its state + the functions (reducers) that update it. Think of it as a self-contained module for one feature.

```jsx
// src/store/slices/cartSlice.js
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restaurantId: null,
    restaurantName: null,
  },
  reducers: {
    addItem: (state, action) => {
      // Redux Toolkit uses Immer — you CAN mutate state directly here
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;    // This is OK inside createSlice!
      } else {
        state.items.push({ ... });
      }
    },
    removeItem: (state, action) => { ... },
    clearCart: () => initialState,
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

**Important:** Inside `createSlice` reducers, you *can* mutate state directly (like `state.items.push(...)`). Redux Toolkit uses a library called Immer that handles immutability under the hood. Outside of reducers, you should never mutate state.

### Action

An action is just an object that describes what happened: `{ type: "cart/addItem", payload: { id, name, price } }`.

You don't create these manually — `createSlice` generates **action creators** for you:

```jsx
addItem({ id: "item-1", name: "Burger", price: 15000, ... })
// Creates: { type: "cart/addItem", payload: { id: "item-1", name: "Burger", ... } }
```

---

## Reading State — useSelector

`useSelector` reads data from the store. The component automatically re-renders when the selected data changes.

```jsx
import { useSelector } from "react-redux";

// In Header.js — read cart items count:
const totalItems = useSelector((state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
);

// In useRestaurants.js — read restaurant list:
const { list, loading, error, filterTopRated, sortBy } = useSelector(
  (state) => state.restaurants
);
```

**How it works:**
1. You pass a function that picks the data you need from `state`
2. React-Redux subscribes to the store
3. When that slice of state changes, your component re-renders
4. If the selected data hasn't changed, the component does NOT re-render (performance optimization)

---

## Updating State — useDispatch

`useDispatch` gives you the `dispatch` function. You call it with an action to update the store.

```jsx
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";

const dispatch = useDispatch();

// When user clicks "Add":
dispatch(addItem({
  id: "item-1",
  name: "Burger",
  price: 15000,
  restaurantId: "rest-1",
  restaurantName: "KFC",
}));
```

**The flow:**
```
dispatch(addItem(payload))
  → Redux calls cartSlice's addItem reducer
  → Reducer updates state.cart.items
  → All components using useSelector on cart re-render
  → Header shows updated count, CartPage shows updated list
```

---

## Real Example: Restaurant Filtering & Sorting

The `restaurantSlice` is a great example of Redux handling complex state logic:

```jsx
// src/store/slices/restaurantSlice.js

// Helper that applies both filter and sort:
function applyFiltersAndSort(allRestaurants, filterTopRated, sortBy) {
  let result = [...allRestaurants];
  if (filterTopRated) {
    result = result.filter((r) => parseFloat(r?.info?.avgRating || 0) >= 4.0);
  }
  return sortRestaurants(result, sortBy);
}

// Reducers:
toggleTopRated: (state) => {
  state.filterTopRated = !state.filterTopRated;
  state.list = applyFiltersAndSort(state.allRestaurants, state.filterTopRated, state.sortBy);
},
setSortBy: (state, action) => {
  state.sortBy = action.payload;
  state.list = applyFiltersAndSort(state.allRestaurants, state.filterTopRated, action.payload);
},
```

**Notice:** `allRestaurants` always holds the original unfiltered list. `list` is the filtered/sorted version that components render. This way, toggling a filter doesn't lose data.

**Where the component uses it:**

```jsx
// src/pages/HomePage.js
const { list, filterTopRated, sortBy, toggleTopRated, setSortBy, resetFilters } =
  useRestaurants();

<button onClick={toggleTopRated}>Top Rated (4.0+)</button>
<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>...</select>
```

---

## Redux Data Flow — The Full Picture

```
┌─────────────┐     dispatch(action)     ┌──────────┐
│  Component   │ ──────────────────────→  │  Store   │
│  (UI)        │                          │          │
│              │  ←────────────────────── │ Reducer  │
│              │     new state via        │ updates  │
│              │     useSelector          │ state    │
└─────────────┘                          └──────────┘
```

1. **Component** dispatches an action (user clicked something)
2. **Reducer** in the slice handles the action, updates state
3. **Store** notifies all subscribers
4. **Components** using `useSelector` re-render with new data

---

## When to Use Redux vs useState

| Use Redux when... | Use useState when... |
|---|---|
| Multiple components need the same data | Only one component uses the data |
| State needs to persist across page navigation | State is temporary (e.g., form input) |
| Complex update logic (filters, sorts) | Simple toggle or counter |
| You need to debug state changes over time | Simple local UI state |

In our app:
- **Redux:** restaurant list (shared), cart (shared), filters/sort
- **useState:** loading/error in `useRestaurantMenu` (only used by one page)

---

## Next Up

You've seen how data is managed globally. Now learn how the app **fetches data from external APIs** in **[05 — API & Data Fetching](./05-api-and-data.md)**.
