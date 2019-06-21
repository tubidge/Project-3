import React, { Component } from "react";

class Secret extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && (
          <h4>You have access because you're logged in!</h4>
        )}
        {!isAuthenticated() && (
          <h4>
            You are not logged in, so you don't have access! Please{" "}
            <a style={{ cursor: "pointer" }} onClick={this.login.bind(this)}>
              Log In
            </a>{" "}
            to continue.
          </h4>
        )}
      </div>
    );
  }
}

export default Secret;
