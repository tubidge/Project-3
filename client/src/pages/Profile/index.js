import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Form from "../../components/Form";
import FormStatic from "../../components/FormStatic";
import { useAuth0 } from "../../react-auth0-spa";

const axios = require("axios");

const Profile = () => {
  const { loading, user } = useAuth0();
  const [username_db, setUsername_db] = useState("");
  const [firstName_db, setFirstName_db] = useState("");
  const [lastName_db, setLastName_db] = useState("");
  const [newUser, setNew] = useState(true);

  useEffect(() => {
    axios.get("/user/email/" + user.email).then(res => {
      setUsername_db(res.data.username);
      setFirstName_db(res.data.firstName);
      setLastName_db(res.data.lastName);
      console.log(res.data.created);
      if (res.data.created !== undefined) {
        setNew(false);
      }
    });
  }, []);

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

      {newUser ? (
        <Form
          fistName={user.given_name}
          lastName={user.family_name}
          email={user.email}
        />
      ) : (
        <FormStatic
          username={username_db}
          firstName={firstName_db}
          lastName={lastName_db}
          email={user.email}
        />
      )}
    </div>
  );
};

export default Profile;
