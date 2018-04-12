import React from 'react'
import { updatePassword } from '../../firebase/auth'

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
    const { newPassword, passwordVerify } = this.state
    //Firebase vaatii väh. 6 merkkijonon salasanan. Lisätään ehto myös client-siden puolelle
    const ifNoMatchingPW = newPassword !== passwordVerify || newPassword.length < 6
    return (
      <div>
        <h4>Password settings</h4>
        <div>
          <label htmlFor="newPassword">
            Enter new Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={this.handleFieldChange}
          />
        </div>
        <label htmlFor="passwordVerify">
          Confirm new Password
          </label>
        <input
          type="password"
          name="passwordVerify"
          value={passwordVerify}
          onChange={this.handleFieldChange}
        />
        <button disabled={ifNoMatchingPW} onClick={this.submitNewPW}>
          Submit
        </button>
      </div>
    )
  }
}

export default PasswordForm