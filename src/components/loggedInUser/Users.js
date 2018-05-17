import React from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography } from 'material-ui';

const styles = {
  Paper: { padding: 20, margin: 10, borderRadius: '2px' },
  Link: { color: 'black', textDecoration: 'none' }
}

const Users = (props) => {
  const { users } = props
  const availableUsers = users.filter((user) => user.challengeStatus)
  // Works ok
  // console.log('users length', users.length)
  // console.log('challengeable users length', availableUsers.length)
  return (
    <div>
      {availableUsers.map((user) =>
        // id = path, uid = user id 
        <Paper style={styles.Paper} elevation={4} key={user.id}>
          <Typography className="individualUserName" variant="headline">
            {user.username}
          </Typography >
          <Link className="individualUserLink" to={`/users/${user.id}`} style={styles.Link}>
            view profile
          </Link>
        </Paper>)}
    </div>
  )
}

export default Users