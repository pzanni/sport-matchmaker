import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import SignOut from './loggedInUserComponents/SignOut';

// Redux provider index.js:stä -> app.js -> edelleen eteenpäin tänne
const Navigation = props => {
  const { store } = props;
  const isLoggedIn = store.getState().sessionReducer.authUser
  return (
    <div>
      {isLoggedIn ? <AuthNavigation /> : <NonAuthNavigation />}
    </div>
  )
}

const AuthNavigation = () => {
  return (
    <div>
      <ul>
        <li><Link to={routes.HOME}>Home</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><SignOut /></li>
      </ul>
    </div>
  );
};

const NonAuthNavigation = () => {
  return (
    <div>
      <ul>
        <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
        <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
      </ul>
    </div>
  );
};

export default Navigation;
