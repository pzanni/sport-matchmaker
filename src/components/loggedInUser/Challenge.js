import React from 'react'
import { connect } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { Button, Table, TableHead, TableCell, TableRow, TableBody } from 'material-ui'
import { Row } from 'simple-flexbox'
import { Select, MenuItem, FormControl, FormHelperText } from 'material-ui'

import { toggleChallengeStatus } from '../../reducers/users'
import { addFirebaseChallenge, acceptChallenge, declineChallenge } from '../../reducers/challenges'
import { ConnectedMatchResultDialog } from './MatchResultDialog'
import { ConnectedChatDialog } from './ChatDialog'
import { ALL, SENT, RECEIVED, ACCEPTED, COMPLETED } from '../../constants/filterStates'

const styles = {
  Loader: { marginLeft: '140px', marginTop: '-37px' }
}

const StatusChanger = (props) => {
  const { path, status, toggleChallengeStatus } = props
  return (
    <Button variant="raised" onClick={() => toggleChallengeStatus(path, status)}>
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
      <form>
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
      </form>
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

//TODO - ADD FILTERING FOR BOTH TYPES
const List = (props) => {
  // challenges, session from redux state. propFilter and condition from <MyChallenges/> component
  const { challenges, session, propFilter, condition } = props
  const challengesType = challenges.filter((challenge) => challenge.acceptedStatus === condition)
  const all = challengesType.filter((challenge) => challenge.from.uid === session.authUser.uid || challenge.to.uid === session.authUser.uid)

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


  // console.log(`${propFilter} for ${condition}`, challengesToShow)
  //Conditions (meni järki näihin...)
  const hasOwnChallenges = challengesToShow.length > 0

  if (hasOwnChallenges) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Opponent</TableCell>
            <TableCell>Discipline</TableCell>
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
              <TableRow key={challenge.path}>
                <TableCell component="th" scope="row">
                  {challenge.from.uid === session.authUser.uid
                    ? challenge.to.username
                    : challenge.from.username}
                </TableCell>
                <TableCell>
                  {challenge.discipline}
                </TableCell>
                <TableCell>
                  {condition
                    //True (Accepted challenge)
                    ?
                    <Row>
                      <ConnectedMatchResultDialog challenge={challenge} />
                      <ConnectedChatDialog challenge={challenge} />
                    </Row>
                    //False (Pending challenge)
                    :
                    challenge.to.uid === session.authUser.uid
                      ? <ChallengedBy path={challenge.path} uid={challenge.from.uid} />
                      : <Challenging />
                  }
                </TableCell>
              </TableRow>
            )
          })
          }
        </TableBody>
      </Table>
    )
  } else {
    // This has to get fixed at some point
    // This has to get fixed at some point
    return (
      <div>
        Loading / Nothing to show
      </div>
    )
    // This has to get fixed at some point
    // This has to get fixed at some point
  }

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
  ConnectedList
}