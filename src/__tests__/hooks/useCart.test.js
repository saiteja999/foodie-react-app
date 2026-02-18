import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../store/slices/cartSlice";
import { useCart } from "../../hooks/useCart";

function createWrapper() {
  const store = configureStore({ reducer: { cart: cartReducer } });
  return ({ children }) => <Provider store={store}>{children}</Provider>;
}

const mockItem = {
  id: "item-1",
  name: "Burger",
  price: 15000,
  defaultPrice: 15000,
  restaurantId: "r1",
  restaurantName: "Test Place",
};

describe("useCart", () => {
  it("should start with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalAmount).toBe(0);
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });
    act(() => result.current.addItem(mockItem));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalAmount).toBe(15000);
  });

  it("should increment quantity on duplicate add", () => {
    const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });
    act(() => result.current.addItem(mockItem));
    act(() => result.current.addItem(mockItem));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalAmount).toBe(30000);
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });
    act(() => result.current.addItem(mockItem));
    act(() => result.current.addItem(mockItem));
    act(() => result.current.removeItem("item-1"));
    expect(result.current.totalItems).toBe(1);
  });

  it("should clear a specific item", () => {
    const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });
    act(() => result.current.addItem(mockItem));
    act(() => result.current.addItem(mockItem));
    act(() => result.current.clearItem("item-1"));
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("should clear entire cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });
    act(() => result.current.addItem(mockItem));
    act(() => result.current.addItem({ ...mockItem, id: "item-2", name: "Fries", price: 9900 }));
    act(() => result.current.clearCart());
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalAmount).toBe(0);
    expect(result.current.restaurantId).toBeNull();
  });

  it("should track restaurant info", () => {
    const { result } = renderHook(() => useCart(), { wrapper: createWrapper() });
    act(() => result.current.addItem(mockItem));
    expect(result.current.restaurantId).toBe("r1");
    expect(result.current.restaurantName).toBe("Test Place");
  });
});
