import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, cuisines, avgRating, costForTwo } = resData?.info;

  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img className="res-logo" src={CDN_URL} alt="Couldn't display image" />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating}</h4>
      <h4> {costForTwo / 100} </h4>
    </div>
  );
};

export default RestaurantCard;
