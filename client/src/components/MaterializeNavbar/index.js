import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import M from "materialize-css";
import { useAuth0 } from "../../react-auth0-spa";

const MaterializeNavbar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  useEffect(() => {
    // Update the document title using the browser API
    M.AutoInit();
  });

  return (
    <>
      {isAuthenticated && (
        <>
          {/* Dropdown menu */}
          <ul id="dropdown1" className="dropdown-content">
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="divider" />
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
                <span onClick={() => logoutWithRedirect()}>Logout</span>
              </li>
            )}
          </ul>
          {/* Dropdown menu end */}

          <nav>
            <div className="nav-wrapper">
              <Link to="/dashboard" className="brand-logo">
                GoalDone
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
                  <Link to="/buddies">Buddies</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <a
                    className="dropdown-trigger"
                    href="#!"
                    data-target="dropdown1"
                  >
                    <img
                      style={{ width: 50 }}
                      className="circle"
                      src={user.picture}
                      alt="Profile"
                    />
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* mobile menu */}
          <ul className="sidenav" id="mobile-demo">
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
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
                  style={{ cursor: "pointer" }}
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

export default MaterializeNavbar;
