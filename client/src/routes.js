import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import User from "./pages/User";
import Callback from "./pages/Callback";
import Auth from "./components/Auth";
import history from "./history";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route path="/home" render={props => <Home auth={auth} {...props} />} />
        <Route
          path="/profile"
          render={props => (
            <Profile auth={auth} {...props} newProp={"this is a prop"} />
          )}
        />
        {/* <Route
          path="/users"
          render={props => (
            // <User auth={auth} {...props} newProp={"this is a prop"} />
          )}
        /> */}
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
