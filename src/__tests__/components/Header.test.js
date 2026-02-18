import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../store/slices/cartSlice";
import restaurantReducer from "../../store/slices/restaurantSlice";
import Header from "../../components/Header";

function renderWithProviders(ui, { cartState } = {}) {
  const store = configureStore({
    reducer: { cart: cartReducer, restaurants: restaurantReducer },
    preloadedState: cartState ? { cart: cartState } : undefined,
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

describe("Header", () => {
  it("should render logo text", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/Foodie/)).toBeInTheDocument();
  });

  it("should render all navigation links", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText(/Cart/)).toBeInTheDocument();
  });

  it("should show cart count when items exist", () => {
    const cartState = {
      items: [{ id: "1", name: "Burger", price: 100, quantity: 3 }],
      restaurantId: "r1",
      restaurantName: "Test",
    };
    renderWithProviders(<Header />, { cartState });
    expect(screen.getByText(/Cart/)).toHaveTextContent("Cart (3)");
  });

  it("should not show cart count when cart is empty", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/Cart/)).toHaveTextContent("Cart");
    expect(screen.getByText(/Cart/).textContent.trim()).toBe("Cart");
  });
});
