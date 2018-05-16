import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../../reducers/filters'
import { Radio } from 'material-ui';
import { Row } from 'simple-flexbox'
const styles = {
  showTitle: { paddingRight: '20px', fontWeight: 500 }
}

//Tällä hetkellä haasteille, voidaan yleistää muuhunkin
class VisibilityFilter extends React.Component {
  render() {
    const { filter, filterChange } = this.props
    return (
      <div>
        <Row vertical="center">
          <span style={styles.showTitle}>Show</span>
          All<Radio name="filter" checked={filter === 'ALL'} onChange={() => filterChange('ALL')} />
          Sent<Radio name="filter" checked={filter === 'SENT'} onChange={() => filterChange('SENT')} />
          Received<Radio name="filter" checked={filter === 'RECEIVED'} onChange={() => filterChange('RECEIVED')} />
        </Row>
      </div>
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