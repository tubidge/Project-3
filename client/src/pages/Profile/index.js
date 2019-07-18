import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Form from "../../components/Form";
import FormStatic from "../../components/FormStatic";
import API from "../../utils/API";
import { useAuth0 } from "../../react-auth0-spa";
import "./style.css";

const moment = require("moment");

const Profile = () => {
  const { loading, user } = useAuth0();
  const [, setIsLoading] = useState(true);
  const [newUser, setNew] = useState(true);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    API.getUserByEmail(user.email).then(res => {
      setUserData(res.data);
      console.log(
        `Account Created: ${moment(res.data.created).format("llll")}`
      );
      if (res.data.created !== undefined) {
        setNew(false);
      }
      setIsLoading(false);
    });
  };

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="container profileContainer">
      <div className="row container-profile">
        <div className="col s2">
          <div className="row center-align">
            <img
              src={userData.image ? userData.image : user.picture}
              alt="Profile"
              className="profile-pic circle img-fluid profilePic"
            />
          </div>
          <div className="row">
            <h5 className="profileName center-align">{userData.username}</h5>
          </div>
        </div>

        <div className="col s9 offset-s1">
          <div className="row">
            <h4>Profile</h4>
          </div>
          {!newUser ? (
            <FormStatic
              userID={userData.id}
              username={userData.username}
              firstName={userData.firstName}
              lastName={userData.lastName}
              email={user.email}
              getUserProfile={getUserProfile}
            />
          ) : (
            <Form
              fistName={user.given_name}
              lastName={user.family_name}
              email={user.email}
              getUserProfile={getUserProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
