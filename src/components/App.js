import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as routes from "../constants/routes";
import Navigation from "./Navigation";
import LandingPage from "./loggedOutUser/Landing";
import SignInPage from "./loggedOutUser/SignIn";
import SignUpPage from "./loggedOutUser/SignUp";
import Home from "./loggedInUser/Home";
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
    const { setAuthUserFor, removeAuthuser } = this.props
    firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? setAuthUserFor(authUser)
          : removeAuthuser()
      }
    )
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />
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

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUserFor: (authUser) => dispatch(authUserAdditionFor(authUser)),
    removeAuthuser: () => dispatch(authUserRemoval())
  }
}

export default connect(null, mapDispatchToProps)(App);
