// Fallback menu when API is unavailable (e.g. CORS). One category, a few items.
export const mockMenuCards = [
  {
    card: {
      card: {
        "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
        title: "Recommended",
        itemCards: [
          {
            card: {
              info: {
                id: "mock-1",
                name: "Veg Burger",
                price: 12900,
                defaultPrice: 12900,
                imageId: "irnwr59vlrmciau11or0",
              },
            },
          },
          {
            card: {
              info: {
                id: "mock-2",
                name: "French Fries",
                price: 9900,
                defaultPrice: 9900,
              },
            },
          },
          {
            card: {
              info: {
                id: "mock-3",
                name: "Cold Coffee",
                price: 14900,
                defaultPrice: 14900,
              },
            },
          },
        ],
      },
    },
  },
];
