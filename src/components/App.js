import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as routes from "../constants/routes";
import Navigation from "./Navigation";
import LandingPage from "./loggedOutUser/Landing";
import SignInPage from "./loggedOutUser/SignIn";
import SignUpPage from "./loggedOutUser/SignUp";
import Home from "./loggedInUser/Home";
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { firebase } from '../firebase/controller'
import { connect } from 'react-redux'

import { authUserAdditionFor, authUserRemoval } from '../reducers/session'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { authUserAdditionFor, authUserRemoval } = this.props
    firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? authUserAdditionFor(authUser)
          : authUserRemoval()
      }
    )
  }

  render() {
    return (
      <Router>
        <div>

          <Navigation />

          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.HOME} component={() => <Home />} />
        </div>
      </Router >
    );
  }
}

export default connect(null, { authUserAdditionFor, authUserRemoval })(App);
