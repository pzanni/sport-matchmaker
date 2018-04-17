import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/controller";
import { Typography, TextField, Button } from 'material-ui';
import { Column, Row } from 'simple-flexbox'

const styles = {
  Headline: { margin: 20 },
  TextField: { width: 350 },
  Button: { margin: 10 }
}

const SignInPage = ({ history }) => {
  return (
    <div>
      <Row style={styles.Headline} horizontal='center'>
        <Typography variant="display2">
          Sign in
          </Typography>
      </Row>
      <SignInForm history={history} />
    </div>
  );
};

class SignInForm extends Component {
  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const loggedInUser = await auth.signInWithEmailAndPassword(email, password);
      //Reittien suojaus
      window.localStorage.setItem('user', loggedInUser)
      //Uudelleenohjataan nyt sisäänkirjautunut käyttäjä etusivulle
      this.props.history.push(routes.HOME);
    } catch (exception) {
      console.log(exception);
    }
  };

  render() {
    return (
      <div className="formInput">
        <form onSubmit={this.onSubmit}>
          <Row horizontal='center'>
            <TextField
              className="emailInput"
              name="email"
              label="Email"
              type="text"
              style={styles.TextField}
            />
          </Row>

          <Row horizontal='center'>
            <TextField
              className="pwInput"
              name="password"
              label="Password"
              type="password"
              style={styles.TextField}
            />
          </Row>

          <Row horizontal='center'>
            <Button style={styles.Button} color="primary" type="submit">
              Submit
            </Button>
          </Row>
        </form>
        <SignUpLink />
      </div>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
      Dont have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default withRouter(SignInPage);

export { SignInForm, SignUpLink };
