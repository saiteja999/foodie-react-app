import { createSlice } from "@reduxjs/toolkit";

const SORT_OPTIONS = {
  DEFAULT: "default",
  RATING_HIGH: "rating_high",
  RATING_LOW: "rating_low",
  NAME_AZ: "name_az",
  NAME_ZA: "name_za",
  COST_LOW: "cost_low",
  COST_HIGH: "cost_high",
  DELIVERY_FAST: "delivery_fast",
};

const initialState = {
  list: [],
  allRestaurants: [],
  loading: false,
  error: null,
  sortBy: SORT_OPTIONS.DEFAULT,
  filterTopRated: false,
};

function sortRestaurants(restaurants, sortBy) {
  const sorted = [...restaurants];
  switch (sortBy) {
    case SORT_OPTIONS.RATING_HIGH:
      return sorted.sort((a, b) => parseFloat(b?.info?.avgRating || 0) - parseFloat(a?.info?.avgRating || 0));
    case SORT_OPTIONS.RATING_LOW:
      return sorted.sort((a, b) => parseFloat(a?.info?.avgRating || 0) - parseFloat(b?.info?.avgRating || 0));
    case SORT_OPTIONS.NAME_AZ:
      return sorted.sort((a, b) => (a?.info?.name || "").localeCompare(b?.info?.name || ""));
    case SORT_OPTIONS.NAME_ZA:
      return sorted.sort((a, b) => (b?.info?.name || "").localeCompare(a?.info?.name || ""));
    case SORT_OPTIONS.COST_LOW:
      return sorted.sort((a, b) => (a?.info?.costForTwo || 0) - (b?.info?.costForTwo || 0));
    case SORT_OPTIONS.COST_HIGH:
      return sorted.sort((a, b) => (b?.info?.costForTwo || 0) - (a?.info?.costForTwo || 0));
    case SORT_OPTIONS.DELIVERY_FAST:
      return sorted.sort((a, b) => (a?.info?.deliveryTime || 0) - (b?.info?.deliveryTime || 0));
    default:
      return sorted;
  }
}

function applyFiltersAndSort(allRestaurants, filterTopRated, sortBy) {
  let result = [...allRestaurants];
  if (filterTopRated) {
    result = result.filter((r) => parseFloat(r?.info?.avgRating || 0) >= 4.0);
  }
  return sortRestaurants(result, sortBy);
}

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.allRestaurants = action.payload;
      state.list = applyFiltersAndSort(action.payload, state.filterTopRated, state.sortBy);
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload) state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    toggleTopRated: (state) => {
      state.filterTopRated = !state.filterTopRated;
      state.list = applyFiltersAndSort(state.allRestaurants, state.filterTopRated, state.sortBy);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.list = applyFiltersAndSort(state.allRestaurants, state.filterTopRated, action.payload);
    },
    resetFilters: (state) => {
      state.filterTopRated = false;
      state.sortBy = SORT_OPTIONS.DEFAULT;
      state.list = [...state.allRestaurants];
    },
  },
});

export { SORT_OPTIONS };
export const {
  setRestaurants,
  setLoading,
  setError,
  toggleTopRated,
  setSortBy,
  resetFilters,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
