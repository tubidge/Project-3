import React, { useState } from "react";
import Loading from "../../components/Loading";
import { useAuth0 } from "../../react-auth0-spa";
const moment = require("moment");
const axios = require("axios");

const User = () => {
  const { loading, user } = useAuth0();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [created, setCreated] = useState("");

  if (loading || !user) {
    return <Loading />;
  }

  const getUserByEmail = email => {
    axios.get("/user/email/" + email).then(res => {
      setUsername(res.data.username);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setCreated(moment(res.data.created).format("llll"));
    });
  };

  getUserByEmail(user.email);

  return (
    <div className="container">
      <div>{`Account Creation Date: ${created}`}</div>
      <div>{moment(`"${created}"`, "llll").fromNow()}</div>
      <h1>{`Current User (from auth0): ${user.email}`}</h1>
      <div>
        {/* Check to see if any items are found*/}
        {user !== "" ? (
          <div>
            <h4>{username}</h4>
            <p>{`${firstName} ${lastName} | ${user.email}`}</p>
            <hr />
          </div>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </div>
    </div>
  );
};

export default User;
