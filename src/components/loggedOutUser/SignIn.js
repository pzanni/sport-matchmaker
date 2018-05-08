import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/controller";
import { Typography, TextField, Button, Paper } from 'material-ui';
import { Column, Row } from 'simple-flexbox'
import Message from '../Message'

const styles = {
  Column: { marginTop: 50, textAlign: 'center' },
  Headline: { margin: 20 },
  TextField: { width: 350 },
  Button: { margin: 10 },
  FormErrorSpace: { marginTop: 10 }
}

const SignInPage = ({ history }) => {
  return (
    <div>
      <Row horizontal='center'>
        <Column flexGrow={0.2} style={styles.Column}>
          <Paper>
            <Row style={styles.Headline} horizontal='center'>
              <Typography variant="display2">
                Sign in
              </Typography>
            </Row>
            <SignInForm history={history} />
          </Paper>
        </Column>
      </Row>
    </div>
  );
};

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = this.state
      // const email = event.target.email.value;
      // const password = event.target.password.value;
      const loggedInUser = await auth.signInWithEmailAndPassword(email, password);
      //Reittien suojaus
      window.localStorage.setItem('user', loggedInUser)
      //Uudelleenohjataan nyt sisäänkirjautunut käyttäjä etusivulle
      this.props.history.push(routes.HOME);


    } catch (exception) {
      this.setState({ error: exception.message })
      setTimeout(() => {
        this.setState({ error: '' })
      }, 6250)

      //Probably unnecessary now but you never know...
      console.log(exception);
    }
  };

  render() {
    const { error } = this.state
    return (
      <div className="formInput">
        <Message content={error} />
        <form style={styles.FormErrorSpace} onSubmit={this.onSubmit}>
          <Row horizontal='center'>
            <TextField
              className="emailInput"
              name="email"
              label="Email"
              type="text"
              onChange={this.handleFieldChange}
              style={styles.TextField}
            />
          </Row>

          <Row horizontal='center'>
            <TextField
              className="pwInput"
              name="password"
              label="Password"
              type="password"
              onChange={this.handleFieldChange}
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
      </div >
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
