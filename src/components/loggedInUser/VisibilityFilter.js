import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../../reducers/filters'
import { Radio } from 'material-ui';
import { Row } from 'simple-flexbox'

//Tällä hetkellä haasteille, voidaan yleistää muuhunkin
class VisibilityFilter extends React.Component {
  render() {
    const { filterChange } = this.props
    return (
      <Row vertical="center">
        All<Radio name="filter" onChange={() => filterChange('ALL')} />

        Sent<Radio name="filter" onChange={() => filterChange('SENT')} />

        Received<Radio name="filter" onChange={() => filterChange('RECEIVED')} />
      </Row>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterChange: (filter) => dispatch(filterChange(filter))
  }
}

export default connect(null, mapDispatchToProps)(VisibilityFilter)