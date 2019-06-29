import React from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";

import { useAuth0 } from "../../react-auth0-spa";
import Dashboard from "../Dashboard";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <>
          <Jumbotron />
          <div className="container text-center">
            <div className="row">
              <div className="col-sm-12 mb-3">
                <Link to="/profile" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {isAuthenticated && <Dashboard />}
    </>
  );
};

export default Home;
