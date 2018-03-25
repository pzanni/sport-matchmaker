import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as routes from "../constants/routes";
import Navigation from "./Navigation";
import LandingPage from "./loggedOutUser/Landing";
import SignInPage from "./loggedOutUser/SignIn";
import SignUpPage from "./loggedOutUser/SignUp";
import Home from "./loggedInUser/Home";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { firebase } from '../firebase/controller'
import { connect } from 'react-redux'

import { authUserAdditionFor, authUserRemoval } from '../reducers/session'

const NotFoundPage = () => {
  return (
    <div>
      404 - not found
    </div>
  )
}

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
          <MuiThemeProvider>
            <Navigation />
          </MuiThemeProvider>
          <Switch>
            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <Route exact path={routes.HOME} component={() => <Home />} />

            {/* Switch laittaa tämän reitin aina, kun matchia ylläoleviin reitteihin ei löydy */}
            <Route component={() => <NotFoundPage />} />
          </Switch>
        </div>
      </Router >
    );
  }
}

export default connect(null, { authUserAdditionFor, authUserRemoval })(App);
