import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../../reducers/filters'

//Tällä hetkellä haasteille, voidaan yleistää muuhunkin
class VisibilityFilter extends React.Component {
  render() {
    const { filterChange } = this.props
    return (
      <div>
        <b>Challenges filter</b>
        <ul>
          <li>
            all <input type="radio" name="filter" onChange={() => filterChange('ALL')} />
          </li>
          <li>
            pending <input type="radio" name="filter" onChange={() => filterChange('SENT')} />
          </li>
          <li>
            received <input type="radio" name="filter" onChange={() => filterChange('RECEIVED')} />
          </li>
        </ul>
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