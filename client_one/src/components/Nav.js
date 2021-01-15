import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="Nav">
      <Link to="/blogs">Home</Link>
      <Link to="/Login">Login</Link>
      <Link to="Signup">Logout</Link>
    </div>
  );
};

export default Nav;
