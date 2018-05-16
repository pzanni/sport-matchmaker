import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../../reducers/filters'
import { Radio } from 'material-ui';
import { Row } from 'simple-flexbox'

//Tällä hetkellä haasteille, voidaan yleistää muuhunkin
class VisibilityFilter extends React.Component {
  render() {
    const { filter, filterChange } = this.props
    return (
      <Row vertical="center">
        All<Radio name="filter" checked={filter === 'ALL'} onChange={() => filterChange('ALL')} />

        Sent<Radio name="filter" checked={filter === 'SENT'} onChange={() => filterChange('SENT')} />

        Received<Radio name="filter" checked={filter === 'RECEIVED'} onChange={() => filterChange('RECEIVED')} />
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterChange: (filter) => dispatch(filterChange(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityFilter)