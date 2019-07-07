import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Form from "../../components/Form";
import FormStatic from "../../components/FormStatic";
import API from "../../utils/API";
import { useAuth0 } from "../../react-auth0-spa";
import "./style.css";

const moment = require("moment");

const ProfileView = () => {
  const { loading, user } = useAuth0();
  const [, setIsLoading] = useState(true);
  const [newUser, setNew] = useState(true);
  const [userData, setUserData] = useState({});
  const [accountCreated, setAccountCreated] = useState({});
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    API.getUserByEmail(user.email).then(res => {
      setUserData(res.data);
      setAccountCreated(moment(res.data.created).format("llll"));
      console.log(`Account Created: ${accountCreated}`);
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
    <div className="container profile-container">
      {/* ROW 1 */}
      <div className="row">
        <div className="col s2">
          <div className="row">
            <img
              src={userData.image ? userData.image : user.picture}
              alt="Profile"
              className="circle img-fluid profile-pic"
            />
          </div>
          <div className="row">
            <h4 className="profile-name center-align">Username</h4>
          </div>
        </div>
        <div className="col s8 offset-s1">
          <div className="row top-row">
            <h4>Profile</h4>
          </div>
          <div className="row">
            <h5>User Info</h5>
            <hr />
          </div>
          <form>
            <div className="row">
              <div className="col s6">
                <div className="row">
                  <div className="form-group">
                    <b>Name</b>
                    <div className="row">
                      <div className="col sm-6">
                        <input
                          className="form-control"
                          //   value={username_db}
                          //   onChange={e => setUsername_db(e.target.value)}
                          type="text"
                          name="name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <b>User Since</b>
                  <div className="row">
                    <div className="col sm-6">June 29, 2019</div>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="row">
                  <b>Email</b>
                  <div className="row">
                    <div className="col sm-6">tubidge@gmail.com</div>
                  </div>
                </div>
                <div className="row">
                  <b>Placeholder</b>
                  <div className="row">
                    <div className="col sm-6">Whatever</div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ROW 2 */}
      <div className="row">
        <div className="col s2" />
        <div className="col s8 offset-s1">
          <div className="row">
            <h5>Notification Preferences</h5>
            <hr />
          </div>
          <div className="row">
            <b>Site Notifications</b>
            <div className="row">
              <div className="col s6">
                <span>New Goal Match: On</span>
              </div>
              <div className="col s6">
                <span>Buddy Goal Progress: On</span>
              </div>
            </div>
          </div>
          <div className="row">
            <b>Email Notifications</b>
            <div className="row">
              <div className="col s6">
                <span>New Goal Match: On</span>
              </div>
              <div className="col s6">
                <span>Buddy Goal Progress: On</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
