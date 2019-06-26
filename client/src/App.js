import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/home" className="navbar-brand">
          GoalDone
        </Link>
        <ul className="navbar-nav ml-auto">
          {!isAuthenticated() && (
            <li className="nav-link" style={{ cursor: "pointer" }}>
              <span onClick={this.login.bind(this)}>Login</span>
            </li>
          )}
          {isAuthenticated() && (
            <li className="nav-link" style={{ cursor: "pointer" }}>
              <span onClick={this.login.bind(this)}>Logout</span>
            </li>
          )}
          <li
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={this.goTo.bind(this, "profile")}
          >
            Profile
          </li>
          <li
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={this.goTo.bind(this, "users")}
          >
            Users
          </li>
        </ul>
      </nav>
    );
  }
}

export default App;
