# 03 — React Router: Navigation Without Page Reloads

> React Router lets you build a multi-page app that never actually reloads the browser. URLs change, components swap, but it's all JavaScript.

---

## The Problem Router Solves

Without a router, your entire app is one page. To show different content, you'd need ugly conditional rendering:

```jsx
// Without router (bad):
if (page === "home") return <HomePage />;
if (page === "cart") return <CartPage />;
if (page === "about") return <AboutPage />;
```

React Router replaces this with **URL-based rendering**. The URL `/cart` renders `CartPage`. The URL `/about` renders `AboutPage`. The browser's back/forward buttons work. Users can bookmark pages. And no full page reload happens.

---

## How We Set It Up

**Step 1:** Wrap the entire app in `BrowserRouter` (in `src/App.js`):

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </Provider>
);
```

`BrowserRouter` enables routing for everything inside it.

**Step 2:** Define routes inside `<Routes>`:

```jsx
const AppLayout = () => (
  <div className="layout">
    <Header />        {/* Always visible */}
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </main>
    <Footer />        {/* Always visible */}
  </div>
);
```

**Where to see this:** `src/App.js`

Notice how `Header` and `Footer` are **outside** `<Routes>`. They show on every page. Only the content inside `<Routes>` changes based on the URL.

---

## Route Parameters — Dynamic URLs

The route `/restaurant/:id` has a **parameter** `:id`. This matches any URL like `/restaurant/334475` or `/restaurant/500002`.

```jsx
<Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
```

Inside the component, you read the parameter with the `useParams` hook:

```jsx
// src/pages/RestaurantDetailPage.js
import { useParams } from "react-router-dom";

const RestaurantDetailPage = () => {
  const { id } = useParams();   // "334475", "500002", etc.
  const { menu, info } = useRestaurantMenu(id);  // fetch menu for this restaurant
};
```

**The flow:**
1. User clicks a restaurant card → URL changes to `/restaurant/334475`
2. Router matches the `/restaurant/:id` route
3. `RestaurantDetailPage` renders
4. `useParams()` returns `{ id: "334475" }`
5. The hook fetches menu data for that ID

---

## Navigation — Link and NavLink

### Link — Basic Navigation

`<Link>` is React Router's replacement for `<a>` tags. It changes the URL without reloading the page.

```jsx
import { Link } from "react-router-dom";

// In RestaurantCard.js:
<Link to={"/restaurant/" + id} className="res-card">
  <img ... />
  <h3>{name}</h3>
</Link>
```

**Where to see this:** `src/components/RestaurantCard.js` — each card is a `Link` to the restaurant's detail page.

### NavLink — Navigation with Active State

`<NavLink>` is like `<Link>` but it knows when it's the **current page**. This lets you style the active nav item differently.

```jsx
import { NavLink } from "react-router-dom";

// In Header.js:
const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

<NavLink to="/" className={navClass}>Home</NavLink>
<NavLink to="/about" className={navClass}>About</NavLink>
<NavLink to="/cart" className={navClass}>
  Cart {totalItems > 0 && `(${totalItems})`}
</NavLink>
```

When you're on `/about`, the About link gets the `active` class automatically. The CSS highlights it:

```css
.nav-link.active {
  color: #e63946;
  font-weight: 600;
}
```

**Where to see this:** `src/components/Header.js`

---

## Centralized Route Constants

Instead of scattering URL strings across the app, we define all routes in one place:

```jsx
// src/utils/constants.js
export const ROUTES = {
  HOME: "/",
  RESTAURANT: "/restaurant/:id",
  RESTAURANT_BASE: "/restaurant",
  CART: "/cart",
  ABOUT: "/about",
  CONTACT: "/contact",
};
```

Then use them everywhere:

```jsx
// In App.js:
<Route path={ROUTES.HOME} element={<HomePage />} />

// In RestaurantCard.js:
<Link to={ROUTES.RESTAURANT_BASE + "/" + id}>

// In Header.js:
<NavLink to={ROUTES.CART}>Cart</NavLink>
```

**Why?** If you ever change a URL (e.g., `/cart` → `/my-cart`), you only change it in one file.

---

## How It All Connects

```
User clicks "KFC" card (RestaurantCard.js)
  → <Link to="/restaurant/334475">
  → URL changes to /restaurant/334475 (no page reload)
  → Router matches <Route path="/restaurant/:id">
  → Renders RestaurantDetailPage
  → useParams() returns { id: "334475" }
  → useRestaurantMenu("334475") fetches menu
  → Menu items render with "Add" buttons

User clicks "Cart" in header (Header.js)
  → <NavLink to="/cart">
  → URL changes to /cart
  → Router matches <Route path="/cart">
  → Renders CartPage
  → useCart() reads items from Redux
  → Cart items render

User clicks browser Back button
  → URL changes back to /restaurant/334475
  → Router re-renders RestaurantDetailPage
  → No API call needed (data still in state)
```

---

## Next Up

Now you know how pages and navigation work. The next piece is **state management** — how data flows across the entire app with **[04 — Redux](./04-redux.md)**.
