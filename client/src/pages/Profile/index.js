import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import Loading from "../../components/Loading";
import Form from "../../components/Form";
import FormStatic from "../../components/FormStatic";
import API from "../../utils/API";
import defaultLionPic from "../../components/Form/lionDefaultProfilePic.jpg";
import "./style.css";

const Profile = () => {
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [newUser, setNew] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    if (user) {
      API.getBasicUserByEmail(user.email).then(res => {
        setUserData(res.data);
        if (res.data.created !== undefined) {
          setNew(false);
        }
        setIsLoading(false);
      });
    }
  };

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <div className="profileContainer z-depth-3">
      <div className="row">
        <div className="col l3 s12 center-align">
          <img
            src={userData.image ? userData.image : defaultLionPic}
            alt="Profile"
            className="circle img-fluid z-depth-3 profilePic"
          />
          <h5>
            <span className="brandedText">{userData.username}</span>
          </h5>
        </div>

        <div className="col l9 s12">
          <div className="row">
            <h3>Profile</h3>
            <hr style={{ width: "92%" }} />
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
