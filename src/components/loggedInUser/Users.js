import React from 'react'
import { Link } from 'react-router-dom'
import { updatePassword } from '../../firebase/auth'
import { Paper, Typography } from 'material-ui';

const Users = ({ users }) => {

  const styles = {
    Paper: { padding: 20, margin: 10 }
  }

  return (
    <div>
      {users.map((user) =>
        <Paper style={styles.Paper} elevation={4} key={user.id}>
          <Typography variant="headline">
            {user.username}
          </Typography >
          More info about&nbsp;
          <Link to={`/users/${user.id}`}>
            {user.username}
          </Link>
        </Paper>)}
    </div>
  )
}

const User = (props) => {
  const { user, session, editChallengeStatus } = props
  if (user) {
    return (
      <div>
        <b>user id: {user.uid}</b>
        <p>username: {user.username}</p>
        <p>email: {user.email}</p>
        <p>accepts challenges?
        {user.challengeStatus
            ? <b> yes</b>
            : <b> no</b>}
        </p>
        {session.authUser.uid === user.uid
          ? <div>
            <ChallengeStatusChanger path={user.id} status={!user.challengeStatus} editChallengeStatus={editChallengeStatus} />
            <PasswordForm />
          </div>
          : null}
      </div>
    )
  } else {
    return (
      <div>
        Loading individual user data...
      </div>
    )
  }
}

const ChallengeStatusChanger = (props) => {
  const { path, status, editChallengeStatus } = props
  return (
    <button onClick={() => editChallengeStatus(path, status)}>Change challenge status</button>
  )
}

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
          Confirm new newPassword
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

export default Users
export { User }