import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Buddies from "./pages/Buddies";
import BuddyProfile from "./pages/BuddyProfile";
import Goals from "./pages/Goals";
import GoalsNew from "./pages/GoalsNew";
import NoMatch from "./pages/NoMatch";
import { useAuth0 } from "./react-auth0-spa";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/buddies" exact component={Buddies} />
          <PrivateRoute path="/buddy-profile/" component={BuddyProfile} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/goals" component={Goals} />
          <PrivateRoute path="/goalsNew" component={GoalsNew} />
          <Route component={NoMatch} />
        </Switch>
      </>
    </Router>
  );
};

export default App;
