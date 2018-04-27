import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography } from 'material-ui';

import { updatePassword } from '../../firebase/auth'
import PasswordForm from './PasswordForm'
import { ConnectedStatusChanger, ConnectedCreator } from './Challenge'

const styles = {
  Paper: { padding: 20, margin: 10, borderRadius: '2px' }
}

//Challenge - status siirrettävä pois tästä komponentista (ehkä)
//Muuten käyttäjä voi haastaa itseään
const Info = (props) => {
  const { user, session, users } = props
  const challenger = users.find(user => user.uid === session.authUser.uid)
  // console.log('challenger (should be logged in user)', challenger)
  // console.log('opponent (which user we are about to challenge)', user)
  return (
    <Paper style={styles.Paper} elevation={4}>
      <Typography variant="title">
        User settings for {user.username}
      </Typography >
      <p>email: {user.email}</p>
      {user.challengeStatus
        ? <ConnectedCreator from={challenger} to={user} />
        : <p><b>{user.username}</b>does not accept challenges at this moment</p>}
    </Paper>
  )
}

const User = (props) => {
  //user app.js:stä, session ja users mapStateToPropsista
  const { user, session, users } = props
  if (user) {
    return (
      <div>
        {/* Ehkä Info - komponentti myös 'connect' ?? Mitään järkeä siirrellä kamaa propseissa.. */}
        <Info user={user} session={session} users={users} />
        {session.authUser.uid === user.uid
          ? <div>
            <ConnectedStatusChanger path={user.id} status={!user.challengeStatus} />
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

const mapStateToProps = (state) => {
  return {
    session: state.session,
    users: state.users
  }
}

export default connect(mapStateToProps)(User)