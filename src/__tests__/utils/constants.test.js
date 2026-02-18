import { CDN_URL, API_BASE, DEFAULT_LAT, DEFAULT_LNG, ROUTES } from "../../utils/constants";

describe("constants", () => {
  it("should have a CDN_URL", () => {
    expect(CDN_URL).toBeDefined();
    expect(CDN_URL).toContain("https://");
  });

  it("should have an API_BASE", () => {
    expect(API_BASE).toBeDefined();
    expect(API_BASE).toContain("https://");
  });

  it("should have valid latitude and longitude", () => {
    expect(parseFloat(DEFAULT_LAT)).not.toBeNaN();
    expect(parseFloat(DEFAULT_LNG)).not.toBeNaN();
  });

  it("should have all required routes", () => {
    expect(ROUTES.HOME).toBe("/");
    expect(ROUTES.RESTAURANT).toContain(":id");
    expect(ROUTES.CART).toBe("/cart");
    expect(ROUTES.ABOUT).toBe("/about");
    expect(ROUTES.CONTACT).toBe("/contact");
    expect(ROUTES.RESTAURANT_BASE).toBe("/restaurant");
  });
});
