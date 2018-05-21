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

//TODO - ADD LOADER
//TODO - Create 1 component and use differing elements from non-accepted/accepted as props
const AcceptedChallengesList = (props) => {
  const { challenges, session } = props
  const acceptedChallenges = challenges.filter((challenge) => challenge.acceptedStatus === true)

  //These shall be filtered in a similar way to the way of not accepted challenges
  const challengesToShow = acceptedChallenges.filter((challenge) => challenge.from.uid === session.authUser.uid || challenge.to.uid === session.authUser.uid)

  if (challengesToShow.length > 0) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Opponent</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {challengesToShow.map(challenge => {
            return (
              <TableRow key={challenge.path}>
                <TableCell component="th" scope="row">
                  {/* Breaking DRY here... a component could be created to cover both accepted and not accepted challenges */}
                  {challenge.from.uid === session.authUser.uid
                    ? challenge.to.username
                    : challenge.from.username}
                </TableCell>
                <TableCell>
                  <Row>
                    <ConnectedMatchResultDialog challenge={challenge} />
                    <ConnectedChatDialog challenge={challenge} />
                  </Row>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  } else {
    return (
      <div>You have no accepted challenges</div>
    )
  }
}

//Todella tehoton toteutus (kasa filttereitä -> challenget voisi indeksöidä tietokannassa käyttäjäkohtaisesti)
const ChallengeList = (props) => {
  const { challenges, session, filter } = props
  const pendingChallenges = challenges.filter((challenge) => challenge.acceptedStatus === false)

  const all = pendingChallenges.filter((challenge) => challenge.from.uid === session.authUser.uid || challenge.to.uid === session.authUser.uid)
  const sent = all.filter((challenge) => challenge.from.uid === session.authUser.uid)
  const received = all.filter((challenge) => challenge.to.uid === session.authUser.uid)

  const challengesToShow =
    filter === 'ALL'
      ? all
      : filter === 'SENT'
        ? sent
        : received

  //Tarkistusmetodi eri kuin userin vastaavassa <User/> komponentissa. [] (lähtöarvo listalle) on truthy
  const hasChallenges = challengesToShow.length > 0
  const noChallenges = challengesToShow.length === 0
  const pendingChallengesExist = pendingChallenges.length > 0

  if (hasChallenges) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Opponent</TableCell>
            <TableCell>Discipline</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {challengesToShow.map(challenge => {
            return (
              <TableRow key={challenge.path}>
                <TableCell component="th" scope="row">
                  {/* Challenge creator same as logged in user ? -> opponent is challenge receiver and vice versa */}
                  {challenge.from.uid === session.authUser.uid
                    ? challenge.to.username
                    : challenge.from.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {challenge.discipline}
                </TableCell>
                <TableCell>
                  {challenge.to.uid === session.authUser.uid
                    ? <ChallengedBy path={challenge.path} uid={challenge.from.uid} />
                    : <Challenging />}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  } else if (noChallenges && pendingChallengesExist) {
    return (
      <div>No challenges to show</div>
    )
  } else {
    return (
      <div>
        <p>Loading challenges </p>
        <div style={styles.Loader}>
          <ScaleLoader height={20} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    challenges: state.challenges,
    session: state.session,
    filter: state.filter
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

const ConnectedDecliner = connect(null, mapDispatchToProps)(Decliner)
const ConnectedAcceptedChallengesList = connect(mapStateToProps)(AcceptedChallengesList)
const ConnectedAccepter = connect(null, mapDispatchToProps)(Accepter)
const ConnectedChallengeList = connect(mapStateToProps)(ChallengeList)
const ConnectedStatusChanger = connect(null, mapDispatchToProps)(StatusChanger)
const ConnectedCreator = connect(null, mapDispatchToProps)(Creator)

export {
  ConnectedStatusChanger,
  ConnectedCreator,
  ConnectedChallengeList,
  ConnectedAccepter,
  ConnectedAcceptedChallengesList,
  ConnectedDecliner
}