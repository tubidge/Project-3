import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoutes";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import User from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { useAuth0 } from "./react-auth0-spa";

// styles
import "samples-bootstrap-theme/dist/css/auth0-theme.css";
import "./App.css";

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <>
        <NavBar />
        <Container className="mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/dashboard" component={User} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Container>
        <Footer />
      </>
    </Router>
  );
};

export default App;
