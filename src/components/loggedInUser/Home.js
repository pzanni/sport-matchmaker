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
        <Paper style={{ padding: '25px' }}>
          <Typography variant="display1">
            My challenges
          </Typography>
          <p>Alla on lista kaikista käyttäjän olemassaolevista haasteista</p>
          <VisibilityFilter />
          <ConnectedChallengeList />
        </Paper>
      </Column>

      <Column flexGrow={0.5} style={{ margin: '10px' }}>
        <Paper style={{ padding: '25px' }}>
          <Typography variant="display1">
            Accepted challenges
          </Typography>
          <p>Alla on lista kaikista käyttäjän hyväksytyistä haasteista</p>
          <ConnectedAcceptedChallengesList />
        </Paper>
      </Column>
    </Row>
  )
}

export default Home
