import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import M from "materialize-css";
import { useAuth0 } from "../../react-auth0-spa";
import "./style.css";

const Navbar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [, setUserInfo] = useState({});

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
          {/* Dropdown menu */}
          <ul id="dropdown1" className="dropdown-content">
            <li className="button-line-border">
              <Link to="/profile" className="dropdown-text">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="dropdown-text">
                Dashboard
              </Link>
            </li>
            {/* <li className="divider" /> */}
            {!isAuthenticated && (
              <li>
                <span
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
                  style={{ cursor: "pointer", color: "#d4ac0d" }}
                  onClick={() => logoutWithRedirect()}
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
          {/* Dropdown menu end */}

          <nav className="nav-color">
            <div className="nav-wrapper">
              <Link to="/dashboard" className="app-title">
                GoalDen
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
                  <Link to="/buddies" className="options">
                    Buddies
                  </Link>
                </li>
                <li>
                  <Link to="/goals" className="options">
                    Goals
                  </Link>
                </li>
                <li>
                  <a
                    className="dropdown-trigger"
                    href="#!"
                    data-target="dropdown1"
                  >
                    {/* <img
                      style={{ width: 50 }}
                      className="circle"
                      src={userInfo.image ? userInfo.image : user.picture}
                      alt="Profile"
                    /> */}
                    <i className="options material-icons right">
                      arrow_drop_down
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* mobile menu */}
          <ul className="sidenav" id="mobile-demo">
            <li>
              <Link to="/profile" className="options">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="options">
                Dashboard
              </Link>
            </li>
            <li className="divider" />
            {!isAuthenticated && (
              <li>
                <span
                  style={{ cursor: "pointer" }}
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
                  style={{ cursor: "pointer", color: "#d4ac0d" }}
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
