import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { ROUTES } from "../utils/constants";

const CartPage = () => {
  const { items, restaurantId, restaurantName, totalItems, totalAmount, removeItem, addItem, clearItem, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="body">
        <div className="cart-page" style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <div style={{ fontSize: "64px", marginBottom: "1rem" }}>🛒</div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#2d3436", marginBottom: "1rem" }}>
            Your cart is empty
          </h2>
          <p style={{ color: "#636e72", marginBottom: "2rem" }}>
            Start adding delicious items to your cart!
          </p>
          <Link
            to={ROUTES.HOME}
            style={{
              display: "inline-block",
              padding: "12px 28px",
              background: "#e63946",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "10px",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(230, 57, 70, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="body cart-page">
      <h2>Cart{restaurantName ? ` · ${restaurantName}` : ""}</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-price">₹{(item.price / 100).toFixed(2)}</span>
            <div className="cart-item-actions">
              <button onClick={() => removeItem(item.id)} aria-label="Decrease">−</button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    defaultPrice: item.price,
                    restaurantId: restaurantId,
                    restaurantName,
                  })
                }
                aria-label="Increase"
              >
                +
              </button>
              <button onClick={() => clearItem(item.id)} className="clear-one">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">
        Total ({totalItems} items): ₹{(totalAmount / 100).toFixed(2)}
      </p>
      <button className="clear-cart-btn" onClick={clearCart}>
        Clear cart
      </button>
    </div>
  );
};

export default CartPage;
