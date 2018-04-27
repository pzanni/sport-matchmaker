import React from "react";
import { auth } from "../../firebase/controller";
import { withRouter, Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { addFirebaseUser } from '../../reducers/users'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Typography, TextField, Button, Paper } from 'material-ui';
import { Column, Row } from 'simple-flexbox'

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: '',
      password2: ''
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      //HUOM - ERI KUIN importti, tämä on dispatchattu, mutta samanniminen
      const { addFirebaseUser } = this.props

      const email = event.target.email.value;
      const password = this.state.password1;
      const username = event.target.username.value;

      const createdUser = await auth.createUserWithEmailAndPassword(email, password);
      const updatedUser = await createdUser.updateProfile({ displayName: username })
      console.log('luotu käyttäjä', updatedUser)

      //Yhdistellään reduxia ja firebasea
      const newUserData = { username, email, uid: createdUser.uid, challengeStatus: false }
      addFirebaseUser(newUserData)

      window.localStorage.setItem('user', createdUser)
      this.props.history.push(routes.HOME);

    } catch (exception) {
      console.log(exception);
    }
  };

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const styles = {
      Headline: { margin: 20 },
      TextField: { width: 350 },
      Button: { margin: 10 },
      MainColumn: { marginTop: 50 }
    }
    const { password1, password2 } = this.state;
    const ifInvalidCondition = password1 !== password2 || password1.length === 0;
    return (
      <Row horizontal='center'>
        <Column flexGrow={0.2} style={styles.MainColumn}>
          <Paper>
            <Row style={styles.Headline} horizontal='center'>
              <Typography variant="headline">
                Create an account
              </Typography>
            </Row>

            <form onSubmit={this.onSubmit}>
              <Row horizontal='center'>
                <TextField
                  name="username"
                  label="Username"
                  type="text"
                  style={styles.TextField}
                />
              </Row>
              <Row horizontal='center'>
                <TextField
                  name="email"
                  label="Email"
                  type="text"
                  style={styles.TextField}
                />
              </Row>
              <Row horizontal='center'>
                <TextField
                  name="password1"
                  label="Password"
                  type="password"
                  style={styles.TextField}
                  onChange={this.handleFieldChange}
                />
              </Row>
              <Row horizontal='center'>
                <TextField
                  name="password2"
                  label="Confirm password"
                  type="password"
                  style={styles.TextField}
                  onChange={this.handleFieldChange}
                />
              </Row>
              <Row horizontal='center'>
                <Button style={styles.Button} disabled={ifInvalidCondition} color="primary" type="submit">
                  Submit
            </Button>
              </Row>
            </form>
            <Column horizontal="center">
              <SignUpLink />
            </Column>

          </Paper>
        </Column>
      </Row>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
      Already have an account? <Link to={routes.SIGN_IN}>Sign in</Link>
    </p>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFirebaseUser: (content) => dispatch(addFirebaseUser(content))
  }
}

export default compose(withRouter, connect(null, mapDispatchToProps))(SignUpPage)
