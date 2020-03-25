import React from "react";
import Navbar from "./Components/NavBar";
import ProfilePage from "./Boundary/ProfilePage";
import HomePage from "./Boundary/HomePage";
import "./App.css";
// import {CSSTransition, TransitionGroup} from "react-transition-group";

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import LoginPage from "./Boundary/LoginPage";
import CriteriaMatching from "./Boundary/CriteriaMatching"

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            loggedInStatus: sessionStorage.getItem("loggedInStatus"),
            uid: sessionStorage.getItem("uid")
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            uid: ""
        });
        sessionStorage.setItem("loggedInStatus", "NOT_LOGGED_IN")
        sessionStorage.setItem("uid", null)
    }

    handleLogin(id) {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            uid: id
        });
        sessionStorage.setItem("loggedInStatus", "LOGGED_IN")
        sessionStorage.setItem("uid", id)
    }

    render() {
        const loginStatus = this.state.loggedInStatus
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path={"/"} exact component={HomePage}/>
                        <Route exact path="/login"
                               render={props => (
                                   <LoginPage
                                       {...props}
                                       handleLogin={this.handleLogin}
                                       handleLogout={this.handleLogout}
                                       loggedInStatus={loginStatus}
                                   />
                               )}/>
                        <Route path={loginStatus ? "/profile" : "/login"}
                               exact component={ProfilePage}/>
                        <Route path={loginStatus ? "/criteria" : "/login"}
                               exact component={CriteriaMatching}/>
                        <Redirect from="/*" to="/login"/>
                    </Switch>
                </div>
            </Router>
        );
    }

}

export default App;
