import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../utils/constants";

const Header = () => {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="header">
      <NavLink to={ROUTES.HOME} className="logo-wrap">
        <span className="logo-text">🍔 Foodie</span>
      </NavLink>
      <nav className="nav-items">
        <ul>
          <li>
            <NavLink to={ROUTES.HOME} className={navClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.ABOUT} className={navClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.CONTACT} className={navClass}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.CART} className={navClass}>
              Cart {totalItems > 0 && `(${totalItems})`}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
