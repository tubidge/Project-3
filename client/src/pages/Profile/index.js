import React, { Component } from "react";
import { Link } from "react-router-dom";

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
            <Link to={"../User"}>Click Here</Link>
          </div>
        )}
        {!isAuthenticated() && (
          <h4>
            You are not logged in, so you don't have access! Please{" "}
            <Link to="#" onClick={this.login.bind(this)}>
              Log In
            </Link>
            to continue.
          </h4>
        )}
      </div>
    );
  }
}

export default Profile;
