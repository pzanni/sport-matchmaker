import React, { Component } from "react"
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import { Typography, TextField, Button, Paper } from '@material-ui/core'
import { Column, Row } from 'simple-flexbox'

import * as routes from "../../constants/routes"
import { auth } from "../../firebase/controller"
import Message from '../Message'

const styles = {
  Column: { marginTop: 50, textAlign: 'center' },
  Headline: { margin: 20 },
  TextField: { width: 350 },
  Button: { margin: 10 },
  FormmessageContentSpace: { marginTop: 10 },
  input: {
    color: '#4a4a4a'
  }
}

const SignInPage = ({ history }) => {
  return (
    <div>
      <Row horizontal='center'>
        <Column flexGrow={0.2} style={styles.Column}>
          <Paper>
            <Row style={styles.Headline} horizontal='center'>
              <Typography variant="display1" style={{ color: '#222' }}>
                Sign in
              </Typography>
            </Row>
            <SignInForm history={history} />
          </Paper>
        </Column>
      </Row>
    </div>
  )
}

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      messageContent: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  setMessage = (content) => {
    this.setState({ messageContent: content })
    setTimeout(() => {
      this.setState({ messageContent: '' })
    }, 6250)
  }

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = this.state
      const { setToken } = this.props

      const loggedInUser = await auth.signInWithEmailAndPassword(email, password)
      window.localStorage.setItem('user', loggedInUser) // Onko välttämätön? Check refreshtilanne
      this.props.history.push(routes.HOME);
    } catch (exception) {
      console.log(exception)
      this.setMessage(exception.message)
    }
  }

  render() {
    const { messageContent } = this.state
    return (
      <div className="formInput">
        <Message content={messageContent} />
        <form style={styles.FormmessageContentSpace} onSubmit={this.onSubmit}>
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
    )
  }
}

const SignUpLink = () => {
  return (
    <p>
      Dont have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  )
}


export default withRouter(SignInPage)
export { SignInForm, SignUpLink }
