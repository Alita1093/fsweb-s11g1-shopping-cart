import React from "react";
import { NavLink } from "react-router-dom";
import { ScNav } from "./scParts";
import { useContext } from "react";
import { CartObject } from "../context/CartContext";

const Navigation = () => {
  const { cart } = useContext(CartObject);
  return (
    <ScNav>
      <nav className="content">
        <NavLink to="/">Products</NavLink>
        <NavLink to="/cart">
          Cart <span>{cart.length}</span>
        </NavLink>
      </nav>
    </ScNav>
  );
};

export default Navigation;
