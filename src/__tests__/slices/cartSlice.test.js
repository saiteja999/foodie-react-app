import cartReducer, { addItem, removeItem, clearItem, clearCart } from "../../store/slices/cartSlice";

const mockItem = {
  id: "item-1",
  name: "Veg Burger",
  price: 12900,
  defaultPrice: 12900,
  restaurantId: "rest-1",
  restaurantName: "Test Restaurant",
};

describe("cartSlice", () => {
  const initialState = { items: [], restaurantId: null, restaurantName: null };

  it("should return initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("addItem", () => {
    it("should add a new item with quantity 1", () => {
      const state = cartReducer(initialState, addItem(mockItem));
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({
        id: "item-1",
        name: "Veg Burger",
        price: 12900,
        quantity: 1,
      });
      expect(state.restaurantId).toBe("rest-1");
      expect(state.restaurantName).toBe("Test Restaurant");
    });

    it("should increment quantity if item already exists", () => {
      const stateWith1 = cartReducer(initialState, addItem(mockItem));
      const stateWith2 = cartReducer(stateWith1, addItem(mockItem));
      expect(stateWith2.items).toHaveLength(1);
      expect(stateWith2.items[0].quantity).toBe(2);
    });

    it("should use defaultPrice when price is null", () => {
      const item = { ...mockItem, price: null, defaultPrice: 9900 };
      const state = cartReducer(initialState, addItem(item));
      expect(state.items[0].price).toBe(9900);
    });

    it("should add multiple different items", () => {
      const item2 = { ...mockItem, id: "item-2", name: "Fries" };
      let state = cartReducer(initialState, addItem(mockItem));
      state = cartReducer(state, addItem(item2));
      expect(state.items).toHaveLength(2);
    });
  });

  describe("removeItem", () => {
    it("should decrement quantity when > 1", () => {
      let state = cartReducer(initialState, addItem(mockItem));
      state = cartReducer(state, addItem(mockItem));
      expect(state.items[0].quantity).toBe(2);

      state = cartReducer(state, removeItem("item-1"));
      expect(state.items[0].quantity).toBe(1);
    });

    it("should remove item entirely when quantity is 1", () => {
      let state = cartReducer(initialState, addItem(mockItem));
      state = cartReducer(state, removeItem("item-1"));
      expect(state.items).toHaveLength(0);
    });

    it("should reset restaurant info when cart becomes empty", () => {
      let state = cartReducer(initialState, addItem(mockItem));
      state = cartReducer(state, removeItem("item-1"));
      expect(state.restaurantId).toBeNull();
      expect(state.restaurantName).toBeNull();
    });

    it("should do nothing for non-existent item", () => {
      const state = cartReducer(initialState, addItem(mockItem));
      const newState = cartReducer(state, removeItem("non-existent"));
      expect(newState.items).toHaveLength(1);
    });
  });

  describe("clearItem", () => {
    it("should remove an item regardless of quantity", () => {
      let state = cartReducer(initialState, addItem(mockItem));
      state = cartReducer(state, addItem(mockItem));
      state = cartReducer(state, addItem(mockItem));
      expect(state.items[0].quantity).toBe(3);

      state = cartReducer(state, clearItem("item-1"));
      expect(state.items).toHaveLength(0);
    });

    it("should keep other items when clearing one", () => {
      const item2 = { ...mockItem, id: "item-2", name: "Fries" };
      let state = cartReducer(initialState, addItem(mockItem));
      state = cartReducer(state, addItem(item2));
      state = cartReducer(state, clearItem("item-1"));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe("item-2");
    });
  });

  describe("clearCart", () => {
    it("should reset cart to initial state", () => {
      let state = cartReducer(initialState, addItem(mockItem));
      state = cartReducer(state, addItem({ ...mockItem, id: "item-2" }));
      state = cartReducer(state, clearCart());
      expect(state).toEqual(initialState);
    });
  });
});
