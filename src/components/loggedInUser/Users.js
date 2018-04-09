import React from 'react'
import { Link } from 'react-router-dom'
import updatePassword from '../../firebase/auth'

const Users = ({ users }) => {
  return (
    <div>
      {users.map((user) =>
        <div key={user.id}>
          <p>Username: {user.username}</p>
          More info about&nbsp;
          <Link to={`/users/${user.id}`}>
            {user.username}
          </Link>
          <hr />
        </div>)}
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
      password: '',
      passwordVerify: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { password, passwordVerify } = this.state
    //Firebase vaatii väh. 6 merkkijonon salasanan. Lisätään ehto myös client-siden puolelle
    const ifNoMatchingPW = password !== passwordVerify || password.length < 6
    return (
      <div>
        <h4>Password settings</h4>
        <div>
          <label htmlFor="password">
            Enter new password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleFieldChange}
          />
        </div>
        <label htmlFor="passwordVerify">
          Confirm new password
          </label>
        <input
          type="password"
          name="passwordVerify"
          value={passwordVerify}
          onChange={this.handleFieldChange}
        />
        <button disabled={ifNoMatchingPW} onClick={() => console.log('Salasana muutettu (ei vielä xdedededede)')}>
          Submit
        </button>
      </div>
    )
  }
}

export default Users
export { User }