import React from 'react'
import { connect } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { Button, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core/'
import { Row } from 'simple-flexbox'
import { Select, MenuItem, FormControl, FormHelperText } from '@material-ui/core/'
import { compose } from 'recompose'

import { toggleChallengeStatus } from '../../reducers/users'
import challenges, { addFirebaseChallenge, acceptChallenge, declineChallenge, completeChallenge } from '../../reducers/challenges'
import { ConnectedMatchResultDialog } from './MatchResultDialog'
import { ConnectedChatDialog } from './ChatDialog'
import { ConnectedResultReviewDialog } from './ResultReviewDialog'
import { ALL, SENT, RECEIVED, ACCEPTED, COMPLETED } from '../../constants/filterStates'

const styles = {
  Loader: { marginLeft: '140px', marginTop: '-37px' },
  optionStyle: { display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%' },
  optionItemPadding: { paddingRight: '10px' }
}

const StatusChanger = (props) => {
  const { path, status, toggleChallengeStatus } = props
  return (
    <Button color="primary" style={{ border: '2px solid #B7C6CD', borderRadius: '5px' }} onClick={() => toggleChallengeStatus(path, status)}>
      Toggle challenge status
    </Button>
  )
}

class Creator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenDiscipline: ''
    }
  }

  handleChange = (event) => {
    this.setState({ chosenDiscipline: event.target.value })
  }

  render() {
    const { from, to, addFirebaseChallenge, disciplines } = this.props
    const { chosenDiscipline } = this.state

    const selectableDisciplines = []
    for (let key in disciplines) {
      if (disciplines[key]) {
        selectableDisciplines.push(<MenuItem key={key} value={key}>{key}</MenuItem>)
      }
    }

    const ifNoValidDiscipline =
      chosenDiscipline === ''
      || !disciplines[chosenDiscipline] // State remains unchanged (is a potential problem?) but atleast the button get disabled

    return (
      <React.Fragment>
        <FormControl>
          <Select value={chosenDiscipline} onChange={this.handleChange}>
            <MenuItem value=''><em>none</em></MenuItem>
            {selectableDisciplines}
          </Select>
          <FormHelperText>Select a discipline</FormHelperText>
          <Button disabled={ifNoValidDiscipline} variant="raised" color="primary" onClick={() => addFirebaseChallenge(from, to, chosenDiscipline)}>
            Challenge
          </Button>
        </FormControl>
      </React.Fragment>
    )
  }
}

//Accepting a challenge sends a notification (if permission was granted) to the challenge creator
const Accepter = (props) => {
  const { acceptChallenge, path, uid } = props
  return (
    <Button style={{ marginRight: '5px' }} variant="raised" color="primary" size="small" onClick={() => acceptChallenge(path, uid)}>
      Accept
    </Button>
  )
}

const Decliner = (props) => {
  const { declineChallenge, path } = props
  return (
    <Button style={{ marginLeft: '5px' }} variant="raised" color="secondary" size="small" onClick={() => declineChallenge(path)}>
      Decline
  </Button>
  )
}

//Näytetään, jos haastaa jonkun
const Challenging = (props) => {
  return (
    <div>Waiting for response</div>
  )
}

//Näytetään, jos joku haastaa
const ChallengedBy = (props) => {
  const { path, uid } = props
  return (
    <div>
      <Row>
        <ConnectedAccepter path={path} uid={uid} />
        <ConnectedDecliner path={path} />
      </Row>
    </div>
  )
}

const PendingChallenge = (props) => {
  const { challenge, session } = props
  if (challenge.to.uid === session.authUser.uid) {
    return <ChallengedBy path={challenge.path} uid={challenge.from.uid} />
  }
  return <Challenging />
}

const PendingAcceptedChallenge = (props) => {
  const { challenge, session } = props
  if (challenge.match.submitterUid === session.authUser.uid) {
    return <p>Waiting for opponent to review result</p>
  }
  return <ConnectedResultReviewDialog match={challenge.match} path={challenge.path} canComplete={true} />
}

const AcceptedChallenge = (props) => {
  const { challenge, session } = props
  //Match has been submitted
  if (challenge.match) {
    //Match has been also completed
    if (challenge.completed) {
      return <ConnectedResultReviewDialog match={challenge.match} path={challenge.path} canComplete={false} />
    }
    //Match not yet completed, but match has been submitted - waiting actions from opponent
    return <PendingAcceptedChallenge challenge={challenge} session={session} />
  }
  //Match has not been yet submitted
  return <ConnectedMatchResultDialog challenge={challenge} />
}

const Challenges = (props) => {
  const { challengesToShow, condition, session } = props
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Opponent</TableCell>
          <TableCell>Discipline</TableCell>
          {/* Perus if/elselle recompose -> overengineering */}
          <TableCell>
            {condition
              //True (Accepted challenge)
              ? 'Options'
              //False (Pending challenge)
              : 'Status'
            }</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {challengesToShow.map(challenge => {
          return (
            <TableRow key={challenge.path} className="hoverableTableRow">
              <TableCell>
                {challenge.from.uid === session.authUser.uid
                  //Render opponent name depending on logged in user name
                  ? challenge.to.username
                  : challenge.from.username}
              </TableCell>
              <TableCell>
                {challenge.discipline}
              </TableCell>
              {/* Splitting into smaller component (with their own conditional renderings)
              better option (have to pick a random end-case in this case unlike in <Challenges/>)
              where every road eventually leads to 1 place. Here it splits instead */}
              <TableCell>
                {/* To be able to use visibility hidden / visible on hover -> need span or similar extra container */}
                <span>
                  {condition
                    ?
                    <div style={styles.optionStyle}>
                      {/* Chat dialog always available for accepted challenge */}
                      <div style={styles.optionItemPadding}>
                        <ConnectedChatDialog challenge={challenge} />
                      </div>
                      <AcceptedChallenge challenge={challenge} session={session} />
                    </div>
                    :
                    <PendingChallenge challenge={challenge} session={session} />}
                </span>
              </TableCell>
            </TableRow>
          )
        })
        }
      </TableBody>
    </Table>
  )
}

