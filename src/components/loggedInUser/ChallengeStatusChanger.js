import React from 'react'

const ChallengeStatusChanger = (props) => {
  const { path, status, editChallengeStatus } = props
  return (
    <button onClick={() => editChallengeStatus(path, status)}>Change challenge status</button>
  )
}

export default ChallengeStatusChanger