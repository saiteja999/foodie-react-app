import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRestaurants,
  setLoading,
  setError,
  toggleTopRated as toggleTopRatedAction,
  setSortBy as setSortByAction,
  resetFilters as resetFiltersAction,
} from "../store/slices/restaurantSlice";
import { fetchRestaurantsList } from "../services/restaurantService";
import resList from "../utils/mockData";

export function useRestaurants() {
  const dispatch = useDispatch();
  const { list, loading, error, filterTopRated, sortBy } = useSelector(
    (state) => state.restaurants
  );

  useEffect(() => {
    let cancelled = false;
    dispatch(setLoading(true));
    fetchRestaurantsList()
      .then((restaurants) => {
        if (!cancelled) {
          if (restaurants && restaurants.length > 0) {
            dispatch(setRestaurants(restaurants));
          } else {
            console.warn("API returned empty list, using mock data");
            dispatch(setRestaurants(resList));
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn("API fetch failed, using mock data:", err.message);
          dispatch(setRestaurants(resList));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return {
    list,
    loading,
    error,
    filterTopRated,
    sortBy,
    toggleTopRated: () => dispatch(toggleTopRatedAction()),
    setSortBy: (option) => dispatch(setSortByAction(option)),
    resetFilters: () => dispatch(resetFiltersAction()),
  };
}
