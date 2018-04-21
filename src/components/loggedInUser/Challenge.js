import React from 'react'
import { connect } from 'react-redux'

import { editChallengeStatus, createChallenge } from '../../reducers/users'

const StatusChanger = (props) => {
  const { path, status, editChallengeStatus } = props
  return (
    <button onClick={() => editChallengeStatus(path, status)}>Change challenge status</button>
  )
}

const Creator = (props) => {
  const { from, to, createChallenge } = props
  return (
    <button onClick={() => createChallenge(from, to)}>Challenge!</button>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    editChallengeStatus: (path, status) => dispatch(editChallengeStatus(path, status)),
    createChallenge: (from, to) => dispatch(createChallenge(from, to))
  }
}

const ConnectedStatusChanger = connect(null, mapDispatchToProps)(StatusChanger)
const ConnectedCreator = connect(null, mapDispatchToProps)(Creator)
export { ConnectedStatusChanger, ConnectedCreator }