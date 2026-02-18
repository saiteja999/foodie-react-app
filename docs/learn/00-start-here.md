# Learn React by Building a Food Ordering App

> A beginner-friendly guide to React, built around a real production-grade project. Instead of isolated examples, every concept is explained using actual code from this codebase.

---

## Who is this for?

You know basic HTML, CSS, and JavaScript. You've maybe heard of React but haven't built anything real with it. These guides will take you from zero to understanding a full-featured app with routing, global state, API calls, and tests.

---

## How to use these guides

1. **Read in order** — each guide builds on the previous one
2. **Open the referenced files** — every guide points to real code in `src/`
3. **Experiment** — change something, see what breaks, understand why
4. **Run the app** — `npm start` → http://localhost:3000

---

## The Learning Path

| # | Guide | What you'll learn | Key files |
|---|---|---|---|
| 01 | [React Basics](./01-react-basics.md) | Components, JSX, props, conditional rendering, file structure | `RestaurantCard.js`, `Footer.js` |
| 02 | [Hooks](./02-hooks.md) | useState, useEffect, useCallback, custom hooks | `useRestaurants.js`, `useCart.js`, `useRestaurantMenu.js` |
| 03 | [React Router](./03-react-router.md) | Routes, Link, NavLink, useParams, URL-based rendering | `App.js`, `Header.js`, `RestaurantCard.js` |
| 04 | [Redux Toolkit](./04-redux.md) | Store, slices, reducers, useSelector, useDispatch | `store/index.js`, `cartSlice.js`, `restaurantSlice.js` |
| 05 | [API & Data Fetching](./05-api-and-data.md) | Service layer, fetch, error handling, mock data fallback | `api.js`, `restaurantService.js`, `mockData.js` |
| 06 | [Testing](./06-testing.md) | Jest, React Testing Library, testing patterns | `__tests__/` folder |

---

## The Big Picture

Here's how the major concepts connect in this app:

```
┌──────────────────────────────────────────────────────────┐
│                      BrowserRouter                       │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              Redux Provider (Store)                  │ │
│  │  ┌───────────┐   ┌───────────┐   ┌───────────┐    │ │
│  │  │ restaurant│   │   cart     │   │ (future   │    │ │
│  │  │  Slice    │   │  Slice    │   │  slices)  │    │ │
│  │  └─────┬─────┘   └─────┬─────┘   └───────────┘    │ │
│  │        │               │                            │ │
│  │  ┌─────┴───────────────┴──────────────────────┐    │ │
│  │  │              Components                     │    │ │
│  │  │                                             │    │ │
│  │  │  Header ─── NavLink → Router navigation     │    │ │
│  │  │    │                                        │    │ │
│  │  │    └── useSelector(cart) → badge count      │    │ │
│  │  │                                             │    │ │
│  │  │  Routes                                     │    │ │
│  │  │    /          → HomePage                    │    │ │
│  │  │    │            └── useRestaurants()         │    │ │
│  │  │    │                  └── fetchAPI → Redux   │    │ │
│  │  │    │                                        │    │ │
│  │  │    /restaurant/:id → RestaurantDetailPage   │    │ │
│  │  │    │                   └── useRestaurantMenu│    │ │
│  │  │    │                   └── useCart()         │    │ │
│  │  │    │                                        │    │ │
│  │  │    /cart       → CartPage                   │    │ │
│  │  │                   └── useCart()              │    │ │
│  │  │                                             │    │ │
│  │  │  Footer                                     │    │ │
│  │  └─────────────────────────────────────────────┘    │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Quick Concept Glossary

| Term | One-sentence explanation |
|---|---|
| **Component** | A function that returns UI (JSX) |
| **JSX** | HTML-like syntax inside JavaScript |
| **Props** | Data passed from parent to child component |
| **State** | Data that can change and triggers re-renders |
| **Hook** | A function that lets components use React features (state, effects, etc.) |
| **useEffect** | Run code after render (API calls, timers, subscriptions) |
| **Custom Hook** | Your own hook that combines built-in hooks into reusable logic |
| **Route** | A URL pattern mapped to a component |
| **Redux Store** | Central place where shared app state lives |
| **Slice** | A feature's state + the functions that update it |
| **Reducer** | A function that takes current state + action → returns new state |
| **Dispatch** | How you send an action to the store to update state |
| **Selector** | A function that reads a specific piece of state from the store |
| **Mock Data** | Fake data used when the real API is unavailable |

---

## Prerequisites

- HTML, CSS, and JavaScript basics
- ES6 features: arrow functions, destructuring, template literals, `async/await`
- Understanding of `npm` (installing packages, running scripts)

If you're shaky on ES6, spend 30 minutes on [javascript.info](https://javascript.info/) first. Everything in React builds on modern JavaScript.

---

## Project Structure

```
React/
├── index.html              ← Entry point HTML
├── index.css               ← Global styles
├── package.json            ← Dependencies and scripts
├── src/
│   ├── App.js              ← Root component, router setup
│   ├── components/         ← Reusable UI components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── RestaurantCard.js
│   ├── pages/              ← Full page components
│   │   ├── HomePage.js
│   │   ├── RestaurantDetailPage.js
│   │   ├── CartPage.js
│   │   ├── AboutPage.js
│   │   └── ContactPage.js
│   ├── hooks/              ← Custom React hooks
│   │   ├── useRestaurants.js
│   │   ├── useRestaurantMenu.js
│   │   └── useCart.js
│   ├── store/              ← Redux state management
│   │   ├── index.js
│   │   └── slices/
│   │       ├── cartSlice.js
│   │       └── restaurantSlice.js
│   ├── services/           ← API call functions
│   │   ├── api.js
│   │   └── restaurantService.js
│   ├── utils/              ← Helpers and constants
│   │   ├── constants.js
│   │   ├── menuHelpers.js
│   │   ├── mockData.js
│   │   └── mockMenuData.js
│   └── __tests__/          ← Unit tests
└── docs/
    └── learn/              ← You are here!
```

---

Happy learning! Start with **[01 — React Basics](./01-react-basics.md)** and work your way through.
