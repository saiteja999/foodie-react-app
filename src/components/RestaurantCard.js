import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import { ROUTES } from "../utils/constants";

const PLACEHOLDER = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop";

const RestaurantCard = ({ resData }) => {
  const info = resData?.info;
  if (!info) return null;

  const { id, name, cuisines, avgRating, costForTwo, cloudinaryImageId, imageUrl } = info;
  const imgSrc = imageUrl
    ? imageUrl
    : cloudinaryImageId
    ? `${CDN_URL}/${cloudinaryImageId}`
    : PLACEHOLDER;

  return (
    <Link
      to={ROUTES.RESTAURANT_BASE + "/" + id}
      className="res-card"
    >
      <img className="res-logo" src={imgSrc} alt={name} />
      <h3>{name}</h3>
      <h4>{Array.isArray(cuisines) ? cuisines.join(", ") : cuisines}</h4>
      <h4>Rating: {avgRating}</h4>
      <h4>Cost for two: ₹{costForTwo / 100}</h4>
    </Link>
  );
};

export default RestaurantCard;
