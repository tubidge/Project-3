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

  useEffect(() => {
    M.AutoInit();
    if (userInfo.username) {
      API.getUserByEmail(user.email).then(resp => {
        setUserInfo(resp.data);
      });
    }
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
                {userInfo.username ? (
                  <span id="welcomeMessage">
                    <span style={{ color: "lightgrey" }}>
                      {" "}
                      Welcome the the Den,
                    </span>{" "}
                    {userInfo.username}
                  </span>
                ) : null}
                <NavLink
                  to="#"
                  data-target="mobile-demo"
                  className="sidenav-trigger"
                >
                  <i className="material-icons">menu</i>
                </NavLink>
                <ul className="right hide-on-med-and-down">
                  <li>
                    <NavLink to="/" activeClassName="active">
                      Dashboard
                    </NavLink>
                  </li>
                  {userInfo ? (
                    <>
                      <li>
                        <NavLink
                          to={{
                            pathname: "/buddies",
                            state: {
                              user: user.email
                            }
                          }}
                        >
                          Find Buddies
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/goals">Goals</NavLink>
                      </li>
                    </>
                  ) : null}
                  <li>
                    {userInfo ? (
                      <NavLink to="/profile">Profile</NavLink>
                    ) : (
                      <Link
                        to="/profile"
                        className="pulse"
                        id="completeProfileAlert"
                      >
                        Complete Profile
                      </Link>
                    )}
                  </li>
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
