import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoutes";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import MaterializeNavbar from "./components/MaterializeNavbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Buddies from "./pages/Buddies";
import User from "./pages/User";
import { useAuth0 } from "./react-auth0-spa";

import "materialize-css/dist/css/materialize.min.css";
import "./App.css";

const App = () => {
  const { loading, user } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  console.log(user);

  return (
    <Router>
      <>
        {/* <NavBar /> */}
        <MaterializeNavbar />
        <Container className="mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/buddies" exact component={Buddies} />
            <Route path="/user" component={User} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Container>
      </>
    </Router>
  );
};

export default App;
