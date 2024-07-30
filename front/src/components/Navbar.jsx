
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCart } from '../features/cartSlice'; // Adjust the import path as needed

const NavBar = () => {
  const cart = useSelector(selectCart);

  return (
    <div className="nav-bar">
     <Link to="/" className="nav-heading">
        <h2>E-Commerce Store</h2>
      </Link>
      <div className="nav-bag">
        <Link to="/cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
  <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
          <div className="bag-quantity">
            {cart.cartTotalQuantity}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
