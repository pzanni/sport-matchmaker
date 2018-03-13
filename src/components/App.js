import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as routes from '../constants/routes';
import Navigation from './Navigation';
import LandingPage from './landing/Landing';
import SignInPage from './landing/SignIn';
import SignUpPage from './landing/SignUp';

const App = () => {

  return (
    <Router>
      <div>
        <Navigation />
        <Route
          exact path={routes.LANDING}
          component={() => <LandingPage />}
        />
        <Route
          exact path={routes.SIGN_IN}
          component={() => <SignInPage />}
        />
        <Route
          exact path={routes.SIGN_UP}
          component={() => <SignUpPage />}
        />
      </div>
    </Router>
  )
}

export default App;