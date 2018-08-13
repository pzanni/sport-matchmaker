import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";
import SignOut from './loggedInUser/SignOut';
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography, Button, Grid, Menu, MenuItem } from '@material-ui/core/';
import { Row } from 'simple-flexbox'

const Navigation = (props) => {
  const { session, users } = props;
  const loggedInUser = session.authUser
    ? users.find(user => user.uid === session.authUser.uid)
    : null

  return (
    <div>
      {session.authUser
        ? <AuthNavigation session={session} user={loggedInUser} />
        : <NonAuthNavigation />}
    </div>
  )
}


class AuthNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      authUserUrl: '/'
    }
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.target });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const authUserUrl = this.props.user
      ? routes.USERS + '/' + this.props.user.id
      : 'false'

    return (
      <AppBar position="static" style={{ backgroundColor: '#222' }}>
        <Toolbar>
          <Row vertical="center">
            <Typography variant="headline" color="inherit" style={{ marginRight: '20px' }} gutterBottom>
              Sport matchmaker
          </Typography>
            <Link to={routes.HOME} style={{ textDecoration: 'none' }}>
              <Button style={{ color: 'white' }}>
                Home
            </Button>
            </Link>
            <Link to={routes.USERS} style={{ textDecoration: 'none' }}>
              <Button style={{ color: 'white' }}>
                Users
            </Button>
            </Link>

            <Button
              aria-owns='simple-menu'
              aria-haspopup="true"
              color="inherit"
              onClick={this.handleMenuClick}>
              <span>{this.props.session.authUser.displayName}</span>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleMenuClose}>
                <Link to={authUserUrl} style={{ textDecoration: 'none', color: 'black' }}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={this.handleMenuClose}><SignOut /></MenuItem>
            </Menu>
          </Row>
        </Toolbar>
      </AppBar>
    );
  }
};

const NonAuthNavigation = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#222' }}>
      <Toolbar>
        <Grid item xs={3}>
          <Typography variant="headline" gutterBottom color="inherit">
            Sport matchmaker
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    session: state.session,
    users: state.users
  }
}

export default connect(mapStateToProps)(Navigation);
