import React from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography, Icon } from '@material-ui/core'
import { connect } from 'react-redux'

import { addFriend, removeFriend } from '../../reducers/users'

const styles = {
  flexRow: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  Paper: { padding: 20, margin: 10, borderRadius: '5px', width: '350px' },
  Link: { color: '#4a4a4a', textDecoration: 'none' },
}

//Keep paper on this one - unable to maintain className properties for whatever reason
const Users = (props) => {
  const { users, session } = props
  const availableUsers = users.filter((user) => user.challengeStatus)
  const currentUser = users.find((user) => user.uid === session.authUser.uid)

  return (
    <div style={styles.flexRow}>
      {availableUsers.map((user) =>
        // id = path, uid = user id 
        <Paper className="list" style={styles.Paper} elevation={2} key={user.id}>
          <div style={styles.flexRow}>
            <Typography className="individualUserName" variant="display1" style={{ color: '#222' }}>
              {user.username}
            </Typography>
            <ConnectedConditionalIcon currentUser={currentUser} potentialFriendUid={user.uid} />
          </div>
          <Link style={styles.Link} to={`/users/${user.id}`} className="individualUserLink">
            view profile
          </Link>
        </Paper>)}
    </div>
  )
}

// This can be changed into HoC
const ConditionalIcon = (props) => {
  const { currentUser, potentialFriendUid, addFriend, removeFriend } = props

  //1. Cannot challenge self...
  if (currentUser.uid === potentialFriendUid) {
    return null
  }

  let foundFriendKey = null
  for (let key in currentUser.friends) {
    const friendUid = currentUser.friends[key]
    if (friendUid === potentialFriendUid) {
      foundFriendKey = key
    }
  }

  if (foundFriendKey) {
    return <Icon className="removableFriendIcon" onClick={() => removeFriend(currentUser.id, foundFriendKey)}>remove_circle</Icon>
  } else {
    return <Icon className="friendIcon" onClick={() => addFriend(currentUser.id, potentialFriendUid)}>add_circle</Icon>
  }
}


const mapStateToProps = (state) => {
  return {
    session: state.session,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (currentUserPath, friendUid) => dispatch(addFriend(currentUserPath, friendUid)),
    removeFriend: (currentUserPath, friendUidKey) => dispatch(removeFriend(currentUserPath, friendUidKey))
  }
}

const ConnectedConditionalIcon = connect(null, mapDispatchToProps)(ConditionalIcon)
export default connect(mapStateToProps)(Users)
export { ConnectedConditionalIcon }