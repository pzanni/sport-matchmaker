import React from 'react'
import { updatePassword } from '../../firebase/auth'
import { Typography, TextField, Button } from 'material-ui';
import {  Row } from 'simple-flexbox'

class PasswordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newPassword: '',
      passwordVerify: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitNewPW = async (event) => {
    event.preventDefault()
    try {
      const { newPassword } = this.state
      console.log('new password to be', newPassword)
      const updatedData = await updatePassword(newPassword)
      this.setState({
        newPassword: '',
        passwordVerify: ''
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const styles = {
      Form: { marginTop: 20 },
      Button: { marginTop: 20 }
    }
    const { newPassword, passwordVerify } = this.state
    //Firebase vaatii väh. 6 merkkijonon salasanan. Lisätään ehto myös client-siden puolelle
    const ifNoMatchingPW = newPassword !== passwordVerify || newPassword.length < 6
    return (
      <div style={ styles.Form }>
        <Row>
          <TextField
            className="pwInput"
            name="newPassword"
            label="New password"
            type="password"
            onChange={this.handleFieldChange}
          />
        </Row>

        <Row>
          <TextField
            className="pwInput"
            name="passwordVerify"
            label="Confirm new password"
            type="password"
            onChange={this.handleFieldChange}
          />
        </Row>

        <Row>
          <Button style={styles.Button} variant="raised" disabled={ifNoMatchingPW} onClick={this.submitNewPW}>
            Submit
            </Button>
        </Row>
      </div>
    )
  }
}

export default PasswordForm