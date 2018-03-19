import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import SignOut from './loggedInUserComponents/SignOut';
import { connect } from 'react-redux'

const Navigation = (props) => {
  const { store, session } = props;
  return (
    <div>
      {session.authUser
        ? <AuthNavigation store={store} />
        : <NonAuthNavigation />}
    </div>
  )
}


const AuthNavigation = ({ store }) => {
  return (
    <div>
      <ul>
        <li><Link to={routes.HOME}>Home</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><SignOut store={store} /></li>
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

const mapStateToProps = (state) => {
  return {
    session: state.session
  }
}

export default connect(mapStateToProps)(Navigation);
