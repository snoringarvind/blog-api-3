import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Login from "./Components/Login";
import Home from "./Components/Home";
import BlogDetail from "./Components/BlogDetail";
import BlogCreate from "./Components/BlogCreate";
import Navigation from "./Components/Navigation";
import { useEffect, useState } from "react";

function App() {
  const [errors, setErrors] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios_isLogin();
  }, [isAuth]);

  const axios_isLogin = async () => {
    const jwtData = await JSON.parse(localStorage.getItem("jwtData"));
    console.log(jwtData);

    if (jwtData) {
      const headers = { authorization: `Bearer ${jwtData.jwt.token}` };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/blogs/admin-isverified",
          { data: null },
          { headers: headers }
        );
        setIsAuth(true);
        setErrors([]);
        setLoading(false);
        // console.log(isAuth);
      } catch (err) {
        console.log(isAuth);
        setErrors(err.response.data);
        setIsAuth(false);
        console.log();
      }
    } else {
      setIsAuth(false);
    }
  };

  console.log("jdjjsdjsd=", isAuth);

  return (
    <div className="App">
      {isAuth ? (
        <Router>
          <Navigation setIsAuth={setIsAuth} />
          <Switch>
            <Route exact path="/api/blogs" render={() => <Home />} />
            <Route
              extact
              path="/api/blog/:id"
              render={(props) => <BlogDetail props={props} />}
            />
            <Route
              exact
              path="/api/blogs/create"
              render={() => <BlogCreate />}
            />
            {/* <Route
              exact
              path="/api/blogs/logout"
              render={(isAuth) => <Logout isAuth={isAuth} />}
            /> */}
          </Switch>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
