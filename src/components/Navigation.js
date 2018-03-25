import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import SignOut from './loggedInUser/SignOut';
import { connect } from 'react-redux'

import { AppBar, Toolbar, Typography, Button } from 'material-ui';


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
        <Button label="Home" />
      </Link>
    </div>
  );

  // const rightButtons = (
  //   <div>
  //     <Typography align="right">
  //         <SignOut />
  //       </Typography>
  //   </div>
  // );

  // const children = (
  //   <div>
  //     <Link to={routes.HOME}>
  //       <Button label="Home" />
  //     </Link>
  //     <Link to={routes.ACCOUNT}>
  //       <Button label="Account" />
  //     </Link>
  //   </div>
  // )

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="headline" gutterBottom color="inherit">
          Sport matchmaker
        </Typography>
        <Link to={routes.HOME}>
          <Button variant="raised">
            Home
        </Button>
        </Link>
        <Link to={routes.ACCOUNT}>
          <Button variant="raised">
            Account
        </Button>
        </Link>
        <SignOut />
      </Toolbar>
    </AppBar>
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
