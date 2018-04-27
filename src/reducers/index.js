import { combineReducers } from 'redux'
import sessionReducer from './session'
import usersReducer from './users'
import challengesReducer from './challenges'

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  challenges: challengesReducer
})

export default rootReducer