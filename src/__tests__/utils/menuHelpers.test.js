import { getItemCardsFromMenu } from "../../utils/menuHelpers";

describe("getItemCardsFromMenu", () => {
  it("should return empty array for null/undefined input", () => {
    expect(getItemCardsFromMenu(null)).toEqual([]);
    expect(getItemCardsFromMenu(undefined)).toEqual([]);
  });

  it("should return empty array when cards is missing", () => {
    expect(getItemCardsFromMenu({})).toEqual([]);
    expect(getItemCardsFromMenu({ cards: null })).toEqual([]);
  });

  it("should extract direct itemCards", () => {
    const menuData = {
      cards: [
        {
          card: {
            card: {
              itemCards: [
                { card: { info: { id: "1", name: "Burger" } } },
                { card: { info: { id: "2", name: "Fries" } } },
              ],
            },
          },
        },
      ],
    };
    const result = getItemCardsFromMenu(menuData);
    expect(result).toHaveLength(2);
    expect(result[0].card.info.name).toBe("Burger");
  });

  it("should extract items from groupedCard structure", () => {
    const menuData = {
      cards: [
        {
          card: {
            card: {
              groupedCard: {
                cardGroupMap: {
                  REGULAR: {
                    cards: [
                      {
                        card: {
                          card: {
                            itemCards: [
                              { card: { info: { id: "1", name: "Pizza" } } },
                            ],
                          },
                        },
                      },
                      {
                        card: {
                          card: {
                            itemCards: [
                              { card: { info: { id: "2", name: "Pasta" } } },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      ],
    };
    const result = getItemCardsFromMenu(menuData);
    expect(result).toHaveLength(2);
    expect(result[0].card.info.name).toBe("Pizza");
    expect(result[1].card.info.name).toBe("Pasta");
  });

  it("should combine direct and grouped items", () => {
    const menuData = {
      cards: [
        {
          card: {
            card: {
              itemCards: [{ card: { info: { id: "1", name: "Direct Item" } } }],
            },
          },
        },
        {
          card: {
            card: {
              groupedCard: {
                cardGroupMap: {
                  REGULAR: {
                    cards: [
                      {
                        card: {
                          card: {
                            itemCards: [
                              { card: { info: { id: "2", name: "Grouped Item" } } },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      ],
    };
    const result = getItemCardsFromMenu(menuData);
    expect(result).toHaveLength(2);
  });

  it("should skip cards without itemCards", () => {
    const menuData = {
      cards: [
        { card: { card: { title: "Some info card" } } },
        {
          card: {
            card: {
              itemCards: [{ card: { info: { id: "1", name: "Item" } } }],
            },
          },
        },
      ],
    };
    const result = getItemCardsFromMenu(menuData);
    expect(result).toHaveLength(1);
  });
});
