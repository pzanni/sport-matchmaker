import React from 'react'
import { connect } from 'react-redux'
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch
} from 'material-ui'

import { toggleDisciplineStatus } from '../../reducers/users'

const DisciplineSelector = (props) => {
  const { userPath, disciplines, toggleDisciplineStatus } = props

  //console.log('Disciplines', disciplines)
  //Shorteners on discipline status - similar one can be applied to toggleDisciplineStatus function
  const tennisStatus = disciplines ? disciplines.tennis : false
  const badmintonStatus = disciplines ? disciplines.badminton : false
  return (
    <FormControl>
      <FormLabel component="legend">Select disciplines you play</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={tennisStatus}
              onChange={() => toggleDisciplineStatus(userPath, { tennis: disciplines ? !disciplines.tennis : true })}
            />
          }
          label="Tennis"
        />
        <FormControlLabel
          control={
            <Switch
              checked={badmintonStatus}
              onChange={() => toggleDisciplineStatus(userPath, { badminton: disciplines ? !disciplines.badminton : true })}
            />
          }
          label="Badminton"
        />
      </FormGroup>
    </FormControl>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDisciplineStatus: (path, discipline) => dispatch(toggleDisciplineStatus(path, discipline))
  }
}

const ConnectedDisciplineSelector = connect(null, mapDispatchToProps)(DisciplineSelector)
export { ConnectedDisciplineSelector }