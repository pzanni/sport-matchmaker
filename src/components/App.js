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
import { fetchAndSetFirebaseUsers } from '../reducers/users'

import Users from './loggedInUser/Users'
import { User } from './loggedInUser/Users'

const NotFoundPage = () => {
  return (
    <div>
      404 - not found
    </div>
  )
}

class App extends React.Component {
  componentDidMount() {
    const { setAuthUserFor, removeAuthuser, fetchAndSetFirebaseUsers } = this.props
    firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? setAuthUserFor(authUser) && fetchAndSetFirebaseUsers()
          : removeAuthuser()
      }
    )
  }

  render() {
    const { users, session } = this.props
    const userById = (id) =>
      users.find(user => user.id === id)

    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
            <Route exact path={routes.HOME} component={() => <Home />} />

            <Route exact path="/users" render={() =>
              <Users users={users} />}
            />

            <Route exact path="/users/:id" render={({ match }) =>
              <User user={userById(match.params.id)} session={session} />}
            />

            {/* Switch laittaa tämän reitin aina, kun matchia ylläoleviin reitteihin ei löydy */}
            <Route component={() => <NotFoundPage />} />
          </Switch>
        </div>
      </Router >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUserFor: (authUser) => dispatch(authUserAdditionFor(authUser)),
    removeAuthuser: () => dispatch(authUserRemoval()),
    fetchAndSetFirebaseUsers: () => dispatch(fetchAndSetFirebaseUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
