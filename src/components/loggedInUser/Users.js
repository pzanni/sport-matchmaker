import React from 'react'
import { Link } from 'react-router-dom'

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
          ? <button onClick={() => editChallengeStatus(user.id, !user.challengeStatus)}>Change challenge status</button>
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