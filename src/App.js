import React from "react";
import Navbar from "./Components/navbar";
import ProfilePage from "./Boundary/ProfilePage";
import HomePage from "./HomePage";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact componet={HomePage} />
          <ProfilePage path="/profile" exact componet={ProfilePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
