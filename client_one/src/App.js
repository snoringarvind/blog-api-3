import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import BlogDetail from "./Components/BlogDetail";
import BlogCreate from "./Components/BlogCreate";
import Navigation from "./Components/Navigation";
import Login from "./Components/Login";
import BlogUpdate from "./Components/BlogUpdate";
import { UpdateCreateProvider } from "./Components/UpdateCreateContext";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/api/blogs" render={() => <Home />} />
          {/* <UpdateCreateProvider> */}
          <Route
            exact
            path="/api/blogs/create"
            render={(props) => (
              <BlogCreate
                routeInfo={{
                  url: "http://localhost:3000/api/blogs",
                  method: "POST",
                }}
              />
            )}
          />

          {/* </UpdateCreateProvider> */}
          <Route
            exact
            path="/api/blog/:id/update"
            render={(props) => (
              <BlogUpdate
                routeInfo={{ url: "http://localhost:3000/api/blog/:id/update" }}
                props={props}
              />
            )}
          />
          <Route
            extact
            path="/api/blog/:id"
            render={(props) => <BlogDetail props={props} />}
          />

          <Route exact path="/api/blogs/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
