import React from 'react'
import { connect } from 'react-redux'
import { BarLoader } from 'react-spinners'
import { Button } from 'material-ui'
import { editChallengeStatus } from '../../reducers/users'
import { addFirebaseChallenge } from '../../reducers/challenges'

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

const ChallengeList = (props) => {
  const { challenges, session, filter } = props
  const challengesToShow =
    filter === 'ALL'
      ? challenges
      : filter === 'SENT'
        ? challenges.filter((challenge) => challenge.from.uid === session.authUser.uid)
        : challenges.filter((challenge) => challenge.to.uid === session.authUser.uid)
  //Tarkistusmetodi eri kuin userin vastaavassa <User/> komponentissa. [] (lähtöarvo listalle) on truthy
  const hasChallenges = challengesToShow.length > 0
  if (hasChallenges) {
    return (
      <div>
        {challengesToShow.map((challenge) =>
          <div key={challenge.path}>
            <hr />
            Status: {challenge.acceptedStatus ? null : <AcceptChallenge />}<br />
            Challenger: {challenge.from.username}<br />
            Opponent: {challenge.to.username}<hr />
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

const AcceptChallenge = (props) => {
  return (
    <button onClick={() => console.log('moi')}>Accept!!</button>
  )
}

//Dispatch VisibilityFilterissä
//Tilanteen haku esimerkiksi täältä
//Kurssimatskun versio skaalaa eri toteutuksille
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
    addFirebaseChallenge: (from, to) => dispatch(addFirebaseChallenge(from, to))
  }
}

const ConnectedChallengeList = connect(mapStateToProps)(ChallengeList)
const ConnectedStatusChanger = connect(null, mapDispatchToProps)(StatusChanger)
const ConnectedCreator = connect(null, mapDispatchToProps)(Creator)
export { ConnectedStatusChanger, ConnectedCreator, ConnectedChallengeList, AcceptChallenge }