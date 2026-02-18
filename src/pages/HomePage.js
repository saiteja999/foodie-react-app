import { useRestaurants } from "../hooks/useRestaurants";
import RestaurantCard from "../components/RestaurantCard";
import { SORT_OPTIONS } from "../store/slices/restaurantSlice";

const SORT_LABELS = [
  { value: SORT_OPTIONS.DEFAULT, label: "Default" },
  { value: SORT_OPTIONS.RATING_HIGH, label: "Rating: High to Low" },
  { value: SORT_OPTIONS.RATING_LOW, label: "Rating: Low to High" },
  { value: SORT_OPTIONS.NAME_AZ, label: "Name: A → Z" },
  { value: SORT_OPTIONS.NAME_ZA, label: "Name: Z → A" },
  { value: SORT_OPTIONS.COST_LOW, label: "Cost: Low to High" },
  { value: SORT_OPTIONS.COST_HIGH, label: "Cost: High to Low" },
  { value: SORT_OPTIONS.DELIVERY_FAST, label: "Fastest Delivery" },
];

const HomePage = () => {
  const { list, loading, error, filterTopRated, sortBy, toggleTopRated, setSortBy, resetFilters } =
    useRestaurants();

  if (loading) {
    return (
      <div className="body">
        <div className="res-container">
          <div style={{ width: "100%", textAlign: "center", padding: "3rem", color: "#636e72" }}>
            <div style={{ fontSize: "48px", marginBottom: "0.5rem" }}>🍽️</div>
            <div>Loading delicious restaurants...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error && list.length === 0) {
    return (
      <div className="body">
        <div className="res-container">
          <p className="error">Error: {error}</p>
        </div>
      </div>
    );
  }

  const hasActiveFilters = filterTopRated || sortBy !== SORT_OPTIONS.DEFAULT;

  return (
    <div className="body">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#2d3436", marginBottom: "0.5rem" }}>
          🍽️ Discover Restaurants
        </h1>
        <p style={{ color: "#636e72", fontSize: "16px" }}>
          Explore top-rated restaurants and order your favorite meals
        </p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="filter-bar">
        <div className="filter-bar-row">
          <button
            className={`filter-chip ${filterTopRated ? "active" : ""}`}
            onClick={toggleTopRated}
          >
            ⭐ Top Rated (4.0+)
          </button>

          <div className="sort-dropdown-wrap">
            <select
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_LABELS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button className="filter-chip reset" onClick={resetFilters}>
              ✕ Clear Filters
            </button>
          )}
        </div>

        <div className="filter-bar-info">
          Showing {list.length} restaurant{list.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="res-container">
        {list?.length ? (
          list.map((restaurant) => (
            <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
          ))
        ) : (
          <div style={{ width: "100%", textAlign: "center", padding: "3rem", color: "#636e72" }}>
            <div style={{ fontSize: "48px", marginBottom: "1rem" }}>🍴</div>
            <div style={{ fontSize: "18px", marginBottom: "1rem" }}>No restaurants match your filters</div>
            <button className="filter-chip reset" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
