import React, { useState } from "react";
import Loading from "../../components/Loading";
import Form from "../../components/Form";
import { useAuth0 } from "../../react-auth0-spa";
const axios = require("axios");

const Profile = () => {
  const { loading, user } = useAuth0();
  const [userFromDb, setUserFromDb] = useState();
  console.log(user);

  const getUserByEmail = email => {
    axios.get("/user/email/" + email).then(res => {
      setUserFromDb(res.data.username);
    });
  };

  getUserByEmail(user.email);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="container mb-5">
      <div className="row align-items-center profile-header">
        <div className="col-md-2">
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture"
          />
        </div>
        <div className="col-md-6">
          <h2>Complete Your Profile</h2>
          <p className="lead text-muted">{user.email}</p>
        </div>
      </div>

      {userFromDb ? (
        <div>
          Already completed!
          <br />
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      ) : (
        <Form
          fistName={user.given_name}
          lastName={user.family_name}
          email={user.email}
        />
      )}
    </div>
  );
};

export default Profile;
