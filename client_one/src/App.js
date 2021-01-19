import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import BlogDetail from "./Components/BlogDetail";
import BlogCreate from "./Components/BlogCreate";
import Navigation from "./Components/Navigation";
import Login from "./Components/Login";
import BlogUpdate from "./Components/BlogUpdate";
import { UpdateCreateProvider } from "./Components/UpdateCreateContext";
import BlogDelete from "./Components/BlogDelete";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/api/blogs" render={() => <Home />} />

          <Route exact path="/api/blogs/login" render={() => <Login />} />

          <UpdateCreateProvider>
            <Route
              exact
              path="/api/blogs/create"
              render={(props) => <BlogCreate props={props} />}
            />

            <Route
              exact
              path="/api/blog/:id"
              render={(props) => <BlogDetail props={props} />}
            />

            <Route
              exact
              path="/api/blog/:id/update"
              render={(props) => <BlogUpdate props={props} />}
            />

            <Route
              exact
              path="/api/blog/:id/delete"
              render={(props) => <BlogDelete props={props} />}
            />
          </UpdateCreateProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
