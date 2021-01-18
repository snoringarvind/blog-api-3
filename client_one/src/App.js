import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import BlogDetail from "./Components/BlogDetail";
import BlogCreate from "./Components/BlogCreate";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/api/blogs" render={() => <Home />} />
          <Route
            extact
            path="/api/blog/:id"
            render={(props) => <BlogDetail props={props} />}
          />
          <Route exact path="/api/blogs/create" render={() => <BlogCreate />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
