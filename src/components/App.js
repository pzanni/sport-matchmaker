import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'

import * as routes from "../constants/routes";
import Navigation from "./Navigation";
import Footer from './Footer'
import LandingPage from "./loggedOutUser/Landing";
import SignInPage from "./loggedOutUser/SignIn";
import SignUpPage from "./loggedOutUser/SignUp";
import Home from "./loggedInUser/Home";
import { firebase } from '../firebase/controller'
import { authUserAdditionFor, authUserRemoval } from '../reducers/session'
import { fetchAndSetFirebaseUsers } from '../reducers/users'
import Users from './loggedInUser/Users'
import User from './loggedInUser/User'


//TESTING PURPOSES ONLY
import { fetchAndSetChallenges } from '../reducers/challenges'

const NotFoundPage = () => {
  return (
    <div>
      404 - not found
    </div>
  )
}

class App extends React.Component {
  componentDidMount() {
    const { setAuthUserFor, removeAuthuser, fetchAndSetFirebaseUsers, fetchAndSetChallenges } = this.props
    firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          setAuthUserFor(authUser)
          fetchAndSetFirebaseUsers()
          fetchAndSetChallenges()
        } else {
          removeAuthuser()
        }
      }
    )
  }

  render() {
    const { users } = this.props
    const userById = (id) =>
      users.find(user => user.id === id)

    return (
      <div>
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route exact path={routes.LANDING} component={() => <LandingPage />} />
              <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
              <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
              <Route exact path={routes.HOME} component={() => <Home />} />
              <Route exact path={routes.USERS} render={() => <Users users={users} />} />
              {/* Jos allaoleva importti USERSwID ei toimi niin käytetään rauhassa vanhempaa versiota */}
              <Route exact path={routes.USERSwID} render={({ match }) => <User user={userById(match.params.id)} />} />
              {/* Switch laittaa tämän reitin aina, kun matchia ylläoleviin reitteihin ei löydy */}
              <Route component={() => <NotFoundPage />} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUserFor: (authUser) => dispatch(authUserAdditionFor(authUser)),
    removeAuthuser: () => dispatch(authUserRemoval()),
    fetchAndSetFirebaseUsers: () => dispatch(fetchAndSetFirebaseUsers()),
    fetchAndSetChallenges: () => dispatch(fetchAndSetChallenges())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
