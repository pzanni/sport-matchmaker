import React from "react";
import { ConnectedChallengeList, ConnectedAcceptedChallengesList } from './Challenge'
import VisibilityFilter from './VisibilityFilter'
import { Column, Row } from 'simple-flexbox'
import { Paper, Typography } from 'material-ui';

const Home = (props) => {
  return (
    <div className="homeRoot">
      <MyChallenges />
    </div>
  )
}

const MyChallenges = () => {
  return (
    <Row style={{ margin: '25px' }} vertical="start">
      <Column flexGrow={0.5} style={{ margin: '10px' }}>
        <Paper style={{ padding: '40px', margin: '20px', minHeight: '500px' }}>
          <Typography variant="display1">
            My challenges
          </Typography>
          <p>Below is the list of your existing challenges</p>
          <VisibilityFilter />
          <ConnectedChallengeList />
        </Paper>
      </Column>

      <Column flexGrow={0.5} style={{ margin: '10px' }}>
        <Paper style={{ padding: '40px', margin: '20px', minHeight: '500px' }}>
          <Typography variant="display1">
            Accepted challenges
          </Typography>
          <p>Below is the list of your accepted challenges</p>
          <ConnectedAcceptedChallengesList />
        </Paper>
      </Column>
    </Row>
  )
}

export default Home
