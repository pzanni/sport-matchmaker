import React from 'react'
import { connect } from 'react-redux'
import { BarLoader } from 'react-spinners'
import { Button } from 'material-ui'
import { editChallengeStatus } from '../../reducers/users'
import { addFirebaseChallenge, acceptChallenge, declineChallenge } from '../../reducers/challenges'

const styles = {
  Loader: { marginLeft: '14px', marginTop: '-5px' }
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
  const { acceptChallenge, path } = props
  return (
    <Button variant="raised" color="primary" size="small" onClick={() => acceptChallenge(path)}>
      Accept
    </Button>
  )
}

const Decliner = (props) => {
  const { declineChallenge, path } = props
  return (
    <Button variant="raised" color="secondary" size="small" onClick={() => declineChallenge(path)}>
      Decline
  </Button>
  )
}

//TÄMÄN CONNECT - VERSIO RENDERÖIDÄÄN !!!
//TÄMÄN CONNECT - VERSIO RENDERÖIDÄÄN !!!
//TÄMÄN CONNECT - VERSIO RENDERÖIDÄÄN !!!
const ResultCreator = (props) => {
  return (
    <div>
      <Button variant="raised" color="primary" size="small" onClick={() => console.log('TODO - result popup')}>
        Result
    </Button>
    </div>)
}

//Näytetään, jos haastaa jonkun
const Challenging = (props) => {
  const { opponent } = props
  return (
    <div>
      Waiting for {opponent} to respond to your challenge
    </div>
  )
}

//Näytetään, jos joku haastaa
const ChallengedBy = (props) => {
  const { path, challenger } = props
  return (
    <div>
      <ConnectedAccepter path={path} />
      <ConnectedDecliner path={path} />
      Challenged by {challenger}
    </div>
  )
}

//TODO - Add result button
//Add result confirming situation
const AcceptedChallengesList = (props) => {
  const { challenges } = props
  const acceptedChallenges = challenges.filter((challenge) => challenge.acceptedStatus === true)
  return (
    <div>{acceptedChallenges.map((challenge) =>
      <div key={challenge.path}>
        <hr />
        Player #1 {challenge.from.username}
        <br />
        Player #2 {challenge.to.username}
        <ResultCreator />
        <hr />
      </div>)}
    </div>)
}

//TODO FIX - Yksi ehtotapaus lisää (ei haasteita -> silti barloader)
//Todella tehoton toteutus (kasa filttereitä -> challenget voisi indeksöidä tietokannassa käyttäjäkohtaisesti)
//jos siihen tulee tarvetta...
const ChallengeList = (props) => {
  const { challenges, session, filter } = props
  const pendingChallenges = challenges.filter((challenge) => challenge.acceptedStatus === false)

  const all = pendingChallenges.filter((challenge) => challenge.from.uid === session.authUser.uid || challenge.to.uid === session.authUser.uid)
  const sent = pendingChallenges.filter((challenge) => challenge.from.uid === session.authUser.uid)
  const received = pendingChallenges.filter((challenge) => challenge.to.uid === session.authUser.uid)

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
      <div>
        {challengesToShow.map((challenge) =>
          <div key={challenge.path}>
            <hr />
            {challenge.to.uid === session.authUser.uid
              ? <ChallengedBy challenger={challenge.from.username} path={challenge.path} />
              : <Challenging opponent={challenge.to.username} />}
            <hr />
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        <p>Loading challenges </p>
        <div style={styles.Loader}>
          <BarLoader />
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
    acceptChallenge: (path) => dispatch(acceptChallenge(path)),
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