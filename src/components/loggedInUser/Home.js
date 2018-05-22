import React from "react";
import { connect } from 'react-redux'
import { Column, Row } from 'simple-flexbox'
import { Paper, Typography } from 'material-ui';

import { ConnectedList } from './Challenge'
import ChallengeVisibilityFilter from './VisibilityFilter'
import { pendingFilterChange, acceptedFilterChange } from '../../reducers/filters'

const Home = (props) => {
  return (
    <div className="homeRoot">
      <ConnectedMyChallenges />
    </div>
  )
}

const MyChallenges = (props) => {
  const { filter, acceptedFilterChange, pendingFilterChange } = props
  return (
    <Row style={{ margin: '25px' }} vertical="start">
      <Column flexGrow={0.5} style={{ margin: '10px' }}>
        <Paper style={{ padding: '40px', margin: '20px', minHeight: '500px' }}>
          <Typography variant="display1">
            My challenges
          </Typography>
          <ChallengeVisibilityFilter
            filter={filter.pendingChallenges}
            dispatchableFunction={pendingFilterChange}
            firstOption={'All'}
            secondOption={'Sent'}
            thirdOption={'Received'} />
          <ConnectedList condition={false} propFilter={filter.pendingChallenges} />
        </Paper>
      </Column>

      <Column flexGrow={0.5} style={{ margin: '10px' }}>
        <Paper style={{ padding: '40px', margin: '20px', minHeight: '500px' }}>
          <Typography variant="display1">
            Accepted challenges
          </Typography>
          <ChallengeVisibilityFilter
            filter={filter.acceptedChallenges}
            dispatchableFunction={acceptedFilterChange}
            firstOption={'All'}
            secondOption={'Accepted'}
            thirdOption={'Completed'} />
          <ConnectedList condition={true} propFilter={filter.acceptedChallenges} />
        </Paper>
      </Column>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    acceptedFilterChange: (filter) => dispatch(acceptedFilterChange(filter)),
    pendingFilterChange: (filter) => dispatch(pendingFilterChange(filter))
  }
}

const ConnectedMyChallenges = connect(mapStateToProps, mapDispatchToProps)(MyChallenges)

export default connect(mapStateToProps)(Home)
export { ConnectedMyChallenges }
