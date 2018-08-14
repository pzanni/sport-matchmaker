import React from 'react'
import { updatePassword } from '../../firebase/auth'
import { TextField, Button } from '@material-ui/core';
import { Row } from 'simple-flexbox'
import Message from '../Message'

const styles = {
  Form: { marginTop: 20 },
  Button: { marginTop: 20 }
}

class PasswordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newPassword: '',
      passwordVerify: '',
      messageContent: '',
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

  //TODO - Add message component (maybe make it parent component and use redux here?)
  submitNewPW = async (event) => {
    event.preventDefault()
    try {
      const { newPassword } = this.state
      console.log('new password to be', newPassword)
      await updatePassword(newPassword)
      this.setState({
        newPassword: '',
        passwordVerify: ''
      })
      this.setMessage('Password changed succesfully')
    } catch (exception) {
      this.setMessage('Error, try login/logout or check console for errors')
      console.log(exception)
    }
  }

  render() {
    const { newPassword, passwordVerify, messageContent } = this.state
    //Firebase vaatii väh. 6 merkkijonon salasanan. Lisätään ehto myös client-siden puolelle
    const ifNoMatchingPW = newPassword !== passwordVerify || newPassword.length < 6
    return (
      <div>
        <Message content={messageContent} />
        <form style={styles.Form} onSubmit={this.submitNewPW}>
          <Row>
            <TextField
              className="pwInput"
              name="newPassword"
              label="New password"
              type="password"
              value={newPassword}
              onChange={this.handleFieldChange}
            />
          </Row>

          <Row>
            <TextField
              className="pwInput"
              name="passwordVerify"
              label="Confirm new password"
              type="password"
              value={passwordVerify}
              onChange={this.handleFieldChange}
            />
          </Row>

          <Row>
            <Button style={styles.Button} disabled={ifNoMatchingPW} color="primary" type="submit">
              Submit
            </Button>
          </Row>
        </form>
      </div>
    )
  }
}

export default PasswordForm