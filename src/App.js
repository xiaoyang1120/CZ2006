import React from "react";
import Navbar from "./Components/NavBar";
import ProfilePage from "./Boundary/ProfilePage";
import HomePage from "./Boundary/HomePage";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Boundary/LoginPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
