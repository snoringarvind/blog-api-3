import React, { createContext, useEffect, useState } from "react";

export const UpdateCreateContext = createContext();

export const UpdateCreateProvider = ({ props }) => {
  const [state, setState] = useState({ title: "", conent: "" });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogCreate, setBlogCreate] = useState("");
  const [isAuth, setIsAuth] = useState(null);
  const [jwtData, setJwtData] = useState("");

  useEffect(() => {
    ifJwtData();
  }, []);

  const ifJwtData = () => {
    const jwtData = JSON.parse(localStorage.getItem("jwtData"));

    if (jwtData) {
      setJwtData(jwtData);
    }
  };

  return (
    <UpdateCreateContext.Provider
      value={{
        stateValue: { state, setState },
        errorsValue: { errors, setErrors },
        loadingValue: { loading, setLoading },
        blogCreateValue: { blogCreate, setBlogCreate },
        isAuthValue: { isAuth, setIsAuth },
        jwtDataValue: { jwtData, setJwtData },
      }}
    >
      {props.children}
    </UpdateCreateContext.Provider>
  );
};
