import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "../constants/routes";
import Navigation from "./Navigation";
import LandingPage from "./nonLoggedInUserComponents/Landing";
import SignInPage from "./nonLoggedInUserComponents/SignIn";
import SignUpPage from "./nonLoggedInUserComponents/SignUp";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />

        <Route exact path={routes.LANDING} component={() => <LandingPage />} />
        <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
        <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      </div>
    </Router>
  );
};

export default App;
