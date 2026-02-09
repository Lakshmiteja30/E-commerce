
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

const Navbar = () => {

  const { cartItems } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const q = query.trim();
      if (q.length > 0) {
        navigate(`/search?q=${encodeURIComponent(q)}`);
      } else {
        navigate("/search");
      }
    }
  };

  return (
    <div className="navbar-section">

      <div className="navSection">
        <Link to='/' className="custom-link">
          <div className="title"><h2>E-Mart</h2></div>
        </Link>

        <div className="search">
          <input type="text" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} aria-label="search products" />
        </div>
        <div className="user">
          <Link to="/signin" style={{textDecoration:"none",color:"white"}}>SignIn</Link> / <Link to="/signup" style={{textDecoration:"none",color:"white"}}>SignUp</Link>
        </div>

        <Link to='/cart' style={{textDecoration:"none",color:"white"}}>
          <div className="cart">Cart
            <span>
              {cartItems?.length ?? 0}
            </span>
          </div>
        </Link>
      </div>
      <div className="subMenu">
        <ul>
          <Link to="/mobiles" className="custom-link">
            <li>Mobiles</li>
          </Link>

          <Link to="/computers" className="custom-link">
            <li>Computers</li>
          </Link>

          <Link to="/watch" className="custom-link">
            <li>Watches</li>
          </Link>

          <Link to="/men" className="custom-link">
            <li>Mens Wear</li>
          </Link>

          <Link to="/woman" className="custom-link">
            <li>Woman Wear</li>
          </Link>

          <Link to="/furniture" className="custom-link">
            <li>Furniture</li>
          </Link>

          <Link to="/kitchen" className="custom-link">
            <li>Kitchen</li>
          </Link>

          <Link to="/fridge" className="custom-link">
            <li>Fridge</li>
          </Link>
          <Link to="/ac" className="custom-link">
            <li>AC</li>
          </Link>
        </ul>
      </div>
    </div >
  );
};

export default Navbar;
