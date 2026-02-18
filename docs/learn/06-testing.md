# 06 — Testing with Jest & React Testing Library

> Tests make sure your code works today and doesn't break tomorrow. This covers the testing tools, patterns, and what we test in this project.

---

## The Tools

| Tool | What it does |
|---|---|
| **Jest** | Test runner — finds test files, runs them, reports results |
| **React Testing Library (RTL)** | Renders components in a fake DOM and provides queries |
| **@testing-library/jest-dom** | Extra matchers like `toBeInTheDocument()`, `toHaveTextContent()` |

### Running Tests

```bash
npm test           # runs all tests
npx jest --watch   # re-runs on file changes (great during development)
```

---

## Test File Structure

Tests live in `src/__tests__/` mirroring the source structure:

```
src/__tests__/
  setup.js                       # loads jest-dom matchers
  slices/
    cartSlice.test.js            # Redux reducer tests
    restaurantSlice.test.js
  hooks/
    useCart.test.js               # Custom hook tests
  components/
    Header.test.js                # Component render tests
    Footer.test.js
    RestaurantCard.test.js
  utils/
    constants.test.js             # Pure function tests
    menuHelpers.test.js
```

---

## Pattern 1: Testing Redux Reducers

Reducers are **pure functions** — given a state and action, they always return the same result. This makes them the easiest thing to test.

```jsx
// src/__tests__/slices/cartSlice.test.js
import cartReducer, { addItem, removeItem, clearCart } from "../../store/slices/cartSlice";

it("should add a new item with quantity 1", () => {
  const initialState = { items: [], restaurantId: null, restaurantName: null };

  const state = cartReducer(initialState, addItem({
    id: "item-1",
    name: "Veg Burger",
    price: 12900,
    restaurantId: "rest-1",
    restaurantName: "Test Restaurant",
  }));

  expect(state.items).toHaveLength(1);
  expect(state.items[0].quantity).toBe(1);
  expect(state.restaurantId).toBe("rest-1");
});
```

**The pattern:**
1. Define an initial state
2. Call the reducer with that state and an action
3. Assert the returned state matches expectations

**No React needed.** Reducers are just JavaScript functions.

### Testing Sort and Filter Logic

```jsx
it("should sort by rating high to low", () => {
  let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
  state = restaurantReducer(state, setSortBy(SORT_OPTIONS.RATING_HIGH));

  const ratings = state.list.map((r) => parseFloat(r.info.avgRating));
  expect(ratings).toEqual([4.5, 4.4, 4.1, 3.8, 3.6]);
});

it("should filter top rated then sort by cost", () => {
  let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
  state = restaurantReducer(state, toggleTopRated());
  state = restaurantReducer(state, setSortBy(SORT_OPTIONS.COST_LOW));

  expect(state.list).toHaveLength(3);  // only 4.0+ ratings
  const costs = state.list.map((r) => r.info.costForTwo);
  expect(costs).toEqual([35000, 50000, 150000]);  // sorted low to high
});
```

Chain multiple actions to test combined behavior.

---

## Pattern 2: Testing Components

Components need to be rendered in a test environment. RTL provides `render` and `screen` for this.

```jsx
// src/__tests__/components/RestaurantCard.test.js
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RestaurantCard from "../../components/RestaurantCard";

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

it("should render restaurant name", () => {
  renderWithRouter(<RestaurantCard resData={mockData} />);
  expect(screen.getByText("Test Restaurant")).toBeInTheDocument();
});
```

### Why MemoryRouter?

`RestaurantCard` uses `<Link>` from React Router, which requires a Router context. `MemoryRouter` provides this without needing a real browser URL.

### Testing with Redux

Components that use `useSelector` or `useDispatch` need a Redux Provider:

```jsx
// src/__tests__/components/Header.test.js
function renderWithProviders(ui, { cartState } = {}) {
  const store = configureStore({
    reducer: { cart: cartReducer, restaurants: restaurantReducer },
    preloadedState: cartState ? { cart: cartState } : undefined,
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

it("should show cart count when items exist", () => {
  const cartState = {
    items: [{ id: "1", name: "Burger", price: 100, quantity: 3 }],
    restaurantId: "r1",
    restaurantName: "Test",
  };
  renderWithProviders(<Header />, { cartState });
  expect(screen.getByText(/Cart/)).toHaveTextContent("Cart (3)");
});
```

**The key trick:** Use `preloadedState` to set up specific Redux state for each test. This lets you test how the component behaves with different data.

---

## Pattern 3: Testing Custom Hooks

Hooks can't be called outside components. RTL provides `renderHook` to test them:

```jsx
// src/__tests__/hooks/useCart.test.js
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../store/slices/cartSlice";
import { useCart } from "../../hooks/useCart";

function createWrapper() {
  const store = configureStore({ reducer: { cart: cartReducer } });
  return ({ children }) => <Provider store={store}>{children}</Provider>;
}

it("should add item to cart", () => {
  const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });

  act(() => result.current.addItem(mockItem));

  expect(result.current.items).toHaveLength(1);
  expect(result.current.totalItems).toBe(1);
  expect(result.current.totalAmount).toBe(15000);
});
```

**`act()`** wraps state updates so React processes them before you assert. Without it, assertions might run before the state update completes.

---

## Pattern 4: Testing Pure Utility Functions

The simplest tests — no React, no providers, just input → output:

```jsx
// src/__tests__/utils/menuHelpers.test.js
import { getItemCardsFromMenu } from "../../utils/menuHelpers";

it("should return empty array for null input", () => {
  expect(getItemCardsFromMenu(null)).toEqual([]);
});

it("should extract direct itemCards", () => {
  const menuData = {
    cards: [{
      card: { card: { itemCards: [
        { card: { info: { id: "1", name: "Burger" } } },
      ] } },
    }],
  };
  const result = getItemCardsFromMenu(menuData);
  expect(result).toHaveLength(1);
  expect(result[0].card.info.name).toBe("Burger");
});
```

---

## What to Test — A Practical Guide

| What | Test | Don't test |
|---|---|---|
| Redux reducers | All actions, edge cases, combined logic | Internal implementation details |
| Components | What the user sees and interacts with | CSS classes, internal state |
| Custom hooks | Return values and behavior | Internal useState calls |
| Utility functions | Input/output for each case | Private helper functions |
| API services | Response parsing (with mocked fetch) | The network itself |

### The RTL Philosophy

React Testing Library encourages testing **what the user experiences**, not implementation details:

```jsx
// GOOD — tests what the user sees
expect(screen.getByText("KFC")).toBeInTheDocument();

// BAD — tests implementation details
expect(component.state.restaurantName).toBe("KFC");
```

---

## Our Test Coverage

```
8 test suites, 61 tests total:

  cartSlice.test.js           12 tests  (add, remove, clear, quantity, defaults)
  restaurantSlice.test.js     17 tests  (7 sort options, filter, combined, reset)
  useCart.test.js               7 tests  (hook with Redux Provider)
  Header.test.js                4 tests  (logo, nav, cart count)
  Footer.test.js                2 tests  (renders text)
  RestaurantCard.test.js        9 tests  (render, image, link, null safety)
  constants.test.js             4 tests  (URLs, routes, coordinates)
  menuHelpers.test.js           6 tests  (direct, grouped, combined, null)
```

---

## That's All Six Guides!

Go back to **[00 — Start Here](./00-start-here.md)** to review the full learning path, or dive into the code and start experimenting.
