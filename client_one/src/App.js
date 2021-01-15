import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Create from "./components/Create";
import Update from "./components/Update";
import Delete from "./components/Delete";

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Nav />
      <Switch>
        <Route path="/blogs" component={Home} />
        <Route path="/blogs/login" component={Login} />
        <Route path="/blogs/logout" component={Logout} />
        <Route path="/blogs/Create" component={Create} />
        <Route path="/blogs/Update" component={Update} />
        <Route path="/blogs/Delete" component={Delete} />
      </Switch>
    </Router>
  );
}

export default App;
