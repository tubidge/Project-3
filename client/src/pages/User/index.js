import React, { Component } from "react";
const axios = require("axios");

class User extends Component {
  state = {
    users: [],
    firstName: "",
    lastName: "",
    email: ""
  };

  // Fetch the list on first mount
  componentDidMount() {
    this.getUsers();
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    this.setState({ email: this.props.auth.getProfile().email });
  };

  getUsers = () => {
    axios
      .get("/all/users")
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { users } = this.state;

    return (
      <div className="container">
        <h1>Current User (from auth0): {`${this.state.email}`}</h1>
        <div>
          <h1>List of All Users (from database)</h1>
          {/* Check to see if any items are found*/}
          {users.length ? (
            <div>
              {/* {users.map(user => (
                <div key={user.id}>
                  <h5>{user.id}</h5>
                  <p>{user.firstName + user.lastName + " | " + user.email}</p>
                  {user.Goals.map(goal => (
                    <div key={goal.id}>
                      <h4>{goal.category}</h4>
                      <h5>{goal.name}</h5>
                      <br />
                    </div>
                  ))}
                  <hr />
                </div>
              ))} */}
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
      </div>
    );
  }
}

export default User;
