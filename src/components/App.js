import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "../constants/routes";
import Navigation from "./Navigation";
import LandingPage from "./nonLoggedInUserComponents/Landing";
import SignInPage from "./nonLoggedInUserComponents/SignIn";
import SignUpPage from "./nonLoggedInUserComponents/SignUp";
import Home from "./loggedInUserComponents/Home";

import { firebase } from '../firebase/controller'

//Redux tuo staten propseina tänne
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          this.props.store.dispatch({ type: 'SET_AUTH', authUser })
        }
      }
    )
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation store={this.props.store} />
          <Route exact path={routes.LANDING} component={() => <LandingPage store={this.props.store} />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage store={this.props.store} />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage store={this.props.store} />} />
          <Route exact path={routes.HOME} component={() => <Home store={this.props.store} />} />
        </div>
      </Router >
    );
  }
}

export default App;
