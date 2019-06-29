import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useAuth0 } from "../../react-auth0-spa";

const moment = require("moment");
const axios = require("axios");

const Dashboard = props => {
  const { loading, user } = useAuth0();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [created, setCreated] = useState("");

  useEffect(() => {
    axios.get("/user/email/" + user.email).then(res => {
      setUsername(res.data.username);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setCreated(moment(res.data.created).format("llll"));
      console.log(res.data);
    });
  }, []);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h3>{`Current User (from auth0): ${user.email}`}</h3>
      <div>{`Account created on ${created}`}</div>
      <em>({moment(`"${created}"`, "llll").fromNow()})</em>
      <div>
        {/* Check to see if any items are found*/}
        {user !== "" ? (
          <div>
            <h4>Username: {username}</h4>
            <h4>Full Name: {`${firstName} ${lastName}`}</h4>
            <h4>Email: {user.email}</h4>
            <hr />
          </div>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
