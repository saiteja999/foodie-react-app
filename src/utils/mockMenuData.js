function item(id, name, price, description, isVeg = false) {
  return {
    card: {
      info: {
        id,
        name,
        price,
        defaultPrice: price,
        description,
        isVeg: isVeg ? 1 : 0,
      },
    },
  };
}

function category(title, items) {
  return {
    card: {
      card: {
        "@type":
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
        title,
        itemCards: items,
      },
    },
  };
}

const restaurantMenus = {
  // KFC
  "334475": [
    category("Chicken Buckets", [
      item("kfc-1", "Hot & Crispy Chicken Bucket (8 pcs)", 64900, "8 pieces of signature hot and crispy fried chicken"),
      item("kfc-2", "Popcorn Chicken (Large)", 24900, "Bite-sized crispy chicken pieces with seasoning"),
      item("kfc-3", "Chicken Wings (6 pcs)", 34900, "Smoky grilled wings tossed in peri peri sauce"),
    ]),
    category("Burgers & Wraps", [
      item("kfc-4", "Zinger Burger", 21900, "Crispy chicken fillet with spicy mayo and lettuce"),
      item("kfc-5", "Classic Chicken Burger", 14900, "Chicken patty with creamy sauce in a toasted bun"),
      item("kfc-6", "Chicken Twister Wrap", 18900, "Tortilla wrap with crispy chicken strip, veggies and pepper mayo"),
    ]),
    category("Sides & Beverages", [
      item("kfc-7", "French Fries (Large)", 13900, "Crispy golden french fries with seasoning"),
      item("kfc-8", "Coleslaw", 8900, "Fresh cabbage slaw with creamy dressing"),
      item("kfc-9", "Pepsi (475ml)", 6900, "Chilled Pepsi"),
    ]),
  ],

  // Meghana Foods
  "229": [
    category("Biryani", [
      item("meg-1", "Hyderabadi Chicken Dum Biryani", 32900, "Slow-cooked aromatic basmati rice layered with tender chicken, served with raita and salan"),
      item("meg-2", "Mutton Biryani", 38900, "Fragrant biryani with succulent mutton pieces and whole spices"),
      item("meg-3", "Veg Dum Biryani", 24900, "Mixed vegetables cooked in dum style with biryani masala", true),
    ]),
    category("Andhra Meals", [
      item("meg-4", "Andhra Chicken Meal", 28900, "Rice, chicken curry, dal, rasam, curd, pickle and papad"),
      item("meg-5", "Andhra Veg Thali", 21900, "Rice, sambar, rasam, curd, 2 vegetable curries, pickle, papad and sweet", true),
    ]),
    category("Starters", [
      item("meg-6", "Chicken 65", 26900, "Deep fried spicy chicken bites — Andhra style"),
      item("meg-7", "Paneer 65", 23900, "Crispy paneer cubes in spicy masala", true),
      item("meg-8", "Apollo Fish", 29900, "Boneless fish pieces in a fiery red chilli batter"),
    ]),
  ],

  // Kannur Food Point
  "121603": [
    category("Kerala Specials", [
      item("knr-1", "Kerala Chicken Curry & Parotta (2 pcs)", 18900, "Authentic coconut-based chicken curry with flaky Kerala parotta"),
      item("knr-2", "Fish Curry Meals", 22900, "Rice with Kerala fish curry, thoran, and papadum"),
      item("knr-3", "Egg Roast & Parotta (2 pcs)", 14900, "Spicy egg roast in onion-tomato masala with parotta"),
    ]),
    category("Snacks", [
      item("knr-4", "Banana Chips", 8900, "Crispy thin-sliced banana chips fried in coconut oil", true),
      item("knr-5", "Chicken Cutlet (4 pcs)", 13900, "Crispy bread-crumbed chicken cutlets"),
      item("knr-6", "Parippu Vada (4 pcs)", 9900, "Crunchy dal fritters with curry leaves", true),
    ]),
    category("Beverages", [
      item("knr-7", "Sulaimani Tea", 4900, "Light black tea with lemon and spices", true),
      item("knr-8", "Mango Lassi", 7900, "Thick mango yogurt shake", true),
    ]),
  ],

  // Subway
  "500001": [
    category("Signature Subs", [
      item("sub-1", "Chicken Teriyaki Sub (6 inch)", 28900, "Teriyaki-glazed chicken strips with veggies on fresh bread"),
      item("sub-2", "Italian BMT Sub (6 inch)", 31900, "Pepperoni, salami and ham loaded with veggies"),
      item("sub-3", "Veggie Delite Sub (6 inch)", 18900, "Crisp lettuce, tomato, onion, capsicum, olives and pickles", true),
      item("sub-4", "Tuna Sub (6 inch)", 29900, "Flaked tuna with creamy mayo and fresh veggies"),
    ]),
    category("Wraps", [
      item("sub-5", "Chicken Tikka Wrap", 24900, "Tandoori chicken tikka in a soft tortilla with mint mayo"),
      item("sub-6", "Paneer Tikka Wrap", 21900, "Grilled paneer with tikka sauce in a soft wrap", true),
    ]),
    category("Salads & Sides", [
      item("sub-7", "Chicken Teriyaki Salad", 26900, "Teriyaki chicken on a bed of fresh greens"),
      item("sub-8", "Veggie Patty Salad", 19900, "Veggie patty crumbles over mixed greens with dressing", true),
      item("sub-9", "Cookie (Chocolate Chip)", 5900, "Freshly baked chocolate chip cookie"),
    ]),
  ],

  // Domino's Pizza
  "500002": [
    category("Pizzas — Veg", [
      item("dom-1", "Margherita (Medium)", 19900, "Classic pizza with mozzarella cheese and tomato sauce", true),
      item("dom-2", "Farmhouse (Medium)", 31900, "Capsicum, onion, tomato and mushroom on cheesy base", true),
      item("dom-3", "Peppy Paneer (Medium)", 34900, "Spicy paneer with capsicum and red paprika", true),
    ]),
    category("Pizzas — Non-Veg", [
      item("dom-4", "Chicken Dominator (Medium)", 39900, "Double pepper BBQ chicken, peri peri chicken, chicken tikka & sausage"),
      item("dom-5", "Pepper BBQ Chicken (Medium)", 34900, "BBQ chicken with capsicum and red paprika"),
      item("dom-6", "Non-Veg Supreme (Medium)", 42900, "Pepperoni, BBQ chicken, chicken sausage & fresh veggies"),
    ]),
    category("Sides & Desserts", [
      item("dom-7", "Garlic Breadsticks (8 pcs)", 12900, "Freshly baked with garlic herb butter", true),
      item("dom-8", "Chicken Wings (8 pcs)", 22900, "Peri peri spiced chicken wings"),
      item("dom-9", "Choco Lava Cake", 10900, "Warm chocolate cake with molten center", true),
    ]),
  ],

  // Pizza Hut
  "500003": [
    category("Signature Pizzas", [
      item("ph-1", "Tandoori Paneer Pizza (Medium)", 42900, "Paneer tikka, onion, capsicum with tandoori sauce", true),
      item("ph-2", "Chicken Supreme Pizza (Medium)", 47900, "Herbed chicken, capsicum, onion, olives and jalapenos"),
      item("ph-3", "Meat Feast Pizza (Medium)", 52900, "Chicken tikka, chicken sausage, pepperoni and ham"),
    ]),
    category("Pasta & Sides", [
      item("ph-4", "Creamy Tomato Pasta", 23900, "Penne in rich tomato cream sauce with herbs", true),
      item("ph-5", "Stuffed Garlic Bread (4 pcs)", 17900, "Bread stuffed with corn, cheese and jalapenos", true),
      item("ph-6", "Spicy Chicken Wings (6 pcs)", 24900, "Fried wings tossed in hot sauce"),
    ]),
    category("Beverages & Desserts", [
      item("ph-7", "Pepsi (500ml)", 7900, "Chilled Pepsi"),
      item("ph-8", "Chocolate Mousse", 12900, "Rich dark chocolate mousse with whipped cream", true),
    ]),
  ],

  // McDonald's
  "500004": [
    category("Burgers", [
      item("mcd-1", "McChicken Burger", 15900, "Crispy chicken patty with shredded lettuce and mayo"),
      item("mcd-2", "McSpicy Chicken Burger", 19900, "Spicy crispy chicken with lettuce, creamy sauce in a sesame bun"),
      item("mcd-3", "McAloo Tikki Burger", 6900, "Potato tikki patty with tomato mayo and onion", true),
      item("mcd-4", "Big Mac", 24900, "Two chicken patties, special sauce, lettuce, cheese, pickles on a sesame bun"),
    ]),
    category("Combos", [
      item("mcd-5", "McSpicy Combo (Burger + Fries + Coke)", 29900, "McSpicy burger with medium fries and medium Coke"),
      item("mcd-6", "McChicken Combo (Burger + Fries + Coke)", 24900, "McChicken burger with medium fries and medium Coke"),
    ]),
    category("Sides & Desserts", [
      item("mcd-7", "French Fries (Medium)", 11900, "Crispy golden french fries with salt"),
      item("mcd-8", "Chicken McNuggets (6 pcs)", 16900, "Tender breaded chicken pieces with dipping sauce"),
      item("mcd-9", "McFlurry Oreo", 14900, "Soft serve ice cream blended with Oreo cookie crumbles", true),
    ]),
  ],

  // Burger King
  "500005": [
    category("Whoppers & Burgers", [
      item("bk-1", "Chicken Whopper", 22900, "Flame-grilled chicken patty with lettuce, tomato, mayo in a sesame bun"),
      item("bk-2", "BK Veggie Burger", 12900, "Crispy veggie patty with lettuce, tomato and creamy sauce", true),
      item("bk-3", "Crispy Chicken Burger", 14900, "Crunchy breaded chicken with lettuce and mayo"),
      item("bk-4", "Double Patty Whopper", 29900, "Two flame-grilled chicken patties stacked with fresh veggies"),
    ]),
    category("Sides", [
      item("bk-5", "Peri Peri Fries", 13900, "Fries tossed in fiery peri peri seasoning"),
      item("bk-6", "Onion Rings (8 pcs)", 11900, "Crispy battered onion rings", true),
      item("bk-7", "Chicken Nuggets King (6 pcs)", 14900, "Juicy bite-sized chicken nuggets"),
    ]),
    category("Beverages", [
      item("bk-8", "Thick Chocolate Shake", 16900, "Creamy chocolate milkshake"),
      item("bk-9", "Pepsi (500ml)", 7900, "Chilled Pepsi"),
    ]),
  ],

  // Taco Bell
  "500006": [
    category("Tacos", [
      item("tb-1", "Crunchy Taco — Chicken", 12900, "Seasoned chicken in a crispy corn shell with lettuce, cheese and salsa"),
      item("tb-2", "Crunchy Taco Supreme — Veg", 10900, "Refried beans, lettuce, tomato, cheese, sour cream in a crunchy shell", true),
      item("tb-3", "Chalupa Supreme — Chicken", 17900, "Deep-fried flatbread with chicken, tomato, cheese and creamy sauce"),
    ]),
    category("Burritos & Quesadillas", [
      item("tb-4", "7-Layer Burrito", 18900, "Rice, beans, cheese, sour cream, lettuce, tomato, guacamole in a large tortilla", true),
      item("tb-5", "Chicken Quesadilla", 19900, "Grilled tortilla stuffed with chicken, melted cheese and creamy jalapeno sauce"),
      item("tb-6", "Crunchwrap Supreme", 22900, "Seasoned chicken, cheese, lettuce, tomato, sour cream wrapped in a grilled tortilla"),
    ]),
    category("Sides & Drinks", [
      item("tb-7", "Nachos Supreme", 14900, "Crispy tortilla chips with cheese, beans, jalapenos and salsa", true),
      item("tb-8", "Mexican Rice", 9900, "Flavoured rice with beans and spices", true),
      item("tb-9", "Mountain Dew (475ml)", 6900, "Chilled Mountain Dew"),
    ]),
  ],

  // Barbeque Nation
  "500007": [
    category("Live Grill Starters", [
      item("bbn-1", "Cajun Spiced Chicken", 34900, "Tender chicken marinated in cajun spices, grilled on the table"),
      item("bbn-2", "Mutton Seekh Kebab", 39900, "Minced mutton kebabs with aromatic spices, char-grilled"),
      item("bbn-3", "Paneer Tikka", 27900, "Cottage cheese cubes marinated in tandoori spice, grilled to perfection", true),
      item("bbn-4", "Fish Tikka", 36900, "Boneless fish pieces in a spiced yogurt marinade"),
    ]),
    category("Main Course", [
      item("bbn-5", "Butter Chicken", 32900, "Tender chicken in rich tomato-butter gravy"),
      item("bbn-6", "Dal Makhani", 22900, "Slow-cooked black lentils in creamy butter sauce", true),
      item("bbn-7", "Biryani (Chicken)", 28900, "Fragrant long-grain rice layered with spiced chicken"),
      item("bbn-8", "Naan Basket (4 pcs)", 14900, "Assorted naans — butter, garlic, plain, tandoori roti"),
    ]),
    category("Desserts", [
      item("bbn-9", "Gulab Jamun (2 pcs)", 12900, "Soft milk-solid dumplings soaked in rose-cardamom syrup", true),
      item("bbn-10", "Kulfi Falooda", 15900, "Traditional Indian ice cream with vermicelli and rose syrup", true),
    ]),
  ],

  // Starbucks Coffee
  "500008": [
    category("Coffee", [
      item("sb-1", "Caffe Latte (Tall)", 28900, "Espresso with steamed milk and light foam", true),
      item("sb-2", "Cappuccino (Tall)", 27900, "Espresso with steamed milk and thick foam", true),
      item("sb-3", "Caramel Frappuccino (Tall)", 34900, "Blended coffee with caramel syrup, milk, ice and whipped cream", true),
      item("sb-4", "Java Chip Frappuccino (Tall)", 36900, "Mocha sauce, Frappuccino chips blended with coffee, milk and ice", true),
    ]),
    category("Iced Beverages", [
      item("sb-5", "Iced Americano (Tall)", 25900, "Espresso shots with cold water and ice", true),
      item("sb-6", "Mango Dragonfruit Refresher", 29900, "Sweet mango and dragonfruit flavors with real fruit and ice", true),
    ]),
    category("Food", [
      item("sb-7", "Chocolate Croissant", 22900, "Buttery croissant filled with rich chocolate", true),
      item("sb-8", "Chicken Pesto Sandwich", 31900, "Grilled chicken with pesto, mozzarella, roasted peppers on ciabatta"),
      item("sb-9", "Blueberry Muffin", 19900, "Moist muffin loaded with blueberries", true),
    ]),
  ],

  // Haldiram's
  "500009": [
    category("Chaat & Street Food", [
      item("hld-1", "Pani Puri (6 pcs)", 9900, "Crispy puris with spiced potato filling, sweet and spicy water", true),
      item("hld-2", "Raj Kachori", 14900, "Large crispy kachori filled with curd, chutneys and sev", true),
      item("hld-3", "Aloo Tikki Chaat", 12900, "Crispy potato patties topped with curd, chutney and spices", true),
    ]),
    category("Main Course", [
      item("hld-4", "Chole Bhature (2 pcs)", 18900, "Spiced chickpea curry with fluffy deep-fried bread", true),
      item("hld-5", "Paneer Butter Masala with Naan", 24900, "Rich paneer curry in tomato-butter gravy served with naan", true),
      item("hld-6", "South Indian Thali", 21900, "Rice, sambar, rasam, curd, 2 sabzis, papad and dessert", true),
    ]),
    category("Sweets & Desserts", [
      item("hld-7", "Rasgulla (2 pcs)", 8900, "Spongy cottage cheese balls in sugar syrup", true),
      item("hld-8", "Kaju Katli (250g)", 32900, "Premium cashew fudge with silver leaf", true),
      item("hld-9", "Gulab Jamun (4 pcs)", 11900, "Soft fried dumplings in warm rose syrup", true),
    ]),
  ],
};

export function getMockMenuForRestaurant(restaurantId) {
  return restaurantMenus[restaurantId] || restaurantMenus["334475"];
}

export const mockMenuCards = restaurantMenus["334475"];
