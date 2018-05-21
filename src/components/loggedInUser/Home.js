import React from "react";
import { ConnectedList } from './Challenge'
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
          {/* <VisibilityFilter firstOption={'All'} secondOption={'Sent'} thirdOption={'Received'} /> */}
          <ConnectedList condition={false} />
        </Paper>
      </Column>

      <Column flexGrow={0.5} style={{ margin: '10px' }}>
        <Paper style={{ padding: '40px', margin: '20px', minHeight: '500px' }}>
          <Typography variant="display1">
            Accepted challenges
          </Typography>
          {/* <VisibilityFilter firstOption={'All'} secondOption={'Accepted'} thirdOption={'Completed'} /> */}
          <ConnectedList condition={true} />
        </Paper>
      </Column>
    </Row>
  )
}

export default Home
