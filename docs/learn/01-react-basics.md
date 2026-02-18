# 01 — React Basics: Components, JSX & Props

> Start here if you're new to React. This covers the building blocks that everything else is built on.

---

## What is a Component?

A component is just a **JavaScript function that returns HTML-like code (JSX)**. That's it. Every piece of UI you see — the header, a restaurant card, a button — is a component.

```jsx
const Footer = () => {
  return <div className="Footer">Footer</div>;
};
```

This is a complete React component. It's a function. It returns some JSX. Done.

**Where to see this:** `src/components/Footer.js`

---

## JSX — HTML inside JavaScript

JSX looks like HTML, but it's actually JavaScript. React converts it into real DOM elements behind the scenes.

Key differences from regular HTML:
- Use `className` instead of `class` (because `class` is a reserved word in JS)
- Use `{}` to embed JavaScript expressions inside JSX
- Self-closing tags must have a slash: `<img />`, `<br />`

```jsx
// This JSX:
<h3>{name}</h3>

// Is equivalent to:
React.createElement('h3', null, name)
```

You'll never write the second form — JSX exists so you don't have to.

---

## Props — Passing Data to Components

Props are how you pass data from a **parent** component to a **child** component. Think of them as function arguments.

**In our app**, the `HomePage` renders a list of `RestaurantCard` components. Each card needs to know *which* restaurant to display. That data comes through props:

```jsx
// Parent (HomePage.js) passes data:
<RestaurantCard key={restaurant?.info?.id} resData={restaurant} />

// Child (RestaurantCard.js) receives it:
const RestaurantCard = ({ resData }) => {
  const info = resData?.info;
  const { id, name, cuisines, avgRating, costForTwo } = info;
  // ...uses these values to render the card
};
```

**Where to see this:**
- Parent passing props: `src/pages/HomePage.js` (line ~57)
- Child receiving props: `src/components/RestaurantCard.js` (line ~5)

### Destructuring Props

Instead of writing `props.resData`, we destructure directly in the function parameter:

```jsx
// Without destructuring:
const RestaurantCard = (props) => {
  const { resData } = props;
};

// With destructuring (cleaner):
const RestaurantCard = ({ resData }) => {
  // resData is available directly
};
```

---

## The `key` Prop — Why React Needs It

When rendering a list, React needs a unique `key` on each item so it can efficiently update the DOM when data changes.

```jsx
{list.map((restaurant) => (
  <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
))}
```

Without `key`, React would re-render the entire list on every change. With `key`, it only updates the items that actually changed.

**Rule:** Use a stable, unique identifier (like an `id` from your data). Never use array index as key if the list can reorder.

---

## Conditional Rendering

Show different UI based on conditions. Our app does this everywhere:

```jsx
// Show loading state
if (loading) {
  return <div>Loading...</div>;
}

// Show error state
if (error && list.length === 0) {
  return <p className="error">Error: {error}</p>;
}

// Show the actual content
return <div>...</div>;
```

**Where to see this:** `src/pages/HomePage.js` — the component returns different JSX based on `loading`, `error`, and `list.length`.

### Inline Conditional Rendering

```jsx
// Show cart count only when items exist (&&)
Cart {totalItems > 0 && `(${totalItems})`}

// Show different text based on condition (ternary)
{filterTopRated ? "Show all restaurants" : "Top rated only"}

// Show element only if truthy
{cuisines && <p>{cuisines}</p>}
```

**Where to see this:** `src/components/Header.js` (cart count), `src/pages/HomePage.js` (filter button text)

---

## Exporting & Importing Components

Every component file exports its component, and other files import it:

```jsx
// RestaurantCard.js — export
export default RestaurantCard;

// HomePage.js — import
import RestaurantCard from "../components/RestaurantCard";
```

**`export default`** = one main export per file (import without curly braces)
**`export const`** = named export (import WITH curly braces)

```jsx
// constants.js — named exports
export const CDN_URL = "...";
export const ROUTES = { ... };

// Importing named exports — note the { }
import { CDN_URL, ROUTES } from "../utils/constants";
```

---

## File Organization in This Project

```
src/
  components/   → Reusable UI pieces (Header, Footer, RestaurantCard)
  pages/        → Full page components (HomePage, CartPage, etc.)
  hooks/        → Custom React hooks (useRestaurants, useCart)
  store/        → Redux state management
  services/     → API calls
  utils/        → Helper functions and constants
  __tests__/    → Unit tests
```

Each folder has a clear purpose. Components are small and reusable. Pages compose components together. This separation makes the codebase easy to navigate as it grows.

---

## Next Up

Now that you understand components, JSX, and props, move on to **[02 — Hooks](./02-hooks.md)** to learn how components manage state and side effects.
