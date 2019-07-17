import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

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
    if (user) {
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
                <Link to="/dashboard" className="brand-logo">
                  <FontAwesomeIcon icon={faHome} />
                </Link>
                <Link
                  to="#"
                  data-target="mobile-demo"
                  className="sidenav-trigger"
                >
                  <i className="material-icons">menu</i>
                </Link>
                <ul className="right hide-on-med-and-down">
                  <li>
                    {/* <Link to="/buddies">Find Buddies</Link> */}
                    <Link
                      to={{
                        pathname: "/buddies",
                        state: {
                          user: user.email
                        }
                      }}
                    >
                      Find Buddies
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/goals">Goals</Link>
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
              <Link to="/dashboard">Dashboard</Link>
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
