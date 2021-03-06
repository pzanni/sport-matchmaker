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
import { fetchAndSetChallenges } from '../reducers/challenges'
import Users from './loggedInUser/Users'
import User from './loggedInUser/User'
import { updateFirebaseToken } from '../reducers/session'
import { messaging } from '../firebase/firebase'

//TESTING PURPOSES ONLY

//END TESTING STUFF

const NotFoundPage = () => {
  return (
    <div>
      404 - not found
    </div>
  )
}

class App extends React.Component {
  componentWillMount() {
    const { setAuthUserFor, removeAuthuser, subscribeToUsers, subscribeToChallenges } = this.props
    firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          setAuthUserFor(authUser)
          subscribeToUsers()
          subscribeToChallenges()
        } else {
          removeAuthuser()
        }
      }
    )
  }

  //Error with logout (authUser will be set to  null from componentDidMount)
  //Fix(ed, currently) this by conditions
  async componentDidUpdate() {
    const { session, updateFirebaseToken } = this.props
    //Run this only if user logged in (eg. authUser !== null)
    if (session.authUser) {
      await messaging.requestPermission()
      const token = await messaging.getToken()
      const uid = session.authUser.uid
      updateFirebaseToken(token, uid)
    }
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
              <Route exact path={routes.USERS} render={() => <Users />} />
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
    users: state.users,
    session: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUserFor: (authUser) => dispatch(authUserAdditionFor(authUser)),
    removeAuthuser: () => dispatch(authUserRemoval()),
    subscribeToUsers: () => dispatch(fetchAndSetFirebaseUsers()),
    subscribeToChallenges: () => dispatch(fetchAndSetChallenges()),
    updateFirebaseToken: (token, uid) => dispatch(updateFirebaseToken(token, uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
