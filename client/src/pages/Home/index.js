import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";

import { NavLink } from "reactstrap";
import { useAuth0 } from "../../react-auth0-spa";
import Dashboard from "../Dashboard";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <>
          <Jumbotron />
          <NavLink
            tag={RouterNavLink}
            to="/profile"
            exact
            activeClassName="router-link-exact-active"
          >
            Sign Up
          </NavLink>
          <hr />
        </>
      )}
      {isAuthenticated && <Dashboard />}
    </>
  );
};

export default Home;
