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

//Set button disabled when no discipline has been selected
//Menuitems by looping through truthy disciplines
//as per https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript?answertab=votes#tab-top
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
    console.log('Disciplines', disciplines)

    // console.log('Chosen discipline -', chosenDiscipline)
    // console.log('its value is ', disciplines[chosenDiscipline])
    // console.log('Disciplines from Challenge creator component', disciplines)
    // console.log('Amount of disciplines', Object.keys(disciplines).length)

    const selectableDisciplines = []
    for (let key in disciplines) {
      if (disciplines[key]) {
        selectableDisciplines.push(<MenuItem key={key} value={key}>{key}</MenuItem>)
      }
      console.log(`Value of key ${key}`, disciplines[key])
    }
    
    // for (const [key, value] of Object.entries(disciplines)) {
    //   //value is boolean
    //   if (value) {
    //     selectableDisciplines.push(<MenuItem key={key} value={key}>{key}</MenuItem>);
    //     // console.log(key, 'can be played');
    //   }
    // }

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

//TODO - Add result confirming situation
//TODO - Add messaging possibility
//TODO - ADD LOADER
const AcceptedChallengesList = (props) => {
  const { challenges, session } = props
  const acceptedChallenges = challenges.filter((challenge) => challenge.acceptedStatus === true)
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
                  {/* Tää on BUGI - muutettava oikeaksi */}
                  TODO - Vastus tänne
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
//jos siihen tulee tarvetta...
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
  //HUOM - ConnectedAccepter SAMASSA MODUULISSA KUIN Accepter
  const hasChallenges = challengesToShow.length > 0
  if (hasChallenges) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Challenger</TableCell>
            <TableCell>Discipline</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {challengesToShow.map(challenge => {
            return (
              <TableRow key={challenge.path}>
                <TableCell component="th" scope="row">
                  {challenge.from.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {challenge.discipline}
                </TableCell>
                <TableCell>
                  {challenge.to.uid === session.authUser.uid
                    ? <ChallengedBy challenger={challenge.from.username} path={challenge.path} uid={challenge.from.uid} />
                    : <Challenging />}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
    // Challenges exist, just not for you AHAHAHAH AXAXAXXA :((
  } else if (pendingChallenges.length >= 0) {
    return (
      <div>
        No challenges to show
      </div>
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