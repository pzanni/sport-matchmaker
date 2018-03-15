import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "../constants/routes";
import Navigation from "./Navigation";
import LandingPage from "./nonLoggedInUserComponents/Landing";
import SignInPage from "./nonLoggedInUserComponents/SignIn";
import SignUpPage from "./nonLoggedInUserComponents/SignUp";
import Home from "./loggedInUserComponents/Home";

//Redux tuo staten propseina tänne
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={null} />
          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.HOME} component={() => <Home />} />
        </div>
      </Router>
    );
  }
}

export default App;
