// CDN & API
export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600";

export const LOGO_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP-Stp3j9l7A7FmeODEQvEwQcBTz_-55i1uZrCXG6lyA&s";

// API base (Swiggy – use a backend proxy in production to avoid CORS)
export const API_BASE =
  "https://www.swiggy.com/dapi";

export const DEFAULT_LAT = "12.9351929";
export const DEFAULT_LNG = "77.62448069999999";

// Routes
export const ROUTES = {
  HOME: "/",
  RESTAURANT: "/restaurant/:id",
  RESTAURANT_BASE: "/restaurant",
  CART: "/cart",
  ABOUT: "/about",
  CONTACT: "/contact",
};
