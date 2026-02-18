import restaurantReducer, {
  setRestaurants,
  setLoading,
  setError,
  toggleTopRated,
  setSortBy,
  resetFilters,
  SORT_OPTIONS,
} from "../../store/slices/restaurantSlice";

const mockRestaurants = [
  { info: { id: "1", name: "KFC", avgRating: "3.8", costForTwo: 40000, deliveryTime: 36 } },
  { info: { id: "2", name: "Meghana Foods", avgRating: "4.4", costForTwo: 50000, deliveryTime: 29 } },
  { info: { id: "3", name: "Subway", avgRating: "4.1", costForTwo: 35000, deliveryTime: 25 } },
  { info: { id: "4", name: "Barbeque Nation", avgRating: "4.5", costForTwo: 150000, deliveryTime: 45 } },
  { info: { id: "5", name: "Taco Bell", avgRating: "3.6", costForTwo: 30000, deliveryTime: 33 } },
];

describe("restaurantSlice", () => {
  const initialState = {
    list: [],
    allRestaurants: [],
    loading: false,
    error: null,
    sortBy: SORT_OPTIONS.DEFAULT,
    filterTopRated: false,
  };

  it("should return initial state", () => {
    expect(restaurantReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("setRestaurants", () => {
    it("should populate list and allRestaurants", () => {
      const state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      expect(state.list).toHaveLength(5);
      expect(state.allRestaurants).toHaveLength(5);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe("setLoading", () => {
    it("should set loading to true and clear error", () => {
      const prev = { ...initialState, error: "some error" };
      const state = restaurantReducer(prev, setLoading(true));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set loading to false", () => {
      const state = restaurantReducer({ ...initialState, loading: true }, setLoading(false));
      expect(state.loading).toBe(false);
    });
  });

  describe("setError", () => {
    it("should set error and stop loading", () => {
      const state = restaurantReducer({ ...initialState, loading: true }, setError("Network error"));
      expect(state.error).toBe("Network error");
      expect(state.loading).toBe(false);
    });
  });

  describe("toggleTopRated", () => {
    it("should filter restaurants with rating >= 4.0", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, toggleTopRated());
      expect(state.filterTopRated).toBe(true);
      expect(state.list.every((r) => parseFloat(r.info.avgRating) >= 4.0)).toBe(true);
      expect(state.list).toHaveLength(3); // Meghana 4.4, Subway 4.1, Barbeque 4.5
    });

    it("should restore all restaurants on second toggle", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, toggleTopRated());
      state = restaurantReducer(state, toggleTopRated());
      expect(state.filterTopRated).toBe(false);
      expect(state.list).toHaveLength(5);
    });

    it("should exclude restaurants below 4.0", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, toggleTopRated());
      const ids = state.list.map((r) => r.info.id);
      expect(ids).not.toContain("1"); // KFC 3.8
      expect(ids).not.toContain("5"); // Taco Bell 3.6
    });
  });

  describe("setSortBy", () => {
    it("should sort by rating high to low", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, setSortBy(SORT_OPTIONS.RATING_HIGH));
      const ratings = state.list.map((r) => parseFloat(r.info.avgRating));
      expect(ratings).toEqual([4.5, 4.4, 4.1, 3.8, 3.6]);
    });

    it("should sort by rating low to high", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, setSortBy(SORT_OPTIONS.RATING_LOW));
      const ratings = state.list.map((r) => parseFloat(r.info.avgRating));
      expect(ratings).toEqual([3.6, 3.8, 4.1, 4.4, 4.5]);
    });

    it("should sort by name A-Z", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, setSortBy(SORT_OPTIONS.NAME_AZ));
      const names = state.list.map((r) => r.info.name);
      expect(names).toEqual(["Barbeque Nation", "KFC", "Meghana Foods", "Subway", "Taco Bell"]);
    });

    it("should sort by name Z-A", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, setSortBy(SORT_OPTIONS.NAME_ZA));
      const names = state.list.map((r) => r.info.name);
      expect(names).toEqual(["Taco Bell", "Subway", "Meghana Foods", "KFC", "Barbeque Nation"]);
    });

    it("should sort by cost low to high", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, setSortBy(SORT_OPTIONS.COST_LOW));
      const costs = state.list.map((r) => r.info.costForTwo);
      expect(costs).toEqual([30000, 35000, 40000, 50000, 150000]);
    });

    it("should sort by cost high to low", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, setSortBy(SORT_OPTIONS.COST_HIGH));
      const costs = state.list.map((r) => r.info.costForTwo);
      expect(costs).toEqual([150000, 50000, 40000, 35000, 30000]);
    });

    it("should sort by fastest delivery", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, setSortBy(SORT_OPTIONS.DELIVERY_FAST));
      const times = state.list.map((r) => r.info.deliveryTime);
      expect(times).toEqual([25, 29, 33, 36, 45]);
    });
  });

  describe("combined filter + sort", () => {
    it("should filter top rated then sort by cost", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, toggleTopRated());
      state = restaurantReducer(state, setSortBy(SORT_OPTIONS.COST_LOW));
      expect(state.list).toHaveLength(3);
      const costs = state.list.map((r) => r.info.costForTwo);
      expect(costs).toEqual([35000, 50000, 150000]);
    });
  });

  describe("resetFilters", () => {
    it("should reset all filters and sort to defaults", () => {
      let state = restaurantReducer(initialState, setRestaurants(mockRestaurants));
      state = restaurantReducer(state, toggleTopRated());
      state = restaurantReducer(state, setSortBy(SORT_OPTIONS.NAME_AZ));
      state = restaurantReducer(state, resetFilters());
      expect(state.filterTopRated).toBe(false);
      expect(state.sortBy).toBe(SORT_OPTIONS.DEFAULT);
      expect(state.list).toHaveLength(5);
    });
  });
});
