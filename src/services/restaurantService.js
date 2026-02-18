import { request, getRestaurantsListUrl, getRestaurantMenuUrl } from "./api";

const RESTAURANTS_CARD_INDEX = 4;

/**
 * Fetches list of restaurants from external API.
 * Response shape: data.cards[4].card.card.gridElements.infoWithStyle.restaurants
 */
export async function fetchRestaurantsList() {
  const json = await request(getRestaurantsListUrl());
  const restaurants =
    json?.data?.cards?.[RESTAURANTS_CARD_INDEX]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants ?? [];
  return Array.isArray(restaurants) ? restaurants : [];
}

/**
 * Fetches restaurant menu for a given restaurant id.
 */
export async function fetchRestaurantMenu(restaurantId) {
  const json = await request(getRestaurantMenuUrl(restaurantId));
  const menuData = json?.data;
  return menuData ?? null;
}
