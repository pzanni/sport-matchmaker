import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../../reducers/filters'

//Tällä hetkellä haasteille, voidaan yleistää muuhunkin
class VisibilityFilter extends React.Component {
  render() {
    const { filterChange } = this.props
    return (
      <div>
        <b>Ey paisan! You can filter challenges here </b>
        all <input type="radio" name="filter" onChange={() => filterChange('ALL')} />
        pending <input type="radio" name="filter" onChange={() => filterChange('SENT')} />
        received <input type="radio" name="filter" onChange={() => filterChange('RECEIVED')} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterChange: (filter) => dispatch(filterChange(filter))
  }
}

export default connect(null, mapDispatchToProps)(VisibilityFilter)