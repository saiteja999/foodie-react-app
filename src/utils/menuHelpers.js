/**
 * Extracts flat list of item cards from Swiggy menu API response.
 * Handles both direct itemCards and groupedCard.cardGroupMap.REGULAR.cards.
 */
export function getItemCardsFromMenu(menuData) {
  if (!menuData?.cards) return [];
  const itemCards = [];
  for (const card of menuData.cards) {
    const c = card?.card?.card;
    if (c?.itemCards) {
      itemCards.push(...c.itemCards);
    }
    const grouped = c?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    if (Array.isArray(grouped)) {
      for (const g of grouped) {
        const items = g?.card?.card?.itemCards;
        if (Array.isArray(items)) itemCards.push(...items);
      }
    }
  }
  return itemCards;
}
