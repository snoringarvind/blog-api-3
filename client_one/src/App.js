import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
