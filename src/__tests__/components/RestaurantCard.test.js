import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RestaurantCard from "../../components/RestaurantCard";

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

const mockData = {
  info: {
    id: "123",
    name: "Test Restaurant",
    cuisines: ["Indian", "Chinese"],
    avgRating: "4.2",
    costForTwo: 40000,
    cloudinaryImageId: "abc123",
    imageUrl: "https://example.com/image.jpg",
  },
};

describe("RestaurantCard", () => {
  it("should render restaurant name", () => {
    renderWithRouter(<RestaurantCard resData={mockData} />);
    expect(screen.getByText("Test Restaurant")).toBeInTheDocument();
  });

  it("should render cuisines as comma separated string", () => {
    renderWithRouter(<RestaurantCard resData={mockData} />);
    expect(screen.getByText("Indian, Chinese")).toBeInTheDocument();
  });

  it("should render rating", () => {
    renderWithRouter(<RestaurantCard resData={mockData} />);
    expect(screen.getByText("Rating: 4.2")).toBeInTheDocument();
  });

  it("should render cost for two", () => {
    renderWithRouter(<RestaurantCard resData={mockData} />);
    expect(screen.getByText("Cost for two: ₹400")).toBeInTheDocument();
  });

  it("should render image with imageUrl when available", () => {
    renderWithRouter(<RestaurantCard resData={mockData} />);
    const img = screen.getByAltText("Test Restaurant");
    expect(img).toBeInTheDocument();
    expect(img.src).toBe("https://example.com/image.jpg");
  });

  it("should fallback to CDN when imageUrl is missing", () => {
    const data = {
      info: { ...mockData.info, imageUrl: undefined },
    };
    renderWithRouter(<RestaurantCard resData={data} />);
    const img = screen.getByAltText("Test Restaurant");
    expect(img.src).toContain("swiggy");
    expect(img.src).toContain("abc123");
  });

  it("should link to restaurant detail page", () => {
    renderWithRouter(<RestaurantCard resData={mockData} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/restaurant/123");
  });

  it("should return null for missing info", () => {
    const { container } = renderWithRouter(<RestaurantCard resData={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it("should return null for null resData", () => {
    const { container } = renderWithRouter(<RestaurantCard resData={null} />);
    expect(container.firstChild).toBeNull();
  });
});
