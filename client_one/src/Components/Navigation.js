import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ setIsAuth }) => {
  const delete_token = () => {
    localStorage.clear();
    setIsAuth(false);
  };
  return (
    <div className="Nav">
      <Link className="nav-links" to="/api/blogs">
        Home
      </Link>
      <Link className="nav-links" to="/api/blogs/create">
        Create Blog
      </Link>
      {/* <Link className='nav-links' to='/api/Login'>Login</Link> */}
      <div className="nav-links logout" to="/api/logout" onClick={delete_token}>
        Logout
      </div>
    </div>
  );
};

export default Navigation;
