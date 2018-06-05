import React from 'react'
import { connect } from 'react-redux'
import { Paper, Typography, Divider } from 'material-ui';

import PasswordForm from './PasswordForm'
import { ConnectedStatusChanger, ConnectedCreator } from './Challenge'
import { ConnectedDisciplineSelector } from './DisciplineSelector'

const styles = {
  borderedDiv: {
    backgroundColor: 'white',
    border: '0',
    borderRadius: '5px',
    boxShadow: '1px 1px 3px 0',
    marginTop: '20px',
    maxWidth: '300px',
    padding: '20px'
  },
  flexColumnDiv: {
    display: 'flex',
    flexDirection: 'column'
  },
  flexSelfCenterAlign: {
    alignSelf: 'center',
    marginTop: '30px'
  },
  flexRowSpacedDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  thumbsCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px'
  }
}

//Challenge - status siirrettävä pois tästä komponentista (ehkä)
//Muuten käyttäjä voi haastaa itseään
const Info = (props) => {
  const { user, session, users } = props
  const challenger = users.find(user => user.uid === session.authUser.uid)
  // console.log('Challenger is', challenger)
  const challengerIsLoggedInUser = user.uid === session.authUser.uid
  // console.log('Challenger is logged in user?', challengerIsLoggedInUser)
  return (
    <div style={styles.flexColumnDiv}>
      <div style={styles.flexSelfCenterAlign}>
        <Typography style={{ marginBottom: '30px' }} variant="display2">
          {user.username}
        </Typography>
      </div>
      <div style={styles.flexRowSpacedDiv}>
        <div style={styles.borderedDiv}>
          {/* General info goes here */}
          <Typography variant="title">
            User info
          </Typography>
          <p>Email: {user.email}</p>
          <p>TODO - Add wins / losses % or relevant info like that?</p>
        </div>
        {!challengerIsLoggedInUser
          ?
          <div style={styles.borderedDiv}>
            <Typography style={{ marginBottom: '10px' }} variant="title">
              Send a challenge to {user.username}
            </Typography>
            {user.challengeStatus
              ? <ConnectedCreator from={challenger} to={user} disciplines={user.disciplines} />
              : <p><b>{user.username}</b> does not accept challenges at this moment</p>}
          </div>
          :
          null
        }
      </div>
    </div>
  )
}

const AccountSettings = (props) => {
  const { user } = props
  return (
    <div>
      <Divider style={{ marginTop: '30px', marginBottom: '30px' }} />
      <div style={styles.flexColumnDiv}>
        <div style={styles.flexSelfCenterAlign}>
          <Typography style={{ marginBottom: '30px' }} variant="display1">
            Account settings
        </Typography>
        </div>
        <div style={styles.flexRowSpacedDiv}>
          <div style={styles.borderedDiv}>
            <Typography variant="title">
              Change your password
          </Typography>
            <PasswordForm />
          </div>
          <div style={styles.borderedDiv}>
            <Typography style={{ marginBottom: '15px' }} variant="title">
              Select disciplines you play
          </Typography>
            {/* Add flex (3 on each column) WITHIN CONNECTEDDISCIPLINESELECTOR */}
            {/* Add flex (3 on each column) WITHIN CONNECTEDDISCIPLINESELECTOR */}
            {/* Add flex (3 on each column) WITHIN CONNECTEDDISCIPLINESELECTOR */}
            <ConnectedDisciplineSelector userPath={user.id} disciplines={user.disciplines} />
          </div>
          <div style={styles.borderedDiv}>
            <ConnectedStatusChanger path={user.id} status={!user.challengeStatus} />
            <div style={styles.thumbsCenter}>
              {user.challengeStatus
                ? <ThumbsUp />
                : <ThumbsDown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const User = (props) => {
  //user app.js:stä, session ja users mapStateToPropsista
  const { user, session, users } = props
  if (user) {
    return (
      <div>
        <Info user={user} session={session} users={users} />
        {session.authUser.uid === user.uid
          ?
          <AccountSettings user={user} />
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

const ThumbsUp = () => {
  return (
    <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 24 24">
      <path fill="#00C853" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
    </svg>
  )
}

const ThumbsDown = () => {
  return (
    <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 24 24">
      <path fill="#D50000" d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z" />
    </svg>
  )
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    users: state.users
  }
}

export default connect(mapStateToProps)(User)