import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import M from "materialize-css";
import API from "../../utils/API";
import { useAuth0 } from "../../react-auth0-spa";
import "./style.css";

const Navbar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [, setUserInfo] = useState({});
  const [isNew, setNew] = useState(false);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  const getUserProfile = () => {
    API.getBasicUserByEmail(user.email).then(res => {
      setUserInfo(res.data);
      if (res.data.username === undefined) {
        setNew(true);
      }
    });
  };

  useEffect(() => {
    M.AutoInit();
    if (user) {
      getUserProfile(user.email);
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
                  <span className="goal">Goal</span>
                  <span className="den">Den</span>
                </NavLink>
                <NavLink
                  to="#"
                  data-target="mobile"
                  className="sidenav-trigger"
                >
                  <i className="material-icons">menu</i>
                </NavLink>
                <ul className="right hide-on-med-and-down">
                  {!isNew ? (
                    <>
                      <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                      </li>
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
          <ul className="sidenav" id="mobile">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/buddies">Buddies</Link>
            </li>
            <li>
              <Link to="/goals">Goals</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
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
                <Link
                  to="#"
                  className="logoutMobile"
                  onClick={() => logoutWithRedirect()}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default Navbar;
