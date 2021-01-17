import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="Nav">
      <Link className="nav-links" to="/api/blogs">
        Home
      </Link>
      <Link className="nav-links" to="/api/create">
        Create Blog
      </Link>
      {/* <Link className='nav-links' to='/api/Login'>Login</Link> */}
      <Link className="nav-links" to="/api/logout">
        Logout
      </Link>
    </div>
  );
};

export default Nav;
