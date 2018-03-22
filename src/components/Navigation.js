import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import SignOut from './loggedInUser/SignOut';
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';


const Navigation = (props) => {
  const { session } = props;
  return (
    <div>
      {session.authUser
        ? <AuthNavigation />
        : <NonAuthNavigation />}
    </div>
  )
}


const AuthNavigation = () => {

  const leftButtons = (
    <div>
      <Link to={routes.HOME}>
        <FlatButton label="Home" />
      </Link>
    </div>
  );

  const rightButtons = (
    <div>
      <SignOut />
    </div>
  );

  const children = (
    <div>
      <Link to={routes.HOME}>
        <FlatButton label="Home" />
      </Link>
      <Link to={routes.ACCOUNT}>
        <FlatButton label="Account" />
      </Link>
    </div>
  )

  return (
    <div>
      <ul>
        <AppBar
          title="Sport Matchmaker"
          position="static"
          children={children}
          iconElementRight={rightButtons}>
        </AppBar>
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
