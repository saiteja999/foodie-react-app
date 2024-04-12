import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";

const Body = () => {
  return (
    <div className="Body">
      <div className="search"> search </div>
      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.uuid} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
