import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, price, defaultPrice, restaurantId, restaurantName } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id,
          name,
          price: price ?? defaultPrice,
          quantity: 1,
        });
      }
      state.restaurantId = restaurantId;
      state.restaurantName = restaurantName;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const idx = state.items.findIndex((i) => i.id === id);
      if (idx === -1) return;
      if (state.items[idx].quantity === 1) {
        state.items.splice(idx, 1);
      } else {
        state.items[idx].quantity -= 1;
      }
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }
    },
    clearItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }
    },
    clearCart: () => initialState,
  },
});

export const { addItem, removeItem, clearItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
