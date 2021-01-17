import React from "react";

const Logout = ({ isAuth }) => {
  const delete_token = () => {
    localStorage.clear();
  };
  return <div className="Logout"></div>;
};
