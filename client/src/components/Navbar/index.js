import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import M from "materialize-css";
import API from "../../utils/API";
import { useAuth0 } from "../../react-auth0-spa";
import "./style.css";

const Navbar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [userInfo, setUserInfo] = useState({});

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  async function getUserData() {
    if (user) {
      API.getUserByEmail(user.email)
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    M.AutoInit();
    getUserData();
  }, []);

  return (
    <>
      {isAuthenticated && (
        <>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo">
                  Goal<span>Den</span>
                </NavLink>
                <span className="welcomeMessage">
                  Welcome, {userInfo.firstName}
                </span>
                <NavLink
                  to="#"
                  data-target="mobile-demo"
                  className="sidenav-trigger"
                >
                  <i className="material-icons">menu</i>
                </NavLink>
                <ul className="right hide-on-med-and-down">
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  {userInfo ? (
                    <>
                      <li>
                        <NavLink to="/buddies">Find Buddies</NavLink>
                      </li>
                      <li>
                        <NavLink to="/goals">Goals</NavLink>
                      </li>
                      <li>
                        <NavLink to="/profile">Profile</NavLink>
                      </li>
                    </>
                  ) : null}
                  {!isAuthenticated && (
                    <li>
                      <span
                        className="btn login"
                        onClick={() =>
                          loginWithRedirect({
                            redirect_uri: window.location.origin
                          })
                        }
                      >
                        Login
                      </span>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li>
                      <button
                        className="btn logout"
                        onClick={() => logoutWithRedirect()}
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>

          {/* mobile menu */}
          <ul className="sidenav" id="mobile-demo">
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/goals">Goals</Link>
            </li>
            <li className="divider" />
            {!isAuthenticated && (
              <li>
                <span
                  className="loginMobile"
                  onClick={() =>
                    loginWithRedirect({
                      redirect_uri: window.location.origin
                    })
                  }
                >
                  Login
                </span>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <span
                  className="logoutMobile"
                  onClick={() => logoutWithRedirect()}
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default Navbar;