const getChallenges = (props) => {
  const { propFilter, all, session } = props
  // console.log('props from getChallenges', props)
  let challengesToShow
  switch (propFilter) {
    case ALL:
      challengesToShow = all
      break
    case SENT:
      challengesToShow = all.filter((challenge) => challenge.from.uid === session.authUser.uid)
      break
    case RECEIVED:
      challengesToShow = all.filter((challenge) => challenge.to.uid === session.authUser.uid)
      break
    case ACCEPTED:
      challengesToShow = all.filter((challenge) => !challenge.completed)
      break
    case COMPLETED:
      challengesToShow = all.filter((challenge) => challenge.completed)
      break
    default:
      break
  }
  // console.log('challengesToShow from getChallenges', challengesToShow)
  return challengesToShow
}

const List = (props) => {
  // challenges, session from redux state. propFilter and condition from <MyChallenges/> component
  const { challenges, session, propFilter, condition } = props
  const challengesType = challenges.filter((challenge) => challenge.acceptedStatus === condition)
  const all = challengesType.filter((challenge) => challenge.from.uid === session.authUser.uid || challenge.to.uid === session.authUser.uid)
  let challengesToShow = getChallenges({ propFilter, all, session })
  return (
    <ChallengesWithConditionalRendering
      challengesToShow={challengesToShow}
      condition={condition}
      session={session}
      challengesType={challengesType}
      all={all}
    />
  )
}

const FriendListCompletedTable = (props) => {
  const { challenges } = props
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Player #1</TableCell>
          <TableCell>Player #2</TableCell>
          <TableCell>Options</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {challenges.map(challenge => {
          return (
            <TableRow key={challenge.path}>
              <TableCell>{challenge.from.username}</TableCell>
              <TableCell>{challenge.to.username}</TableCell>
              <TableCell>
                <ConnectedResultReviewDialog match={challenge.match} path={challenge.path} canComplete={false} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

const FriendsCompletedChallenges = (props) => {
  const { friendList, challenges } = props
  if (friendList) {
    let allFriendCompletedChallenges = []
    //Filter challenges first
    const completedChallenges = challenges.filter(challenge => challenge.completed)
    for (let key in friendList) {
      const friendUid = friendList[key]
      const friendParticipationChallenges =
        completedChallenges
          .filter(completedChallenge => completedChallenge.from.uid === friendUid || completedChallenge.to.uid === friendUid)
      allFriendCompletedChallenges = allFriendCompletedChallenges.concat(friendParticipationChallenges)
    }
    if (allFriendCompletedChallenges.length > 0) {
      return <FriendListCompletedTable challenges={allFriendCompletedChallenges} />
    }

    //Friends do not have completed challenges
    return <p>No challenges to show as of yet</p>
  }
  //No friends added
  return <p>Add friends to see their results!</p>
}

//Alternative rendering conditions for regular challenges from here
//TODO (ehkä..) - miten kiertää ongelma siten, että sekä loadaus / lataus ilmestyy
const withNoOwnChallenges = (Component) => (props) => {
  const { challengesToShow } = props
  const noChallengesExist = challengesToShow.length === 0
  if (noChallengesExist) {
    return <p>No challenges to show</p>
  }
  return <Component {...props} />
}

const mapStateToProps = (state) => {
  return {
    challenges: state.challenges,
    session: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleChallengeStatus: (path, status) => dispatch(toggleChallengeStatus(path, status)),
    addFirebaseChallenge: (from, to, chosenDiscipline) => dispatch(addFirebaseChallenge(from, to, chosenDiscipline)),
    acceptChallenge: (path, challengerUid) => dispatch(acceptChallenge(path, challengerUid)),
    declineChallenge: (path) => dispatch(declineChallenge(path))
  }
}

//Käytössä aaltosulkeet -> wieruchin yhden objektin palautus ei tässä siis toimi (voisi laittaa kylläkin)
//Käytössä ei ole null - objektia vaan aina on käytössä taulut (truthy)
// HUOM - 1. with... - komponenttien oltava tämän yläpuolella!!
const ChallengesWithConditionalRendering = compose(withNoOwnChallenges)(Challenges)

const ConnectedFriendsCompletedChallenges = connect(mapStateToProps)(FriendsCompletedChallenges)
const ConnectedList = connect(mapStateToProps)(List)
const ConnectedDecliner = connect(null, mapDispatchToProps)(Decliner)
const ConnectedAccepter = connect(null, mapDispatchToProps)(Accepter)
const ConnectedStatusChanger = connect(null, mapDispatchToProps)(StatusChanger)
const ConnectedCreator = connect(null, mapDispatchToProps)(Creator)

export {
  ConnectedStatusChanger,
  ConnectedCreator,
  ConnectedAccepter,
  ConnectedDecliner,
  ConnectedList,
  ChallengesWithConditionalRendering,
  ConnectedFriendsCompletedChallenges
}