import React, { Component } from "react";
const axios = require("axios");

class Buddies extends Component {
  state = {
    users: [],
    firstName: "",
    lastName: "",
    email: ""
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get("/all/users").then(res => {
      console.log(res.data);
      this.setState({ users: res.data });
    });
  };

  render() {
    const { users } = this.state;

    return (
      <div className="container">
        <h1 className="text-center">Search for Buddies</h1>
        <div className="row">
          <div className="col-sm-6 mx-auto">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                aria-label="username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Check to see if any items are found*/}
          {users.length ? (
            <div>
              {users.map(user => (
                <div key={user.id}>
                  <h5>{user.id}</h5>
                  <p>{user.firstName + user.lastName + " | " + user.email}</p>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Buddies;
