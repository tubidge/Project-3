import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <h1>Homepage!</h1>
        {isAuthenticated() && <h4>You are logged in!</h4>}
        {!isAuthenticated() && (
          <h4>
            You are not logged in! Please{" "}
            <Link
              to="#"
              style={{ cursor: "pointer" }}
              onClick={this.login.bind(this)}
            >
              Log In
            </Link>{" "}
            to continue.
          </h4>
        )}
      </div>
    );
  }
}

export default Home;
