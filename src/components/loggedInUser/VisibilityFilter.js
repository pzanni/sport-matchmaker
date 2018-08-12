import React from 'react'
import { Radio } from '@material-ui/core'
import { Row } from 'simple-flexbox'

const styles = {
  showTitle: { paddingRight: '20px', fontWeight: 500 }
}

const ChallengeVisibilityFilter = (props) => {
  const { filter, dispatchableFunction, firstOption, secondOption, thirdOption } = props
  const firstUpperCase = firstOption.toUpperCase()
  const secondUpperCase = secondOption.toUpperCase()
  const thirdUpperCase = thirdOption.toUpperCase()

  return (
    <div>
      <Row vertical="center">
        <span style={styles.showTitle}>Show</span>
        {firstOption}<Radio name="filter" checked={filter === firstUpperCase} onChange={() => dispatchableFunction(firstUpperCase)} />
        {secondOption}<Radio name="filter" checked={filter === secondUpperCase} onChange={() => dispatchableFunction(secondUpperCase)} />
        {thirdOption}<Radio name="filter" checked={filter === thirdUpperCase} onChange={() => dispatchableFunction(thirdUpperCase)} />
      </Row>
    </div>
  )
}

export default ChallengeVisibilityFilter