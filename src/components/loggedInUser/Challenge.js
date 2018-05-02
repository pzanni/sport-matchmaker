import React from 'react'
import { connect } from 'react-redux'
import { BarLoader } from 'react-spinners'

import { editChallengeStatus } from '../../reducers/users'
import { addFirebaseChallenge } from '../../reducers/challenges'

const styles = {
  Loader: { marginLeft: '14px', marginTop: '-5px' }
}

const StatusChanger = (props) => {
  const { path, status, editChallengeStatus } = props
  return (
    <button onClick={() => editChallengeStatus(path, status)}>Change challenge status</button>
  )
}

const Creator = (props) => {
  const { from, to, addFirebaseChallenge } = props
  return (
    <button onClick={() => addFirebaseChallenge(from, to)}>Challenge!</button>
  )
}

//TODO - itselle heitetyt haasteet tulee olla mahdollista hyväksyä tästä listasta
const ChallengeList = (props) => {
  const { challenges } = props
  //Tarkistusmetodi eri kuin userin vastaavassa <User/> komponentissa. [] (lähtöarvo listalle) on truthy
  const hasChallenges = challenges.length > 0
  if (hasChallenges) {
    return (
      <div>
        {challenges.map((challenge) =>
          <div key={challenge.path}>
            <hr />
            Status: {challenge.acceptedStatus ? <p>accepted</p> : <p>not accepted</p>}<br />
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

const mapStateToProps = (state) => {
  return {
    challenges: state.challenges
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