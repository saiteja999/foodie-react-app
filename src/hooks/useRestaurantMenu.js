import { useState, useEffect, useCallback } from "react";
import { fetchRestaurantMenu } from "../services/restaurantService";

/**
 * Fetches restaurant menu by id.
 * Returns { menu, info, loading, error, refetch }.
 */
export function useRestaurantMenu(restaurantId) {
  const [menu, setMenu] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(() => {
    if (!restaurantId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetchRestaurantMenu(restaurantId)
      .then((data) => {
        setMenu(data);
        const cards = data?.cards ?? [];
        const infoCard = cards.find(
          (c) => c?.card?.card?.["@type"]?.includes("Restaurant")
        );
        setInfo(infoCard?.card?.card ?? null);
      })
      .catch((err) => setError(err.message || "Failed to load menu"))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { menu, info, loading, error, refetch: fetch };
}
