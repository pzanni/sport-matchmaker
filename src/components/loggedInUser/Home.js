import React from "react";
import { connect } from 'react-redux'
import { Column, Row } from 'simple-flexbox'
import { Paper, Typography, Tab, Tabs } from 'material-ui';

import { ConnectedList } from './Challenge'
import ChallengeVisibilityFilter from './VisibilityFilter'
import { pendingFilterChange, acceptedFilterChange } from '../../reducers/filters'

const styles = {
  borderedDiv: {
    backgroundColor: 'white',
    border: '0',
    borderRadius: '5px',
    boxShadow: '1px 1px 3px 0',
    marginTop: '20px',
    minHeight: '400px',
    padding: '20px'
  }
}

const Home = (props) => {
  return (
    <div className="homeRoot">
      <ChallengeTabs />
    </div>
  )
}

class ChallengeTabs extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Pending challenges" />
          <Tab label="Ongoing challenges" />
        </Tabs>
        {value === 0 && <ConnectedPendingChallenges />}
        {value === 1 && <ConnectedAcceptedChallenges />}
      </div>
    )
  }
}

const PendingChallenges = (props) => {
  const { filter, pendingFilterChange } = props
  return (
    <ChallengeType
      filter={filter.pendingChallenges}
      dispatchableFunction={pendingFilterChange}
      title='My challenges'
      firstOption='All'
      secondOption='Sent'
      thirdOption='Received'
      condition={false}
      // Voisi käyttää filter (1. param) - mutta pidetään tilanne tälläisenä havainnollistuksen vuoksi
      // alikomponentissa
      propFilter={filter.pendingChallenges}
    />
  )
}

const AcceptedChallenges = (props) => {
  const { filter, acceptedFilterChange } = props
  return (
    <ChallengeType
      filter={filter.acceptedChallenges}
      dispatchableFunction={acceptedFilterChange}
      title='Accepted challenges'
      firstOption='All'
      secondOption='Accepted'
      thirdOption='Completed'
      condition={true}
      propFilter={filter.acceptedChallenges}
    />
  )
}

//Pending challenge and accepted challenge types are built upon this via props
const ChallengeType = (props) => {
  const {
    filter,
    dispatchableFunction,
    title,
    firstOption,
    secondOption,
    thirdOption,
    condition,
    propFilter
   } = props


  return (
    <div style={styles.borderedDiv}>
      <Typography variant="display1">
        {title}
      </Typography>
      <ChallengeVisibilityFilter
        filter={filter}
        dispatchableFunction={dispatchableFunction}
        firstOption={firstOption}
        secondOption={secondOption}
        thirdOption={thirdOption} />
      <ConnectedList condition={condition} propFilter={propFilter} />
    </div>
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

const ConnectedPendingChallenges = connect(mapStateToProps, mapDispatchToProps)(PendingChallenges)
const ConnectedAcceptedChallenges = connect(mapStateToProps, mapDispatchToProps)(AcceptedChallenges)

export default connect(mapStateToProps)(Home)
export { ConnectedPendingChallenges, ConnectedAcceptedChallenges }
