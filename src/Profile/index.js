import React, { Component } from "react";

class Profile extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && (
          <div>
            <h4>Hello {this.props.auth.user.firstName}!</h4>
            <h4>Hello {this.props.newProp}!</h4>
          </div>
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

export default Profile;
