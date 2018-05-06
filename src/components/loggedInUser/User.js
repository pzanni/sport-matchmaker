import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography, Divider } from 'material-ui';
import { updatePassword } from '../../firebase/auth'
import PasswordForm from './PasswordForm'
import { ConnectedStatusChanger, ConnectedCreator } from './Challenge'
import { Column, Row } from 'simple-flexbox'

const styles = {
  Column: { marginTop: 40 },
  Paper: { borderRadius: '2px' },
  InnerColumn: { margin: '30px' }
}

//Challenge - status siirrettävä pois tästä komponentista (ehkä)
//Muuten käyttäjä voi haastaa itseään
const Info = (props) => {
  const { user, session, users } = props
  const challenger = users.find(user => user.uid === session.authUser.uid)
  // console.log('challenger (should be logged in user)', challenger)
  // console.log('opponent (which user we are about to challenge)', user)
  return (
    <div>
      <Typography variant="title">
        {user.username}
      </Typography >
      <p>email: {user.email}</p>
      {user.challengeStatus
        ? <ConnectedCreator from={challenger} to={user} />
        : <p><b>{user.username}</b> does not accept challenges at this moment</p>}
    </div>
  )
}

const User = (props) => {
  //user app.js:stä, session ja users mapStateToPropsista
  const { user, session, users } = props
  if (user) {
    return (
      <Row horizontal='center'>
        <Column flexGrow={0.5} style={styles.Column}>
          <Paper>
            <Column style={styles.InnerColumn}>
              <Info user={user} session={session} users={users} />
              <Divider style={{ marginTop: '30px', marginBottom: '30px' }} />
              {session.authUser.uid === user.uid
                ? <Column horizontal='start' >

                  <ConnectedStatusChanger path={user.id} status={!user.challengeStatus} />
                  <PasswordForm />
                </Column>
                : null}
            </Column>
          </Paper>
        </Column>
      </Row>
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