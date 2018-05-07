import { combineReducers } from 'redux'
import sessionReducer from './session'
import usersReducer from './users'
import challengesReducer from './challenges'
import filterReducer from './filters'

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  challenges: challengesReducer,
  filter: filterReducer
})

export default rootReducer