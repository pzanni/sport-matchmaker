import React from 'react'
import { connect } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { Button, Table, TableHead, TableCell, TableRow, TableBody } from 'material-ui'
import { editChallengeStatus } from '../../reducers/users'
import { addFirebaseChallenge, acceptChallenge, declineChallenge } from '../../reducers/challenges'
import MatchResultDialog from './MatchResultDialog'
import { Row } from 'simple-flexbox'

const styles = {
  Loader: { marginLeft: '140px', marginTop: '-37px' }
}

const StatusChanger = (props) => {
  const { path, status, editChallengeStatus } = props
  return (
    <Button variant="raised" onClick={() => editChallengeStatus(path, status)}>
      Change challenge status
    </Button>
  )
}

const Creator = (props) => {
  const { from, to, addFirebaseChallenge } = props
  return (
    <Button variant="raised" color="primary" onClick={() => addFirebaseChallenge(from, to)}>
      Challenge
    </Button>
  )
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

//TODO - Add result button
//Add result confirming situation
const AcceptedChallengesList = (props) => {
  const { challenges, session } = props
  const acceptedChallenges = challenges.filter((challenge) => challenge.acceptedStatus === true)
  const challengesToShow = acceptedChallenges.filter((challenge) => challenge.from.uid === session.authUser.uid || challenge.to.uid === session.authUser.uid)

  if (challengesToShow.length > 0) {
    return (
      <Table>
        <TableBody>
          {challengesToShow.map(challenge => {
            return (
              <TableRow key={challenge.path}>
                <TableCell component="th" scope="row">
                  {challenge.from.username}
                </TableCell>
                <TableCell>
                  <MatchResultDialog challenge={challenge} />
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

//TODO FIX - Yksi ehtotapaus lisää (ei haasteita -> silti barloader)
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
            <TableCell>Challenged</TableCell>
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
                  {challenge.to.username}
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
    editChallengeStatus: (path, status) => dispatch(editChallengeStatus(path, status)),
    addFirebaseChallenge: (from, to) => dispatch(addFirebaseChallenge(from, to)),
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