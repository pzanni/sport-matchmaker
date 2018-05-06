import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'material-ui';
import { editChallengeStatus } from '../../reducers/users'
import { addFirebaseChallenge } from '../../reducers/challenges'

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

//Tarkistusmetodi eri kuin userin vastaavassa <User/> komponentissa. [] (lähtöarvo listalle) on truthy
const ChallengeList = (props) => {
  const { challenges } = props
  const hasChallenges = challenges.length > 0
  if (hasChallenges) {
    return (
      <div>
        {challenges.map((challenge) =>
          <div key={challenge.path}>
            <hr />
            Status: {challenge.acceptedStatus}<br />
            Challenger: {challenge.from.username}<br />
            Opponent: {challenge.to.username}<hr />
          </div>
        )}
      </div>
    )
  } else {
    return (
      <p>Loading challenges ...</p>
    )
  }
}

const AcceptChallenge = (props) => {
  return (<div>Button to accept challenge goes here . . .</div>)
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