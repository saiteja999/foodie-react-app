import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";

describe("Footer", () => {
  it("should render footer text", () => {
    render(<Footer />);
    expect(screen.getByText(/Food Ordering App/)).toBeInTheDocument();
  });

  it("should mention React and Redux", () => {
    render(<Footer />);
    expect(screen.getByText(/React/)).toBeInTheDocument();
    expect(screen.getByText(/Redux/)).toBeInTheDocument();
  });
});
