import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography, Divider } from 'material-ui';
import { Column, Row } from 'simple-flexbox'

import PasswordForm from './PasswordForm'
import { ConnectedStatusChanger, ConnectedCreator } from './Challenge'
import { ConnectedDisciplineSelector } from './DisciplineSelector'

const styles = {
  MainColumn: { marginTop: 40 },
  Paper: { borderRadius: '2px' },
  InnerColumn: { margin: '40px' },
  InnerInnerColumn: { marginLeft: '100px', marginRight: '100px' }
}

//Challenge - status siirrettävä pois tästä komponentista (ehkä)
//Muuten käyttäjä voi haastaa itseään
const Info = (props) => {
  const { user, session, users } = props
  const challenger = users.find(user => user.uid === session.authUser.uid)
  // console.log('challenger (should be logged in user)', challenger)
  // console.log('opponent (which user we are about to challenge)', user)
  return (
    <Column style={styles.InnerInnerColumn}>
      <Row horizontal="center">
        <Typography style={{ marginBottom: '30px' }} variant="display1">
          {user.username}
        </Typography >
      </Row>
      <Row horizontal="spaced">
        <Column>
          <p>Email: {user.email}</p>
        </Column>
        <Column>
          <ConnectedDisciplineSelector userPath={user.id} disciplines={user.disciplines} />
        </Column>
        <Column vertical="center">
          {user.challengeStatus
            ? <ConnectedCreator from={challenger} to={user} disciplines={user.disciplines} />
            : <p><b>{user.username}</b> does not accept challenges at this moment</p>}
        </Column>
      </Row>
    </Column>
  )
}

const User = (props) => {
  //user app.js:stä, session ja users mapStateToPropsista
  const { user, session, users } = props
  if (user) {
    return (
      <Row horizontal='center' vertical='center'>
        <Column flexGrow={0.5} style={styles.MainColumn}>
          <Paper>
            <Column style={styles.InnerColumn}>
              <Info user={user} session={session} users={users} />
              {session.authUser.uid === user.uid
                ?
                <div>
                  <Divider style={{ marginTop: '30px', marginBottom: '30px' }} />
                  <Column style={styles.InnerInnerColumn}>
                    <Row horizontal="center">
                      <Typography variant="title">
                        Account settings
                    </Typography>
                    </Row>
                    <Row horizontal="spaced">
                      <Column style={styles.Column}>
                        <PasswordForm />
                      </Column>
                      <Column style={styles.Column} vertical="center">
                        <ConnectedStatusChanger path={user.id} status={!user.challengeStatus} />
                      </Column>
                    </Row>
                  </Column>
                </div>
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