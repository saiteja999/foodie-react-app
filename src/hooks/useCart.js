import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearItem, clearCart } from "../store/slices/cartSlice";

/**
 * Cart state and actions from Redux.
 */
export function useCart() {
  const dispatch = useDispatch();
  const { items, restaurantId, restaurantName } = useSelector((state) => state.cart);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);

  return {
    items,
    restaurantId,
    restaurantName,
    totalItems,
    totalAmount,
    addItem: (payload) => dispatch(addItem(payload)),
    removeItem: (id) => dispatch(removeItem(id)),
    clearItem: (id) => dispatch(clearItem(id)),
    clearCart: () => dispatch(clearCart()),
  };
}
