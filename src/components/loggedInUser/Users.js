import React from 'react'
import { Link } from 'react-router-dom'
import { updatePassword } from '../../firebase/auth'
import PasswordForm from './PasswordForm'
import ChallengeStatusChanger from './ChallengeStatusChanger'

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

export default Users
export { User }