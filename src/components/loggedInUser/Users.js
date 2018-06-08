import React from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography, Icon } from 'material-ui'
import { connect } from 'react-redux'

import { addFriend } from '../../reducers/users'

const styles = {
  flexRow: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  Paper: { padding: 20, margin: 10, borderRadius: '5px', width: '350px' },
  Link: { color: '#0e0e0f', textDecoration: 'none' },
  // Lucky alignment with default flex setup yay
  nameWithIconDiv: { display: 'flex', flexDirection: 'row' }
}

//Keep paper on this one - unable to maintain className properties for whatever reason
//TODO - CONDITIONALS
//1. Cannot have self...
//2. If friend -> render a removal icon instead
const Users = (props) => {
  const { users, session, addFriend } = props
  const availableUsers = users.filter((user) => user.challengeStatus)
  const currentUser = users.find((user) => user.uid === session.authUser.uid)
  console.log('Current user', currentUser)

  return (
    <div style={styles.flexRow}>
      {availableUsers.map((user) =>
        // id = path, uid = user id 
        <Paper className="list" style={styles.Paper} elevation={2} key={user.id}>
          <div style={styles.flexRow}>
            <Typography className="individualUserName" variant="display1">
              {user.username}
            </Typography>
            {/* Conditional operator here for removal as well... */}
            <Icon className="friendIcon" onClick={() => addFriend(currentUser.id, user.uid)}>add_circle</Icon>
          </div>
          <Link style={styles.Link} to={`/users/${user.id}`} className="individualUserLink">
            view profile
          </Link>
        </Paper>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (currentUserPath, friendUid) => dispatch(addFriend(currentUserPath, friendUid))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Users)