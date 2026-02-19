# Foodie - Food Ordering App

## Features

- Browse 12+ restaurants with images, ratings, cuisines, and delivery info
- Filter by **top rated (4.0+)** and sort by **rating, name, cost, delivery time**
- Restaurant detail page with menu items
- Add to cart, adjust quantities, remove items
- Persistent cart state across pages via Redux
- Automatic fallback to mock data when the external API is unavailable (CORS)
- Responsive design for mobile and desktop
- 61 unit tests across 8 test suites

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18 |
| State management | Redux Toolkit |
| Routing | React Router 6 |
| API | External (Swiggy-style) with fetch wrapper |
| Custom hooks | `useRestaurants`, `useRestaurantMenu`, `useCart` |
| Testing | Jest 29 + React Testing Library |
| Bundler | Parcel 2 |

## Scripts

```bash
npm start        # dev server at http://localhost:3000
npm run build    # production build
npm test         # run all 61 unit tests
```

## Project Structure

```
src/
  App.js                        # BrowserRouter + Redux Provider + route config
  store/
    index.js                    # configureStore (restaurants, cart)
    slices/
      restaurantSlice.js        # list, allRestaurants, sort, filter, loading, error
      cartSlice.js              # items, add/remove/clear, restaurant tracking
  services/
    api.js                      # base request() wrapper, API URL builders
    restaurantService.js        # fetchRestaurantsList, fetchRestaurantMenu
  hooks/
    useRestaurants.js           # fetch list, sync Redux, sort/filter, mock fallback
    useRestaurantMenu.js        # fetch menu by restaurant id
    useCart.js                  # cart state + actions from Redux
  pages/
    HomePage.js                 # restaurant grid + filter/sort bar
    RestaurantDetailPage.js     # menu with add-to-cart (Redux info fallback)
    CartPage.js                 # cart management with +/-/remove/clear
    AboutPage.js                # about Foodie
    ContactPage.js              # contact info
  components/
    Header.js                   # NavLink navigation, cart item count
    Footer.js                   # footer with branding
    RestaurantCard.js           # card with image, link to /restaurant/:id
  utils/
    constants.js                # CDN_URL, API_BASE, ROUTES, lat/lng
    menuHelpers.js              # getItemCardsFromMenu (Swiggy response parser)
    mockData.js                 # 12 mock restaurants (fallback)
    mockMenuData.js             # mock menu items (fallback)
  __tests__/
    setup.js                    # @testing-library/jest-dom
    slices/
      cartSlice.test.js         # 12 tests — add, remove, clear, quantity, defaults
      restaurantSlice.test.js   # 17 tests — sort (7 options), filter, combined, reset
    hooks/
      useCart.test.js           # 7 tests — hook with Redux Provider
    components/
      Header.test.js            # 4 tests — logo, nav links, cart count
      Footer.test.js            # 2 tests — renders text
      RestaurantCard.test.js    # 9 tests — render, image fallback, link, null safety
    utils/
      constants.test.js         # 4 tests — CDN, API, routes, coords
      menuHelpers.test.js       # 6 tests — direct, grouped, combined, null
```

## Routes

| Path | Page |
|---|---|
| `/` | Home — restaurant grid with filter & sort |
| `/restaurant/:id` | Restaurant detail — menu + add to cart |
| `/cart` | Cart — quantities, total, clear |
| `/about` | About Foodie |
| `/contact` | Contact info |

## API / CORS

The app calls Swiggy-style endpoints for restaurant data. From the browser these are blocked by CORS, so the app automatically falls back to mock data.

For production:
1. Set up a **backend proxy** that calls the external API and exposes `/api/restaurants` and `/api/menu/:id`
2. Update `API_BASE` in `src/utils/constants.js` to point to your backend

## Testing

```bash
npm test
```

**8 test suites, 61 tests** covering:
- **Redux slices** — cart actions (add/remove/clear/quantity), restaurant filters (top rated >= 4.0), all 7 sort options, combined filter+sort, reset
- **Custom hooks** — useCart with Redux Provider
- **Components** — Header (nav, cart count), Footer, RestaurantCard (render, image fallback, linking, null safety)
- **Utilities** — menuHelpers (Swiggy response parsing), constants validation

## Learning Guides

New to React? The `docs/learn/` folder contains **6 beginner-friendly guides** that explain every major concept using real code from this project:

| # | Guide | Topics |
|---|---|---|
| 00 | [Start Here](docs/learn/00-start-here.md) | Overview, roadmap, glossary |
| 01 | [React Basics](docs/learn/01-react-basics.md) | Components, JSX, props, conditional rendering |
| 02 | [Hooks](docs/learn/02-hooks.md) | useState, useEffect, useCallback, custom hooks |
| 03 | [React Router](docs/learn/03-react-router.md) | Routes, Link, NavLink, useParams |
| 04 | [Redux Toolkit](docs/learn/04-redux.md) | Store, slices, useSelector, useDispatch |
| 05 | [API & Data Fetching](docs/learn/05-api-and-data.md) | Service layer, fetch, error handling, fallbacks |
| 06 | [Testing](docs/learn/06-testing.md) | Jest, React Testing Library, testing patterns |
