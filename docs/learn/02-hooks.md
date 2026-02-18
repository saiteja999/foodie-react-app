# 02 — React Hooks: State, Effects & Custom Hooks

> Hooks let functional components have state, run side effects, and share reusable logic. This is where React gets powerful.

---

## useState — Making Components Interactive

`useState` gives a component its own piece of state. When state changes, the component re-renders.

```jsx
const [count, setCount] = useState(0);
//      ^        ^                 ^
//   current   function to      initial
//    value    update it         value
```

**In our app**, the `useRestaurantMenu` hook uses `useState` to track the menu data, loading state, and errors:

```jsx
// src/hooks/useRestaurantMenu.js
const [menu, setMenu] = useState(null);       // menu data (starts as null)
const [info, setInfo] = useState(null);        // restaurant info
const [loading, setLoading] = useState(true);  // loading flag (starts true)
const [error, setError] = useState(null);      // error message
```

Each call to `useState` creates an independent piece of state. When you call `setMenu(data)`, only `menu` changes — the others stay the same.

**Key rule:** Never modify state directly. Always use the setter function.

```jsx
// WRONG — mutating state directly
menu.cards.push(newCard);

// RIGHT — create new state
setMenu({ ...menu, cards: [...menu.cards, newCard] });
```

---

## useEffect — Running Code After Render

`useEffect` runs code **after** the component renders. It's where you do things like API calls, timers, or DOM manipulation.

```jsx
useEffect(() => {
  // This code runs after render
  fetchData();
}, [dependency]);
//  ^-- controls WHEN the effect re-runs
```

### The Dependency Array

This is the most important concept to understand:

| Dependency Array | When it runs |
|---|---|
| `useEffect(() => {}, [])` | Once, after first render only |
| `useEffect(() => {}, [x])` | After first render + whenever `x` changes |
| `useEffect(() => {})` | After every single render (usually a mistake) |

**In our app**, the restaurant list is fetched once on mount:

```jsx
// src/hooks/useRestaurants.js
useEffect(() => {
  let cancelled = false;
  dispatch(setLoading(true));
  fetchRestaurantsList()
    .then((restaurants) => {
      if (!cancelled) dispatch(setRestaurants(restaurants));
    })
    .catch((err) => {
      if (!cancelled) dispatch(setRestaurants(resList)); // fallback to mock
    });

  return () => { cancelled = true; };  // cleanup
}, [dispatch]);  // runs once (dispatch never changes)
```

### Cleanup Function

The function you **return** from `useEffect` runs when the component unmounts (or before the effect re-runs). This prevents memory leaks and stale updates.

```jsx
useEffect(() => {
  let cancelled = false;    // flag to track if component is still mounted

  fetchData().then((data) => {
    if (!cancelled) {       // only update if still mounted
      setData(data);
    }
  });

  return () => {
    cancelled = true;       // component unmounted, don't update state
  };
}, []);
```

**Why?** If the user navigates away while an API call is in-flight, the response arrives after the component is gone. Without cleanup, React would try to update state on an unmounted component.

**Where to see this:** `src/hooks/useRestaurants.js` and `src/hooks/useRestaurantMenu.js`

---

## useCallback — Preventing Unnecessary Re-creation

`useCallback` memoizes a function so it's not re-created on every render.

```jsx
// Without useCallback — new function created every render
const fetchMenu = () => { ... };

// With useCallback — same function reference unless dependencies change
const fetchMenu = useCallback(() => {
  fetchRestaurantMenu(restaurantId).then(...);
}, [restaurantId]);  // only recreate when restaurantId changes
```

**In our app**, `useRestaurantMenu` uses `useCallback` for the fetch function:

```jsx
// src/hooks/useRestaurantMenu.js
const fetch = useCallback(() => {
  if (!restaurantId) { setLoading(false); return; }
  setLoading(true);
  fetchRestaurantMenu(restaurantId)
    .then((data) => { setMenu(data); ... })
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, [restaurantId]);

useEffect(() => { fetch(); }, [fetch]);
```

The `useEffect` depends on `fetch`. Without `useCallback`, `fetch` would be a new function every render, causing the effect to run infinitely. With `useCallback`, it only changes when `restaurantId` changes.

---

## Custom Hooks — Reusable Logic

A custom hook is just a function that uses other hooks. It lets you **extract and reuse stateful logic** across components.

**Convention:** Custom hooks always start with `use` (e.g., `useCart`, `useRestaurants`).

### Example: useCart

```jsx
// src/hooks/useCart.js
export function useCart() {
  const dispatch = useDispatch();
  const { items, restaurantId, restaurantName } = useSelector((state) => state.cart);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);

  return {
    items,
    totalItems,
    totalAmount,
    addItem: (payload) => dispatch(addItem(payload)),
    removeItem: (id) => dispatch(removeItem(id)),
    clearCart: () => dispatch(clearCart()),
    // ...more actions
  };
}
```

**What this does:**
1. Reads cart state from Redux (`useSelector`)
2. Computes derived values (`totalItems`, `totalAmount`)
3. Wraps Redux dispatch calls into simple functions
4. Returns everything as a clean object

**Any component** can now use the cart with one line:

```jsx
const { items, totalItems, addItem, clearCart } = useCart();
```

No need to know about Redux, dispatch, or selectors. The hook hides all that complexity.

### Our Custom Hooks

| Hook | What it does | File |
|---|---|---|
| `useRestaurants()` | Fetches restaurant list, manages filter/sort | `src/hooks/useRestaurants.js` |
| `useRestaurantMenu(id)` | Fetches menu for a restaurant | `src/hooks/useRestaurantMenu.js` |
| `useCart()` | Cart state + add/remove/clear actions | `src/hooks/useCart.js` |

---

## How Hooks Connect in Our App

Here's the flow when the Home page loads:

```
HomePage renders
  → calls useRestaurants()
    → useEffect triggers fetchRestaurantsList()
    → API fails (CORS) → dispatches setRestaurants(mockData)
    → Redux updates → useSelector gets new list
    → component re-renders with restaurant cards
```

And when you click "Add" on a menu item:

```
User clicks Add
  → calls addItem({ id, name, price, ... })
    → dispatches Redux action
    → cartSlice reducer updates state
    → Header re-renders (useSelector picks up new totalItems)
    → Cart badge shows updated count
```

---

## Next Up

You understand how components hold state and run effects. Now learn how to navigate between pages with **[03 — React Router](./03-react-router.md)**.
