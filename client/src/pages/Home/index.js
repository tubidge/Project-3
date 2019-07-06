import React from "react";
import { Link } from "react-router-dom";

import { useAuth0 } from "../../react-auth0-spa";
import Dashboard from "../Dashboard";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <>
          <div className="container">
            <h1>Home Page</h1>
            <Link to="/profile" className="btn waves-effect waves-light">
              Sign Up
            </Link>
            <Link to="/dashboard" className="btn waves-effect waves-light">
              Login
            </Link>
          </div>
        </>
      )}
      {isAuthenticated && <Dashboard />}
    </>
  );
};

export default Home;
