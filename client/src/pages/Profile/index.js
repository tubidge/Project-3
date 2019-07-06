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

  // useEffect(() => {
  //   API.getUserByEmail(user.email).then(res => {
  //     setUserData(res.data);
  //     console.log(
  //       `Account Created: ${moment(res.data.created).format("llll")}`
  //     );
  //     if (res.data.created !== undefined) {
  //       setNew(false);
  //     }
  //     setIsLoading(false);
  //   });
  // }, []);

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
    <div className="container mb-5">
      <div className="row align-items-center profile-header">
        <div className="col-md-2">
          <img
            src={userData.image ? userData.image : user.picture}
            alt="Profile"
            className="circle img-fluid profilePicture"
          />
        </div>
        <div className="col-md-4">
          <p className="lead text-muted">{user.email}</p>
        </div>
        <div className="col-lg-6 md-12 sm-12">
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
