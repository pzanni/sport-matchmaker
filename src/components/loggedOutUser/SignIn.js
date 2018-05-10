import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/controller";
import { Typography, TextField, Button, Paper } from 'material-ui';
import { Column, Row } from 'simple-flexbox'
import Message from '../Message'
import { messaging } from '../../firebase/firebase'
import request from 'request'

const notifyFunc = () => {
  var key = process.env.REACT_APP_SECRET_SERVER_KEY
  console.log('avain (key) (env)', key)
  const antoninToken = 'epu7iDiu9wM:APA91bEN4CkutSzepnPKU4Q06ryHiP-RrUqS2SSjES6LpEhmds9LNWBfekxP8akc_WDJICeNBDPCxjKcE_Kn-cWvM_EqhNl4kGsPljM1wjE4eVffjJYI-M1ZKKBsPoqqTw8jMJ1V-qtj'

  var notification = {
    'title': 'Match found!',
    'body': 'Go check out whats up !!!',
    'icon': 'https://image.flaticon.com/icons/svg/140/140602.svg',
    'click_action': 'http://localhost:3000'

  }

  setTimeout(() => {
    request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'notification': notification,
        'to': antoninToken
      })
    }, (error, response, body) => {
      if (error) {
        console.log("Error in post request!", error);
      } else {
        console.log("No error, body", body);
      }
    })
  }, 5000)

  // request({
  //   url: 'https://fcm.googleapis.com/fcm/send',
  //   method: 'POST',
  //   headers: {
  //     'Authorization': 'key=' + key,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     'notification': notification,
  //     'to': antoninToken
  //   })
  // }, (error, response, body) => {
  //   if (error) {
  //     console.log("Error in post request!", error);
  //   } else {
  //     console.log("No error, body", body);
  //   }
  // })

}

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
      const loggedInUser = await auth.signInWithEmailAndPassword(email, password)

      //FCM testausta
      await messaging.requestPermission()
      const token = await messaging.getToken()
      console.log('Permission granted!')
      console.log('Token', token)

      window.localStorage.setItem('user', loggedInUser) // Onko välttämätön? Check refreshtilanne
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
        <Button style={styles.Button} color="primary" onClick={notifyFunc}>
          Notifytest
        </Button>
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
