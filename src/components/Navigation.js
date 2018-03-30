import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import SignOut from './loggedInUser/SignOut';
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography, Button, Grid, Paper, Menu, MenuItem } from 'material-ui';
import navigationReducer from '../reducers/navigation';

const Navigation = (props) => {
  const { session } = props;

  return (
    <div>
      {session.authUser
        ? <AuthNavigation {...props} />
        : <NonAuthNavigation />}
    </div>
  )
}


const AuthNavigation = (props) => {
  let editLink = <Link to={routes.ACCOUNT} />;

  const handleClick = event => {
    // open menu
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={8}>
          <Grid item xs={3}>
            <Typography variant="headline" gutterBottom color="inherit">
              Sport matchmaker
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <Link to={routes.HOME} style={{ textDecoration: 'none' }}>
              <Button variant="raised">
                Home
              </Button>
            </Link>
          </Grid>

          <Grid item xs={1}>
            <Link to={routes.ACCOUNT} style={{ textDecoration: 'none' }}>
              <Button variant="raised">
                Account
              </Button>
            </Link>
          </Grid>

          <Grid item xs={2}>
            <SignOut />
          </Grid>

          <Grid item xs={3}>
            <Button
              aria-owns='simple-menu'
              aria-haspopup="true"
              onClick={handleClick}>
              User: <h3>{props.session.authUser.displayName}</h3>
            </Button>
          </Grid>
        </Grid>
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
    session: state.session,
  }
}

export default connect(mapStateToProps)(Navigation);
