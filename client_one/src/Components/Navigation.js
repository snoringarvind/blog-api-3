import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const delete_token = () => {
    localStorage.clear();
  };

  return (
    <div className="Nav">
      <Link className="nav-links" to="/api/blogs">
        Home
      </Link>
      <Link className="nav-links" to="/api/blogs/create">
        Create Blog
      </Link>
      <div className="nav-links logout" to="/api/logout" onClick={delete_token}>
        Logout
      </div>
    </div>
  );
};

export default Navigation;
