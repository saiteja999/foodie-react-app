import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRestaurantMenu } from "../hooks/useRestaurantMenu";
import { useCart } from "../hooks/useCart";
import { CDN_URL } from "../utils/constants";
import { getItemCardsFromMenu } from "../utils/menuHelpers";
import { mockMenuCards } from "../utils/mockMenuData";

function MenuItem({ item, restaurantId, restaurantName, onAdd }) {
  const card = item?.card?.info;
  if (!card) return null;
  const { id, name, price, defaultPrice, imageId } = card;
  const displayPrice = (price ?? defaultPrice) / 100;

  return (
    <div className="menu-item">
      <div className="menu-item-info">
        <h4>{name}</h4>
        <p>₹{displayPrice}</p>
        <button
          className="add-btn"
          onClick={() =>
            onAdd({
              id,
              name,
              price,
              defaultPrice,
              restaurantId,
              restaurantName,
            })
          }
        >
          Add
        </button>
      </div>
      {imageId && (
        <img
          className="menu-item-img"
          src={`${CDN_URL}/${imageId}`}
          alt={name}
        />
      )}
    </div>
  );
}

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { menu, info, loading, error } = useRestaurantMenu(id);
  const { addItem, restaurantId: cartRestaurantId } = useCart();
  
  // Try to get restaurant info from Redux store if API failed
  const allRestaurants = useSelector((state) => state.restaurants.allRestaurants);
  const restaurantFromList = allRestaurants.find((r) => r?.info?.id === id);
  
  const itemCards =
    getItemCardsFromMenu(menu).length > 0
      ? getItemCardsFromMenu(menu)
      : mockMenuCards.flatMap((c) => c?.card?.card?.itemCards ?? []);

  if (loading) return <div className="body">Loading menu…</div>;
  
  // Use restaurant info from Redux if API failed, otherwise use API response
  const name = info?.name ?? restaurantFromList?.info?.name ?? "Restaurant";
  const cuisines = info?.cuisines?.join(", ") ?? restaurantFromList?.info?.cuisines?.join(", ") ?? "";
  const avgRating = info?.avgRating ?? restaurantFromList?.info?.avgRating ?? "—";
  const costForTwo = info?.costForTwo 
    ? `₹${info.costForTwo / 100}` 
    : restaurantFromList?.info?.costForTwo 
    ? `₹${restaurantFromList.info.costForTwo / 100}` 
    : "—";

  const canAddFromThisRestaurant =
    !cartRestaurantId || cartRestaurantId === id;

  return (
    <div className="body restaurant-detail">
      <div className="restaurant-header">
        <h1>{name}</h1>
        {cuisines && <p>{cuisines}</p>}
        <p>Rating: {avgRating} · Cost for two: {costForTwo}</p>
        {error && (
          <p style={{ fontSize: "0.9em", color: "#666", fontStyle: "italic", marginTop: "0.5rem" }}>
            Note: Using sample menu (API unavailable)
          </p>
        )}
      </div>
      <div className="menu-list">
        {itemCards.length ? (
          itemCards.map((item) => (
            <MenuItem
              key={item?.card?.info?.id}
              item={item}
              restaurantId={id}
              restaurantName={name}
              onAdd={canAddFromThisRestaurant ? addItem : undefined}
            />
          ))
        ) : (
          <p>Menu data not available. Add mock menu or use live API.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
