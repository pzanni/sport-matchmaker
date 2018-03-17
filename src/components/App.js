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
    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null })
      }
    )
  }

  render() {
    console.log('App authUser - ', this.state.authUser)
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
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
